# Caution locative digitale

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `11-caution-locative.md` |
| **Priorité** | **P1** |
| **Catégorie** | Location / Fintech |
| **Synthèse** | Partenariat type Cautiona: avance de caution au bailleur, remboursement échelonné du locataire. |

## 1. Problème client

Cautions de 3–4 mois bloquent l'accès au logement à Dakar.

## 2. Réalité marché (recherche)

Cautiona SN: demande app, scoring, validation ~24h, avance au proprio, frais service (~15% modèle annoncé). Traçabilité = enjeu régulation.

## 3. Utilisateurs & synergies

- **Users:** Locataire, bailleur, agence
- **Synergie produit:** Signature bail Axe 4; bundle Locataire Tranquille; scoring réutilisable.

## 4. Inputs

- loyer
- duree_caution_mois
- KYC locataire

## 5. Outputs

- éligibilité
- redirect partenaire / deep-link
- statut dossier

## 6. UX / surfaces

- Checkout location
- Dashboard locataire

## 7. Spec fonctionnelle

- Intégration partenaire (referral) — pas prêteur en propre v1
- Consentement partage data scoring

## 8. Données

- CautionReferral

## 9. API (cible)

- POST /api/addons/caution/refer

## 10. Monétisation

Referral fee partenaire.

## 11. KPIs

referrals, funded_cautions, lease_close_rate

## 12. Risques & conformité

Régulation fintech; ne pas balancer le risque crédit sur l'agence.

## 13. Phasing

- **v1:** Referral + tracking
- **Plus tard:** API native si partenariat profond

## 14. Sources

- https://aps.sn/une-fintech-mise-sur-la-digitalisation-pour-faciliter-lacces-au-logement/
- https://www.euroquity.com/en/company/cautiona
- https://lequotidien.sn/cherte-des-loyers-le-dg-de-cautiona-interpelle-le-president-faye-pour-une-regulation-numerique/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
