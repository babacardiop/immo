"use client";

import { useEffect, useRef } from "react";
import type { MapPin } from "@/lib/listings/map-pins";
import { formatFcfa, formatFcfaCompact } from "@/lib/format";
import { publicListingPath } from "@/lib/listings/public-query";
import type { CatalogueChannel } from "@/lib/listings/public-query";

const DAKAR_CENTER: [number, number] = [14.7167, -17.4677];

const PIN_STYLES = `
.eg-price-pin { background: transparent !important; border: none !important; }
.eg-price-pin__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background: #fff;
  color: #0f0f09;
  border-radius: 9999px;
  padding: 6px 10px;
  font: 700 13px/1.1 system-ui, sans-serif;
  box-shadow: 0 2px 10px rgba(15, 15, 9, 0.18);
  border: 1px solid rgba(15, 15, 9, 0.08);
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: transform 0.12s ease, background 0.12s ease, color 0.12s ease;
}
.eg-price-pin__label:hover,
.eg-price-pin.is-active .eg-price-pin__label {
  background: #0f0f09;
  color: #fff;
  transform: translate(-50%, -50%) scale(1.06);
  z-index: 2;
}
.eg-map-popup .leaflet-popup-content-wrapper {
  border-radius: 16px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 8px 28px rgba(15, 15, 9, 0.18);
}
.eg-map-popup .leaflet-popup-content { margin: 0; min-width: 200px; }
.eg-map-popup .leaflet-popup-tip { box-shadow: none; }
.eg-map-popup__body { padding: 12px 14px 14px; }
.eg-map-popup__price {
  font: 700 15px/1.2 system-ui, sans-serif;
  color: #0f0f09;
}
.eg-map-popup__title {
  margin-top: 4px;
  font: 500 13px/1.35 system-ui, sans-serif;
  color: #585e5f;
}
.eg-map-popup__link {
  display: inline-block;
  margin-top: 10px;
  font: 600 12px/1 system-ui, sans-serif;
  color: #2f7a3e;
  text-decoration: none;
}
`;

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
      if (!document.querySelector("style[data-eg-price-pin]")) {
        const style = document.createElement("style");
        style.dataset.egPricePin = "1";
        style.textContent = PIN_STYLES;
        document.head.appendChild(style);
      }

      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
      }).setView(DAKAR_CENTER, 12);

      L.control.zoom({ position: "topright" }).addTo(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        maxZoom: 19,
      }).addTo(map);

      const bounds: import("leaflet").LatLngExpression[] = [];
      let activeMarker: import("leaflet").Marker | null = null;

      for (const pin of pins) {
        const priceLabel = formatFcfaCompact(pin.priceFcfa);
        const icon = L.divIcon({
          className: "eg-price-pin",
          html: `<span class="eg-price-pin__label">${escapeHtml(priceLabel)}</span>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });

        const marker = L.marker([pin.lat, pin.lng], { icon }).addTo(map);
        const href = publicListingPath(channel, pin.slug);
        const fullPrice =
          pin.priceFcfa != null ? formatFcfa(pin.priceFcfa) : "Prix sur demande";

        marker.bindPopup(
          `<div class="eg-map-popup__body">
            <div class="eg-map-popup__price">${escapeHtml(fullPrice)}</div>
            <div class="eg-map-popup__title">${escapeHtml(pin.title)}</div>
            <a class="eg-map-popup__link" href="${href}">Voir le bien →</a>
          </div>`,
          { className: "eg-map-popup", maxWidth: 260, closeButton: false },
        );

        marker.on("popupopen", () => {
          const node = marker.getElement();
          node?.classList.add("is-active");
          if (activeMarker && activeMarker !== marker) {
            activeMarker.getElement()?.classList.remove("is-active");
          }
          activeMarker = marker;
        });
        marker.on("popupclose", () => {
          marker.getElement()?.classList.remove("is-active");
          if (activeMarker === marker) activeMarker = null;
        });

        bounds.push([pin.lat, pin.lng]);
      }

      if (bounds.length > 1) {
        map.fitBounds(bounds as import("leaflet").LatLngBoundsExpression, {
          padding: [40, 40],
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
      className={`${className || "h-72"} w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-steel)]/10`}
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
