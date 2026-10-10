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
import { PageBreadcrumb } from "@/components/page-breadcrumb";

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

  const channelLabel = channel === "acheter" ? "Acheter" : "Louer";
  const meta: string[] = [];
  if (listing.bedrooms != null) meta.push(`${listing.bedrooms} ch.`);
  if (listing.bathrooms != null) meta.push(`${listing.bathrooms} sdb`);
  if (listing.areaM2 != null) {
    meta.push(`${Number(listing.areaM2).toLocaleString("fr-FR")} m²`);
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageBreadcrumb
        items={[
          { href: "/", label: "Accueil" },
          { href: `/${channel}`, label: channelLabel },
          { label: listing.title },
        ]}
      />

      <div className="mt-2 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <ListingGallery images={images} title={listing.title} />

        <aside className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-6 sm:p-8">
          <p className="text-sm text-[var(--color-muted)]">
            {transactionLabel(listing.transaction)} ·{" "}
            {propertyTypeLabel(listing.propertyType)}
            {listing.reference ? ` · ${listing.reference}` : ""}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-[var(--color-ink)]">
              {listing.title}
            </h1>
            {isSaleLike(listing.transaction) ? (
              <PaperBadge type={listing.paperType} />
            ) : null}
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums">
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
          <p className="mt-1 text-[var(--color-muted)]">
            {formatLocationHierarchy({
              quartier: listing.quartierLabel,
              city: listing.city,
            })}
          </p>

          {meta.length > 0 ? (
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              {meta.join(" · ")}
            </p>
          ) : null}

          {listing.description ? (
            <section className="mt-6 border-t border-[var(--color-steel)]/25 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                Description
              </h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-ink)]/90">
                {listing.description}
              </p>
            </section>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#demande"
              className="inline-flex flex-1 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] min-w-[140px]"
            >
              Contacter
            </a>
            <WhatsAppCta
              text={listingInquiryText({
                title: listing.title,
                reference: listing.reference,
                url: absoluteUrl(path),
              })}
              phoneE164={listing.waPhone}
              label="WhatsApp"
              className="flex-1 justify-center bg-[var(--color-leaf)] text-white min-w-[140px]"
            />
          </div>
        </aside>
      </div>

      <section
        id="demande"
        className="mt-12 rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-6 sm:p-8"
      >
        <h2 className="text-xl font-semibold">Demander des infos</h2>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          Laissez vos coordonnées — réponse sous 24 h. Ou WhatsApp ci-dessus.
        </p>
        <div className="mt-4 max-w-md">
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
