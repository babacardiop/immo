# Notaire

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `03-notaire.md` |
| **Priorité** | **P0** |
| **Catégorie** | Juridique |
| **Statut** | Relation existante — à nommer & signer |
| **Synthèse** | Étude notariale de confiance pour actes de vente, séquestre, mutations TF, procurations diaspora. |

## 1. Besoin client

Sécuriser le closing ; éviter paiements Wave directs au vendeur ; mutation au Livre foncier.

## 2. Offre partenaire

Avant-contrat / acte authentique, séquestre, formalités Conservation, conseil pièces.

## 3. Commission (indicatif — à figer en convention)

Forfait apporteur par dossier clos (souvent 50–200k FCFA) selon accord déontologique de l’étude. Éviter % agressifs sur émoluments.

## 4. Synergies add-ons / produit

`17-notaire-pack-juridique`, `18-calculateur-frais-acquisition`, `35-escrow-sequestre`, `37-procuration-assist`

## 5. Parcours (passerelle)

1. Offre acceptée → tunnel closing
2. Intro étude + envoi checklist pièces
3. Séquestre & signature
4. Commission à l’acte / mutation engagée

## 6. SLA attendu

Prise en charge dossier < 72 h ; liste pièces écrite dès J0

## 7. Cadre contractuel

Accord commercial compatible déontologie notariale ; traçabilité apporteur

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

dossiers_ouverts, actes_signes, delai_moyen_closing, commission

## 10. Risques

Conflit si notaire « du vendeur » imposé ; toujours proposer notre étude ou choix client éclairé

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 étude + checklist closing dans le CRM |
| **Plus tard** | Estimateur frais branché barème ; procuration diaspora pack |

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
