# Research Lab — Sprints & recon liaison hub

**Statut :** recon v0 — 15 oct. 2026  
**Périmètre :** comment brancher le **Lab** (app + data) sur le **hub** (`web/`) pour que des agents avec un rôle dédié s’y connectent, sans polluer le métier hub ni le crawl.  
**Amont :** [`../README.md`](../README.md) · [`../01-mission-lab.md`](../01-mission-lab.md)–[`07-roadmap-lab.md`](../07-roadmap-lab.md) · [`../../../../docs/research-lab/strategy.md`](../../../../docs/research-lab/strategy.md) · [`../../02-architecture-cible.md`](../../02-architecture-cible.md) · [`../../site/14-matrice-droits-roles.md`](../../site/14-matrice-droits-roles.md)

> **Ce dossier** = backlog sprintable + décisions d’archi auth/data.  
> **Ce n’est pas** un runbook de scrape. Les connecteurs restent pages publiques · robots · rate-limit · agrégats only ([`05-pipeline-data.md`](../05-pipeline-data.md)).

---

## 0. Verdict en une page

| Question | Réponse recommandée (v0) |
| --- | --- |
| Même BD pour **tout** ? | **Non.** Hub métier ≠ lab crawl/indices. |
| Même BD pour **l’auth / les users** ? | **Oui.** Une seule source de vérité `User` + sessions/credentials. |
| BD séparée pour **data lab** ? | **Oui** — Postgres (idéalement PostGIS) dédié `lab_*` / DB `evergreen_lab`. |
| Où vit l’UI lab ? | App **à côté** du hub : sous-domaine `lab.` ou app monorepo `apps/lab` — **pas** mélangée dans `/espace/agent` au début. |
| Comment un agent « research-lab » se connecte ? | Même login hub (Auth.js) + **rôle / flag** qui ouvre le lab ; cookie partagé sous-domaine **ou** login credentials contre la même table `User`. |
| Rôle Prisma aujourd’hui ? | `UserRole` = `AGENT \| MODERATOR \| ADMIN \| GER \| CLIENT \| LANDLORD` — **pas encore** de `RESEARCH_LAB`. |
| Auth actuelle hub | Auth.js (NextAuth v5) · **JWT** · Credentials (email/password) · PrismaAdapter · `AUTH_SECRET` |
| Priorité | Hub Vague 0–1 d’abord ; lab = voie parallèle ([`strategy.md`](../../../../docs/research-lab/strategy.md) §7). |

```
┌─────────────────────────────────────────────────────────────────┐
│  Hub web (Next)          lab.evergreen… (Next Lab UI)           │
│  Auth.js JWT / Creds  ◄── même AUTH_SECRET + même User DB ──►  │
└──────────────┬───────────────────────────────┬──────────────────┘
               │                               │
               ▼                               ▼
     Postgres HUB                    Postgres LAB (+ PostGIS)
     users, sessions*,               listings_raw, property_entities,
     listings, leads, CRM…           observations, ix_*, match_review…
               │                               │
               └──── lead_radar / pricing ─────┘
                    (API interne, IDs user hub)
```

\*Avec stratégie JWT actuelle, la table `Session` est peu utilisée pour le runtime ; l’identité vit dans le cookie JWT signé par `AUTH_SECRET`. Voir §3.

---

## 1. État des lieux (recon code + docs)

### 1.1 Ce qui existe déjà

| Zone | État | Fichiers clés |
| --- | --- | --- |
| Docs lab (stratégie, sources, PDF) | ✅ Riche | `docs/research-lab/*`, `dossier/tech/research-lab/01`–`07` |
| Pipeline / méthodo / roadmap L0–L5 | ✅ Spec | `05-pipeline-data`, `07-roadmap-lab`, `strategy.md` |
| App Lab (UI / workers / DB) | ❌ Absente | Pas de `apps/lab`, pas de schéma Prisma lab |
| Rôle `RESEARCH_LAB` | ❌ Absent | `web/prisma/schema.prisma` → enum `UserRole` |
| Auth hub | ✅ Live pattern | `web/src/lib/auth.ts`, `auth.config.ts`, `roles.ts` |
| Matrice RBAC hub | ✅ Spec | `dossier/tech/site/14-matrice-droits-roles.md` — **sans** rôle lab |
| Architecture cible | ✅ « Lab découplé » | `dossier/tech/02-architecture-cible.md` |

