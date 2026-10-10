import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentBlocks } from "@/components/content-blocks";
import { PageShell } from "@/components/page-shell";
import { getGuidePage, listGuidePages } from "@/lib/content/pages";
import { absoluteUrl } from "@/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listGuidePages().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuidePage(slug);
  if (!page) return { title: "Guide introuvable" };
  return {
    title: `${page.title} | EverGreen`,
    description: page.description,
    alternates: { canonical: absoluteUrl(`/guides/${slug}`) },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(`/guides/${slug}`),
      locale: "fr_SN",
      images: [
        {
          url: absoluteUrl(
            `/api/og?title=${encodeURIComponent(page.title)}`,
          ),
        },
      ],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = getGuidePage(slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    inLanguage: "fr-SN",
    author: { "@type": "Organization", name: "EverGreen" },
  };

  return (
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { href: "/guides", label: "Guides" },
        { label: page.title },
      ]}
      title={page.title}
      description={page.description}
      wide={false}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/30 bg-[var(--color-surface)] px-6 py-8 sm:px-10">
        <ContentBlocks blocks={page.blocks} />
      </div>
    </PageShell>
  );
}
