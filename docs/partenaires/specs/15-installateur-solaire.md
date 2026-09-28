# Installateur solaire

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `15-installateur-solaire.md` |
| **Priorité** | **P2** |
| **Catégorie** | Énergie |
| **Statut** | À recruter |
| **Synthèse** | Kits solaires / onduleurs pour maisons et locatif. |

## 1. Besoin client

Fiabiliser l’énergie ; upsell post-achat / gestion.

## 2. Offre partenaire

Étude, installation, SAV.

## 3. Commission (indicatif — à figer en convention)

5–10 % du kit installé.

## 4. Synergies add-ons / produit

`20-kit-solaire`

## 5. Parcours (passerelle)

1. CTA énergie
2. Lead solaire

## 6. SLA attendu

Visite technique 5 j

## 7. Cadre contractuel

Apporteur

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

installations, ticket_moyen

## 10. Risques

SAV défaillant → shortlist exigeante

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 installateur |
| **Plus tard** | Offre proprio multi-biens |

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
