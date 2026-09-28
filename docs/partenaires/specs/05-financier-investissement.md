# Financier / structuration d’investissements colossaux

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `05-financier-investissement.md` |
| **Priorité** | **P0** |
| **Catégorie** | Finance |
| **Statut** | Relation existante — à nommer & signer |
| **Synthèse** | Financier de haut vol pour tickets immobiliers importants : montage, co-invest, dette, club deal, family office. |

## 1. Besoin client

Au-delà du crédit retail classique : projets multi-lots, promo légère, acquisition patrimoniale lourde, diaspora HNWI.

## 2. Offre partenaire

Structuration financière, mise en relation capital / dette, due diligence investisseur, éventuellement SPV.

## 3. Commission (indicatif — à figer en convention)

Success fee 0,5–2 % du ticket clos **et/ou** retainer partagé. Seuil d’activation ex. projet ≥ 200–500 M FCFA (à caler).

## 4. Synergies add-ons / produit

`03-simulateur-budget-total`, `08-due-diligence-fonciere`, `50-co-acquisition`

## 5. Parcours (passerelle)

1. Lead qualifié gros ticket (agent flag « capital »)
2. NDA / teaser one-pager
3. Call financier + agence + client
4. Success fee à closing financement ou acquisition

## 6. SLA attendu

Réponse d’éligibilité sous 5 j ouvrés ; teaser standardisé

## 7. Cadre contractuel

Mandat de présentation + success fee écrit ; conformité KYC / anti-blanchiment côté financier

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

leads_hnwi, appels, tickets_clos, fee_fcfa

## 10. Risques

Promesse de rendement ; rester sur « mise en relation » — pas de conseil en investissement non habilité

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 financier nommé + seuil ticket + template teaser |
| **Plus tard** | Club deals sur lots promoteur ; reporting investisseurs |

## 12. Fiche partenaire nommé (à remplir)

| Champ | Valeur |
| --- | --- |
| Raison sociale / nom | _TBD_ |
| Contact principal | _TBD_ |
| Tél / WhatsApp | _TBD_ |
| Zone couverte | _TBD_ |
| Convention signée | Non / Oui (date) |
| Taux / forfait acté | _TBD_ |
| Notes internes | _TBD_ |

---

Voir aussi : [`docs/partenaires.md`](../../partenaires.md) · [`docs/add-ons.md`](../../add-ons.md)
