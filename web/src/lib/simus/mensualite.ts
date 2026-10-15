import { z } from "zod";

export const mensualiteInputSchema = z.object({
  prixBien: z.coerce.number().int().positive().max(50_000_000_000),
  acompteMode: z.enum(["pct", "fixe"]).default("pct"),
  acomptePct: z.coerce.number().min(0).max(90).optional(),
  acompteFixe: z.coerce.number().int().min(0).optional(),
  dureeMois: z.coerce.number().int().refine((n) => [12, 24, 36].includes(n), {
    message: "Durée 12, 24 ou 36 mois",
  }),
  fraisDossier: z.coerce.number().int().min(0).max(5_000_000).default(0),
  lisserFrais: z.boolean().default(false),
  mode: z.enum(["etale", "loc_vente"]).default("etale"),
});

export type MensualiteInput = z.infer<typeof mensualiteInputSchema>;

export type MensualiteResult = {
  acompte: number;
  finance: number;
  mensualite: number;
  totalPaye: number;
  fraisDossier: number;
  dureeMois: number;
  mode: "etale" | "loc_vente";
  echeances: { mois: number; montant: number }[];
};

/** Default down-payment hint by price band (agency facility, not bank). */
export function suggestedAcomptePct(prixBien: number): number {
  if (prixBien < 1_000_000) return 10;
  return 30;
}

export function resolveAcompte(input: MensualiteInput): number {
  if (input.acompteMode === "fixe") {
    return Math.min(input.acompteFixe ?? 0, input.prixBien);
  }
  const pct = input.acomptePct ?? suggestedAcomptePct(input.prixBien);
  return Math.round((input.prixBien * pct) / 100);
}

/**
 * Formule V1 : (prix − acompte) / durée (+ frais lissés optionnels).
 * Pas d’intérêts bancaires — facilité vendeur.
 */
export function simulateMensualite(raw: MensualiteInput): MensualiteResult {
  const input = mensualiteInputSchema.parse(raw);
  const acompte = resolveAcompte(input);
  const financeBase = Math.max(0, input.prixBien - acompte);
  const frais = input.fraisDossier;
  const finance = input.lisserFrais ? financeBase + frais : financeBase;
  const mensualite = Math.ceil(finance / input.dureeMois);
  const totalPaye =
    acompte + finance + (input.lisserFrais ? 0 : frais);

  const echeances = Array.from({ length: input.dureeMois }, (_, i) => ({
    mois: i + 1,
    montant: mensualite,
  }));

  return {
    acompte,
    finance,
    mensualite,
    totalPaye,
    fraisDossier: frais,
    dureeMois: input.dureeMois,
    mode: input.mode,
    echeances,
  };
}

export function mensualiteWaText(result: MensualiteResult, prixBien: number): string {
  const modeLabel =
    result.mode === "loc_vente" ? "location-vente" : "vente étalée";
  return [
    "Bonjour EverGreen, j’ai simulé un plan de paiement :",
    `Prix ${prixBien.toLocaleString("fr-FR")} FCFA · mode ${modeLabel}`,
    `Acompte ${result.acompte.toLocaleString("fr-FR")} FCFA`,
    `Mensualité ~${result.mensualite.toLocaleString("fr-FR")} FCFA / mois sur ${result.dureeMois} mois`,
    "Pouvez-vous m’accompagner ?",
  ].join("\n");
}
