# Simulateur budget total projet

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `03-simulateur-budget-total.md` |
| **Priorité** | **P0** |
| **Catégorie** | Accession |
| **Synthèse** | Agrège terrain + mode de paiement + construction + frais d'acquisition (notaire/mutation) en un seul total. |

## 1. Problème client

Les acheteurs voient le prix du terrain seul et sous-estiment cash jour J + chantier.

## 2. Réalité marché (recherche)

Sur TF: droits d'enregistrement ~5%, formalité foncière ~1%, émoluments notaire dégressifs (ex. 4,5%→0,75%) + TVA 18% sur honoraires. Total frais souvent cité ~7–15% selon dossier.

## 3. Utilisateurs & synergies

- **Users:** Acquéreur, diaspora
- **Synergie produit:** Compose add-ons 01+02+21; bundle Terrain Serein.

## 4. Inputs

- listing ou prix_terrain
- mode paiement
- params construction
- include_frais_notaire

## 5. Outputs

- cash_initial
- flux_mensuels
- budget_construction
- frais
- grand_total
- timeline

## 6. UX / surfaces

- /outils/budget-projet
- CTA depuis fiches terrain

## 7. Spec fonctionnelle

- Orchestration des 3 calculateurs
- Barème notaire configurable (tranches)
- Affichage multi-devise optionnel (EUR/USD indicatif)

## 8. Données

- NotaryFeeBracket
- réutilise ConstructionRate + PlanRule

## 9. API (cible)

- POST /api/addons/budget-total/simulate

## 10. Monétisation

Lead pack diligence+bornage+construction.

## 11. KPIs

completion_rate, bundle_attach

## 12. Risques & conformité

Barèmes fiscaux à valider avec notaire partenaire; disclaimer.

## 13. Phasing

- **v1:** Somme indicative
- **Plus tard:** Scénarios A/B (comptant vs étalé)

## 14. Sources

- https://immoconnexion.com/acheter-un-terrain-au-senegal/
- https://www.senpages.com/dossiers/acheter-un-terrain
- https://nadiaimmoservices.blog/frais-notaire-senegal/
- https://jiwall.com/droit-immobilier/tout-savoir-sur-les-tarifs-des-notaires-au-senegal/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
