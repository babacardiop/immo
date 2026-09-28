# Partenaires — fiches (1 fichier = 1 type)

Passerelles monétisables (commissions d’apport). Vue d’ensemble : [`docs/partenaires.md`](../partenaires.md).

| # | Partenaire | Priorité | Statut | Fichier |
| --- | --- | --- | --- | --- |
| 01 | Constructeur / entreprise BTP | P0 | Relation existante | [`specs/01-constructeur-btp.md`](./specs/01-constructeur-btp.md) |
| 02 | Architecte | P0 | Relation existante | [`specs/02-architecte.md`](./specs/02-architecte.md) |
| 03 | Notaire | P0 | Relation existante | [`specs/03-notaire.md`](./specs/03-notaire.md) |
| 04 | Formalités & obtention de papiers légaux | P0 | Relation existante | [`specs/04-formalites-papiers-legaux.md`](./specs/04-formalites-papiers-legaux.md) |
| 05 | Financier / structuration d’investissements colossaux | P0 | Relation existante | [`specs/05-financier-investissement.md`](./specs/05-financier-investissement.md) |
| 06 | Géomètre / bornage | P1 | À recruter | [`specs/06-geometre-bornage.md`](./specs/06-geometre-bornage.md) |
| 07 | Avocat immobilier / contentieux | P1 | À recruter | [`specs/07-avocat-immobilier.md`](./specs/07-avocat-immobilier.md) |
| 08 | Courtier crédit / banque | P1 | À recruter | [`specs/08-courtier-credit-banque.md`](./specs/08-courtier-credit-banque.md) |
| 09 | Assureur / courtier MRH–PNO | P1 | À recruter | [`specs/09-assureur-courtier.md`](./specs/09-assureur-courtier.md) |
| 10 | Inspection / contrôle qualité diaspora | P1 | À recruter | [`specs/10-inspection-diaspora.md`](./specs/10-inspection-diaspora.md) |
| 11 | Promoteur / lotisseur | P1 | À recruter | [`specs/11-promoteur-lots.md`](./specs/11-promoteur-lots.md) |
| 12 | Expert fiscal foncier (CGF / CFPB) | P1 | À recruter | [`specs/12-expert-fiscal-foncier.md`](./specs/12-expert-fiscal-foncier.md) |
| 13 | Forage / adduction d’eau | P2 | À recruter | [`specs/13-forage-eau.md`](./specs/13-forage-eau.md) |
| 14 | VRD / viabilisation | P2 | À recruter | [`specs/14-vrd-viabilisation.md`](./specs/14-vrd-viabilisation.md) |
| 15 | Installateur solaire | P2 | À recruter | [`specs/15-installateur-solaire.md`](./specs/15-installateur-solaire.md) |
| 16 | Climatisation & froid | P1 | À recruter | [`specs/16-clim-froid.md`](./specs/16-clim-froid.md) |
| 17 | Déménagement / ménage | P2 | À recruter | [`specs/17-demenagement.md`](./specs/17-demenagement.md) |
| 18 | Photographe / home staging | P2 | À recruter | [`specs/18-photo-home-staging.md`](./specs/18-photo-home-staging.md) |
| 19 | Huissier | P2 | À recruter | [`specs/19-huissier.md`](./specs/19-huissier.md) |
| 20 | Clôture & portail | P2 | À recruter | [`specs/20-cloture-portail.md`](./specs/20-cloture-portail.md) |
| 21 | Négoce matériaux | P2 | À recruter | [`specs/21-materiaux-negoce.md`](./specs/21-materiaux-negoce.md) |
| 22 | Syndic / copropriété | P2 | À recruter | [`specs/22-syndic-copropriete.md`](./specs/22-syndic-copropriete.md) |
| 23 | Fintech caution / escrow | P1 | À recruter | [`specs/23-fintech-caution-escrow.md`](./specs/23-fintech-caution-escrow.md) |
| 24 | Agence partenaire / réseau inter-agences | P2 | À recruter | [`specs/24-agence-partenaire-reseau.md`](./specs/24-agence-partenaire-reseau.md) |

## Comment utiliser

1. **P0 existants** : nommer le partenaire dans §12 de la fiche + signer la convention d’apporteur.
2. Brancher le CTA produit (simu, closing, bail) → `PartnerLead`.
3. Suivre `CommissionEvent` dans le CRM agence.
4. Recruter les **À recruter** selon vague V1.5 / V2 (`partenaires.md` §6).

## Lien add-ons

Les add-ons (`docs/add-ons/`) sont souvent le **front** (outil / checklist) ; le partenaire est le **back** (exécution + commission).
