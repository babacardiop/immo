import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("leaflet", () => {
  const map = {
    setView: vi.fn().mockReturnThis(),
    remove: vi.fn(),
    fitBounds: vi.fn(),
  };
  const marker = {
    addTo: vi.fn().mockReturnThis(),
    bindPopup: vi.fn().mockReturnThis(),
  };
  return {
    default: {
      map: vi.fn(() => map),
      tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
      marker: vi.fn(() => marker),
      Icon: {
        Default: {
          prototype: {},
          mergeOptions: vi.fn(),
        },
      },
    },
    map: vi.fn(() => map),
    tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
    marker: vi.fn(() => marker),
    Icon: {
      Default: {
        prototype: {},
        mergeOptions: vi.fn(),
      },
    },
  };
});

describe("MapView", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("mounts without crash", async () => {
    const { MapView } = await import("./map-view");
    render(
      <MapView
        channel="acheter"
        pins={[
          {
            id: "1",
            slug: "demo",
            title: "Demo",
            priceFcfa: 1,
            lat: 14.7,
            lng: -17.4,
            transaction: "SALE",
          },
        ]}
      />,
    );
    expect(screen.getByTestId("map-view")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /carte/i })).toBeInTheDocument();
  });
});
