"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  createCityAction,
  createQuartierAction,
  deleteCityAction,
  deleteQuartierAction,
} from "@/app/actions/locations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatQuartierWithCity } from "@/lib/locations/format";

type CityRow = {
  id: string;
  name: string;
  _count: { quartiers: number };
};

type QuartierRow = {
  id: string;
  name: string;
  city: { id: string; name: string };
};

export function LieuxAdmin({
  cities,
  quartiers,
}: {
  cities: CityRow[];
  quartiers: QuartierRow[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [filterCityId, setFilterCityId] = useState("");

  function refresh() {
    router.refresh();
  }

  const visibleQuartiers = filterCityId
    ? quartiers.filter((q) => q.city.id === filterCityId)
    : quartiers;

  return (
    <div className="space-y-10">
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Villes</h2>
        <form
          className="flex flex-wrap items-end gap-3"
          action={(fd) => {
            setError(null);
            startTransition(async () => {
              const res = await createCityAction(fd);
              if (!res.ok) setError(res.error);
              else refresh();
            });
          }}
        >
          <div className="min-w-[200px] flex-1">
            <Label htmlFor="city-name">Ajouter une ville</Label>
            <Input id="city-name" name="name" required placeholder="Ex. Saly" />
          </div>
          <Button type="submit" disabled={pending}>
            Ajouter
          </Button>
        </form>
        <ul className="divide-y divide-[var(--color-steel)]/40 border border-[var(--color-steel)]/40">
          {cities.map((city) => (
            <li
              key={city.id}
              className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
            >
              <span>
                {city.name}{" "}
                <span className="text-[var(--color-muted)]">
                  ({city._count.quartiers} quartiers)
                </span>
              </span>
              <Button
                type="button"
                variant="ghost"
                disabled={pending}
                onClick={() => {
                  if (
                    !confirm(
                      `Supprimer ${city.name} et tous ses quartiers ?`,
                    )
                  ) {
                    return;
                  }
                  setError(null);
                  startTransition(async () => {
                    const res = await deleteCityAction(city.id);
                    if (!res.ok) setError(res.error);
                    else refresh();
                  });
                }}
              >
                Supprimer
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Quartiers</h2>
        <form
          className="grid gap-3 sm:grid-cols-3"
          action={(fd) => {
            setError(null);
            startTransition(async () => {
              const res = await createQuartierAction(fd);
              if (!res.ok) setError(res.error);
              else refresh();
            });
          }}
        >
          <div>
            <Label htmlFor="quartier-city">Ville</Label>
            <select
              id="quartier-city"
              name="cityId"
              required
              className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Choisir…
              </option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="quartier-name">Nom</Label>
            <Input
              id="quartier-name"
              name="name"
              required
              placeholder="Ex. Almadies"
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={pending}>
              Ajouter le quartier
            </Button>
          </div>
        </form>

        <div>
          <Label htmlFor="filter-city">Filtrer la liste</Label>
          <select
            id="filter-city"
            className="mt-1 w-full max-w-xs rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
            value={filterCityId}
            onChange={(e) => setFilterCityId(e.target.value)}
          >
            <option value="">Toutes les villes</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <ul className="divide-y divide-[var(--color-steel)]/40 border border-[var(--color-steel)]/40">
          {visibleQuartiers.map((q) => (
            <li
              key={q.id}
              className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
            >
              <span>{formatQuartierWithCity(q.name, q.city.name)}</span>
              <Button
                type="button"
                variant="ghost"
                disabled={pending}
                onClick={() => {
                  if (
                    !confirm(
                      `Supprimer ${formatQuartierWithCity(q.name, q.city.name)} ?`,
                    )
                  ) {
                    return;
                  }
                  setError(null);
                  startTransition(async () => {
                    const res = await deleteQuartierAction(q.id);
                    if (!res.ok) setError(res.error);
                    else refresh();
                  });
                }}
              >
                Supprimer
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
