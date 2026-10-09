import type { Metadata } from "next";
import { CataloguePage } from "@/components/catalogue-page";
import { parseCatalogueSearchParams } from "@/lib/listings/parse-filters";

export const metadata: Metadata = {
  title: "Acheter | EverGreen",
  description:
    "Catalogue curated de biens à vendre au Sénégal — terrains, maisons, appartements, papiers nommés.",
};

export default async function AcheterPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseCatalogueSearchParams(params);

  return (
    <CataloguePage
      channel="acheter"
      title="Acheter"
      subtitle="Biens curated à vendre — pastille papier obligatoire, stock agence."
      filters={filters}
    />
  );
}
