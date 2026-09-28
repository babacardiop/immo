# Simulateur terrain nu → prêt à bâtir

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `10-simulateur-pret-a-batir.md` |
| **Priorité** | **P1** |
| **Catégorie** | Viabilisation |
| **Synthèse** | Estime clôture, fosse, bornage, branchements eau/électricité — coûts oubliés post-achat. |

## 1. Problème client

Viabilisation non chiffrée tue le budget (ex. couples à Diamniadio dépassés après ramblai/fosse/taxes).

## 2. Réalité marché (recherche)

Pas de barème officiel SENELEC/SEN'EAU unique; devis locaux. Ajouter comme options forfaitaires éditables.

## 3. Utilisateurs & synergies

- **Users:** Acheteur terrain
- **Synergie produit:** Complète simu construction; bundle Prêt à bâtir.

## 4. Inputs

- périmètre_m
- besoin_eau
- besoin_elec
- zone

## 5. Outputs

- total options
- détail
- CTA partenaires

## 6. UX / surfaces

- Étape après simu construction

## 7. Spec fonctionnelle

- Table forfaits admin
- Disclaimer devis réels

## 8. Données

- SitePrepRate

## 9. API (cible)

- POST /api/addons/site-prep/simulate

## 10. Monétisation

Leads clôture/forage/VRD.

## 11. KPIs

attach_rate_after_land_purchase

## 12. Risques & conformité

Coûts très site-dépendants.

## 13. Phasing

- **v1:** Forfaits indicatifs
- **Plus tard:** Devis partenaires en ligne

## 14. Sources

- https://unmondesenegal.com/acheter-terrain-senegal/
- https://www.youtube.com/watch?v=JQ0_Uf6xXYU

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
