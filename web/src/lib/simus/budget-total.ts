import { z } from "zod";
import {
  constructionInputSchema,
  simulateConstruction,
  type ConstructionResult,
} from "@/lib/simus/construction";
import {
  mensualiteInputSchema,
  simulateMensualite,
  type MensualiteResult,
} from "@/lib/simus/mensualite";

export const budgetTotalInputSchema = z.object({
  prixTerrain: z.coerce.number().int().positive().max(50_000_000_000),
  includeConstruction: z.boolean().default(true),
  includeFrais: z.boolean().default(true),
  /** Soft notary/registration pack as % of terrain (indicative 8–12%). */
  fraisPct: z.coerce.number().min(5).max(15).default(10),
  mensualite: mensualiteInputSchema.partial().optional(),
  construction: constructionInputSchema.partial().optional(),
});

export type BudgetTotalInput = z.infer<typeof budgetTotalInputSchema>;

export type BudgetTotalResult = {
  prixTerrain: number;
  fraisAcquisition: number;
  construction: ConstructionResult | null;
  mensualite: MensualiteResult | null;
  cashInitial: number;
  grandTotal: number;
};

export function simulateBudgetTotal(raw: BudgetTotalInput): BudgetTotalResult {
  const input = budgetTotalInputSchema.parse(raw);
  const fraisAcquisition = input.includeFrais
    ? Math.round((input.prixTerrain * input.fraisPct) / 100)
    : 0;

  const construction = input.includeConstruction
    ? simulateConstruction({
        surfaceM2: 100,
        niveaux: "R0",
        finition: "standard",
        zone: "dakar",
        cloture: false,
        fosse: false,
        vrd: false,
        imprevusPct: 12,
        ...input.construction,
      })
    : null;

  const mensualite = simulateMensualite({
    acompteMode: "pct",
    acomptePct: 30,
    dureeMois: 24,
    fraisDossier: 50_000,
    lisserFrais: false,
    mode: "etale",
    ...input.mensualite,
    // Terrain always drives prixBien — ignore override from partial mensualite.
    prixBien: input.prixTerrain,
  });

  // Cash day-1: down payment + acquisition fees + dossier (if not spread)
  const cashJourJ =
    mensualite.acompte +
    fraisAcquisition +
    (input.mensualite?.lisserFrais ? 0 : mensualite.fraisDossier);

  const constructionMid = construction
    ? Math.round((construction.totalMin + construction.totalMax) / 2)
    : 0;

  const grandTotal =
    input.prixTerrain + fraisAcquisition + constructionMid;

  return {
    prixTerrain: input.prixTerrain,
    fraisAcquisition,
    construction,
    mensualite,
    cashInitial: cashJourJ,
    grandTotal,
  };
}

export function budgetWaText(result: BudgetTotalResult): string {
  return [
    "Bonjour EverGreen, j’ai estimé un budget projet :",
    `Terrain ${result.prixTerrain.toLocaleString("fr-FR")} FCFA`,
    `Cash jour J ~${result.cashInitial.toLocaleString("fr-FR")} FCFA`,
    `Budget total indicatif ~${result.grandTotal.toLocaleString("fr-FR")} FCFA`,
    "Pouvez-vous m’accompagner (visite / diligence) ?",
  ].join("\n");
}
