export type QuartierLanding = {
  slug: string;
  name: string;
  city: string;
  region: string;
  /** Filter value passed to catalogue `quartier` query param. */
  catalogueQuartier: string;
  title: string;
  description: string;
  promise: string;
  why: string[];
  faq: { q: string; a: string }[];
};

const QUARTIERS: QuartierLanding[] = [
  {
    slug: "mermoz",
    name: "Mermoz",
    city: "Dakar",
    region: "Dakar",
    catalogueQuartier: "Mermoz",
    title: "Immobilier à Mermoz — Dakar",
    description:
      "Appartements et biens curated à Mermoz : catalogue EverGreen avec type de droit affiché.",
    promise: "Catalogue curated Mermoz — papiers nommés, contact direct.",
    why: [
      "Quartier résidentiel recherché, bon équilibre standing / accessibilité.",
      "Demande locative et vente actives — stock qui tourne.",
      "Idéal pour un premier filtre avant visite accompagnée.",
    ],
    faq: [
      {
        q: "Puis-je filtrer uniquement Mermoz ?",
        a: "Oui — le bouton catalogue ouvre /acheter ou /louer avec le filtre quartier=Mermoz.",
      },
    ],
  },
  {
    slug: "almadies",
    name: "Almadies",
    city: "Dakar",
    region: "Dakar",
    catalogueQuartier: "Almadies",
    title: "Villas et appartements aux Almadies",
    description:
      "Immobilier Almadies à vendre ou à louer — sélection EverGreen, pastille papier obligatoire.",
    promise: "Front de mer et standing — biens vérifiés avant publication.",
    why: [
      "Zone premium pour villas, appartements et bureaux légers.",
      "Forte demande diaspora et cadres expatriés.",
      "Nous affichons toujours le type de droit sur les ventes.",
    ],
    faq: [
      {
        q: "Avez-vous des villas aux Almadies ?",
        a: "Le stock change chaque semaine — filtrez le catalogue ou écrivez-nous sur WhatsApp.",
      },
    ],
  },
  {
    slug: "ngor",
    name: "Ngor",
    city: "Dakar",
    region: "Dakar",
    catalogueQuartier: "Ngor",
    title: "Immobilier à Ngor — Dakar",
    description:
      "Villa ou appartement à Ngor : annonces curated EverGreen avec contact WhatsApp.",
    promise: "Ngor côté mer — sélection courte, diligence claire.",
    why: [
      "Cadre village / corniche recherché pour résidence et location saisonnière.",
      "Attention particulière aux titres et aux contraintes d’urbanisme.",
    ],
    faq: [
      {
        q: "Location courte durée possible ?",
        a: "Oui sur le canal Louer lorsque le bien est publié en location courte durée.",
      },
    ],
  },
  {
    slug: "sacre-coeur",
    name: "Sacré-Cœur",
    city: "Dakar",
    region: "Dakar",
    catalogueQuartier: "Sacré-Cœur",
    title: "Appartements à Sacré-Cœur — Dakar",
    description:
      "Immobilier Sacré-Cœur : appartements et bureaux, catalogue filtré EverGreen.",
    promise: "Centralité Dakar — habitation et usage pro léger.",
    why: [
      "Quartier dense, bien desservi, mixte résidentiel / bureaux.",
      "Bon point d’entrée pour investisseurs locatifs.",
    ],
    faq: [
      {
        q: "Proposez-vous des bureaux ?",
        a: "Oui lorsque le type de bien est publié comme bureau sur le catalogue.",
      },
    ],
  },
  {
    slug: "point-e",
    name: "Point E",
    city: "Dakar",
    region: "Dakar",
    catalogueQuartier: "Point E",
    title: "Location et vente au Point E",
    description:
      "Biens au Point E — standing locatif et vente, sélection EverGreen.",
    promise: "Point E pour un standing urbain maîtrisé.",
    why: [
      "Forte demande location standing.",
      "Proximité universités et axes structurants.",
    ],
    faq: [
      {
        q: "Comment voir les annonces Point E ?",
        a: "Utilisez le CTA catalogue — le filtre quartier est prérempli.",
      },
    ],
  },
  {
    slug: "plateau",
    name: "Plateau",
    city: "Dakar",
    region: "Dakar",
    catalogueQuartier: "Plateau",
    title: "Immobilier au Plateau — Dakar",
    description:
      "Bureaux et logements au Plateau : annonces curated, contact agent EverGreen.",
    promise: "Cœur administratif — bureaux et pieds-à-terre.",
    why: [
      "Zone business historique de Dakar.",
      "Usage pro dominant, quelques résidences.",
    ],
    faq: [
      {
        q: "Stock bureaux disponible ?",
        a: "Filtrez par type de bien sur le catalogue après le CTA Plateau.",
      },
    ],
  },
];

export function listQuartierLandings(): QuartierLanding[] {
  return QUARTIERS;
}

export function getQuartierLanding(slug: string): QuartierLanding | null {
  const normalized = slug.trim().toLowerCase();
  return QUARTIERS.find((q) => q.slug === normalized) ?? null;
}

export function quartierCatalogueHref(
  landing: QuartierLanding,
  channel: "acheter" | "louer" = "acheter",
): string {
  const qs = new URLSearchParams({
    city: landing.city,
    quartier: landing.catalogueQuartier,
  });
  return `/${channel}?${qs.toString()}`;
}
