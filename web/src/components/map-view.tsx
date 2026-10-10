"use client";

import { useEffect, useRef } from "react";
import type { MapPin } from "@/lib/listings/map-pins";
import { publicListingPath } from "@/lib/listings/public-query";
import type { CatalogueChannel } from "@/lib/listings/public-query";

const DAKAR_CENTER: [number, number] = [14.7167, -17.4677];

export function MapView({
  pins,
  channel,
  className = "",
}: {
  pins: MapPin[];
  channel: CatalogueChannel;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let map: import("leaflet").Map | null = null;

    void (async () => {
      if (!document.querySelector("link[data-leaflet]")) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.dataset.leaflet = "1";
        document.head.appendChild(link);
      }

      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      // Fix default marker icons under bundlers.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      map = L.map(containerRef.current).setView(DAKAR_CENTER, 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        maxZoom: 19,
      }).addTo(map);

      const bounds: import("leaflet").LatLngExpression[] = [];
      for (const pin of pins) {
        const marker = L.marker([pin.lat, pin.lng]).addTo(map);
        const href = publicListingPath(channel, pin.slug);
        marker.bindPopup(
          `<a href="${href}"><strong>${escapeHtml(pin.title)}</strong></a>`,
        );
        bounds.push([pin.lat, pin.lng]);
      }
      if (bounds.length > 1) {
        map.fitBounds(bounds as import("leaflet").LatLngBoundsExpression, {
          padding: [24, 24],
          maxZoom: 14,
        });
      } else if (bounds.length === 1) {
        map.setView(bounds[0]!, 14);
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [pins, channel]);

  return (
    <div
      ref={containerRef}
      data-testid="map-view"
      className={`h-72 w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-steel)]/10 ${className}`}
      role="region"
      aria-label="Carte des biens"
    />
  );
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
