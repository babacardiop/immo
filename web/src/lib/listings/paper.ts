import type { PaperType, TransactionType } from "@prisma/client";

/** Paper types allowed to publish a sale (and sale-like) listing. */
export const PUBLISHABLE_PAPER_TYPES: PaperType[] = [
  "TF",
  "BAIL_EMPHYTEOTIQUE",
  "BAIL_ORDINAIRE",
  "DELIBERATION",
];

export const PAPER_LABELS: Record<PaperType, string> = {
  TF: "Titre foncier",
  BAIL_EMPHYTEOTIQUE: "Bail emphytéotique",
  BAIL_ORDINAIRE: "Bail",
  DELIBERATION: "Délibération",
  OTHER: "Autre",
};

export function paperLabel(type: PaperType | null | undefined): string {
  if (!type) return "Papier non renseigné";
  return PAPER_LABELS[type];
}

export function isSaleLike(transaction: TransactionType): boolean {
  return (
    transaction === "SALE" ||
    transaction === "INSTALLMENT_SALE" ||
    transaction === "RENT_TO_OWN"
  );
}

export function canPublishPaper(
  transaction: TransactionType,
  paperType: PaperType | null | undefined,
): boolean {
  if (!isSaleLike(transaction)) {
    // Location: paper optional in V0
    return true;
  }
  return !!paperType && PUBLISHABLE_PAPER_TYPES.includes(paperType);
}

export const MIN_PHOTOS_TO_PUBLISH = 3;
