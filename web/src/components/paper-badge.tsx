import type { PaperType } from "@prisma/client";
import { paperLabel } from "@/lib/listings/paper";

/** DS-15 pastilles papier */
const STYLES: Record<PaperType, string> = {
  TF: "bg-[var(--color-olive)] text-[#F5F2E8]",
  BAIL_EMPHYTEOTIQUE: "bg-[var(--color-steel)] text-[var(--color-ink)]",
  BAIL_ORDINAIRE: "bg-[var(--color-steel)] text-[var(--color-ink)]",
  DELIBERATION: "bg-[var(--color-bronze)] text-[#F5F2E8]",
  OTHER:
    "border border-[var(--color-steel)] bg-transparent text-[var(--color-ink)]",
};

export function PaperBadge({
  type,
}: {
  type: PaperType | null | undefined;
}) {
  if (!type) {
    return (
      <span className="inline-flex rounded-[var(--radius-pill)] border border-[var(--color-steel)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-muted)]">
        Papier manquant
      </span>
    );
  }

  return (
    <span
      className={`inline-flex rounded-[var(--radius-pill)] px-2.5 py-0.5 text-xs font-medium ${STYLES[type]}`}
    >
      {paperLabel(type)}
    </span>
  );
}
