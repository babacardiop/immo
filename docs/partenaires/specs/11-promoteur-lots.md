# Promoteur / lotisseur

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `11-promoteur-lots.md` |
| **Priorité** | **P1** |
| **Catégorie** | Stock & co-marketing |
| **Statut** | À recruter |
| **Synthèse** | Accès lots / programmes neufs avec mandat ou commission promoteur. |

## 1. Besoin client

Élargir le catalogue curated sans porter le stock.

## 2. Offre partenaire

Lots sécurisés, grilles prix, co-visite, VEFA si applicable.

## 3. Commission (indicatif — à figer en convention)

2–5 % (ou barème promoteur) sur vente lot / unité.

## 4. Synergies add-ons / produit

`catalogue`, `01-simulateur-mensualite`

## 5. Parcours (passerelle)

1. Mandat programme
2. Publication curated
3. Vente → commission

## 6. SLA attendu

Maj dispo lots hebdo

## 7. Cadre contractuel

Mandat écrit + exclusivité éventuelle par programme

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

lots_live, ventes, commission

## 10. Risques

Retards livraison promoteur — disclaimer VEFA

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 programme partenaire |
| **Plus tard** | Multi-programmes + page « neuf » |

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
