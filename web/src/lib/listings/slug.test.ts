import { describe, expect, it } from "vitest";
import { buildListingSlug } from "@/lib/listings/slug";

describe("buildListingSlug", () => {
  it("builds expat-style descriptive slug", () => {
    const slug = buildListingSlug({
      title: "3 terrains à Niague",
      reference: "EG-T-042",
      city: "Dakar",
      transaction: "SALE",
      propertyType: "LAND",
    });
    expect(slug).toContain("terrain");
    expect(slug).toContain("niague");
    expect(slug).toContain("a-vendre");
    expect(slug).toContain("a-dakar");
    expect(slug).toContain("eg-t-042");
  });
});
