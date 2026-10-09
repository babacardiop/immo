import { beforeEach, describe, expect, it, vi } from "vitest";

const findFirst = vi.hoisted(() => vi.fn());

vi.mock("@/lib/prisma", () => ({
  prisma: {
    listing: { findFirst },
  },
}));

import { getPublishedListingBySlug } from "@/lib/listings/public-query";

describe("getPublishedListingBySlug", () => {
  beforeEach(() => {
    findFirst.mockReset();
  });

  it("queries only PUBLISHED status", async () => {
    findFirst.mockResolvedValue(null);
    await getPublishedListingBySlug("terrain-draft");
    expect(findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { slug: "terrain-draft", status: "PUBLISHED" },
      }),
    );
  });

  it("returns null for missing / draft / archived", async () => {
    findFirst.mockResolvedValue(null);
    await expect(getPublishedListingBySlug("gone")).resolves.toBeNull();
  });
});
