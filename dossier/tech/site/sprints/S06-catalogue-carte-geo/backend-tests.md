# S06 — Backend tests

## Todo

- [ ] `buildPublicWhere` filtre `region` (villes de la région + listings match)
  - File: `web/src/lib/listings/public-query.test.ts` (ou `filters.test.ts`)
  - Couvre: todo backend region
  - Done when: region=Dakar exclut biens Thiès
- [ ] `listMapPins` même where que liste (region/city/quartier/price)
  - File: `web/src/lib/listings/map-pins.test.ts`
  - Done when: pins ⊆ résultats list filtrés
- [ ] Agrégats counts par région / ville
  - File: `web/src/lib/listings/geo-aggregates.test.ts`
  - Done when: sum(counts) cohérent avec total published channel
- [ ] `parseCatalogueFilters` accepte `region` + `view`
  - File: `web/src/lib/listings/parse-filters.test.ts`
  - Done when: valeurs invalides ignorées / clampées

## Gate

- [ ] `npm test` + `npm run typecheck` verts
