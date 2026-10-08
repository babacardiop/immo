# S01 — Backend

**US :** US-V0-31, 32, 33, 12  
**Outcome :** CRUD Listing + mandat + media + publish gate

## Todo

- [ ] Schema complet Listing (champs `05`) · PaperBadge · Mandate · MediaAsset
- [ ] API/Server Actions CRUD listing (agent scoped)
- [ ] Upload media → S3/R2 public bucket · ACL vault séparée
- [ ] Gate publish : `statut_papier` ∈ {TF, Bail, Délibération} sinon 422
- [ ] Soft delete / archive
- [ ] Rate limit mutations agent

## Refs

`../05` · `../09` · EF-LIST-* · EF-AGT-*
