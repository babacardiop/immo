import Link from "next/link";
import { WhatsAppCta } from "@/components/wa-cta";

export function EmptyState({
  title = "Rien pour le moment",
  description = "Élargissez votre recherche ou contactez-nous — le stock évolue chaque semaine.",
  resetHref,
  resetLabel = "Réinitialiser",
  waText = "Bonjour EverGreen, pouvez-vous m’aider dans ma recherche ?",
}: {
  title?: string;
  description?: string;
  resetHref?: string;
  resetLabel?: string;
  waText?: string;
}) {
  return (
    <div className="py-16 text-center" data-testid="empty-state">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-[var(--color-muted)]">{description}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {resetHref ? (
          <Link
            href={resetHref}
            className="inline-flex rounded-md bg-[var(--color-ink)] px-4 py-2 text-sm text-[var(--color-bg)]"
          >
            {resetLabel}
          </Link>
        ) : null}
        <WhatsAppCta text={waText} label="Demander sur WhatsApp" />
      </div>
    </div>
  );
}
