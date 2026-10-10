# S03 — Infra

## Manuels

- [x] Compte **Resend** · API key in `.env` (`RESEND_API_KEY`)
- [x] Secrets : `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_AGENT_INBOX` (in `.env.example`)
- [ ] Domaine custom vérifié (prod) — staging OK with `onboarding@resend.dev`
- [ ] Vérifier deliverability staging (inbox réelle = email du compte Resend tant que domaine non vérifié)
- [x] Document rate-limit Redis? (opt) ou in-memory OK Y1

## GitHub Actions

- [x] CI : mock Resend · no real send (empty key skips)
- [ ] Secret scanning enabled (GitHub)

## Done when

- [x] `npm run email:smoke` + `npm run lead:smoke` verts (clé locale)
- [ ] Lead form staging Render → email agent reçu · visible BO (poser les 3 secrets Render)

## Notes

- `EMAIL_FROM=EverGreen <onboarding@resend.dev>` : Resend n’accepte que l’email **du compte Resend** en destinataire.
- Mettre `EMAIL_AGENT_INBOX` = cet email tant que le domaine EverGreen n’est pas vérifié.
- Prod : vérifier domaine → `EMAIL_FROM=EverGreen <noreply@domaine.sn>` · `EMAIL_AGENT_INBOX=leads@domaine.sn`
