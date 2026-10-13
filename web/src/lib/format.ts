export function formatFcfa(amount: number | null | undefined): string {
  if (amount == null) return "Prix sur demande";
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

/** Compact price for map pins (Airbnb-style). */
export function formatFcfaCompact(amount: number | null | undefined): string {
  if (amount == null) return "—";
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toLocaleString("fr-FR", {
      maximumFractionDigits: 1,
    })} Md`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toLocaleString("fr-FR", {
      maximumFractionDigits: 1,
    })} M`;
  }
  if (amount >= 1_000) {
    return `${Math.round(amount / 1_000).toLocaleString("fr-FR")} k`;
  }
  return amount.toLocaleString("fr-FR");
}

export function propertyTypeLabel(type: string): string {
  const map: Record<string, string> = {
    LAND: "Terrain",
    HOUSE: "Maison",
    APARTMENT: "Appartement",
    OFFICE: "Bureau",
  };
  return map[type] ?? type;
}

export function transactionLabel(type: string): string {
  const map: Record<string, string> = {
    SALE: "Vente",
    RENT: "Location",
    SHORT_TERM_RENT: "Location courte durée",
    RENT_TO_OWN: "Location-vente",
    INSTALLMENT_SALE: "Vente étalée",
  };
  return map[type] ?? type;
}

export function pricePeriodSuffix(period: string | null | undefined): string {
  switch (period) {
    case "NIGHT":
      return " / nuit";
    case "WEEK":
      return " / semaine";
    case "MONTH":
      return " / mois";
    default:
      return "";
  }
}

/** Default price period for a transaction type. */
export function defaultPricePeriod(
  transaction: string,
  explicit?: "MONTH" | "NIGHT" | "WEEK" | null,
): "MONTH" | "NIGHT" | "WEEK" {
  if (explicit) return explicit;
  if (transaction === "SHORT_TERM_RENT") return "NIGHT";
  if (transaction === "RENT") return "MONTH";
  return "MONTH";
}

export function rentTypeLabel(listing: {
  transaction: string;
  alsoShortTerm?: boolean | null;
}): string {
  if (listing.transaction === "SHORT_TERM_RENT") {
    return "Location courte durée";
  }
  if (listing.transaction === "RENT" && listing.alsoShortTerm) {
    return "Location classique + courte durée";
  }
  if (listing.transaction === "RENT") return "Location classique";
  return transactionLabel(listing.transaction);
}
