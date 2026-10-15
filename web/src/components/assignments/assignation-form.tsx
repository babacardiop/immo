"use client";

import { useActionState } from "react";
import {
  assignPropertyRoleAction,
  type AssignmentActionResult,
} from "@/app/actions/assignments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial: AssignmentActionResult | undefined = undefined;

export function AssignationForm({
  listingId,
  defaultUserId,
  defaultRole = "CANDIDATE",
}: {
  listingId: string;
  defaultUserId?: string;
  defaultRole?: "CANDIDATE" | "LANDLORD" | "BUYER" | "TENANT";
}) {
  const [state, formAction, pending] = useActionState(
    assignPropertyRoleAction,
    initial,
  );

  if (state?.ok) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-[var(--color-sage)]/40 bg-[var(--color-sage)]/10 px-4 py-3 text-sm"
      >
        Assignation enregistrée.{" "}
        {defaultRole === "CANDIDATE"
          ? "Le candidat peut déposer ses pièces sur ce bien uniquement."
          : null}
      </div>
    );
  }

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-3">
      <input type="hidden" name="listingId" value={listingId} />
      <div>
        <Label htmlFor="assign-user">ID utilisateur (client)</Label>
        <Input
          id="assign-user"
          name="userId"
          required
          defaultValue={defaultUserId ?? ""}
          placeholder="cuid…"
        />
        {defaultRole === "CANDIDATE" ? (
          <p className="mt-1 text-xs text-[var(--color-muted)]">
            Rôle <strong>candidat</strong> : ouvre le dépôt de dossier pour ce
            bien seulement. Les documents restent visibles au personnel
            EverGreen uniquement.
          </p>
        ) : null}
      </div>
      <div>
        <Label htmlFor="assign-role">Rôle</Label>
        <select
          id="assign-role"
          name="role"
          defaultValue={defaultRole}
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
        >
          <option value="CANDIDATE">Candidat</option>
          <option value="LANDLORD">Propriétaire</option>
          <option value="BUYER">Acquéreur</option>
          <option value="TENANT">Locataire</option>
        </select>
      </div>
      <div>
        <Label htmlFor="assign-note">Note (optionnel)</Label>
        <Input id="assign-note" name="note" />
      </div>
      {state && !state.ok ? (
        <p className="text-sm text-red-700" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "…" : "Assigner"}
      </Button>
    </form>
  );
}
