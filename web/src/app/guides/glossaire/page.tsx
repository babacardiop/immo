import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { getGlossaire } from "@/lib/content/pages";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Glossaire immobilier | EverGreen",
  description:
    "Définitions courtes : titre foncier, bail, délibération, pastille papier.",
  alternates: { canonical: absoluteUrl("/guides/glossaire") },
};

export default function GlossairePage() {
  const entries = getGlossaire();

  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { href: "/guides", label: "Guides" },
        { label: "Glossaire" },
      ]}
      title="Glossaire"
      description="Les termes que vous verrez sur nos fiches et dans nos échanges."
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        {entries.map((e) => (
          <div
            key={e.term}
            className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] p-6"
          >
            <dt className="text-lg font-semibold text-[var(--color-ink)]">
              {e.term}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {e.definition}
            </dd>
          </div>
        ))}
      </dl>
    </PageShell>
  );
}
