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
| [`S08-candidatures-location`](./S08-candidatures-location/) | Visite→prospect→compte→**candidat**→docs (**staff-only**)→accept→**portail locataire** | Flow location complet · vault interdit aux proprio |
| [`S09-property-listing-cycles`](./S09-property-listing-cycles/) | **Property ≠ Listing** · republish · commodités structure (qty) + offre courte | Cycles + historique publications |
| [`S10-embeds-partenaires`](./S10-embeds-partenaires/) | Embeds fiche · PartnerLead · piliers CTA | Gate **Done V1** |
| [`S11-dashboards-reporting`](./S11-dashboards-reporting/) | Dashboards multi-rôles + reports scoped | ACL UI = `14` · frames DS · data S08/S09 |
| [`S12-paiements-plateforme`](./S12-paiements-plateforme/) | Loyer + caution via Wave/OM · split frais · ledger immuable · rôle `payments_ops` | Checkout live · quittance · ACL 3 parties |

Ordre : **S05 fidelity** → **S06 catalogue carte/géo** → S07 outils → **S08 candidatures** → **S09 Property/Listing + commodités** → S10 embeds (**Done V1**) → **S11** dashboards → **S12** paiements plateforme.  
**S08** peut démarrer dès listings + auth stables ; il **ne remplace pas** Done V1 (reste S10).  
**S09** refactor catalogue (bien durable vs cycles) — add-on [`55`](../../../../docs/add-ons/specs/03-location-gestion/55-property-listing-cycles.md).  
**S11** consomme PropertyAssignment / baux S08 + Property S09 — portails = Vague **V3**.  
**S12** consomme Lease/tenant S08 + widgets S11 · KYB Wave/OM · add-on [`54`](../../../../docs/add-ons/specs/03-location-gestion/54-paiements-plateforme-loyer-caution.md).  
Source visuelle : [`assets/design/`](../../../../assets/design/) · S08 candidatures · S09 property/listing forms · S12 paiements · BO [`design-system/dashboards/`](../../../../assets/design/design-system/dashboards/).

---

## Convention todo dans chaque fichier

```markdown
- [ ] Task…
  - US / EF ref
  - Done when…
```