### 1.2 Auth hub — faits techniques (oct. 2026)

Extrait du comportement réel :

- **Provider :** Credentials (email + `passwordHash` bcrypt).
- **Session :** `strategy: "jwt"` (pas database sessions au runtime).
- **Adapter :** `PrismaAdapter(prisma)` (tables `User` / `Account` / `Session` / `VerificationToken` présentes).
- **Claims JWT :** `id`, `role` injectés dans `session.user`.
- **Guard staff :** `AGENT_ROLES = [AGENT, MODERATOR, ADMIN, GER]` (`web/src/lib/roles.ts`).
- **Pages protégées :** `/espace/*` sauf `/espace/connexion` (`auth.config.ts`).
- **Env :** `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `AUTH_TRUST_HOST` (`web/.env.example`).

Implications pour le Lab :

1. Partager un cookie JWT entre deux apps Next **nécessite le même `AUTH_SECRET`**, le même algorithme cookie, et idéalement le **même domaine parent** (`.evergreen.sn`).
2. Auth.js documente explicitement que les JWT sont **destinés à l’app qui les émet** ; le partage cross-app marche en pratique si secret + cookie domain alignés, mais la voie la plus robuste multi-app reste souvent **database sessions** (token opaque en cookie → lookup BD) ou un **login séparé** contre la même table `User`.
3. Credentials ne crée pas de row `Session` utile ; le lab doit soit relire le JWT, soit re-autoriser via `authorize()` contre `User`.

### 1.3 Rôles hub vs besoin lab

| Code actuel | Accès hub | Accès lab souhaité ? |
| --- | --- | --- |
| `CLIENT` / `LANDLORD` | Portails | **Jamais** (données concurrentielles / scrape) |
| `AGENT` | CRM, annonces own | Optionnel : lecture soft indices / radar assigné |
| `MODERATOR` (OD) | Catalogue, SLA | Review matches, gouvernance sources |
| `ADMIN` | Config | Provisioning users lab, secrets ops |
| `GER` | KPI / finance soft | Validation Observatoire (claims publics) |
| **`RESEARCH_LAB` (à créer)** | Minimal ou aucun | **Oui — cœur** : UI review, connecteurs, quarantine, indices staging |

Deux modèles de rôle envisageables (décision §5) :

- **A — Rôle exclusif** `RESEARCH_LAB` (comme un métier à part).
- **B — Flag / permission** `lab.access` en plus d’un rôle hub (`AGENT`+flag, `MODERATOR`+flag…).
- **C — Hybride** : enum `RESEARCH_LAB` **ou** `labAccess: Boolean` sur `User` pour les OD/GER qui cumulent.

Recommandation recon : **C (hybride)** — un data analyste lab peut n’avoir que `RESEARCH_LAB` ; un OD peut garder `MODERATOR` + `labAccess=true`.

### 1.4 Data lab déjà spécifiée (pas encore en BD)

Modèle minimal ([`strategy.md`](../../../../docs/research-lab/strategy.md) §9) :

```
Source · ListingRaw · PropertyEntity · ListingObservation
Quartier · MatchReview · LeadSignal
```

Couches pipeline ([`05`](../05-pipeline-data.md)) :

`raw → staging → curated → serving` + gate **WAP** (Write–Audit–Publish).

Ces tables **n’ont rien à faire** dans le schéma hub (listings CRM, leads, candidatures, vault docs). Mélanger = migrations monstrueuses, blast radius crawl, pollution Prisma client, backups inextricables.

---

## 2. Stratégie bases de données (recon + reco)

### 2.1 Options comparées

| Option | Description | Pros | Cons | Verdict |
| --- | :---: | --- | --- | --- |
| **1. Une seule DB, un seul schéma** | Tout dans `web` Prisma | Simplicité locale | Blast radius · migrations · PostGIS · volume crawl · secrets | ❌ Déconseillé |
| **2. Une DB, schémas Postgres `hub` / `lab`** | Même cluster, `search_path` | Isolation logique · un host | Prisma multi-schema OK mais relations croisées limitées · un WAL partagé | ◐ Acceptable early |
| **3. Deux DB, même cluster Postgres** | `evergreen_hub` + `evergreen_lab` | Isolation permissions · backups séparables · 2 Prisma clients | Pas de FK cross-DB · joins app-level | ✅ **Reco Y1** |
| **4. Deux clusters / projets** | Neon/RDS séparés | Isolation max · scaling indépendant | Coût · ops · latence sync | ◐ Si volume / compliance |

Références industrielles (Postgres multi-tenant / isolation) :

- AWS Prescriptive Guidance : silo / bridge (DB) / bridge (schema) / pool — pour **données non liées**, **bridge = DB séparées** dans un cluster est le sweet spot.
- Doc Postgres : projets peu liés → **databases séparées** ; projets liés → mêmes DB + schemas.
- Prisma : [multiple databases](https://www.prisma.io/docs/guides/database/multiple-databases) = **un client Prisma + un `prisma.config` par DB** ; pas de relations cross-DB (joindre en code via IDs).

### 2.2 Recommandation EverGreen (alignée à ta intuition)

```
DATABASE_URL          → evergreen_hub   (auth + métier)
LAB_DATABASE_URL      → evergreen_lab   (crawl, dédup, indices)
```

| Contenu | Où | Pourquoi |
| --- | --- | --- |
| `User`, `Account`, `Session`, `VerificationToken`, `role`, `labAccess` | **HUB** | Une identité, un login, un audit RH |
| Listings agence, leads, candidatures, vault | **HUB** | Produit / RGPD clients |
| `listings_raw`, `property_entities`, observations, `ix_*`, review queue | **LAB** | Volume, PostGIS, rejeu ELT, ToS risk |
| `LeadSignal.assignedAgentId` | **LAB** stocke l’**ID user hub** (string, pas FK) | Join applicatif |
| Agrégats publiables (médianes) | **LAB curated → API** → hub consomme | WAP ; hub ne lit jamais le raw |

**Même cluster Neon/Postgres Y1 :** créer une 2ᵉ database dans le projet (Neon permet plusieurs DB par branch) → 2 connection strings. Migrer vers 2 projets seulement si bruit voisin / taille.

### 2.3 Clients Prisma / workers

| Consommateur | Client | URL |
| --- | --- | --- |
| Hub Next (`web/`) | `prisma` (existant) | `DATABASE_URL` |
| Lab UI Next (futur) | `prismaAuth` (lecture User/role) + `prismaLab` | hub + lab |
| Workers Python | `asyncpg` / SQLAlchemy → lab only ; auth = API hub ou lecture read-only User | |

Ne **pas** dupliquer le schéma `User` dans la lab DB (sauf cache read-only synchronisé — anti-pattern Y1).

### 2.4 Object storage

Déjà prévu : MinIO/S3 raw payloads + fingerprints. **Bucket lab séparé** (`lab-raw`, `lab-media-cache`) ≠ vault hub CNI/EDR. Même provider S3 OK ; prefixes / buckets distincts + IAM séparés.

---

## 3. Liaison auth hub ↔ lab (options détaillées)

### 3.1 Objectif produit

> Un collaborateur avec droit lab ouvre `https://lab.…`, se connecte (ou est déjà connecté au hub), et n’accède qu’aux écrans lab autorisés. Les `CLIENT` / `LANDLORD` sont refusés.

