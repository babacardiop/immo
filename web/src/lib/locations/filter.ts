import type { QuartierEntry } from "@/lib/locations/senegal";
import { formatQuartierWithCity } from "@/lib/locations/format";

export function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function filterCityNames(
  cities: string[],
  query: string,
  limit = 12,
): string[] {
  const q = fold(query);
  if (!q) return cities.slice(0, limit);
  return cities.filter((c) => fold(c).includes(q)).slice(0, limit);
}

export function filterQuartierEntries(
  pool: QuartierEntry[],
  query: string,
  city?: string | null,
  limit = 12,
): QuartierEntry[] {
  let scoped = pool;
  const cityKey = city?.trim() ? fold(city) : "";
  if (cityKey) {
    scoped = pool.filter((e) => fold(e.city) === cityKey);
  }

  const q = fold(query);
  const matched = !q
    ? scoped
    : scoped.filter((entry) => {
        if (fold(entry.name).includes(q)) return true;
        if (fold(entry.city).includes(q)) return true;
        if (fold(formatQuartierWithCity(entry.name, entry.city)).includes(q)) {
          return true;
        }
        return entry.aliases?.some((a) => fold(a).includes(q)) ?? false;
      });

  // Unique by name+city (same quartier name can exist in two cities).
  const seen = new Set<string>();
  const unique: QuartierEntry[] = [];
  for (const entry of matched) {
    const key = `${fold(entry.name)}|${fold(entry.city)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(entry);
    if (unique.length >= limit) break;
  }
  return unique;
}
