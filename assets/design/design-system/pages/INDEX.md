# Pages — inventaire complet

Chaque feuille contient `layout.jpg` (frame dédiée ou alias template proche).  
Collages : `_misc-collage.jpg`, `outils/_secondary-collage.jpg`, `espace/agent/_modules-collage.jpg`, `espace/_portails-collage.jpg`.

## Public

| Dossier | Route | Notes |
| --- | --- | --- |
| `public/home/` | `/` | → DS hero / mockup home |
| `public/catalogue/acheter-list/` | `/acheter` | |
| `public/catalogue/acheter-map/` | `/acheter?view=map` | |
| `public/catalogue/louer-list/` | `/louer` | |
| `public/catalogue/louer-map/` | `/louer?view=map` | alias map |
| `public/catalogue/type-terrains/` | `/acheter/terrains` | alias list |
| `public/catalogue/empty/` | empty catalogue | |
| `public/catalogue/filters-drawer/` | filtres mobile | |
| `public/fiche/vente/` | `/acheter/[slug]` | |
| `public/fiche/location/` | `/louer/[slug]` | |
| `public/fiche/terrain-embeds/` | fiche terrain + simus | V1 |
| `public/hubs/gerer/` | `/gerer` | |
| `public/hubs/diaspora/` | `/diaspora` | |
| `public/hubs/diaspora-securiser/` | `/diaspora/securiser` | |
| `public/hubs/diaspora-inspection/` | `/diaspora/inspection` | |
| `public/hubs/diaspora-procuration/` | `/diaspora/procuration` | |
| `public/hubs/agence/` | `/agence` | |
| `public/hubs/agence-how/` | `/agence/comment-on-travaille` | |
| `public/hubs/agence-contact/` | `/agence/contact` · `/contact` | |
| `public/hubs/agence-equipe/` | `/agence/equipe` | opt |
| `public/hubs/quartier-landing/` | `/quartiers/[slug]` | |
| `public/guides/hub/` | `/guides` | |
| `public/guides/article/` | `/guides/[slug]` | |
| `public/guides/glossaire/` | `/guides/glossaire` | |
| `public/guides/hub-thematique/` | `/guides/{hub}/` | |
| `public/outils/hub/` | `/outils` | |
| `public/outils/mensualite/` | `/outils/mensualite` | |
| `public/outils/construction/` | `/outils/construction` | |
| `public/outils/budget-total/` | `/outils/budget-total` | |
| `public/outils/frais-acquisition/` | `/outils/frais-acquisition` | |
| `public/outils/estimation/` | `/outils/estimation` | |
| `public/outils/pret-a-batir/` | `/outils/pret-a-batir` | |
| `public/outils/carte-prix/` | `/outils/carte-prix` | |
| `public/outils/checklist/` | `/outils/checklists/[slug]` | |
| `public/outils/result-panel/` | pattern résultat | |
| `public/outils/embed-fiche/` | embed sur fiche | |
| `public/outils/error-state/` | input invalide | |
| `public/legal/*` | mentions · confidentialité · cgu · cookies | template legal |
| `public/system/404/` | 404 | |
| `public/system/plan-du-site/` | `/plan-du-site` | |
| `public/system/share-sheet/` | modal share | |
| `public/system/toast/` | toast | |
| `public/system/skeleton/` | skeleton | |
| `public/system/cookie-banner/` | cookies banner | |
| `public/partenaires/fiche/` | `/partenaires/[slug]` | |
| `public/observatoire/` | `/observatoire` | |

## Espace (auth)

| Dossier | Route |
| --- | --- |
| `espace/connexion/` | `/espace/connexion` |
| `espace/agent/leads-list/` | `/espace/agent/leads` |
| `espace/agent/lead-detail/` | `/espace/agent/leads/[id]` |
| `espace/agent/annonces-list/` | `/espace/agent/annonces` |
| `espace/agent/annonce-new/` | `/espace/agent/annonces/nouveau` |
| `espace/agent/annonce-edit/` | `/espace/agent/annonces/[slug]` |
| `espace/agent/media-upload/` | partial media |
| `espace/agent/mandats-list/` | `/espace/agent/mandats` |
| `espace/agent/mandat-detail/` | `/espace/agent/mandats/[id]` |
| `espace/agent/dossiers-*` | dossiers deals |
| `espace/agent/documents/` | vault |
| `espace/agent/partenaires/` | PartnerLead |
| `espace/agent/taches/` | tâches SLA |
| `espace/agent/profil/` | profil |
| `espace/agent/lieux/` | lieux thesaurus |
| `espace/proprio/*` | biens · loyers · docs |
| `espace/client/*` | loyers · échéancier · panne |
| `espace/ger/*` | pipeline · commissions |
| `espace/admin/*` | users · roles · flags |
| `espace/moderator/*` | assignations · qualité |

**Dashboards persona** (home widgets) → `../dashboards/{persona}/`.
