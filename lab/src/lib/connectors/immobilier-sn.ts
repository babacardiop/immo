import type { Transaction } from "@prisma/client";
import { decodeEntities } from "@/lib/connectors/expat-dakar";
import {
  bedroomsFromText,
  htmlToText,
  surfaceFromText,
  type Connector,
  type ParsedDetail,
  type ParsedListing,
} from "@/lib/connectors/types";
import { normalizePhone } from "@/lib/privacy/phone";

/**
 * Immobilier.sn connector (WordPress + WP Residence theme).
 * ToS: the "Conditions d'utilisation" page is an empty placeholder ("A venir…")
 * as of 24/11/2026; robots.txt only disallows /wp-admin/.
 *
 * Index: the WordPress RSS feed of the estate_property post type —
 *   /feed/?post_type=estate_property&paged=N (12 ads/page, newest first, 404 past the end).
 * It is the only single sequence covering every ad (sale + rent, Dakar + regions);
 * the theme's section pages return 200 + empty past their end, which would stop
 * a multi-section crawl early. The feed has title, permalink, date and the
 * publishing account, but no price / type / city → those come from the ad page.
 *
 * Ad page: price_area, property_category / property_action_category links,
 * "Détails" + "Adresse" panels (<strong>Label:</strong> value), description,
 * carousel. Seller phone: agent tel: link when filled, else the first number
 * in the description. The site's own WhatsApp (+33 776805294) is ignored.
 */

const BASE = "https://immobilier.sn";
const EUR_TO_XOF = 655.957;
const SITE_PHONES = new Set(["33776805294"]);

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/** property_category slug (or title words) → lab vocabulary. */
const CATEGORY_TYPES: [RegExp, string][] = [
  [/appartement|studio/, "appartement"],
  [/villa/, "villa"],
  [/maison/, "maison"],
  [/terrain|ferme|verger|hectare/, "terrain"],
  [/immeuble/, "immeuble"],
  [/bureau/, "bureau"],
  [/boutique|magasin|commerce|local/, "commercial"],
  [/chambre/, "chambre"],
];

export function immoType(categoryOrTitle: string | null | undefined, title = ""): string | null {
  const c = fold(categoryOrTitle ?? "");
  const hit = CATEGORY_TYPES.find(([re]) => re.test(c))?.[1] ?? null;
  if (hit === "appartement" && /meubl/.test(fold(title))) return "appartement-meuble";
  return hit;
}

export function immoTransaction(action: string | null | undefined, title = "", priceLabel = ""): Transaction {
  const a = fold(action ?? "");
  if (/vente/.test(a)) return "SALE";
  if (/location|louer|vacance/.test(a)) return "RENT";
  if (/\/\s*(mois|jour|nuit|semaine)/.test(fold(priceLabel))) return "RENT";
  const t = fold(title);
  if (/\b(a louer|location|louer)\b/.test(t)) return "RENT";
  if (/\b(a vendre|vente|vendre|cession)\b/.test(t)) return "SALE";
  return "UNKNOWN";
}

/** "160 000 000 FCFA" / "1 116 000 FCFA /mois" / "250 000 €" → XOF bigint (null if unknown / placeholder). */
export function immoPrice(raw: string | null | undefined): bigint | null {
  if (!raw) return null;
  const text = decodeEntities(raw);
  const m = text.match(/(\d[\d\s.  ]*\d|\d)/);
  if (!m) return null;
  const n = Number(m[1].replace(/[\s.  ]/g, ""));
  if (!Number.isFinite(n) || n < 1000) return null;
  if (/€|eur/i.test(text)) return BigInt(Math.round(n * EUR_TO_XOF));
  if (/\$|usd/i.test(text)) return null; // no stable rate — keep priceRaw only
  return BigInt(n);
}

