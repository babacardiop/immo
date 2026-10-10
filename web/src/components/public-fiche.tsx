import { notFound } from "next/navigation";
import type { CatalogueChannel } from "@/lib/listings/public-query";
import {
  channelForTransaction,
  getPublishedListingBySlug,
  publicListingPath,
} from "@/lib/listings/public-query";
import { isSaleLike } from "@/lib/listings/paper";
import {
  formatFcfa,
  pricePeriodSuffix,
  propertyTypeLabel,
  transactionLabel,
} from "@/lib/format";
import { formatLocationHierarchy } from "@/lib/locations/format";
import { buildListingJsonLd } from "@/lib/seo/jsonld-listing";
import { absoluteUrl } from "@/lib/seo/site";
import { listingInquiryText } from "@/lib/whatsapp";
import { PaperBadge } from "@/components/paper-badge";
import { ListingGallery } from "@/components/listing-gallery";
import { WhatsAppCta } from "@/components/wa-cta";
import { LeadForm } from "@/components/lead-form";

export async function PublicFiche({
  channel,
  slug,
}: {
  channel: CatalogueChannel;
  slug: string;
}) {
  const listing = await getPublishedListingBySlug(slug);
  if (!listing) notFound();

  const expected = channelForTransaction(listing.transaction);
  if (expected !== channel) notFound();

  const path = publicListingPath(channel, listing.slug ?? slug);
  const jsonLd = buildListingJsonLd(listing, path);
  const images = listing.media
    .filter((m) => m.url)
    .map((m) => ({ url: m.url!, alt: m.alt }));

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ListingGallery images={images} title={listing.title} />

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--color-muted)]">
            {transactionLabel(listing.transaction)} ·{" "}
            {propertyTypeLabel(listing.propertyType)}
            {listing.reference ? ` · ${listing.reference}` : ""}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {listing.title}
          </h1>
          <p className="mt-2 text-[var(--color-muted)]">
            {formatLocationHierarchy({
              quartier: listing.quartierLabel,
              city: listing.city,
            })}
          </p>
          {isSaleLike(listing.transaction) ? (
            <div className="mt-3">
              <PaperBadge type={listing.paperType} />
            </div>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold">
            {formatFcfa(listing.priceFcfa)}
            {listing.transaction === "RENT" ||
            listing.transaction === "SHORT_TERM_RENT" ? (
              <span className="text-base font-normal text-[var(--color-muted)]">
                {pricePeriodSuffix(
                  listing.pricePeriod ??
                    (listing.transaction === "SHORT_TERM_RENT"
                      ? "NIGHT"
                      : "MONTH"),
                )}
              </span>
            ) : null}
          </p>
          <div className="mt-3">
            <WhatsAppCta
              text={listingInquiryText({
                title: listing.title,
                reference: listing.reference,
                url: absoluteUrl(path),
              })}
              phoneE164={listing.waPhone}
              label="Contacter sur WhatsApp"
            />
          </div>
        </div>
      </div>

      {listing.description ? (
        <section className="mt-10 max-w-3xl">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="mt-3 whitespace-pre-wrap leading-relaxed text-[var(--color-ink)]/90">
            {listing.description}
          </p>
        </section>
      ) : null}

      <section className="mt-10 grid gap-3 text-sm sm:grid-cols-2">
        {listing.areaM2 != null ? (
          <p>
            <span className="text-[var(--color-muted)]">Surface · </span>
            {Number(listing.areaM2).toLocaleString("fr-FR")} m²
          </p>
        ) : null}
        {listing.addressPublic ? (
          <p>
            <span className="text-[var(--color-muted)]">Adresse · </span>
            {listing.addressPublic}
          </p>
        ) : null}
      </section>

      <section className="mt-12 border-t border-[var(--color-steel)]/30 pt-10">
        <h2 className="text-xl font-semibold">Demander des infos</h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Laissez vos coordonnées — réponse sous 24 h. Ou WhatsApp ci-dessus.
        </p>
        <div className="mt-4">
          <LeadForm
            listingId={listing.id}
            sourceDetail="form_fiche"
            defaultIntent={
              listing.transaction === "RENT" ||
              listing.transaction === "SHORT_TERM_RENT"
                ? "rent"
                : "buy"
            }
          />
        </div>
      </section>
    </main>
  );
}
