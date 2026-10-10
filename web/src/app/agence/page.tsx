import type { Metadata } from "next";
import Link from "next/link";
import { ContentBlocks } from "@/components/content-blocks";
import { PageShell } from "@/components/page-shell";
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
    areaServed: {
      "@type": "Country",
      name: "Sénégal",
    },
  };

  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { label: "Agence" },
      ]}
      title={page.title}
      description={page.description}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] px-6 py-8 sm:px-10">
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
          className="inline-flex rounded-[var(--radius-pill)] border border-[var(--color-steel)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-medium"
        >
          Guides
        </Link>
      </div>
    </PageShell>
  );
}
