import type { Listing, TransactionType } from "@prisma/client";
import {
  channelForTransaction,
  publicListingPath,
} from "@/lib/listings/public-query";
import { absoluteUrl } from "@/lib/seo/site";

export type SitemapListing = Pick<
  Listing,
  "slug" | "status" | "transaction" | "updatedAt" | "publishedAt"
>;

export function staticSitemapPaths(): string[] {
  return ["/", "/acheter", "/louer", "/mentions-legales", "/cgu", "/confidentialite"];
}

export function listingSitemapEntries(listings: SitemapListing[]): {
  url: string;
  lastModified: Date;
}[] {
  return listings
    .filter((l) => l.status === "PUBLISHED" && l.slug)
    .map((l) => {
      const channel = channelForTransaction(l.transaction as TransactionType);
      return {
        url: absoluteUrl(publicListingPath(channel, l.slug!)),
        lastModified: l.updatedAt ?? l.publishedAt ?? new Date(),
      };
    });
}
