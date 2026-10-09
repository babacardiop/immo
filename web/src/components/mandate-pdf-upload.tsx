"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      className="flex max-w-md flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const form = formRef.current;
        if (!form) return;
        const fd = new FormData(form);
        setError(null);
        setOk(false);
        startTransition(async () => {
          try {
            const res = await uploadMandatePdfAction(listingId, fd);
            if (!res.ok) {
              setError(res.error);
              return;
            }
            setOk(true);
            formRef.current?.reset();
            router.refresh();
          } catch {
            setError("Upload interrompu. Réessayez.");
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
