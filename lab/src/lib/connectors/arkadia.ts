import type { Transaction } from "@prisma/client";
import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { bedroomsFromText, htmlToText, surfaceFromText, type Connector, type ParsedDetail, type ParsedListing } from "@/lib/connectors/types";

/**
 * Arkadia — Senegal (international aggregator, mostly agency stock).
 * ⚠ ToS forbid commercial use of content without consent. Crawled by
 * product-owner override 24/11/2026 for internal research only — never republished.
 *
 * Index: Senegal-wide, two segments interleaved so neither starves the other:
 *   odd pages  → /for-sale/senegal-g686/[pageK/]
 *   even pages → /for-rent/senegal-g686/[pageK/]   (K = ceil(page / 2))
 * 24 cards per page, schema.org microdata: <article class="property"> with
 * additionalType (House / Apartment / Land_lot…), price + currency, features
 * ("2 bd", "100 m²", "lot 2,000 m²", city) and addressLocality.
 * Past the last page the site returns 404.
 *
 * Ad page: additionalProperty name/value pairs (Listing type, Property type,
 * Bedrooms, Bathrooms, Lot size…), numberOfRooms, floorSize, description,
 * marketing member (/members/{handle}/). No phone is published (contact form only).
 */

const BASE = "https://en.arkadia.com";
const SN = "senegal-g686";
const EUR_TO_XOF = 655.957; // fixed parity
/** ⚠ Approximate floating rate — Arkadia shows XOF for SN today; only used if a USD price appears. */
export const USD_TO_XOF = 600;

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const strip = (s: string | null | undefined) =>
  s ? decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim() || null : null;
const num = (s: string | null | undefined) => {
  const n = s ? Number(s.replace(/[^\d.]/g, "")) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
};

/** productontology / "Property type" label → lab vocabulary. */
export function arkadiaType(raw: string | null | undefined): string | null {
  const t = fold(raw ?? "");
  if (!t) return null;
  if (/apartment|condo|flat|studio|penthouse|duplex/.test(t)) return "appartement";
  if (/land|lot|plot|terrain/.test(t)) return "terrain";
  if (/villa/.test(t)) return "villa";
  if (/office|bureau/.test(t)) return "bureau";
  if (/building|immeuble/.test(t)) return "immeuble";
  if (/commercial|retail|shop|store|warehouse|hotel|restaurant|business/.test(t)) return "commercial";
  if (/room|chambre/.test(t)) return "chambre";
  if (/house|home|residence|townhouse|bungalow|maison/.test(t)) return "maison";
  return null;
}

export function arkadiaTransaction(urlOrLabel: string | null | undefined): Transaction {
  const t = fold(urlOrLabel ?? "");
  if (/for-rent|for rent|\/rent|location|a louer/.test(t)) return "RENT";
  if (/for-sale|for sale|vente|a vendre/.test(t)) return "SALE";
  return "UNKNOWN";
}

function toXof(amount: number | null, currency: string | null): bigint | null {
  if (amount == null) return null;
  const cur = (currency ?? "XOF").toUpperCase();
  const xof = cur === "EUR" ? amount * EUR_TO_XOF : cur === "USD" ? amount * USD_TO_XOF : amount;
  return xof >= 1000 ? BigInt(Math.round(xof)) : null;
}

/** "eden-t120642107" → { id: "120642107", handle: "eden" } */
function idFromUrl(url: string) {
  const m = url.match(/\/([a-z0-9-]+?)-t(\d+)\/?$/i);
  return m ? { id: m[2], handle: m[1] } : null;
}

function titleFrom(description: string | null, type: string | null, locality: string | null) {
  const generic = !description || /^please contact|^veuillez contacter/i.test(description);
  if (!generic) {
    const first = description!.split(/(?<=[.!?])\s/)[0];
    return first.length > 140 ? `${first.slice(0, 137).trimEnd()}…` : first;
  }
  return [type ?? "Bien", locality].filter(Boolean).join(" — ");
}

