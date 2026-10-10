"use client";

import { useState } from "react";

export function ListingGallery({
  images,
  title,
}: {
  images: { url: string; alt?: string | null }[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-[var(--radius-card)] bg-[var(--color-steel)]/20 text-[var(--color-muted)]">
        Aucune photo
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)]!;

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-steel)]/15">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.url}
          alt={current.alt || title}
          className="h-full w-full object-cover"
        />
      </div>
      {images.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={`${img.url}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                i === active
                  ? "border-[var(--color-leaf)]"
                  : "border-transparent"
              }`}
              aria-label={`Photo ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
