"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  CityEntry,
  CommuneEntry,
  QuartierEntry,
} from "@/lib/locations/types";
import {
  SENEGAL_CITIES,
  SENEGAL_COMMUNES,
  SENEGAL_QUARTIERS,
} from "@/lib/locations/senegal";

export function useLocations() {
  const [cities, setCities] = useState<CityEntry[]>(SENEGAL_CITIES);
  const [communes, setCommunes] =
    useState<CommuneEntry[]>(SENEGAL_COMMUNES);
  const [quartiers, setQuartiers] =
    useState<QuartierEntry[]>(SENEGAL_QUARTIERS);
  const [version, setVersion] = useState(0);

  const refresh = useCallback(() => {
    setVersion((v) => v + 1);
  }, []);

  const addLocal = useCallback((entry: QuartierEntry) => {
    setCities((prev) => {
      if (prev.some((c) => c.name.toLowerCase() === entry.city.toLowerCase())) {
        return prev.map((c) =>
          c.name.toLowerCase() === entry.city.toLowerCase()
            ? { ...c, region: entry.region || c.region }
            : c,
        );
      }
      return [...prev, { name: entry.city, region: entry.region }].sort((a, b) =>
        a.name.localeCompare(b.name, "fr"),
      );
    });
    setCommunes((prev) => {
      const exists = prev.some(
        (c) =>
          c.name.toLowerCase() === entry.commune.toLowerCase() &&
          c.city.toLowerCase() === entry.city.toLowerCase(),
      );
      if (exists) return prev;
      return [
        ...prev,
        { name: entry.commune, city: entry.city, region: entry.region },
      ].sort(
        (a, b) =>
          a.city.localeCompare(b.city, "fr") ||
          a.name.localeCompare(b.name, "fr"),
      );
    });
    setQuartiers((prev) => {
      const exists = prev.some(
        (q) =>
          q.name.toLowerCase() === entry.name.toLowerCase() &&
          q.commune.toLowerCase() === entry.commune.toLowerCase() &&
          q.city.toLowerCase() === entry.city.toLowerCase(),
      );
      return exists ? prev : [entry, ...prev];
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/locations?v=${version}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: LocationsSnapshotLike | null) => {
        if (cancelled || !data) return;
        if (data.cities?.length) {
          setCities(
            data.cities.map((c) =>
              typeof c === "string"
                ? { name: c, region: "Dakar" }
                : c,
            ),
          );
        }
        if (data.communes?.length) setCommunes(data.communes);
        if (data.quartiers?.length) setQuartiers(data.quartiers);
      })
      .catch(() => {
        /* keep static fallback */
      });
    return () => {
      cancelled = true;
    };
  }, [version]);

  return { cities, communes, quartiers, refresh, addLocal };
}

type LocationsSnapshotLike = {
  cities?: Array<string | CityEntry>;
  communes?: CommuneEntry[];
  quartiers?: QuartierEntry[];
};
