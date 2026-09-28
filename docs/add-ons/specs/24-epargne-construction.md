# Calendrier d'épargne construction

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `24-epargne-construction.md` |
| **Priorité** | **P1** |
| **Catégorie** | Accession |
| **Synthèse** | Pendant le paiement du terrain, jauge d'épargne mensuelle vers le budget chantier (rappels Wave/SMS). |

## 1. Problème client

Client finit de payer le terrain sans cash pour bâtir.

## 2. Réalité marché (recherche)

Pattern Senguka: save toward deposit; adapter en 'save toward build'.

## 3. Utilisateurs & synergies

- **Users:** Acquéreur étalé
- **Synergie produit:** Dashboard acquéreur; simu construction; pack constructeur.

## 4. Inputs

- target_build_budget
- months

## 5. Outputs

- monthly_save
- progress bar
- reminders

## 6. UX / surfaces

- Jauge dashboard

## 7. Spec fonctionnelle

- Goals
- notifications
- pas de custody fonds v1 (éducation)

## 8. Données

- SavingsGoal

## 9. API (cible)

- CRUD goals

## 10. Monétisation

Conversion pack construction.

## 11. KPIs

goals_active, build_pack_conversion

## 12. Risques & conformité

Ne pas détenir l'épargne sans agrément — v1 = coach + rappels.

## 13. Phasing

- **v1:** Rappels + tracking déclaré
- **Plus tard:** Wallet partenaire MFI

## 14. Sources

- https://senguka.com/
- docs/add-ons.md §10

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
