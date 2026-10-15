"use client";

import { useActionState } from "react";
import {
  scheduleVisitAction,
  type VisitReportResult,
} from "@/app/actions/visit-reports";
import { VISIT_SOURCE_LABELS } from "@/lib/leads/visit-labels";
import {
  ListingPicker,
  type ListingOption,
} from "@/components/leads/listing-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: VisitReportResult | undefined = undefined;

const OFFLINE_SOURCES = ["OFFLINE", "PHONE", "WALK_IN", "WHATSAPP"] as const;

function defaultDatetimeLocal(hoursAhead = 2): string {
  const d = new Date(Date.now() + hoursAhead * 3600_000);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export function ScheduleVisitForm({
  listings,
  leadId,
  defaultName,
  defaultPhone,
  defaultListingId,
}: {
  listings: ListingOption[];
  leadId?: string;
  defaultName?: string;
  defaultPhone?: string;
  defaultListingId?: string;
}) {
  const [state, formAction, pending] = useActionState(
    scheduleVisitAction,
    initial,
  );

  if (state?.ok) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-[var(--color-sage)]/40 bg-[var(--color-sage)]/10 px-4 py-3 text-sm"
      >
        Visite planifiée — à clôturer après le rendez-vous.
      </div>
    );
  }

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-3">
      {leadId ? <input type="hidden" name="leadId" value={leadId} /> : null}
      <div>
        <Label htmlFor="sv-name">Nom du prospect *</Label>
        <Input
          id="sv-name"
          name="name"
          required
          defaultValue={defaultName ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="sv-phone">Téléphone *</Label>
        <Input
          id="sv-phone"
          name="phone"
          type="tel"
          required
          defaultValue={defaultPhone ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="sv-email">Email (optionnel)</Label>
        <Input id="sv-email" name="email" type="email" />
      </div>
      <ListingPicker
        id="sv-listing"
        options={listings}
        defaultValue={defaultListingId}
        required
        hint="Bien pour lequel le RDV est pris."
      />
      <div>
        <Label htmlFor="sv-when">Créneau prévu *</Label>
        <Input
          id="sv-when"
          name="scheduledAt"
          type="datetime-local"
          required
          defaultValue={defaultDatetimeLocal()}
        />
      </div>
      <div>
        <Label htmlFor="sv-source">Canal (offline / reçu)</Label>
        <select
          id="sv-source"
          name="source"
          defaultValue="OFFLINE"
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
        >
          {OFFLINE_SOURCES.map((s) => (
            <option key={s} value={s}>
              {VISIT_SOURCE_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="sv-notes">Notes (optionnel)</Label>
        <textarea
          id="sv-notes"
          name="agentNotes"
          rows={2}
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
        />
      </div>
      {state && !state.ok ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "…" : "Planifier"}
      </Button>
    </form>
  );
}
