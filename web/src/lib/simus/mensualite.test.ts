import { describe, expect, it } from "vitest";
import {
  simulateMensualite,
  suggestedAcomptePct,
} from "@/lib/simus/mensualite";
import { DISCLAIMER_MENSUALITE } from "@/lib/simus/disclaimers";

describe("simulateMensualite", () => {
  it("suggests 10% down under 1M, else 30%", () => {
    expect(suggestedAcomptePct(800_000)).toBe(10);
    expect(suggestedAcomptePct(10_000_000)).toBe(30);
  });

  it("computes (prix - acompte) / duree", () => {
    const r = simulateMensualite({
      prixBien: 10_000_000,
      acompteMode: "pct",
      acomptePct: 30,
      dureeMois: 24,
      fraisDossier: 0,
      lisserFrais: false,
      mode: "etale",
    });
    expect(r.acompte).toBe(3_000_000);
    expect(r.finance).toBe(7_000_000);
    expect(r.mensualite).toBe(Math.ceil(7_000_000 / 24));
    expect(r.echeances).toHaveLength(24);
  });

  it("can spread dossier fees into monthly", () => {
    const r = simulateMensualite({
      prixBien: 12_000_000,
      acompteMode: "fixe",
      acompteFixe: 3_000_000,
      dureeMois: 12,
      fraisDossier: 120_000,
      lisserFrais: true,
      mode: "loc_vente",
    });
    expect(r.finance).toBe(9_120_000);
    expect(r.mensualite).toBe(760_000);
    expect(r.mode).toBe("loc_vente");
  });

  it("exposes bank disclaimer copy", () => {
    expect(DISCLAIMER_MENSUALITE).toMatch(/pas un prêt bancaire/i);
  });
});
