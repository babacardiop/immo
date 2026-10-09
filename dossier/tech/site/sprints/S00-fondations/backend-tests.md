# S00 — Backend tests

**Stack :** Vitest · co-located `web/src/**/*.test.ts`  
**Règle :** 1 todo backend.md ⇒ ≥1 test ici.

## Unit / integration

- [x] Health returns 200 when DB up
  - File: `web/src/app/api/health/route.test.ts`
- [x] Health returns 503 when DB down
  - File: `web/src/app/api/health/route.test.ts`
- [x] Unauthenticated `/espace/*` (hors connexion) blocked by `authorized`
  - File: `web/src/lib/auth-guards.test.ts`
- [x] `/espace/connexion` allowed without session
  - File: `web/src/lib/auth-guards.test.ts`
- [x] Authenticated `/espace/agent` allowed
  - File: `web/src/lib/auth-guards.test.ts`
- [ ] Login valid agent → session cookie (integration Auth.js)
  - File: `web/src/lib/auth.login.test.ts` (à ajouter si pas encore)
- [ ] Login invalid → error / no session
  - File: `web/src/lib/auth.login.test.ts`
- [ ] Migration applies clean on empty DB (CI `prisma migrate deploy`)
  - File: CI job `.github/workflows/ci.yml`
- [ ] Role claim present on session JWT (`AGENT`)
  - File: `web/src/lib/auth.session.test.ts`

## Note

Auth cookie e2e peut rester soft Playwright ; unit gates middleware = P0 S00.
