import { describe, expect, it } from "vitest";
import { simulateBudgetTotal } from "@/lib/simus/budget-total";
import { DISCLAIMER_BUDGET } from "@/lib/simus/disclaimers";

describe("simulateBudgetTotal", () => {
  it("aggregates terrain + fees + construction mid", () => {
    const r = simulateBudgetTotal({
      prixTerrain: 15_000_000,
      includeConstruction: true,
      includeFrais: true,
      fraisPct: 10,
      construction: { surfaceM2: 100, zone: "dakar", finition: "standard" },
      mensualite: { acomptePct: 30, dureeMois: 24, fraisDossier: 50_000 },
    });
    expect(r.fraisAcquisition).toBe(1_500_000);
    expect(r.construction).not.toBeNull();
    expect(r.mensualite?.acompte).toBe(4_500_000);
    expect(r.cashInitial).toBe(4_500_000 + 1_500_000 + 50_000);
    expect(r.grandTotal).toBeGreaterThan(r.prixTerrain);
  });

  it("can skip construction", () => {
    const r = simulateBudgetTotal({
      prixTerrain: 5_000_000,
      includeConstruction: false,
      includeFrais: false,
    });
    expect(r.construction).toBeNull();
    expect(r.fraisAcquisition).toBe(0);
    expect(r.grandTotal).toBe(5_000_000);
  });

  it("exposes budget disclaimer", () => {
    expect(DISCLAIMER_BUDGET).toMatch(/indicativ/i);
  });
});
