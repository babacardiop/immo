# Pack Terrain → Maison

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `06-pack-terrain-maison.md` |
| **Priorité** | **P1** |
| **Catégorie** | Construction |
| **Synthèse** | Offre packagée: simulation + checklist permis + shortlist archi/constructeurs partenaires. |

## 1. Problème client

Le client est perdu entre géomètre, urbanisme, devis BTP.

## 2. Réalité marché (recherche)

Plans catalogue ~100–500k FCFA; sur-mesure archi dès ~500k+. Permis exige NICAD, plans, etc.

## 3. Utilisateurs & synergies

- **Users:** Acheteur terrain post-réservation
- **Synergie produit:** Suit 02+11+12+13; upsell suivi chantier diaspora.

## 4. Inputs

- listing
- budget
- délai souhaité

## 5. Outputs

- checklist
- 3 devis partenaires
- prochain RDV

## 6. UX / surfaces

- Dashboard acquéreur checklist
- page vente pack

## 7. Spec fonctionnelle

- Wizard étapes
- Assignation partenaires par zone
- Statuts dossier

## 8. Données

- BuildPackOrder
- Partner

## 9. API (cible)

- POST /api/addons/build-pack

## 10. Monétisation

Forfait conseil agence et/ou commission partenaires.

## 11. KPIs

pack_sold, partner_accept_rate

## 12. Risques & conformité

Ne pas promettre délais urbanisme.

## 13. Phasing

- **v1:** Checklist + matching manuel
- **Plus tard:** Matching auto + paiements jalons

## 14. Sources

- https://www.ecsinformatique.com/quel-est-le-cout-de-realisation-de-plan-de-maison-en-2024/
- https://unmondesenegal.com/acheter-terrain-senegal/
- https://kapitalconseilimmobilier.com/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
