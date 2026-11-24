import type { Transaction } from "@prisma/client";
import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoType } from "@/lib/connectors/immobilier-sn";
import { htmlToText, type Connector, type ParsedDetail, type ParsedListing } from "@/lib/connectors/types";
import { normalizePhone } from "@/lib/privacy/phone";

/**
 * Generic connector for sites that list every ad in a sitemap and describe each ad page with a
 * schema.org RealEstateListing JSON-LD (OroSira Immo… Nov 2026).
 * Index = sitemap <loc> matching `adPath` (title / type / transaction guessed from the slug when
 * it is readable). Ad page = JSON-LD: name, offers.price/priceCurrency, address, geo, floorSize,
 * numberOfRooms, datePosted, image[], seller.name / seller.telephone.
 */
const EUR_TO_XOF = 655.957;

type JsonLdDetail = ParsedDetail & {
  title?: string | null;
  transaction?: Transaction;
  propertyType?: string | null;
  priceXof?: bigint | null;
  priceRaw?: string | null;
  city?: string | null;
  lat?: number | null;
  lng?: number | null;
};

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function guessTransaction(text: string): Transaction {
  const t = fold(text);
  if (/\b(a louer|location|louer|bail|for rent)\b/.test(t)) return "RENT";
  if (/\b(a vendre|vente|vendre|cession|for sale)\b/.test(t)) return "SALE";
  return "UNKNOWN";
}

export function parseSitemapAds(xml: string, adPath: RegExp): ParsedListing[] {
  const out: ParsedListing[] = [];
  const seen = new Set<string>();
  for (const [, loc] of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    const m = loc.match(adPath);
    if (!m || seen.has(m[1])) continue;
    seen.add(m[1]);
    const words = /[a-z]{3,}-[a-z]{3,}/.test(m[1]) ? m[1].replace(/-/g, " ") : "";
    out.push({
      externalId: m[1],
      url: loc,
      title: null,
      transaction: guessTransaction(words),
      propertyType: words ? immoType(words, words) : null,
      priceXof: null,
      priceRaw: null,
      surfaceM2: null,
      bedrooms: null,
      city: null,
      locationRaw: null,
      sellerName: null,
      postedAt: null,
    });
  }
  return out;
}

type Ld = Record<string, any>;

function findListing(html: string): Ld | null {
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]);
      const nodes: Ld[] = Array.isArray(j) ? j : j["@graph"] ?? [j];
      const hit = nodes.find((n) => n?.["@type"] === "RealEstateListing" || (Array.isArray(n?.["@type"]) && n["@type"].includes("RealEstateListing")));
      if (hit) return hit;
    } catch {
      /* ignore malformed blocks */
    }
  }
  return null;
}

export function parseJsonLdDetail(html: string): JsonLdDetail {
  const ld = findListing(html) ?? {};
  const title = typeof ld.name === "string" ? decodeEntities(ld.name).trim() || null : null;
  const description = typeof ld.description === "string" ? htmlToText(ld.description) : null;
  const offer = Array.isArray(ld.offers) ? ld.offers[0] : ld.offers ?? {};
  const price = Number(offer?.price);
  const cur = String(offer?.priceCurrency ?? "XOF").toUpperCase();
  const priceXof = Number.isFinite(price) && price >= 1000 ? BigInt(Math.round(cur === "EUR" ? price * EUR_TO_XOF : price)) : null;
  const addr = ld.address ?? {};
  const city = typeof addr.addressLocality === "string" ? addr.addressLocality : null;
  const area = typeof addr.addressRegion === "string" && addr.addressRegion ? addr.addressRegion : null;
  const size = Number(ld.floorSize?.value);
  const posted = typeof ld.datePosted === "string" ? new Date(ld.datePosted.length === 10 ? `${ld.datePosted}T00:00:00Z` : ld.datePosted) : null;
  const seller = ld.seller ?? ld.offers?.seller ?? {};
  const tel = typeof seller.telephone === "string" ? seller.telephone : html.match(/href="tel:([+\d\s]+)"/)?.[1];
  const lat = Number(ld.geo?.latitude);
  const lng = Number(ld.geo?.longitude);
  let propertyType = immoType(title, title ?? "");
  let transaction = guessTransaction(`${title ?? ""} ${description?.slice(0, 200) ?? ""}`);
  // Land is (almost) never let: default it to sale.
  if (transaction === "UNKNOWN" && propertyType === "terrain") transaction = "SALE";
  if (propertyType === "appartement" && /meubl/i.test(title ?? "")) propertyType = "appartement-meuble";
  return {
    title,
    ...(transaction !== "UNKNOWN" ? { transaction } : {}),
    propertyType,
    priceXof,
    priceRaw: Number.isFinite(price) ? `${price} ${cur}` : null,
    city,
    ...(Number.isFinite(lat) && Number.isFinite(lng) && lat !== 0 ? { lat, lng } : {}),
    description,
    rooms: typeof ld.numberOfRooms === "number" ? ld.numberOfRooms : null,
    bedrooms: typeof ld.numberOfBedrooms === "number" ? ld.numberOfBedrooms : null,
    bathrooms: typeof ld.numberOfBathroomsTotal === "number" ? ld.numberOfBathroomsTotal : null,
    surfaceM2: Number.isFinite(size) && size > 0 ? size : null,
    photoCount: Array.isArray(ld.image) ? ld.image.length : null,
    locationRaw: [area, city].filter(Boolean).join(", ") || null,
    sellerPhone: normalizePhone(tel?.replace(/\s/g, "")),
    sellerName: typeof seller.name === "string" ? seller.name : null,
    postedAt: posted && !Number.isNaN(posted.getTime()) ? posted : undefined,
  };
}

export function jsonLdSitemapConnector(slug: string, sitemapUrl: string, adPath: RegExp): Connector {
  return {
    slug,
    // One sitemap = one page; page 2 → same URL → nothing new → the crawl ends (use --pages=1).
    pageUrl: () => sitemapUrl,
    parseIndex: (xml) => parseSitemapAds(xml, adPath),
    parseDetail: parseJsonLdDetail,
  };
}

export const oroSira = jsonLdSitemapConnector("orosira-sn", "https://immo.orosira.com/sitemap.xml", /\/fr\/property\/([0-9a-f-]{36})\/?$/);
