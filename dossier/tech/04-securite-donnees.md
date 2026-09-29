# Sécurité des données — PII, KYC, vault, backups, accès

**Document :** Dossier · Tech · 04  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`02-architecture-cible.md`](./02-architecture-cible.md) · [`site/19-data-flow-rgpd.md`](./site/19-data-flow-rgpd.md) · [`site/14-matrice-droits-roles.md`](./site/14-matrice-droits-roles.md) · [`site/09-back-office-agents.md`](./site/09-back-office-agents.md) · [`site/07-integrations.md`](./site/07-integrations.md)  
**Aval :** [`05-cahier-des-charges-technique.md`](./05-cahier-des-charges-technique.md) · runbooks ops · checklist go-live

> **Rôle :** contrôles **techniques & ops** sur les données — classification PII, KYC mandants, vault docs, backups, accès — complémentaire au cadrage légal `site/19`.  
> ACL fine → `14`. PCA/PRA hébergement → `05`.

---

## 0. En une phrase

Chiffrer · cloisonner · auditer : PII et pièces d’identité **hors** surface publique ; vault à signed URL ; backups testés ; accès RBAC + MFA privilégiés.

```
Classer → Minimiser → Chiffrer → ACL → Auditer → Sauvegarder → Purger
```

---

## 1. Objectifs & menace

| Objectif | Mesure |
| --- | --- |
| Confidentialité | Pas de fuite CNI / leads / IBAN |
| Intégrité | Publish gates · audit mutations |
| Disponibilité | Backups + restore drill |
| Traçabilité | Qui a lu le vault / exporté |

| Menace typique PropTech | Contrôle EverGreen |
| --- | --- |
| Bucket S3 public par erreur | Vault privé + policy deny public |
| Agent part avec CRM perso | CRM société · révocation offboarding |
| CNI envoyée au BTP | PartnerLead borné · pas vault auto |
| Ransomware / perte DB | Backups offline/object + restore test |
| Phishing compte OD | MFA · least privilege |
| Export CSV massif | `leads.export` OD only + audit |

