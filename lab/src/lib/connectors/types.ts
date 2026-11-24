import type { Transaction } from "@prisma/client";

/** Normalised ad extracted from a source index page. */
export type ParsedListing = {
  externalId: string;
  url: string;
  title: string | null;
  transaction: Transaction;
  propertyType: string | null;
  priceXof: bigint | null;
  priceRaw: string | null;
  surfaceM2: number | null;
  bedrooms: number | null;
  city: string | null;
  locationRaw: string | null;
  sellerName: string | null;
  /** Normalised E.164 digits when the index page exposes it. */
  sellerPhone?: string | null;
  postedAt: Date | null;
};

/** Extra fields only available on an ad's own page. Null = not found. */
export type ParsedDetail = {
  description: string | null;
  rooms: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  surfaceM2: number | null;
  photoCount: number | null;
  locationRaw: string | null;
  sellerPhone: string | null;
};

export type Connector = {
  /** Source.slug in the lab DB. */
  slug: string;
  /** Index pages to crawl, in order. */
  pageUrl(page: number): string;
  /** Pure parser: HTML of one index page → ads on it. */
  parseIndex(html: string, now?: Date): ParsedListing[];
  /** Optional pure parser for an ad page (fetched only for new / changed ads). */
  parseDetail?(html: string): ParsedDetail;
};

/** Shared helpers for connectors. */
export function htmlToText(html: string | null | undefined): string | null {
  if (!html) return null;
  const t = html
    .replace(/\r/g, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
  return t || null;
}

/** "3 chambres", "F4 ... 2 chambres" → 3 / 2 (first match, 1–20). */
export function bedroomsFromText(text: string | null | undefined): number | null {
  const m = text?.match(/\b(\d{1,2})\s*chambres?\b/i);
  const n = m ? Number(m[1]) : NaN;
  return n >= 1 && n <= 20 ? n : null;
}

/** "140 m²", "150M2", "1 200 m2" → 140 / 150 / 1200 (first match). */
export function surfaceFromText(text: string | null | undefined): number | null {
  if (!text) return null;
  const m = text.match(/(\d{1,3}(?:[ . ]\d{3})*|\d+)(?:[.,]\d+)?\s*(?:m²|m2|mètres? carrés?)/i);
  if (!m) return null;
  const n = Number(m[1].replace(/[ . ]/g, ""));
  return n > 5 && n < 1_000_000 ? n : null;
}
