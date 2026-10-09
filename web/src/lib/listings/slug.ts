export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Expat-Dakar style: descriptive words + unique ref suffix.
 * e.g. terrains-a-vendre-a-niague-eg-t-042
 */
export function buildListingSlug(input: {
  title: string;
  reference: string;
  city?: string | null;
  transaction?: string | null;
  propertyType?: string | null;
}): string {
  const transactionHint: Record<string, string> = {
    SALE: "a-vendre",
    RENT: "a-louer",
    RENT_TO_OWN: "location-vente",
    INSTALLMENT_SALE: "vente-etalee",
  };
  const typeHint: Record<string, string> = {
    LAND: "terrain",
    HOUSE: "maison",
    APARTMENT: "appartement",
    OFFICE: "bureau",
  };

  const parts = [
    typeHint[input.propertyType ?? ""] ?? "",
    slugify(input.title),
    transactionHint[input.transaction ?? ""] ?? "",
    input.city ? `a-${slugify(input.city)}` : "",
    slugify(input.reference),
  ].filter(Boolean);

  const joined = parts.join("-").replace(/-+/g, "-");
  return joined.slice(0, 120) || `annonce-${slugify(input.reference) || "ref"}`;
}

export function listingPath(slug: string) {
  return `/espace/agent/annonces/${slug}`;
}
