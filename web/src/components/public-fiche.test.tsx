import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const getPublishedListingBySlug = vi.hoisted(() => vi.fn());

vi.mock("@/lib/listings/public-query", async () => {
  const actual = await vi.importActual<
    typeof import("@/lib/listings/public-query")
  >("@/lib/listings/public-query");
  return {
    ...actual,
    getPublishedListingBySlug,
  };
});

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

import { PublicFiche } from "@/components/public-fiche";

describe("PublicFiche", () => {
  beforeEach(() => {
    getPublishedListingBySlug.mockReset();
    process.env.NEXT_PUBLIC_WA_E164 = "221770000000";
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
  });

  it("renders title, price and paper badge", async () => {
    getPublishedListingBySlug.mockResolvedValue({
      id: "1",
      slug: "terrain-almadies",
      reference: "EG-T-1",
      status: "PUBLISHED",
      transaction: "SALE",
      propertyType: "LAND",
      title: "Terrain Almadies",
      description: "Vue mer",
      paperType: "TF",
      priceFcfa: 25_000_000,
      currency: "XOF",
      city: "Dakar",
      quartierLabel: "Almadies",
      addressPublic: null,
      areaM2: null,
      waPhone: null,
      media: [],
    });

    const ui = await PublicFiche({ channel: "acheter", slug: "terrain-almadies" });
    render(ui);

    expect(
      screen.getByRole("heading", { name: /terrain almadies/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/25[\s\u00a0]?000[\s\u00a0]?000/)).toBeInTheDocument();
    expect(screen.getByText(/titre foncier/i)).toBeInTheDocument();
  });
});
