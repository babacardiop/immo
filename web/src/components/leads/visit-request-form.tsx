"use client";

import { useActionState } from "react";
import {
  submitVisitRequestAction,
  type VisitActionResult,
} from "@/app/actions/visits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: VisitActionResult | undefined = undefined;

export function VisitRequestForm({ listingId }: { listingId: string }) {
  const [state, formAction, pending] = useActionState(
    submitVisitRequestAction,
    initial,
  );

  if (state?.ok && !state.skipped) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-[var(--color-sage)]/40 bg-[var(--color-sage)]/10 px-4 py-3 text-sm"
      >
        Demande de visite enregistrée — un conseiller vous rappelle.{" "}
        <strong>Aucun compte créé</strong> à ce stade.
      </div>
    );
  }

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-4">
      <input type="hidden" name="listingId" value={listingId} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <Label htmlFor="website-visit">Site web</Label>
        <Input id="website-visit" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <Label htmlFor="visit-name">Nom</Label>
        <Input id="visit-name" name="name" required minLength={2} maxLength={120} />
      </div>
      <div>
        <Label htmlFor="visit-phone">Téléphone (WhatsApp)</Label>
        <Input id="visit-phone" name="phone" type="tel" required placeholder="+221 …" />
      </div>
      <div>
        <Label htmlFor="visit-email">Email (optionnel)</Label>
        <Input id="visit-email" name="email" type="email" />
      </div>
      <div>
        <Label htmlFor="visit-slot">Créneau souhaité</Label>
        <Input
          id="visit-slot"
          name="preferredSlot"
          placeholder="Ex. samedi matin, après 18h…"
        />
      </div>
      <div>
        <Label htmlFor="visit-msg">Message (optionnel)</Label>
        <textarea
          id="visit-msg"
          name="message"
          rows={3}
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
        />
      </div>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="consentContact" value="true" required className="mt-1" />
        <span>J’accepte d’être recontacté·e par EverGreen.</span>
      </label>

      {state && !state.ok ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Envoi…" : "Demander une visite"}
      </Button>
    </form>
  );
}
