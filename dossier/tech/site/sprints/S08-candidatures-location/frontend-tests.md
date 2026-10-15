# S08 — Frontend tests

## Todo

- [ ] Visit form creates success ack (no account CTA)
  - File: `web/src/components/leads/visit-request-form.test.tsx`
- [ ] Créer compte — modes scratch vs from-lead
  - File: `web/src/components/users/creer-compte-client-form.test.tsx`
- [ ] Assignation form shows candidate helper copy
  - File: `web/src/components/assignments/assignation-form.test.tsx`
- [ ] Candidature form shows staff-only docs disclaimer + requires checkbox
  - File: `web/src/components/applications/candidature-form.test.tsx`
  - Done when: submit disabled until notice accepted
- [ ] Candidature form blocked without candidate assignment (UI gate)
  - File: `web/src/components/applications/candidate-gate.test.tsx`
- [ ] Agent detail shows doc viewer ; landlord detail does not
  - File: `web/src/components/applications/candidature-detail.test.tsx`
  - Done when: assert no download/preview links for landlord view
- [ ] Landlord inbox shows completeness without file actions
  - File: `web/src/components/applications/candidatures-inbox.test.tsx`
- [ ] Accept modal copy mentions portail locataire débloqué
  - File: `web/src/components/applications/select-tenant-modal.test.tsx`
- [ ] Mes candidatures empty / pre-tenant (no loyers widgets)
  - File: `web/src/components/applications/mes-candidatures.test.tsx`
- [ ] Playwright soft : visit → convert lead → assign candidate → upload → staff accept → client sees bien locataire
  - File: `web/e2e/candidature-location.spec.ts`

## Gate Done S08

- [ ] Demande visite → Lead prospect
- [ ] Compte scratch **ou** depuis prospect
- [ ] Assignation `candidate` → dépôt docs
- [ ] Disclaimer staff-only visible + logué
- [ ] Landlord **ne peut pas** ouvrir les pièces (UI + API)
- [ ] Accept → `tenant` + portail locataire débloqué
- [ ] Side-by-side vs frames DS S08
- [ ] `npm test` + `npm run typecheck` CI green
