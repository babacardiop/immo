"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { MediaAsset } from "@prisma/client";
import {
  deleteListingPhotoAction,
  reorderListingPhotoAction,
  uploadListingPhotosAction,
} from "@/app/actions/listings";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ListingPhotos({
  listingId,
  photos,
}: {
  listingId: string;
  photos: MediaAsset[];
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string[]>([]);

  function onSelect(files: FileList | null) {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreview(urls);
  }

  function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      try {
        const res = await action();
        if (!res.ok) setError(res.error ?? "Erreur");
        else router.refresh();
      } catch {
        setError("Action interrompue. Réessayez.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        ref={formRef}
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const form = formRef.current;
          if (!form) return;
          const fd = new FormData(form);
          run(async () => {
            const res = await uploadListingPhotosAction(listingId, fd);
            if (res.ok) {
              setPreview([]);
              formRef.current?.reset();
            }
            return res;
          });
        }}
      >
        <Label htmlFor="photos">Photos (JPG / PNG / WebP)</Label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => onSelect(e.target.files)}
          className="text-sm"
        />
        {preview.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {preview.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="h-20 w-20 rounded object-cover"
              />
            ))}
          </div>
        ) : null}
        <Button type="submit" disabled={pending} variant="secondary">
          {pending ? "Upload…" : "Uploader"}
        </Button>
      </form>

      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {photos.map((p, index) => (
          <li
            key={p.id}
            className="relative overflow-hidden rounded border border-[var(--color-steel)]/40"
          >
            {p.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.url}
                alt={p.alt ?? ""}
                className="h-28 w-full object-cover"
              />
            ) : (
              <div className="flex h-28 items-center justify-center text-xs text-[var(--color-muted)]">
                Pas d’URL
              </div>
            )}
            <div className="flex flex-col gap-1 p-1">
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1 text-xs"
                  disabled={pending || index === 0}
                  aria-label="Monter la photo"
                  onClick={() =>
                    run(() => reorderListingPhotoAction(p.id, "up"))
                  }
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1 text-xs"
                  disabled={pending || index === photos.length - 1}
                  aria-label="Descendre la photo"
                  onClick={() =>
                    run(() => reorderListingPhotoAction(p.id, "down"))
                  }
                >
                  ↓
                </Button>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-xs"
                disabled={pending}
                onClick={() => run(() => deleteListingPhotoAction(p.id))}
              >
                Supprimer
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs text-[var(--color-muted)]">
        {photos.length} photo(s) — 3 minimum pour publier. Utilisez ↑↓ pour
        l’ordre (1ʳᵉ = couverture).
      </p>
    </div>
  );
}
