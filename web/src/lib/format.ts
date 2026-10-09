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
    RENT_TO_OWN: "Location-vente",
    INSTALLMENT_SALE: "Vente étalée",
  };
  return map[type] ?? type;
}
