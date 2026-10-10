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
import { PageShell } from "@/components/page-shell";

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
    <PageShell
      crumbs={[
        { href: "/", label: "Accueil" },
        { label: title },
      ]}
      title={title}
      description={subtitle}
    >
      <Suspense
        fallback={
          <p className="text-sm text-[var(--color-muted)]">Filtres…</p>
        }
      >
        <FiltersForm channel={channel} />
      </Suspense>

      <CatalogueMap pins={pins} channel={channel} />

      {items.length === 0 ? (
        <CatalogueEmpty channel={channel} />
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {moreHref ? (
        <div className="mt-10 flex justify-center">
          <Link
            href={moreHref}
            className="rounded-[var(--radius-pill)] border border-[var(--color-steel)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-medium"
          >
            Voir plus
          </Link>
        </div>
      ) : null}
    </PageShell>
  );
}
