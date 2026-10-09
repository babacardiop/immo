import type { Listing, MediaAsset, PropertyType } from "@prisma/client";
import { paperLabel } from "@/lib/listings/paper";
import { siteUrl } from "@/lib/seo/site";

type ListingForJsonLd = Listing & { media: MediaAsset[] };

function schemaType(propertyType: PropertyType): string {
  switch (propertyType) {
    case "HOUSE":
      return "House";
    case "APARTMENT":
      return "Apartment";
    case "OFFICE":
      return "Accommodation";
    case "LAND":
    default:
      return "LandForm";
  }
}

export function buildListingJsonLd(
  listing: ListingForJsonLd,
  path: string,
): Record<string, unknown> {
  const url = `${siteUrl()}${path}`;
  const images = listing.media
    .map((m) => m.url)
    .filter((u): u is string => !!u);

  const entity: Record<string, unknown> = {
    "@type": schemaType(listing.propertyType),
    name: listing.title,
    description: listing.description ?? undefined,
    url,
    image: images.length ? images : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.city ?? undefined,
      addressRegion: listing.quartierLabel ?? undefined,
      addressCountry: "SN",
      streetAddress: listing.addressPublic ?? undefined,
    },
  };

  if (listing.geoLat != null && listing.geoLng != null) {
    entity.geo = {
      "@type": "GeoCoordinates",
      latitude: listing.geoLat,
      longitude: listing.geoLng,
    };
  }

  if (listing.areaM2 != null) {
    entity.floorSize = {
      "@type": "QuantitativeValue",
      value: Number(listing.areaM2),
      unitCode: "MTK",
    };
  }

  if (listing.paperType) {
    entity.additionalProperty = [
      {
        "@type": "PropertyValue",
        name: "Papier",
        value: paperLabel(listing.paperType),
      },
    ];
  }

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    url,
    datePosted: listing.publishedAt?.toISOString(),
    offers: {
      "@type": "Offer",
      price: listing.priceFcfa ?? undefined,
      priceCurrency: listing.currency || "XOF",
      availability: "https://schema.org/InStock",
    },
    mainEntity: entity,
  };
}
