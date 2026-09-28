# Formalités & obtention de papiers légaux

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `04-formalites-papiers-legaux.md` |
| **Priorité** | **P0** |
| **Catégorie** | Administratif |
| **Statut** | Relation existante — à nommer & signer |
| **Synthèse** | Cabinet / expert démarches pour NICAD, plan cadastral, CU, permis, quitus, dossiers DGID — le « faire établir les papiers ». |

## 1. Besoin client

Clients (surtout diaspora) perdus dans les guichets ; délais ; pièces manquantes qui bloquent notaire ou chantier.

## 2. Offre partenaire

Prise en charge dossier administratif : constitution, suivi, récupération pièces officielles.

## 3. Commission (indicatif — à figer en convention)

Forfait par type de dossier (ex. 50–300k selon complexité) **ou** 15–25 % des honoraires cabinet. Déclencheur : dossier déposé / pièce obtenue.

## 4. Synergies add-ons / produit

`08-due-diligence-fonciere`, `09-permis-construire-cu`, `21-certification-docs`, `43-regularisation-tf`

## 5. Parcours (passerelle)

1. Agent détecte trou documentaire
2. Lead formalités avec liste pièces manquantes
3. Partenaire chiffure + timeline
4. Suivi statut dans CRM (déposé / obtenu / bloqué)

## 6. SLA attendu

Devis 48 h ; reporting hebdo sur dossiers ouverts

## 7. Cadre contractuel

Périmètre écrit (ce qui est inclus) ; pas de garantie de résultat administration — obligation de moyens

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

dossiers, pieces_obtenues, delai_median, unblock_rate_closing

## 10. Risques

Promesses irréalistes de délais admin ; communication prudente au client

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 interlocuteur + grille forfaits types (NICAD, CU, PC…) |
| **Plus tard** | Statuts auto dans portail client ; bundle diligence+formalités |

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
