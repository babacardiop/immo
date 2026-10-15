# S08 — Backend

**US :** US-V3-00…00e · EF-POR-06…14  
**Outcome :** parcours **visite → prospect → compte → candidat → dépôt docs → accept → portail locataire**  
**Avant :** S01 listings + auth · S03 leads  
**Après / consommé par :** S09 Property cycles · S11 dashboards · **S12 paiements** (Lease / tenant)  
**Vague :** V3 (ne bloque pas Done V1 = S10 embeds)

---

## Flow canonique (actions ordonnées)

| # | Action | Qui | Système |
| ---: | --- | --- | --- |
| **1** | Demande de **visite** sur le site (fiche `/louer/[slug]` ou form) | Prospect (visitor) | Crée un **Lead / Prospect** (`source=visit_request`, listing lié) — **obligatoire** |
| **2** | Visite réalisée · intérêt confirmé | Agent | Lead stage → `interested` / `visit_done` (CRM S03) |
| **3a** | **Créer un compte** from scratch (email/tel + invite) | Agent / OD | `User` + rôle `client` · lien optionnel `leadId` |
| **3b** | **Créer un compte depuis un prospect** | Agent / OD | Convert Lead → User (prérempli) · même lead `converted_user_id` |
| **4** | **Assigner le bien en tant que `candidate`** | Agent / OD | `PropertyAssignment(role=candidate, status=active)` · ouvre dépôt docs **uniquement** pour ce bien |
| **5** | Candidat dépose les pièces requises | Candidat (auth) | `RentalApplication` + `ApplicationDocument` · disclaimer staff-only |
| **6** | Revue dossier (lecture docs) | **Personnel EverGreen uniquement** | Agent assigné / OD / GER — **jamais le propriétaire** |
| **7** | Shortlist / demander docs / reject / **accept** | Staff (+ landlord décision statut soft si mandat) | Voir § décision |
| **8** | Accept → promotion | Système | `candidate` → `tenant` · `Lease` soft · **débloque portail locataire** pour ce bien |

> Le propriétaire **ne voit jamais** les fichiers uploadés (CNI, fiches de paie…). Il peut voir métadonnées soft (statut candidature, % complétude, synthèse agent) selon ACL — pas le vault.

---

## Todo

### 1. Prospect depuis demande visite (site)

- [ ] Toute demande visite / contact location crée un **Lead** typé prospect
  - Champs min : nom, tel/email, listingId, créneau souhaité, message, consent RGPD
  - `leadType=prospect` · `intent=rent_visit`
  - Done when: submit public → row CRM + notif agent · **pas** de compte user auto
- [ ] Idempotence soft : même tel+listing ouvert → update lead plutôt que doublon agressif
  - Done when: tests dedupe

### 2. Compte client (scratch | depuis prospect)

- [ ] Action BO `users.createClientFromScratch`
  - Email/tel · envoi magic link / set password
  - Done when: user `client` login-ready
- [ ] Action BO `users.createClientFromLead(leadId)`
  - Préremplit identité · lie `User.leadId` / `Lead.convertedUserId`
  - Lead stage → `converted`
  - Done when: pas de 2e conversion du même lead
- [ ] Liste prospects convertibles (filtre leads location `visit_*` / `interested`)
  - Done when: agent ouvre convert en 1 clic depuis lead detail

### 3. Assignation `candidate` (puis `tenant`)

- [ ] Modèle `PropertyAssignment`
  - Roles : `landlord` · `co_landlord` · **`candidate`** · **`tenant`** · `buyer` · `guarantor`
  - Statuts : `invited` · `active` · `ended` · `revoked` · `promoted` (candidate→tenant)
  - Done when: `candidate` active → peut uploader docs **sur ce listing seulement**
- [ ] Règles
  - Plusieurs `candidate` active OK (concurrence)
  - Un seul `tenant` active / unité
  - Accept : même row ou replace `candidate` → `tenant` (audit)
  - Sans assignment `candidate` : **pas** de dépôt docs (403)
  - Done when: tests ACL
- [ ] Assignation landlord / buyer (inchangé soft)
  - Landlord → portefeuille proprio
  - Buyer → suivi vente soft
  - Done when: scopes isolés

### 4. Exigences dossier

- [ ] `ApplicationRequirementSet` par listing / template agence
  - Items codes SN (`cni`, `pay_stubs_3`, …) + conditions non-fichier
  - CRUD : **staff** (+ landlord peut proposer template soft / ou staff-only — **v1 = staff configure**, landlord consulte liste « pièces demandées »)
  - Done when: seed Standard SN · Standing · Colocation · Studio

### 5. Candidature + vault (staff-only docs)

- [ ] `RentalApplication` liée user + listing + assignment candidate
  - Statuts : `draft` · `submitted` · `under_review` · `shortlisted` · `accepted` · `rejected` · `withdrawn` · `expired`
  - Completeness vs exigences
  - Done when: machine à états + audit
- [ ] `ApplicationDocument`
  - Upload S3/R2 · MIME · retention (`19`)
  - **ACL lecture fichiers :**
    | Acteur | Read files | Read own uploads |
    | --- | :---: | :---: |
    | Candidat | ○ (sauf ses propres fichiers) | ● |
    | Landlord | ○ **interdit** | ○ |
    | Agent (#) / OD / GER / Admin | ● | ● |
  - Done when: landlord `docs.read` → 403 toujours
- [ ] Disclaimer persisté à la soumission
  - Texte légal court stocké `privacyNoticeVersion` + timestamp accept
  - Done when: submit impossible sans case cochée
- [ ] Anti-doublon 1 candidature ouverte /(user, listing)
- [ ] Deadline `dueAt` → `expired` + notif

### 6. Revue & accept (débloque portail)

- [ ] Inbox **agent/OD** : full (métadonnées + **viewer docs**)
- [ ] Inbox **landlord** (soft) : métadonnées seulement — statut, % complétude, note synthèse agent — **aucun lien fichier**
- [ ] Actions staff : `shortlist` · `request_more_docs` · `reject` · `accept`
- [ ] `accept` atomique :
  1. application → `accepted`
  2. autres candidatures ouvertes → `rejected` / waitlist soft
  3. assignment `candidate` → `tenant` (active)
  4. `Lease` soft
  5. listing → `under_offer` / `rented`
  6. **portail locataire débloqué** pour ce bien (widgets S11)
  7. notifs candidat + landlord
- [ ] Mode mandat : `agency_decides` (défaut recommandé — staff a vu les docs) · `landlord_decides` (landlord confirme sur **synthèse** sans voir fichiers)
- [ ] Events `visit_requested` · `lead_converted` · `candidate_assigned` · `application_*` · `tenant_activated`

### 7. Vente soft (parallèle)

- [ ] `buyer` assignment + `SaleInterest` — hors vault candidature location

## Refs

`53-candidature-dossier-location.md` · `../14` · `../04` CRM · `../19` · DS forms/pages S08
