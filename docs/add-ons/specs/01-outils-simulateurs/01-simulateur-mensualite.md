# Simulateur de mensualité

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `01-simulateur-mensualite.md` |
| **Priorité** | **P0** |
| **Catégorie** | Accession / Axe 2–3 |
| **Synthèse** | Calcule acompte, durée et mensualité en FCFA pour vente étalée (terrains) et location-vente (bâti). |

## 1. Problème client

Les acheteurs ne savent pas s'ils peuvent suivre. Chez Immobilier-au-Sénégal le paiement échelonné reste un bandeau marketing, pas un outil.

## 2. Réalité marché (recherche)

Barèmes retenus en analyse interne: acompte 10% max si bien < 1M FCFA, sinon ~30%; durée 12–36 mois; frais de dossier 25–50k (terrain) / 50–100k (bâti). Voir docs/first analysis.

## 3. Utilisateurs & synergies

- **Users:** Acquéreur, agent, diaspora
- **Synergie produit:** Entrée de parcours T; alimente réservation + dashboard acquéreur; share card WhatsApp.

## 4. Inputs

- prix_bien (FCFA)
- acompte_pct ou acompte_fixe
- duree_mois (12|24|36…)
- frais_dossier
- mode: etale | loc_vente

## 5. Outputs

- mensualite
- total_paye
- tableau echeances
- CTA reserver / WhatsApp
- lien share OG

## 6. UX / surfaces

- Bloc sur fiche bien si paymentModes contient etale/loc_vente
- Page /outils/mensualite (SEO)
- Export image/PDF pour WhatsApp

## 7. Spec fonctionnelle

- Formule: (prix - acompte) / duree (+ option frais lissés)
- Règles admin éditables (min acompte par palier de prix)
- Disclaimer: simulation indicative, pas un crédit bancaire
- Lead capture optionnelle (tél/WhatsApp) avant PDF

## 8. Données

- Listing.paymentModes[], Listing.price
- PlanRule {minPrice, maxPrice, minDownPct, maxTenor}
- SimulationLog {listingId?, inputs, result, userId?}

## 9. API (cible)

- POST /api/addons/mensualite/simulate
- GET /api/addons/mensualite/rules

## 10. Monétisation

Gratuit → conversion réservation / frais dossier. Pas de fee sur le calcul.

## 11. KPIs

sim_start, sim_complete, lead_rate, reservation_rate

## 12. Risques & conformité

Confusion avec prêt bancaire; afficher clairement 'facilité vendeur via agence'.

## 13. Phasing

- **v1:** Formule simple + CTA
- **Plus tard:** Co-acquisition multi-payeurs; pénalités affichées; Wave auto-debit preview

## 14. Sources

- docs/first analysis/q1–q3.md
- docs/proptech-analysis.md
- https://immobilier-au-senegal.com/ (concept concurrent faible)

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
