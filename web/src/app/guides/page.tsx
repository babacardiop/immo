import type { Metadata } from "next";
import Image from "next/image";
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

const COVER = [
  "/images/listing-01.jpg",
  "/images/listing-04.jpg",
  "/images/listing-05.jpg",
];

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
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g, i) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="group block overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] transition hover:border-[var(--color-leaf)]/40"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={COVER[i % COVER.length]!}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width:1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                  {g.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  {g.description}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[var(--color-leaf)]">
                  Lire →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/guides/glossaire"
        className="mt-10 flex items-center justify-between gap-4 rounded-[var(--radius-card)] bg-[var(--color-sage)]/35 px-6 py-5 transition hover:bg-[var(--color-sage)]/50"
      >
        <div>
          <h2 className="text-lg font-semibold">Glossaire</h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Titre foncier, bail, délibération, pastille papier…
          </p>
        </div>
        <span className="text-sm font-medium text-[var(--color-leaf)]">
          Ouvrir →
        </span>
      </Link>
    </PageShell>
  );
}