export function parseArkadiaIndex(html: string, _now = new Date(), url?: string): ParsedListing[] {
  const pageTx = arkadiaTransaction(url ?? html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "");
  const out = new Map<string, ParsedListing>();
  for (const [block] of html.matchAll(/<article id="\d+" class="property"[\s\S]*?<\/article>/g)) {
    const href = block.match(/href="(https:\/\/en\.arkadia\.com\/[a-z0-9-]+-t\d+\/?)"/i)?.[1];
    const ids = href ? idFromUrl(href) : null;
    if (!href || !ids || out.has(ids.id)) continue;

    const addType = block.match(/itemprop="additionalType" content="[^"]*\/id\/([^"]+)"/)?.[1]?.replace(/_/g, " ");
    const propertyType = arkadiaType(addType);
    const priceMatch = block.match(/itemprop="price" content="([\d.]+)"[^>]*>\s*<span class=.currency.>([A-Z]{3})/);
    const priceXof = toXof(num(priceMatch?.[1]), priceMatch?.[2] ?? null);

    const featuresHtml = block.match(/<div class="features[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/a>/)?.[1] ?? "";
    const parts = featuresHtml.split(/<div class="divider"><\/div>/).map((p) => p.trim()).filter(Boolean);
    let bedrooms: number | null = null;
    let surface: number | null = null;
    let lot: number | null = null;
    let city: string | null = null;
    for (const p of parts) {
      const text = strip(p) ?? "";
      if (/\bbd\b/.test(text)) bedrooms = num(text.replace(/bd.*/, ""));
      else if (/^lot\b/i.test(text) && /m²/.test(text)) lot = num(text.replace(/m².*/, ""));
      else if (/m²/.test(text) && surface == null) surface = num(text.replace(/m².*/, ""));
      else if (!/<b>/.test(p) && !/^floor\b/i.test(text) && text) city = text;
    }
    if (city && /^s[eé]n[eé]gal$/i.test(city)) city = null; // country placeholder, not a city
    const locality = strip(block.match(/itemprop="addressLocality" content="([^"]*)"/)?.[1]);
    const description = strip(block.match(/<span itemprop="description">([\s\S]*?)<\/span>/)?.[1]);
    const locationRaw = [locality, city && fold(city) !== fold(locality ?? "") ? city : null].filter(Boolean).join(", ") || null;

    out.set(ids.id, {
      externalId: ids.id,
      url: href.endsWith("/") ? href : `${href}/`,
      title: titleFrom(description, addType ?? null, locality),
      transaction: pageTx,
      propertyType,
      priceXof,
      priceRaw: priceMatch ? `${priceMatch[2]} ${Number(priceMatch[1]).toLocaleString("fr-FR", { maximumFractionDigits: 0 })}` : null,
      surfaceM2: surface ?? (propertyType === "terrain" ? lot : null) ?? surfaceFromText(description),
      bedrooms: bedrooms ?? bedroomsFromText(description),
      city,
      locationRaw,
      sellerName: ids.handle,
      sellerPhone: null, // Arkadia publishes no phone (contact form only)
      postedAt: null,
    });
  }
  return [...out.values()];
}

export function parseArkadiaDetail(html: string): ParsedDetail & { transaction?: Transaction; propertyType?: string | null } {
  const props = new Map<string, string>();
  for (const m of html.matchAll(/<span itemprop="name">([^<]+)<\/span>\s*<span itemprop="value"[^>]*>([\s\S]*?)<\/span>/g)) {
    props.set(fold(m[1]).replace(/:$/, ""), strip(m[2]) ?? "");
  }
  const description = htmlToText(html.match(/<span itemprop="description" id="desc_expand"[^>]*>([\s\S]*?)<\/span>/)?.[1]);
  const locality = strip(html.match(/<span itemprop="addressLocality">([^<]*)<\/span>/)?.[1]);
  const handle = html.match(/\/members\/([a-z0-9-]+)\/listings\//i)?.[1] ?? null;
  const photos = new Set(html.match(/pictures\/properties\/w1024h1024\/[^"\s]+?\.jpg/g) ?? []).size;
  const typeLabel = props.get("property type") ?? null;
  const propertyType = arkadiaType(typeLabel);
  const floor = num(html.match(/itemprop="floorSize"[\s\S]*?itemprop="value" content="([\d.]+)"/)?.[1]);

  return {
    description,
    rooms: num(html.match(/<span itemprop="numberOfRooms">([^<]*)<\/span>/)?.[1]),
    bedrooms: num(props.get("bedrooms")) ?? bedroomsFromText(description),
    bathrooms: num(props.get("bathrooms")),
    surfaceM2: floor ?? (propertyType === "terrain" ? num(props.get("lot size")?.replace(/m².*/, "")) : null) ?? surfaceFromText(description),
    photoCount: photos || null,
    locationRaw: locality,
    sellerPhone: null,
    postedAt: null,
    sellerName: handle,
    ...(props.get("listing type") ? { transaction: arkadiaTransaction(props.get("listing type")) } : {}),
    ...(propertyType ? { propertyType } : {}),
  };
}

export const arkadia: Connector = {
  slug: "arkadia-dakar",
  pageUrl: (page) => {
    const k = Math.ceil(Math.max(page, 1) / 2);
    const seg = page % 2 === 1 ? "for-sale" : "for-rent";
    return `${BASE}/${seg}/${SN}/${k > 1 ? `page${k}/` : ""}`;
  },
  parseIndex: parseArkadiaIndex,
  parseDetail: parseArkadiaDetail,
  // Sale and rent pages are interleaved: one segment ending must not stop the other.
  // Needs ingest to treat a 404 as "empty segment" when continueOnEmpty is set (see report).
  continueOnEmpty: true,
};
