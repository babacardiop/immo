import type { VisitOutcome } from "@prisma/client";

export const VISIT_OUTCOME_LABELS: Record<VisitOutcome, string> = {
  NOT_INTERESTED: "Pas intéressé",
  CONTINUE: "Poursuite (compte / candidature)",
  VISIT_OTHER_RENTALS: "Veut visiter d’autres biens",
  NEEDS_TIME: "Réfléchit / besoin de temps",
  NO_SHOW: "No-show (absent)",
  OTHER: "Autre",
};

export const VISIT_OUTCOMES = Object.keys(
  VISIT_OUTCOME_LABELS,
) as VisitOutcome[];

/** Motif recommandé quand outcome = not interested / other. */
export function motifRecommended(outcome: VisitOutcome): boolean {
  return outcome === "NOT_INTERESTED" || outcome === "OTHER";
}
