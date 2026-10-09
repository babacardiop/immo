import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ListingCard } from "@/components/listing-card";
import type { PublicListItem } from "@/lib/listings/public-query";

function item(over: Partial<PublicListItem> = {}): PublicListItem {
  return {
    id: "1",
    slug: "terrain-almadies-eg-t-1",
    reference: "EG-T-1",
    status: "PUBLISHED",
    transaction: "SALE",
    propertyType: "LAND",
    title: "Terrain Almadies",
    description: null,
    paperType: "TF",
    paperVerifiedLevel: "DECLARED",
    nicad: null,
    edrDate: null,
    dossierNumber: null,
    titleNotes: null,
    deliberationDisclaimerAck: false,
    priceFcfa: 25_000_000,
    pricePeriod: "MONTH",
    currency: "XOF",
    areaM2: null,
    areaHa: null,
    chargesFcfa: null,
    depositMonths: null,
    installmentMonths: null,
    installmentDownFcfa: null,
    negotiable: false,
    city: "Dakar",
    quartierLabel: "Almadies",
    addressPublic: null,
    geoLat: null,
    geoLng: null,
    geoPrecision: "APPROX",
    bedrooms: null,
    bathrooms: null,
    rooms: null,
    amenities: [],
    videoUrl: null,
    waPhone: null,
    showPhone: false,
    agentId: "a1",
    publishedAt: new Date(),
    archivedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    media: [
      {
        id: "m1",
        listingId: "1",
        mandateId: null,
        kind: "PHOTO",
        storage: "PUBLIC",
        key: "k",
        url: "https://cdn.example.com/cover.jpg",
        mimeType: "image/jpeg",
        sizeBytes: 100,
        sortOrder: 0,
        alt: null,
        createdAt: new Date(),
      },
    ],
    ...over,
  } as PublicListItem;
}

describe("ListingCard", () => {
  it("renders title, price and link", () => {
    render(<ListingCard listing={item()} />);
    expect(screen.getByText(/terrain almadies/i)).toBeInTheDocument();
    expect(screen.getByText(/25[\s\u00a0]?000[\s\u00a0]?000/)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/acheter/terrain-almadies-eg-t-1",
    );
  });

  it("shows PaperBadge on sale cards", () => {
    render(<ListingCard listing={item({ paperType: "TF" })} />);
    expect(screen.getByText(/titre foncier/i)).toBeInTheDocument();
  });

  it("hides paper badge on rent", () => {
    render(
      <ListingCard
        listing={item({
          transaction: "RENT",
          paperType: null,
          slug: "appart-plateau",
        })}
      />,
    );
    expect(screen.queryByText(/titre foncier/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/louer/appart-plateau",
    );
  });
});
