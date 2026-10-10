# S07 — Backend tests

## Todo

- [ ] Simu budget math golden cases
  - File: `web/src/lib/simus/budget.test.ts`
- [ ] Crédit étalé ≠ amortissement banque (assert disclaimer path)
  - File: `web/src/lib/simus/credit.test.ts`
- [ ] Loyer calc edge 0 / négatif → validation
  - File: `web/src/lib/simus/loyer.test.ts`
- [ ] No PII stored without consent
  - File: `web/src/app/actions/simu-lead.test.ts`
- [ ] Schema rejects empty / NaN inputs
  - File: `web/src/lib/simus/schema.test.ts`
