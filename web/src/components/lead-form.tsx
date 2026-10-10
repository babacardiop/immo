"use client";

import { useActionState } from "react";
import {
  submitLeadAction,
  type LeadActionResult,
} from "@/app/actions/leads";
import { LEAD_INTENTS } from "@/lib/leads/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: LeadActionResult | undefined = undefined;

const intentLabels: Record<(typeof LEAD_INTENTS)[number], string> = {
  buy: "Acheter",
  rent: "Louer",
  sell: "Vendre",
  manage: "Faire gérer",
  diaspora: "Diaspora / Secure",
  other: "Autre",
};

export function LeadForm({
  listingId,
  sourceDetail = "form_contact",
  defaultIntent = "other",
}: {
  listingId?: string;
  sourceDetail?: string;
  defaultIntent?: (typeof LEAD_INTENTS)[number];
}) {
  const [state, formAction, pending] = useActionState(
    submitLeadAction,
    initial,
  );

  if (state?.ok && !state.skipped) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-[var(--color-sage)]/40 bg-[var(--color-sage)]/10 px-4 py-3 text-sm"
      >
        Merci — un conseiller vous répond sous <strong>24 h</strong>.
      </div>
    );
  }

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <input type="hidden" name="listingId" value={listingId ?? ""} />
      <input type="hidden" name="sourceDetail" value={sourceDetail} />

      {/* Honeypot — hidden from users, present for bots / a11y-hidden */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <Label htmlFor="website">Site web</Label>
        <Input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div>
        <Label htmlFor="name">Nom</Label>
        <Input id="name" name="name" required minLength={2} maxLength={120} />
      </div>

      <div>
        <Label htmlFor="phone">Téléphone (WhatsApp)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="+221 77 …"
          autoComplete="tel"
        />
      </div>

      <div>
        <Label htmlFor="email">Email (optionnel)</Label>
        <Input id="email" name="email" type="email" autoComplete="email" />
      </div>

      <div>
        <Label htmlFor="intent">Vous souhaitez</Label>
        <select
          id="intent"
          name="intent"
          defaultValue={defaultIntent}
          className="mt-1 w-full rounded-lg border border-[var(--color-steel)]/50 bg-[var(--color-bg)] px-3 py-2 text-sm"
        >
          {LEAD_INTENTS.map((i) => (
            <option key={i} value={i}>
              {intentLabels[i]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message">Message (optionnel)</Label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={2000}
          className="mt-1 w-full rounded-lg border border-[var(--color-steel)]/50 bg-[var(--color-bg)] px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          name="consentContact"
          value="on"
          required
          className="mt-1"
        />
        <span>
          J’accepte d’être recontacté(e) par EverGreen au sujet de ma demande.
        </span>
      </label>

      {state && !state.ok ? (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Envoi…" : "Envoyer"}
      </Button>
    </form>
  );
}
