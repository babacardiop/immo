# S08 — Backend tests

## Todo

### Prospect / visite

- [ ] Visit request creates Lead prospect (no User)
  - File: `web/src/lib/leads/visit-request.test.ts`
  - Done when: `leadType=prospect` · listing linked · no user row
- [ ] Duplicate open visit same tel+listing updates not doubles
  - File: `web/src/lib/leads/visit-dedupe.test.ts`

### Compte

- [ ] Create client from scratch
  - File: `web/src/lib/users/create-client.test.ts`
- [ ] Create client from lead converts once
  - File: `web/src/lib/users/convert-lead.test.ts`
  - Done when: second convert rejected · `convertedUserId` set

### Assignation candidate / tenant

- [ ] Candidate assignment required before upload
  - File: `web/src/lib/assignments/candidate-gate.test.ts`
  - Done when: no assignment → upload 403
- [ ] Accept promotes candidate → tenant and unlocks portal scope
  - File: `web/src/lib/applications/activation.test.ts`
  - Done when: role `tenant` · lease soft · other candidates closed
- [ ] Single active tenant per unit
  - File: `web/src/lib/assignments/uniqueness.test.ts`
- [ ] Landlord assignment scopes portfolio
  - File: `web/src/lib/assignments/acl.test.ts`

### Docs staff-only

- [ ] **Landlord cannot read application document bytes/URLs**
  - File: `web/src/lib/applications/docs-acl.test.ts`
  - Couvre: règle métier critique
  - Done when: landlord → 403 · agent/OD → 200 · candidat own → 200
- [ ] Submit requires privacy notice version
  - File: `web/src/lib/applications/privacy-notice.test.ts`

### Candidature / sélection

- [ ] Completeness score
  - File: `web/src/lib/applications/completeness.test.ts`
- [ ] Duplicate open application blocked
  - File: `web/src/lib/applications/dedupe.test.ts`
- [ ] Accept selects one rejects others
  - File: `web/src/lib/applications/selection.test.ts`
- [ ] Agency vs landlord decide (landlord never needs file access)
  - File: `web/src/lib/applications/decision-mode.test.ts`
