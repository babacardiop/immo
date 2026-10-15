import { describe, expect, it } from "vitest";
import { visitRequestSchema } from "./visit-schema";

describe("visitRequestSchema", () => {
  it("requires consent and listing", () => {
    const bad = visitRequestSchema.safeParse({
      name: "Awa",
      phone: "+221770000000",
      consentContact: false,
      listingId: "abc",
    });
    expect(bad.success).toBe(false);

    const ok = visitRequestSchema.safeParse({
      name: "Awa Diop",
      phone: "+221770000000",
      consentContact: true,
      listingId: "abc",
      preferredSlot: "samedi matin",
    });
    expect(ok.success).toBe(true);
  });
});
