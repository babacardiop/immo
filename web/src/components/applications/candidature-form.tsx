"use client";

import { useState, useTransition } from "react";
import {
  submitApplicationAction,
  uploadApplicationDocAction,
} from "@/app/actions/applications";
import {
  APPLICATION_PRIVACY_NOTICE_FR,
} from "@/lib/applications/privacy";
import type { RequirementItem } from "@/lib/applications/requirements";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function CandidatureForm({
  applicationId,
  listingTitle,
  requirements,
  uploadedCodes,
  completenessPct,
}: {
  applicationId: string;
  listingTitle: string;
  requirements: RequirementItem[];
  uploadedCodes: string[];
  completenessPct: number;
}) {
  const [privacy, setPrivacy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const have = new Set(uploadedCodes);
  const fileReqs = requirements.filter((r) => r.kind === "file");

  function onUpload(code: string, file: File | null) {
    if (!file) return;
    setError(null);
    const fd = new FormData();
    fd.set("applicationId", applicationId);
    fd.set("requirementCode", code);
    fd.set("file", file);
    start(async () => {
      const res = await uploadApplicationDocAction(fd);
      if (!res.ok) setError(res.error);
      else window.location.reload();
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const fd = new FormData();
    fd.set("applicationId", applicationId);
    if (privacy) fd.set("privacyAccepted", "true");
    start(async () => {
      const res = await submitApplicationAction(fd);
      if (!res.ok) setError(res.error);
      else window.location.reload();
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-lg flex-col gap-5">
      <div>
        <h2 className="text-lg font-semibold">Dossier — {listingTitle}</h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Complétude : <strong>{completenessPct}%</strong>
        </p>
      </div>

      <div
        role="note"
        className="rounded-[var(--radius-card)] border border-[var(--color-leaf)]/30 bg-[var(--color-sage)]/15 px-4 py-3 text-sm"
      >
        {APPLICATION_PRIVACY_NOTICE_FR}
      </div>

      <ul className="flex flex-col gap-4">
        {fileReqs.map((r) => (
          <li key={r.code} className="border-b border-[var(--color-steel)]/20 pb-3">
            <Label>
              {r.label}
              {r.required ? " *" : ""}
              {have.has(r.code) ? (
                <span className="ml-2 text-xs text-[var(--color-leaf)]">
                  Déposé
                </span>
              ) : null}
            </Label>
            <input
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              className="mt-2 block w-full text-sm"
              disabled={pending}
              onChange={(e) => onUpload(r.code, e.target.files?.[0] ?? null)}
            />
          </li>
        ))}
      </ul>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
          className="mt-1"
          required
        />
        <span>
          J’ai lu et j’accepte que mes documents soient visibles uniquement par
          le personnel EverGreen (pas le propriétaire).
        </span>
      </label>

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={pending || !privacy}>
        {pending ? "Envoi…" : "Envoyer mon dossier"}
      </Button>
    </form>
  );
}
