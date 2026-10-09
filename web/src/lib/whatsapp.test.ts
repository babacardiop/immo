import { afterEach, describe, expect, it } from "vitest";
import { buildWhatsAppLink, listingInquiryText } from "@/lib/whatsapp";

describe("whatsapp", () => {
  const prev = process.env.NEXT_PUBLIC_WA_E164;

  afterEach(() => {
    process.env.NEXT_PUBLIC_WA_E164 = prev;
  });

  it("builds wa.me link with digits and encoded text", () => {
    const href = buildWhatsAppLink({
      phoneE164: "+221 77 000 00 00",
      text: "Bonjour EverGreen",
    });
    expect(href).toMatch(/^https:\/\/wa\.me\/221770000000\?/);
    const text = new URL(href!).searchParams.get("text");
    expect(text).toBe("Bonjour EverGreen");
  });

  it("falls back to NEXT_PUBLIC_WA_E164", () => {
    process.env.NEXT_PUBLIC_WA_E164 = "221771112233";
    const href = buildWhatsAppLink({ text: "Hi" });
    expect(href).toContain("wa.me/221771112233");
  });

  it("returns null without phone", () => {
    delete process.env.NEXT_PUBLIC_WA_E164;
    expect(buildWhatsAppLink({ text: "x", phoneE164: null })).toBeNull();
  });

  it("builds inquiry text with title, ref and url", () => {
    const text = listingInquiryText({
      title: "Terrain Almadies",
      reference: "EG-T-1",
      url: "https://example.com/acheter/x",
    });
    expect(text).toContain("Terrain Almadies");
    expect(text).toContain("EG-T-1");
    expect(text).toContain("https://example.com/acheter/x");
  });
});
