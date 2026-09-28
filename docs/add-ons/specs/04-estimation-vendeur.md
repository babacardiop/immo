# Estimation de bien (vendeur)

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `04-estimation-vendeur.md` |
| **Priorité** | **P0** |
| **Catégorie** | Vente / Axe 1 |
| **Synthèse** | Fourchette de prix pour propriétaires — tunnel vers mandat de vente. |

## 1. Problème client

Sans estimation crédible, le vendeur part sur Facebook/Expat à un mauvais prix.

## 2. Réalité marché (recherche)

Pratique standard des agences SN (estimation pro). Prix/m² très variables Dakar vs Petite Côte vs intérieur.

## 3. Utilisateurs & synergies

- **Users:** Propriétaire, agent
- **Synergie produit:** Dashboard proprio 'Revendre'; alimente Axe 1; comps pour carte prix/m².

## 4. Inputs

- type
- quartier/ville
- surface
- pieces
- etat
- photos?

## 5. Outputs

- fourchette
- prix_m2_ref
- CTA mandat WhatsApp/RDV

## 6. UX / surfaces

- /estimer
- widget site
- espace proprio

## 7. Spec fonctionnelle

- Formulaire + scoring zone
- Comps manuels/admin au début
- Création lead CRM statut=estimate
- Disclaimer non expertise judiciaire

## 8. Données

- EstimateRequest
- CompSale
- Lead

## 9. API (cible)

- POST /api/addons/estimate

## 10. Monétisation

Conversion mandat (commission vente).

## 11. KPIs

requests, mandate_conversion

## 12. Risques & conformité

Attentes vendeur irréalistes — cadrer avec comps visibles.

## 13. Phasing

- **v1:** Règles + revue agent sous 24h
- **Plus tard:** AVM + carte chaleur

## 14. Sources

- docs/positioning.md
- docs/competitive-analysis.md

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
