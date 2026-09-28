# État des lieux digital

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `12-etat-des-lieux-digital.md` |
| **Priorité** | **P1** |
| **Catégorie** | Location / Gestion |
| **Synthèse** | Checklist photo + signature entrée/sortie, stockée au dashboard (locataire & proprio). |

## 1. Problème client

Litiges caution sans preuve; conseils terrain: ne jamais payer caution sans EDL précis.

## 2. Réalité marché (recherche)

Noflaye expose déjà bail + EDL + quittances 24/7 — standard à atteindre.

## 3. Utilisateurs & synergies

- **Users:** Agent, locataire, proprio
- **Synergie produit:** Gestion locative; pack remise des clés; assurance.

## 4. Inputs

- photos pièces
- compteurs
- mobilier
- signatures

## 5. Outputs

- PDF EDL
- baseline pour sortie

## 6. UX / surfaces

- App agent mobile-first
- Dashboard locataire

## 7. Spec fonctionnelle

- Templates par type bien
- Horodatage + geo optionnelle
- Comparaison entrée/sortie

## 8. Données

- InventoryReport
- InventoryItem

## 9. API (cible)

- POST /api/addons/inventory

## 10. Monétisation

Inclus mandat gestion; upsell pack sortie.

## 11. KPIs

edl_completion, dispute_rate

## 12. Risques & conformité

Qualité photo agent — formation.

## 13. Phasing

- **v1:** Form + PDF
- **Plus tard:** IA détection dégradations

## 14. Sources

- https://www.noflaye.sn/
- https://2sage-alba.com/destinations/international/afrique/senegal/dakar/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
