import { describe, expect, it } from "vitest";
import { canAccessLab } from "@/lib/access";

describe("canAccessLab (lab copy)", () => {
  it("matches the hub rule", () => {
    expect(canAccessLab({ role: "CLIENT", labAccess: true })).toBe(false);
    expect(canAccessLab({ role: "LANDLORD" })).toBe(false);
    expect(canAccessLab({ role: "ADMIN" })).toBe(true);
    expect(canAccessLab({ role: "RESEARCH_LAB" })).toBe(true);
    expect(canAccessLab({ role: "GER" })).toBe(false);
    expect(canAccessLab({ role: "GER", labAccess: true })).toBe(true);
  });
});
