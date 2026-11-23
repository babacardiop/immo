import type { SourceKind, SourceStatus } from "@prisma/client";

export type SeedSource = {
  slug: string;
  name: string;
  baseUrl: string;
  listingUrl?: string;
  kind: SourceKind;
  priority: number;
  status?: SourceStatus;
  notes?: string;
};

/**
 * Candidate SN property sources (v0, Nov 2026). Several URLs come from web
 * search / lab docs and are unverified — the probe marks dead ones DEAD.
 * Add new candidates here (or via the UI later), then `npm run sources:seed`.
 */
export const SEED_SOURCES: SeedSource[] = [
  // P0 — named in docs/research-lab/strategy.md
  { slug: "expat-dakar", name: "Expat-Dakar", baseUrl: "https://www.expat-dakar.com", listingUrl: "https://www.expat-dakar.com/immobilier", kind: "CLASSIFIEDS", priority: 0 },
  { slug: "immobilier-au-senegal", name: "Immobilier au Sénégal", baseUrl: "https://www.immobilier-au-senegal.com", kind: "PORTAL", priority: 0 },
  { slug: "coinafrique-sn", name: "CoinAfrique Sénégal", baseUrl: "https://sn.coinafrique.com", listingUrl: "https://sn.coinafrique.com/categorie/immobilier", kind: "CLASSIFIEDS", priority: 0 },
  { slug: "senhectare", name: "Senhectare", baseUrl: "https://www.senhectare.com", kind: "PORTAL", priority: 1 },
  // P1 — big SN portals / classifieds
  { slug: "seneweb-immo", name: "Seneweb Immo", baseUrl: "https://seneweb.com", listingUrl: "https://seneweb.com/services/immo", kind: "CLASSIFIEDS", priority: 1 },
  { slug: "immobilier-sn", name: "Immobilier.sn", baseUrl: "https://www.immobilier.sn", kind: "PORTAL", priority: 1 },
  { slug: "keur-immo", name: "Keur Immo", baseUrl: "https://www.keur-immo.com", kind: "AGENCY", priority: 1 },
  { slug: "expat-com-sn", name: "Expat.com — Sénégal", baseUrl: "https://www.expat.com", listingUrl: "https://www.expat.com/fr/immobilier/afrique/senegal/", kind: "CLASSIFIEDS", priority: 1 },
  { slug: "tewmoutew", name: "TewMouTew", baseUrl: "https://www.tewmoutew.com", kind: "CLASSIFIEDS", priority: 2 },
  { slug: "afribaba-sn", name: "Afribaba Sénégal", baseUrl: "https://www.afribaba.sn", kind: "CLASSIFIEDS", priority: 2 },
  { slug: "lamudi-sn", name: "Lamudi Sénégal", baseUrl: "https://www.lamudi.sn", kind: "PORTAL", priority: 2 },
  { slug: "jumia-house-sn", name: "Jumia House Sénégal", baseUrl: "https://house.jumia.sn", kind: "PORTAL", priority: 3, notes: "Probablement fermé — contrôle DNS." },
  { slug: "dakar-immo", name: "Dakar-Immo", baseUrl: "https://www.dakar-immo.com", kind: "PORTAL", priority: 2 },
  { slug: "dakar-villas", name: "Dakar-Villas", baseUrl: "https://www.dakar-villas.com", kind: "PORTAL", priority: 3 },
  { slug: "senegal-property", name: "Senegal-Property", baseUrl: "https://www.senegal-property.com", kind: "PORTAL", priority: 3 },
  { slug: "lepetitjournal-dakar", name: "Le Petit Journal Dakar — annonces", baseUrl: "https://lepetitjournal.com", listingUrl: "https://lepetitjournal.com/dakar/annonces", kind: "CLASSIFIEDS", priority: 3 },
  // International aggregators (mostly Petite Côte / luxury / diaspora)
  { slug: "realigro-sn", name: "Realigro Sénégal", baseUrl: "https://senegal.realigro.com", kind: "AGGREGATOR", priority: 2 },
  { slug: "luxuryestate-sn", name: "LuxuryEstate Sénégal", baseUrl: "https://www.luxuryestate.com", listingUrl: "https://www.luxuryestate.com/senegal", kind: "AGGREGATOR", priority: 3 },
  { slug: "meretdemeures-sn", name: "Mer et Demeures Sénégal", baseUrl: "https://www.meretdemeures.com", listingUrl: "https://www.meretdemeures.com/fr/senegal/", kind: "AGGREGATOR", priority: 3 },
  { slug: "pap-sn", name: "PAP — Sénégal", baseUrl: "https://www.pap.fr", listingUrl: "https://www.pap.fr/annonce/vente-immobiliere-senegal-g131", kind: "AGGREGATOR", priority: 3, notes: "Très peu d'annonces SN." },
  { slug: "habita-sn", name: "Habita Sénégal", baseUrl: "https://habita.com", listingUrl: "https://habita.com/country/34/sngl", kind: "AGGREGATOR", priority: 3 },
  // Directories — used to discover agency sites (each agency = future source)
  { slug: "au-senegal-agences", name: "Au-Sénégal — agences", baseUrl: "https://www.au-senegal.com", kind: "DIRECTORY", priority: 2, notes: "Annuaire d'agences + annonces d'agences. Source de découverte." },
  { slug: "senego-annuaire", name: "Senego — annuaire agences", baseUrl: "https://senego.com", listingUrl: "https://senego.com/services/annuaire-agences-immobilieres", kind: "DIRECTORY", priority: 3 },
  { slug: "goafrica-sn", name: "GoAfricaOnline Sénégal", baseUrl: "https://www.goafricaonline.com", listingUrl: "https://www.goafricaonline.com/sn/annuaire/agences-immobilieres", kind: "DIRECTORY", priority: 3 },
  // Out of scope by decision
  { slug: "facebook", name: "Facebook (groupes / Marketplace)", baseUrl: "https://www.facebook.com", kind: "SOCIAL", priority: 3, status: "EXCLUDED", notes: "Exclu : CGU + bannissement quasi immédiat. Décision nov. 2026." },
];
