# Syndic / copropriété

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `22-syndic-copropriete.md` |
| **Priorité** | **P2** |
| **Catégorie** | Gestion |
| **Statut** | À recruter |
| **Synthèse** | Syndic pour immeubles ; synchro avec gestion locative lots. |

## 1. Besoin client

Immeubles collectifs ; conformité charges.

## 2. Offre partenaire

Mandat syndic, AG, charges.

## 3. Commission (indicatif — à figer en convention)

Apport mandat (forfait ou mois de honoraires).

## 4. Synergies add-ons / produit

`22-portail-multi-biens`, `gestion`

## 5. Parcours (passerelle)

1. Immeuble sous mandat
2. Intro syndic

## 6. SLA attendu

Proposition sous 7 j

## 7. Cadre contractuel

Apporteur

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

mandats_syndic

## 10. Risques

Conflit syndic vs gestionnaire lots

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 syndic (ex. réseau type Senegal Syndic / local) |
| **Plus tard** | Offre immeuble complet |

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
