"use client";

import { useEffect, useState, useTransition } from "react";
import { createQuartierOnTheFlyAction } from "@/app/actions/locations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SENEGAL_REGIONS,
  guessRegionForCity,
} from "@/lib/locations/regions";

export function AddLocationTrigger({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="h-7 shrink-0 px-2 text-base leading-none"
      title="Ajouter un quartier au référentiel"
      aria-label="Ajouter un quartier"
      onClick={onClick}
    >
      +
    </Button>
  );
}

export function AddLocationPanel({
  initialCity,
  initialQuartier,
  onCreated,
  onClose,
}: {
  initialCity?: string;
  initialQuartier?: string;
  onCreated: (created: {
    city: string;
    quartier: string;
    region: string;
  }) => void;
  onClose: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [quartier, setQuartier] = useState(initialQuartier ?? "");
  const [city, setCity] = useState(initialCity ?? "");
  const [region, setRegion] = useState(
    () => guessRegionForCity(initialCity ?? "") ?? "Dakar",
  );

  useEffect(() => {
    setQuartier(initialQuartier ?? "");
    setCity(initialCity ?? "");
    setRegion(guessRegionForCity(initialCity ?? "") ?? "Dakar");
    setError(null);
  }, [initialCity, initialQuartier]);

  return (
    <div className="rounded-md border border-[var(--color-steel)]/50 bg-[var(--color-sage)]/15 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Nouveau quartier</h3>
          <p className="mt-0.5 text-xs text-[var(--color-muted)]">
            Quartier + ville + région — ajouté au thesaurus pour tous les
            agents.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="px-2 text-xs"
          onClick={onClose}
        >
          Fermer
        </Button>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="new-quartier">Quartier</Label>
          <Input
            id="new-quartier"
            value={quartier}
            onChange={(e) => setQuartier(e.target.value)}
            placeholder="Cité Djily Mbaye"
            required
          />
        </div>
        <div>
          <Label htmlFor="new-city">Ville</Label>
          <Input
            id="new-city"
            value={city}
            onChange={(e) => {
              const next = e.target.value;
              setCity(next);
              const guessed = guessRegionForCity(next.trim());
              if (guessed) setRegion(guessed);
            }}
            placeholder="Dakar"
            required
          />
        </div>
        <div>
          <Label htmlFor="new-region">Région</Label>
          <select
            id="new-region"
            className="w-full rounded-md border border-[var(--color-steel)] bg-white px-3 py-2 text-sm"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {SENEGAL_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-3 flex gap-2">
        <Button
          type="button"
          disabled={pending}
          onClick={() => {
            setError(null);
            startTransition(async () => {
              const res = await createQuartierOnTheFlyAction({
                quartier,
                city,
                region,
              });
              if (!res.ok) {
                setError(res.error);
                return;
              }
              onCreated({
                city: res.city!,
                quartier: res.quartier!,
                region: res.region ?? region,
              });
              onClose();
            });
          }}
        >
          {pending ? "Ajout…" : "Enregistrer le lieu"}
        </Button>
      </div>
    </div>
  );
}
