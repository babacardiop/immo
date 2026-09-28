# Formalités & obtention de papiers légaux

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `04-formalites-papiers-legaux.md` |
| **Priorité** | **P0** |
| **Catégorie** | Administratif |
| **Statut** | Relation existante — à nommer & signer |
| **Synthèse** | Cabinet / expert démarches pour NICAD, plan cadastral, CU, **AC (papier mairie)**, quitus fiscaux, dossiers **DGID / Yastal (bail)**, preuve tutelle délibération — le « faire établir les papiers ». |

## 1. Besoin client

Clients (surtout diaspora) perdus dans les guichets ; délais ; pièces manquantes qui bloquent notaire ou chantier ; confusion **délibération / bail / TF** ; retards AC (souvent 3–12 mois, TeleDAc non fiable).

## 2. Offre partenaire

Prise en charge dossier administratif : constitution, suivi, récupération pièces officielles (EDR, NICAD, extraits, dépôts Domaines, dépôt AC mairie).

## 3. Commission (indicatif — à figer en convention)

Forfait par type de dossier (ex. 50–300k selon complexité) **ou** 15–25 % des honoraires cabinet. Déclencheur : dossier déposé / pièce obtenue.

## 4. Synergies add-ons / produit

`08-due-diligence-fonciere`, `09-permis-construire-cu`, `21-certification-docs`, `43-regularisation-tf`  
Réf. métier : `dossier/etude-de-marche/06-parcours-foncier-securite.md`

## 5. Parcours (passerelle)

1. Agent détecte trou documentaire (ou verdict diligence)
2. Lead formalités avec liste pièces manquantes + **régime** (TF/bail/délibération)
3. Partenaire chiffure + timeline **réaliste** (pas délais marketing TeleDAc)
4. Suivi statut dans CRM (déposé / obtenu / bloqué / CCOD)

## 6. SLA attendu

Devis 48 h ; reporting hebdo sur dossiers ouverts ; alerte si blocage tutelle / CCOD / DGSCOS

## 7. Cadre contractuel

Périmètre écrit (ce qui est inclus) ; **pas de garantie de résultat** administration — obligation de moyens ; interdiction de présenter délibération comme TF

## 8. Données (cible)

- `Partner` { id, type, name, zones[], contact, status }
- `PartnerLead` { partnerId, clientId, listingId?, payload, status }
- `CommissionEvent` { leadId, amount, currency, trigger, paidAt? }

## 9. KPI

dossiers, pieces_obtenues, delai_median, unblock_rate_closing, regularisation_bail_started

## 10. Risques

Promesses irréalistes de délais admin ; communication prudente au client ; zones contentieuses DGSCOS

## 11. Roadmap

| Phase | Contenu |
| --- | --- |
| **v1** | 1 interlocuteur + grille forfaits types (NICAD, EDR, CU, PC papier, Yastal) |
| **Plus tard** | Statuts auto dans portail client ; bundle diligence+formalités+régularisation |

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
