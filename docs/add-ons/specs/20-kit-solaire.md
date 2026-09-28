# Kit solaire / onduleur

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `20-kit-solaire.md` |
| **Priorité** | **P1** |
| **Catégorie** | Énergie |
| **Synthèse** | Estimation / devis kits solaires adaptés maison SN (coupures SENELEC). |

## 1. Problème client

Factures + coupures; clim = gros consommateur pile aux heures solaires.

## 2. Réalité marché (recherche)

Fourchettes 2026 approx: 1–2 kWc 0,8–1,5M; 3 kWc 1,8–2,8M; 5–6 kWc 3,5–5,5M; 8–10 kWc 5,5–9M FCFA. Kits commerçants Dakar (Esotech etc.). Devis exemple ~3,5M pour 2 clim+frigo autonome.

## 3. Utilisateurs & synergies

- **Users:** Proprio, diaspora construisant
- **Synergie produit:** Simu construction; clim; bundle Maison Confort.

## 4. Inputs

- conso_estimee
- nb_clim
- toit_m2

## 5. Outputs

- kit suggéré
- fourchette
- CTA installateur

## 6. UX / surfaces

- /outils/solaire
- post-construction checklist

## 7. Spec fonctionnelle

- Barèmes kits
- lead partenaires

## 8. Données

- SolarKit

## 9. API (cible)

- POST /api/addons/solar/simulate

## 10. Monétisation

Commission installateur.

## 11. KPIs

sim_to_quote

## 12. Risques & conformité

Dimensionnement — visite technique obligatoire.

## 13. Phasing

- **v1:** Simulateur indicatif + leads
- **Plus tard:** Pompe solaire forage combo

## 14. Sources

- https://takoussane.com/panneaux-solaires-maison-senegal-guide-complet/
- https://esotech.sn/
- https://namoryenergy.com/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
