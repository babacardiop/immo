import type { PaperType, PropertyType } from "@prisma/client";
import type { CatalogueFilters } from "@/lib/listings/public-query";

const PROPERTY_TYPES = new Set([
  "LAND",
  "HOUSE",
  "APARTMENT",
  "OFFICE",
]);

const PAPER_TYPES = new Set([
  "TF",
  "BAIL_EMPHYTEOTIQUE",
  "BAIL_ORDINAIRE",
  "DELIBERATION",
  "OTHER",
]);

export function parseCatalogueSearchParams(
  params: Record<string, string | string[] | undefined>,
): CatalogueFilters {
  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const propertyType = get("propertyType");
  const paperType = get("paperType");
  const priceMin = get("priceMin");
  const priceMax = get("priceMax");
  const cursor = get("cursor");

  return {
    city: get("city") || undefined,
    quartier: get("quartier") || undefined,
    propertyType: PROPERTY_TYPES.has(propertyType ?? "")
      ? (propertyType as PropertyType)
      : undefined,
    paperType: PAPER_TYPES.has(paperType ?? "")
      ? (paperType as PaperType)
      : undefined,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax ? Number(priceMax) : undefined,
    cursor: cursor || undefined,
  };
}
