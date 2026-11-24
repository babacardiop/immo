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
 * Habita Sénégal connector (international agency network, ~194 SN listings, Nov 2026).
 *
 * ⚠ ToS (https://www.habita.com/terms-of-use): "Copying, transferring, modifying,
 * saving, publishing and distributing the content of Habita's website or part
 * thereof is prohibited without Habita's prior written consent." Not wired into
 * CONNECTORS — needs a product decision before any crawl. robots.txt allows all.
 *
 * Index = JSON endpoint used by the site's own search (AngularJS):
 *   GET /propertysearch/results/en/{page}/{perPage}/full?type=<T>&countries=34&sort=newest
 *   → { results: [{ id, area, area3, district, country, latitude, longitude,
 *        price, currency, convertedPrice, convertedCurrency, type, title, images }],
 *       numResults, totalPages }
 * The items do NOT say sale vs rent — only the `type` query param does
 * (ResidenceSale / ResidenceRent / LotSale / LotRent / CommercialSale / CommercialRent).
 * Ad page /property/{id}: details table, description, agent (name, phone).
 * Phones here are the Habita *agent's*, not the owner's.
 */

const BASE = "https://www.habita.com";
const COUNTRY_SN = 34;
const PER_PAGE = 200; // SN totals are small (ResidenceSale = 133); one page per type.
/** One index "page" per search type, biggest first. */
export const HABITA_TYPES = ["ResidenceSale", "ResidenceRent", "LotSale", "CommercialSale", "CommercialRent", "LotRent"] as const;

const EUR_TO_XOF = 655.957; // fixed parity
/** ⚠ Floating rate — approximate (Nov 2026). Only used if an ad is priced in USD. */
const USD_TO_XOF = 600;

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

const TYPE_MAP: [RegExp, string][] = [
  [/villa/, "villa"],
  [/apartment|flat|studio|condo/, "appartement"],
  [/house|townhouse|row house|cottage/, "maison"],
  [/plot|lot\b|land|terrain/, "terrain"],
  [/office/, "bureau"],
  [/building|immeuble/, "immeuble"],
  [/commercial|retail|shop|business|warehouse|premises|hotel|restaurant/, "commercial"],
  [/room|chambre/, "chambre"],
];

export function habitaPropertyType(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const t = fold(raw);
  return TYPE_MAP.find(([re]) => re.test(t))?.[1] ?? t;
}

export function habitaTransaction(url: string | undefined, title: string | null): Transaction {
  const type = url?.match(/[?&]type=([A-Za-z]+)/)?.[1];
  if (type?.endsWith("Sale")) return "SALE";
  if (type?.endsWith("Rent")) return "RENT";
  const t = fold(title ?? "");
  if (/\b(for sale|a vendre|vente|sale)\b/.test(t)) return "SALE";
  if (/\b(for rent|to rent|a louer|location|rent|rental)\b/.test(t)) return "RENT";
  return "UNKNOWN";
}

export function toXof(price: number, currency: string | null | undefined): bigint | null {
  if (!Number.isFinite(price)) return null;
  const c = fold(currency ?? "cfa");
  const xof =
    c === "cfa" || c === "xof" || c === "fcfa" || c === "f cfa"
      ? price
      : c === "€" || c === "eur"
        ? price * EUR_TO_XOF
        : c === "$" || c === "usd"
          ? price * USD_TO_XOF
          : NaN;
  return Number.isFinite(xof) && xof >= 1000 ? BigInt(Math.round(xof)) : null;
}

type HabitaItem = {
  id: number | string;
  area?: string | null;
  area3?: string | null;
  district?: string | null;
  country?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  price?: number | null;
  currency?: string | null;
  convertedPrice?: number | null;
  convertedCurrency?: string | null;
  type?: string | null;
  title?: string | null;
};

/** ParsedListing + coordinates (the ingest does not persist lat/lng yet). */
export type HabitaListing = ParsedListing & { lat: number | null; lng: number | null };

/**
 * `body` is the JSON text of one results page. `url` (optional) is the request
 * URL — the only place that says sale vs rent; without it we fall back to the title.
 */
export function parseHabitaIndex(body: string, _now = new Date(), url?: string): HabitaListing[] {
  let data: { results?: HabitaItem[] };
  try {
    data = JSON.parse(body);
  } catch {
    return [];
  }
  const out = new Map<string, HabitaListing>();
  for (const r of data.results ?? []) {
    const externalId = String(r.id ?? "");
    if (!externalId || out.has(externalId)) continue;
    if (r.country && fold(r.country) !== "senegal") continue;

    const title = r.title ? decodeEntities(r.title).trim() : null;
    let priceXof = r.price != null ? toXof(Number(r.price), r.currency) : null;
    if (priceXof == null && r.convertedPrice != null) priceXof = toXof(Number(r.convertedPrice), r.convertedCurrency);
    const locationRaw = [r.area3, r.district].filter(Boolean).join(", ") || null;

    out.set(externalId, {
      externalId,
      url: `${BASE}/property/${externalId}`,
      title,
      transaction: habitaTransaction(url, title),
      propertyType: habitaPropertyType(r.type),
      priceXof,
      priceRaw: r.price != null ? `${Number(r.price).toLocaleString("fr-FR")} ${r.currency ?? ""}`.trim() : null,
      surfaceM2: surfaceFromText(r.area),
      bedrooms: bedroomsFromText(title),
      city: null, // API gives area3 (neighbourhood) + country only
      locationRaw,
      sellerName: null, // on the ad page (agent)
      sellerPhone: null, // on the ad page (agent)
      postedAt: null,
      lat: typeof r.latitude === "number" ? r.latitude : null,
      lng: typeof r.longitude === "number" ? r.longitude : null,
    });
  }
  return [...out.values()];
}

/** Ad page: details table, description, location heading, agent block. */
export function parseHabitaDetail(html: string): ParsedDetail {
  const table = new Map<string, string>();
  for (const m of html.matchAll(/<tr>\s*<th>([\s\S]*?)<\/th>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/g)) {
    const k = fold(htmlToText(m[1]) ?? "");
    if (k && !table.has(k)) table.set(k, htmlToText(m[2]) ?? "");
  }
  const num = (...keys: string[]) => {
    for (const k of keys) {
      const v = table.get(k);
      const n = v ? Number(v.replace(/[^\d]/g, "")) : NaN;
      if (Number.isFinite(n) && n > 0) return n;
    }
    return null;
  };
  const description = htmlToText(html.match(/<div id="promotion-text">([\s\S]*?)<\/div>/)?.[1]);
  const h1 = htmlToText(html.match(/<div id="descriptions"[^>]*>\s*<h1>([\s\S]*?)<\/h1>/)?.[1]);
  const h4 = htmlToText(html.match(/<div id="descriptions"[^>]*>[\s\S]*?<h4>([\s\S]*?)<\/h4>/)?.[1]);
  const quartier = h1?.includes(",") ? h1.split(",").slice(1).join(",").trim() : null;
  const area3 = h4 ? h4.replace(/^[\d\s]+/, "").trim() || null : null; // "12 300 Ouakam" → "Ouakam"
  const rep = html.match(/<div class="representative[\s\S]*?<div class="contact">([\s\S]*?)<\/div>/);
  const repName = htmlToText(html.match(/<div class="representative[\s\S]*?<h3>([\s\S]*?)<\/h3>/)?.[1]);

  const id = table.get("listing number") ?? html.match(/\/property\/(\d+)/)?.[1];
  const photos = id
    ? new Set(
        (html.match(new RegExp(`cloudfront\\.net/[a-zA-Z_]+/${id}/([a-z0-9]+)\\.(?:jpe?g|png|webp)`, "gi")) ?? []).map((u) =>
          u.split("/").pop(),
        ),
      ).size
    : 0;
  const living = table.get("living area");

  return {
    description,
    rooms: num("rooms"),
    bedrooms: num("bedrooms") ?? bedroomsFromText(description),
    bathrooms: num("bathrooms"),
    surfaceM2: surfaceFromText(living) ?? surfaceFromText(table.get("plot area") ?? table.get("lot size")) ?? surfaceFromText(description),
    photoCount: photos || null,
    locationRaw: [quartier, area3].filter((v, i, a) => v && a.indexOf(v) === i).join(", ") || null,
    sellerPhone: normalizePhone(rep?.[1].match(/href="tel:([^"]+)"/)?.[1]),
    sellerName: repName,
  };
}

/** "Selling price" row / residenceSale template → SALE; rent rows → RENT. For a future ingest hook. */
export function habitaDetailTransaction(html: string): Transaction {
  if (/<th>\s*(Selling price|Debt-free price)\s*<\/th>/i.test(html) || /Sale\.html\.twig/.test(html)) return "SALE";
  if (/<th>\s*(Rent|Monthly rent)[^<]*<\/th>/i.test(html) || /Rent\.html\.twig/.test(html)) return "RENT";
  return "UNKNOWN";
}

export const habita: Connector = {
  slug: "habita-sn",
  pageUrl: (page) => {
    const type = HABITA_TYPES[Math.min(Math.max(page, 1), HABITA_TYPES.length) - 1];
    // page > number of types → a URL that returns no results, which ends the ingest loop.
    const p = page > HABITA_TYPES.length ? 99 : 1;
    return `${BASE}/propertysearch/results/en/${p}/${PER_PAGE}/full?type=${type}&countries=${COUNTRY_SN}&sort=newest`;
  },
  parseIndex: parseHabitaIndex,
  parseDetail: parseHabitaDetail,
  // One "page" per property type: an empty type must not stop the others. Crawl with --pages=6.
  continueOnEmpty: true,
};
