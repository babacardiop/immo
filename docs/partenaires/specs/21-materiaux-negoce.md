# Négoce matériaux

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `21-materiaux-negoce.md` |
| **Priorité** | **P2** |
| **Catégorie** | Chantier |
| **Statut** | À recruter |
| **Synthèse** | Fournisseurs ciment, fer, carrelage — devis agrégés. |

## 1. Besoin client

Coût chantier transparent ; marge volume.

## 2. Offre partenaire

Grilles prix, livraison chantier.

## 3. Commission (indicatif — à figer en convention)

Kickback volume ou marge négociée.

## 4. Synergies add-ons / produit

`27-materiaux-marketplace`

## 5. Parcours (passerelle)

1. Budget construction
2. Liste matériaux
3. Commande

## 6. SLA attendu

Dispo / délai livraison affichés

## 7. Cadre contractuel

Accord commercial volume

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

GMV materiaux, commission

## 10. Risques

Litiges qualité — rôle marketplace clair

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 négoce partenaire |
| **Plus tard** | Marketplace multi-fournisseurs |

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
