"use client";

import { useActionState } from "react";
import {
  logVisitReportAction,
  type VisitReportResult,
} from "@/app/actions/visit-reports";
import {
  VISIT_OUTCOME_LABELS,
  VISIT_OUTCOMES,
} from "@/lib/leads/visit-outcome";
import {
  ListingPicker,
  type ListingOption,
} from "@/components/leads/listing-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: VisitReportResult | undefined = undefined;

function defaultDatetimeLocal(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export function VisitReportForm({
  leadId,
  listings,
  defaultListingId,
}: {
  leadId: string;
  listings: ListingOption[];
  defaultListingId?: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    logVisitReportAction,
    initial,
  );

  if (state?.ok) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-[var(--color-sage)]/40 bg-[var(--color-sage)]/10 px-4 py-3 text-sm"
      >
        Visite enregistrée sur le bien choisi.
      </div>
    );
  }

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-3">
      <input type="hidden" name="leadId" value={leadId} />
      <input type="hidden" name="source" value="OFFLINE" />
      <ListingPicker
        options={listings}
        defaultValue={defaultListingId ?? undefined}
        required
        hint="Si un autre bien a été montré, sélectionnez-le ici (nouvelle ligne d’historique)."
      />
      <div>
        <Label htmlFor="conductedAt">Date & heure de la visite</Label>
        <Input
          id="conductedAt"
          name="conductedAt"
          type="datetime-local"
          required
          defaultValue={defaultDatetimeLocal()}
        />
      </div>
      <div>
        <Label htmlFor="outcome">Suite donnée par le client</Label>
        <select
          id="outcome"
          name="outcome"
          required
          defaultValue="CONTINUE"
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
        >
          {VISIT_OUTCOMES.map((o) => (
            <option key={o} value={o}>
              {VISIT_OUTCOME_LABELS[o]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="outcomeMotif">
          Motif (si pas intéressé / autre — recommandé)
        </Label>
        <textarea
          id="outcomeMotif"
          name="outcomeMotif"
          rows={2}
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
          placeholder="Prix, quartier, état du bien…"
        />
      </div>
      <div>
        <Label htmlFor="agentNotes">Notes agent</Label>
        <textarea
          id="agentNotes"
          name="agentNotes"
          rows={3}
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
          placeholder="Objections, questions, ambiance…"
        />
      </div>
      {state && !state.ok ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "…" : "Logger la visite"}
      </Button>
    </form>
  );
}
