import { z } from "zod";

export const constructionInputSchema = z.object({
  surfaceM2: z.coerce.number().min(50).max(600),
  niveaux: z.enum(["R0", "R1"]).default("R0"),
  finition: z.enum(["eco", "standard", "standing"]).default("standard"),
  zone: z.enum(["dakar", "petite_cote", "interieur"]).default("dakar"),
  cloture: z.boolean().default(false),
  fosse: z.boolean().default(false),
  vrd: z.boolean().default(false),
  imprevusPct: z.coerce.number().min(0).max(20).default(12),
});

export type ConstructionInput = z.infer<typeof constructionInputSchema>;

/** FCFA/m² min–max by zone × finition (V1 config — recalibrate quarterly). */
export const CONSTRUCTION_RATES: Record<
  ConstructionInput["zone"],
  Record<ConstructionInput["finition"], { min: number; max: number }>
> = {
  dakar: {
    eco: { min: 280_000, max: 380_000 },
    standard: { min: 350_000, max: 480_000 },
    standing: { min: 450_000, max: 600_000 },
  },
  petite_cote: {
    eco: { min: 250_000, max: 340_000 },
    standard: { min: 300_000, max: 420_000 },
    standing: { min: 400_000, max: 520_000 },
  },
  interieur: {
    eco: { min: 220_000, max: 300_000 },
    standard: { min: 260_000, max: 360_000 },
    standing: { min: 340_000, max: 450_000 },
  },
};

const OPTION_FIXED = {
  cloture: 2_500_000,
  fosse: 1_200_000,
  vrd: 3_500_000,
} as const;

const NIVEAU_MULT: Record<ConstructionInput["niveaux"], number> = {
  R0: 1,
  R1: 1.35,
};

export type ConstructionResult = {
  pricePerSqmMin: number;
  pricePerSqmMax: number;
  shellMin: number;
  shellMax: number;
  optionsTotal: number;
  imprevusMin: number;
  imprevusMax: number;
  totalMin: number;
  totalMax: number;
  architectHint: boolean;
};

export function simulateConstruction(raw: ConstructionInput): ConstructionResult {
  const input = constructionInputSchema.parse(raw);
  const rates = CONSTRUCTION_RATES[input.zone][input.finition];
  const mult = NIVEAU_MULT[input.niveaux];

  const shellMin = Math.round(input.surfaceM2 * rates.min * mult);
  const shellMax = Math.round(input.surfaceM2 * rates.max * mult);

  let optionsTotal = 0;
  if (input.cloture) optionsTotal += OPTION_FIXED.cloture;
  if (input.fosse) optionsTotal += OPTION_FIXED.fosse;
  if (input.vrd) optionsTotal += OPTION_FIXED.vrd;

  const baseMin = shellMin + optionsTotal;
  const baseMax = shellMax + optionsTotal;
  const imprevusMin = Math.round((baseMin * input.imprevusPct) / 100);
  const imprevusMax = Math.round((baseMax * input.imprevusPct) / 100);
  const totalMin = baseMin + imprevusMin;
  const totalMax = baseMax + imprevusMax;

  return {
    pricePerSqmMin: rates.min,
    pricePerSqmMax: rates.max,
    shellMin,
    shellMax,
    optionsTotal,
    imprevusMin,
    imprevusMax,
    totalMin,
    totalMax,
    architectHint: totalMax > 30_000_000,
  };
}

export function constructionWaText(result: ConstructionResult, surface: number): string {
  return [
    "Bonjour EverGreen, j’ai estimé un coût de construction :",
    `Surface ${surface} m² · fourchette ${result.totalMin.toLocaleString("fr-FR")} – ${result.totalMax.toLocaleString("fr-FR")} FCFA`,
    "Pouvez-vous me connecter à un constructeur / architecte ?",
  ].join("\n");
}

export const ZONE_LABELS: Record<ConstructionInput["zone"], string> = {
  dakar: "Dakar",
  petite_cote: "Petite Côte",
  interieur: "Intérieur",
};

export const FINITION_LABELS: Record<ConstructionInput["finition"], string> = {
  eco: "Éco",
  standard: "Standard",
  standing: "Standing",
};
