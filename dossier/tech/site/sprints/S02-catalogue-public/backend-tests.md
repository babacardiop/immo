# S02 — Backend tests

**Règle :** chaque query publique / SEO / slug a un unit test avant merge.

## Todo

- [ ] Draft listing never in public query
  - File: `web/src/lib/listings/public-query.test.ts`
- [ ] Filters compose correctly (city · paper · transaction · price)
  - File: `web/src/lib/listings/filters.test.ts`
- [ ] Sitemap includes published only
  - File: `web/src/app/sitemap.test.ts`
- [ ] JSON-LD has required fields (price, geo soft, image)
  - File: `web/src/lib/seo/jsonld-listing.test.ts`
- [ ] Slug collision / uniqueness on publish
  - File: `web/src/lib/listings/slug.test.ts`
- [ ] Public fiche by slug 404 if archived/draft
  - File: `web/src/lib/listings/public-get.test.ts`
- [ ] WA deep-link builder encodes phone + text
  - File: `web/src/lib/whatsapp.test.ts`
