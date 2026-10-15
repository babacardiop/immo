"use client";

import { useTransition, useState } from "react";
import { reviewApplicationAction } from "@/app/actions/applications";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ReviewActions({
  applicationId,
  showDocLinks,
}: {
  applicationId: string;
  /** Landlord view: never true */
  showDocLinks: boolean;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState("");

  function run(action: string) {
    setError(null);
    const fd = new FormData();
    fd.set("applicationId", applicationId);
    fd.set("action", action);
    fd.set("agentSummary", summary);
    start(async () => {
      const res = await reviewApplicationAction(fd);
      if (!res.ok) setError(res.error);
      else window.location.reload();
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {showDocLinks ? (
        <p className="text-xs text-[var(--color-muted)]">
          Documents visibles (personnel EverGreen uniquement).
        </p>
      ) : (
        <p className="text-sm text-amber-800">
          Vue propriétaire : métadonnées seulement — aucun fichier.
        </p>
      )}
      <div>
        <Label htmlFor="summary">Synthèse agent (visible proprio)</Label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-2xl border-0 bg-[var(--color-bg)] px-3 py-3 text-sm"
          placeholder="Profil stable, revenus OK…"
        />
      </div>
      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      {showDocLinks ? (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={pending}
            onClick={() => run("under_review")}
            variant="secondary"
          >
            En revue
          </Button>
          <Button
            type="button"
            disabled={pending}
            onClick={() => run("shortlist")}
            variant="secondary"
          >
            Shortlist
          </Button>
          <Button
            type="button"
            disabled={pending}
            onClick={() => run("reject")}
            variant="secondary"
          >
            Refuser
          </Button>
          <Button
            type="button"
            disabled={pending}
            onClick={() => {
              if (
                confirm(
                  "Accepter ce candidat ? Le portail locataire sera débloqué pour ce bien.",
                )
              ) {
                run("accept");
              }
            }}
          >
            Accepter → locataire
          </Button>
        </div>
      ) : null}
    </div>
  );
}
