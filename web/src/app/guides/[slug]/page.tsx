import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentBlocks } from "@/components/content-blocks";
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
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-sm text-[var(--color-muted)]">
        <Link href="/guides" className="hover:text-[var(--color-ink)]">
          Guides
        </Link>
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{page.title}</h1>
      <p className="mt-3 text-lg text-[var(--color-muted)]">{page.description}</p>
      <ContentBlocks blocks={page.blocks} />
    </main>
  );
}
