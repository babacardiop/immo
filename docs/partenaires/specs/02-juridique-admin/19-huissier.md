# Huissier

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `19-huissier.md` |
| **Priorité** | **P2** |
| **Catégorie** | Juridique |
| **Statut** | À recruter |
| **Synthèse** | Constats, significations, procédures d’exécution locative. |

## 1. Besoin client

Impayés lourds, conflits occupation.

## 2. Offre partenaire

Constats d’huissier, actes.

## 3. Commission (indicatif — à figer en convention)

Forfait intro.

## 4. Synergies add-ons / produit

`23-scoring-locataire`, `gestion locative`

## 5. Parcours (passerelle)

1. Escalade impayé
2. Intro huissier

## 6. SLA attendu

Urgences 24–48 h

## 7. Cadre contractuel

Apporteur

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

constats, procedures

## 10. Risques

Image « dure » — process gradué avant huissier

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 étude d’huissier |
| **Plus tard** | Playbook impayés |

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
