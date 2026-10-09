/** Affichage standard : « Almadies · Dakar ». */
export function formatQuartierWithCity(
  quartier?: string | null,
  city?: string | null,
): string {
  const q = quartier?.trim() ?? "";
  const c = city?.trim() ?? "";
  if (q && c) return `${q} · ${c}`;
  return q || c;
}
