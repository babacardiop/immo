import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    listing: {
      findMany: vi.fn(),
    },
  },
}));

describe("map pins", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("requests only published listings with geo + slug", async () => {
    const { prisma } = await import("@/lib/prisma");
    vi.mocked(prisma.listing.findMany).mockResolvedValue([
      {
        id: "1",
        slug: "villa-almadies",
        title: "Villa",
        priceFcfa: 100_000_000,
        geoLat: 14.74,
        geoLng: -17.52,
        transaction: "SALE",
      },
    ] as never);

    const { listMapPins, mapPinsWhere } = await import("./map-pins");
    const where = mapPinsWhere("acheter");
    expect(where.status).toBe("PUBLISHED");
    expect(where.geoLat).toEqual({ not: null });
    expect(where.geoLng).toEqual({ not: null });
    expect(where.slug).toEqual({ not: null });

    const pins = await listMapPins("acheter");
    expect(pins).toHaveLength(1);
    expect(pins[0]).toMatchObject({
      slug: "villa-almadies",
      lat: 14.74,
      lng: -17.52,
    });
    expect(prisma.listing.findMany).toHaveBeenCalled();
  });

  it("drops rows missing coordinates", async () => {
    const { prisma } = await import("@/lib/prisma");
    vi.mocked(prisma.listing.findMany).mockResolvedValue([
      {
        id: "1",
        slug: "ok",
        title: "Ok",
        priceFcfa: 1,
        geoLat: 14.7,
        geoLng: -17.4,
        transaction: "RENT",
      },
      {
        id: "2",
        slug: "bad",
        title: "Bad",
        priceFcfa: 1,
        geoLat: null,
        geoLng: -17.4,
        transaction: "RENT",
      },
    ] as never);

    const { listMapPins } = await import("./map-pins");
    const pins = await listMapPins("louer");
    expect(pins).toHaveLength(1);
    expect(pins[0]!.slug).toBe("ok");
  });
});
