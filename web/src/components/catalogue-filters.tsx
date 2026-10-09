"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { CatalogueChannel } from "@/lib/listings/public-query";

export function CatalogueFilters({
  channel,
}: {
  channel: CatalogueChannel;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const apply = useCallback(
    (formData: FormData) => {
      const params = new URLSearchParams();
      for (const key of [
        "city",
        "quartier",
        "propertyType",
        "paperType",
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
        <Input
          id="city"
          name="city"
          defaultValue={searchParams.get("city") ?? ""}
          placeholder="Dakar"
        />
      </div>
      <div>
        <Label htmlFor="quartier">Quartier</Label>
        <Input
          id="quartier"
          name="quartier"
          defaultValue={searchParams.get("quartier") ?? ""}
          placeholder="Almadies"
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
      ) : null}
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
          onClick={() => router.push(`/${channel}`)}
        >
          Réinitialiser
        </Button>
      </div>
    </form>
  );
}
