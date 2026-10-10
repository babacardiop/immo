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
  const title = `${listing.title} | Louer | EverGreen`;
  const description =
    listing.description?.slice(0, 155) ||
    `${listing.title} — ${formatFcfa(listing.priceFcfa)} / mois · ${listing.city ?? "Sénégal"}`;
  const image =
    listing.media[0]?.url ||
    absoluteUrl(`/api/og?title=${encodeURIComponent(listing.title)}`);

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/louer/${slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/louer/${slug}`),
      locale: "fr_SN",
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: listing.title,
        },
      ],
    },
  };
}

export default function LouerFichePage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
          <p className="text-[var(--color-muted)]">Chargement…</p>
        </main>
      }
    >
      <LouerFiche params={params} />
    </Suspense>
  );
}

async function LouerFiche({ params }: Props) {
  const { slug } = await params;
  return <PublicFiche channel="louer" slug={slug} />;
}
