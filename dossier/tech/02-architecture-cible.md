# Architecture cible — Schéma haut niveau

**Document :** Dossier · Tech · 02  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-vision-produit.md`](./01-vision-produit.md) · [`../../docs/tech-stack.md`](../../docs/tech-stack.md) · [`site/07-integrations.md`](./site/07-integrations.md) · [`site/14-matrice-droits-roles.md`](./site/14-matrice-droits-roles.md) · [`site/19-data-flow-rgpd.md`](./site/19-data-flow-rgpd.md) · [`research-lab/05-pipeline-data.md`](./research-lab/05-pipeline-data.md)  
**Aval :** [`03-prios-mvp.md`](./03-prios-mvp.md) · [`05-cahier-des-charges-technique.md`](./05-cahier-des-charges-technique.md) · infra as code / env

> **Rôle :** architecture **cible** du hub (Next, DB, auth, WA, storage, email, maps) + phasage V0 lean → scale — sans CdCT exhaustif (→ `05`).

---

## 0. En une phrase

**Un déploiement Next.js** (UI + API) · **Postgres** cœur métier · **object storage** vault/médias · **Auth.js** sur `/espace/*` · **WA** deep-link d’abord puis Cloud API · lab **hors** chemin critique.

```
Browser ──► Next.js (App Router)
               ├─► PostgreSQL (Prisma/Drizzle)
               ├─► Object storage (S3-compatible)
               ├─► Resend · (Wave/OM V3)
               ├─► wa.me → Meta  |  later webhook Cloud API
               └─► Leaflet/OSM (client)
Lab workers ──► DB lab / files  (voie parallèle)
```

---

## 1. Principes d’archi

| # | Principe | Implication |
| ---: | --- | --- |
| 1 | **Single deploy unit Y1** | Next Route Handlers / Server Actions ; API séparée seulement si besoin |
| 2 | **SEO-first public** | RSC/SSR fiches & landings · pas SPA shell vide |
| 3 | **CRM société** | Leads en DB (ou miroir contrôlé) — pas téléphone perso |
| 4 | **Vault privé** | Médias publics ≠ docs CNI/EDR (signed URLs) |
| 5 | **Secrets hors repo** | Env + secret manager |
| 6 | **Privacy by design** | Minimisation · ACL `14` · audit exports |
| 7 | **Lab découplé** | Crawl n’est pas dependency Vague 0–1 |
| 8 | **Évolutif** | Redis/queue/WABA quand métriques le justifient |

Bench SaaS lean 2026 : Next + Postgres + S3 + Resend sur un host ([Raltey stack](https://raltey.com/examples/nextjs-vercel-postgres-stack)) ; Auth.js + Prisma ([Prisma guide](https://www.prisma.io/docs/guides/authentication/authjs/nextjs)) ; WA webhook signature + fenêtre 24 h ([wa-cloud Next patterns](https://github.com/gastonlopezl/whatsapp-cloud-api-nextjs)).

---

## 2. Schéma contexte (C4 L1)

```
┌────────────┐  ┌────────────┐  ┌────────────┐
│ Visiteurs  │  │ Agents/OD  │  │ Clients L/P│
│ Diaspora   │  │            │  │ (V3+)      │
└─────┬──────┘  └─────┬──────┘  └─────┬──────┘
      │               │               │
      └───────────────┼───────────────┘
                      ▼
            ┌──────────────────┐
            │  EverGreen Hub   │
            │  (Next.js app)   │
            └────────┬─────────┘
     ┌───────────────┼───────────────┬──────────────┐
     ▼               ▼               ▼              ▼
┌─────────┐   ┌──────────┐   ┌──────────┐   ┌────────────┐
│ Meta WA │   │ Resend   │   │ Wave/OM  │   │ OSM tiles  │
│ / Ads   │   │ email    │   │ (V3+)    │   │            │
└─────────┘   └──────────┘   └──────────┘   └────────────┘
                      │
                      ▼
            ┌──────────────────┐
            │ Research Lab     │  (optionnel, parallèle)
            │ workers + datasets│
            └──────────────────┘
```

---

## 3. Schéma conteneurs (C4 L2) — cible Y1+

```
                    ┌─────────────────────────────────────────┐
                    │              CDN / Edge                 │
                    │     (assets, ISR cache, next/image)     │
                    └───────────────────┬─────────────────────┘
                                        │
┌──────────────┐                        ▼
│ Browser      │◄──────────────►┌───────────────────┐
│ Leaflet map  │                │  Next.js App      │
│              │                │  - App Router RSC │
│              │                │  - Route Handlers │
│              │                │  - Server Actions │
│              │                │  - Middleware auth│
└──────────────┘                └─────────┬─────────┘
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
   ┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
   │ PostgreSQL      │         │ Object storage  │         │ Redis (opt)     │
   │ listings leads  │         │ photos public   │         │ rate limit      │
   │ mandates deals  │         │ vault privé     │         │ cache / jobs    │
   │ users sessions  │         │ OG generated    │         │                 │
   └─────────────────┘         └─────────────────┘         └─────────────────┘
            ▲
            │ Prisma / Drizzle
            │
   Auth.js adapter ──► User / Session / Account
```

**Externes (sortants) :** Resend API · Meta Graph (scale) · Wave/OM webhooks (V3) · Sentry (opt).

---

## 4. Couches applicatives

| Couche | Techno | Responsabilité |
| --- | --- | --- |
| **Presentation** | React RSC + client islands | Pages public · shells `/espace/*` |
| **UI kit** | Tailwind + shadcn + `components/evergreen` | Tokens `site/18` |
| **BFF / API** | `app/api/**` Route Handlers | Forms, webhooks, uploads, OG |
| **Domain** | Server Actions / services TS | Publish gates, CRM stages, simus |
| **Persistence** | Prisma ou Drizzle | Schéma relationnel |
| **AuthZ** | Middleware + `can()` ACL | Rôles `14` |
| **Jobs** (later) | Cron host / queue | Purge retention · sync WA |

### 4.1 Layout repo (cible)

```
apps/web/                 # ou repo root monolith V0
  app/
    (public)/             # /, acheter, louer, outils, guides…
    espace/               # agent | proprio | client
    api/
      leads/
      webhooks/wa/        # scale
      webhooks/payments/  # V3
      og/
      upload/
  components/
  lib/
    db.ts
    auth.ts
    acl.ts
    wa.ts
    storage.ts
packages/ui/              # opt. monorepo
prisma/ ou drizzle/       # schema
```

V0 acceptable : **single Next app** sans monorepo.

---

## 5. Domaine données (entités cœur)

```
User ──< RoleAssignment
Listing >── Mandate >── Document (vault)
Listing >── Media (public)
Lead >── LeadEvent
Lead >── PartnerLead >── Partner
Deal / Dossier >── Lead · Listing · Mandate
SimScenario ──> Lead? (si contact)
RentLedger (V3) >── Unit / Lease
```

| Entité | Notes archi |
| --- | --- |
| `Listing` | Publish gate `paper_type` · geo point · status enum (`05`) |
| `Lead` | `owner_id` · source · intent · `sim_scenario` JSONB |
| `Document` | `visibility=vault|public` · storage key |
| `User` | Auth.js · roles[] |

Indexes : `listing.status+zone` · `lead.phone` unique soft · `lead.owner_id` · geo GiST si PostGIS (opt. Y1 : lat/lng float OK).

**Lab :** schémas `PropertyEntity` / raw crawl dans DB **séparée** ou schema Postgres `lab` — jamais FK obligatoire vers Lead.

---

## 6. Auth & accès

### 6.1 Phasage

| Phase | Auth |
| --- | --- |
| **V0** | Auth.js credentials (ou magic link) **agents + OD + admin** only |
| **V3** | Portails `client` / `landlord` (+ roles) |
| Public | Pas de compte requis pour catalogue / simus |

### 6.2 Mécanique

```
Request → middleware.ts
  /espace/*  → session required
  /espace/admin/* → role admin
  /api/agent/* → session + role agent|moderator|…
  /api/webhooks/* → signature verify (pas session user)
```

Sessions : DB adapter Prisma (recommandé) ou JWT — préférer **DB sessions** pour révocation agent.

ACL fine → `site/14` (`can(user, action, resource)`).

---

## 7. WhatsApp

### 7.1 V0–1 (lean)

```
CTA site ──► wa.me/?text=… ──► WhatsApp Business App (humain)
Events: wa_click analytics ; lead créé form OU log manuel/import
```

Pas de webhook Meta obligatoire J0.

### 7.2 Cible scale (Cloud API)

```
Meta Graph API
     │  inbound + statuses
     ▼
POST /api/webhooks/wa
  verify X-Hub-Signature-256 (raw body)
  upsert Conversation / Message
  open 24h customer-care window
  create/update Lead + assign owner
     │
     ▼
Agent inbox (UI BO ou BSP)
     │
     ▼
POST send (free-form si fenêtre · sinon template)
```

Env : `WA_PHONE_NUMBER_ID` · `WA_ACCESS_TOKEN` · `WA_APP_SECRET` · `WA_WEBHOOK_VERIFY_TOKEN` · `NEXT_PUBLIC_WA_E164`.

---

## 8. Storage & médias

| Bucket / préfixe | Contenu | Accès |
| --- | --- | --- |
| `public/listings/` | Photos annonces | Public CDN / `next/image` remote |
| `vault/mandates/` | PDF mandat, CNI, EDR | **Private** · signed URL TTL court |
| `og/` ou dynamique | Cards `next/og` | Public cache-bust `?v=` |
| `edl/` (V3) | Photos état des lieux | Private scoped lease |

Upload flow :

```
Client (agent) → POST /api/upload (auth)
  → presigned PUT → object storage
  → persist Document/Media row (key, mime, listing_id)
```

Jamais vault en dossier `public/` Next.

---

## 9. Email, maps, paiements, analytics

| Service | Rôle | Câblage |
| --- | --- | --- |
| **Resend** | Ack forms, digest simu, quittances V3 | API depuis Route Handler |
| **Leaflet + OSM** | Carte fiche/liste | Client-only · markers depuis API listings |
| **Wave / OM** | Loyers / acomptes | Webhooks `/api/webhooks/payments` V3+ |
| **Analytics** | `sim_complete`, funnels | Plausible/GA4/custom events — PII min |
| **Sentry** (opt.) | Erreurs | SDK Next |

---

## 10. Flux métier critiques (runtime)

### 10.1 Publish listing

```
Agent form → Server Action validate (paper gate)
  → write Listing draft/published
  → invalidate ISR/tag cache fiche & catalogue
  → optional revalidatePath
```

### 10.2 Lead form

```
Browser POST /api/leads → Zod validate → insert Lead
  → assign owner → enqueue email ack (Resend)
  → notify agent (email / BO task)
```

### 10.3 Simu

```
Client calc (local or /api/addons/sim) → ungated result
  → optional email capture → Lead + sim_scenario
  → event sim_complete
```

---

## 11. Déploiement & environnements

| Env | Usage |
| --- | --- |
| `dev` | Local Docker Postgres + MinIO/S3 mock |
| `preview` | PR deploys (branch DB si Neon-like) |
| `staging` | Recette OD |
| `prod` | HTTPS · backups · monitoring |

**Host options (non figé CdCT) :** Vercel / Cloudflare / Fly / VPS SN — critères : Node Next, Postgres managé, région latence EU-Afrique, DPA.

| Besoin | Produit typique |
| --- | --- |
| App | Node 20+ hébergeur Next |
| DB | Neon / Supabase / RDS / managed PG |
| Storage | S3 / R2 / Spaces |
| DNS/TLS | Cloudflare ou natif |

PCA/PRA détail → `05` CdCT.

---

## 12. Phasage architecture

| Vague | Archi ship |
| --- | --- |
| **V0** | Next monolith · PG · storage public+vault · Auth agents · forms API · wa.me · Leaflet · Resend · CRM in-DB (ou miroir Sheet **temporaire** → migrer) |
| **V1** | Sim APIs · PartnerLead · events analytics |
| **V2** | Diligence docs workflow |
| **V3** | Auth portails · rent ledger · payment webhooks |
| **Scale** | WABA webhooks · Redis rate-limit · queue jobs · optional `apps/api` |
| **Lab** | Workers séparés · schema `lab` · jamais bloquer hub |

**Dettes acceptées V0 :** CRM table externe lean **si** sync documentée + cutover PG avant volume ; pas de WABA.

---

## 13. Sécurité (vue archi)

| Contrôle | Où |
| --- | --- |
| TLS | Edge / host |
| AuthN | Auth.js session |
| AuthZ | Middleware + ACL |
| Webhook HMAC | WA / payments |
| Upload mime/size limits | `/api/upload` |
| Rate limit forms | Redis/IP later · basic V0 |
| Secrets | Env · rotation |
| Backups PG + restore test | Ops |
| Audit log | exports, vault.read, force_publish |

Détail PII → `04-securite-donnees` · flow légal → `site/19`.

---

## 14. Observabilité

| Signal | Outil |
| --- | --- |
| Errors | Sentry / host logs |
| Uptime | Health `/api/health` |
| Produit | Events `wa_click`, `sim_complete`, lead stages |
| Perf | Web Vitals · LCP fiches |

---

## 15. ADRs (décisions)

| ID | Décision | Statut |
| --- | --- | --- |
| ADR-01 | Next.js App Router unique deploy Y1 | Accepted |
| ADR-02 | PostgreSQL + Prisma **ou** Drizzle (trancher kickoff) | Proposed |
| ADR-03 | S3-compatible storage vault/public split | Accepted |
| ADR-04 | Auth.js pour `/espace` | Accepted |
| ADR-05 | WA deep-link V0 · Cloud API scale | Accepted |
| ADR-06 | Leaflet OSM V0 · MapLibre later | Accepted |
| ADR-07 | Lab schema/workers isolés | Accepted |
| ADR-08 | Pas Google Maps Y1 | Accepted |

---

## 16. Variables d’environnement (carte)

```
DATABASE_URL=
AUTH_SECRET=
# Storage
S3_ENDPOINT= S3_BUCKET= S3_ACCESS_KEY= S3_SECRET_KEY=
# Email
RESEND_API_KEY= EMAIL_FROM=
# WA
NEXT_PUBLIC_WA_E164=
WA_PHONE_NUMBER_ID= WA_ACCESS_TOKEN= WA_APP_SECRET= WA_WEBHOOK_VERIFY_TOKEN=
# App
NEXT_PUBLIC_SITE_URL=
# Payments V3
WAVE_API_KEY= OM_API_KEY=
```

---

## 17. Hors scope archi Y1

| Item | Motif |
| --- | --- |
| Microservices | Overkill |
| Kafka / event bus | Volume bas |
| App native | Web mobile-first |
| Elasticsearch | PG full-text / filters suffisent |
| Multi-tenant SaaS white-label | Vague 8+ |

---

## 18. Liens

| Doc | Rôle |
| --- | --- |
| [`01-vision-produit.md`](./01-vision-produit.md) | Pourquoi |
| [`03-prios-mvp.md`](./03-prios-mvp.md) | Quoi ship V0–1 |
| [`05-cahier-des-charges-technique.md`](./05-cahier-des-charges-technique.md) | CdCT PCA/PRA |
| [`site/07-integrations.md`](./site/07-integrations.md) | Intégrations produit |
| [`../../docs/tech-stack.md`](../../docs/tech-stack.md) | Stack lock |

---

## 19. Sources

| Source | Apport |
| --- | --- |
| tech-stack · site 07/14/19 · vision 01 | EverGreen |
| Raltey Next+PG+S3+Resend | Pattern SaaS lean |
| Prisma + Auth.js | Sessions DB |
| WA Cloud Next webhook examples | Signature · 24h window |

---

*Architecture cible EverGreen Tech v1.0 — sept. 2026. Next monolith · PG · S3 split · Auth.js · WA lean→Cloud · lab parallèle.*
