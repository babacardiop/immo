/** Commodités courte durée (meublé). */
export const RENTAL_AMENITIES = [
  { id: "clim", label: "Climatiseur" },
  { id: "ventilateur", label: "Ventilateur" },
  { id: "frigo", label: "Frigo" },
  { id: "cuisiniere", label: "Cuisinière" },
  { id: "wifi", label: "Wi-Fi" },
  { id: "tv", label: "TV" },
  { id: "lave-linge", label: "Lave-linge" },
  { id: "parking", label: "Parking" },
  { id: "generateur", label: "Groupe électrogène" },
  { id: "eau-chaude", label: "Eau chaude" },
] as const;

export type RentalAmenityId = (typeof RENTAL_AMENITIES)[number]["id"];

const LABEL_BY_ID = Object.fromEntries(
  RENTAL_AMENITIES.map((a) => [a.id, a.label]),
) as Record<string, string>;

export function amenityLabel(id: string): string {
  return LABEL_BY_ID[id] ?? id;
}

export function offersShortTerm(listing: {
  transaction: string;
  alsoShortTerm?: boolean | null;
}): boolean {
  return (
    listing.transaction === "SHORT_TERM_RENT" ||
    (listing.transaction === "RENT" && Boolean(listing.alsoShortTerm))
  );
}

export function parseAmenitiesForm(formData: FormData): string[] {
  const raw = formData.getAll("amenities").map(String);
  const allowed = new Set(RENTAL_AMENITIES.map((a) => a.id));
  return [...new Set(raw.filter((id) => allowed.has(id as RentalAmenityId)))];
}
