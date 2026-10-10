import { prisma } from "@/lib/prisma";
import {
  type CatalogueChannel,
  type CatalogueFilters,
  buildPublicWhere,
} from "@/lib/listings/public-query";
import { SENEGAL_CITIES } from "@/lib/locations/senegal";
import { SENEGAL_REGIONS } from "@/lib/locations/regions";

export type GeoCount = { key: string; count: number };

/**
 * Soft counts of published listings per région (via city→region thesaurus).
 * Avoids N+1: one groupBy city, then roll up in memory.
 */
export async function countPublishedByRegion(
  channel: CatalogueChannel,
  filters: CatalogueFilters = {},
): Promise<GeoCount[]> {
  const { region: _r, city: _c, quartier: _q, view: _v, cursor: _cu, ...rest } =
    filters;
  const where = buildPublicWhere(channel, rest);

  const rows = await prisma.listing.groupBy({
    by: ["city"],
    where,
    _count: { _all: true },
  });

  const cityToRegion = new Map(
    SENEGAL_CITIES.map((c) => [c.name.toLowerCase(), c.region]),
  );

  const totals = new Map<string, number>();
  for (const region of SENEGAL_REGIONS) totals.set(region, 0);

  for (const row of rows) {
    if (!row.city) continue;
    const region = cityToRegion.get(row.city.toLowerCase());
    if (!region) continue;
    totals.set(region, (totals.get(region) ?? 0) + row._count._all);
  }

  return SENEGAL_REGIONS.map((key) => ({
    key,
    count: totals.get(key) ?? 0,
  })).filter((r) => r.count > 0);
}

export async function countPublishedByCity(
  channel: CatalogueChannel,
  filters: CatalogueFilters = {},
): Promise<GeoCount[]> {
  const { city: _c, quartier: _q, view: _v, cursor: _cu, ...rest } = filters;
  const where = buildPublicWhere(channel, rest);

  const rows = await prisma.listing.groupBy({
    by: ["city"],
    where,
    _count: { _all: true },
  });

  return rows
    .filter((r): r is typeof r & { city: string } => !!r.city)
    .map((r) => ({ key: r.city, count: r._count._all }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key, "fr"));
}
