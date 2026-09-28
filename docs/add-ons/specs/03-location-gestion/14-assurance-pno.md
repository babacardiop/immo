# Assurance PNO (propriétaire non occupant)

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `14-assurance-pno.md` |
| **Priorité** | **P1** |
| **Catégorie** | Gestion / Assurance |
| **Synthèse** | Upsell assurance PNO pour bailleurs sous mandat de gestion. |

## 1. Problème client

Proprios diaspora/local sans couverture des risques locatifs.

## 2. Réalité marché (recherche)

Pratique courante des agences full-service SN.

## 3. Utilisateurs & synergies

- **Users:** Propriétaire
- **Synergie produit:** Dashboard proprio; bundle Bailleur Pro.

## 4. Inputs

- bien
- loyer
- type occupancy

## 5. Outputs

- devis PNO

## 6. UX / surfaces

- Portail proprio

## 7. Spec fonctionnelle

- Referral courtier

## 8. Données

- InsuranceReferral type=pno

## 9. API (cible)

- POST /api/addons/insurance/pno

## 10. Monétisation

Commission.

## 11. KPIs

pno_attach_rate

## 12. Risques & conformité

Même cadre distribution.

## 13. Phasing

- **v1:** CTA + partenaire
- **Plus tard:** Renouvellement auto rappel

## 14. Sources

- docs/positioning.md
- docs/add-ons.md

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
