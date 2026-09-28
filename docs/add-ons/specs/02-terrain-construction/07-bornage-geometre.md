# Bornage / géomètre

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `07-bornage-geometre.md` |
| **Priorité** | **P1** |
| **Catégorie** | Foncier |
| **Synthèse** | Mise en relation avec géomètre-expert agréé pour plan de bornage opposable + NICAD. |

## 1. Problème client

Sans bornage, écarts de superficie fréquents (ex. 400 m² promis → 270 m² réels).

## 2. Réalité marché (recherche)

Seul un géomètre-expert agréé produit un bornage opposable. Pas de barème officiel public fiable — devis obligatoire. NICAD requis pour opérations / permis.

## 3. Utilisateurs & synergies

- **Users:** Acheteur terrain, diaspora
- **Synergie produit:** Avant construction; bundle Terrain Serein avec diligence.

## 4. Inputs

- parcelle refs
- TF/bail/NICAD si connu
- localisation GPS

## 5. Outputs

- demande devis
- RDV
- upload plan PDF

## 6. UX / surfaces

- CTA fiche terrain
- checklist post-achat

## 7. Spec fonctionnelle

- Form lead → partenaires géomètres par région
- Upload documents finaux au coffre-fort dossier

## 8. Données

- ServiceRequest type=survey
- Document

## 9. API (cible)

- POST /api/addons/survey-request

## 10. Monétisation

Frais dossier agence + commission/apporter d'affaires.

## 11. KPIs

requests, completed_surveys

## 12. Risques & conformité

Délais terrain; ne pas afficher un prix inventé.

## 13. Phasing

- **v1:** Lead + suivi statut
- **Plus tard:** Paiement Wave du devis via plateforme

## 14. Sources

- https://unmondesenegal.com/acheter-terrain-senegal/
- https://immoconnexion.com/acheter-un-terrain-au-senegal/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
