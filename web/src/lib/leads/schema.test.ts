import { describe, expect, it } from "vitest";
import { publicLeadFormSchema } from "@/lib/leads/schema";

describe("publicLeadFormSchema", () => {
  const base = {
    name: "Fatou Diop",
    phone: "+221 77 000 00 00",
    email: "fatou@example.com",
    intent: "buy" as const,
    message: "Je cherche à Almadies",
    consentContact: true,
    website: "",
  };

  it("accepts a valid form", () => {
    const parsed = publicLeadFormSchema.safeParse(base);
    expect(parsed.success).toBe(true);
  });

  it("requires consent", () => {
    const parsed = publicLeadFormSchema.safeParse({
      ...base,
      consentContact: false,
    });
    expect(parsed.success).toBe(false);
  });

  it("rejects invalid phone", () => {
    const parsed = publicLeadFormSchema.safeParse({
      ...base,
      phone: "abc",
    });
    expect(parsed.success).toBe(false);
  });
});
