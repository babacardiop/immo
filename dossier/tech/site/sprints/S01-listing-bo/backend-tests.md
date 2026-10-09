# S01 — Backend tests

**Stack :** Vitest · `web/src/lib/**` + actions helpers  
**Règle :** chaque gate CRUD / publish / media / ACL a un test.

## Domain / gates

- [x] Publish gate OK with TF + mandat ACTIVE + ≥3 photos
  - File: `web/src/lib/listings/publish-gate.test.ts`
- [x] Publish without TF/Bail/Délibération → rejected (`PAPER`)
  - File: `web/src/lib/listings/publish-gate.test.ts`
- [x] Publish with OTHER / null paper → rejected
  - File: `web/src/lib/listings/publish-gate.test.ts`
- [x] Publish without active mandate → rejected (`MANDATE`)
  - File: `web/src/lib/listings/publish-gate.test.ts`
- [x] Publish with &lt;3 photos → rejected (`PHOTOS`)
  - File: `web/src/lib/listings/publish-gate.test.ts`
- [x] Délibération without disclaimer ack → rejected (`DELIB_ACK`)
  - File: `web/src/lib/listings/publish-gate.test.ts`
- [x] `canPublishPaper` sale vs rent rules
  - File: `web/src/lib/listings/paper.test.ts`
- [x] Paper labels FR
  - File: `web/src/lib/listings/paper.test.ts`

## ACL

- [x] Agent A cannot mutate Agent B listing
  - File: `web/src/lib/listings/acl.test.ts`
- [x] Owner agent can mutate
  - File: `web/src/lib/listings/acl.test.ts`
- [x] Moderator can mutate foreign listing
  - File: `web/src/lib/listings/acl.test.ts`

## Slug / identity

- [x] Slug Expat-style contains type · titre · transaction · ville · ref
  - File: `web/src/lib/listings/slug.test.ts`
- [ ] Slug uniqueness conflict → create returns error (integration Prisma P2002)
  - File: `web/src/app/actions/listings.create.test.ts`

## Media / storage

- [x] Image MIME whitelist jpg/png/webp only
  - File: `web/src/lib/storage/mime.test.ts`
- [x] Vault PDF MIME pdf only
  - File: `web/src/lib/storage/mime.test.ts`
- [x] Vault payload never has public URL · key under `mandates/`
  - File: `web/src/lib/storage/vault.test.ts`
- [x] Public photos key under `listings/`
  - File: `web/src/lib/storage/vault.test.ts`
- [ ] Upload photo mocks R2 PutObject + persists MediaAsset (integration)
  - File: `web/src/app/actions/listings.upload.test.ts`

## Mutations / limits

- [x] Rate limit blocks after N calls
  - File: `web/src/lib/rate-limit.test.ts`
- [ ] Create listing draft OK (integration DB)
  - File: `web/src/app/actions/listings.create.test.ts`
- [ ] Publish with TF → status `PUBLISHED` + `publishedAt` set
  - File: `web/src/app/actions/listings.publish.test.ts`
- [ ] Archive → status `ARCHIVED`
  - File: `web/src/app/actions/listings.archive.test.ts`

## Zod / validation

- [x] `listingFormSchema` rejects short title / missing price
  - File: `web/src/lib/listings/schema.test.ts`
