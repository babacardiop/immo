import { describe, expect, it } from "vitest";
import { buildListingJsonLd } from "@/lib/seo/jsonld-listing";
import type { Listing, MediaAsset } from "@prisma/client";

function listing(
  over: Partial<Listing> & { media?: MediaAsset[] } = {},
): Listing & { media: MediaAsset[] } {
  return {
    id: "1",
    slug: "terrain-almadies",
    reference: "EG-T-1",
    status: "PUBLISHED",
    transaction: "SALE",
    propertyType: "LAND",
    title: "Terrain Almadies",
    description: "Belle parcelle",
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
    geoLat: 14.7,
    geoLng: -17.4,
    geoPrecision: "APPROX",
    bedrooms: null,
    bathrooms: null,
    rooms: null,
    amenities: [],
    videoUrl: null,
    waPhone: null,
    showPhone: false,
    agentId: "a1",
    publishedAt: new Date("2026-01-01"),
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
        url: "https://cdn.example.com/1.jpg",
        mimeType: "image/jpeg",
        sizeBytes: 100,
        sortOrder: 0,
        alt: null,
        createdAt: new Date(),
      },
    ],
    ...over,
  } as Listing & { media: MediaAsset[] };
}

describe("buildListingJsonLd", () => {
  it("includes price, image and geo", () => {
    const json = buildListingJsonLd(listing(), "/acheter/terrain-almadies");
    expect(json["@type"]).toBe("RealEstateListing");
    expect(json.offers).toMatchObject({
      "@type": "Offer",
      price: 25_000_000,
      priceCurrency: "XOF",
    });
    const main = json.mainEntity as Record<string, unknown>;
    expect(main.image).toEqual(["https://cdn.example.com/1.jpg"]);
    expect(main.geo).toMatchObject({
      latitude: 14.7,
      longitude: -17.4,
    });
  });
});
