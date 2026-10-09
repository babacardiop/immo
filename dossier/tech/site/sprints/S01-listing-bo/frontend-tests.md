# S01 — Frontend tests

**Stack :** Vitest + Testing Library · Playwright soft parcours agent

## Unit UI

- [x] Listing form required fields (titre, ref, prix, ville, quartier, description)
  - File: `web/src/components/listing-form.test.tsx`
- [x] Location hides Papier / NICAD
  - File: `web/src/components/listing-form.test.tsx`
- [x] PaperBadge TF + missing states
  - File: `web/src/components/paper-badge.test.tsx`
- [x] Publish disabled / message when paper invalid
  - File: `web/src/components/publish-controls.test.tsx`
- [x] Publish enabled when TF + DRAFT
  - File: `web/src/components/publish-controls.test.tsx`
- [x] Publish error alert renders when action returns `{ ok:false }`
  - File: `web/src/components/publish-controls.test.tsx`
- [x] Media preview shows after file select (mock)
  - File: `web/src/components/listing-photos.test.tsx`
- [x] Agent nav links (dashboard · annonces)
  - File: `web/src/components/agent-nav.test.tsx`
- [x] Mandate PDF upload control renders accept=pdf
  - File: `web/src/components/mandate-pdf-upload.test.tsx`

## E2E soft

- [x] Playwright : agent login → create draft → save → land on slug URL
  - File: `web/e2e/listing-draft.spec.ts`
- [x] Playwright : publish blocked without photos (UI message)
  - File: `web/e2e/listing-publish-gate.spec.ts`
