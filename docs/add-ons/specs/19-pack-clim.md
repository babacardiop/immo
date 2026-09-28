# Pack climatisation + entretien

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `19-pack-clim.md` |
| **Priorité** | **P1** |
| **Catégorie** | Confort / Énergie |
| **Synthèse** | Devis splits + contrat entretien annuel via partenaires élec/clim. |

## 1. Problème client

Confort Dakar non négociable; pannes = tickets gestion.

## 2. Réalité marché (recherche)

Installateurs locaux (Batigo, Namory…). Entretien récurrent = revenu partenaire.

## 3. Utilisateurs & synergies

- **Users:** Proprio, locataire (si autorisé), acquéreur loc-vente
- **Synergie produit:** Maintenance marketplace; bundle Maison Confort; solaire.

## 4. Inputs

- nb pieces
- puissance
- marque pref

## 5. Outputs

- devis partenaires

## 6. UX / surfaces

- Dashboard
- fiche bien standing

## 7. Spec fonctionnelle

- Lead multi-partenaires

## 8. Données

- ServiceRequest type=ac

## 9. API (cible)

- POST /api/addons/ac-quote

## 10. Monétisation

Commission installation + entretien.

## 11. KPIs

quotes, install_close

## 12. Risques & conformité

SAV partenaire — SLA contractuel.

## 13. Phasing

- **v1:** Lead
- **Plus tard:** Catalogue SKU

## 14. Sources

- https://batigoservices.com/
- https://namoryenergy.com/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
