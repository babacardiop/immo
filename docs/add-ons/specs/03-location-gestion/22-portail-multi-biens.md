# Portail multi-biens propriétaire

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `22-portail-multi-biens.md` |
| **Priorité** | **P1** |
| **Catégorie** | Gestion |
| **Synthèse** | Vue portefeuille: loyers, vacance, tickets, ROI simple. |

## 1. Problème client

Bailleurs multi-biens gèrent sur Excel/WhatsApp.

## 2. Réalité marché (recherche)

Noflaye / SysSamba / Diavix — table stakes gestion.

## 3. Utilisateurs & synergies

- **Users:** Propriétaire
- **Synergie produit:** Axe 4; PNO; reporting fiscal; estimation revente.

## 4. Inputs

- biens sous mandat

## 5. Outputs

- dashboard KPIs

## 6. UX / surfaces

- /app/owner

## 7. Spec fonctionnelle

- Agrégats paiements Wave/OM (**S11** ledger · net + frais)
- liste retards

## 8. Données

- Lease
- Payment
- Property

## 9. API (cible)

- owner Graph/REST

## 10. Monétisation

Inclus gestion; upsell premium.

## 11. KPIs

MAU owner, retention_mandate

## 12. Risques & conformité

Exactitude compta.

## 13. Phasing

- **v0 (S08) :** `PropertyAssignment` + candidatures / sélection — sans ça le portail reste vide → voir [`53-candidature-dossier-location.md`](./53-candidature-dossier-location.md)
- **v1 (S10) :** Liste + loyers + widgets dashboard
- **Plus tard :** ROI/fiscal export

## 14. Sources

- https://www.noflaye.sn/
- https://syssamba.com/en
- https://diavix.com/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
