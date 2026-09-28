# Architecte

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `02-architecte.md` |
| **Priorité** | **P0** |
| **Catégorie** | Construction |
| **Statut** | Relation existante — à nommer & signer |
| **Synthèse** | Architecte de confiance pour plans de qualité, PC/TeleDAC, et projects au-dessus du seuil légal (~30 M FCFA). |

## 1. Besoin client

Plans sérieux, conformité urbanisme, esthétique ; obligation archi au-delà d’un coût de construction élevé.

## 2. Offre partenaire

Esquisse → APS/APD → dossiers permis ; éventuellement plans types adaptés SN.

## 3. Commission (indicatif — à figer en convention)

10–20 % des honoraires architecte **ou** forfait intro 150–500k FCFA selon ticket. Déclencheur : signature mission archi.

## 4. Synergies add-ons / produit

`02-simulateur-construction`, `09-permis-construire-cu`, `25-plans-types`

## 5. Parcours (passerelle)

1. CTA « Parler à un architecte » si budget estimé > seuil
2. Brief (surface, niveaux, style, budget)
3. RDV / visioconf → devis mission
4. Commission à la signature de la mission

## 6. SLA attendu

Retour sous 48–72 h ; 1ère esquisse selon devis

## 7. Cadre contractuel

Convention apporteur ; client signe avec l’architecte (ordre de service)

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

leads_archi, missions_signees, ticket_moyen, upsell_constructeur

## 10. Risques

Confusion archi vs dessinateur non habilité ; vérifier inscription Ordre

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 architecte nommé + brief type |
| **Plus tard** | Catalogue plans types + custom ; co-offre archi+constructeur |

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
