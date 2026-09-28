# Inspection à distance (diaspora)

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `15-inspection-diaspora.md` |
| **Priorité** | **P1** |
| **Catégorie** | Diaspora |
| **Synthèse** | Visite filmée + rapport photo/vidéo horodaté pour terrain, logement ou chantier. |

## 1. Problème client

La diaspora paie sur WhatsApp photos non indépendantes — risque majeur.

## 2. Réalité marché (recherche)

MyAfric: séparer vendeur / inspecteur / notaire. QualiBTP / SENIMMO: suivi chantier + reporting diaspora. Forfait USD/EUR.

## 3. Utilisateurs & synergies

- **Users:** Diaspora buyer/owner
- **Synergie produit:** Avant paiement; escrow; suivi chantier.

## 4. Inputs

- adresse/GPS
- type: land|home|site
- checklist

## 5. Outputs

- rapport PDF
- galerie
- go/no-go notes agent

## 6. UX / surfaces

- Compte diaspora
- commande /inspect

## 7. Spec fonctionnelle

- Assign agent indépendant du vendeur
- Slots RDV
- Livraison 48–72h

## 8. Données

- InspectionOrder

## 9. API (cible)

- POST /api/addons/inspections

## 10. Monétisation

Forfait payant (Wave/carte).

## 11. KPIs

orders, nps, prevented_bad_deals (qualitatif)

## 12. Risques & conformité

Conflit d'intérêt si même agent vend — policy séparation.

## 13. Phasing

- **v1:** Process manuel + upload
- **Plus tard:** Live video call

## 14. Sources

- https://www.myafric.com/fr/acheter-senegal-depuis-france-diaspora/
- https://www.coupefile-immobilier.com/senegal-terrain-a-vendre-et-diaspora-comment-acheter-a-distance-en-confiance/
- https://linkedin.com/company/qualibtp
- https://agencesenimmo.com/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
