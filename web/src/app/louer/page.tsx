import type { Metadata } from "next";
import { Suspense } from "react";
import { CataloguePage } from "@/components/catalogue-page";
import { CatalogueSkeleton } from "@/components/catalogue-skeleton";
import { parseCatalogueSearchParams } from "@/lib/listings/parse-filters";

export const metadata: Metadata = {
  title: "Louer | EverGreen",
  description:
    "Locations curated au Sénégal — appartements et maisons sélectionnés par l’agence.",
};

const TITLE = "Louer";
const SUBTITLE =
  "Locations sélectionnées — contact WhatsApp pour une visite.";

export default function LouerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<CatalogueSkeleton title={TITLE} subtitle={SUBTITLE} />}>
      <LouerCatalogue searchParams={searchParams} />
    </Suspense>
  );
}

async function LouerCatalogue({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseCatalogueSearchParams(params);

  return (
    <CataloguePage
      channel="louer"
      title={TITLE}
      subtitle={SUBTITLE}
      filters={filters}
    />
  );
}
