# Fintech caution / escrow

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `23-fintech-caution-escrow.md` |
| **Priorité** | **P1** |
| **Catégorie** | Fintech |
| **Statut** | À recruter |
| **Synthèse** | Partenaires type caution locative digitale ou séquestre paiements diaspora. |

## 1. Besoin client

Réduire friction caution et risque paiement vendeur.

## 2. Offre partenaire

Caution as a service ; escrow milestones.

## 3. Commission (indicatif — à figer en convention)

Referral fee par dossier activé.

## 4. Synergies add-ons / produit

`11-caution-locative`, `35-escrow-sequestre`

## 5. Parcours (passerelle)

1. Bail / closing
2. Opt-in fintech

## 6. SLA attendu

API ou process manuel v1

## 7. Cadre contractuel

Partenariat commercial + conformité

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

activations, fee

## 10. Risques

Régulation fintech ; communication claire

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 partenaire caution OU process séquestre notaire |
| **Plus tard** | Intégration API |

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
