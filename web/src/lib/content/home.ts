export type HomeStat = { value: string; label: string };

export type HomeFaqItem = { q: string; a: string };

export type HomeTestimonial = {
  quote: string;
  name: string;
  role: string;
  portraitSrc: string;
};

export function getHomeStats(): HomeStat[] {
  return [
    { value: "100%", label: "Clients accompagnés" },
    { value: "500+", label: "Biens suivis" },
    { value: "14", label: "Régions couvertes" },
    { value: "200+", label: "Avis positifs" },
  ];
}

export function getHomeFaq(): HomeFaqItem[] {
  return [
    {
      q: "Quels types de biens proposez-vous ?",
      a: "Terrains, maisons, appartements et bureaux — à vendre ou à louer — avec type de droit affiché sur chaque fiche vente.",
    },
    {
      q: "Comment savoir si un bien est un bon investissement ?",
      a: "On croise zone, papier, prix et votre usage. Les simulateurs et une visite accompagnée aident à trancher avant engagement.",
    },
    {
      q: "Faut-il un agent pour acheter au Sénégal ?",
      a: "Ce n’est pas obligatoire, mais un accompagnement réduit les risques sur titres, délais et négociation — surtout depuis l’étranger.",
    },
    {
      q: "Puis-je visiter avant d’acheter ?",
      a: "Oui. Contactez-nous sur WhatsApp ou via le formulaire : on organise une visite selon le stock publié.",
    },
    {
      q: "Que signifie la pastille papier ?",
      a: "Elle nomme le type de droit (titre foncier, bail, délibération…). Obligatoire sur nos annonces à vendre.",
    },
  ];
}

export function getHomeTestimonials(): HomeTestimonial[] {
  return [
    {
      quote:
        "Équipe claire et réactive. On a trouvé un bien avec le bon papier, sans pression inutile.",
      name: "Aïssatou D.",
      role: "Acquéreuse · Dakar",
      portraitSrc: "/images/testimonial-portrait.jpg",
    },
    {
      quote:
        "Depuis l’étranger, le suivi WhatsApp et la lecture du dossier m’ont rassuré avant le transfert.",
      name: "Ibrahima N.",
      role: "Diaspora · France",
      portraitSrc: "/images/testimonial-portrait.jpg",
    },
    {
      quote:
        "Location trouvée rapidement à Mermoz. Transparence sur les charges et les délais.",
      name: "Mamadou S.",
      role: "Locataire",
      portraitSrc: "/images/testimonial-portrait.jpg",
    },
  ];
}

export function getHomeSectionOrder(): string[] {
  return [
    "hero",
    "story",
    "stats",
    "discover",
    "premier",
    "faq",
    "testimonials",
    "cta",
  ];
}
