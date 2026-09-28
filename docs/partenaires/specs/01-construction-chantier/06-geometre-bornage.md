# Géomètre / bornage

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `06-geometre-bornage.md` |
| **Priorité** | **P1** |
| **Catégorie** | Foncier technique |
| **Statut** | À recruter |
| **Synthèse** | Géomètre expert pour bornage, superficie réelle, plan — avant achat ou avant construction. |

## 1. Besoin client

Litiges de limites, écart superficie annoncée vs réelle, exigence banque / notaire / PC.

## 2. Offre partenaire

Levé, bornage contradictoire, plan pour dossier.

## 3. Commission (indicatif — à figer en convention)

10–15 % honoraires ou forfait intro 25–75k FCFA.

## 4. Synergies add-ons / produit

`07-bornage-geometre`, `08-due-diligence-fonciere`

## 5. Parcours (passerelle)

1. Flag diligence
2. Lead géomètre
3. PV bornage → dossier notaire

## 6. SLA attendu

Devis 48 h ; intervention selon zone

## 7. Cadre contractuel

Convention apporteur standard

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

leads, missions, unblock_title_issues

## 10. Risques

Géomètre non assermenté — exiger qualification

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 géomètre Dakar + 1 Petite Côte si possible |
| **Plus tard** | Couverture régionale |

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

Voir aussi : [`docs/partenaires.md`](../../../partenaires.md) · [`docs/add-ons.md`](../../../add-ons.md)
