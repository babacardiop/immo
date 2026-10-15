import { describe, expect, it } from "vitest";
import { simulateConstruction } from "@/lib/simus/construction";
import { DISCLAIMER_CONSTRUCTION } from "@/lib/simus/disclaimers";

describe("simulateConstruction", () => {
  it("returns a min–max shell for surface × rate", () => {
    const r = simulateConstruction({
      surfaceM2: 100,
      niveaux: "R0",
      finition: "standard",
      zone: "dakar",
      cloture: false,
      fosse: false,
      vrd: false,
      imprevusPct: 10,
    });
    expect(r.shellMin).toBe(100 * 350_000);
    expect(r.shellMax).toBe(100 * 480_000);
    expect(r.totalMin).toBeGreaterThan(r.shellMin);
    expect(r.totalMax).toBeGreaterThan(r.totalMin);
  });

  it("flags architect when total > 30M", () => {
    const r = simulateConstruction({
      surfaceM2: 120,
      niveaux: "R1",
      finition: "standing",
      zone: "dakar",
      cloture: true,
      fosse: true,
      vrd: true,
      imprevusPct: 15,
    });
    expect(r.architectHint).toBe(true);
  });

  it("exposes construction disclaimer", () => {
    expect(DISCLAIMER_CONSTRUCTION).toMatch(/hors prix du terrain/i);
  });
});
