"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SENEGAL_REGIONS } from "@/lib/locations/regions";
import { useLocations } from "@/hooks/use-locations";
import type { GeoCount } from "@/lib/listings/geo-aggregates";

export function CatalogueGeoNav({
  regionCounts = [],
}: {
  regionCounts?: GeoCount[];
}) {
  const pathname = usePathname() ?? "/acheter";
  const searchParams = useSearchParams();
  const { cities } = useLocations();

  const region = searchParams.get("region") ?? "";
  const city = searchParams.get("city") ?? "";
  const quartier = searchParams.get("quartier") ?? "";

  const countByRegion = useMemo(() => {
    const m = new Map(regionCounts.map((r) => [r.key, r.count]));
    return m;
  }, [regionCounts]);

  const citiesInRegion = useMemo(() => {
    if (!region) return [];
    return cities
      .filter((c) => c.region === region)
      .map((c) => c.name)
      .sort((a, b) => a.localeCompare(b, "fr"));
  }, [cities, region]);

  const hrefWith = (patch: {
    region?: string | null;
    city?: string | null;
    quartier?: string | null;
  }) => {
    const qs = new URLSearchParams(searchParams.toString());
    qs.delete("cursor");
    const setOrDel = (key: string, value: string | null | undefined) => {
      if (value == null || value === "") qs.delete(key);
      else qs.set(key, value);
    };
    if ("region" in patch) setOrDel("region", patch.region);
    if ("city" in patch) setOrDel("city", patch.city);
    if ("quartier" in patch) setOrDel("quartier", patch.quartier);
    const s = qs.toString();
    return s ? `${pathname}?${s}` : pathname;
  };

  return (
    <div className="mb-4 space-y-3">
      <nav
        aria-label="Fil géo"
        className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-muted)]"
      >
        <Link
          href={hrefWith({ region: null, city: null, quartier: null })}
          className={!region && !city ? "font-medium text-[var(--color-ink)]" : "hover:text-[var(--color-ink)]"}
        >
          Sénégal
        </Link>
        {region ? (
          <>
            <span aria-hidden>›</span>
            <Link
              href={hrefWith({ region, city: null, quartier: null })}
              className={!city ? "font-medium text-[var(--color-ink)]" : "hover:text-[var(--color-ink)]"}
            >
              {region}
            </Link>
          </>
        ) : null}
        {city ? (
          <>
            <span aria-hidden>›</span>
            <Link
              href={hrefWith({ region: region || null, city, quartier: null })}
              className={!quartier ? "font-medium text-[var(--color-ink)]" : "hover:text-[var(--color-ink)]"}
            >
              {city}
            </Link>
          </>
        ) : null}
        {quartier ? (
          <>
            <span aria-hidden>›</span>
            <span className="font-medium text-[var(--color-ink)]">{quartier}</span>
          </>
        ) : null}
      </nav>

      {!region ? (
        <div className="flex flex-wrap gap-2">
          {SENEGAL_REGIONS.map((r) => {
            const n = countByRegion.get(r);
            return (
              <Link
                key={r}
                href={hrefWith({ region: r, city: null, quartier: null })}
                className="rounded-[var(--radius-pill)] border border-[var(--color-steel)]/40 bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] hover:border-[var(--color-leaf)]"
              >
                {r}
                {n != null && n > 0 ? (
                  <span className="ml-1 text-[var(--color-muted)]">({n})</span>
                ) : null}
              </Link>
            );
          })}
        </div>
      ) : !city ? (
        <div className="flex flex-wrap gap-2">
          {citiesInRegion.slice(0, 40).map((name) => (
            <Link
              key={name}
              href={hrefWith({ region, city: name, quartier: null })}
              className="rounded-[var(--radius-pill)] border border-[var(--color-steel)]/40 bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium hover:border-[var(--color-leaf)]"
            >
              {name}
            </Link>
          ))}
          {citiesInRegion.length > 40 ? (
            <span className="text-xs text-[var(--color-muted)]">
              +{citiesInRegion.length - 40} — affinez via le filtre Ville
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
