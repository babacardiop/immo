import { describe, expect, it } from "vitest";
import { canAccessHub, canAccessLab } from "@/lib/roles";

describe("canAccessLab", () => {
  it("refuses portal users even with the flag", () => {
    expect(canAccessLab({ role: "CLIENT", labAccess: true })).toBe(false);
    expect(canAccessLab({ role: "LANDLORD", labAccess: true })).toBe(false);
  });

  it("allows RESEARCH_LAB and ADMIN", () => {
    expect(canAccessLab({ role: "RESEARCH_LAB" })).toBe(true);
    expect(canAccessLab({ role: "ADMIN" })).toBe(true);
  });

  it("requires opt-in for other staff", () => {
    expect(canAccessLab({ role: "MODERATOR" })).toBe(false);
    expect(canAccessLab({ role: "MODERATOR", labAccess: true })).toBe(true);
    expect(canAccessLab({ role: "AGENT", labAccess: false })).toBe(false);
  });
});

describe("canAccessHub", () => {
  it("keeps lab-only analysts out of the hub", () => {
    expect(canAccessHub("RESEARCH_LAB")).toBe(false);
    expect(canAccessHub("AGENT")).toBe(true);
  });
});
