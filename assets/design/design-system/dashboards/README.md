# Dashboards & reports — par persona

**Sprint :** `S09-dashboards-reporting`  
**RBAC :** `dossier/tech/site/14-matrice-droits-roles.md`  
**Shell public marketing ≠** ces layouts (densité BO / portail).

| Persona | Code | URL | Dashboard | Reports |
| --- | --- | --- | :---: | :---: |
| Agent commercial | `agent` | `/espace/agent` | ✅ | ✅ performance |
| Modérateur / OD | `moderator` | `/espace/agent` (+ droits) | ✅ | ✅ ops / SLA |
| GER / direction | `ger` | `/espace/ger` (ou BO GER) | ✅ | ✅ direction / finance soft |
| Admin technique | `admin` | `/espace/admin` | ✅ | ✅ audit |
| Client (locataire / acquéreur) | `client` | `/espace/client` | ✅ | ❌ (docs/quittances dans dashboard) |
| Propriétaire / bailleur | `landlord` | `/espace/proprio` | ✅ | ✅ loyers / fiscal soft |

**Pas de dossier :** `visitor` (public) · `partner` (Won’t Y1).

Chaque sous-dossier = `persona.md` + frames image.
