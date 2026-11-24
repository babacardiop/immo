import { describe, expect, it } from "vitest";
import { formatPhone, normalizePhone } from "@/lib/privacy/phone";

describe("normalizePhone", () => {
  it("normalises Senegal formats to 221XXXXXXXXX", () => {
    for (const raw of ["+221 77 123 45 67", "00221771234567", "77 123 45 67", "771234567", "%2B221771234567", "tel:+221771234567"]) {
      expect(normalizePhone(raw)).toBe("221771234567");
    }
  });
  it("keeps foreign numbers", () => {
    expect(normalizePhone("+1 647 716 8693")).toBe("16477168693");
  });
  it("rejects junk", () => {
    expect(normalizePhone("123")).toBeNull();
    expect(normalizePhone(null)).toBeNull();
  });
});

describe("formatPhone", () => {
  it("formats Senegal and foreign numbers", () => {
    expect(formatPhone("221771234567")).toBe("+221 77 123 45 67");
    expect(formatPhone("16477168693")).toBe("+16477168693");
    expect(formatPhone(null)).toBe("—");
  });
});
