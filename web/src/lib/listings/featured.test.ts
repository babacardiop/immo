import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    listing: {
      findMany: vi.fn(),
    },
  },
}));

describe("listFeaturedPublic", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns published listings with card fields", async () => {
    const { prisma } = await import("@/lib/prisma");
    vi.mocked(prisma.listing.findMany).mockResolvedValue([
      {
        id: "1",
        slug: "villa",
        title: "Villa",
        priceFcfa: 100,
        bedrooms: 3,
        bathrooms: 2,
        city: "Dakar",
        quartierLabel: "Almadies",
        status: "PUBLISHED",
        transaction: "SALE",
        media: [],
      },
    ] as never);

    const { listFeaturedPublic } = await import("./public-query");
    const rows = await listFeaturedPublic(6);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      slug: "villa",
      bedrooms: 3,
      bathrooms: 2,
    });
    expect(prisma.listing.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { status: "PUBLISHED" },
        take: 6,
      }),
    );
  });
});