Bench 2025–26 : TLS + AES-at-rest, RBAC+MFA, audit append-only, retention TTL, consent/erasure capability ([Hicron](https://hicronsoftware.com/blog/proptech-software-development-compliance/), [Lextract](https://lextract.io/resources/guides/data-security-compliance-lease-abstraction), [CodeSecure PropTech](https://blog.codesecure.co.in/property-tech-security-proptech-platform-protection-strategies/), [RiskImmune SOC2 PropTech](https://riskimmune.ai/blog/soc-2-for-proptech-property-data-privacy-and-processing-integrity)).

---

## 2. Classification des données

| Classe | Exemples | Stockage | Accès |
| :---: | --- | --- | --- |
| **P0 Public** | Photos listing, prix, pastille papier déclarée | `public/listings` · CDN | Tout le monde |
| **P1 Interne** | Notes deal, stages CRM, commissions | PG | Agent own / OD all |
| **P2 PII contact** | Tel, email, nom lead | PG | ACL leads |
| **P3 Sensible ID** | CNI, RCCM, selfie KYC soft | **Vault** privé | vault.read scoped + audit |
| **P4 Foncier docs** | EDR, titre PDF, NICAD | Vault | idem |
| **P5 Financier** | IBAN, Wave payout, loyers | PG chiffré field opt. | landlord own / OD |
| **P6 Secrets** | Tokens API, `AUTH_SECRET` | Secret manager / env | Admin only |

**Règle :** P3–P5 **jamais** dans logs app, Sentry raw, analytics, ni message WA prérempli.

---

## 3. PII — contrôles produit

### 3.1 Collecte

| Contrôle | Implémentation |
| --- | --- |
| Minimisation | Forms 3–4 champs (`site/04`) |
| Pas de CNI public | Upload vault agent-only |
| Consent flags | `marketing_opt_in`, `partner_intro_ok` en DB |
| Masking UI | Afficher `+221•••89` hors besoin |

### 3.2 Transit & repos

| Couche | Standard Y1 |
| --- | --- |
| Transit | **TLS 1.2+** (cible 1.3) partout |
| DB at-rest | Chiffrement volume hébergeur (AES-256) |
| Object storage | SSE-S3 / SSE-KMS |
| Field-level (opt. V3+) | IBAN / NICAD encrypt app-level si besoin |
| Backups | Chiffrés · accès restreint |

### 3.3 Interdits ops

- Coller CNI / EDR dans WhatsApp groupe  
- Partager Sheet CRM hors Google/Workspace société  
- Screenshots vault sur téléphone perso  
- `console.log` de body lead en prod  

---

## 4. KYC / identification mandants

Pas un KYC bancaire full AML Y1 — **identification agence** pour mandat / closing (aligné checklists ops).

### 4.1 Quand

| Événement | KYC requis |
| --- | :---: |
| Signature mandat vente / gestion | ● |
| Closing / séquestre via notaire | ● (souvent notaire lead) |
| Lead catalogue simple | ○ |
| Intro PartnerLead | ○ (identité soft) |
| Compte portail L/P V3 | ● soft (email+tel vérif) |
| Paiements Wave/OM agence | KYB **agence** auprès PSP |

### 4.2 Process V0 (manuel + vault)

```
Mandant → Agent vérifie CNI / RCCM (physique ou scan)
  → Upload vault (Document type=id_doc)
  → Cocher mandate.identity_verified_at
  → OD spot-check échantillon
```

| Champ | Obligatoire mandat |
| --- | :---: |
| `mandant_name` | ● |
| `id_doc_type` / `id_doc_ref` | ● |
| Scan vault `id_doc` | ● |
| `identity_verified_by` / `_at` | ● |
| Adresse | Should |

**AML 2026** (repère [BatchData](https://batchdata.io/uncategorized/compliance-aml-kyc)) : si tickets élevés / cash / diaspora complexe — escalade counsel + screening ; pas auto-build Y1. Conserver **provenance** (qui a vérifié, quand, quelle pièce).

### 4.3 Interdit KYC

- Stocker selfie + CNI sans finalité mandat  
- Envoyer pack KYC au constructeur P  
- « Vérifié » marketing sans `identity_verified_at`  

---

## 5. Documents clients — vault

### 5.1 Types document

| `doc_type` | Classe | Exemple |
| --- | :---: | --- |
| `mandate_pdf` | P3 | Mandat signé |
| `id_doc` | P3 | CNI / passeport |
| `title_doc` | P4 | Extrait / EDR |
| `edl_photo` | P3/P1 | État des lieux V3 |
| `receipt` | P2/P5 | Quittance |
| `listing_photo` | P0 | Publique |

### 5.2 Architecture vault

| Règle | Détail |
| --- | --- |
| Bucket | Préfixe `vault/` **Block Public Access** |
| Upload | Presigned PUT après auth agent · mime allowlist PDF/JPEG/PNG · max size |
| Download | Presigned GET TTL **60–300 s** · permission `docs.vault.read` |
| Métadonnées | PG `Document` (pas le binaire) · `listing_id` / `mandate_id` |
| Antivirus | Soft V1+ (ClamAV / provider) sur upload |
| Retention | Classe T-MAND `site/19` · job purge |

### 5.3 Matrice accès docs (rappel)

| Rôle | Listing photo | Vault CNI | Quittance own |
| --- | :---: | :---: | :---: |
| Visitor | ● | ○ | ○ |
| Agent | ● own listings | ◐ own mandates | ◐ assigned |
| OD | ● | ● + audit | ● |
| Client/Landlord | ○ | ○ | ● own |
| Partner | ○ | ○ | ○ |

Audit **obligatoire** sur `docs.vault.read` pour `id_doc` / `title_doc`.

---

## 6. Accès (identité & privilèges)

### 6.1 Contrôles AuthN

| Contrôle | V0 | Cible |
| --- | :---: | :---: |
| Auth.js session DB | ● agents | ● + portails |
| Mot de passe policy | ● | ● |
| MFA | Should OD/Admin | **Must** privilégiés |
| Lockout / rate login | Soft | ● |
| Session revoke offboarding | ● | ● |
| Magic link email | Opt | Portails |

### 6.2 Contrôles AuthZ

Source de vérité : [`site/14`](./site/14-matrice-droits-roles.md).

| Hardening | |
| --- | --- |
| Middleware `/espace/*` | Session required |
| API deny même si UI hide | ● |
| Export leads | OD/GER only |
| Force publish | OD + motif audit |
| Impersonation portail | OD ⚠ + motif · jamais agent |
| Admin quotidian ≠ agent | Séparer comptes |

### 6.3 Comptes & secrets

| Item | Règle |
| --- | --- |
| Comptes individuels | Pas de login partagé « agence » |
| Offboarding J0 | Disable user · rotate si secrets partagés |
| Secrets | Env / vault secrets · rotation tokens WA/S3 |
| Clés CI | Least privilege · pas prod DB depuis laptop sans VPN/policy |

Revue accès **trimestrielle** OD + Admin (liste users actifs).

---

## 7. Backups & reprise

### 7.1 Périmètre

| Asset | Fréquence cible | Rétention cible |
| --- | --- | --- |
| PostgreSQL | Quotidien full + WAL/PITR si dispo | ≥ 30 j · snapshots hebdo ≥ 90 j |
| Object storage | Versioning + replication région | Aligné docs + recycle soft-delete |
| Secrets config | Export chiffré hors bande | Sur changement |
| Code | Git remote | — |

Chiffrement backups · accès Admin only · **pas** sur laptop agent.

### 7.2 Tests restore

| Drill | Fréquence | Succès |
| --- | --- | --- |
| Restore PG staging depuis backup | **Trimestriel** min | App boote · spot-check listings/leads |
| Récup objet vault sample | Semestriel | Signed URL OK |
| RTO / RPO cibles | Documenter dans `05` | Ex. RPO ≤ 24 h V0 · resserrer scale |

### 7.3 Soft-delete

Listings/leads : soft-delete + `purged_at` selon retention — backups peuvent encore contenir PII jusqu’à expiry snapshot (documenter dans politique).

---

## 8. Logging & audit

| Événement | Loguer | Rétention audit |
| --- | --- | --- |
| Login fail/success | user, ip, ts | ≥ 12 mois |
| `docs.vault.read` P3/P4 | user, doc_id | ≥ 24–36 mois |
| `leads.export` | user, filtres, count | ≥ 24 mois |
| `listings.force_publish` | user, motif | ≥ 24 mois |
| `roles.assign` | actor, target | ≥ 36 mois |
| Payment webhook | id, status | Aligné finance |

Logs applicatifs : **redacter** PII. Store audit **append-only** (table séparée ou SIEM soft).

Alertes soft V1 : spike exports · multi fail login · 403 vault massifs.

---

## 9. Intégrations & sous-traitants (sécu)

| Intégration | Risque | Contrôle |
| --- | --- | --- |
| WhatsApp / Meta | Messages hors DB | Numéro société · pas CNI dans chat · DPA/terms |
| Resend | Email PII | DPA · pas CC vault |
| S3 provider | Bucket leak | Block public · IAM least |
| Analytics | IP | Anonymize · pas CRM dump |
| Wave/OM V3 | Paiements | KYB · webhooks signés · PCI scope minimize |
| Lab crawl | ToS / bruit | Séparé · 0 merge identity CRM |

Checklist DPA : `site/19` §8.

---

## 10. Cycle incident données

Aligné `site/19` §10 — focus tech :

| Phase | Actions tech |
| --- | --- |
| Detect | Alertes · plainte · anomaly audit |
| Contain | Rotate keys · disable user · freeze bucket policy |
| Eradicate | Patch · revoke sessions |
| Recover | Restore si besoin · verify integrity |
| Lessons | Post-mortem · MAJ contrôles |

Contacts : Admin on-call · GER · counsel (CDP / personnes).

---

## 11. Checklist go-live sécu (V0)

- [ ] TLS prod · HSTS  
- [ ] Vault bucket non public (test script)  
- [ ] Auth agent + ACL own leads (ACL-01…10 sample)  
- [ ] Upload mime/size limits  
- [ ] Secrets hors git · `.env.example` only  
- [ ] Backup PG automatisé + **1 restore test** staging  
- [ ] Audit log sur vault.read / export  
- [ ] Politique confidentialité live  
- [ ] Engagement confidentialité agents signé  
- [ ] Offboarding playbook 1-pager  
- [ ] Sentry sans PII bodies  

---

## 12. Phasage

| Vague | Ajouts sécu |
| --- | --- |
| **V0** | Classes · vault · TLS · ACL · backups · audit min · KYC manuel |
| **V1** | PartnerLead flags · rate-limit forms · AV soft uploads |
| **V3** | Portails · field encrypt IBAN · payment webhooks HMAC · MFA Must |
| **Scale** | WABA sécu · SIEM · PITR agressif · pen-test |

---

## 13. Liens

| Doc | Rôle |
| --- | --- |
| [`site/19-data-flow-rgpd.md`](./site/19-data-flow-rgpd.md) | Légal / flux / retention |
| [`site/14-matrice-droits-roles.md`](./site/14-matrice-droits-roles.md) | RBAC |
| [`02-architecture-cible.md`](./02-architecture-cible.md) | Storage / auth |
| [`05-cahier-des-charges-technique.md`](./05-cahier-des-charges-technique.md) | PCA/PRA hébergement |

---

## 14. Sources

| Source | Apport |
| --- | --- |
| Docs EverGreen 02 · 14 · 19 · 09 | Controles métier |
| Hicron / Lextract / CodeSecure / RiskImmune / BatchData AML 2026 | Encryption · audit · KYC provenance · retention evidence |

---

*Sécurité données EverGreen Tech v1.0 — sept. 2026. P0–P6 · vault signed URL · KYC mandat · RBAC+MFA · backups drill · audit vault/export.*
