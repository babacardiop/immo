# Affichage multi-devise (FCFA / EUR / USD)

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `16-multi-devise.md` |
| **Priorité** | **P1** |
| **Catégorie** | Diaspora / UX |
| **Synthèse** | Prix catalogue et simulateurs en FCFA + conversion indicative EUR/USD. |

## 1. Problème client

Diaspora lit en euros; frictions de compréhension.

## 2. Réalité marché (recherche)

Guides diaspora affichent souvent équivalents €.

## 3. Utilisateurs & synergies

- **Users:** Diaspora
- **Synergie produit:** Toutes fiches + simus + share cards.

## 4. Inputs

- montant XOF
- taux feed

## 5. Outputs

- montant affiché + disclaimer taux

## 6. UX / surfaces

- Toggle devise header

## 7. Spec fonctionnelle

- FX rate cache quotidien
- Toujours stocker XOF

## 8. Données

- FxRate

## 9. API (cible)

- GET /api/fx

## 10. Monétisation

Conversion (indirect).

## 11. KPIs

toggle_usage, diaspora_session_share

## 12. Risques & conformité

Taux indicatif seulement.

## 13. Phasing

- **v1:** EUR+USD
- **Plus tard:** GBP

## 14. Sources

- https://www.myafric.com/fr/acheter-senegal-depuis-france-diaspora/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
