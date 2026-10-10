import type { Metadata } from "next";
import Link from "next/link";
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
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <p className="text-sm text-[var(--color-muted)]">
        <Link href="/guides" className="hover:text-[var(--color-ink)]">
          Guides
        </Link>
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Glossaire</h1>
      <p className="mt-3 text-[var(--color-muted)]">
        Les termes que vous verrez sur nos fiches et dans nos échanges.
      </p>
      <dl className="mt-10 space-y-6">
        {entries.map((e) => (
          <div key={e.term}>
            <dt className="text-xl font-medium">{e.term}</dt>
            <dd className="mt-1 text-[var(--color-muted)]">{e.definition}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
