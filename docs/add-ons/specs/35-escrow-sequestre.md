# Escrow / séquestre paiements

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `35-escrow-sequestre.md` |
| **Priorité** | **P2** |
| **Catégorie** | Confiance / Diaspora |
| **Synthèse** | Fonds chez notaire ou compte dédié; libération par jalons. |

## 1. Problème client

Fonds chez notaire ou compte dédié; libération par jalons.

## 2. Réalité marché (recherche)

MyAfric/Coupefile: jamais payer vendeur en direct; Jawudi escrow milestones.

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

- POST /api/addons/escrow-sequestre/request

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

- https://www.coupefile-immobilier.com/senegal-terrain-a-vendre-et-diaspora-comment-acheter-a-distance-en-confiance/
- docs/add-ons.md

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
