"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Autocomplete } from "@/components/ui/autocomplete";
import type { CatalogueChannel } from "@/lib/listings/public-query";
import {
  filterCityNames,
  filterQuartierEntries,
} from "@/lib/locations/filter";
import { formatQuartierWithCity } from "@/lib/locations/format";
import { useLocations } from "@/hooks/use-locations";

export function CatalogueFilters({
  channel,
}: {
  channel: CatalogueChannel;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cities, quartiers } = useLocations();

  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [quartier, setQuartier] = useState(searchParams.get("quartier") ?? "");

  const cityOptions = useMemo(
    () =>
      filterCityNames(cities, city).map((name) => ({
        value: name,
        label: name,
      })),
    [cities, city],
  );

  const quartierOptions = useMemo(
    () =>
      filterQuartierEntries(quartiers, quartier, city).map((q) => ({
        value: q.name,
        label: formatQuartierWithCity(q.name, q.city),
        city: q.city,
      })),
    [quartiers, quartier, city],
  );

  const apply = useCallback(
    (formData: FormData) => {
      const params = new URLSearchParams();
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
    [channel, router],
  );

  return (
    <form
      className="grid gap-3 rounded-md border border-[var(--color-steel)]/40 p-4 sm:grid-cols-2 lg:grid-cols-3"
      action={apply}
    >
      <div>
        <Label htmlFor="city">Ville</Label>
        <Autocomplete
          id="city"
          name="city"
          aria-label="Ville"
          value={city}
          onChange={setCity}
          options={cityOptions}
          placeholder="Dakar, Thiès…"
          emptyHint="Aucune ville trouvée"
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
          placeholder="Almadies · Dakar…"
          emptyHint={
            city
              ? "Aucun quartier pour cette ville"
              : "Aucun quartier trouvé"
          }
        />
      </div>
      <div>
        <Label htmlFor="propertyType">Type</Label>
        <select
          id="propertyType"
          name="propertyType"
          className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
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
            className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
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
            className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
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
            router.push(`/${channel}`);
          }}
        >
          Réinitialiser
        </Button>
      </div>
    </form>
  );
}
