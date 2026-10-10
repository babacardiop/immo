import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { listGuidePages } from "@/lib/content/pages";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Guides immobiliers | EverGreen",
  description:
    "Guides pour acheter, louer et comprendre les papiers immobiliers au Sénégal.",
  alternates: { canonical: absoluteUrl("/guides") },
};

export default function GuidesIndexPage() {
  const guides = listGuidePages();

  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { label: "Guides" },
      ]}
      title="Guides"
      description="Repères concrets avant une visite ou un engagement — sans jargon inutile."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="block h-full rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] p-6 transition hover:border-[var(--color-leaf)]/50"
            >
              <h2 className="text-xl font-semibold text-[var(--color-ink)]">
                {g.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {g.description}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-[var(--color-leaf)]">
                Lire →
              </span>
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/guides/glossaire"
            className="block h-full rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] p-6 transition hover:border-[var(--color-leaf)]/50"
          >
            <h2 className="text-xl font-semibold">Glossaire</h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              Titre foncier, bail, délibération, pastille papier…
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-[var(--color-leaf)]">
              Ouvrir →
            </span>
          </Link>
        </li>
      </ul>
    </PageShell>
  );
}
