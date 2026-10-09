import { describe, expect, it } from "vitest";
import { evaluatePublishGate } from "@/lib/listings/publish-gate";
import type { PublishGateInput } from "@/lib/listings/publish-gate";

function base(over: Partial<PublishGateInput> = {}): PublishGateInput {
  return {
    id: "1",
    slug: "terrain-almadies-eg-t-1",
    reference: "EG-T-1",
    status: "DRAFT",
    transaction: "SALE",
    propertyType: "LAND",
    title: "Terrain Almadies",
    description: "Belle parcelle viabilisée près de la corniche.",
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
    agentId: "agent1",
    publishedAt: null,
    archivedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    mandate: {
      id: "m1",
      listingId: "1",
      type: "SIMPLE",
      reference: "M-1",
      status: "ACTIVE",
      agentId: "agent1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    media: [
      photo("a"),
      photo("b"),
      photo("c"),
    ],
    ...over,
  } as PublishGateInput;
}

function photo(id: string) {
  return {
    id,
    listingId: "1",
    mandateId: null,
    kind: "PHOTO" as const,
    storage: "PUBLIC" as const,
    key: `k-${id}`,
    url: `https://example.com/${id}.jpg`,
    mimeType: "image/jpeg",
    sizeBytes: 1000,
    sortOrder: 0,
    alt: null,
    createdAt: new Date(),
  };
}

describe("evaluatePublishGate", () => {
  it("allows publish with TF + active mandate + 3 photos", () => {
    expect(evaluatePublishGate(base()).ok).toBe(true);
  });

  it("rejects OTHER paper on sale", () => {
    const res = evaluatePublishGate(base({ paperType: "OTHER" }));
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.code).toBe("PAPER");
  });

  it("rejects missing paper on sale", () => {
    const res = evaluatePublishGate(base({ paperType: null }));
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.code).toBe("PAPER");
  });

  it("rejects without active mandate", () => {
    const res = evaluatePublishGate(
      base({
        mandate: {
          id: "m1",
          listingId: "1",
          type: "SIMPLE",
          reference: null,
          status: "DRAFT",
          agentId: "agent1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }),
    );
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.code).toBe("MANDATE");
  });

  it("rejects fewer than 3 photos", () => {
    const res = evaluatePublishGate(base({ media: [photo("a")] }));
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.code).toBe("PHOTOS");
  });

  it("requires deliberation disclaimer ack", () => {
    const res = evaluatePublishGate(
      base({ paperType: "DELIBERATION", deliberationDisclaimerAck: false }),
    );
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.code).toBe("DELIB_ACK");
  });
});
