import { Suspense } from "react";
import type { CatalogueChannel } from "@/lib/listings/public-query";
import { listPublicListings } from "@/lib/listings/public-query";
import type { CatalogueFilters } from "@/lib/listings/public-query";
import { listMapPins } from "@/lib/listings/map-pins";
import { CatalogueFilters as FiltersForm } from "@/components/catalogue-filters";
import { CatalogueMap } from "@/components/catalogue-map";
import { CatalogueViewToggle } from "@/components/catalogue-view-toggle";
import { CataloguePagination } from "@/components/catalogue-pagination";
import { ListingCard } from "@/components/listing-card";
import { CatalogueEmpty } from "@/components/catalogue-empty";

export async function CataloguePage({
  channel,
  title,
  filters,
}: {
  channel: CatalogueChannel;
  title: string;
  /** @deprecated kept optional for callers — not shown */
  subtitle?: string;
  filters: CatalogueFilters;
}) {
  const view = filters.view ?? "list";

  const [{ items, page, totalPages }, pins] = await Promise.all([
    view === "list"
      ? listPublicListings(channel, filters)
      : Promise.resolve({
          items: [],
          total: 0,
          page: 1,
          pageSize: 24,
          totalPages: 1,
        }),
    view === "map" ? listMapPins(channel, filters) : Promise.resolve([]),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 sm:py-10">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          {title}
        </h1>
        <Suspense fallback={null}>
          <CatalogueViewToggle active={view} />
        </Suspense>
      </header>

      <Suspense fallback={null}>
        <FiltersForm channel={channel} />
      </Suspense>

      {view === "map" ? (
        <div className="mt-6">
          <CatalogueMap pins={pins} channel={channel} />
        </div>
      ) : items.length === 0 ? (
        <CatalogueEmpty channel={channel} />
      ) : (
        <>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          <CataloguePagination
            channel={channel}
            filters={filters}
            page={page}
            totalPages={totalPages}
          />
        </>
      )}
    </main>
  );
}
