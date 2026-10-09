import { describe, expect, it } from "vitest";
import { listingFormSchema } from "@/lib/listings/schema";

describe("listingFormSchema", () => {
  const valid = {
    title: "Terrain Almadies",
    description: "Belle parcelle proche mer avec accès bitume.",
    transaction: "SALE",
    propertyType: "LAND",
    paperType: "TF",
    paperVerifiedLevel: "DECLARED",
    deliberationDisclaimerAck: false,
    priceFcfa: 10_000_000,
    city: "Dakar",
    quartierLabel: "Almadies",
    reference: "EG-T-099",
    mandateType: "SIMPLE",
    mandateStatus: "DRAFT",
    negotiable: false,
  };

  it("accepts a valid draft payload", () => {
    expect(listingFormSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects short title", () => {
    expect(
      listingFormSchema.safeParse({ ...valid, title: "ab" }).success,
    ).toBe(false);
  });

  it("rejects missing/invalid price", () => {
    expect(
      listingFormSchema.safeParse({ ...valid, priceFcfa: 0 }).success,
    ).toBe(false);
  });
});
