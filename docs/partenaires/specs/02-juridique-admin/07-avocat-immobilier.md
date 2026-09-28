# Avocat immobilier / contentieux

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `07-avocat-immobilier.md` |
| **Priorité** | **P1** |
| **Catégorie** | Juridique |
| **Statut** | À recruter |
| **Synthèse** | Avocat pour litiges fonciers, double vente, recouvrement locatif lourd, rédaction hors notaire. |

## 1. Besoin client

Contentieux ou situation anormale que le notaire ne traite pas seul.

## 2. Offre partenaire

Consultation, mise en demeure, procédure.

## 3. Commission (indicatif — à figer en convention)

Forfait intro ou 10–15 % honoraires (selon dossier).

## 4. Synergies add-ons / produit

`08-due-diligence-fonciere`, `23-scoring-locataire`

## 5. Parcours (passerelle)

1. Escalade litige
2. Intro avocat
3. Suivi statut

## 6. SLA attendu

Rappel 24–48 h

## 7. Cadre contractuel

Convention ; client = mandant de l’avocat

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

consults, dossiers_ouverts

## 10. Risques

Conflits d’intérêts si avocat aussi du vendeur

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 cabinet référencé |
| **Plus tard** | Grille urgences (saisie, expulsion) |

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
