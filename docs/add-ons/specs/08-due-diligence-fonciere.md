# Due diligence foncière

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `08-due-diligence-fonciere.md` |
| **Priorité** | **P1** |
| **Catégorie** | Foncier / Confiance |
| **Synthèse** | Vérification titre / litiges / hypothèque avant paiement — rapport horodaté (partenaire type YAWEET). |

## 1. Problème client

Fraudes diaspora: faux titres, indivision, chevauchements. L'état de droits réels à la Conservation est la base.

## 2. Réalité marché (recherche)

Certificat / état de droits réels peu cher (ordre centaines–milliers FCFA) mais crucial. YAWEET vend un rapport diligence complet pour diaspora.

## 3. Utilisateurs & synergies

- **Users:** Acquéreur, diaspora, agence (avant publication annonce)
- **Synergie produit:** Gate 'we publish ads'; avant séquestre; bundle Diaspora Full.

## 4. Inputs

- réfs TF/bail/NICAD
- docs vendeur
- localisation

## 5. Outputs

- rapport PDF
- score confiance
- go/no-go

## 6. UX / surfaces

- CTA 'Vérifier avant de payer'
- workflow interne listing approval

## 7. Spec fonctionnelle

- Commande partenaire API ou formulaire
- Statuts: requested → in_progress → delivered
- Bloquer boost listing sans diligence minimale (policy)

## 8. Données

- DiligenceOrder
- Listing.verificationStatus

## 9. API (cible)

- POST /api/addons/diligence

## 10. Monétisation

Markup sur rapport partenaire ou forfait agence.

## 11. KPIs

orders, block_rate_bad_titles

## 12. Risques & conformité

Délais admin DGID; dépendance partenaire.

## 13. Phasing

- **v1:** Process manuel + PDF
- **Plus tard:** Intégration partenaire

## 14. Sources

- https://yaweet.com/
- https://www.senpages.com/dossiers/acheter-un-terrain
- https://immoconnexion.com/acheter-un-terrain-au-senegal/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
