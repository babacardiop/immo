# Comparateur frais (transparence)

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `34-comparateur-frais.md` |
| **Priorité** | **P2** |
| **Catégorie** | Confiance |
| **Synthèse** | Vue notaire + mutation + commission agence côte à côte. |

## 1. Problème client

Vue notaire + mutation + commission agence côte à côte.

## 2. Réalité marché (recherche)

Différenciation vs classifieds opaques.

## 3. Utilisateurs & synergies

- **Users:** Selon parcours (voir docs/add-ons.md §10.2)
- **Synergie produit:** Voir matrice axes × add-ons dans docs/add-ons.md

## 4. Inputs

- Voir formulaire dédié — à détailler en implémentation

## 5. Outputs

- Lead / devis / statut dossier

## 6. UX / surfaces

- Surfaces listées dans docs/add-ons.md §10.5

## 7. Spec fonctionnelle

- Mode partenaire (lead) par défaut
- Statuts request → quoted → done
- Documents au coffre-fort si applicable

## 8. Données

- ServiceRequest
- Partner

## 9. API (cible)

- POST /api/addons/comparateur-frais/request

## 10. Monétisation

Commission partenaire ou forfait agence

## 11. KPIs

requests, conversion, revenue_attach

## 12. Risques & conformité

Qualité partenaire; disclaimers; pas d'exécution BTP en propre

## 13. Phasing

- **v1:** Lead + tracking
- **Plus tard:** Paiement in-app / SLA

## 14. Sources

- https://nadiaimmoservices.blog/frais-notaire-senegal/
- docs/add-ons.md

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
