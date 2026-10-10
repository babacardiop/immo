import type { Prisma, TransactionType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  type CatalogueChannel,
  type CatalogueFilters,
  buildPublicWhere,
} from "@/lib/listings/public-query";

export type MapPin = {
  id: string;
  slug: string;
  title: string;
  priceFcfa: number | null;
  lat: number;
  lng: number;
  transaction: TransactionType;
};

export function mapPinsWhere(
  channel: CatalogueChannel,
  filters: CatalogueFilters = {},
): Prisma.ListingWhereInput {
  const base = buildPublicWhere(channel, filters);
  return {
    ...base,
    status: "PUBLISHED",
    slug: { not: null },
    geoLat: { not: null },
    geoLng: { not: null },
  };
}

export async function listMapPins(
  channel: CatalogueChannel,
  filters: CatalogueFilters = {},
): Promise<MapPin[]> {
  const rows = await prisma.listing.findMany({
    where: mapPinsWhere(channel, filters),
    select: {
      id: true,
      slug: true,
      title: true,
      priceFcfa: true,
      geoLat: true,
      geoLng: true,
      transaction: true,
    },
    take: 200,
    orderBy: { publishedAt: "desc" },
  });

  return rows
    .filter(
      (r): r is typeof r & { slug: string; geoLat: number; geoLng: number } =>
        !!r.slug && r.geoLat != null && r.geoLng != null,
    )
    .map((r) => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      priceFcfa: r.priceFcfa,
      lat: r.geoLat,
      lng: r.geoLng,
      transaction: r.transaction,
    }));
}
