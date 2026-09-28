# Constructeur / entreprise BTP

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `01-constructeur-btp.md` |
| **Priorité** | **P0** |
| **Catégorie** | Construction |
| **Statut** | Relation existante — à nommer & signer |
| **Synthèse** | Firme de construction partenaire pour devis et réalisation après achat terrain (clé en main ou gros œuvre). |

## 1. Besoin client

Le client a un terrain (ou vient de l’acheter) et veut chiffrer / construire sans chercher un artisan au hasard.

## 2. Offre partenaire

Devis structuré, planning, contrat travaux, options finition. L’agence intro + suit le lead jusqu’à signature.

## 3. Commission (indicatif — à figer en convention)

2–5 % du montant HT du contrat travaux signé (ou paliers : forfait si < 30 M, % au-delà). Déclencheur : acompte client encaissé.

## 4. Synergies add-ons / produit

`02-simulateur-construction`, `03-simulateur-budget-total`, `06-pack-terrain-maison`, `26-suivi-chantier`

## 5. Parcours (passerelle)

1. Simu construction ou Pack Terrain→Maison
2. Lead PartnerLead(type=constructeur) avec surface, zone, budget
3. Partenaire rappelle < 48 h → visite terrain / devis
4. Signature → CommissionEvent

## 6. SLA attendu

Rappel client 24–48 h ; devis sous 7–14 j ; photos chantier si suivi léger activé

## 7. Cadre contractuel

Convention apporteur + responsabilité chantier 100 % partenaire ; agence non co-contractante travaux

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

leads, devis_sent, contrats_signes, commission_fcfa, delai_rappel

## 10. Risques

Retards livraison, malfaçons → process plainte + droit de retirer le partenaire de la shortlist

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 firme nommée + CTA WhatsApp depuis simu |
| **Plus tard** | 2–3 constructeurs shortlistés par zone ; scoring avis ; escrow jalons |

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
