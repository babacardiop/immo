# Garant / scoring locataire

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `23-scoring-locataire.md` |
| **Priorité** | **P1** |
| **Catégorie** | Location / Risk |
| **Synthèse** | Score interne à partir de KYC + historique paiements plateforme — réduit impayés et alimente cross-sell. |

## 1. Problème client

Impayés = douleur n°1 bailleur; Cautiona mise sur scoring intelligent.

## 2. Réalité marché (recherche)

Historique on-platform après 12 mois = avantage vs classifieds.

## 3. Utilisateurs & synergies

- **Users:** Agence, bailleur
- **Synergie produit:** Caution; offre Axe 2/3 aux bons payeurs.

## 4. Inputs

- dossier
- payment_history

## 5. Outputs

- score
- recommandation

## 6. UX / surfaces

- Back-office agence
- soft offer locataire

## 7. Spec fonctionnelle

- Règles score v1
- pas de discrimination illégale — policy

## 8. Données

- TenantScore

## 9. API (cible)

- GET /api/tenants/:id/score

## 10. Monétisation

Meilleure rétention mandats gestion.

## 11. KPIs

default_rate, upsell_accession

## 12. Risques & conformité

Éthique/data; consentement.

## 13. Phasing

- **v1:** Score simple on-time ratio
- **Plus tard:** Partage Cautiona

## 14. Sources

- https://www.euroquity.com/en/company/cautiona
- docs/positioning.md

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
