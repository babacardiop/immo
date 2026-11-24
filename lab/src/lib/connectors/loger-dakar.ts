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
 * Loger-Dakar connector (WordPress + G5 ERE theme).
 * Index: /Bien/ and /Bien/page/N/ (all properties, 21 per page). Each
 * <article class="… g5ere__property-item …"> has data-id, a data-location JSON
 * (lat/lng, url, title, neighbourhood) and taxonomy classes
 * (property-type-*, property-status-a-louer|a-vendre, property-city-*).
 * Ad page: details list, description, gallery, publish date, listing agent
 * (name + phone). /properties/ is a members area (redirects to login) — not used.
 * robots.txt (Yoast) only blocks ?s=, /search/, /wp-json/. No ToS page (footer link "#").
 */

const BASE = "https://www.loger-dakar.com";
const EUR_TO_XOF = 655.957;

const TYPES: Record<string, string> = {
  appartement: "appartement",
  studio: "appartement",
  "maison-villa": "maison",
  maison: "maison",
  villa: "villa",
  terrain: "terrain",
  immeuble: "immeuble",
  magasin: "commercial",
  commerce: "commercial",
  cafe: "commercial",
  restaurant: "commercial",
  entrepot: "commercial",
  "local-commercial": "commercial",
  bureau: "bureau",
  bureaux: "bureau",
  chambre: "chambre",
};

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const strip = (s: string | null | undefined) =>
  s ? decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim() || null : null;
const titleCase = (slug: string) =>
  slug
    .split("-")
    .filter((w) => !/^\d+$/.test(w))
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

/** "800 000 Mille F.CFA" → 800000 ("Mille" is a theme label, not ×1000); "€ 150 000" → EUR. */
export function parseLogerPrice(raw: string | null): { xof: bigint | null; currency: "XOF" | "EUR" } {
  if (!raw) return { xof: null, currency: "XOF" };
  const currency = /€|eur/i.test(raw) ? "EUR" : "XOF";
  const m = raw.match(/\d{1,3}(?:[\s.  ]\d{3})+|\d+/);
  const n = m ? Number(m[0].replace(/[\s.  ]/g, "")) : NaN;
  if (!Number.isFinite(n) || n < 1000) return { xof: null, currency };
  return { xof: BigInt(Math.round(currency === "EUR" ? n * EUR_TO_XOF : n)), currency };
}

/**
 * An unambiguous title wins: agents sometimes leave the status on "à louer"
 * for plots clearly "à vendre" (seen: 5 585 m² TF à vendre tagged A LOUER).
 */
export function logerTransaction(status: string | null, title: string | null): Transaction {
  const t = fold(title ?? "");
  const saysRent = /\b(louer|location)\b/.test(t);
  const saysSale = /\b(vendre|vente)\b/.test(t);
  if (saysSale && !saysRent) return "SALE";
  if (saysRent && !saysSale) return "RENT";
  if (status === "a-louer" || status === "location") return "RENT";
  if (status === "a-vendre" || status === "vente") return "SALE";
  return "UNKNOWN";
}

function logerType(typeSlug: string | null, title: string | null): string | null {
  const base = typeSlug ? (TYPES[typeSlug] ?? typeSlug) : null;
  const t = fold(title ?? "");
  if ((base === "appartement" || base == null) && /\bmeubl/.test(t)) return "appartement-meuble";
  if (base === "maison" && /\bvilla\b/.test(t)) return "villa";
  return base;
}

type LocationJson = { position?: { lat?: string; lng?: string }; url?: string; title?: string; address?: string };

