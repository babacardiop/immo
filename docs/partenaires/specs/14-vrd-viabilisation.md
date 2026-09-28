# VRD / viabilisation

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `14-vrd-viabilisation.md` |
| **Priorité** | **P2** |
| **Catégorie** | Chantier annexe |
| **Statut** | À recruter |
| **Synthèse** | Voirie, réseaux, branchements pour lot / terrain nu. |

## 1. Besoin client

Terrain nu → prêt à bâtir.

## 2. Offre partenaire

Devis VRD, coordination concessionnaires.

## 3. Commission (indicatif — à figer en convention)

3–8 % marché.

## 4. Synergies add-ons / produit

`42-vrd-viabilisation`, `10-simulateur-pret-a-batir`

## 5. Parcours (passerelle)

1. Pack terrain
2. Lead VRD

## 6. SLA attendu

Devis 7–14 j

## 7. Cadre contractuel

Apporteur

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

chantiers_vrd

## 10. Risques

Dépassements ; buffer imprévus client

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 entreprise |
| **Plus tard** | Estimates dans simu prêt-à-bâtir |

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
