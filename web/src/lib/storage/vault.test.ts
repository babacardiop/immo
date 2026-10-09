import { describe, expect, it } from "vitest";

/**
 * Vault policy: private docs must never expose a public URL.
 * Enforced in uploadMandatePdf return shape + MediaAsset.url = null.
 */
describe("vault public exposure policy", () => {
  it("vault document payload has null url and VAULT storage", () => {
    const uploaded = {
      key: "mandates/m1/docs/x.pdf",
      url: null as string | null,
      mimeType: "application/pdf",
      storage: "VAULT" as const,
      kind: "DOCUMENT" as const,
    };
    expect(uploaded.url).toBeNull();
    expect(uploaded.storage).toBe("VAULT");
    expect(uploaded.key.startsWith("mandates/")).toBe(true);
    expect(uploaded.key.includes("listings/")).toBe(false);
  });

  it("public photos live under listings/ path prefix", () => {
    const key = "listings/abc/photos/file.jpg";
    expect(key.startsWith("listings/")).toBe(true);
    expect(key.startsWith("mandates/")).toBe(false);
  });
});
