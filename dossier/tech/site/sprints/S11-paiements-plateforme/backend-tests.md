# S11 — Backend tests

## Todo

- [ ] Fee split Wave 1% + platform 0.1% → net correct (100_000 → 98_900)
  - File: `web/src/lib/payments/fee-split.test.ts`
  - Couvre: fee engine backend
- [ ] Fee split OM uses merchant ~1% config (not 0% merchant)
  - File: `web/src/lib/payments/fee-split.test.ts`
- [ ] Integer XOF rounding deterministic
  - File: `web/src/lib/payments/fee-split.test.ts`
- [ ] Checkout denied if not tenant of lease
  - File: `web/src/lib/payments/checkout-acl.test.ts`
- [ ] Webhook HMAC invalid → 401 · no status change
  - File: `web/src/app/api/payments/webhook/wave.test.ts`
- [ ] Webhook replay same `provider_event_id` → idempotent (single paid)
  - File: `web/src/app/api/payments/webhook/idempotency.test.ts`
- [ ] Ledger entry UPDATE/DELETE denied
  - File: `web/src/lib/payments/ledger-immutability.test.ts`
- [ ] Paid payment field mutate denied ; adjustment creates new row only
  - File: `web/src/lib/payments/ledger-immutability.test.ts`
- [ ] Detail ACL : payer OK · payee OK · payments_ops OK · plain agent 403
  - File: `web/src/lib/payments/payment-acl.test.ts`
- [ ] List ACL : plain agent cannot enumerate agency payments
  - File: `web/src/lib/payments/payment-acl.test.ts`
- [ ] return_url alone does not mark paid
  - File: `web/src/lib/payments/payment-status.test.ts`
- [ ] Share-link token expires after TTL · reused after paid → 410
  - File: `web/src/lib/payments/share-link.test.ts`
- [ ] QR endpoint denied for plain agent without payments_ops / not party
  - File: `web/src/lib/payments/payment-acl.test.ts`

## Gate Done S11 (backend)

- [ ] Dual provider checkout + webhook path staging
- [ ] Immutability + ACL tests green
- [ ] `npm test` + `npm run typecheck` CI green
