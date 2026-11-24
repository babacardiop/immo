import { decodeEntities } from "@/lib/connectors/expat-dakar";
import { immoType } from "@/lib/connectors/immobilier-sn";
import { surfaceFromText, type Connector, type ParsedListing } from "@/lib/connectors/types";

/**
 * Appart.sn — Dakar-centred rentals portal (claims "1422 annonces"; ~250 live, Nov 2026).
 * Index: /location.html?page=N (48/page) then /vente.html?page=N (12/page); out-of-range
 * pages are empty. Each page embeds a JSON-LD ItemList: url, name, offers.price (XOF),
 * address.addressLocality ("Ngor • Dakar"). Transaction = segment.
 * ⚠ ToS: generic IP clause — product-owner override 24/11/2026 (internal research only).
 * Index only (prices of rooms / studios may be per night: priceRaw says so only in title).
 */
const BASE = "https://www.appart.sn";
export const APPART_PAGES_PER_SEGMENT = 30;
const SEGMENTS = [
  { path: "location.html", transaction: "RENT" as const },
  { path: "vente.html", transaction: "SALE" as const },
];

type LdItem = { url?: string; name?: string; offers?: { price?: number | string; priceCurrency?: string }; item?: { address?: { addressLocality?: string } } };

export function parseAppartIndex(html: string, url = ""): ParsedListing[] {
  const transaction = /\/vente[^/]*\.html/.test(url) ? "SALE" : /\/location[^/]*\.html/.test(url) ? "RENT" : null;
  const out: ParsedListing[] = [];
  const seen = new Set<string>();
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let j: { "@type"?: string; itemListElement?: LdItem[] };
    try {
      j = JSON.parse(m[1]);
    } catch {
      continue;
    }
    if (j["@type"] !== "ItemList") continue;
    for (const it of j.itemListElement ?? []) {
      const id = it.url?.match(/appart\.sn\/([0-9a-f]{32})\//)?.[1];
      if (!it.url || !id || seen.has(id)) continue;
      seen.add(id);
      const title = it.name ? decodeEntities(it.name).trim() : null;
      const t = (title ?? "").toLowerCase();
      const price = Number(it.offers?.price);
      const loc = it.item?.address?.addressLocality?.replace(/\s*•\s*/g, ", ").trim() || null;
      const propertyType = immoType(title, title ?? "");
      out.push({
        externalId: id,
        url: it.url,
        title,
        // vente.html also lists rentals: the title wins, then a sub-5 M price means rent, then the segment.
        transaction: /(à|a) louer|location/.test(t)
          ? "RENT"
          : /(à|a) vendre|vente/.test(t)
            ? "SALE"
            : transaction === "SALE" && Number.isFinite(price) && price < 5_000_000
              ? "RENT"
              : (transaction ?? "UNKNOWN"),
        propertyType,
        priceXof: Number.isFinite(price) && price >= 1000 && (it.offers?.priceCurrency ?? "XOF") === "XOF" ? BigInt(Math.round(price)) : null,
        priceRaw: it.offers?.price != null ? `${it.offers.price} ${it.offers.priceCurrency ?? ""}`.trim() : null,
        surfaceM2: surfaceFromText(title),
        bedrooms: null,
        city: loc?.split(",").pop()?.trim() || null,
        locationRaw: loc,
        sellerName: null,
        postedAt: null,
      });
    }
  }
  return out;
}

export const appartSn: Connector = {
  slug: "appart-sn",
  pageUrl: (page) => {
    const i = Math.max(page, 1) - 1;
    const seg = SEGMENTS[Math.floor(i / APPART_PAGES_PER_SEGMENT)];
    if (!seg) return `${BASE}/vente.html?page=999`;
    const p = (i % APPART_PAGES_PER_SEGMENT) + 1;
    return p === 1 ? `${BASE}/${seg.path}` : `${BASE}/${seg.path}?page=${p}`;
  },
  parseIndex: (html, _now, url) => parseAppartIndex(html, url),
  // Rent segment then sale segment — empty pages past each end must not stop the crawl. --pages=60.
  continueOnEmpty: true,
};
