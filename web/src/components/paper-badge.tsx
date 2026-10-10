import type { PaperType } from "@prisma/client";
import { paperLabel } from "@/lib/listings/paper";

const STYLES: Record<PaperType, string> = {
  TF: "bg-[var(--color-leaf)] text-white",
  BAIL_EMPHYTEOTIQUE: "bg-[#dbe4ee] text-[var(--color-olive)]",
  BAIL_ORDINAIRE: "bg-[#dbe4ee] text-[var(--color-olive)]",
  DELIBERATION: "bg-[#efe3c8] text-[var(--color-bronze)]",
  OTHER: "bg-[var(--color-steel)]/30 text-[var(--color-muted)]",
};

export function PaperBadge({
  type,
}: {
  type: PaperType | null | undefined;
}) {
  if (!type) {
    return (
      <span className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-steel)]/20 px-2.5 py-0.5 text-xs font-medium text-[var(--color-muted)]">
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