export function parseLogerIndex(html: string): ParsedListing[] {
  const out = new Map<string, ParsedListing>();
  const parts = html.split(/<article class="(?=[^"]*g5ere__property-item)/).slice(1);
  for (const part of parts) {
    const cls = part.slice(0, part.indexOf('"'));
    const externalId = part.match(/data-id="(\d+)"/)?.[1];
    if (!externalId || out.has(externalId)) continue;
    const block = part.split(/<\/article>/)[0];

    let loc: LocationJson = {};
    const rawLoc = block.match(/data-location="([^"]*)"/)?.[1];
    if (rawLoc) {
      try {
        loc = JSON.parse(decodeEntities(rawLoc)) as LocationJson;
      } catch {
        loc = {};
      }
    }
    const url =
      loc.url ?? block.match(/href="(https:\/\/www\.loger-dakar\.com\/Bien\/[^"]+)"/)?.[1] ?? `${BASE}/?p=${externalId}`;
    const title =
      strip(block.match(/g5ere__loop-property-title">\s*<a[^>]*>([\s\S]*?)<\/a>/)?.[1]) ??
      (loc.title ? decodeEntities(loc.title) : null);

    const typeSlug = cls.match(/\bproperty-type-([a-z0-9-]+)/)?.[1] ?? null;
    const status = cls.match(/\bproperty-status-([a-z0-9-]+)/)?.[1] ?? null;
    const citySlug = cls.match(/\bproperty-city-([a-z0-9-]+)/)?.[1] ?? null;
    const neighborhood =
      strip(block.match(/g5ere__loop-property-address">\s*<a[^>]*>([\s\S]*?)<\/a>/)?.[1]) ??
      (loc.address ? decodeEntities(loc.address) : null);
    const city = citySlug ? titleCase(citySlug) : null;

    const priceText = strip(block.match(/g5ere__lpp-price">([\s\S]*?)<\/span>/)?.[1]);
    const postfix = strip(block.match(/g5ere__lpp-postfix">([\s\S]*?)<\/span>/)?.[1]);
    const { xof } = parseLogerPrice(priceText);
    const propertyType = logerType(typeSlug, title);
    const beds = propertyType === "terrain" ? null : strip(block.match(/g5ere__property-bedrooms">([\s\S]*?)<\/span>/)?.[1]);
    const size = strip(block.match(/<li class="size"[\s\S]*?<span[^>]*class="[^"]*size[^"]*">([\s\S]*?)<\/span>/)?.[1]);

    const lat = Number(loc.position?.lat);
    const lng = Number(loc.position?.lng);
    const validCoords = Number.isFinite(lat) && Number.isFinite(lng) && lat > 12 && lat < 17 && lng > -18 && lng < -11;

    out.set(externalId, {
      externalId,
      url,
      title,
      transaction: logerTransaction(status, title),
      propertyType,
      priceXof: xof,
      priceRaw: priceText ? [priceText.replace(/\s*Mille\s*/i, " "), postfix].filter(Boolean).join(" ") : null,
      surfaceM2: surfaceFromText(size ? `${size} m²` : null) ?? surfaceFromText(title),
      bedrooms: beds ? Number(beds.replace(/\D/g, "")) || null : propertyType === "terrain" ? null : bedroomsFromText(title),
      city,
      locationRaw: neighborhood ? [neighborhood, city].filter(Boolean).join(", ") : city,
      sellerName: null,
      sellerPhone: null,
      postedAt: null,
      lat: validCoords ? lat : null,
      lng: validCoords ? lng : null,
    });
  }
  return [...out.values()];
}

export function parseLogerDetail(html: string): ParsedDetail {
  // <sup>2</sup> in "100 m<sup>2</sup>" must not become a digit.
  const list = (html.match(/g5ere__property-details-list">([\s\S]*?)<\/ul>/)?.[1] ?? "").replace(/<sup>[\s\S]*?<\/sup>/g, "");
  const field = (cls: string) => strip(list.match(new RegExp(`g5ere__property-${cls}">([\\s\\S]*?)</span>`))?.[1]);
  /** First number in the text: "05" → 5, "100 m" → 100, "1 200 m" → 1200. */
  const int = (v: string | null) => {
    const m = v?.match(/\d{1,3}(?:[\s. ]\d{3})+|\d+/);
    const n = m ? Number(m[0].replace(/[\s. ]/g, "")) : NaN;
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  const descHtml = html.match(
    /g5ere__property-block-description[\s\S]*?<div class="card-body">([\s\S]*?)(?:<div class="sharedaddy|<\/div>)/,
  )?.[1];
  const description = htmlToText(descHtml);

  const galStart = html.indexOf("g5ere__single-property-galleries");
  const galEnd = html.indexOf("g5ere__property-title-price", galStart);
  const gallery = galStart >= 0 ? html.slice(galStart, galEnd > galStart ? galEnd : galStart + 20000) : "";
  const photos = new Set(
    (gallery.match(/wp-content\\?\/uploads\\?\/\d{4}\\?\/\d{2}\\?\/[^"'&\s)]+?\.(?:jpe?g|png|webp)/gi) ?? []).map((u) =>
      u.replace(/\\/g, "").replace(/-\d+x\d+(?=\.)/, ""),
    ),
  ).size;

  const address = strip(html.match(/<div class="g5ere__property-address">\s*<a[^>]*>([\s\S]*?)<\/a>/)?.[1]);
  const agentStart = html.indexOf("g5ere__loop-agent-title");
  const agent = agentStart >= 0 ? html.slice(agentStart, agentStart + 4000) : "";
  const published = html.match(/article:published_time" content="(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})/);

  return {
    description,
    rooms: null,
    bedrooms: int(field("bedrooms")) ?? bedroomsFromText(description),
    bathrooms: int(field("bathrooms")),
    surfaceM2: int(field("size")) ?? int(field("land-size")) ?? surfaceFromText(description),
    photoCount: photos || null,
    locationRaw: address,
    sellerPhone: normalizePhone(agent.match(/href="tel:([^"]+)"/)?.[1]),
    postedAt: published ? new Date(`${published[1]}T${published[2]}Z`) : null,
    sellerName: strip(agent.match(/g5ere__loop-agent-title">\s*<a[^>]*>([\s\S]*?)<\/a>/)?.[1]),
  };
}

export const logerDakar: Connector = {
  slug: "loger-dakar",
  pageUrl: (page) => (page <= 1 ? `${BASE}/Bien/` : `${BASE}/Bien/page/${page}/`),
  parseIndex: (html) => parseLogerIndex(html),
  parseDetail: parseLogerDetail,
};
