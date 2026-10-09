import { describe, expect, it } from "vitest";
import { isAllowedDocMime, isAllowedImageMime } from "@/lib/storage/r2";

describe("media MIME whitelist", () => {
  it("allows jpg/png/webp", () => {
    expect(isAllowedImageMime("image/jpeg")).toBe(true);
    expect(isAllowedImageMime("image/png")).toBe(true);
    expect(isAllowedImageMime("image/webp")).toBe(true);
  });

  it("rejects other image types", () => {
    expect(isAllowedImageMime("image/gif")).toBe(false);
    expect(isAllowedImageMime("application/pdf")).toBe(false);
  });

  it("allows pdf for vault only", () => {
    expect(isAllowedDocMime("application/pdf")).toBe(true);
    expect(isAllowedDocMime("image/jpeg")).toBe(false);
  });
});
