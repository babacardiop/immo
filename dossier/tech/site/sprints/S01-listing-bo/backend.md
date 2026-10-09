# S01 — Backend

**US :** US-V0-31, 32, 33, 12  
**Outcome :** CRUD Listing + mandat + media + publish gate

## Todo

- [x] Schema complet Listing (champs `05` cœur) · PaperBadge · Mandate · MediaAsset
- [x] API/Server Actions CRUD listing (agent scoped)
- [x] Upload media → S3/R2 public bucket · ACL vault séparée
- [x] Gate publish : `statut_papier` ∈ {TF, Bail, Délibération} sinon reject
- [x] Soft delete / archive
- [x] Rate limit mutations agent
- [x] Photo reorder (sortOrder ↑↓)
- [x] Location : paperType/NICAD forcés null

## Refs

`../05` · `../09` · EF-LIST-* · EF-AGT-*
