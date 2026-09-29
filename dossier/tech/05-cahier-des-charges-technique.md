# Cahier des charges technique (CdCT)

**Document :** Dossier · Tech · 05  
**Statut :** v1.0 — sept. 2026  
**Type :** CdCT (comment construire / opérer) — complémentaire au CdCF [`site/11`](./site/11-cahier-des-charges-fonctionnel.md)  
**Amont :** [`01-vision-produit.md`](./01-vision-produit.md) · [`02-architecture-cible.md`](./02-architecture-cible.md) · [`03-prios-mvp.md`](./03-prios-mvp.md) · [`04-securite-donnees.md`](./04-securite-donnees.md) · [`../../docs/tech-stack.md`](../../docs/tech-stack.md) · [`site/07`](./site/07-integrations.md) · [`site/19`](./site/19-data-flow-rgpd.md)  
**Aval :** Devis prestataire · IaC · contrats hébergeur · drills PCA/PRA · runbooks

> **Rôle :** spécifications **techniques** du hub EverGreen — architecture, stack, sécurité, hébergement, **PCA/PRA** (RTO/RPO), environnements, livrables eng.  
> Fonctionnel / MoSCoW produit → CdCF `site/11` + prios `03`. Détail schémas → `02`. Contrôles data → `04`.

---

## 0. En une phrase

Next.js + Postgres + storage S3-split + Auth.js ; hébergement HTTPS managé ; continuité = backups testés + modes dégradés WA/CRM — RTO/RPO **par scénario**.

```
CdCF (quoi)  +  CdCT (comment)  =  contrat build & run
```

---

## 1. Objet & périmètre

### 1.1 Objet

Réaliser et opérer le **hub web agence** EverGreen (SN) : site public curated, CRM/WA, BO agents, outils simu, (plus tard) portails — conforme vision agence-first (`01`).

### 1.2 IN / OUT technique

| IN CdCT | OUT |
| --- | --- |
| App Next, DB, storage, auth, integ WA/email/maps | Marketplace open, app native |
| Hébergement, CI/CD, monitoring | Lab crawl industrialisé (voie parallèle) |
| Sécu applicative + PCA/PRA hub | PCA métier agence hors-IT (locaux, RH) |
| Environnements dev→prod | White-label multi-tenant Y1 |

### 1.3 Documents normatifs

| Doc | Force |
| --- | --- |
| `site/11` CdCF | Exigences fonctionnelles |
| `03` prios MVP | Scope Vague 0–1 |
| `02` archi | Schémas & ADRs |
| `04` sécu data | PII / vault / backups |
| `site/14` ACL | AuthZ |
| `site/19` | Privacy / CDP |
| Ce CdCT | Exigences non-fonctionnelles + infra + PCA/PRA |

---

## 2. Stack imposée (verrouillée)

| Couche | Choix | Alternative refusée Y1 |
| --- | --- | --- |
| Runtime app | **Next.js App Router + TypeScript** | SPA CSR-only |
| UI | **Tailwind + shadcn/ui** + tokens EverGreen | CSS-in-JS heavy / Material default |
| API | Route Handlers / Server Actions | Microservices day-1 |
| ORM | **Prisma ou Drizzle** (trancher kickoff) | — |
| DB | **PostgreSQL** managé | SQLite prod |
| Auth | **Auth.js** | Roll-your-own sessions |
| Storage | **S3-compatible** (public + vault) | Disque local prod |
| Maps | **Leaflet + OSM** | Google Maps Y1 |
| Email | **Resend** (ou équiv. transactionnel) | SMTP bricolé |
| WA V0 | `wa.me` + Business App | Cloud API obligatoire J0 |
| Observabilité | Logs host + Sentry opt. | — |
| Paiements | Soft V0 · Wave/OM V3+ | — |

Justification métier/SEO → `tech-stack.md` · `02`.

---

## 3. Architecture (exigences)

### 3.1 Style

| Exigence ID | Énoncé |
| --- | --- |
| ARCH-01 | Déploiement **monolithe Next** Y1 (UI+API) |
| ARCH-02 | Pages catalogue/fiches **SSR/SSG/ISR** indexables |
| ARCH-03 | Séparation buckets **public** vs **vault** |
| ARCH-04 | Lab / crawl **découplé** (schema ou projet séparé) |
| ARCH-05 | Extraction `apps/api` seulement si charge prouvée |
| ARCH-06 | Schéma domaine minimal : Listing, Lead, Mandate, Document, User, PartnerLead |

