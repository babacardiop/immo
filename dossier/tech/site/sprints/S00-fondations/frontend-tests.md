# S00 — Frontend tests

**Stack :** Vitest + Testing Library · Playwright soft pour 1 parcours protégé

## Unit UI

- [x] Login form renders email / password / submit
  - File: `web/src/components/login-form.test.tsx`
- [x] Email & password marked required (empty submit validation)
  - File: `web/src/components/login-form.test.tsx`
- [x] Home `/` renders without crash (EverGreen heading)
  - File: `web/src/app/page.test.tsx`
- [x] Soft 404 page renders CTA retour
  - File: `web/src/app/not-found.test.tsx`
- [x] Footer legal links present
  - File: `web/src/components/site-footer.test.tsx`

## E2E soft

- [ ] Playwright : logged-out `/espace/agent` → redirect connexion
  - File: `web/e2e/auth-guard.spec.ts`
