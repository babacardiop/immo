import type { Metadata } from "next";
import Link from "next/link";
import { ContentBlocks } from "@/components/content-blocks";
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
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl font-semibold tracking-tight">{page.title}</h1>
      <p className="mt-3 text-lg text-[var(--color-muted)]">{page.description}</p>
      <ContentBlocks blocks={page.blocks} />
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="inline-flex rounded-md bg-[var(--color-ink)] px-4 py-2 text-sm text-[var(--color-bg)]"
        >
          Nous écrire
        </Link>
        <WhatsAppCta text="Bonjour EverGreen, j’aimerais en savoir plus sur l’agence." />
        <Link
          href="/guides"
          className="inline-flex rounded-md border border-[var(--color-ink)] px-4 py-2 text-sm"
        >
          Guides
        </Link>
      </div>
    </main>
  );
}
