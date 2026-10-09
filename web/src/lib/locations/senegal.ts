/**
 * Seed / fallback référentiel — hiérarchie région → ville → quartier.
 * Runtime source of truth = tables Prisma City / Quartier.
 */

import {
  filterCityEntries,
  filterQuartierEntries,
} from "@/lib/locations/filter";
import { SENEGAL_QUARTIERS_SEED } from "@/lib/locations/senegal-quartiers-seed";
import { guessRegionForCity } from "@/lib/locations/regions";
import type { CityEntry, QuartierEntry } from "@/lib/locations/types";

export type { CityEntry, QuartierEntry };

const CITY_NAMES = [
  "Dakar",
  "Pikine",
  "Guédiawaye",
  "Rufisque",
  "Keur Massar",
  "Thiès",
  "Mbour",
  "Saly",
  "Tivaouane",
  "Khombole",
  "Pout",
  "Joal-Fadiouth",
  "Ngaparou",
  "Somone",
  "Popenguine",
  "Nguékhokh",
  "Diamniadio",
  "Saint-Louis",
  "Kaolack",
  "Ziguinchor",
  "Tambacounda",
  "Louga",
  "Diourbel",
  "Fatick",
  "Kolda",
  "Matam",
  "Kaffrine",
  "Kédougou",
  "Sédhiou",
  "Touba",
  "Mbacké",
  "Bargny",
  "Bambilor",
  "Sébikotane",
  "Richard-Toll",
  "Dagana",
  "Podor",
  "Linguère",
  "Kébémer",
  "Nioro du Rip",
  "Guinguinéo",
  "Foundiougne",
  "Gossas",
  "Bambey",
  "Vélingara",
  "Bignona",
  "Oussouye",
  "Goudomp",
  "Bounkiling",
  "Bakel",
  "Goudiry",
  "Koungheul",
  "Koumpentoum",
  "Birkelane",
  "Malem Hoddar",
  "Kanel",
  "Ranérou",
  "Salémata",
  "Saraya",
  "Médina Yoro Foulah",
].sort((a, b) => a.localeCompare(b, "fr"));

export const SENEGAL_CITIES: CityEntry[] = CITY_NAMES.map((name) => ({
  name,
  region: guessRegionForCity(name) ?? "Dakar",
}));

/** Flat name list for legacy callers. */
export const SENEGAL_CITY_NAMES: string[] = SENEGAL_CITIES.map((c) => c.name);

export const SENEGAL_QUARTIERS: QuartierEntry[] = SENEGAL_QUARTIERS_SEED.map(
  (q) => ({
    ...q,
    region: guessRegionForCity(q.city) ?? "Dakar",
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
