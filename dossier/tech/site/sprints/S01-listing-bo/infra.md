# S01 — Infra

## Manuels

- [x] Créer bucket **public** photos (R2/S3) · CORS Next domain
- [x] Créer bucket **vault** privé · IAM clé limitée
- [x] Secrets Render : `S3_ACCESS_KEY`, `S3_SECRET`, `S3_BUCKET_PUBLIC`, `S3_BUCKET_VAULT`, `S3_ENDPOINT` (+ `S3_PUBLIC_BASE_URL`)
- [x] Vérifier taille max upload Render (body limit) · documenter
  - Doc: [`web/docs/upload-limits.md`](../../../../web/docs/upload-limits.md)

## GitHub Actions

- [x] CI : env stub S3 + Vitest (upload mock, pas vrai R2)
- [x] E2E soft Playwright après build + seed (CI)
- [ ] (Opt) smoke staging post-deploy : health + auth page 200

## Done when

- [x] Agent staging upload photo + publie listing TF (validé en parcours manuel)
