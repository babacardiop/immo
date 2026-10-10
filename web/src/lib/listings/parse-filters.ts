import type { PaperType, PropertyType, TransactionType } from "@prisma/client";
import type {
  CatalogueFilters,
  CatalogueView,
} from "@/lib/listings/public-query";
import { isSenegalRegion } from "@/lib/locations/cities-for-region";

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

const RENT_FILTER_TYPES = new Set(["RENT", "SHORT_TERM_RENT"]);

export function parseCatalogueView(
  value: string | undefined,
): CatalogueView {
  return value === "map" ? "map" : "list";
}

export function parseCatalogueSearchParams(
  params: Record<string, string | string[] | undefined>,
): CatalogueFilters {
  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const propertyType = get("propertyType");
  const paperType = get("paperType");
  const transaction = get("transaction");
  const priceMin = get("priceMin");
  const priceMax = get("priceMax");
  const cursor = get("cursor");
  const regionRaw = get("region")?.trim();
  const view = parseCatalogueView(get("view"));

  return {
    region: isSenegalRegion(regionRaw) ? regionRaw : undefined,
    city: get("city") || undefined,
    quartier: get("quartier") || undefined,
    propertyType: PROPERTY_TYPES.has(propertyType ?? "")
      ? (propertyType as PropertyType)
      : undefined,
    paperType: PAPER_TYPES.has(paperType ?? "")
      ? (paperType as PaperType)
      : undefined,
    transaction: RENT_FILTER_TYPES.has(transaction ?? "")
      ? (transaction as TransactionType)
      : undefined,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax ? Number(priceMax) : undefined,
    cursor: cursor || undefined,
    view,
  };
}

/** Serialize filters to query string (omit defaults). */
export function catalogueFiltersToSearchParams(
  filters: CatalogueFilters,
  extra?: Record<string, string | undefined>,
): URLSearchParams {
  const qs = new URLSearchParams();
  if (filters.view && filters.view !== "list") qs.set("view", filters.view);
  if (filters.region) qs.set("region", filters.region);
  if (filters.city) qs.set("city", filters.city);
  if (filters.quartier) qs.set("quartier", filters.quartier);
  if (filters.propertyType) qs.set("propertyType", filters.propertyType);
  if (filters.paperType) qs.set("paperType", filters.paperType);
  if (filters.transaction) qs.set("transaction", filters.transaction);
  if (filters.priceMin != null) qs.set("priceMin", String(filters.priceMin));
  if (filters.priceMax != null) qs.set("priceMax", String(filters.priceMax));
  if (filters.cursor) qs.set("cursor", filters.cursor);
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      if (v) qs.set(k, v);
    }
  }
  return qs;
}
