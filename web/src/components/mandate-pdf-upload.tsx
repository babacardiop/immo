"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { MediaAsset } from "@prisma/client";
import {
  deleteMandatePdfAction,
  uploadMandatePdfAction,
} from "@/app/actions/listings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function formatSize(bytes: number | null | undefined) {
  if (bytes == null) return "";
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function MandatePdfUpload({
  listingId,
  docs,
}: {
  listingId: string;
  docs: MediaAsset[];
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    setOk(false);
    startTransition(async () => {
      try {
        const res = await action();
        if (!res.ok) setError(res.error ?? "Erreur");
        else {
          setOk(true);
          router.refresh();
        }
      } catch {
        setError("Action interrompue. Réessayez.");
      }
    });
  }

  return (
    <div className="flex max-w-lg flex-col gap-4">
      {docs.length > 0 ? (
        <ul className="space-y-2">
          {docs.map((doc) => (
            <li
              key={doc.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--color-steel)]/40 bg-[var(--color-surface)] px-3 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--color-ink)]">
                  {doc.alt || "mandat.pdf"}
                </p>
                <p className="text-xs text-[var(--color-muted)]">
                  PDF · {formatSize(doc.sizeBytes)} · vault
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <a
                  href={`/api/espace/mandate-docs/${doc.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-[var(--radius-pill)] border border-[var(--color-steel)]/50 bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] hover:border-[var(--color-olive)]"
                >
                  Voir
                </a>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={pending}
                  className="h-auto px-3 py-1.5 text-xs text-red-700"
                  onClick={() =>
                    run(async () => deleteMandatePdfAction(doc.id))
                  }
                >
                  Retirer
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[var(--color-muted)]">
          Aucun PDF mandat pour l’instant.
        </p>
      )}

      <form
        ref={formRef}
        className="flex flex-col gap-3 rounded-xl border border-dashed border-[var(--color-steel)]/50 bg-[var(--color-surface)] p-4"
        onSubmit={(e) => {
          e.preventDefault();
          const form = formRef.current;
          if (!form) return;
          const fd = new FormData(form);
          run(async () => {
            const res = await uploadMandatePdfAction(listingId, fd);
            if (res.ok) formRef.current?.reset();
            return res;
          });
        }}
      >
        <Label htmlFor="pdf">Ajouter un PDF mandat signé</Label>
        <input
          id="pdf"
          name="pdf"
          type="file"
          accept="application/pdf"
          required
          className="text-sm"
        />
        <Button type="submit" disabled={pending} variant="secondary">
          {pending ? "Upload…" : "Envoyer au vault"}
        </Button>
      </form>

      {ok ? (
        <p className="text-sm text-[var(--color-olive)]">Mandat mis à jour.</p>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
