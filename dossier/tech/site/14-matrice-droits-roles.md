# Matrice droits & rôles (RBAC)

**Document :** Dossier · Tech · Site · 14  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`11-cahier-des-charges-fonctionnel.md`](./11-cahier-des-charges-fonctionnel.md) · [`09-back-office-agents.md`](./09-back-office-agents.md) · [`04-crm-et-leads.md`](./04-crm-et-leads.md) · [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) · [`13-sitemap-architecture-information.md`](./13-sitemap-architecture-information.md) · [`../../../docs/positioning.md`](../../../docs/positioning.md)  
**Aval :** Auth.js callbacks · middleware `/espace/*` · Prisma policies · tests ACL · [`19-data-flow-rgpd.md`](./19-data-flow-rgpd.md)

> **Rôle :** définir **qui peut voir / faire quoi** sur le hub — rôles, scopes, permissions `module.action`, champs sensibles, audit.  
> Couvre le cadrage README (Visiteur / Client / Admin / Modérateur) **et** les rôles métier EverGreen (Agent, OD, Proprio, GER).

---

## 0. En une phrase

RBAC **rôle + scope** : l’agent ne voit que **ses** leads ; le modérateur/OD gouverne catalogue & SLA ; l’admin configure sans être le quotidien ops.

```
Role (quoi) × Scope (où) × Resource → Allow / Deny
UI hide + API reject (défense en profondeur)
```

---

## 1. Principes

