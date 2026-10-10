import Link from "next/link";
import { Suspense } from "react";
import type { CatalogueChannel } from "@/lib/listings/public-query";
import { listPublicListings } from "@/lib/listings/public-query";
import type { CatalogueFilters } from "@/lib/listings/public-query";
import { listMapPins } from "@/lib/listings/map-pins";
import { CatalogueFilters as FiltersForm } from "@/components/catalogue-filters";
import { CatalogueMap } from "@/components/catalogue-map";
import { ListingCard } from "@/components/listing-card";
import { CatalogueEmpty } from "@/components/catalogue-empty";

export async function CataloguePage({
  channel,
  title,
  subtitle,
  filters,
}: {
  channel: CatalogueChannel;
  title: string;
  subtitle: string;
  filters: CatalogueFilters;
}) {
  const [{ items, nextCursor }, pins] = await Promise.all([
    listPublicListings(channel, filters),
    listMapPins(channel, filters),
  ]);

  const qs = new URLSearchParams();
  if (filters.city) qs.set("city", filters.city);
  if (filters.quartier) qs.set("quartier", filters.quartier);
  if (filters.propertyType) qs.set("propertyType", filters.propertyType);
  if (filters.paperType) qs.set("paperType", filters.paperType);
  if (filters.transaction) qs.set("transaction", filters.transaction);
  if (filters.priceMin != null) qs.set("priceMin", String(filters.priceMin));
  if (filters.priceMax != null) qs.set("priceMax", String(filters.priceMax));
  if (nextCursor) qs.set("cursor", nextCursor);
  const moreHref = nextCursor
    ? `/${channel}?${qs.toString()}`
    : null;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-2xl text-[var(--color-muted)]">{subtitle}</p>

      <div className="mt-8">
        <Suspense fallback={<p className="text-sm text-[var(--color-muted)]">Filtres…</p>}>
          <FiltersForm channel={channel} />
        </Suspense>
      </div>

      <CatalogueMap pins={pins} channel={channel} />

      {items.length === 0 ? (
        <CatalogueEmpty channel={channel} />
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {items.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {moreHref ? (
        <div className="mt-10 flex justify-center">
          <Link
            href={moreHref}
            className="rounded-md border border-[var(--color-steel)] px-4 py-2 text-sm"
          >
            Voir plus
          </Link>
        </div>
      ) : null}
    </main>
  );
}