function slugFromUrl(url: string) {
  const m = url.match(/\/estate_property\/([^/?#]+)/);
  if (!m) return null;
  try {
    return decodeURIComponent(m[1]).toLowerCase();
  } catch {
    return m[1].toLowerCase();
  }
}

const cdata = (s: string | undefined) => (s ? s.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1") : "");

/** RSS feed page → ads. Price, type and city are filled from the ad page. */
export function parseImmoFeed(xml: string): ParsedListing[] {
  const out = new Map<string, ParsedListing>();
  for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const url = item.match(/<link>([^<]+)<\/link>/)?.[1]?.trim();
    if (!url) continue;
    const externalId = slugFromUrl(url);
    if (!externalId || out.has(externalId)) continue;
    const title = decodeEntities(cdata(item.match(/<title>([\s\S]*?)<\/title>/)?.[1])).trim() || null;
    const excerpt = htmlToText(cdata(item.match(/<description>([\s\S]*?)<\/description>/)?.[1]).replace(/<p>The post[\s\S]*$/, ""));
    const pub = item.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1];
    const posted = pub ? new Date(pub) : null;
    const creator = decodeEntities(cdata(item.match(/<dc:creator>([\s\S]*?)<\/dc:creator>/)?.[1])).trim() || null;

    out.set(externalId, {
      externalId,
      url,
      title,
      transaction: immoTransaction(null, title ?? ""),
      propertyType: immoType(title, title ?? ""),
      priceXof: null,
      priceRaw: null,
      surfaceM2: surfaceFromText(title) ?? surfaceFromText(excerpt),
      bedrooms: bedroomsFromText(title) ?? bedroomsFromText(excerpt),
      city: null,
      locationRaw: null,
      sellerName: creator,
      sellerPhone: null,
      postedAt: posted && !Number.isNaN(posted.getTime()) ? posted : null,
    });
  }
  return [...out.values()];
}

/**
 * Ad page → detail. Besides ParsedDetail it returns priceXof / priceRaw /
 * transaction / propertyType / city: ingest writes every non-null key onto
 * ListingRaw, and this site only shows these on the ad page.
 */
export function parseImmoDetail(html: string): ParsedDetail & {
  priceXof: bigint | null;
  priceRaw: string | null;
  transaction: Transaction;
  propertyType: string | null;
  city: string | null;
} {
  const fields = new Map<string, string>();
  for (const m of html.matchAll(/<div class="listing_detail[^"]*"[^>]*>\s*<strong>([\s\S]*?)<\/strong>([\s\S]*?)<\/div>/g)) {
    const label = fold(htmlToText(m[1]) ?? "").replace(/\s*:\s*$/, "");
    if (!fields.has(label)) fields.set(label, htmlToText(m[2]) ?? "");
  }
  const field = (...keys: string[]) => {
    for (const k of keys) {
      const v = [...fields.entries()].find(([l]) => l.startsWith(k))?.[1];
      if (v) return v;
    }
    return null;
  };
  const int = (...keys: string[]) => {
    const v = field(...keys);
    const n = v ? Number(v.replace(/[^\d]/g, "")) : NaN;
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  const title = htmlToText(html.match(/<h1 class="entry-title entry-prop">([\s\S]*?)<\/h1>/)?.[1]) ?? "";
  const priceArea = html.match(/<div class="price_area">([\s\S]*?)<\/div>/)?.[1] ?? "";
  const priceLabel = htmlToText(priceArea.match(/<span class="price_label">([\s\S]*?)<\/span>/)?.[1]) ?? "";
  const priceText = htmlToText(priceArea) ?? field("prix");
  const category = html.match(/href="https:\/\/immobilier\.sn\/property_category\/([^/"]+)\/?"/)?.[1] ?? null;
  const action = html.match(/href="https:\/\/immobilier\.sn\/property_action_category\/([^/"]+)\/?"/)?.[1] ?? null;

  const descHtml = html.match(/<div class="wpestate_property_description"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? "";
  const description = htmlToText(
    descHtml
      .replace(/<h4[^>]*>[\s\S]*?<\/h4>/, "")
      .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))),
  );

  // Sellers sometimes type junk ("all", "-") in the city field.
  const usable = (v: string | null) => (v && v.length > 2 && !/^(all|tous|toutes|n\/?a|-+)$/i.test(v) ? v : null);
  const ville = usable(field("ville"));
  const region = usable(field("region"));
  const quartier = usable(field("quartier"));
  const locationRaw = [quartier, ville, region].filter(Boolean).join(", ") || null;

  // Slides of the property carousel (stop at its indicators so sidebar images don't count).
  const carousel = html.match(/id="property_slider_carousel"[\s\S]*?(?:<ol class="carousel-indicators"|$)/)?.[0] ?? "";
  const photos = (carousel.match(/<div class="item[\s"]/g) ?? []).length;
  const surfaceField = field("superficie", "taille du terrain", "surface");

  const agentTel = [...html.matchAll(/href="tel:([^"]*)"/g)].map((m) => normalizePhone(m[1])).find((p) => p && !SITE_PHONES.has(p));
  const descPhone = [...(description ?? "").matchAll(/(?:\+|00)?(?:221[\s.-]?)?(?:7[05678]|3[03])[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}|\+\d[\d\s.-]{7,16}\d/g)]
    .map((m) => normalizePhone(m[0]))
    .find((p) => p && !SITE_PHONES.has(p));

  return {
    description,
    rooms: int("pieces", "nombre de pieces"),
    bedrooms: int("chambres") ?? bedroomsFromText(title) ?? bedroomsFromText(description),
    bathrooms: int("salles de bain", "salle de bain", "salles d'eau"),
    // "265 m<sup>2</sup>" → "265 m2": parse as a surface, never strip to digits (would give 2652).
    surfaceM2:
      surfaceFromText(surfaceField) ??
      (surfaceField && /^\s*[\d\s.,]+\s*$/.test(surfaceField) ? Number(surfaceField.replace(/[\s.]/g, "").replace(",", ".")) || null : null) ??
      surfaceFromText(title) ??
      surfaceFromText(description),
    photoCount: photos || null,
    locationRaw,
    sellerPhone: agentTel ?? descPhone ?? null,
    priceXof: immoPrice(priceText),
    priceRaw: priceText ? priceText.replace(/\s+/g, " ").trim() : null,
    transaction: immoTransaction(action, title, priceLabel),
    propertyType: immoType(category, title) ?? immoType(title, title),
    city: region ?? ville ?? null,
  };
}

export const immobilierSn: Connector = {
  slug: "immobilier-sn",
  pageUrl: (page) =>
    page <= 1 ? `${BASE}/feed/?post_type=estate_property` : `${BASE}/feed/?post_type=estate_property&paged=${page}`,
  parseIndex: (xml) => parseImmoFeed(xml),
  parseDetail: parseImmoDetail,
};
