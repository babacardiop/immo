import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoPrice, immoType } from "@/lib/connectors/immobilier-sn";
import type { Connector, ParsedListing } from "@/lib/connectors/types";

/**
 * Green-Acres Sénégal (green-acres.fr, searchQuery=cn-sn) — "572 annonces", mostly Petite Côte agencies.
 * ⚠ Only the first 24 ads are reachable: further pages load through /AdvertListingActions/… and
 * /Search/LoadAdvertsForNavigation, both Disallowed in robots.txt; ?p= / ?page= are ignored.
 * This connector reads the 8 public sort orders instead. Cards: data-advertid, base64 link in data-o, price "… XOF",
 * localisation, tags (Type de bien, Chambres, Surface habitable).
 * ⚠ ToS: reproduction forbidden — product-owner override 24/11/2026 (internal research only).
 */
const BASE = "https://www.green-acres.fr";

const hex = (s: string) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));
const strip = (s: string) => decodeEntities(hex(s.replace(/<[^>]*>/g, " "))).replace(/[  ]/g, " ").replace(/\s+/g, " ").trim();

export function parseGreenAcresIndex(html: string): ParsedListing[] {
  const out: ParsedListing[] = [];
  for (const card of html.split(/<div class="announce-card [^"]*obf-link/).slice(1)) {
    const id = card.match(/data-advertid="([A-Za-z0-9]+)"/)?.[1];
    const o = card.match(/data-o="([A-Za-z0-9+/=]+)"/)?.[1];
    if (!id || !o) continue;
    const url = Buffer.from(o, "base64").toString("utf8");
    if (!url.startsWith(`${BASE}/fr/properties/`)) continue;
    const title = strip(card.match(/class="announce-info" title="([^"]*)"/)?.[1] ?? "") || null;
    const priceRaw = strip(card.match(/class="info-price"[^>]*>([\s\S]*?)<\/strong>/)?.[1] ?? "") || null;
    const loc = strip(card.match(/class="announce-localisation">([\s\S]*?)<\/div>/)?.[1] ?? "") || null;
    const tag = (label: string) => strip(card.match(new RegExp(`title="${label}">([\\s\\S]*?)</div>`))?.[1] ?? "") || null;
    const type = tag("Type de bien");
    const ch = tag("Chambres")?.match(/(\d+)/)?.[1];
    const surface = tag("Surface habitable")?.match(/(\d[\d ]*)/)?.[1]?.replace(/ /g, "");
    // "Somone (Mbour)" → quartier Somone, département Mbour.
    const dept = loc?.match(/\(([^)]+)\)/)?.[1] ?? null;
    out.push({
      externalId: id,
      url,
      title,
      // The cn-sn search is the "for sale" list (maison-a-vendre).
      transaction: "SALE",
      propertyType: immoType(type ?? title, title ?? "") ?? (/penthouse|duplex|loft/i.test(`${type} ${title}`) ? "appartement" : null),
      priceXof: /XOF/.test(priceRaw ?? "") ? immoPrice(priceRaw) : null,
      priceRaw,
      surfaceM2: surface ? Number(surface) : null,
      bedrooms: ch ? Number(ch) : null,
      city: dept ?? loc,
      locationRaw: loc,
      sellerName: null,
      postedAt: null,
    });
  }
  return out;
}

/**
 * Each public sort order shows a different first-24 slice (price ↑/↓, surface ↑/↓, €/m² ↑/↓,
 * newest): 8 ordinary GETs of the robots-allowed public page reach the extremes of the 572.
 * (Paging the rest would need the site's internal listing endpoints — not used.)
 */
export const GREEN_ACRES_ORDERS = ["relevance", "price_i", "price_d", "surface_i", "surface_d", "price_by_surface_i", "price_by_surface_d", "date_d"] as const;

export const greenAcres: Connector = {
  slug: "green-acres-sn",
  // Past the last order → repeat the default page: nothing new, the crawl ends at --pages=8.
  pageUrl: (page) => `${BASE}/maison-a-vendre?searchQuery=cn-sn&order=${GREEN_ACRES_ORDERS[Math.max(page, 1) - 1] ?? "relevance"}`,
  parseIndex: (html) => parseGreenAcresIndex(html),
  // Each order is its own slice: a slice with nothing new must not end the crawl.
  continueOnEmpty: true,
};
