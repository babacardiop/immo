# Régularisation / montée en titre foncier

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `43-regularisation-tf.md` |
| **Priorité** | **P2** |
| **Catégorie** | Foncier |
| **Synthèse** | Accompagnement bail/PO → TF via circuit admin/notaire. |

## 1. Problème client

Accompagnement bail/PO → TF via circuit admin/notaire.

## 2. Réalité marché (recherche)

Immatriculation encadrée; NICAD central (décret 2012-396).

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

- POST /api/addons/regularisation-tf/request

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

- https://immoconnexion.com/acheter-un-terrain-au-senegal/
- docs/add-ons.md

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
