# Sprints site — Itérations build MVP

**Rôle :** découper le build Vague 0–1 en sprints actionnables.  
Chaque sprint = dossier avec **5 fichiers** :

| Fichier | Contenu |
| --- | --- |
| `backend.md` | APIs, schéma DB, Server Actions, jobs |
| `backend-tests.md` | Tests unit/integration API · ACL · gates |
| `frontend.md` | Pages, composants, UX |
| `frontend-tests.md` | Tests UI · Playwright soft · a11y smoke |
| `infra.md` | CI/CD, comptes cloud, DNS, secrets, manuels |

**Amont :** [`../12-user-stories-backlog.md`](../12-user-stories-backlog.md) · [`../../03-prios-mvp.md`](../../03-prios-mvp.md) · [`../../02-architecture-cible.md`](../../02-architecture-cible.md) · [`../../05-cahier-des-charges-technique.md`](../../05-cahier-des-charges-technique.md)

---

## Règle tests (obligatoire)

**Chaque todo `backend.md` / `frontend.md` a au moins un test unitaire (ou d’intégration) nommé dans `*-tests.md`.**  
Pas de merge Sxx sans : `npm test` + `npm run typecheck` verts en CI.

| Couche | Où vivent les tests | Stack |
| --- | --- | --- |
| Domaine / gates / ACL / slug / MIME | `web/src/lib/**/*.test.ts` | Vitest |
| Route handlers | `web/src/app/api/**/*.test.ts` | Vitest |
| Composants UI | `web/src/components/**/*.test.tsx` | Vitest + Testing Library |
| Parcours critiques | `web/e2e/**` (quand ajouté) | Playwright |

Convention todo test :

```markdown
- [ ] Nom du comportement
  - File: `web/src/.../foo.test.ts`
  - Couvre: todo backend/frontend lié
  - Done when: assert explicite + CI green
```

**Règle couverture sprint :** avant gate Done, cocher tous les items `*-tests.md` du sprint (unit d’abord ; Playwright soft si listé).

---

## Stack infra (décision)

| Couche | Choix | Pourquoi |
| --- | --- | --- |
| **App host** | **Render** (Web Service Next) | Node Next simple · HTTPS · preview/PR option · aligné CdCT monolith |
| **DB** | **Neon** (Postgres) | Serverless PG · branches preview · PITR soft · `$DATABASE_URL` |
| **CI/CD** | **GitHub Actions** | Lint/typecheck/test/build sur PR · deploy hook Render |
| **Storage** | S3-compatible (R2 / Render Disk temp → R2/S3) | Vault + photos — à brancher S1 |
| **Email** | Resend | Ack forms |

**Oui — Render + Neon = bon fit Y1.**  
**Oui — GitHub Actions = bon fit CI/CD** (pas besoin de Render CI exclusive).

Flow typique :

```
PR → GitHub Actions (lint · tsc · test · build)
main merge → Actions → Render deploy (ou Render auto-deploy from main)
Neon : prod branch + optional preview branch per PR
```

---

## Carte des sprints

| Sprint | Outcome | Gate |
| --- | --- | --- |
| [`S00-fondations`](./S00-fondations/) | Repo Next · Neon · Render · Auth agent · schema seed | App hello + login agent staging |
| [`S01-listing-bo`](./S01-listing-bo/) | CRUD annonces + mandats + media + publish gate papier | Agent publie listing gated |
| [`S02-catalogue-public`](./S02-catalogue-public/) | Home · acheter/louer · fiche · WA · SEO schema | Fiche live publique |
| [`S03-crm-leads`](./S03-crm-leads/) | Forms → Lead · stages · file agent · SLA | Lead form → CRM + notif |
| [`S04-confiance-polish`](./S04-confiance-polish/) | Agence/guides · map · landings · OG · empty | Gate **Done V0** |
| [`S05-mockup-fidelity`](./S05-mockup-fidelity/) | Home/shell **quasi pixel** vs strips + chrome public **unifié** | Side-by-side strips + une marque |
| [`S06-catalogue-carte-geo`](./S06-catalogue-carte-geo/) | **/acheter · /louer** : toggle **Liste \| Carte** + drill-down **région → ville → quartier** | Map = vue dédiée · géo SN (data existante) |
| [`S07-outils-simus`](./S07-outils-simus/) | `/outils` + 3 simus ungated | 3 calc live |
| [`S08-embeds-partenaires`](./S08-embeds-partenaires/) | Embeds fiche · PartnerLead · piliers CTA | Gate **Done V1** |
| [`S09-dashboards-reporting`](./S09-dashboards-reporting/) | Dashboards multi-rôles + reports scoped | ACL UI = `14` · frames DS |

Ordre : **S05 fidelity** → **S06 catalogue carte/géo** (avant outils) → S07 outils → S08 embeds (Done V1) → **S09** dashboards.  
**S09** après V1 soft / en parallèle design — portails client/landlord = Vague **V3**.  
Source visuelle public : [`assets/design/`](../../../../assets/design/) · catalogue map : `design-system/pages/public/catalogue/*-map` · BO : [`design-system/dashboards/`](../../../../assets/design/design-system/dashboards/).

---

## Convention todo dans chaque fichier

```markdown
- [ ] Task…
  - US / EF ref
  - Done when…
```
