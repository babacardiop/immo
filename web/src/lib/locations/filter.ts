import type { CityEntry, QuartierEntry } from "@/lib/locations/types";
import { formatLocationHierarchy } from "@/lib/locations/format";

export const AUTOCOMPLETE_MIN_CHARS = 2;
export const AUTOCOMPLETE_RESULT_LIMIT = 25;

export function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function rankMatch(haystack: string, needle: string): number {
  const h = fold(haystack);
  if (h.startsWith(needle)) return 0;
  if (h.includes(` ${needle}`) || h.includes(`-${needle}`)) return 1;
  if (h.includes(needle)) return 2;
  return 99;
}

/** Autocomplete cities — empty query → no suggestions. */
export function filterCityEntries(
  cities: CityEntry[],
  query: string,
  limit = AUTOCOMPLETE_RESULT_LIMIT,
  minChars = AUTOCOMPLETE_MIN_CHARS,
): CityEntry[] {
  const q = fold(query);
  if (q.length < minChars) return [];

  return cities
    .map((c) => ({
      c,
      rank: Math.min(rankMatch(c.name, q), rankMatch(c.region, q)),
    }))
    .filter((x) => x.rank < 99)
    .sort(
      (a, b) =>
        a.rank - b.rank ||
        a.c.name.localeCompare(b.c.name, "fr", { sensitivity: "base" }),
    )
    .slice(0, limit)
    .map((x) => x.c);
}

/** @deprecated use filterCityEntries */
export function filterCityNames(
  cities: string[] | CityEntry[],
  query: string,
  limit = AUTOCOMPLETE_RESULT_LIMIT,
  minChars = AUTOCOMPLETE_MIN_CHARS,
): string[] {
  const entries: CityEntry[] = cities.map((c) =>
    typeof c === "string" ? { name: c, region: "" } : c,
  );
  return filterCityEntries(entries, query, limit, minChars).map((c) => c.name);
}

/** Autocomplete quartiers — scoped by city when set. */
export function filterQuartierEntries(
  pool: QuartierEntry[],
  query: string,
  city?: string | null,
  limit = AUTOCOMPLETE_RESULT_LIMIT,
  minChars = AUTOCOMPLETE_MIN_CHARS,
): QuartierEntry[] {
  let scoped = pool;
  const cityKey = city?.trim() ? fold(city) : "";
  if (cityKey) {
    scoped = pool.filter((e) => fold(e.city) === cityKey);
  }

  const q = fold(query);
  if (q.length < minChars) return [];

  const scored = scoped
    .map((entry) => {
      const label = formatLocationHierarchy(entry);
      let rank = Math.min(
        rankMatch(entry.name, q),
        rankMatch(entry.city, q),
        rankMatch(entry.region, q),
        rankMatch(label, q),
      );
      for (const a of entry.aliases ?? []) {
        rank = Math.min(rank, rankMatch(a, q));
      }
      return { entry, rank };
    })
    .filter((x) => x.rank < 99)
    .sort(
      (a, b) =>
        a.rank - b.rank ||
        a.entry.name.localeCompare(b.entry.name, "fr", {
          sensitivity: "base",
        }),
    );

  const seen = new Set<string>();
  const unique: QuartierEntry[] = [];
  for (const { entry } of scored) {
    const key = `${fold(entry.name)}|${fold(entry.city)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(entry);
    if (unique.length >= limit) break;
  }
  return unique;
}
