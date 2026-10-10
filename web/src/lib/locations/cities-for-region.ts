import { SENEGAL_CITIES } from "@/lib/locations/senegal";
import {
  SENEGAL_REGIONS,
  type SenegalRegion,
} from "@/lib/locations/regions";

export function isSenegalRegion(value: string | undefined | null): value is SenegalRegion {
  return (
    typeof value === "string" &&
    (SENEGAL_REGIONS as readonly string[]).includes(value)
  );
}

/** City names in a région (thesaurus fallback — used for sync filters). */
export function cityNamesForRegion(region: string): string[] {
  if (!isSenegalRegion(region)) return [];
  return SENEGAL_CITIES.filter((c) => c.region === region).map((c) => c.name);
}
