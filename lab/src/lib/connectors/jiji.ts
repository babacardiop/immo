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

/**
 * Jiji Sénégal connector (jiji.sn) — Property category only.
 * ⚠ Jiji's rules (rules.html) forbid harvesting users' contact details without
 * consent. Crawled by product-owner override 24/11/2026 (internal research,
 * never republished). Phones are NOT collected anyway: they sit behind a
 * "Montrer contact" JS call, which we never trigger.
 * robots.txt (User-agent: *) only blocks /test, /admin, /crm, /auth/facebook.
 *
 * Index: /real-estate?page=N — 20 server-rendered cards per page. The ad URL
 * path carries the category: /{location}/{category}/{slug}-{id}.html.
 * Card: price "CFA 1,000,000" + period ("per month", "per Sqm"…), title,
 * region "Région de Dakar, Almadies", chips ("150 sqm", "6 chambres").
 * Ad page: key/value attributes (Superficie, Chambres, Salles de bain, Type de
 * bien, Ameublement…), description, photo counter "1/11", seller name,
 * relative age "il y a 10 heures".
 */

const BASE = "https://jiji.sn";

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const strip = (s: string | null | undefined) =>
  s ? decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim() || null : null;
const toNum = (s: string | null | undefined) => {
  if (!s) return null;
  const n = Number(s.replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
};

/** Property categories under /real-estate. Anything else is skipped. */
const CATEGORIES: Record<string, { transaction: Transaction; type: string | null }> = {
  "houses-apartments-for-rent": { transaction: "RENT", type: null },
  "houses-apartments-for-sale": { transaction: "SALE", type: null },
  "land-and-plots-for-sale": { transaction: "SALE", type: "terrain" },
  "land-and-plots-for-rent": { transaction: "RENT", type: "terrain" },
  "commercial-property-for-rent": { transaction: "RENT", type: "commercial" },
  "commercial-property-for-sale": { transaction: "SALE", type: "commercial" },
  "temporary-and-vacation-rentals": { transaction: "RENT", type: "appartement-meuble" },
  "new-builds": { transaction: "SALE", type: null },
  "event-centres-venues-and-workstations": { transaction: "RENT", type: "commercial" },
};

/** "4chbre Villa dans …", "Appartement meublé …", "Studio …" → vocabulary. */
export function jijiType(text: string | null, furnished = false): string | null {
  if (!text) return null;
  const t = fold(text);
  let type: string | null = null;
  if (/\bvilla\b/.test(t)) type = "villa";
  else if (/\b(appartement|studio|duplex|penthouse|f[1-9])\b/.test(t)) type = "appartement";
  else if (/\b(maison|maison de ville)\b/.test(t)) type = "maison";
  else if (/\bchambre\b/.test(t) && !/\d\s*chambres?\b/.test(t)) type = "chambre";
  else if (/\b(terrain|parcelle)\b/.test(t)) type = "terrain";
  else if (/\bimmeuble\b/.test(t)) type = "immeuble";
  else if (/\b(bureau|plateau)\b/.test(t)) type = "bureau";
  else if (/\b(magasin|boutique|local|entrepot|commerce)\b/.test(t)) type = "commercial";
  if (furnished && (type === "appartement" || type === null)) return "appartement-meuble";
  return type;
}

/** "Région de Dakar, Almadies" → { locationRaw: "Almadies, Dakar", city: "Dakar" }. */
export function jijiLocation(raw: string | null): { locationRaw: string | null; city: string | null } {
  if (!raw) return { locationRaw: null, city: null };
  const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
  const region = parts[0]?.replace(/^R[ée]gion de\s+/i, "") || null;
  const area = parts[1] ?? null;
  return { locationRaw: [area, region].filter(Boolean).join(", ") || null, city: region };
}

/**
 * Price + period → XOF. "per month/day/night" kept as-is (period stays in priceRaw).
 * "per Sqm": sellers often type the TOTAL there; ≥ 1 000 000 is read as total,
 * below that it's multiplied by the surface when known.
 */
export function jijiPrice(value: number | null, period: string | null, surface: number | null): bigint | null {
  if (!value || value < 1000) return null;
  const p = fold(period ?? "");
  if (/sqm|m2|m²/.test(p)) {
    if (value >= 1_000_000) return BigInt(value);
    return surface ? BigInt(Math.round(value * surface)) : null;
  }
  if (/year|an\b/.test(p)) return BigInt(Math.round(value / 12));
  return BigInt(value);
}

/** "il y a 10 heures" / "il y a 3 jours" / "il y a 2 semaines" → Date. */
export function jijiAge(raw: string | null | undefined, now = new Date()): Date | null {
  const m = raw ? fold(raw).match(/il y a\s+(\d+|un|une)\s+(minute|heure|jour|semaine|mois|an)/) : null;
  if (!m) return null;
  const n = /^\d+$/.test(m[1]) ? Number(m[1]) : 1;
  const mins = { minute: 1, heure: 60, jour: 1440, semaine: 10080, mois: 43200, an: 525600 }[m[2] as "minute"];
  return new Date(now.getTime() - n * mins * 60_000);
}

export function parseJijiIndex(html: string, _now = new Date()): ParsedListing[] {
  const out = new Map<string, ParsedListing>();
  const re = /<a href="(\/([a-z0-9-]+)\/([a-z0-9-]+)\/[^"?]*-([A-Za-z0-9]{12,32})\.html)[^"]*" class="b-list-advert-base[\s\S]*?(?=<a href="\/[a-z0-9-]+\/[a-z0-9-]+\/[^"?]*-[A-Za-z0-9]{12,32}\.html[^"]*" class="b-list-advert-base|$)/g;
  for (const m of html.matchAll(re)) {
    const [block, path, , category, externalId] = m;
    const cat = CATEGORIES[category];
    if (!cat || out.has(externalId)) continue;

    const title = strip(block.match(/qa-advert-title[^"]*">([\s\S]*?)<\/div>/)?.[1]);
    const chips = [...block.matchAll(/b-list-advert-base__item-attr">([\s\S]*?)<\/div>/g)].map((c) => strip(c[1]) ?? "");
    const snippet = strip(block.match(/b-list-advert-base__description-text">([\s\S]*?)<\/div>/)?.[1]);
    const surface =
      toNum(chips.find((c) => /(sqm|m²|m2)\s*$/i.test(c))) ?? surfaceFromText(title) ?? surfaceFromText(snippet);
    const beds =
      toNum(chips.find((c) => /chambres?/i.test(c))) ??
      (title?.match(/(\d{1,2})\s*chbres?/i) ? Number(title.match(/(\d{1,2})\s*chbres?/i)![1]) : null) ??
      bedroomsFromText(title);

    const priceText = strip(block.match(/qa-advert-price">([\s\S]*?)<\/div>/)?.[1]);
    const period = strip(block.match(/b-list-advert__price__period">([\s\S]*?)<\/div>/)?.[1]);
    const furnished = cat.type === "appartement-meuble" || /meubl/.test(fold(title ?? "")) || /day|night|jour|nuit/.test(fold(period ?? ""));
    const { locationRaw, city } = jijiLocation(strip(block.match(/b-list-advert__region__text">([\s\S]*?)<\/span>/)?.[1]));

    out.set(externalId, {
      externalId,
      url: `${BASE}${path}`,
      title,
      transaction: cat.transaction,
      propertyType: cat.type && cat.type !== "appartement-meuble" ? cat.type : jijiType(title, furnished) ?? (furnished ? "appartement-meuble" : cat.type),
      priceXof: jijiPrice(toNum(priceText), period, surface),
      priceRaw: [priceText, period].filter(Boolean).join(" ") || null,
      surfaceM2: surface,
      bedrooms: beds,
      city,
      locationRaw,
      sellerName: null,
      sellerPhone: null, // behind "Montrer contact" — never fetched
      postedAt: null, // only on the ad page
    });
  }
  return [...out.values()];
}

export type JijiDetail = ParsedDetail & { propertyType?: string | null };

export function parseJijiDetail(html: string, now = new Date()): JijiDetail {
  const attrs = new Map<string, string>();
  for (const m of html.matchAll(/b-advert-attribute__value">([\s\S]*?)<\/div>\s*<div class="b-advert-attribute__key">([\s\S]*?)<\/div>/g)) {
    attrs.set(fold(strip(m[2]) ?? ""), strip(m[1]) ?? "");
  }
  const get = (...keys: string[]) => {
    for (const k of keys) {
      const v = [...attrs.entries()].find(([key]) => key.startsWith(k))?.[1];
      if (v) return v;
    }
    return null;
  };
  const description = htmlToText(html.match(/qa-description-text">([\s\S]*?)<\/span>/)?.[1]);
  const stats = strip(html.match(/b-advert-info-statistics--region">([\s\S]*?)<\/div>/)?.[1]);
  const statsLoc = stats?.replace(/,\s*il y a[\s\S]*$/i, "") ?? null;
  const counter = html.match(/qa-carousel-counter">\s*\d+\s*\/\s*(\d+)/)?.[1];
  const furnished = /^meubl/.test(fold(get("ameublement") ?? ""));

  return {
    description,
    rooms: toNum(get("pieces", "nombre de pieces")),
    bedrooms: toNum(get("chambres")) ?? bedroomsFromText(description),
    bathrooms: toNum(get("salles de bain", "salle de bain")),
    surfaceM2: toNum(get("superficie", "surface")) ?? surfaceFromText(description),
    photoCount: counter ? Number(counter) : html.includes("b-advert-carousel") ? 1 : null,
    locationRaw: jijiLocation(statsLoc).locationRaw,
    sellerPhone: null, // behind "Montrer contact" — never fetched
    postedAt: jijiAge(stats, now),
    sellerName: strip(html.match(/b-seller-block__name">([\s\S]*?)<\/div>/)?.[1]),
    propertyType: jijiType(get("type de bien"), furnished),
  };
}

export const jiji: Connector = {
  slug: "jiji-sn",
  pageUrl: (page) => (page <= 1 ? `${BASE}/real-estate` : `${BASE}/real-estate?page=${page}`),
  parseIndex: parseJijiIndex,
  parseDetail: (html) => parseJijiDetail(html),
};
