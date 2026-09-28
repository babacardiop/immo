# Forage / adduction d’eau

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `13-forage-eau.md` |
| **Priorité** | **P2** |
| **Catégorie** | Chantier annexe |
| **Statut** | À recruter |
| **Synthèse** | Entreprise de forage et pompage pour terrains non desservis. |

## 1. Besoin client

Viabiliser avant construction hors réseau SDE.

## 2. Offre partenaire

Étude, forage, équipement pompe.

## 3. Commission (indicatif — à figer en convention)

3–8 % devis ou forfait.

## 4. Synergies add-ons / produit

`41-forage-eau`, `10-simulateur-pret-a-batir`

## 5. Parcours (passerelle)

1. Simu prêt-à-bâtir
2. Lead forage
3. Devis

## 6. SLA attendu

Devis 5–7 j

## 7. Cadre contractuel

Apporteur standard

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

devis, forages_realises

## 10. Risques

Échec forage — contrat clair sur aléas géologiques

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 entreprise |
| **Plus tard** | Bundle VRD+forage |

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
