"use client";

import { useActionState } from "react";
import {
  createClientAction,
  type ClientActionResult,
} from "@/app/actions/clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: ClientActionResult | undefined = undefined;

export function CreerCompteClientForm({
  leadId,
  defaultName,
  defaultEmail,
  defaultPhone,
}: {
  leadId?: string;
  defaultName?: string;
  defaultEmail?: string;
  defaultPhone?: string;
}) {
  const [state, formAction, pending] = useActionState(
    createClientAction,
    initial,
  );

  if (state?.ok) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-[var(--color-sage)]/40 bg-[var(--color-sage)]/10 px-4 py-3 text-sm"
      >
        Compte client créé. Vous pouvez maintenant{" "}
        <strong>assigner le bien en candidat</strong>.
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          ID: {state.userId}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-3">
      {leadId ? <input type="hidden" name="leadId" value={leadId} /> : null}
      <div>
        <Label htmlFor="client-name">Nom</Label>
        <Input
          id="client-name"
          name="name"
          required
          defaultValue={defaultName ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="client-email">Email</Label>
        <Input
          id="client-email"
          name="email"
          type="email"
          required
          defaultValue={defaultEmail ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="client-phone">Téléphone</Label>
        <Input
          id="client-phone"
          name="phone"
          type="tel"
          defaultValue={defaultPhone ?? ""}
        />
      </div>
      <div>
        <Label htmlFor="client-password">Mot de passe (optionnel)</Label>
        <Input
          id="client-password"
          name="password"
          type="password"
          minLength={8}
          placeholder="Généré si vide"
        />
      </div>
      {state && !state.ok ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending
          ? "Création…"
          : leadId
            ? "Créer le compte depuis le prospect"
            : "Créer un compte client"}
      </Button>
    </form>
  );
}
