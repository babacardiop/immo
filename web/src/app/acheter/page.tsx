import type { Metadata } from "next";
import { Suspense } from "react";
import { CataloguePage } from "@/components/catalogue-page";
import { CatalogueSkeleton } from "@/components/catalogue-skeleton";
import { parseCatalogueSearchParams } from "@/lib/listings/parse-filters";

export const metadata: Metadata = {
  title: "À vendre | EverGreen",
  description:
    "Catalogue curated de biens à vendre au Sénégal — terrains, maisons, appartements, papiers nommés.",
};

const TITLE = "À vendre";

export default function AcheterPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<CatalogueSkeleton title={TITLE} />}>
      <AcheterCatalogue searchParams={searchParams} />
    </Suspense>
  );
}

async function AcheterCatalogue({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseCatalogueSearchParams(params);

  return (
    <CataloguePage channel="acheter" title={TITLE} filters={filters} />
  );
}
