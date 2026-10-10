# S06 — Frontend tests

## Todo

- [ ] Toggle Liste/Carte met à jour l’URL et change le layout
  - File: `web/src/components/catalogue-view-toggle.test.tsx`
  - Couvre: todo frontend toggle
  - Done when: `view=map` → carte visible, grille absente (ou panneau résultats)
- [ ] Drill-down région → ville → quartier
  - File: `web/src/components/catalogue-geo-nav.test.tsx`
  - Couvre: cascade + breadcrumb
  - Done when: sélection région filtre options villes
- [ ] Parse `region` / `view` depuis searchParams
  - File: `web/src/lib/listings/parse-filters.test.ts`
  - Couvre: parse-filters étendu
- [ ] E2E soft : `/acheter?view=map` charge carte ; `/acheter?view=list` grille
  - File: `web/e2e/catalogue-view.spec.ts`
  - Done when: Playwright smoke green (skip si `SKIP_E2E`)

## Gate Done S06

- [ ] Unit + typecheck verts
- [ ] E2E soft list/map
- [ ] Side-by-side DS `acheter-map` / `louer-list` OK staging
