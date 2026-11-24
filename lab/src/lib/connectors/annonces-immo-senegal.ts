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
 * Annonces Immobilières Sénégal ("Sénégal Immobilier", WordPress + Essential Real Estate).
 * ⚠ CGU forbid bulk reproduction — crawled by product-owner override 24/11/2026,
 * internal research only, never republished.
 *
 * Index: /annonces-immobilieres/page/N/ — 10 cards per page (~59 pages), each with
 * data-property-id, status badge (a-vendre / a-louer), price (+ postfix "/ mois",
 * "/ nuit", "/ HT", "/ m²"), type link (/types/<slug>/), seller, relative date,
 * surface / bedrooms / bathrooms info items, photo count.
 * Ad page: overview list, description, seller mobile, approximate map sector
 * (data-lat/lng = centre of a ~2.5 km circle, NOT the exact address), datePublished.
 */

const BASE = "https://annonces-immobilieres-senegal.com";
const EUR_TO_XOF = 655.957;

const NAMED: Record<string, string> = {
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", laquo: "«", raquo: "»", hellip: "…", ndash: "–", mdash: "—",
  eacute: "é", egrave: "è", ecirc: "ê", agrave: "à", acirc: "â", ccedil: "ç", ocirc: "ô", ucirc: "û", icirc: "î", euro: "€", sup2: "²",
};
const decodeNamed = (s: string | null) =>
  s ? decodeEntities(s.replace(/&([a-z0-9]+);/gi, (m, n: string) => NAMED[n.toLowerCase()] ?? m)) : s;

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const strip = (s: string | null | undefined) =>
  s ? decodeEntities(s.replace(/<sup>2<\/sup>/gi, "²").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim() || null : null;

const TYPE_MAP: Record<string, string> = {
  terrain: "terrain",
  champ: "terrain",
  "propriete-agricole": "terrain",
  ferme: "terrain",
  "appartement-chambre": "appartement",
  studio: "appartement",
  "duplex-triplex": "appartement",
  "loft-atelier": "appartement",
  residence: "appartement",
  gite: "appartement-meuble",
  "maison-villa": "maison",
  villa: "villa",
  immeuble: "immeuble",
  hotel: "immeuble",
  "bureau-local-professionnel": "bureau",
  "local-professionnel": "bureau",
  "fonds-de-commerce": "commercial",
  "local-commercial": "commercial",
  boutique: "commercial",
  commerce: "commercial",
  entrepot: "commercial",
  magasin: "commercial",
  restaurant: "commercial",
  "station-service": "commercial",
  "garage-parking": "commercial",
  chambre: "chambre",
};

export function aisPropertyType(typeSlug: string | null, title: string | null, postfix: string | null): string | null {
  let t = typeSlug ? (TYPE_MAP[typeSlug] ?? null) : null;
  const f = fold(`${title ?? ""} ${postfix ?? ""}`);
  if (!t) {
    if (/terrain|parcelle|champ|hectare/.test(f)) t = "terrain";
    else if (/villa/.test(f)) t = "villa";
    else if (/appartement|studio|f[2-6]\b/.test(f)) t = "appartement";
    else if (/maison/.test(f)) t = "maison";
  }
  // Short stays (priced per night/day) or "meublé" → furnished unit.
  if (t && t !== "terrain" && !t.endsWith("-meuble") && /\/\s*(nuit|jour)|meuble/.test(f)) {
    if (t === "appartement" || t === "maison" || t === "villa") t = "appartement-meuble";
  }
  return t;
}

export function aisTransaction(statusSlug: string | null, title: string | null, postfix: string | null): Transaction {
  if (statusSlug === "a-vendre") return "SALE";
  if (statusSlug === "a-louer") return "RENT";
  const f = fold(`${title ?? ""} ${postfix ?? ""}`);
  if (/\/\s*(mois|nuit|jour|an)\b|\blouer\b|location/.test(f)) return "RENT";
  if (/vendre|vente|cession/.test(f)) return "SALE";
  return "UNKNOWN";
}

/** "6.500.000 Fcfa" + postfix → XOF total. "/ m²" prices need the surface. */
export function aisPrice(amountText: string | null, postfix: string | null, surfaceM2: number | null): bigint | null {
  if (!amountText) return null;
  const digits = amountText.replace(/[^\d,]/g, "").replace(/,\d{1,2}$/, "").replace(/,/g, "");
  let n = Number(digits);
  if (!Number.isFinite(n) || n <= 0) return null;
  if (/€|eur/i.test(amountText)) n *= EUR_TO_XOF;
  if (postfix && /m²|m2/i.test(postfix)) {
    if (!surfaceM2) return null;
    n *= surfaceM2;
  }
  return n >= 1000 ? BigInt(Math.round(n)) : null;
}

/** "3 jours environ", "1 semaine environ", "2 mois environ" → approximate Date. */
export function aisAge(raw: string | null, now = new Date()): Date | null {
  const m = raw ? fold(raw).match(/(\d+)\s*(seconde|minute|heure|jour|semaine|mois|an)/) : null;
  if (!m) return null;
  const mins: Record<string, number> = { seconde: 0, minute: 1, heure: 60, jour: 1440, semaine: 10080, mois: 43200, an: 525600 };
  return new Date(now.getTime() - Number(m[1]) * mins[m[2]] * 60_000);
}

function infoValue(block: string, cls: string): string | null {
  const m = block.match(new RegExp(`ere__loop-property-info-item ${cls}"[\\s\\S]*?ere__lpi-value">([\\s\\S]*?)<\\/span>`));
  return strip(m?.[1]);
}

function surfaceValue(text: string | null): number | null {
  if (!text) return null;
  const m = text.match(/([\d.\s ]+(?:,\d+)?)\s*m/i);
  if (!m) return surfaceFromText(text);
  const n = Number(m[1].replace(/[.\s ]/g, "").replace(",", "."));
  return n > 0 && n < 100_000_000 ? n : null;
}

function priceParts(block: string) {
  const m = block.match(
    /class="property-price ere__loop-property-price[^"]*">\s*([^<]*?)\s*(?:<span class="property-price-postfix">([^<]*)<\/span>)?\s*<\/span>/,
  );
  const amount = m ? decodeEntities(m[1]).trim() || null : null;
  const postfix = m?.[2] ? decodeEntities(m[2]).trim() || null : null;
  return { amount, postfix, raw: amount ? [amount, postfix].filter(Boolean).join(" ") : null };
}