Schémas C4 → `02` §2–3.

### 3.2 Intégrations (contrat tech)

| Système | Exigence |
| --- | --- |
| WA | Deep link V0 · webhook HMAC si Cloud API |
| Resend | Ack forms &lt; 2 min path |
| Storage | Presigned upload/download · Block Public Access vault |
| Payments V3 | Webhooks signés · idempotency keys |
| Analytics | Events `wa_click`, `sim_complete` sans P3/P4 |

### 3.3 Performance (NFR)

| ID | Cible V0–1 |
| --- | --- |
| NFR-PERF-01 | LCP fiche acceptable 4G SN (budget images `next/image`) |
| NFR-PERF-02 | TTFB money pages raisonnable (hébergeur edge/CDN) |
| NFR-PERF-03 | Catalogue &lt; quelques centaines listings — pas besoin search engine |
| NFR-PERF-04 | Upload photo : limite taille/mime côté API |

### 3.4 Disponibilité (NFR)

| ID | Cible |
| --- | --- |
| NFR-AVAIL-01 | Objectif **best-effort ≥ 99,5 %** mois hors maintenance planifiée (Y1 PME) |
| NFR-AVAIL-02 | Maintenance annoncée · fenêtre hors pics (soir SN) |
| NFR-AVAIL-03 | Healthcheck `/api/health` (DB ping soft) |

Hausse 99,9 % = coût redondance — hors Must V0.

---

## 4. Sécurité (exigences CdCT)

Détail contrôles → `04`. Exigences contractuelles prestataire/eng :

| ID | Exigence |
| --- | --- |
| SEC-01 | TLS public · HSTS |
| SEC-02 | Secrets hors git · rotation documentée |
| SEC-03 | Auth.js sur `/espace/*` · ACL `14` enforce API |
| SEC-04 | Vault non public · signed URL TTL court · audit `vault.read` |
| SEC-05 | Rate-limit / validation Zod sur forms & webhooks |
| SEC-06 | Headers sécu de base (CSP progressive, etc.) |
| SEC-07 | Dépendances : audit npm CI soft |
| SEC-08 | Pas de PII P3+ dans logs/Sentry |
| SEC-09 | MFA Must pour Admin/OD (cible ; Should V0) |
| SEC-10 | Offboarding &lt; 24 h révocation accès |

Conformité données / CDP → `site/19` (déclaration, DPA) — **obligation go-live**.

---

## 5. Hébergement & environnements

### 5.1 Critères de choix hébergeur

| Critère | Exigence |
| --- | --- |
| Runtime | Node 20+ compatible Next |
| Région | Latence acceptable Dakar/Europe · **DPA** signé |
| DB | Postgres managé + backups |
| Object storage | S3 API · versioning · encryption |
| TLS / DNS | Automatisé |
| Preview | Env PR souhaitable |
| Support | Canal incident documenté |
| Facturation | Prévisible PME |

Options non exclusives : Vercel/Neon/R2 · Fly · Render · Railway · VPS + Docker (OVH/Scaleway/…) — **trancher GER** avec counsel transferts.

### 5.2 Environnements

| Env | Rôle | Data |
| --- | --- | --- |
| `dev` | Local | Docker PG + MinIO |
| `preview` | PR | Branch DB si possible · data fictive |
| `staging` | Recette OD | Anonymisée / subset |
| `prod` | Live | Réelle · accès restreint |

Règle : **pas** de copie prod P3/P4 vers laptop sans procédure.

### 5.3 CI/CD

| Exigence | |
| --- | --- |
| Git main protégé | PR + review |
| CI | lint · typecheck · tests unit soft · build |
| Deploy | staging auto · prod manuel/approuvé |
| Migrations | Prisma/Drizzle migrate gated |
| Secrets | CI secrets store |

### 5.4 Responsabilité partagée (cloud)

| Domaine | Hébergeur | EverGreen |
| --- | :---: | :---: |
| Infra physique / hypervisor | ● | ○ |
| Patch OS managé | ● | ○ |
| Config app / IAM buckets | ○ | ● |
| Code sécu / ACL | ○ | ● |
| Backups config & restore tests | ◐ | ● owner drills |
| Contenu / mandats | ○ | ● |

---

## 6. PCA / PRA

