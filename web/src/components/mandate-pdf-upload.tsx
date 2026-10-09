"use client";

import { useState, useTransition } from "react";
import { uploadMandatePdfAction } from "@/app/actions/listings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function MandatePdfUpload({
  listingId,
  docsCount,
}: {
  listingId: string;
  docsCount: number;
}) {
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="flex max-w-md flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setError(null);
        setOk(false);
        startTransition(async () => {
          const res = await uploadMandatePdfAction(listingId, fd);
          if (!res.ok) setError(res.error);
          else {
            setOk(true);
            e.currentTarget.reset();
          }
        });
      }}
    >
      <Label htmlFor="pdf">PDF mandat signé</Label>
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
      {ok ? (
        <p className="text-sm text-[var(--color-olive)]">
          PDF enregistré (vault). Total : {docsCount + 1}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </form>
  );
}
