# Assurance habitation (MRH)

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `13-assurance-mrh.md` |
| **Priorité** | **P1** |
| **Catégorie** | Location / Assurance |
| **Synthèse** | Devis / souscription assurance multirisque habitation à la signature du bail via courtier partenaire. |

## 1. Problème client

Locataires non couverts; bailleurs exposés.

## 2. Réalité marché (recherche)

Agences SN vendent déjà assurance en partenariat (ex. 2SMS + assureurs). À brancher au checkout bail.

## 3. Utilisateurs & synergies

- **Users:** Locataire
- **Synergie produit:** Bundle Locataire Tranquille; EDL.

## 4. Inputs

- adresse
- loyer
- surface
- valeur mobilier

## 5. Outputs

- devis
- attestation PDF

## 6. UX / surfaces

- Étape post-bail

## 7. Spec fonctionnelle

- Lead courtier ou iframe partenaire

## 8. Données

- InsuranceReferral

## 9. API (cible)

- POST /api/addons/insurance/mrh

## 10. Monétisation

Commission courtage.

## 11. KPIs

attach_rate_at_lease

## 12. Risques & conformité

Conformité distribution assurance.

## 13. Phasing

- **v1:** Referral
- **Plus tard:** Devis instantané API

## 14. Sources

- https://linkedin.com/company/2sms-immobilier-sarl
- docs/add-ons.md

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
