import type { Metadata } from "next";
import Link from "next/link";
import { ContentBlocks } from "@/components/content-blocks";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { WhatsAppCta } from "@/components/wa-cta";
import { getAgencePage } from "@/lib/content/pages";
import { absoluteUrl, siteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "L’agence | EverGreen",
  description:
    "Agence immobilière full-service au Sénégal — process, confiance, contact direct.",
  alternates: { canonical: absoluteUrl("/agence") },
  openGraph: {
    title: "L’agence EverGreen",
    description:
      "Process clair, papiers nommés, catalogue curated au Sénégal.",
    url: absoluteUrl("/agence"),
    locale: "fr_SN",
    images: [{ url: absoluteUrl("/api/og?title=L%27agence%20EverGreen") }],
  },
};

const VALUES = [
  { title: "Papiers nommés", text: "Chaque vente affiche son type de droit." },
  { title: "Process clair", text: "Qualification, visite, dossier, closing." },
  { title: "Contact direct", text: "WhatsApp ou formulaire — réponse sous 24 h." },
] as const;

export default function AgencePage() {
  const page = getAgencePage();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "EverGreen",
    url: siteUrl(),
    description: page.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dakar",
      addressRegion: "Dakar",
      addressCountry: "SN",
    },
    areaServed: { "@type": "Country", name: "Sénégal" },
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[var(--color-sage)]/25 px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <PageBreadcrumb
            items={[
              { href: "/", label: "Accueil" },
              { label: "Agence" },
            ]}
          />
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-leaf)]">
            Hubs / agence
          </p>
          <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-brand-serif)] text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-muted)]">
            {page.description}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {VALUES.map((v) => (
              <li
                key={v.title}
                className="rounded-[var(--radius-card)] bg-[var(--color-surface)]/80 px-5 py-4"
              >
                <p className="font-semibold text-[var(--color-ink)]">{v.title}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] px-6 py-8 sm:px-10">
          <ContentBlocks blocks={page.blocks} />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)]"
          >
            Nous écrire
          </Link>
          <WhatsAppCta text="Bonjour EverGreen, j’aimerais en savoir plus sur l’agence." />
          <Link
            href="/guides"
            className="inline-flex rounded-[var(--radius-pill)] border border-[var(--color-steel)]/40 bg-[var(--color-surface)] px-5 py-2.5 text-sm font-medium"
          >
            Guides
          </Link>
        </div>
      </div>
    </main>
  );
}
