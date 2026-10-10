"use client";

import dynamic from "next/dynamic";
import type { MapPin } from "@/lib/listings/map-pins";
import type { CatalogueChannel } from "@/lib/listings/public-query";

const MapView = dynamic(
  () => import("@/components/map-view").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(70vh,560px)] items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] text-sm text-[var(--color-muted)]">
        Chargement de la carte…
      </div>
    ),
  },
);

export function CatalogueMap({
  pins,
  channel,
}: {
  pins: MapPin[];
  channel: CatalogueChannel;
}) {
  if (pins.length === 0) {
    return (
      <div className="flex h-[min(70vh,560px)] items-center justify-center rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] px-6 text-center text-sm text-[var(--color-muted)]">
        Aucun bien géolocalisé pour ces critères.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 text-sm font-medium text-[var(--color-muted)]">
        Carte ({pins.length} bien{pins.length > 1 ? "s" : ""})
      </h2>
      <MapView
        pins={pins}
        channel={channel}
        className="h-[min(70vh,560px)]"
      />
    </div>
  );
}
