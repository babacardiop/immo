# Forms — inventaire complet

Chaque dossier = `layout.jpg`.

| Dossier | Usage | Surface |
| --- | --- | --- |
| `lead-contact/` | Formulaire contact site | `/contact` · `/agence/contact` |
| `lead-fiche/` | Lead sur fiche bien | fiche vente/loc |
| `gerer-demande/` | Demande mandat gestion | `/gerer/demande` |
| `estimation-vendeur/` | Lead estimation | `/outils/estimation` |
| `diaspora-inspection/` | Demande inspection | `/diaspora/inspection` |
| `diaspora-procuration/` | Demande POA | `/diaspora/procuration` |
| `login/` | Auth credentials | `/espace/connexion` |
| `listing-create/` | Création annonce | agent nouveau |
| `listing-edit/` | Édition annonce | agent edit |
| `mandat-create/` | Nouveau mandat | agent mandats |
| `media-upload/` | Photos listing | agent media |
| `partner-lead/` | Intro partenaire | agent partenaires |
| `ticket-panne/` | Ticket maintenance | client panne |
| `simu-mensualite/` | Inputs simu | `/outils/mensualite` |
| `simu-construction/` | Inputs simu | `/outils/construction` |
| `simu-budget/` | Inputs simu | `/outils/budget-total` |
| `simu-frais/` | Inputs frais | `/outils/frais-acquisition` |
| `simu-estimation/` | Inputs estimation | `/outils/estimation` |
| `profil-agent/` | Profil / WA / horaires | agent profil |
| `search-catalogue/` | Search card hero / catalogue | home · hubs |
| `demande-visite/` | Visite fiche → crée **prospect** | `/louer/[slug]` · **S08 #1** |
| `creer-compte-client/` | Compte scratch **ou** depuis prospect | agent lead detail · **S08 #3** |
| `assignation-bien/` | Assigner rôle **candidat** / landlord / buyer… | agent/OD · **S08 #4** |
| `dossier-exigences/` | Pièces + conditions (staff) | agent listing · **S08** |
| `candidature-location/` | Dépôt docs + **disclaimer staff-only** | candidat assigné · **S08 #5** |
| `paiement-loyer-caution/` | Checkout Wave/OM + **récap frais** (PSP + EverGreen 0,1 %) | locataire tenant · **S12** |
| `property-create/` | Créer **Property** durable (structure qty) | agent · **S09** |
| `listing-republish/` | Nouveau **cycle Listing** depuis Property | agent · **S09** |
| `commodites-structure/` | Chambres · WC · balcon ×N… | Property · **S09** |
| `commodites-offre-courte/` | Includes séjour (clim, wifi…) | Listing short · **S09** |

**Règles forms :** 3–4 champs max leads publics · consent RGPD · focus ring olive · erreurs `ds-20` · toast succès.  
**S08 :** forms dossier/candidature peuvent dépasser 4 champs (parcours auth portail, pas lead public).  
**S09 :** Property ≠ Listing · qty structure vs includes courte durée.  
**S12 :** récap frais non dismissible avant redirect PSP.
