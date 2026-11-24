import type { Transaction } from "@prisma/client";

/** Normalised ad extracted from a source page. No seller phone / email, ever. */
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
  postedAt: Date | null;
};

export type Connector = {
  /** Source.slug in the lab DB. */
  slug: string;
  /** Index pages to crawl, in order. */
  pageUrl(page: number): string;
  /** Pure parser: HTML of one index page → ads on it. */
  parseIndex(html: string, now?: Date): ParsedListing[];
};
