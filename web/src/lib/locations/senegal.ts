/**
 * Seed / fallback référentiel — hiérarchie région → ville → quartier.
 * Runtime source of truth = tables Prisma City / Quartier.
 * Quartiers: ANSD RGPH-5 2023 (scripts/fetch-ansd-localites.mjs).
 */

import {
  filterCityEntries,
  filterQuartierEntries,
} from "@/lib/locations/filter";
import { SENEGAL_QUARTIERS_SEED } from "@/lib/locations/senegal-quartiers-seed";
import { guessRegionForCity } from "@/lib/locations/regions";
import type { CityEntry, QuartierEntry } from "@/lib/locations/types";

export type { CityEntry, QuartierEntry };

function citiesFromSeed(): CityEntry[] {
  const map = new Map<string, string>();
  for (const q of SENEGAL_QUARTIERS_SEED) {
    const region =
      ("region" in q && typeof q.region === "string" && q.region) ||
      guessRegionForCity(q.city) ||
      "Dakar";
    if (!map.has(q.city)) map.set(q.city, region);
  }
  return [...map.entries()]
    .map(([name, region]) => ({ name, region }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export const SENEGAL_CITIES: CityEntry[] = citiesFromSeed();

/** Flat name list for legacy callers. */
export const SENEGAL_CITY_NAMES: string[] = SENEGAL_CITIES.map((c) => c.name);

export const SENEGAL_QUARTIERS: QuartierEntry[] = SENEGAL_QUARTIERS_SEED.map(
  (q) => ({
    name: q.name,
    city: q.city,
    region:
      ("region" in q && typeof q.region === "string" && q.region) ||
      guessRegionForCity(q.city) ||
      "Dakar",
    aliases: q.aliases,
  }),
);

export function filterCities(query: string, limit?: number): string[] {
  return filterCityEntries(SENEGAL_CITIES, query, limit).map((c) => c.name);
}

export function filterQuartiers(
  query: string,
  city?: string | null,
  limit?: number,
): QuartierEntry[] {
  return filterQuartierEntries(SENEGAL_QUARTIERS, query, city, limit);
}

export function quartiersForCity(city?: string | null): QuartierEntry[] {
  if (!city?.trim()) return SENEGAL_QUARTIERS;
  const key = city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return SENEGAL_QUARTIERS.filter((q) => {
    const c = q.city
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
    return c === key;
  });
}
