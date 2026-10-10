import Link from "next/link";
import { Suspense } from "react";
import type { CatalogueChannel } from "@/lib/listings/public-query";
import { listPublicListings } from "@/lib/listings/public-query";
import type { CatalogueFilters } from "@/lib/listings/public-query";
import { listMapPins } from "@/lib/listings/map-pins";
import { countPublishedByRegion } from "@/lib/listings/geo-aggregates";
import { catalogueFiltersToSearchParams } from "@/lib/listings/parse-filters";
import { CatalogueFilters as FiltersForm } from "@/components/catalogue-filters";
import { CatalogueMap } from "@/components/catalogue-map";
import { CatalogueViewToggle } from "@/components/catalogue-view-toggle";
import { CatalogueGeoNav } from "@/components/catalogue-geo-nav";
import { ListingCard } from "@/components/listing-card";
import { CatalogueEmpty } from "@/components/catalogue-empty";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { formatFcfa } from "@/lib/format";

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
  const view = filters.view ?? "list";

  const [{ items, nextCursor }, pins, regionCounts] = await Promise.all([
    listPublicListings(channel, filters),
    view === "map" ? listMapPins(channel, filters) : Promise.resolve([]),
    countPublishedByRegion(channel, filters),
  ]);

  const qs = catalogueFiltersToSearchParams(filters);
  if (nextCursor) qs.set("cursor", nextCursor);
  const moreHref = nextCursor ? `/${channel}?${qs.toString()}` : null;

  const totalHint =
    view === "map"
      ? `${pins.length} bien${pins.length > 1 ? "s" : ""} sur la carte`
      : `${items.length} bien${items.length > 1 ? "s" : ""}${nextCursor ? "+" : ""}`;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <PageBreadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { label: title },
        ]}
      />

      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-leaf)]">
            EverGreen · curated Sénégal
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-brand-serif)] text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{subtitle}</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{totalHint}</p>
        </div>
        <Suspense fallback={null}>
          <CatalogueViewToggle active={view} />
        </Suspense>
      </header>

      <Suspense
        fallback={
          <p className="text-sm text-[var(--color-muted)]">Filtres…</p>
        }
      >
        <CatalogueGeoNav regionCounts={regionCounts} />
      </Suspense>

      <Suspense
        fallback={
          <p className="text-sm text-[var(--color-muted)]">Filtres…</p>
        }
      >
        <FiltersForm channel={channel} />
      </Suspense>

      {view === "map" ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <CatalogueMap pins={pins} channel={channel} />
          <aside className="space-y-3">
            <h2 className="text-sm font-semibold text-[var(--color-muted)]">
              Résultats carte
            </h2>
            {pins.length === 0 ? (
              <p className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-4 text-sm text-[var(--color-muted)]">
                Aucun bien géolocalisé pour ces critères — passez en Liste ou
                élargissez la zone.
              </p>
            ) : (
              <ul className="max-h-[28rem] space-y-2 overflow-y-auto">
                {pins.map((pin) => (
                  <li key={pin.id}>
                    <Link
                      href={`/${channel}/${pin.slug}`}
                      className="block rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] px-4 py-3 hover:border-[var(--color-leaf)]/40"
                    >
                      <p className="font-medium text-[var(--color-ink)]">
                        {pin.title}
                      </p>
                      <p className="mt-0.5 text-sm tabular-nums text-[var(--color-muted)]">
                        {pin.priceFcfa != null
                          ? formatFcfa(pin.priceFcfa)
                          : "Prix sur demande"}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {items.length > pins.length ? (
              <p className="text-xs text-[var(--color-muted)]">
                Certains biens publiés n’ont pas de coordonnées — visibles en
                Liste uniquement.
              </p>
            ) : null}
          </aside>
        </div>
      ) : items.length === 0 ? (
        <CatalogueEmpty channel={channel} />
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {view === "list" && moreHref ? (
        <div className="mt-12 flex justify-center">
          <Link
            href={moreHref}
            className="rounded-[var(--radius-pill)] border border-[var(--color-steel)]/40 bg-[var(--color-surface)] px-6 py-2.5 text-sm font-medium"
          >
            Voir plus
          </Link>
        </div>
      ) : null}
    </main>
  );
}
