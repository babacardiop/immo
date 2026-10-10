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
    <div
      className="mt-10 rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] px-6 py-16 text-center"
      data-testid="empty-state"
    >
      <h2 className="font-[family-name:var(--font-brand-serif)] text-2xl font-semibold">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-[var(--color-muted)]">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {resetHref ? (
          <Link
            href={resetHref}
            className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)]"
          >
            {resetLabel}
          </Link>
        ) : null}
        <WhatsAppCta text={waText} label="WhatsApp" />
      </div>
    </div>
  );
}
