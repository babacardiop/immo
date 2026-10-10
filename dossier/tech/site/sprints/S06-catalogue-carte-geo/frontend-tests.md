# S06 — Frontend tests

## Todo

- [x] Toggle Liste/Carte met à jour l’URL et change le layout
  - File: `web/src/components/catalogue-view-toggle.test.tsx`
- [x] Drill-down région → ville → quartier
  - File: `web/src/components/catalogue-geo-nav.test.tsx`
- [x] Parse `region` / `view` depuis searchParams
  - File: `web/src/lib/listings/filters.test.ts`
- [x] E2E soft : `/acheter?view=map`
  - File: `web/e2e/catalogue-view.spec.ts`

## Gate Done S06

- [x] Unit + typecheck verts (unit run)
- [ ] E2E soft list/map (CI / staging)
- [ ] Side-by-side DS `acheter-map` / `louer-list` OK staging