### 3.2 Option A — Cookie JWT partagé (SSO soft sous-domaine)

**Setup :**

- Hub : `app.evergreen.sn` (ou apex)
- Lab : `lab.evergreen.sn`
- Cookie `sessionToken` avec `domain: ".evergreen.sn"`, `sameSite: "lax"`, `secure: true`
- Même `AUTH_SECRET` sur les deux apps
- Lab réutilise Auth.js + lit `session.user.role` / `labAccess`

**Pros :** UX SSO (login une fois).  
**Cons :** JWT Auth.js « meant for the issuing app » ; config cookies fragile en local (`localhost` ≠ sous-domaines) ; rotation secret = double deploy ; risque de contexte croisé si mal préfixé.

**Quand :** Dès que hub + lab sont en prod sur le **même domaine parent**.

Sources : [NextAuth FAQ — cookies cross-subdomain](https://next-auth.js.org/faq), [Auth.js cookies options](https://next-auth.js.org/configuration/options#cookies), issues SSO multi-app.

### 3.3 Option B — Login Credentials Lab contre la même table `User` (reco MVP)

Lab a sa propre page `/connexion`, même provider Credentials, **même `DATABASE_URL` hub (auth only)** + `LAB_DATABASE_URL` pour le métier lab.

```
authorize() → prismaHub.user.findUnique(email)
           → check passwordHash
           → check canAccessLab(role, labAccess)
           → JWT lab local (peut même avoir AUTH_SECRET distinct)
```

**Pros :** Simple · isolé · marche en local (ports 3000 / 3001) · pas de cookie domain.  
**Cons :** Double login si l’user a aussi le hub ouvert (acceptable Y1).

**Quand :** **Spike + L1–L2** — c’est la voie la plus sûre pour démarrer.

### 3.4 Option C — Database sessions partagées

Passer le hub (et le lab) en `session: { strategy: "database" }` : cookie = opaque `sessionToken` → lookup `Session` + `User` dans la hub DB.

**Pros :** Meilleur partage multi-app documenté ; révocation serveur (« sign out everywhere »).  
**Cons :** Migration depuis JWT actuel ; Edge middleware / Auth.js split config ; Credentials + adapter = attention (Credentials ignore souvent la persistence session sauf config custom).

**Quand :** Quand on formalise un vrai SSO multi-portails (hub + lab + futur tools).

### 3.5 Option D — Auth centrale (Keycloak / Auth.js « auth. » subdomain)

`auth.evergreen.sn` émet ; apps consomment. Overkill Y1.

### 3.6 Option E — Token d’échange (hub → lab)

Hub expose `POST /api/internal/lab-handoff` (user déjà auth) → code one-time court → lab l’échange contre sa session.

**Pros :** Domaines différents OK.  
**Cons :** Plus de surface API à sécuriser.

### 3.7 Recommandation phasée

| Phase | Auth |
| --- | --- |
| **Sprint 0–1 (maintenant)** | Option **B** — login lab → hub User DB + gate `canAccessLab` |
| **Sprint SSO (post L2 UI)** | Option **A** si même domaine parent, sinon **E** |
| **Scale multi-apps** | Option **C** (database sessions) ou IdP |

### 3.8 Gate d’accès lab (pseudo-règle)

```ts
function canAccessLab(user: { role: UserRole; labAccess?: boolean }) {
  if (user.role === "CLIENT" || user.role === "LANDLORD") return false;
  if (user.role === "RESEARCH_LAB") return true;
  if (user.labAccess === true) return true; // OD / GER / ADMIN opt-in
  if (user.role === "ADMIN") return true;   // bootstrap ops
  return false;
}
```

À figer dans `14-matrice-droits-roles.md` + tests ACL.

---

## 4. Topologie applicative cible

```
repo immo/
├── web/                     # hub Next (existant)
├── lab/   (à créer)         # Lab UI Next — review, indices, sources
│   ├── prisma/              # schéma LAB only
│   └── src/lib/auth.ts      # Credentials → prismaHub
├── workers/ (à créer)       # Python collectors / dédup
├── docs/research-lab/       # strategy, sources, études PDF
└── dossier/tech/research-lab/
    └── sprints/             # ← tu es ici
```

Variante monorepo plus tard : `apps/web`, `apps/lab`, `packages/auth-types`.

**Réseau :**

| Service | Port local | Prod |
| --- | --- | --- |
| Hub | 3000 | `www` / apex |
| Lab UI | 3001 | `lab.` |
| Redis queue | 6379 | managed |
| Workers | — | job runner / VM |

**Ponts hub ↔ lab (données) :**

| Flux | Direction | Mécanisme |
| --- | --- | --- |
| Identité | Hub DB → Lab | Lecture User / role |
| Lead radar | Lab → Hub CRM | API interne signed (`LeadSignal` → `Lead` / note) |
| Pricing / indices | Lab → Hub outils | API read-only agrégats versionnés (A05) |
| Thesaurus quartiers | Bidirectionnel soft | Seed partagé JSON/CSV versionné |

Interdit : le hub qui `SELECT * FROM listings_raw`.

---

## 5. Décisions à trancher (ADR-like)

| ID | Décision | Options | Reco | Owner |
| --- | --- | --- | --- | --- |
| D1 | Isolation data | 1 DB / schemas / 2 DB | **2 DB même cluster** | Tech |
| D2 | Rôle lab | Enum only / flag / hybride | **Hybride** `RESEARCH_LAB` + `labAccess` | Tech + GER |
| D3 | Auth MVP | Cookie share / Credentials dual / DB session | **Credentials dual (B)** | Tech |
| D4 | Emplacement UI | Route `/espace/lab` vs app séparée | **App séparée** `lab/` | Tech |
| D5 | PostGIS | Dès L1 ou plus tard | **Dès DB lab** (quartiers / geo) | Data |
| D6 | Workers | Node vs Python | **Python** crawl/ML ; Node UI | Data |
| D7 | Observatoire public | Sur hub ou lab | **Hub** consomme API ; lab reste interne | Produit |

Cocher et dater dans ce README quand validé.

---

## 6. Backlog todos — sprints

Légende : `P0` critique · `P1` important · `P2` nice · `[ ]` ouvert.

### Sprint S0 — Cadrage & fondations auth/data (1–2 sem.)

- [ ] **S0.1** Valider décisions D1–D7 (réunion courte GER + tech) — *P0*
- [ ] **S0.2** Créer database Postgres `evergreen_lab` (même projet Neon/cluster) + `LAB_DATABASE_URL` / `LAB_DATABASE_URL_UNPOOLED` — *P0*
- [ ] **S0.3** Scaffold app `lab/` (Next App Router + TS + Tailwind aligné design tokens) — *P0*
- [ ] **S0.4** Prisma hub : ajouter `RESEARCH_LAB` à `UserRole` **et/ou** `labAccess Boolean @default(false)` — migration — *P0*
- [ ] **S0.5** Mettre à jour `roles.ts`, `14-matrice-droits-roles.md`, seeds — *P0*
- [ ] **S0.6** Auth lab Option B : Credentials → `prismaHub` + `canAccessLab` + page `/connexion` — *P0*
- [ ] **S0.7** Middleware lab : refuser CLIENT/LANDLORD ; redirect login — *P0*
- [ ] **S0.8** Seed user de test `role=RESEARCH_LAB` (local only) — *P0*
- [ ] **S0.9** Documenter env `.env.example` lab (sans secrets) — *P1*
- [ ] **S0.10** Lien navigation hub → lab (OD/ADMIN only, feature flag) — *P2*

### Sprint S1 — Schéma lab minimal + UI coquille (1–2 sem.)

- [ ] **S1.1** Prisma lab : `Source`, `ListingRaw`, `Quartier` (thesaurus), `IngestRun` — *P0*
- [ ] **S1.2** Migrations lab isolées (`lab/prisma/migrations`) — *P0*
- [ ] **S1.3** UI shell : layout, nav (Sources · Raw · Review · Indices · Admin) — *P0*
- [ ] **S1.4** Écran Sources CRUD (nom, baseUrl, enabled, notes ToS) — *P1*
- [ ] **S1.5** Import CSV manuel → `ListingRaw` (spike sans crawl) — *P0* (valide le modèle avant connecteur)
- [ ] **S1.6** Audit log lab (qui a importé / mergé) — *P1*
- [ ] **S1.7** Bucket S3/MinIO `lab-raw` + helper upload checksum SHA-256 — *P1*

### Sprint S2 — Spike L1 connecteur (post Vague 0 hub live)

Prérequis produit : hub Vague 0 live ([`07-roadmap-lab`](../07-roadmap-lab.md)).

- [ ] **S2.1** Choisir **1** source HTML P0 (Expat **ou** Immobilier-au-SN) + lire ToS — *P0*
- [ ] **S2.2** Worker Python : fetch + parse + idempotence `externalId` — *P0*
- [ ] **S2.3** Land 300 rows dans `ListingRaw` — *P0*
- [ ] **S2.4** UI Raw browser (filtres quartier / prix / date) — *P1*
- [ ] **S2.5** Dédup **intra-source** manuelle ou semi (Excel/UI) — *P0*
- [ ] **S2.6** Photo-hash sur 50 paires (pHash) — rapport précision — *P1*
- [ ] **S2.7** Mini rapport médiane 2–3 quartiers Z1 — *P0*
- [ ] **S2.8** Go / No-Go L2 écrit (ADR dans ce dossier) — *P0*

### Sprint S3 — Dédup + PropertyEntity + review queue

- [ ] **S3.1** Modèles `PropertyEntity`, `ListingObservation`, `MatchReview` — *P0*
- [ ] **S3.2** Blocking (quartier + type + m²±20 %) + score — *P0*
- [ ] **S3.3** Auto-merge ≥0,90 · queue 0,70–0,89 — *P0*
- [ ] **S3.4** Lab UI review (approve / reject / merge) — *P0*
- [ ] **S3.5** Métriques : % auto-merge, precision@sample — *P1*
- [ ] **S3.6** 2ᵉ source (si Go L2) — *P1*

### Sprint S4 — Serving soft + pont hub

- [ ] **S4.1** Vues / tables `ix_sale`, `ix_rent` (strates) + versioning — *P0*
- [ ] **S4.2** Gate WAP (staging → audit → publish) — *P0*
- [ ] **S4.3** API interne Pricing (agrégats only, auth service token) — *P0*
- [ ] **S4.4** Hub consomme API pour estimation / carte (feature flag) — *P1*
- [ ] **S4.5** Lead radar → créer `Lead` hub ou note agent (IDs user) — *P1*
- [ ] **S4.6** SSO Option A (cookie domain) si domaines prêts — *P2*

### Sprint S5 — Durcissement & Observatoire

- [ ] **S5.1** Gouvernance citation / fraîcheur ([`06`](../06-gouvernance-sources.md)) dans UI — *P1*
- [ ] **S5.2** Bundle Observatoire trimestriel (export + page hub) — *P1*
- [ ] **S5.3** RLS / roles SQL lab (worker vs UI vs readonly) — *P1*
- [ ] **S5.4** Backups lab séparés + rétention raw — *P1*
- [ ] **S5.5** FB / dense = **L5 only** si ROI — *P2* (souvent Won’t)

---

## 7. Todos transverses (toujours ouverts)

### Sécurité & légal

- [ ] Revue juridique ToS sources avant scale automatisé
- [ ] Pas de republication verbatim photos/textes concurrents
- [ ] Minimisation tél vendeur ; pas de revente de bases
- [ ] Secrets lab ≠ secrets hub dans les CI
- [ ] Rate-limit + robots.txt respectés dans chaque connecteur

### Ops

- [ ] Healthchecks lab UI + worker heartbeat
- [ ] Alertes file review > 48 h (KPI L2)
- [ ] Runbooks : rotate `AUTH_SECRET`, rotate DB passwords, purge quarantine

### Produit / contenu

- [ ] Thesaurus quartiers Dakar versionné (aliases)
- [ ] Pont ICC ANSD → barèmes simus (déjà L0 docs) sans attendre crawl
- [ ] Calendrier Observatoire ↔ blog ([`07`](../07-roadmap-lab.md))

### Docs à garder sync

- [ ] Ce README (sprints)
- [ ] `strategy.md` architecture
- [ ] `14-matrice-droits-roles.md` (+ rôle lab)
- [ ] `02-architecture-cible.md` (diagramme 2 DB)
- [ ] `web/AGENTS.md` / onboarding si monorepo

---

## 8. Checklist « agent research-lab peut se connecter » (definition of done S0)

1. User seed `email=lab@…` avec `role=RESEARCH_LAB` (ou `labAccess`) en **hub DB**.
2. App lab démarre, page login fonctionne.
3. Login OK → session lab avec `role` visible.
4. Tentative login `CLIENT` → **refus** explicite.
5. Lab lit/écrit une table dans **lab DB** (ex. `Source`).
6. Lab **ne** peut pas migrer / écrire le schéma métier hub (credentials SQL séparés idéalement).
7. Doc env + capture d’écran / note dans le sprint log.

---

## 9. Risques & anti-patterns

| Risque | Mitigation |
| --- | --- |
| Mélanger crawl dans Prisma hub | 2 DB dès S0 |
| Retarder Vague 1 pour le crawler | Règle dure roadmap ; S2 après hub live |
| SSO cookie mal configuré en local | Option B d’abord |
| Donner `ADMIN` à tous les data folks | Rôle `RESEARCH_LAB` dédié |
| API pricing qui renvoie des annonces brutes | Contract agrégats + tests |
| Un seul user Postgres pour hub+lab | Roles SQL `hub_app` / `lab_app` / `lab_worker` |
| Dupliquer table User dans lab | Lecture hub only |

---

## 10. Références externes (recon web)

| Sujet | Lien |
| --- | --- |
| Prisma multi-DB | https://www.prisma.io/docs/guides/database/multiple-databases |
| Auth.js session strategies | https://authjs.dev/concepts/session-strategies |
| Auth.js JWT (scope app) | https://authjs.dev/reference/core/jwt |
| NextAuth cookies / sous-domaines | https://next-auth.js.org/faq · https://next-auth.js.org/configuration/options#cookies |
| Credentials provider | https://authjs.dev/getting-started/authentication/credentials |
| Postgres databases vs schemas | https://www.postgresql.org/docs/current/manage-ag-overview.html |
| AWS PG tenancy matrix | https://docs.aws.amazon.com/prescriptive-guidance/latest/saas-multitenant-managed-postgresql/matrix.html |
| Neon multi-DB / Prisma | https://neon.com/docs/guides/prisma · https://neon.com/docs/manage/branches |

---

## 11. Journal de recon

| Date | Note |
| --- | --- |
| 2026-10-15 | Création dossier `sprints/` + README recon v0 (puis déplacé sous `dossier/tech/research-lab/`). Auth hub = JWT + Credentials + `UserRole` sans lab. Reco : **hub DB pour auth**, **lab DB pour data**, login Credentials dual en MVP, SSO cookie plus tard. |

---

## 12. Prochaine action concrète

1. Valider **D1–D4** (30 min).  
2. Enchaîner **S0.2 → S0.8** (DB lab + rôle + login gate).  
3. **Ne pas** ouvrir S2 connecteur tant que Vague 0 hub n’est pas live — sauf import CSV S1.5 pour valider le modèle.

*Doc vivant. Mettre à jour les cases `[ ]` au fil des sprints ; ajouter `sprints/S0.md`, `S1.md`… pour les notes de run si besoin.*
