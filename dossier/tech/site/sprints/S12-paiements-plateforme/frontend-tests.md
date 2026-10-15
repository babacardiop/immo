# S12 — Frontend tests

## Todo

- [ ] Checkout shows fee breakdown (PSP + 0.1% + net)
  - File: `web/src/components/payments/checkout-form.test.tsx`
- [ ] Provider toggle Wave / OM updates fee line
  - File: `web/src/components/payments/checkout-form.test.tsx`
- [ ] Primary CTA triggers redirect to checkoutUrl
  - File: `web/src/components/payments/checkout-form.test.tsx`
- [ ] QR block renders when checkoutUrl present
  - File: `web/src/components/payments/checkout-qr.test.tsx`
- [ ] Share SMS / WA disabled without checkout session
  - File: `web/src/components/payments/share-payment-link.test.tsx`
- [ ] Client payments list only own rows (mocked ACL)
  - File: `web/src/components/payments/client-payments-list.test.tsx`
- [ ] Landlord detail has no mutate controls
  - File: `web/src/components/payments/payment-detail.test.tsx`
- [ ] Agent nav Paiements hidden without payments_ops
  - File: `web/src/components/payments/payments-nav.test.tsx`
- [ ] Agent with payments_ops sees ledger timeline read-only
  - File: `web/src/components/payments/agent-payment-detail.test.tsx`
- [ ] Success page does not claim paid until status paid
  - File: `web/src/components/payments/payment-return.test.tsx`
- [ ] Playwright soft : tenant checkout → webhook mock → quittance visible client + landlord + payments_ops ; plain agent 403
  - File: `web/e2e/paiements-plateforme.spec.ts`

## Gate Done S12 (frontend)

- [ ] Checkout + listes + détails 3 personas
- [ ] ACL UI = matrice `14` payments
- [ ] Side-by-side frames DS
- [ ] `npm test` + `npm run typecheck` CI green
