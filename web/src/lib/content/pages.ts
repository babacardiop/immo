export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "faq"; items: { q: string; a: string }[] };

export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
};

const AGENCE: ContentPage = {
  slug: "agence",
  title: "L’agence EverGreen",
  description:
    "Agence immobilière full-service au Sénégal — process clair, papiers nommés, contact direct.",
  blocks: [
    {
      type: "p",
      text: "EverGreen accompagne acheteurs, locataires et propriétaires avec un catalogue curated et une lecture sérieuse des titres. Pas de stock fantôme : ce qui est publié est vérifié en amont.",
    },
    {
      type: "h2",
      text: "Notre process",
    },
    {
      type: "ul",
      items: [
        "Qualification du besoin (budget, zone, usage, délai).",
        "Sélection de biens avec type de droit affiché (titre, bail, délibération…).",
        "Visite accompagnée et points de vigilance terrain.",
        "Mise en relation structurée — WhatsApp ou formulaire — puis suivi CRM.",
      ],
    },
    {
      type: "h2",
      text: "Pourquoi nous faire confiance",
    },
    {
      type: "ul",
      items: [
        "Pastille papier obligatoire sur chaque fiche vente.",
        "Pas de publication sans photos et critères minimums.",
        "Réponse humaine, SLA interne sur les leads entrants.",
        "Transparence sur les zones et les limites du dossier.",
      ],
    },
    {
      type: "faq",
      items: [
        {
          q: "Intervenez-vous hors Dakar ?",
          a: "Oui — nous couvrons les régions du Sénégal via un réseau et des déplacements ciblés. Les landings quartier démarrent sur les zones cœur.",
        },
        {
          q: "Proposez-vous la gestion locative ?",
          a: "Le focus V0 est transaction et mise en relation. La gestion peut être discutée au cas par cas selon le mandat.",
        },
      ],
    },
  ],
};

const GUIDES: ContentPage[] = [
  {
    slug: "acheter-au-senegal",
    title: "Acheter un bien au Sénégal",
    description:
      "Étapes, papiers et pièges courants pour un achat immobilier sécurisé au Sénégal.",
    blocks: [
      {
        type: "p",
        text: "Acheter au Sénégal demande de lire le droit attaché au bien avant de négocier le prix. Titre foncier, bail emphytéotique, délibération ou attribution n’offrent pas les mêmes garanties.",
      },
      {
        type: "h2",
        text: "Parcours type",
      },
      {
        type: "ul",
        items: [
          "Définir usage, budget tout compris et zone acceptable.",
          "Filtrer le catalogue sur le type de papier.",
          "Visiter, comparer, puis diligencer le dossier (notaire / géomètre selon le cas).",
          "Signer seulement quand la chaîne de propriété est claire.",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "Un titre foncier est-il obligatoire ?",
            a: "Non, mais c’est souvent le plus sécurisant. D’autres droits existent — l’important est de les nommer et de les vérifier.",
          },
        ],
      },
    ],
  },
  {
    slug: "louer-a-dakar",
    title: "Louer à Dakar",
    description:
      "Repères pour une location à Dakar : quartiers, budgets, et contact agent.",
    blocks: [
      {
        type: "p",
        text: "Le marché locatif dakarois bouge vite. Mieux vaut cadrer le quartier, la durée et le budget charges comprises avant de multiplier les visites.",
      },
      {
        type: "h2",
        text: "Conseils pratiques",
      },
      {
        type: "ul",
        items: [
          "Priorisez 2–3 quartiers plutôt qu’un rayon trop large.",
          "Demandez toujours l’état des lieux et les charges.",
          "Utilisez WhatsApp pour une première qualification rapide.",
        ],
      },
    ],
  },
  {
    slug: "papiers-immobiliers",
    title: "Comprendre les papiers immobiliers",
    description:
      "Titre foncier, bail, délibération : ce que signifie chaque pastille sur nos fiches.",
    blocks: [
      {
        type: "p",
        text: "Sur EverGreen, chaque bien à vendre porte une pastille papier. Voici le sens des libellés les plus fréquents — sans jargon inutile.",
      },
      {
        type: "ul",
        items: [
          "Titre foncier — propriété immatriculée, généralement la plus robuste.",
          "Bail — droit d’occupation / emphytéose selon l’acte ; durée et conditions à lire.",
          "Délibération — acte administratif local ; diligence indispensable.",
          "Autres — on précise le libellé exact plutôt qu’un fourre-tout.",
        ],
      },
    ],
  },
];

export type GlossaireEntry = {
  term: string;
  definition: string;
};

const GLOSSAIRE: GlossaireEntry[] = [
  {
    term: "Titre foncier",
    definition:
      "Acte d’immatriculation établissant un droit de propriété opposable ; référence fréquente pour sécuriser une vente.",
  },
  {
    term: "Bail emphytéotique",
    definition:
      "Bail de longue durée conférant des droits proches de la propriété, avec obligations et terme à vérifier.",
  },
  {
    term: "Délibération",
    definition:
      "Décision d’une collectivité portant attribution ou occupation ; doit être lue avec les suites administratives.",
  },
  {
    term: "Pastille papier",
    definition:
      "Indicateur EverGreen obligatoire sur les fiches vente : le type de droit affiché avant contact.",
  },
  {
    term: "SLA lead",
    definition:
      "Délai interne de prise en charge d’une demande entrante par l’équipe agent.",
  },
];

export function getAgencePage(): ContentPage {
  return AGENCE;
}

export function listGuidePages(): ContentPage[] {
  return GUIDES;
}

export function getGuidePage(slug: string): ContentPage | null {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

export function getGlossaire(): GlossaireEntry[] {
  return GLOSSAIRE;
}

export function resolveContentPage(
  kind: "agence" | "guide",
  slug?: string,
): ContentPage | null {
  if (kind === "agence") return getAgencePage();
  if (!slug) return null;
  return getGuidePage(slug);
}
