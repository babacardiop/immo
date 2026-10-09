import type { Metadata } from "next";
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
  const image = listing.media[0]?.url;

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
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function LouerFichePage({ params }: Props) {
  const { slug } = await params;
  return <PublicFiche channel="louer" slug={slug} />;
}
