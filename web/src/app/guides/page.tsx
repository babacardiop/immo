import type { Metadata } from "next";
import Link from "next/link";
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
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <h1 className="font-[family-name:var(--font-brand-serif)] text-4xl font-semibold tracking-tight">
        Guides
      </h1>
      <p className="mt-3 text-[var(--color-muted)]">
        Repères concrets avant une visite ou un engagement — sans jargon inutile.
      </p>
      <ul className="mt-10 space-y-6">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="text-xl font-medium hover:text-[var(--color-olive)]"
            >
              {g.title}
            </Link>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              {g.description}
            </p>
          </li>
        ))}
        <li>
          <Link
            href="/guides/glossaire"
            className="text-xl font-medium hover:text-[var(--color-olive)]"
          >
            Glossaire
          </Link>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Titre foncier, bail, délibération, pastille papier…
          </p>
        </li>
      </ul>
    </main>
  );
}