function locationFromTitle(title: string | null): string | null {
  // "Terrain … à vendre – Thiéppe, Lompoul"
  const parts = title?.split(/\s[–—-]\s/);
  return parts && parts.length > 1 ? parts[parts.length - 1].trim() || null : null;
}

export function parseAisIndex(html: string, now = new Date()): ParsedListing[] {
  const out = new Map<string, ParsedListing>();
  for (const block of html.split(/<div class="mg-bottom-30 ere-item-wrap/).slice(1)) {
    const externalId = block.match(/data-property-id="(\d+)"/)?.[1];
    const href = block.match(/class="property-link" href="([^"]+)"/)?.[1] ?? block.match(/<h2 class="property-title">\s*<a href="([^"]+)"/)?.[1];
    if (!externalId || !href || out.has(externalId)) continue;

    const title = strip(block.match(/<h2 class="property-title">\s*<a[^>]*>([\s\S]*?)<\/a>/)?.[1]);
    const status = block.match(/ere__term-status ([a-z-]+)/)?.[1] ?? null;
    const typeSlug = block.match(/\/types\/([a-z0-9-]+)\//)?.[1] ?? null;
    const { amount, postfix, raw } = priceParts(block);
    const surfaceM2 = surfaceValue(infoValue(block, "property-area")) ?? surfaceFromText(title);
    const beds = infoValue(block, "property-bedrooms");
    const location =
      strip(block.match(/class="property-location[^"]*"[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>/)?.[1]) ?? locationFromTitle(title);

    out.set(externalId, {
      externalId,
      url: href.startsWith("http") ? href : `${BASE}${href}`,
      title,
      transaction: aisTransaction(status, title, postfix),
      propertyType: aisPropertyType(typeSlug, title, postfix),
      priceXof: aisPrice(amount, postfix, surfaceM2),
      priceRaw: raw,
      surfaceM2,
      bedrooms: beds ? Number(beds.replace(/\D/g, "")) || null : bedroomsFromText(title),
      city: location?.includes(",") ? location.split(",").pop()!.trim() : null,
      locationRaw: location,
      sellerName: strip(block.match(/class="property-agent">\s*<a[^>]*title="([^"]*)"/)?.[1]),
      sellerPhone: null, // ad page only
      postedAt: aisAge(strip(block.match(/fa-calendar"><\/i>\s*([^<]+)</)?.[1]), now),
    });
  }
  return [...out.values()];
}

/** Detail adds fields beyond ParsedDetail; ingest writes every non-null key to ListingRaw. */
export type AisDetail = ParsedDetail & {
  lat: number | null;
  lng: number | null;
  city: string | null;
  priceXof: bigint | null;
};

export function parseAisDetail(html: string): AisDetail {
  const overview = new Map<string, string>();
  const ov = html.match(/ere__single-property-overview[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/)?.[1] ?? "";
  for (const m of ov.matchAll(/<li>\s*<strong>([\s\S]*?)<\/strong>\s*([\s\S]*?)<\/li>/g)) {
    overview.set(fold(strip(m[1]) ?? ""), m[2]);
  }
  const num = (...keys: string[]) => {
    for (const k of keys) {
      const v = strip([...overview.entries()].find(([o]) => o.startsWith(k))?.[1]);
      const n = v ? Number(v.replace(/[^\d]/g, "")) : NaN;
      if (Number.isFinite(n) && n > 0) return n;
    }
    return null;
  };

  const description = decodeNamed(
    htmlToText(html.match(/ere__single-property-description">[\s\S]*?<div class="ere-property-element">([\s\S]*?)<\/div>\s*<\/div>/)?.[1]),
  );
  const surfaceM2 =
    surfaceValue(strip(overview.get("surface"))) ?? surfaceValue(strip(overview.get("surface du terrain"))) ?? surfaceFromText(description);
  const { amount, postfix } = priceParts(html);

  const map = html.match(/data-lat="(-?\d+(?:\.\d+)?)"\s+data-lng="(-?\d+(?:\.\d+)?)"/);
  const sector = strip(html.match(/Secteur approximatif\s*:\s*<strong>([\s\S]*?)<\/strong>/)?.[1]);
  const photos = Number(html.match(/title="\((\d+)\) Photos"/)?.[1] ?? NaN);
  const published = html.match(/"datePublished":"([^"]+)"/)?.[1];
  const postedAt = published ? new Date(published) : null;

  return {
    description,
    rooms: num("pieces"),
    bedrooms: num("chambres") ?? bedroomsFromText(description),
    bathrooms: num("salles de bain", "salle de bain", "salles d'eau"),
    surfaceM2,
    photoCount: Number.isFinite(photos) && photos > 0 ? photos : null,
    locationRaw: sector ?? strip(html.match(/ere__single-property-location"[^>]*>[\s\S]*?<span>([\s\S]*?)<\/span>/)?.[1]),
    sellerPhone: normalizePhone(strip(html.match(/class="ere__mobile">[\s\S]*?<span>([^<]+)<\/span>/)?.[1]) ?? html.match(/href="tel:([^"]+)"/)?.[1]),
    sellerName: strip(html.match(/<h4 class="ere__agent-name">[\s\S]*?>([^<]+)<\/a>/)?.[1]),
    postedAt: postedAt && !Number.isNaN(postedAt.getTime()) ? postedAt : null,
    lat: map ? Number(map[1]) : null,
    lng: map ? Number(map[2]) : null,
    city: sector?.includes(",") ? sector.split(",").pop()!.trim() : null,
    priceXof: aisPrice(amount, postfix, surfaceM2),
  };
}

export const annoncesImmoSenegal: Connector = {
  slug: "annonces-immo-senegal",
  pageUrl: (page) => (page <= 1 ? `${BASE}/annonces-immobilieres/` : `${BASE}/annonces-immobilieres/page/${page}/`),
  parseIndex: (html, now) => parseAisIndex(html, now),
  parseDetail: parseAisDetail,
};
