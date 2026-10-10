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
  const badge = isSaleLike(listing.transaction) ? "À vendre" : "À louer";
  const meta: string[] = [];
  if (listing.bedrooms != null) meta.push(`${listing.bedrooms} ch.`);
  if (listing.bathrooms != null) meta.push(`${listing.bathrooms} sdb`);
  if (listing.areaM2 != null) meta.push(`${listing.areaM2} m²`);

  return (
    <article className="flex flex-col">
      <Link href={href} className="group block">
        <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-steel)]/20">
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
          <span className="absolute left-3 top-3 rounded-[var(--radius-pill)] bg-white/95 px-3 py-1 text-xs font-medium text-[var(--color-ink)]">
            {badge}
          </span>
        </div>
        {meta.length > 0 ? (
          <p className="text-xs text-[var(--color-muted)]">{meta.join(" · ")}</p>
        ) : (
          <p className="text-xs text-[var(--color-muted)]">
            {propertyTypeLabel(listing.propertyType)}
          </p>
        )}
        <div className="mt-1 flex flex-wrap items-start justify-between gap-2">
          <h2 className="text-lg font-semibold leading-snug text-[var(--color-ink)] group-hover:underline">
            {listing.title}
          </h2>
          {isSaleLike(listing.transaction) ? (
            <PaperBadge type={listing.paperType} />
          ) : null}
        </div>
        <p className="mt-2 font-medium tabular-nums">
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
          {listing.quartierLabel || listing.city ? (
            <span className="ml-2 text-sm font-normal text-[var(--color-muted)]">
              {formatLocationHierarchy({
                quartier: listing.quartierLabel,
                city: listing.city,
              })}
            </span>
          ) : null}
        </p>
      </Link>
    </article>
  );
}
