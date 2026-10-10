# S03 — Backend tests

## Todo

- [x] Form valid → Lead created stage=`NEW`
  - File: `web/src/app/actions/leads.test.ts`
- [x] Honeypot filled → 204 no create
  - File: `web/src/app/actions/leads.test.ts`
- [x] Rate limit trips after N posts
  - File: `web/src/lib/rate-limit.test.ts` (+ lead-specific key)
- [x] Agent can move stage ; visitor cannot
  - File: `web/src/lib/leads/acl.test.ts`
- [x] Email send mocked called once (Resend)
  - File: `web/src/lib/email/ack.test.ts`
- [x] Consent required if configured
  - File: `web/src/lib/leads/schema.test.ts`
- [x] Lead assigned to listing agent when listingId set
  - File: `web/src/app/actions/leads.assign.test.ts`
- [x] SLA clock fields set on create
  - File: `web/src/lib/leads/sla.test.ts`
