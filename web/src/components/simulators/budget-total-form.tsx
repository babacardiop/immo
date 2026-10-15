"use client";

import { useMemo, useState } from "react";
import { formatFcfa } from "@/lib/format";
import { DISCLAIMER_BUDGET } from "@/lib/simus/disclaimers";
import {
  budgetWaText,
  simulateBudgetTotal,
} from "@/lib/simus/budget-total";
import { SimResultPanel } from "@/components/simulators/sim-result-panel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const selectClass =
  "w-full rounded-2xl border border-[var(--color-steel)]/55 bg-[var(--color-surface)] px-4 py-3 text-sm";

export function BudgetTotalForm({
  defaultPrix = 15_000_000,
}: {
  defaultPrix?: number;
}) {
  const [prixTerrain, setPrixTerrain] = useState(defaultPrix);
  const [includeConstruction, setIncludeConstruction] = useState(true);
  const [includeFrais, setIncludeFrais] = useState(true);
  const [fraisPct, setFraisPct] = useState(10);
  const [surfaceM2, setSurfaceM2] = useState(100);
  const [dureeMois, setDureeMois] = useState(24);
  const [acomptePct, setAcomptePct] = useState(30);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!submitted) return null;
    try {
      return simulateBudgetTotal({
        prixTerrain,
        includeConstruction,
        includeFrais,
        fraisPct,
        construction: { surfaceM2, zone: "dakar", finition: "standard" },
        mensualite: {
          acompteMode: "pct",
          acomptePct,
          dureeMois,
          fraisDossier: 50_000,
          lisserFrais: false,
          mode: "etale",
        },
      });
    } catch {
      return null;
    }
  }, [
    submitted,
    prixTerrain,
    includeConstruction,
    includeFrais,
    fraisPct,
    surfaceM2,
    dureeMois,
    acomptePct,
  ]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-4 rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-5 sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <Label htmlFor="prixTerrain">Prix terrain (FCFA)</Label>
          <Input
            id="prixTerrain"
            type="number"
            min={1}
            value={prixTerrain}
            onChange={(e) => setPrixTerrain(Number(e.target.value))}
            required
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="acomptePct">Acompte (%)</Label>
            <Input
              id="acomptePct"
              type="number"
              min={0}
              max={90}
              value={acomptePct}
              onChange={(e) => setAcomptePct(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="dureeMois">Durée étalement</Label>
            <select
              id="dureeMois"
              className={selectClass}
              value={dureeMois}
              onChange={(e) => setDureeMois(Number(e.target.value))}
            >
              <option value={12}>12 mois</option>
              <option value={24}>24 mois</option>
              <option value={36}>36 mois</option>
            </select>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeFrais}
            onChange={(e) => setIncludeFrais(e.target.checked)}
            className="h-4 w-4"
          />
          Inclure frais d’acquisition (~{fraisPct} %)
        </label>
        {includeFrais ? (
          <div>
            <Label htmlFor="fraisPct">Frais (%)</Label>
            <Input
              id="fraisPct"
              type="number"
              min={5}
              max={15}
              value={fraisPct}
              onChange={(e) => setFraisPct(Number(e.target.value))}
            />
          </div>
        ) : null}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeConstruction}
            onChange={(e) => setIncludeConstruction(e.target.checked)}
            className="h-4 w-4"
          />
          Inclure estimation construction
        </label>
        {includeConstruction ? (
          <div>
            <Label htmlFor="surfaceM2">Surface maison (m²)</Label>
            <Input
              id="surfaceM2"
              type="number"
              min={50}
              max={600}
              value={surfaceM2}
              onChange={(e) => setSurfaceM2(Number(e.target.value))}
            />
          </div>
        ) : null}
        <Button type="submit">Calculer le budget</Button>
      </form>

      {result ? (
        <SimResultPanel
          headline={formatFcfa(result.grandTotal)}
          lines={[
            `Cash jour J ~${formatFcfa(result.cashInitial)}`,
            `Frais acquisition ${formatFcfa(result.fraisAcquisition)}`,
            result.mensualite
              ? `Mensualité ~${formatFcfa(result.mensualite.mensualite)} / mois`
              : "",
            result.construction
              ? `Construction ${formatFcfa(result.construction.totalMin)} – ${formatFcfa(result.construction.totalMax)}`
              : "Sans construction",
          ].filter(Boolean)}
          disclaimer={DISCLAIMER_BUDGET}
          waText={budgetWaText(result)}
          secondaryHref="/acheter"
          secondaryLabel="Voir les terrains →"
        />
      ) : (
        <div className="flex items-center rounded-[var(--radius-card)] border border-dashed border-[var(--color-steel)]/40 p-6 text-sm text-[var(--color-muted)]">
          Agrège terrain + paiement + construction + frais en un total.
        </div>
      )}
    </div>
  );
}
