"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { LeadStage } from "@prisma/client";
import {
  addLeadNoteAction,
  updateLeadStageAction,
} from "@/app/actions/leads";
import { LEAD_STAGE_LABELS, LEAD_STAGES } from "@/lib/leads/labels";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function LeadDetailControls({
  leadId,
  stage,
}: {
  leadId: string;
  stage: LeadStage;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <form
        className="flex flex-wrap items-end gap-3"
        action={(fd) => {
          start(async () => {
            const res = await updateLeadStageAction(leadId, fd);
            if (!res.ok) setError(res.error);
            else {
              setError(null);
              router.refresh();
            }
          });
        }}
      >
        <div>
          <Label htmlFor="stage">Stage</Label>
          <select
            id="stage"
            name="stage"
            defaultValue={stage}
            className="mt-1 block rounded-md border border-[var(--color-steel)]/50 bg-white px-3 py-2 text-sm"
          >
            {LEAD_STAGES.map((s) => (
              <option key={s} value={s}>
                {LEAD_STAGE_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" disabled={pending}>
          Mettre à jour
        </Button>
      </form>

      <form
        className="flex flex-col gap-2"
        action={(fd) => {
          start(async () => {
            const res = await addLeadNoteAction(leadId, fd);
            if (!res.ok) setError(res.error);
            else {
              setError(null);
              router.refresh();
            }
          });
        }}
      >
        <Label htmlFor="body">Note</Label>
        <textarea
          id="body"
          name="body"
          rows={3}
          required
          className="rounded-md border border-[var(--color-steel)]/50 bg-white px-3 py-2 text-sm"
          placeholder="Compte-rendu d’appel, prochain créneau…"
        />
        <Button type="submit" disabled={pending} variant="secondary">
          Ajouter la note
        </Button>
      </form>

      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
