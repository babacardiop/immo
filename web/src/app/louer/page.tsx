import type { Metadata } from "next";
import { CataloguePage } from "@/components/catalogue-page";
import { parseCatalogueSearchParams } from "@/lib/listings/parse-filters";

export const metadata: Metadata = {
  title: "Louer | EverGreen",
  description:
    "Locations curated au Sénégal — appartements et maisons sélectionnés par l’agence.",
};

export default async function LouerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseCatalogueSearchParams(params);

  return (
    <CataloguePage
      channel="louer"
      title="Louer"
      subtitle="Locations sélectionnées — contact WhatsApp pour une visite."
      filters={filters}
    />
  );
}
