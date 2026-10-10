import Link from "next/link";
import type { PublicListItem } from "@/lib/listings/public-query";
import {
  channelForTransaction,
  publicListingPath,
} from "@/lib/listings/public-query";
import { isSaleLike } from "@/lib/listings/paper";
import {
  formatFcfa,
  pricePeriodSuffix,
  propertyTypeLabel,
} from "@/lib/format";
import { formatLocationHierarchy } from "@/lib/locations/format";
import { PaperBadge } from "@/components/paper-badge";

/** DS-04 property card */
export function ListingCard({ listing }: { listing: PublicListItem }) {
  const channel = channelForTransaction(listing.transaction);
  const href = publicListingPath(channel, listing.slug ?? listing.id);
  const cover = listing.media[0]?.url;
  const badge = isSaleLike(listing.transaction) ? "À vendre" : "À louer";

  return (
    <article className="flex flex-col">
      <Link href={href} className="group block">
        <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-steel)]/15">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt=""
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[var(--color-muted)]">
              Sans photo
            </div>
          )}
          <span className="absolute left-3 top-3 rounded-[var(--radius-pill)] bg-white/95 px-3 py-1 text-xs font-medium text-[var(--color-ink)] shadow-sm">
            {badge}
          </span>
        </div>

        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
          {listing.bedrooms != null ? (
            <span>{listing.bedrooms} chambres</span>
          ) : null}
          {listing.bathrooms != null ? (
            <span>{listing.bathrooms} sdb</span>
          ) : null}
          {listing.areaM2 != null ? (
            <span>{Number(listing.areaM2).toLocaleString("fr-FR")} m²</span>
          ) : null}
          {listing.bedrooms == null &&
          listing.bathrooms == null &&
          listing.areaM2 == null
            ? propertyTypeLabel(listing.propertyType)
            : null}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold leading-snug text-[var(--color-ink)] group-hover:underline">
            {listing.title}
          </h2>
          {isSaleLike(listing.transaction) ? (
            <PaperBadge type={listing.paperType} />
          ) : null}
        </div>

        <p className="mt-2 text-lg font-semibold tabular-nums text-[var(--color-ink)]">
          {formatFcfa(listing.priceFcfa)}
          {listing.transaction === "RENT" ||
          listing.transaction === "SHORT_TERM_RENT"
            ? pricePeriodSuffix(
                listing.pricePeriod ??
                  (listing.transaction === "SHORT_TERM_RENT"
                    ? "NIGHT"
                    : "MONTH"),
              )
            : null}
        </p>
        {listing.quartierLabel || listing.city ? (
          <p className="mt-0.5 text-sm text-[var(--color-muted)]">
            {formatLocationHierarchy({
              quartier: listing.quartierLabel,
              city: listing.city,
            })}
          </p>
        ) : null}
      </Link>
    </article>
  );
}
