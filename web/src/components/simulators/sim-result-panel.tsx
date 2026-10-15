import { WhatsAppCta } from "@/components/wa-cta";
import { UNGATED_HINT } from "@/lib/simus/disclaimers";

export function SimResultPanel({
  headline,
  lines,
  disclaimer,
  waText,
  secondaryHref,
  secondaryLabel,
}: {
  headline: string;
  lines?: string[];
  disclaimer: string;
  waText: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] p-6">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-muted)]">
        Résultat
      </p>
      <p className="mt-2 font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tabular-nums text-[var(--color-olive)] sm:text-4xl">
        {headline}
      </p>
      {lines && lines.length > 0 ? (
        <ul className="mt-4 space-y-1 text-sm text-[var(--color-muted)]">
          {lines.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ) : null}
      <p className="mt-4 text-xs leading-relaxed text-[var(--color-muted)]">
        {disclaimer}
      </p>
      <p className="mt-1 text-xs text-[var(--color-leaf)]">{UNGATED_HINT}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <WhatsAppCta
          text={waText}
          label="WhatsApp conseiller"
          className="bg-[var(--color-leaf)] text-white hover:opacity-90"
        />
        {secondaryHref && secondaryLabel ? (
          <a
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-steel)]/40 bg-[var(--color-bg)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)]"
          >
            {secondaryLabel}
          </a>
        ) : null}
      </div>
    </div>
  );
}
