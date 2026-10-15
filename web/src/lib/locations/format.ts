/** Affichage hiérarchie : quartier · commune · ville · région */
export function formatLocationHierarchy(parts: {
  /** Quartier name (or `name` from QuartierEntry). */
  quartier?: string | null;
  name?: string | null;
  commune?: string | null;
  city?: string | null;
  region?: string | null;
}): string {
  const bits = [
    parts.quartier ?? parts.name,
    parts.commune,
    parts.city,
    parts.region,
  ]
    .map((p) => p?.trim() ?? "")
    .filter(Boolean);
  // Avoid "Dakar · Dakar · Dakar" noise: drop consecutive duplicates
  const deduped: string[] = [];
  for (const b of bits) {
    if (deduped[deduped.length - 1]?.toLowerCase() === b.toLowerCase()) continue;
    deduped.push(b);
  }
  return deduped.join(" · ");
}

/** @deprecated prefer formatLocationHierarchy */
export function formatQuartierWithCity(
  quartier?: string | null,
  city?: string | null,
  region?: string | null,
  commune?: string | null,
): string {
  return formatLocationHierarchy({ quartier, commune, city, region });
}

export function formatCityWithRegion(
  city?: string | null,
  region?: string | null,
): string {
  return formatLocationHierarchy({ city, region });
}
