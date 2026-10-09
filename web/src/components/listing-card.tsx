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

export function ListingCard({ listing }: { listing: PublicListItem }) {
  const channel = channelForTransaction(listing.transaction);
  const href = publicListingPath(channel, listing.slug ?? listing.id);
  const cover = listing.media[0]?.url;

  return (
    <article className="flex flex-col overflow-hidden border-b border-[var(--color-steel)]/40 pb-6">
      <Link href={href} className="group block">
        <div className="relative mb-3 aspect-[4/3] overflow-hidden bg-[var(--color-steel)]/20">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[var(--color-muted)]">
              Sans photo
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-lg font-semibold leading-snug group-hover:underline">
            {listing.title}
          </h2>
          {isSaleLike(listing.transaction) ? (
            <PaperBadge type={listing.paperType} />
          ) : null}
        </div>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          {propertyTypeLabel(listing.propertyType)}
          {listing.quartierLabel || listing.city
            ? ` · ${formatLocationHierarchy({
                quartier: listing.quartierLabel,
                city: listing.city,
              })}`
            : ""}
        </p>
        <p className="mt-2 font-medium">
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
      </Link>
    </article>
  );
}
