"use client";

import { useMemo, useState } from "react";
import { formatFcfa } from "@/lib/format";
import { DISCLAIMER_MENSUALITE } from "@/lib/simus/disclaimers";
import {
  mensualiteWaText,
  simulateMensualite,
  suggestedAcomptePct,
} from "@/lib/simus/mensualite";
import { SimResultPanel } from "@/components/simulators/sim-result-panel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const selectClass =
  "w-full rounded-2xl border border-[var(--color-steel)]/55 bg-[var(--color-surface)] px-4 py-3 text-sm";

export function MensualiteForm({
  defaultPrix = 15_000_000,
}: {
  defaultPrix?: number;
}) {
  const [prixBien, setPrixBien] = useState(defaultPrix);
  const [acompteMode, setAcompteMode] = useState<"pct" | "fixe">("pct");
  const [acomptePct, setAcomptePct] = useState(suggestedAcomptePct(defaultPrix));
  const [acompteFixe, setAcompteFixe] = useState(
    Math.round((defaultPrix * 30) / 100),
  );
  const [dureeMois, setDureeMois] = useState(24);
  const [fraisDossier, setFraisDossier] = useState(50_000);
  const [lisserFrais, setLisserFrais] = useState(false);
  const [mode, setMode] = useState<"etale" | "loc_vente">("etale");
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!submitted) return null;
    try {
      return simulateMensualite({
        prixBien,
        acompteMode,
        acomptePct,
        acompteFixe,
        dureeMois,
        fraisDossier,
        lisserFrais,
        mode,
      });
    } catch {
      return null;
    }
  }, [
    submitted,
    prixBien,
    acompteMode,
    acomptePct,
    acompteFixe,
    dureeMois,
    fraisDossier,
    lisserFrais,
    mode,
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
          <Label htmlFor="prixBien">Prix du bien (FCFA)</Label>
          <Input
            id="prixBien"
            type="number"
            min={1}
            value={prixBien}
            onChange={(e) => setPrixBien(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <Label htmlFor="mode">Mode</Label>
          <select
            id="mode"
            className={selectClass}
            value={mode}
            onChange={(e) => setMode(e.target.value as "etale" | "loc_vente")}
          >
            <option value="etale">Vente étalée (terrain)</option>
            <option value="loc_vente">Location-vente (bâti)</option>
          </select>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="acompteMode">Acompte</Label>
            <select
              id="acompteMode"
              className={selectClass}
              value={acompteMode}
              onChange={(e) =>
                setAcompteMode(e.target.value as "pct" | "fixe")
              }
            >
              <option value="pct">En %</option>
              <option value="fixe">Montant fixe</option>
            </select>
          </div>
          {acompteMode === "pct" ? (
            <div>
              <Label htmlFor="acomptePct">Pourcentage</Label>
              <Input
                id="acomptePct"
                type="number"
                min={0}
                max={90}
                value={acomptePct}
                onChange={(e) => setAcomptePct(Number(e.target.value))}
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="acompteFixe">Montant (FCFA)</Label>
              <Input
                id="acompteFixe"
                type="number"
                min={0}
                value={acompteFixe}
                onChange={(e) => setAcompteFixe(Number(e.target.value))}
              />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="dureeMois">Durée</Label>
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
        <div>
          <Label htmlFor="fraisDossier">Frais de dossier (FCFA)</Label>
          <Input
            id="fraisDossier"
            type="number"
            min={0}
            value={fraisDossier}
            onChange={(e) => setFraisDossier(Number(e.target.value))}
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={lisserFrais}
            onChange={(e) => setLisserFrais(e.target.checked)}
            className="h-4 w-4"
          />
          Lisser les frais dans la mensualité
        </label>
        <Button type="submit">Calculer</Button>
      </form>

      {result ? (
        <SimResultPanel
          headline={`${formatFcfa(result.mensualite)} / mois`}
          lines={[
            `Acompte ${formatFcfa(result.acompte)}`,
            `Total payé ~${formatFcfa(result.totalPaye)}`,
            `Sur ${result.dureeMois} mois`,
          ]}
          disclaimer={DISCLAIMER_MENSUALITE}
          waText={mensualiteWaText(result, prixBien)}
          secondaryHref="/outils/budget-total"
          secondaryLabel="Budget total projet →"
        />
      ) : (
        <div className="flex items-center rounded-[var(--radius-card)] border border-dashed border-[var(--color-steel)]/40 p-6 text-sm text-[var(--color-muted)]">
          Renseignez les champs puis calculez — résultat immédiat, sans email.
        </div>
      )}
    </div>
  );
}
