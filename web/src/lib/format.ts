export function formatFcfa(amount: number | null | undefined): string {
  if (amount == null) return "Prix sur demande";
  return `${amount.toLocaleString("fr-FR")} FCFA`;
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
): "MONTH" | "NIGHT" | "WEEK" {
  if (transaction === "SHORT_TERM_RENT") return "NIGHT";
  if (transaction === "RENT") return "MONTH";
  return "MONTH";
}
