"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
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
import { SENEGAL_REGIONS } from "@/lib/locations/regions";

/** DS-17 catalogue filters — preserves view + region */
export function CatalogueFilters({
  channel,
}: {
  channel: CatalogueChannel;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cities, quartiers } = useLocations();

  const regionParam = searchParams.get("region") ?? "";
  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [quartier, setQuartier] = useState(searchParams.get("quartier") ?? "");

  const citiesScoped = useMemo(
    () =>
      regionParam
        ? cities.filter((c) => c.region === regionParam)
        : cities,
    [cities, regionParam],
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

  const apply = useCallback(
    (formData: FormData) => {
      const params = new URLSearchParams();
      const view = searchParams.get("view");
      if (view === "map") params.set("view", "map");

      for (const key of [
        "region",
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
    [channel, router, searchParams],
  );

  const selectClass =
    "w-full rounded-[var(--radius-pill)] border-0 bg-[var(--color-bg)] px-4 py-3 text-sm";

  return (
    <form
      className="grid gap-3 rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3"
      action={apply}
    >
      <div>
        <Label htmlFor="region">Région</Label>
        <select
          id="region"
          name="region"
          className={selectClass}
          defaultValue={regionParam}
          onChange={() => {
            setCity("");
            setQuartier("");
          }}
        >
          <option value="">Toutes</option>
          {SENEGAL_REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
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
      <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-3">
        <Button type="submit">Filtrer</Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
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
  );
}
