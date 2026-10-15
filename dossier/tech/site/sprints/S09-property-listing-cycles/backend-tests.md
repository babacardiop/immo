# S09 — Backend tests

## Todo

- [ ] Backfill creates one Property per legacy Listing
  - File: `web/src/lib/properties/backfill.test.ts`
- [ ] Republish archives previous active cycle and creates new draft
  - File: `web/src/lib/listings/republish.test.ts`
- [ ] Cannot delete Property while mandate active / open lease
  - File: `web/src/lib/properties/delete-guard.test.ts`
- [ ] Structural qty validation (balconyCount ≥ 0, bedrooms integer)
  - File: `web/src/lib/properties/commodities.test.ts`
- [ ] Short-term listing requires offerIncludes when furnished=true (compat)
  - File: `web/src/lib/listings/offer-includes.test.ts`
- [ ] Long-term listing does not require short-term pack
  - File: `web/src/lib/listings/offer-includes.test.ts`
- [ ] Candidature still resolves via listingId of active cycle
  - File: `web/src/lib/applications/listing-scope.test.ts`

## Gate Done S09 (backend)

- [ ] Property ≠ Listing enforced in schema + tests
- [ ] Republish path green
- [ ] `npm test` + `npm run typecheck` CI green
