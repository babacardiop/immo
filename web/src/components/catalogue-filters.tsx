"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Autocomplete } from "@/components/ui/autocomplete";
import type { CatalogueChannel } from "@/lib/listings/public-query";
import {
  filterCityEntries,
  filterQuartierEntries,
} from "@/lib/locations/filter";
import {
  formatCityWithRegion,
  formatLocationHierarchy,
} from "@/lib/locations/format";
import { useLocations } from "@/hooks/use-locations";
import { parseRegionList } from "@/lib/listings/parse-filters";
import { SENEGAL_REGIONS } from "@/lib/locations/regions";

function FilterSection({
  title,
  summary,
  defaultOpen = true,
  children,
  gridClassName = "grid gap-3 pb-4 sm:grid-cols-2",
}: {
  title: string;
  summary?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  gridClassName?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--color-steel)]/20 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-medium text-[var(--color-ink)]"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          {title}
          {summary ? (
            <span className="ml-2 font-normal text-[var(--color-muted)]">
              · {summary}
            </span>
          ) : null}
        </span>
        <span className="text-[var(--color-muted)]" aria-hidden>
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open ? <div className={gridClassName}>{children}</div> : null}
    </div>
  );
}

/** DS-17 catalogue filters — one panel for regions + lieu + bien + budget */
export function CatalogueFilters({
  channel,
}: {
  channel: CatalogueChannel;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cities, quartiers } = useLocations();

  const initialRegions = useMemo(
    () => parseRegionList(searchParams.getAll("region")),
    [searchParams],
  );
  const [regions, setRegions] = useState<string[]>(initialRegions);
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [quartier, setQuartier] = useState(searchParams.get("quartier") ?? "");

  const hasActive =
    regions.length > 0 ||
    Boolean(searchParams.get("city")) ||
    Boolean(searchParams.get("quartier")) ||
    Boolean(searchParams.get("propertyType")) ||
    Boolean(searchParams.get("paperType")) ||
    Boolean(searchParams.get("transaction")) ||
    Boolean(searchParams.get("priceMin")) ||
    Boolean(searchParams.get("priceMax"));

  const [panelOpen, setPanelOpen] = useState(hasActive);

  const citiesScoped = useMemo(
    () =>
      regions.length > 0
        ? cities.filter((c) => regions.includes(c.region))
        : cities,
    [cities, regions],
  );

  const cityOptions = useMemo(
    () =>
      filterCityEntries(citiesScoped, city).map((c) => ({
        value: c.name,
        label: formatCityWithRegion(c.name, c.region),
      })),
    [citiesScoped, city],
  );

  const quartierOptions = useMemo(
    () =>
      filterQuartierEntries(quartiers, quartier, city).map((q) => ({
        value: q.name,
        label: formatLocationHierarchy(q),
        city: q.city,
        region: q.region,
      })),
    [quartiers, quartier, city],
  );

  const toggleRegion = (region: string) => {
    setRegions((prev) => {
      const next = prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region];
      setCity("");
      setQuartier("");
      return next;
    });
  };

  const apply = useCallback(
    (formData: FormData) => {
      const params = new URLSearchParams();
      const view = searchParams.get("view");
      if (view === "map") params.set("view", "map");

      for (const region of regions) {
        params.append("region", region);
      }

      for (const key of [
        "city",
        "quartier",
        "propertyType",
        "paperType",
        "transaction",
        "priceMin",
        "priceMax",
      ]) {
        const value = String(formData.get(key) ?? "").trim();
        if (value) params.set(key, value);
      }
      const qs = params.toString();
      router.push(qs ? `/${channel}?${qs}` : `/${channel}`);
    },
    [channel, router, searchParams, regions],
  );

  const selectClass =
    "w-full rounded-2xl border border-[var(--color-steel)]/55 bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-olive)] focus:ring-2 focus:ring-[var(--color-olive)]/25";

  const regionSummary =
    regions.length === 0
      ? undefined
      : regions.length === 1
        ? regions[0]
        : `${regions.length} régions`;
  const lieuSummary = [city, quartier].filter(Boolean).join(" · ") || undefined;
  const bienSummary =
    searchParams.get("propertyType") ||
    searchParams.get("paperType") ||
    searchParams.get("transaction") ||
    undefined;
  const budgetSummary =
    searchParams.get("priceMin") || searchParams.get("priceMax")
      ? `${searchParams.get("priceMin") ?? "…"} – ${searchParams.get("priceMax") ?? "…"}`
      : undefined;

  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-[var(--color-ink)] sm:px-5"
        aria-expanded={panelOpen}
        onClick={() => setPanelOpen((v) => !v)}
      >
        <span>
          Filtres
          {hasActive ? (
            <span className="ml-2 font-normal text-[var(--color-muted)]">
              · actifs
            </span>
          ) : null}
        </span>
        <span className="font-normal text-[var(--color-muted)]" aria-hidden>
          {panelOpen ? "▴" : "▾"}
        </span>
      </button>

      {panelOpen ? (
        <form
          className="border-t border-[var(--color-steel)]/20 px-4 sm:px-5"
          action={apply}
        >
          <FilterSection
            title="Régions"
            summary={regionSummary}
            defaultOpen={false}
            gridClassName="grid gap-2 pb-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SENEGAL_REGIONS.map((r) => {
              const checked = regions.includes(r);
              return (
                <label
                  key={r}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                    checked
                      ? "border-[var(--color-leaf)] bg-[var(--color-sage)]/25"
                      : "border-[var(--color-steel)]/35 hover:border-[var(--color-leaf)]/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={checked}
                    onChange={() => toggleRegion(r)}
                  />
                  <span>{r}</span>
                </label>
              );
            })}
          </FilterSection>

          <FilterSection title="Lieu" summary={lieuSummary} defaultOpen>
            <div>
              <Label htmlFor="city">Ville</Label>
              <Autocomplete
                id="city"
                name="city"
                aria-label="Ville"
                value={city}
                onChange={setCity}
                options={cityOptions}
                placeholder="Rechercher…"
                emptyHint="Aucune ville trouvée"
                typeHint="Tapez au moins 2 lettres…"
              />
            </div>
            <div>
              <Label htmlFor="quartier">Quartier</Label>
              <Autocomplete
                id="quartier"
                name="quartier"
                aria-label="Quartier"
                value={quartier}
                onChange={setQuartier}
                onSelectOption={(opt) => {
                  setQuartier(opt.value);
                  const match = quartierOptions.find(
                    (o) => o.value === opt.value && o.label === opt.label,
                  );
                  if (match?.city) setCity(match.city);
                }}
                options={quartierOptions}
                placeholder="Ex. Almadies…"
                emptyHint={
                  city
                    ? "Aucun quartier pour cette ville"
                    : "Aucun quartier trouvé"
                }
                typeHint="Tapez au moins 2 lettres…"
              />
            </div>
          </FilterSection>

          <FilterSection title="Bien" summary={bienSummary} defaultOpen>
            <div>
              <Label htmlFor="propertyType">Type</Label>
              <select
                id="propertyType"
                name="propertyType"
                className={selectClass}
                defaultValue={searchParams.get("propertyType") ?? ""}
              >
                <option value="">Tous</option>
                <option value="LAND">Terrain</option>
                <option value="HOUSE">Maison</option>
                <option value="APARTMENT">Appartement</option>
                <option value="OFFICE">Bureau</option>
              </select>
            </div>
            {channel === "acheter" ? (
              <div>
                <Label htmlFor="paperType">Papier</Label>
                <select
                  id="paperType"
                  name="paperType"
                  className={selectClass}
                  defaultValue={searchParams.get("paperType") ?? ""}
                >
                  <option value="">Tous</option>
                  <option value="TF">Titre foncier</option>
                  <option value="BAIL_EMPHYTEOTIQUE">Bail emphytéotique</option>
                  <option value="BAIL_ORDINAIRE">Bail</option>
                  <option value="DELIBERATION">Délibération</option>
                </select>
              </div>
            ) : (
              <div>
                <Label htmlFor="transaction">Type de location</Label>
                <select
                  id="transaction"
                  name="transaction"
                  className={selectClass}
                  defaultValue={searchParams.get("transaction") ?? ""}
                >
                  <option value="">Toutes</option>
                  <option value="RENT">Location classique</option>
                  <option value="SHORT_TERM_RENT">Courte durée</option>
                </select>
              </div>
            )}
          </FilterSection>

          <FilterSection title="Budget" summary={budgetSummary} defaultOpen>
            <div>
              <Label htmlFor="priceMin">Prix min</Label>
              <Input
                id="priceMin"
                name="priceMin"
                type="number"
                min={0}
                defaultValue={searchParams.get("priceMin") ?? ""}
              />
            </div>
            <div>
              <Label htmlFor="priceMax">Prix max</Label>
              <Input
                id="priceMax"
                name="priceMax"
                type="number"
                min={0}
                defaultValue={searchParams.get("priceMax") ?? ""}
              />
            </div>
          </FilterSection>

          <div className="flex flex-wrap items-center gap-2 py-4">
            <Button type="submit">Filtrer</Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setRegions([]);
                setCity("");
                setQuartier("");
                const view = searchParams.get("view");
                router.push(
                  view === "map" ? `/${channel}?view=map` : `/${channel}`,
                );
              }}
            >
              Réinitialiser
            </Button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
