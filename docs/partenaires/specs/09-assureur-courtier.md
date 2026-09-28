# Assureur / courtier MRH–PNO

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `09-assureur-courtier.md` |
| **Priorité** | **P1** |
| **Catégorie** | Assurance |
| **Statut** | À recruter |
| **Synthèse** | Couverture habitation locataire / PNO propriétaire non occupant à la signature. |

## 1. Besoin client

Obligation ou bon sens à l’entrée dans les lieux / mise en gestion.

## 2. Offre partenaire

Devis MRH/PNO, souscription, attestation.

## 3. Commission (indicatif — à figer en convention)

10–20 % de la prime 1ʳᵉ année (usage courtier) ou fee fixe.

## 4. Synergies add-ons / produit

`13-assurance-mrh`, `14-assurance-pno`

## 5. Parcours (passerelle)

1. Bail signé / mandat gestion
2. Devis assurance
3. Attestation upload portail

## 6. SLA attendu

Devis J+1

## 7. Cadre contractuel

Convention courtage

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

polices, primes, renewals

## 10. Risques

Sinistres mal gérés → image ; choisir courtier réactif

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 courtier + 2 compagnies |
| **Plus tard** | Upsell annuel auto |

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
