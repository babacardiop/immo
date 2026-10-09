"use client";

import { useEffect, useState } from "react";
import type { QuartierEntry } from "@/lib/locations/senegal";
import {
  SENEGAL_CITIES,
  SENEGAL_QUARTIERS,
} from "@/lib/locations/senegal";

export function useLocations() {
  const [cities, setCities] = useState<string[]>(SENEGAL_CITIES);
  const [quartiers, setQuartiers] =
    useState<QuartierEntry[]>(SENEGAL_QUARTIERS);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/locations")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { cities?: string[]; quartiers?: QuartierEntry[] } | null) => {
        if (cancelled || !data) return;
        if (data.cities?.length) setCities(data.cities);
        if (data.quartiers?.length) setQuartiers(data.quartiers);
      })
      .catch(() => {
        /* keep static fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { cities, quartiers };
}