Bench CRM immo 2025–26 ([IRM365](https://irm365.com/features/admin-security), [iRealtee RBAC](https://irealtee.com/features/role-based-access-control), [PropCRM](https://propcrm.ae/blog/crm-real-estate-teams-role-based-access-permissions-accountability), [Makanify](https://makanify.com/features/roles-permissions), [TaskEstate matrix](https://taskestate.com/security-users-permissions/role-based-permissions-matrix)) :

| # | Principe | EverGreen |
| ---: | --- | --- |
| 1 | Permissions sur **rôles**, pas personnes | Seeds rôles · overrides rares |
| 2 | **Scope** (own / team / all / property) | Agent = own · OD = all |
| 3 | Pattern `module.action` | `leads.read`, `listings.publish`… |
| 4 | UI hide **et** API deny | Pas seulement front |
| 5 | Super-admin ≠ usage quotidien | ADM réservé config |
| 6 | Export / delete restreints | OD+ seulement |
| 7 | Champs sensibles field-level | Commissions, CNI, NICAD vault |
| 8 | Audit trail mutations | Qui a publié / assigné / exporté |
| 9 | Lead = **société** | Pas de « livre agent » opaque |
| 10 | Portails L/P = données **scoped** bien/bail | Jamais catalogue BO complet |

---

## 2. Catalogue des rôles

### 2.1 Mapping README ↔ codes produit

| README (attendu) | Code | Nom produit | Auth ? | Vague |
| --- | --- | --- | :---: | :---: |
| **Visiteur** | `visitor` | Visiteur public | ○ | V0 |
| **Client** | `client` | Locataire / acquéreur (espace) | ● | V3 |
| *(Proprio)* | `landlord` | Propriétaire / bailleur | ● | V3 |
| **Modérateur** | `moderator` | **OD** — ops / qualité / publish | ● | V0 |
| *(Agent)* | `agent` | Agent commercial (AC) | ● | V0 |
| **Admin** | `admin` | Admin technique | ● | V0 |
| *(Direction)* | `ger` | GER / direction (vue + finance soft) | ● | V0 soft |
| *(Partenaire)* | `partner` | Compte P — **Won’t Y1** | — | 8+ |

**Modérateur = OD** dans le discours métier : contrôle publish, réassignation leads, archive, export light, pas forcément « éditeur blog » seul.

Un user peut cumuler rôles (union des permissions) — ex. OD + agent terrain rare ; **éviter** admin+agent quotidien.

### 2.2 Fiches rôle

| Code | Mission | Shell URL | Ne fait pas |
| --- | --- | --- | --- |
| `visitor` | Parcourir, simuler, contacter | Public | Voir vault, CRM, autres leads |
| `client` | Suivre bail / échéancier / quittances | `/espace/client` | Voir autres locataires · BO |
| `landlord` | Suivre biens gérés / loyers | `/espace/proprio` | Éditer catalogue public · leads achat |
| `agent` | Qualifier, publier (gates), closer | `/espace/agent` | Voir leads d’autrui · force-publish · users |
| `moderator` | Qualité, SLA, exceptions publish, assign | `/espace/agent` (+ droits) | Secrets infra · casser audit |
| `ger` | Vue pipeline, commissions, KPI | BO lecture+finance soft | Config technique quotidienne |
| `admin` | Users, rôles, integ, feature flags | Admin / settings | Closer deals à la place des agents (sauf urgence) |

### 2.3 Hiérarchie (héritage soft)

```
visitor
client / landlord          ← portails (pas enfants d’agent)
agent
  └── moderator (OD)       ← agent + all-scope + exceptions
        └── ger            ← + finance / export large (option)
admin                      ← orthogonal (config), pas « au-dessus » métier
```

Implémentation : pas d’héritage magique obligatoire — **matrice explicite** ci-dessous ; hiérarchie = aide à raisonner.

---

## 3. Modèle de scope

| Scope | Sens | Exemple |
| --- | --- | --- |
| `public` | Ressource publiée / page ouverte | Fiche `published` |
| `own` | Créé ou **assigné** à `user_id` | Lead `owner_id = me` |
| `team` | Même branche / équipe (Y2 si multi-branch) | — soft Y1 = treat as all OD |
| `property` | Biens liés au mandat gestion / bail du user | Portail L/P |
| `all` | Toute la société | OD / GER / Admin (selon module) |
| `none` | Interdit | — |

**Y1 simplification :** pas de `team` multi-succursale — `agent=own`, `moderator/ger/admin=all` (modules métier).

---

## 4. Légende matrice

| Symbole | Sens |
| :---: | --- |
| ● | Allow (scope indiqué) |
| ◐ | Allow **own** / **property** only |
| ○ | Deny |
| ░ | N/A vague (pas ship) |
| ⚠ | Allow avec **double check** / audit (exception) |

Actions génériques : `read` · `create` · `update` · `delete` · `publish` · `assign` · `export` · `admin`.

---

## 5. Matrice par module

Colonnes : **V** visitor · **C** client · **L** landlord · **A** agent · **M** moderator (OD) · **G** ger · **Ad** admin

### 5.1 Site public & contenu

| Permission | V | C | L | A | M | G | Ad |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `pages.public.read` | ● | ● | ● | ● | ● | ● | ● |
| `guides.read` | ● | ● | ● | ● | ● | ● | ● |
| `outils.run` (simus ungated) | ● | ● | ● | ● | ● | ● | ● |
| `guides.create` / `guides.publish` | ○ | ○ | ○ | ○ | ● | ● | ● |
| `observatoire.read` (si L4 public) | ● | ● | ● | ● | ● | ● | ● |
| `observatoire.publish` | ○ | ○ | ○ | ○ | ○ | ⚠ | ● |

Contenu éditorial : M/G/Ad (ou workflow externe Notion→MD) — Agent **ne** publie **pas** les piliers sans OD.

### 5.2 Catalogue & listings

| Permission | V | C | L | A | M | G | Ad |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `listings.public.read` (published) | ● | ● | ● | ● | ● | ● | ● |
| `listings.draft.read` | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `listings.create` | ○ | ○ | ○ | ● | ● | ● | ● |
| `listings.update` | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `listings.publish` (gates papier OK) | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `listings.force_publish` (bypass soft) | ○ | ○ | ○ | ○ | ⚠ | ⚠ | ⚠ |
| `listings.unpublish` / `archive` | ○ | ○ | ○ | ◐* | ● | ● | ● |
| `listings.delete` (hard) | ○ | ○ | ○ | ○ | ⚠ | ● | ● |
| `listings.boost` (V2+ policy diligence) | ○ | ○ | ○ | ○ | ● | ● | ● |

\*Agent : unpublish **own** drafts/published qu’il possède ; pas archive société massive.

**RG :** `listings.publish` **toujours** soumis aux gates `05` (papier) — même pour M ; `force_publish` = exception audité + motif.

### 5.3 CRM & leads

| Permission | V | C | L | A | M | G | Ad |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `leads.create` (self via form/WA) | ●† | ●† | ●† | ● | ● | ● | ● |
| `leads.read` | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `leads.update` (notes, stage) | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `leads.assign` | ○ | ○ | ○ | ○ | ● | ● | ● |
| `leads.delete` | ○ | ○ | ○ | ○ | ⚠ | ● | ● |
| `leads.export` | ○ | ○ | ○ | ○ | ● | ● | ● |
| `partner_leads.read` | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `partner_leads.create` | ○ | ○ | ○ | ● | ● | ● | ● |
| `partner_leads.update` | ○ | ○ | ○ | ◐ | ● | ● | ● |

† = création **anonyme** de son propre lead (pas lecture CRM).

### 5.4 Mandats & dossiers (BO)

| Permission | V | C | L | A | M | G | Ad |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `mandates.read` | ○ | ○ | ◐‡ | ◐ | ● | ● | ● |
| `mandates.create` | ○ | ○ | ○ | ● | ● | ● | ● |
| `mandates.update` | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `mandates.close` | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `deals.read` | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `deals.update` | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `diligence.checklist` (V2) | ○ | ○ | ○ | ◐ | ● | ● | ● |

‡ Landlord : voir **son** mandat de gestion (statut), pas les mandats vente d’autrui.

### 5.5 Documents (vault)

| Permission | V | C | L | A | M | G | Ad |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `docs.public_media.read` | ● | ● | ● | ● | ● | ● | ● |
| `docs.vault.read` (PDF mandat, CNI, EDR) | ○ | ◐§ | ◐§ | ◐ | ● | ● | ● |
| `docs.vault.upload` | ○ | ○ | ○ | ◐ | ● | ● | ● |
| `docs.vault.delete` | ○ | ○ | ○ | ○ | ⚠ | ● | ● |

§ Client/Landlord : uniquement docs **de leur** bail / bien (quittances, bail PDF) — jamais CNI d’un autre mandant.

### 5.6 Portails client / proprio (V3)

| Permission | V | C | L | A | M | G | Ad |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `portal.client.access` | ○ | ● | ○ | ○ | ●‖ | ●‖ | ●‖ |
| `portal.landlord.access` | ○ | ○ | ● | ○ | ●‖ | ●‖ | ●‖ |
| `rent.ledger.read` | ○ | ◐ | ◐ | ◐# | ● | ● | ● |
| `rent.receipt.read` | ○ | ◐ | ◐ | ◐# | ● | ● | ● |
| `ticket.panne.create` | ○ | ● | ○ | ● | ● | ● | ● |
| `edl.create` (état des lieux) | ○ | ○ | ○ | ● | ● | ● | ● |
| `edl.read` | ○ | ◐ | ◐ | ◐ | ● | ● | ● |

‖ Impersonation / « view as » OD : **⚠** audit + motif · pas usage agent.  
# Agent : biens/dossiers **assignés** seulement.

### 5.7 Finance / commissions

| Permission | V | C | L | A | M | G | Ad |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `commissions.read` | ○ | ○ | ○ | ◐ own | ● | ● | ● |
| `commissions.update` | ○ | ○ | ○ | ○ | ● | ● | ○* |
| `finance.export` | ○ | ○ | ○ | ○ | ○ | ● | ⚠ |
| `payouts.manage` (Wave V3+) | ○ | ○ | ○ | ○ | ● | ● | ● |

\* Admin technique ne « corrige » pas les commissions sans rôle G/M.

### 5.8 Admin système

| Permission | V | C | L | A | M | G | Ad |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `users.read` | ○ | ○ | ○ | ○ | ● | ● | ● |
| `users.create` / `users.deactivate` | ○ | ○ | ○ | ○ | ○ | ○ | ● |
| `roles.assign` | ○ | ○ | ○ | ○ | ○ | ○ | ● |
| `integrations.config` | ○ | ○ | ○ | ○ | ○ | ○ | ● |
| `feature_flags` | ○ | ○ | ○ | ○ | ○ | ○ | ● |
| `audit_log.read` | ○ | ○ | ○ | ○ | ● | ● | ● |
| `settings.agency` (NAP, WA number) | ○ | ○ | ○ | ○ | ● | ● | ● |

---

## 6. Permissions champs sensibles (field-level)

| Champ / donnée | V | C/L | A | M/G | Ad |
| --- | :---: | :---: | :---: | :---: | :---: |
| Prix public listing | ● | ● | ● | ● | ● |
| `nicad` / notes titre internes | ○ | ○ | ◐ | ● | ● |
| CNI mandant (vault) | ○ | ○ | ◐ | ● | ● |
| Téléphone lead | ○ | ○ | ◐ | ● | ● |
| `% commission` mandat | ○ | ○ | ◐ own | ● | ○* |
| IBAN / Wave payout proprio | ○ | ◐ own | ○ | ● | ⚠ |
| Mot de passe / sessions | ○ | own | own | ○ | ● reset |

\* Admin lit logs techniques, pas la grille commerciale par défaut.

---

## 7. Matrice routes (accès shell)

| Route pattern | V | C | L | A | M | G | Ad |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `/`, `/acheter/*`, `/louer/*`, `/guides/*`, `/outils/*` | ● | ● | ● | ● | ● | ● | ● |
| `/gerer`, `/diaspora`, `/agence/*`, `/legal/*` | ● | ● | ● | ● | ● | ● | ● |
| `/espace/connexion` | ● | ● | ● | ● | ● | ● | ● |
| `/espace/client/**` | ○ | ● | ○ | ○ | ⚠ | ⚠ | ⚠ |
| `/espace/proprio/**` | ○ | ○ | ● | ○ | ⚠ | ⚠ | ⚠ |
| `/espace/agent/**` | ○ | ○ | ○ | ● | ● | ● | ● |
| `/espace/admin/**` (settings) | ○ | ○ | ○ | ○ | ○ | ○ | ● |
| API `/api/agent/**` | ○ | ○ | ○ | ● | ● | ● | ● |
| API `/api/admin/**` | ○ | ○ | ○ | ○ | ○ | ○ | ● |

Middleware : session + `role` claim · 401 unauth · 403 role mismatch · **jamais** 200 vide trompeur sur data privée.

---

## 8. Cas limites & règles métier

| Cas | Décision |
| --- | --- |
| Agent quitte | Leads `owner` réassignés OD · historique société conservé |
| Lead non assigné | Visible **M/G** · file « unowned » · pas caché agent |
| Deux agents sur un deal | `deals` co-assign · notes communes · pas double livre |
| Vendeur sous mandat veut voir l’annonce | Lien public listing · **pas** compte landlord sauf gestion |
| Diaspora | Reste `visitor` (+ tag CRM) jusqu’à portail client si closing |
| Partenaire BTP | Pas de login Y1 — reçoit intro WA/email |
| Self-publish vendeur | **Toujours deny** (tous rôles publics) |
| Blog contributor externe | Compte `moderator` restreint `guides.*` only (option) ou hors app |

---

## 9. Seeds rôles V0 (minimal ship)

| Rôle seed | Permissions minimales V0 |
| --- | --- |
| `visitor` | public read + outils + leads.create self |
| `agent` | listings CRUD own + publish gated · leads own · mandates own · docs vault own · agent shell |
| `moderator` | agent + all-scope listings/leads · assign · archive · export leads · guides.publish · settings.agency |
| `admin` | users · roles · integrations · audit · force tools |

`client` / `landlord` / `ger` : seeds **préparés** schema V0, UI V3 / soft.

---

## 10. Phasage

| Vague | ACL focus |
| --- | --- |
| **V0** | visitor · agent · moderator · admin · gates publish · leads own/all |
| **V1** | partner_leads · commissions read own |
| **V2** | diligence · boost policy · export élargi G |
| **V3** | client · landlord portals · rent ledger scopes · panne tickets |
| **V4+** | tags diaspora · impersonation controls renforcés |
| **V8+** | partner portal optionnel |

---

## 11. Audit & conformité

| Événement | Loguer |
| --- | --- |
| Login / logout / fail | user, ip, ts |
| `listings.publish` / `force_publish` | user, listing_id, motif si force |
| `leads.assign` / `export` | user, count, filtres |
| `docs.vault.read` (CNI/EDR) | user, doc_id |
| Impersonation portail | actor, target, motif |
| `roles.assign` | actor, target, roles |

Rétention & base légale → `19`. Export OD = finalité ops + minimisation.

---

## 12. Tests d’acceptation ACL (extrait)

| # | Scénario | Attendu |
| ---: | --- | --- |
| ACL-01 | Visitor GET `/espace/agent` | Redirect login |
| ACL-02 | Agent GET lead d’un autre | 403 / absent liste |
| ACL-03 | Agent publish sans `paper_type` | 400 gate — même si UI forcée |
| ACL-04 | Moderator force_publish | 200 + audit motif |
| ACL-05 | Agent export all leads CSV | 403 |
| ACL-06 | Client A GET quittance client B | 403 |
| ACL-07 | Landlord GET vault CNI autre mandat | 403 |
| ACL-08 | Admin only `/espace/admin` | Agent 403 |
| ACL-09 | Visitor POST form contact | 201 lead self |
| ACL-10 | Unauth API listings.draft | 401 |

Lier US : EF-ADM-01…04 · US-V0-30 · US-V0-12 · US-V0-34.

---

## 13. Implémentation (contrat eng)

```ts
// Concept — pas CdCT complet
type Role = 'visitor' | 'client' | 'landlord' | 'agent' | 'moderator' | 'ger' | 'admin'
type Scope = 'public' | 'own' | 'property' | 'all' | 'none'

function can(user: SessionUser, action: Permission, resource?: Resource): boolean
```

- Source de vérité permissions : table `role_permissions` + seed migration  
- Overrides user : exception documentée, expire si possible  
- Front : feature flags dérivés de `can()` · jamais seul garde  

Stack auth : Auth.js / équivalent (`tech-stack`) · JWT/session claims `roles[]`.

---

## 14. Glossaire

| Terme | Sens |
| --- | --- |
| **Modérateur** | Rôle README = **OD** produit (`moderator`) |
| **Client** | Portail locataire / acquéreur — pas « client CRM » lead |
| **Own** | Assigné / créé par l’utilisateur |
| **Force publish** | Contournement soft gate — jamais silencieux |
| **GER** | Direction · vue + finance · pas admin tech |

---

## 15. Sources

| Source | Apport |
| --- | --- |
| CdCF `11` EF-ADM · `09` BO · `04` CRM · `05` gates | Besoins EverGreen |
| IRM365 / iRealtee / PropCRM / Makanify | RBAC brokerage · own vs all · export deny agents |
| TaskEstate | Matrice action × rôle · scope property |
| `positioning` portails | Trois espaces L / P / Agence |

---

## 16. Liens

| Doc | Usage |
| --- | --- |
| [`09-back-office-agents.md`](./09-back-office-agents.md) | Modules couverts par ACL |
| [`04-crm-et-leads.md`](./04-crm-et-leads.md) | Owner / SLA |
| [`12-user-stories-backlog.md`](./12-user-stories-backlog.md) | US auth |
| [`19-data-flow-rgpd.md`](./19-data-flow-rgpd.md) | Données sensibles |

---

*Matrice droits EverGreen Site v1.0 — sept. 2026. Visiteur / Client / Landlord / Agent / Modérateur(OD) / GER / Admin · scope own|all|property · gates papier · audit force_publish & export.*
