"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import type { MediaAsset } from "@prisma/client";
import {
  deleteListingPhotoAction,
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
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string[]>([]);

  function onSelect(files: FileList | null) {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreview(urls);
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          setError(null);
          startTransition(async () => {
            const res = await uploadListingPhotosAction(listingId, fd);
            if (!res.ok) setError(res.error);
            else {
              setPreview([]);
              e.currentTarget.reset();
            }
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
        {photos.map((p) => (
          <li key={p.id} className="relative overflow-hidden rounded border border-[var(--color-steel)]/40">
            {p.url ? (
              <Image
                src={p.url}
                alt={p.alt ?? ""}
                width={200}
                height={150}
                className="h-28 w-full object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-28 items-center justify-center text-xs text-[var(--color-muted)]">
                Pas d’URL
              </div>
            )}
            <form
              className="p-1"
              action={() => {
                startTransition(async () => {
                  await deleteListingPhotoAction(p.id);
                });
              }}
            >
              <Button type="submit" variant="ghost" className="w-full text-xs">
                Supprimer
              </Button>
            </form>
          </li>
        ))}
      </ul>
      <p className="text-xs text-[var(--color-muted)]">
        {photos.length} photo(s) — 3 minimum pour publier.
      </p>
    </div>
  );
}
