# Guides & pages outils SEO / Blog

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `05-guides-seo.md` |
| **Priorité** | **P0** |
| **Catégorie** | Acquisition / Contenu |
| **Synthèse** | Blog + guides décisionnels FR à très haute valeur ajoutée, indexables, branchés simulateurs et add-ons. |

> **Stratégie complète :** [`docs/blog/strategie.md`](../../blog/strategie.md)  
> Calendrier : [`docs/blog/calendrier-editorial.md`](../../blog/calendrier-editorial.md)  
> Briefs : [`docs/blog/briefs/`](../../blog/briefs/)

## 1. Problème client

Sans contenus d'aide à la décision, Google et WhatsApp envoient les prospects vers classifieds ou "tonton qui connaît un terrain". Le blog doit **réduire le risque** et **amener vers nos outils**.

## 2. Réalité marché (recherche)

Les contenus qui performent au SN sont des **guides longs** (TF vs bail, NICAD, arnaques, frais notaire, construction m², diaspora, TeleDAC). Benchmark détaillé : [`docs/blog/benchmark-editorial.md`](../../blog/benchmark-editorial.md) — Keur City = or historique ; ImmoConnexion / MyAfric / SenPages / SamaGalle = peloton actif.

## 3. Utilisateurs & synergies

- **Users:** primo-acquéreur, diaspora, bailleur, locataire
- **Synergie:** chaque pilier → CTA simulateur / diligence / caution / catalogue

## 4. Inputs

- MDX / CMS
- Validation métier + chiffres datés

## 5. Outputs

- Trafic organique
- Leads qualifiés
- Share WhatsApp (OG cards)

## 6. UX / surfaces

- `/blog`, `/blog/[slug]`
- `/guides` (hub décision)
- Embeds SimulatorEmbed, CTA sticky

## 7. Spec fonctionnelle

- Barème qualité : voir `docs/blog/strategie.md` §2
- 5 hubs (Sécuriser / Construire / Louer / Diaspora / Argent)
- ~25 piliers v1 + satellites
- Schema Article + FAQPage
- Revue annuelle des articles chiffrés

## 8. Données

- ContentEntry {slug, hub, updatedAt, cta, embeds[]}

## 9. API (cible)

- Static MDX génération Next.js ; CMS optionnel phase 2

## 10. Monétisation

CAC organique + warming leads accession/gestion (pas de pubs agressives dans le corps).

## 11. KPIs

organic_landings, time_on_page, guide_to_tool_ctr, guide_to_whatsapp

## 12. Risques & conformité

Chiffres périmés ; pas de conseil juridique personnalisé — disclaimer + "parle à un notaire".

## 13. Phasing

- **v1:** hubs + 8–12 piliers (calendrier M1–M6)
- **Plus tard:** vidéo, PDF lead magnets, newsletter

## 14. Sources

- https://immoconnexion.com/acheter-un-terrain-au-senegal/
- https://samagalle.com/blog/documents-fonciers-essentiels-immobilier-senegal-guide-2026
- https://www.senpages.com/dossiers/acheter-un-terrain
- https://www.myafric.com/fr/acheter-senegal-depuis-france-diaspora/
- https://investissementimmoafrique.com/blog/autorisation-de-construire-au-senegal/
- https://keur-immo.com/senegal/construction-maison-senegal/
- docs/blog/strategie.md

---

*Voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
