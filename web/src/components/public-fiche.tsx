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
  rentTypeLabel,
  transactionLabel,
} from "@/lib/format";
import {
  amenityLabel,
  offersShortTerm,
} from "@/lib/listings/amenities";
import { formatLocationHierarchy } from "@/lib/locations/format";
import { buildListingJsonLd } from "@/lib/seo/jsonld-listing";
import { absoluteUrl } from "@/lib/seo/site";
import { listingInquiryText } from "@/lib/whatsapp";
import { PaperBadge } from "@/components/paper-badge";
import { ListingGallery } from "@/components/listing-gallery";
import { WhatsAppCta } from "@/components/wa-cta";
import { LeadForm } from "@/components/lead-form";
import { VisitRequestForm } from "@/components/leads/visit-request-form";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

/** DS-16 listing fiche */
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
  const statusBadge = isSaleLike(listing.transaction) ? "À vendre" : "À louer";
  const waText = listingInquiryText({
    title: listing.title,
    reference: listing.reference,
    url: absoluteUrl(path),
  });

  const specs: { label: string; value: string }[] = [];
  if (listing.bedrooms != null)
    specs.push({ label: "Chambres", value: String(listing.bedrooms) });
  if (listing.bathrooms != null)
    specs.push({ label: "Salles de bain", value: String(listing.bathrooms) });
  if (listing.areaM2 != null)
    specs.push({
      label: "Surface",
      value: `${Number(listing.areaM2).toLocaleString("fr-FR")} m²`,
    });

  const shortStay = offersShortTerm(listing);
  const isDual =
    listing.transaction === "RENT" && Boolean(listing.alsoShortTerm);
  const typeLine = isSaleLike(listing.transaction)
    ? transactionLabel(listing.transaction)
    : rentTypeLabel(listing);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8 sm:py-10 pb-28">
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
        <div className="relative">
          <ListingGallery images={images} title={listing.title} />
          <span className="absolute left-4 top-4 z-10 rounded-[var(--radius-pill)] bg-[var(--color-olive)] px-3 py-1 text-xs font-medium text-white shadow-sm">
            {statusBadge}
          </span>
        </div>

        <aside className="rounded-[var(--radius-card)] border border-[var(--color-steel)]/25 bg-[var(--color-surface)] p-6 sm:p-8">
          <p className="text-sm text-[var(--color-muted)]">
            {typeLine} · {propertyTypeLabel(listing.propertyType)}
            {listing.reference ? ` · ${listing.reference}` : ""}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="font-[family-name:var(--font-brand-serif)] text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              {listing.title}
            </h1>
            {isSaleLike(listing.transaction) ? (
              <PaperBadge type={listing.paperType} />
            ) : null}
          </div>
          <p className="mt-3 text-3xl font-semibold tabular-nums text-[var(--color-olive)]">
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
          {isDual && listing.shortTermPriceFcfa != null ? (
            <p className="mt-1 text-lg font-semibold tabular-nums text-[var(--color-ink)]">
              {formatFcfa(listing.shortTermPriceFcfa)}
              <span className="text-sm font-normal text-[var(--color-muted)]">
                {pricePeriodSuffix(listing.shortTermPricePeriod ?? "NIGHT")}{" "}
                · courte durée
              </span>
            </p>
          ) : null}
          <p className="mt-1 text-[var(--color-muted)]">
            {formatLocationHierarchy({
              quartier: listing.quartierLabel,
              commune: listing.communeLabel,
              city: listing.city,
            })}
          </p>

          {specs.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-5 text-sm text-[var(--color-muted)]">
              {specs.map((s) => (
                <li key={s.label} className="flex flex-col gap-0.5">
                  <span className="text-base font-semibold tabular-nums text-[var(--color-ink)]">
                    {s.value}
                  </span>
                  <span className="text-xs">{s.label}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {shortStay ? (
            <section className="mt-6 border-t border-[var(--color-steel)]/25 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                Location courte durée
              </h2>
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-[var(--color-muted)]">Type de location</dt>
                  <dd className="font-medium text-[var(--color-ink)]">
                    {rentTypeLabel(listing)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[var(--color-muted)]">Meublé</dt>
                  <dd className="font-medium text-[var(--color-ink)]">
                    {listing.furnished == null
                      ? "—"
                      : listing.furnished
                        ? "Oui"
                        : "Non"}
                  </dd>
                </div>
                {listing.minStayDays != null ? (
                  <div>
                    <dt className="text-[var(--color-muted)]">
                      Séjour minimum
                    </dt>
                    <dd className="font-medium text-[var(--color-ink)]">
                      {listing.minStayDays} jour
                      {listing.minStayDays > 1 ? "s" : ""}
                    </dd>
                  </div>
                ) : null}
              </dl>
              {listing.furnished && listing.amenities.length > 0 ? (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                    Commodités
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {listing.amenities.map((id) => (
                      <li
                        key={id}
                        className="rounded-[var(--radius-pill)] bg-[var(--color-bg)] px-3 py-1 text-xs font-medium text-[var(--color-ink)]"
                      >
                        {amenityLabel(id)}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
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

          <div className="mt-8" id="demande">
            {channel === "louer" ? (
              <>
                <h2 className="text-lg font-semibold">Demander une visite</h2>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  Sans créer de compte — un conseiller vous rappelle.
                </p>
                <div className="mt-3">
                  <VisitRequestForm listingId={listing.id} />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold">Demander des infos</h2>
                <div className="mt-3">
                  <LeadForm
                    listingId={listing.id}
                    sourceDetail="form_fiche"
                    defaultIntent="buy"
                    waText={waText}
                  />
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Sticky Contacter / WhatsApp bar — DS-16 */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-[var(--color-ink)] px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3">
          <a
            href="#demande"
            className="inline-flex flex-1 items-center justify-center rounded-[var(--radius-pill)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] min-w-[140px]"
          >
            Contacter
          </a>
          <WhatsAppCta
            text={waText}
            phoneE164={listing.waPhone}
            label="WhatsApp"
            className="flex-1 justify-center bg-[var(--color-leaf)] text-white min-w-[140px] hover:opacity-90"
          />
        </div>
      </div>
    </main>
  );
}
