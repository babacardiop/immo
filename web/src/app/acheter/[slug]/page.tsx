import type { Metadata } from "next";
import { Suspense } from "react";
import { PublicFiche } from "@/components/public-fiche";
import { getPublishedListingBySlug } from "@/lib/listings/public-query";
import { formatFcfa } from "@/lib/format";
import { absoluteUrl } from "@/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getPublishedListingBySlug(slug);
  if (!listing) {
    return { title: "Bien introuvable | EverGreen" };
  }
  const title = `${listing.title} | EverGreen`;
  const description =
    listing.description?.slice(0, 155) ||
    `${listing.title} — ${formatFcfa(listing.priceFcfa)} · ${listing.city ?? "Sénégal"}`;
  const image = listing.media[0]?.url;

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/acheter/${slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/acheter/${slug}`),
      locale: "fr_SN",
      type: "article",
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default function AcheterFichePage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          <p className="text-[var(--color-muted)]">Chargement…</p>
        </main>
      }
    >
      <AcheterFiche params={params} />
    </Suspense>
  );
}

async function AcheterFiche({ params }: Props) {
  const { slug } = await params;
  return <PublicFiche channel="acheter" slug={slug} />;
}
