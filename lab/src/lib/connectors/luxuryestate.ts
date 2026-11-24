import { decodeEntities } from "@/lib/connectors/expat-dakar";
import type { Connector, ParsedListing } from "@/lib/connectors/types";

/**
 * LuxuryEstate Sénégal (luxuryestate.com) — high-end aggregator (agency feeds: Saly Immo Sénégal…),
 * "152 listings" for sale + a rent section (Nov 2026). Index: /senegal?pag=N then /rent/senegal?pag=N,
 * 15 cards per page: li[data-id], title "Villa in Ngaparou, Région de Thiès", price "€ 800,400",
 * specs with icons #size / #bed / #bath, agency name, ad URL /p<id>-<type>-for-sale-<city>.
 * robots.txt allows (only /login-page disallowed). Prices in EUR → XOF at the fixed parity.
 */
const BASE = "https://www.luxuryestate.com";
const EUR_TO_XOF = 655.957;
export const LUXURYESTATE_PAGES_PER_SEGMENT = 15;
const SEGMENTS = [
  { path: "senegal", transaction: "SALE" as const },
  { path: "rent/senegal", transaction: "RENT" as const },
];

const TYPES: [RegExp, string][] = [
  [/villa|luxury-home|mansion|estate/, "villa"],
  [/penthouse|apartment|flat|loft|duplex/, "appartement"],
  [/house|cottage|townhouse/, "maison"],
  [/land|plot/, "terrain"],
  [/building/, "immeuble"],
  [/office/, "bureau"],
  [/hotel|commercial|shop|restaurant/, "commercial"],
];

const strip = (s: string) => decodeEntities(s.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();

export function luxuryPrice(raw: string | null): bigint | null {
  if (!raw) return null;
  const n = Number(raw.replace(/[^\d]/g, ""));
  if (!Number.isFinite(n) || n < 100) return null;
  if (raw.includes("€")) return BigInt(Math.round(n * EUR_TO_XOF));
  if (/xof|cfa/i.test(raw)) return BigInt(n);
  return null;
}

export function parseLuxuryIndex(html: string, url = ""): ParsedListing[] {
  const rent = /\/rent\//.test(url);
  const out: ParsedListing[] = [];
  for (const card of html.split('<li class="clearfix search-list__item').slice(1)) {
    const id = card.match(/data-id="(\d+)"/)?.[1];
    const a = card.match(/class="js_clickable style-button details_title"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    if (!id || !a) continue;
    const href = a[1];
    const title = strip(a[2]) || null;
    const priceRaw = strip(card.match(/<div class="price[^"]*">([\s\S]*?)<\/div>/)?.[1] ?? "") || null;
    const specs = card.match(/<div class="specs[^"]*">([\s\S]*?)<\/div>/)?.[1] ?? "";
    const spec = (icon: string) => specs.match(new RegExp(`#${icon}"></use>\\s*</svg>\\s*([\\d.,\\s]+)`))?.[1]?.replace(/[\s.,]/g, "");
    const slug = href.match(/\/p\d+-([a-z0-9-]+)$/)?.[1] ?? "";
    const typeWord = slug.split(/-for-(?:sale|rent)-/)[0];
    const place = title?.match(/ in (.+)$/)?.[1] ?? null;
    const agency = strip(card.match(/<span class="by">[^<]*<\/span>\s*<span[^>]*>([\s\S]*?)<\/span>/)?.[1] ?? "") || null;
    out.push({
      externalId: id,
      url: href,
      title,
      transaction: rent || /-for-rent-/.test(slug) ? "RENT" : "SALE",
      propertyType: TYPES.find(([re]) => re.test(typeWord))?.[1] ?? null,
      priceXof: luxuryPrice(priceRaw),
      priceRaw,
      surfaceM2: Number(spec("size")) || null,
      bedrooms: Number(spec("bed")) || null,
      city: place?.split(",")[0]?.trim() || null,
      locationRaw: place,
      sellerName: agency,
      postedAt: null,
    });
  }
  return out;
}

export const luxuryEstate: Connector = {
  slug: "luxuryestate-sn",
  pageUrl: (page) => {
    const i = Math.max(page, 1) - 1;
    const seg = SEGMENTS[Math.floor(i / LUXURYESTATE_PAGES_PER_SEGMENT)] ?? SEGMENTS[1];
    const p = Math.floor(i / LUXURYESTATE_PAGES_PER_SEGMENT) >= SEGMENTS.length ? 999 : (i % LUXURYESTATE_PAGES_PER_SEGMENT) + 1;
    return p === 1 ? `${BASE}/${seg.path}` : `${BASE}/${seg.path}?pag=${p}`;
  },
  parseIndex: (html, _now, url) => parseLuxuryIndex(html, url),
  // Sale segment then rent segment. Crawl with --pages=30.
  continueOnEmpty: true,
};
