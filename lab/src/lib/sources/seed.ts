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
  // Discovery round 2 (24/11/2026) — sorted by volume
  { slug: "loger-dakar", name: "Loger-Dakar", baseUrl: "https://www.loger-dakar.com", listingUrl: "https://www.loger-dakar.com/properties/", kind: "PORTAL", priority: 0, notes: "~1 700 annonces (WordPress), Dakar + Petite Côte. Lien CGU du footer = #." },
  { slug: "logersenegal", name: "Loger Sénégal", baseUrl: "https://logersenegal.com", listingUrl: "https://logersenegal.com/annonces/", kind: "PORTAL", priority: 0, notes: "~1 222 annonces (102 pages). /cgu sans clause robots. Cloudflare bloque ClaudeBot/GPTBot nommément — UA honnête uniquement." },
  { slug: "jiji-sn", name: "Jiji Sénégal", baseUrl: "https://jiji.sn", listingUrl: "https://jiji.sn/real-estate", kind: "CLASSIFIEDS", priority: 1, notes: "886 annonces immo. rules.html interdit de collecter téléphones/emails des utilisateurs sans consentement → décision requise avant crawl." },
  { slug: "immooz-sn", name: "Immooz Sénégal", baseUrl: "https://immooz.com", listingUrl: "https://immooz.com/sn/acheter/", kind: "PORTAL", priority: 1, notes: "~210 ventes + locations. /sn/cgu sans clause robots." },
  { slug: "immolux-sn", name: "Immolux", baseUrl: "https://immolux.sn", listingUrl: "https://immolux.sn/annonces", kind: "PORTAL", priority: 2, notes: "173 biens actifs, sitemap." },
  { slug: "immo-senegal", name: "Immo-Sénégal", baseUrl: "https://www.immo-senegal.com", listingUrl: "https://www.immo-senegal.com/immobilier", kind: "AGGREGATOR", priority: 2, notes: "157 annonces, flux d'agences synchronisés. Pas de CGU." },
  { slug: "appart-sn", name: "Appart.sn", baseUrl: "https://www.appart.sn", listingUrl: "https://www.appart.sn/immobilier-dakar.html", kind: "PORTAL", priority: 2, notes: "248 annonces, peu actif (dernières mai–juin 2026). Clause PI générique." },
  { slug: "green-acres-sn", name: "Green-Acres Sénégal", baseUrl: "https://www.green-acres.fr", listingUrl: "https://www.green-acres.fr/maison-a-vendre?searchQuery=cn-sn", kind: "AGGREGATOR", priority: 2, notes: "568 annonces, surtout Petite Côte, prix EUR." },
  { slug: "annonces-immo-senegal", name: "Annonces Immobilières Sénégal", baseUrl: "https://annonces-immobilieres-senegal.com", listingUrl: "https://annonces-immobilieres-senegal.com/annonces-immobilieres/", kind: "PORTAL", priority: 2, notes: "~600 annonces (345 terrains). CGU interdisent reproduction en nombre. mod_security 406 sur UA non navigateur." },
  { slug: "arkadia-dakar", name: "Arkadia Dakar", baseUrl: "https://en.arkadia.com", listingUrl: "https://en.arkadia.com/for-sale/dakar-g482043/", kind: "AGGREGATOR", priority: 3, notes: "132 annonces. CGU interdisent usage commercial sans accord." },
  { slug: "planete-senegal", name: "Planète-Sénégal", baseUrl: "https://www.planete-senegal.com", listingUrl: "https://www.planete-senegal.com/annonces/bycat.php?cat=4&catbis=36", kind: "CLASSIFIEDS", priority: 3, notes: "~3 600 annonces mais dormant (2020–21) — historique uniquement." },
  { slug: "diaspora-immo", name: "diaspora.immo", baseUrl: "https://diaspora.immo", listingUrl: "https://diaspora.immo/fr/annonces", kind: "PORTAL", priority: 3, notes: "47 annonces, robots très ouvert." },
  { slug: "thousand-annonces-sn", name: "1000-Annonces Sénégal", baseUrl: "https://www.1000-annonces.com", listingUrl: "https://www.1000-annonces.com/senegal/immobilier/location-CR21209000.html", kind: "CLASSIFIEDS", priority: 3 },
  { slug: "altis-immobilier", name: "Altis Immobilier", baseUrl: "https://altisimmobilier.com", listingUrl: "https://altisimmobilier.com/nos-biens-immobiliers/", kind: "AGENCY", priority: 3 },
  { slug: "monagentimmo", name: "Mon Agent Immobilier", baseUrl: "https://monagentimmo.net", listingUrl: "https://monagentimmo.net/louer-au-senegal", kind: "AGENCY", priority: 3 },
  { slug: "sakeurimmo", name: "SakeurImmo", baseUrl: "https://sakeurimmo.com", listingUrl: "https://sakeurimmo.com/annonces.html", kind: "PORTAL", priority: 3 },
  { slug: "espacevilla", name: "Espace Villa", baseUrl: "https://immobilier.espacevilla.com", kind: "PORTAL", priority: 2, notes: "« 1000+ annonces » selon snippets ; 406 sur UA non navigateur — vérif manuelle." },
  { slug: "jamesedition-sn", name: "JamesEdition Sénégal", baseUrl: "https://www.jamesedition.com", listingUrl: "https://www.jamesedition.com/real_estate/senegal", kind: "AGGREGATOR", priority: 3, notes: "Anti-bot (403)." },
  { slug: "properstar-sn", name: "Properstar Sénégal", baseUrl: "https://www.properstar.com", listingUrl: "https://www.properstar.com/senegal/buy/apartment-house", kind: "AGGREGATOR", priority: 3, notes: "Anti-bot (403), crawl-delay 10." },
  // Discovery round 3 (24/11/2026, web search) — unverified until probed
  { slug: "2simmo", name: "2Simmo", baseUrl: "https://www.2simmobilier.com", kind: "AGENCY", priority: 3 },
  { slug: "3h-immobilier", name: "3H Immobilier", baseUrl: "https://3h-immobilier.com", kind: "AGENCY", priority: 3 },
  { slug: "expat-afrique-sn", name: "Expat-Afrique Sénégal", baseUrl: "https://expat-afrique.com", listingUrl: "https://expat-afrique.com/senegal/dakar", kind: "PORTAL", priority: 3 },
  { slug: "diwaan-immo", name: "Diwaan Immo", baseUrl: "https://www.diwaan-immo.com", kind: "PORTAL", priority: 3 },
  { slug: "immothies-dakar", name: "Immothiès-Dakar", baseUrl: "https://immothies-dakar.com", listingUrl: "https://immothies-dakar.com/villa-a-vendre-dakar/", kind: "AGENCY", priority: 3 },
  { slug: "immo-star-dakar", name: "Immo Star", baseUrl: "https://www.agence-immobiliere-dakar.com", kind: "AGENCY", priority: 3 },
  { slug: "jurilux-immo", name: "Jurilux Immo", baseUrl: "https://jurilux-immo.com", kind: "AGENCY", priority: 3 },
  { slug: "immolagune", name: "Immolagune", baseUrl: "https://www.immolagune.com", listingUrl: "https://www.immolagune.com/immobilier-senegal/terrain-asc.php", kind: "AGENCY", priority: 3 },
  { slug: "pa-senegal", name: "PA Sénégal (petites annonces)", baseUrl: "https://www.pa-senegal.com", kind: "CLASSIFIEDS", priority: 3 },
  // Out of scope by decision
  { slug: "facebook", name: "Facebook (groupes / Marketplace)", baseUrl: "https://www.facebook.com", kind: "SOCIAL", priority: 3, status: "EXCLUDED", notes: "Exclu : CGU + bannissement quasi immédiat. Décision nov. 2026." },
];
