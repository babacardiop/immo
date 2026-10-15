"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  logFieldVisitAction,
  type VisitReportResult,
} from "@/app/actions/visit-reports";
import {
  VISIT_OUTCOME_LABELS,
  VISIT_OUTCOMES,
} from "@/lib/leads/visit-outcome";
import { VISIT_SOURCE_LABELS } from "@/lib/leads/visit-labels";
import {
  ListingPicker,
  type ListingOption,
} from "@/components/leads/listing-picker";
import { ProspectPicker } from "@/components/leads/prospect-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: VisitReportResult | undefined = undefined;

const FIELD_SOURCES = ["OFFLINE", "WALK_IN", "PHONE", "WHATSAPP"] as const;

function defaultDatetimeLocal(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export function FieldVisitForm({
  listings,
  leadId,
  defaultName,
  defaultPhone,
  defaultEmail,
  defaultListingId,
}: {
  listings: ListingOption[];
  leadId?: string;
  defaultName?: string;
  defaultPhone?: string;
  defaultEmail?: string;
  defaultListingId?: string;
}) {
  const [state, formAction, pending] = useActionState(
    logFieldVisitAction,
    initial,
  );

  if (state?.ok) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-[var(--color-sage)]/40 bg-[var(--color-sage)]/10 px-4 py-3 text-sm"
      >
        Visite terrain consignée
        {state.leadId ? (
          <>
            {" "}
            —{" "}
            <Link
              href={`/espace/agent/leads/${state.leadId}`}
              className="underline"
            >
              voir le prospect
            </Link>
          </>
        ) : null}
        .
      </div>
    );
  }

  const lockedProspect = Boolean(leadId);

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-3">
      <ProspectPicker
        locked={lockedProspect}
        defaultSelection={
          leadId || defaultName || defaultPhone
            ? {
                id: leadId,
                name: defaultName ?? "",
                phone: defaultPhone ?? "",
                email: defaultEmail ?? "",
              }
            : undefined
        }
      />
      <ListingPicker
        id="fv-listing"
        options={listings}
        defaultValue={defaultListingId}
        required
        hint="Le bien effectivement vu — y compris un autre bien montré sur place."
      />
      <div>
        <Label htmlFor="fv-when">Quand *</Label>
        <Input
          id="fv-when"
          name="conductedAt"
          type="datetime-local"
          required
          defaultValue={defaultDatetimeLocal()}
        />
      </div>
      <div>
        <Label htmlFor="fv-source">Canal</Label>
        <select
          id="fv-source"
          name="source"
          defaultValue="OFFLINE"
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
        >
          {FIELD_SOURCES.map((s) => (
            <option key={s} value={s}>
              {VISIT_SOURCE_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="fv-outcome">Outcome *</Label>
        <select
          id="fv-outcome"
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
        <Label htmlFor="fv-motif">Motif (si pas intéressé / autre)</Label>
        <textarea
          id="fv-motif"
          name="outcomeMotif"
          rows={2}
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
        />
      </div>
      <div>
        <Label htmlFor="fv-notes">Notes</Label>
        <textarea
          id="fv-notes"
          name="agentNotes"
          rows={2}
          placeholder="Objections, suite à donner…"
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
        />
      </div>
      {state && !state.ok ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "…" : "Consigner la visite"}
      </Button>
    </form>
  );
}
