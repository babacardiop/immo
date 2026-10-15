"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  createCityAction,
  createCommuneAction,
  createQuartierAction,
  deleteCityAction,
  deleteCommuneAction,
  deleteQuartierAction,
} from "@/app/actions/locations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatLocationHierarchy } from "@/lib/locations/format";
import { SENEGAL_REGIONS } from "@/lib/locations/regions";

type CityRow = {
  id: string;
  name: string;
  region: string;
  _count: { communes: number };
};

type CommuneRow = {
  id: string;
  name: string;
  cityId: string;
  city: { id: string; name: string; region: string };
  _count: { quartiers: number };
};

type QuartierRow = {
  id: string;
  name: string;
  commune: {
    id: string;
    name: string;
    city: { id: string; name: string; region: string };
  };
};

export function LieuxAdmin({
  cities,
  communes,
  quartiers,
}: {
  cities: CityRow[];
  communes: CommuneRow[];
  quartiers: QuartierRow[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [filterCityId, setFilterCityId] = useState("");
  const [filterCommuneId, setFilterCommuneId] = useState("");

  function refresh() {
    router.refresh();
  }

  const visibleCommunes = filterCityId
    ? communes.filter((c) => c.cityId === filterCityId)
    : communes;

  const visibleQuartiers = quartiers.filter((q) => {
    if (filterCommuneId) return q.commune.id === filterCommuneId;
    if (filterCityId) return q.commune.city.id === filterCityId;
    return true;
  });

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
          <div className="min-w-[160px] flex-1">
            <Label htmlFor="city-name">Ajouter une ville</Label>
            <Input id="city-name" name="name" required placeholder="Ex. Saly" />
          </div>
          <div className="min-w-[160px]">
            <Label htmlFor="city-region">Région</Label>
            <select
              id="city-region"
              name="region"
              required
              className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
              defaultValue="Dakar"
            >
              {SENEGAL_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
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
                {formatLocationHierarchy({
                  city: city.name,
                  region: city.region,
                })}{" "}
                <span className="text-[var(--color-muted)]">
                  ({city._count.communes} communes)
                </span>
              </span>
              <Button
                type="button"
                variant="ghost"
                disabled={pending}
                onClick={() => {
                  if (
                    !confirm(
                      `Supprimer ${city.name} et toutes ses communes / quartiers ?`,
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
        <h2 className="text-xl font-semibold">Communes</h2>
        <form
          className="grid gap-3 sm:grid-cols-3"
          action={(fd) => {
            setError(null);
            startTransition(async () => {
              const res = await createCommuneAction(fd);
              if (!res.ok) setError(res.error);
              else refresh();
            });
          }}
        >
          <div>
            <Label htmlFor="commune-city">Ville</Label>
            <select
              id="commune-city"
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
            <Label htmlFor="commune-name">Nom</Label>
            <Input
              id="commune-name"
              name="name"
              required
              placeholder="Ex. Yoff"
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={pending}>
              Ajouter la commune
            </Button>
          </div>
        </form>
        <ul className="divide-y divide-[var(--color-steel)]/40 border border-[var(--color-steel)]/40">
          {visibleCommunes.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
            >
              <span>
                {formatLocationHierarchy({
                  commune: c.name,
                  city: c.city.name,
                  region: c.city.region,
                })}{" "}
                <span className="text-[var(--color-muted)]">
                  ({c._count.quartiers} quartiers)
                </span>
              </span>
              <Button
                type="button"
                variant="ghost"
                disabled={pending}
                onClick={() => {
                  if (
                    !confirm(
                      `Supprimer ${c.name} et tous ses quartiers ?`,
                    )
                  ) {
                    return;
                  }
                  setError(null);
                  startTransition(async () => {
                    const res = await deleteCommuneAction(c.id);
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
            <Label htmlFor="quartier-commune">Commune</Label>
            <select
              id="quartier-commune"
              name="communeId"
              required
              className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Choisir…
              </option>
              {communes.map((c) => (
                <option key={c.id} value={c.id}>
                  {formatLocationHierarchy({
                    commune: c.name,
                    city: c.city.name,
                  })}
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
              placeholder="Ex. Cité Djily Mbaye"
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" disabled={pending}>
              Ajouter le quartier
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap gap-3">
          <div>
            <Label htmlFor="filter-city">Filtrer ville</Label>
            <select
              id="filter-city"
              className="mt-1 w-full min-w-[10rem] rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
              value={filterCityId}
              onChange={(e) => {
                setFilterCityId(e.target.value);
                setFilterCommuneId("");
              }}
            >
              <option value="">Toutes</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="filter-commune">Filtrer commune</Label>
            <select
              id="filter-commune"
              className="mt-1 w-full min-w-[12rem] rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
              value={filterCommuneId}
              onChange={(e) => setFilterCommuneId(e.target.value)}
            >
              <option value="">Toutes</option>
              {visibleCommunes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ul className="divide-y divide-[var(--color-steel)]/40 border border-[var(--color-steel)]/40">
          {visibleQuartiers.map((q) => (
            <li
              key={q.id}
              className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
            >
              <span>
                {formatLocationHierarchy({
                  quartier: q.name,
                  commune: q.commune.name,
                  city: q.commune.city.name,
                  region: q.commune.city.region,
                })}
              </span>
              <Button
                type="button"
                variant="ghost"
                disabled={pending}
                onClick={() => {
                  if (
                    !confirm(
                      `Supprimer ${formatLocationHierarchy({
                        quartier: q.name,
                        commune: q.commune.name,
                        city: q.commune.city.name,
                      })} ?`,
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
