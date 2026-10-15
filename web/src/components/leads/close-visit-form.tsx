"use client";

import { useActionState } from "react";
import {
  closeVisitAction,
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

export function CloseVisitForm({
  visitId,
  listings,
  defaultListingId,
}: {
  visitId: string;
  listings: ListingOption[];
  defaultListingId?: string | null;
}) {
  const [state, formAction, pending] = useActionState(closeVisitAction, initial);

  if (state?.ok) {
    return (
      <p className="text-sm text-[var(--color-sage)]" role="status">
        Visite clôturée.
      </p>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 border-t border-[var(--color-border)]/60 pt-3"
    >
      <input type="hidden" name="visitId" value={visitId} />
      <ListingPicker
        id={`cv-listing-${visitId}`}
        options={listings}
        defaultValue={defaultListingId ?? undefined}
        required
        label="Bien effectivement visité"
        hint="Corrigez si un autre bien a été montré sur place."
      />
      <div>
        <Label htmlFor={`cv-when-${visitId}`}>Heure effective</Label>
        <Input
          id={`cv-when-${visitId}`}
          name="conductedAt"
          type="datetime-local"
          required
          defaultValue={defaultDatetimeLocal()}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor={`cv-out-${visitId}`}>Outcome</Label>
        <select
          id={`cv-out-${visitId}`}
          name="outcome"
          required
          defaultValue="CONTINUE"
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-2 text-sm"
        >
          {VISIT_OUTCOMES.map((o) => (
            <option key={o} value={o}>
              {VISIT_OUTCOME_LABELS[o]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor={`cv-motif-${visitId}`}>
          Motif (si pas intéressé / autre)
        </Label>
        <textarea
          id={`cv-motif-${visitId}`}
          name="outcomeMotif"
          rows={2}
          placeholder="Prix, quartier, état…"
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-2 text-sm"
        />
      </div>
      <textarea
        name="agentNotes"
        rows={2}
        placeholder="Notes de clôture…"
        className="w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-2 text-sm"
      />
      {state && !state.ok ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "…" : "Clôturer"}
      </Button>
    </form>
  );
}
