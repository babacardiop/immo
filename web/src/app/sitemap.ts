import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/seo/site";
import {
  listingSitemapEntries,
  staticSitemapPaths,
} from "@/lib/seo/sitemap-entries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticSitemapPaths().map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const published = await prisma.listing.findMany({
    where: { status: "PUBLISHED", slug: { not: null } },
    select: {
      slug: true,
      status: true,
      transaction: true,
      updatedAt: true,
      publishedAt: true,
    },
    orderBy: { publishedAt: "desc" },
    take: 5000,
  });

  const listingEntries = listingSitemapEntries(published).map((e) => ({
    url: e.url,
    lastModified: e.lastModified,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...listingEntries];
}
