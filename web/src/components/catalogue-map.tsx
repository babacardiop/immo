"use client";

import dynamic from "next/dynamic";
import type { MapPin } from "@/lib/listings/map-pins";
import type { CatalogueChannel } from "@/lib/listings/public-query";

const MapView = dynamic(
  () => import("@/components/map-view").then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-72 items-center justify-center rounded-md border border-[var(--color-steel)]/40 text-sm text-[var(--color-muted)]">
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
      <p className="mt-8 text-sm text-[var(--color-muted)]">
        Aucun bien géolocalisé pour ces critères — la liste reste disponible
        ci-dessous.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="mb-3 text-sm font-medium text-[var(--color-muted)]">
        Carte ({pins.length} bien{pins.length > 1 ? "s" : ""})
      </h2>
      <MapView pins={pins} channel={channel} />
    </div>
  );
}
