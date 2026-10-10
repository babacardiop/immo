import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CatalogueGeoNav } from "@/components/catalogue-geo-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/acheter",
  useSearchParams: () => new URLSearchParams(""),
}));

vi.mock("@/hooks/use-locations", () => ({
  useLocations: () => ({
    cities: [
      { name: "Dakar", region: "Dakar" },
      { name: "Mbour", region: "Thiès" },
    ],
    quartiers: [],
  }),
}));

describe("CatalogueGeoNav", () => {
  it("shows region chips with optional counts", () => {
    render(
      <CatalogueGeoNav
        regionCounts={[
          { key: "Dakar", count: 3 },
          { key: "Thiès", count: 1 },
        ]}
      />,
    );
    expect(screen.getByRole("link", { name: /dakar/i })).toHaveAttribute(
      "href",
      expect.stringContaining("region=Dakar"),
    );
    expect(screen.getByText(/\(3\)/)).toBeInTheDocument();
  });
});
