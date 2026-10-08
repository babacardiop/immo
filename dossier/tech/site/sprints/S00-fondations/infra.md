# S00 — Infra

**Décision :** Render (app) · Neon (DB) · **GitHub Actions** (CI)

## Manuels (faire une fois)

- [ ] Créer compte **Neon** · projet `evergreen-prod` · copier `DATABASE_URL`
- [ ] Créer branche Neon `staging` (ou projet séparé)
- [ ] Créer compte **Render** · Web Service « evergreen-web » · runtime Node · build `npm run build` · start `npm start` / `next start`
- [ ] Lier repo GitHub → Render (auto-deploy `main` **après** CI green — ou deploy via Action)
- [ ] Secrets Render : `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`
- [ ] Domaine staging temporaire `*.onrender.com`
- [ ] Repo GitHub : branch protection `main` (PR required)

## GitHub Actions (créer dans le code)

- [ ] Workflow `.github/workflows/ci.yml` :
  - on: pull_request + push main
  - jobs: `lint` · `typecheck` · `test` · `build`
  - Node 20 · `npm ci`
  - `DATABASE_URL` test : Neon branch éphémère **ou** service container Postgres in Actions
- [ ] (Opt) job `deploy` on main : trigger Render deploy hook

## Checklist Done S00 infra

- [ ] PR rouge si tests fail
- [ ] Staging URL HTTPS live
- [ ] `/api/health` green staging
- [ ] Agent peut se logger staging
