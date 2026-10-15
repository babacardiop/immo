"use client";

import { useMemo, useState } from "react";
import { formatFcfa } from "@/lib/format";
import { DISCLAIMER_CONSTRUCTION } from "@/lib/simus/disclaimers";
import {
  constructionWaText,
  FINITION_LABELS,
  simulateConstruction,
  ZONE_LABELS,
  type ConstructionInput,
} from "@/lib/simus/construction";
import { SimResultPanel } from "@/components/simulators/sim-result-panel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const selectClass =
  "w-full rounded-2xl border border-[var(--color-steel)]/55 bg-[var(--color-surface)] px-4 py-3 text-sm";

export function ConstructionForm() {
  const [surfaceM2, setSurfaceM2] = useState(100);
  const [niveaux, setNiveaux] = useState<ConstructionInput["niveaux"]>("R0");
  const [finition, setFinition] =
    useState<ConstructionInput["finition"]>("standard");
  const [zone, setZone] = useState<ConstructionInput["zone"]>("dakar");
  const [cloture, setCloture] = useState(false);
  const [fosse, setFosse] = useState(false);
  const [vrd, setVrd] = useState(false);
  const [imprevusPct, setImprevusPct] = useState(12);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!submitted) return null;
    try {
      return simulateConstruction({
        surfaceM2,
        niveaux,
        finition,
        zone,
        cloture,
        fosse,
        vrd,
        imprevusPct,
      });
    } catch {
      return null;
    }
  }, [
    submitted,
    surfaceM2,
    niveaux,
    finition,
    zone,
    cloture,
    fosse,
    vrd,
    imprevusPct,
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
          <Label htmlFor="surfaceM2">Surface (m²)</Label>
          <Input
            id="surfaceM2"
            type="number"
            min={50}
            max={600}
            value={surfaceM2}
            onChange={(e) => setSurfaceM2(Number(e.target.value))}
            required
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="niveaux">Niveaux</Label>
            <select
              id="niveaux"
              className={selectClass}
              value={niveaux}
              onChange={(e) =>
                setNiveaux(e.target.value as ConstructionInput["niveaux"])
              }
            >
              <option value="R0">R+0</option>
              <option value="R1">R+1</option>
            </select>
          </div>
          <div>
            <Label htmlFor="finition">Finition</Label>
            <select
              id="finition"
              className={selectClass}
              value={finition}
              onChange={(e) =>
                setFinition(e.target.value as ConstructionInput["finition"])
              }
            >
              {(Object.keys(FINITION_LABELS) as ConstructionInput["finition"][]).map(
                (k) => (
                  <option key={k} value={k}>
                    {FINITION_LABELS[k]}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>
        <div>
          <Label htmlFor="zone">Zone</Label>
          <select
            id="zone"
            className={selectClass}
            value={zone}
            onChange={(e) =>
              setZone(e.target.value as ConstructionInput["zone"])
            }
          >
            {(Object.keys(ZONE_LABELS) as ConstructionInput["zone"][]).map(
              (k) => (
                <option key={k} value={k}>
                  {ZONE_LABELS[k]}
                </option>
              ),
            )}
          </select>
        </div>
        <div>
          <Label htmlFor="imprevusPct">Imprévus (%)</Label>
          <Input
            id="imprevusPct"
            type="number"
            min={0}
            max={20}
            value={imprevusPct}
            onChange={(e) => setImprevusPct(Number(e.target.value))}
          />
        </div>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Options</legend>
          {(
            [
              ["cloture", cloture, setCloture, "Clôture"],
              ["fosse", fosse, setFosse, "Fosse septique"],
              ["vrd", vrd, setVrd, "VRD"],
            ] as const
          ).map(([id, checked, set, label]) => (
            <label key={id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => set(e.target.checked)}
                className="h-4 w-4"
              />
              {label}
            </label>
          ))}
        </fieldset>
        <Button type="submit">Estimer</Button>
      </form>

      {result ? (
        <SimResultPanel
          headline={`${formatFcfa(result.totalMin)} – ${formatFcfa(result.totalMax)}`}
          lines={[
            `${formatFcfa(result.pricePerSqmMin)} – ${formatFcfa(result.pricePerSqmMax)} / m²`,
            result.optionsTotal > 0
              ? `Options ${formatFcfa(result.optionsTotal)}`
              : "Sans options forfaitaires",
            result.architectHint
              ? "Architecte recommandé / obligatoire (> ~30 M FCFA)"
              : "Sous le seuil archi indicatif (~30 M)",
          ]}
          disclaimer={DISCLAIMER_CONSTRUCTION}
          waText={constructionWaText(result, surfaceM2)}
          secondaryHref="/outils/budget-total"
          secondaryLabel="Budget total projet →"
        />
      ) : (
        <div className="flex items-center rounded-[var(--radius-card)] border border-dashed border-[var(--color-steel)]/40 p-6 text-sm text-[var(--color-muted)]">
          Estimez une fourchette hors terrain — devis partenaire ensuite.
        </div>
      )}
    </div>
  );
}
