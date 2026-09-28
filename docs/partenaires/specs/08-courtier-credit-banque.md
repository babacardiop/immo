# Courtier crédit / banque

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `08-courtier-credit-banque.md` |
| **Priorité** | **P1** |
| **Catégorie** | Finance |
| **Statut** | À recruter |
| **Synthèse** | Accès crédit immobilier retail (CDI/CDD selon banques) et orientation dossier. |

## 1. Besoin client

Financer achat / construction hors vente étalée agence.

## 2. Offre partenaire

Montage dossier, comparatif banques, suivi accord.

## 3. Commission (indicatif — à figer en convention)

Partage commission courtage bancaire (selon banque) ou forfait dossier.

## 4. Synergies add-ons / produit

`01-simulateur-mensualite`, `18-calculateur-frais-acquisition`, `24-epargne-construction`

## 5. Parcours (passerelle)

1. CTA financer
2. Lead courtier
3. Accord de principe → closing

## 6. SLA attendu

1er RDV sous 5 j

## 7. Cadre contractuel

Accord apporteur / courtier

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

dossiers, accords, taux_obtention

## 10. Risques

Survente capacité d’emprunt — disclaimer

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 courtier ou 1 contact banque |
| **Plus tard** | Simulateur capacité d’emprunt |

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
