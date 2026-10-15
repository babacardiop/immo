# S08 — Infra

## Manuels

- [ ] Bucket / prefix vault `applications/` (R2/S3) · signed URLs **courtes** · jamais exposées au rôle landlord
- [ ] MIME allowlist + max size (`web/docs/upload-limits.md`)
- [ ] Templates Resend : visit ack · invite compte · candidate assigned · application status · tenant activated
- [ ] Feature flag `ff_candidatures_location`
- [ ] Seed parcours E2E :
  1. listing location + requirement set Standard SN
  2. lead prospect visite
  3. user client converti
  4. assignment candidate
  5. staff user agent
  6. landlord user (pour prouver 403 docs)

## GitHub Actions

- [ ] Unit cover `lib/leads` · `lib/users` · `lib/assignments` · `lib/applications` (surtout `docs-acl`)
- [ ] Optional e2e label `e2e`

## Secrets / env

- [ ] `APPLICATIONS_UPLOAD_PREFIX`
- [ ] `RESEND_*` template IDs
- [ ] `MAGIC_LINK_SECRET`
- [ ] `APPLICATION_PRIVACY_NOTICE_VERSION` (ex. `2026-10-15`)

## Done when

- [ ] Staging : parcours #1→#8 backend.md sans fuite docs vers landlord
- [ ] Flag + notice version documentés runbook
