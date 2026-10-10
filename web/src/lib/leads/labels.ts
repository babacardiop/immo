import type { LeadStage } from "@prisma/client";

export const LEAD_STAGE_LABELS: Record<LeadStage, string> = {
  NEW: "Nouveau",
  CONTACTED: "Contacté",
  QUALIFIED: "Qualifié",
  VISIT: "Visite",
  OFFER: "Offre",
  WON: "Gagné",
  LOST: "Perdu",
  NURTURE: "Nurture",
};

export const LEAD_STAGES = Object.keys(LEAD_STAGE_LABELS) as LeadStage[];
