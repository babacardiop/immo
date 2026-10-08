# S01 — Infra

## Manuels

- [ ] Créer bucket **public** photos (R2/S3) · CORS Next domain
- [ ] Créer bucket **vault** privé · IAM clé limitée
- [ ] Secrets Render : `S3_ACCESS_KEY`, `S3_SECRET`, `S3_BUCKET_PUBLIC`, `S3_BUCKET_VAULT`, `S3_ENDPOINT`
- [ ] Vérifier taille max upload Render (body limit) · documenter

## GitHub Actions

- [ ] CI : job test upload mock (pas vrai S3) · env stub
- [ ] (Opt) smoke staging post-deploy : health + auth page 200

## Done when

- [ ] Agent staging upload photo + publie listing TF
