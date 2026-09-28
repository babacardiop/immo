# Inspection / contrôle qualité diaspora

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `10-inspection-diaspora.md` |
| **Priorité** | **P1** |
| **Catégorie** | Diaspora |
| **Statut** | À recruter |
| **Synthèse** | Tiers indépendant pour constater l’état du bien / avancement chantier (photos datées, rapport). |

## 1. Besoin client

Acheteur à distance : reconstituer la capacité de constater (leçon MyAfric).

## 2. Offre partenaire

Visite protocolée, rapport PDF, jalons chantier.

## 3. Commission (indicatif — à figer en convention)

Forfait par visite (agence markup 20–40 % ou fee fixe apporteur).

## 4. Synergies add-ons / produit

`15-inspection-diaspora`, `26-suivi-chantier`

## 5. Parcours (passerelle)

1. Lead diaspora
2. Cahier des charges visite
3. Rapport → go/no-go paiement

## 6. SLA attendu

Visite sous 3–7 j ; rapport 24 h après

## 7. Cadre contractuel

Indépendance vs vendeur/constructeur obligatoire

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

visites, anomalies_detectees, paiements_bloquees_a_raison

## 10. Risques

Inspecteur lié au vendeur = pire cas ; clause d’indépendance

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1–2 inspecteurs Dakar |
| **Plus tard** | Réseau régional + app photo GPS |

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
