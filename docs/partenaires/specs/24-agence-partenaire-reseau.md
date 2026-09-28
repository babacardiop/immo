# Agence partenaire / réseau inter-agences

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `24-agence-partenaire-reseau.md` |
| **Priorité** | **P2** |
| **Catégorie** | Réseau |
| **Statut** | À recruter |
| **Synthèse** | Agences hors zone (Thiès, Saint-Louis, diaspora desk) pour split de commission. |

## 1. Besoin client

Couverture géographique sans ouvrir une branche tout de suite.

## 2. Offre partenaire

Apport croisé de mandats / acquéreurs ; co-visite.

## 3. Commission (indicatif — à figer en convention)

Split classique 50/50 (négociable).

## 4. Synergies add-ons / produit

`40-white-label`

## 5. Parcours (passerelle)

1. Lead hors zone
2. Handshake agence
3. Split à closing

## 6. SLA attendu

Accusé lead 24 h

## 7. Cadre contractuel

Convention inter-agences

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

leads_echanges, closings_partages

## 10. Risques

Qualité hétérogène — charte curated

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1–2 agences alliées |
| **Plus tard** | White-label branches |

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