Définitions ([Vytalx 2026](https://www.vytalx.fr/pca-et-pra-en-2026-definition-et-guide-complet), [Foxeet CdC PRA](https://foxeet.fr/contenu/modele-cahier-des-charges-pra-pca-informatique)) :

| Terme | Sens EverGreen |
| --- | --- |
| **PCA** | Continuer l’activité **agence** en mode dégradé (WA + process manuel) si digital partiel |
| **PRA** | Restaurer le **système hub** (app, DB, vault) après sinistre IT |
| **RTO** | Temps max pour reprendre le service IT concerné |
| **RPO** | Perte de données max acceptable |
| **MBCO** | Minimum viable : leads captés + catalogue consultable + agents joignables |

### 6.1 BIA — processus critiques (30 j)

| Processus | Impact si down | Dépendance IT |
| --- | --- | --- |
| **P-CAT** Catalogue / fiches SEO | Perte leads inbound | App + DB + CDN |
| **P-LEAD** Capture & SLA WA | Perte closing | Forms API + WA (humain) |
| **P-BO** Publish / CRM agent | Stock figé | App + auth + storage |
| **P-TRUST** Vault docs closing | Risque juridique | Storage vault + DB meta |
| **P-SIM** Simus (V1+) | Moins de conversion | App (stateless calc) |
| **P-PAY** Loyers digitaux (V3) | Recettes retard | Webhooks PSP |

### 6.2 Grille d’avaries → RTO / RPO (Y1)

| Scénario | RTO cible | RPO cible | Stratégie |
| --- | --- | --- | --- |
| **S1** Bug deploy / app crash | ≤ **4 h** | ≤ **1 h** (si PITR) sinon ≤ 24 h | Rollback release · health |
| **S2** Panne région hébergeur app | ≤ **24 h** | ≤ **24 h** | Redeploy autre région / host · DNS |
| **S3** Corruption / perte DB | ≤ **24 h** | ≤ **24 h** V0 (daily) | Restore backup · viser PITR ≤ 1–4 h scale |
| **S4** Vault inaccessible | ≤ **24–48 h** | ≈ 0 si versioning | Restore objects · mode closing papier |
| **S5** Compromission compte Admin | ≤ **4 h** contain | n/a | Rotate secrets · revoke sessions |
| **S6** Indispo Meta WA | MBCO | n/a | Téléphone voix · email · SMS soft |
| **S7** Ransomware / wipe | ≤ **72 h** | ≤ **24 h** | Restore immuable offsite · rebuild |

**GER signe** cette grille avant go-live (évite contestation post-incident).

### 6.3 Mode dégradé PCA (métier)

| Si… | Alors MBCO |
| --- | --- |
| Site down | Page status · WA Business + catalogue offline (PDF/Sheet) temporaire |
| Forms down | Uniquement `wa.me` + log manuel CRM Sheet urgence |
| BO down | Freeze publish · OD priorise leads existants |
| Simus down | CTA WA « conseiller calcule avec vous » |

Communication : message unique OD/GER · pas de silence &gt; 2 h ouvrées incident P1.

### 6.4 Sauvegardes (PRA)

| Asset | Policy min V0 | Scale |
| --- | --- | --- |
| PostgreSQL | Daily + rétention ≥ 30 j | PITR / WAL |
| Object storage | Versioning ON · soft-delete | Réplication région |
| Secrets | Export chiffré hors bande | Vault secrets |
| Règle copies | **3-2-1** soft : 3 copies · 2 médias/loc · 1 offsite | +1 immuable anti-ransomware ([Vytalx](https://www.vytalx.fr/pca-et-pra-en-2026-definition-et-guide-complet)) |

### 6.5 Protocoles de test

| Test | Fréquence | Critère succès |
| --- | --- | --- |
| Restore DB → staging | **Trimestriel** | App boot · spot listings/leads |
| Restore objet vault sample | Semestriel | Signed URL |
| Rollback deploy | Chaque incident S1 ou drill annuel | Version N-1 live &lt; RTO |
| Tabletop incident S5/S7 | Annuel | Roles clairs · timeline documentée |

Comptes-rendus archivés (preuve audit).

### 6.6 Chaîne de décision incident

```
Detect → Severity (P1/P2/P3)
  → Notify GER + Admin
  → Contain (SEC playbook 04)
  → Recover (PRA) ou Degrade (PCA)
  → Comms clients si &gt; 4 h P-CAT/P-LEAD
  → Post-mortem 5 jours
```

P1 = catalogue ou leads ou vault down / suspicion breach.

---

## 7. Monitoring & support

| Signal | Exigence |
| --- | --- |
| Uptime | Ping `/api/health` + alerte |
| Errors | Agrégation erreurs 5xx |
| Disk/DB | Alertes provider |
| Support eng | Best-effort Y1 · SLA à contractualiser si presta |
| Astreinte | Soft : GER a contact hébergeur + Admin |

---

## 8. Livrables techniques attendus

| Livrable | Contenu |
| --- | --- |
| Code repo | Next app · migrations · README run |
| `.env.example` | Vars sans secrets |
| Infra doc | Host choisi · DNS · diagramme à jour |
| Runbooks | Deploy · rollback · restore DB · rotate secrets |
| Rapport restore | Dernier drill daté |
| Matrice DPA | Hébergeur · email · storage |
| Recette NFR | Perf smoke · sécu checklist `04` §11 |

---

## 9. Recette technique (extrait)

| ID | Critère | Preuve |
| --- | --- | --- |
| RT-01 | Build & deploy staging OK | URL |
| RT-02 | Migrations idempotentes | Log CI |
| RT-03 | Vault non listable public | curl/script |
| RT-04 | HTTPS + redirect | Browser |
| RT-05 | Auth agent + 403 cross-owner lead | Test ACL |
| RT-06 | Backup daily visible | Console provider |
| RT-07 | Restore drill &lt; 90 j | CR |
| RT-08 | Healthcheck green | Uptime |
| RT-09 | Webhook signature reject tampered (si WABA) | Test |
| RT-10 | Grille RTO/RPO signée GER | Doc |

Recette fonctionnelle → CdCF R1–R12.

---

## 10. Phasage livraison tech

| Phase | Contenu CdCT |
| --- | --- |
| **MVP V0** | Stack · envs · vault · auth · backups daily · PCA dégradé WA · RT-01…08 |
| **V1** | Sim APIs · rate-limit · events |
| **V3** | Payments webhooks · MFA Must · RPO resserré |
| **Scale** | Multi-AZ soft · WABA · 99,9 % option · immuable backups |

---

## 11. Hors scope / exclusions

| Exclusion | Motif |
| --- | --- |
| Certification SOC2 formal Y1 | Coût · viser contrôles équivalents |
| Multi-région active-active | Overkill volume |
| PCA locaux agence (incendie bureau) | Doc ops séparé |
| Garantie uptime 100 % | Impossible SaaS |

---

## 12. Glossaire CdCT

| Terme | Sens |
| --- | --- |
| CdCT / CdCF | Technique vs fonctionnel |
| PCA / PRA | Continuité activité / reprise IT |
| RTO / RPO | Temps / perte données |
| PITR | Point-in-time recovery DB |
| MBCO | Minimum business continuity objective |
| DPA | Data processing agreement |

---

## 13. Validation

| Version | Date | Décision |
| --- | --- | --- |
| v1.0 | sept. 2026 | Baseline CdCT |

**Approbation GER (grille §6.2) :** □ ____  
**Approbation Admin tech :** □ ____  

---

## 14. Sources

| Source | Apport |
| --- | --- |
| Docs tech 01–04 · site 07/11/14/19 · tech-stack | EverGreen |
| [ARDN / Digital Unicorn CdC SaaS](https://ardn.tech/fr-fr/blog/saas/cahier-des-charges-saas-sur-mesure-exemple) | Structure CdCT SaaS |
| [Foxeet PRA/PCA](https://foxeet.fr/contenu/modele-cahier-des-charges-pra-pca-informatique) | RTO/RPO par scénario · BIA |
| [Vytalx PCA/PRA 2026](https://www.vytalx.fr/pca-et-pra-en-2026-definition-et-guide-complet) | 3-2-1-1-0 · tests |
| VOID / modèles hébergement | NFR dispo · recette |

---

## 15. Liens

| Doc | Rôle |
| --- | --- |
| [`site/11-cahier-des-charges-fonctionnel.md`](./site/11-cahier-des-charges-fonctionnel.md) | CdCF |
| [`02-architecture-cible.md`](./02-architecture-cible.md) | Diagrammes |
| [`04-securite-donnees.md`](./04-securite-donnees.md) | Contrôles data |
| [`03-prios-mvp.md`](./03-prios-mvp.md) | Scope build |

---

*CdCT EverGreen Tech v1.0 — sept. 2026. Stack Next/PG/S3/Auth · NFR · hébergement DPA · PCA dégradé · PRA RTO/RPO par scénario · drills trimestriels.*
