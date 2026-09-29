# Back-office agents — Mandats, docs, dossiers, partenaires

**Document :** Dossier · Tech · Site · 09  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) · [`04-crm-et-leads.md`](./04-crm-et-leads.md) · [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) · [`../../juridique-operations/01-modeles-mandats.md`](../../juridique-operations/01-modeles-mandats.md) · [`../../juridique-operations/03-manuel-agent.md`](../../juridique-operations/03-manuel-agent.md) · [`../../juridique-operations/05-checklists-ops.md`](../../juridique-operations/05-checklists-ops.md) · [`../../../docs/partenaires.md`](../../../docs/partenaires.md)  
**Aval :** `/espace/agent` · Prisma Mandate/Document/Deal · [`14-matrice-droits-roles.md`](./14-matrice-droits-roles.md)

> **Rôle :** spécifier le **portail agent** (command center ops) — mandats, vault docs, suivi dossier, intros partenaires.  
> Scripts terrain → manuel `03`. Stages lead → `04`. Champs publish → `05`.  
> Pas un CRM marketing : c’est le **back-office agence**.

---

## 0. Verdict produit

| Question | Réponse |
| --- | --- |
| Qui | Agents (AC) · OD (contrôle) · GER (vue) |
| URL | `/espace/agent` (auth) |
| V0 | CRUD annonces + mandats min + leads assignés |
| Cible | Deal file + doc vault + PartnerLead + tâches SLA |
| Pas V0 | Comptabilité trust complète · e-sign légal SN · app native |

Bench brokerages 2026 : unifier **pipeline deal + documents + commissions/referrals + tasks** — éviter 5 outils disjoints. EverGreen Y1 = lean web ; commissions détaillées = table + OD.

---

## 1. Modules (carte)

```
/espace/agent
├── (home) Dashboard SLA
├── leads/           ← file CRM assignée
├── mandats/         ← registre + échéances
├── annonces/        ← CRUD catalogue (W-AGT-*)
├── dossiers/        ← deals (achat/vente/loc/gestion)
├── documents/       ← vault par mandat/dossier
├── partenaires/     ← PartnerLead
├── taches/          ← next actions / overdue
└── profil/          ← horaires · WA link
```

| Module | Vague | Priorité |
| --- | :---: | :---: |
| Annonces CRUD | **V0** | P0 |
| Leads assignés (vue) | **V0** | P0 |
| Mandats (fiche + n° registre) | **V0** | P0 |
| Docs upload (photos + PDF mandat) | **V0** | P0 |
| Dashboard matin (SLA) | V0 soft | P1 |
| Dossiers / pipeline deal | V1–2 | P0b |
| PartnerLead | **V1** | P0b |
| Checklists ops cochables | V2 | P1 |
| Commissions tracking | V2+ | P1 |
| Reporting vendeur auto | V2 | P1 |

---

## 2. Mandats

### 2.1 Objet `Mandate`

| Champ | Notes |
| --- | --- |
| `id` · `registre_number` | **Obligatoire** à signature (art. registre) |
| `type` | `sale_exclusive` · `sale_simple` · `rent` · `manage` |
| `status` | `draft` · `active` · `expired` · `renewed` · `cancelled` · `closed` |
| `mandant_name` · `mandant_id_doc` | Identité vérifiée |
| `property_ref` / `listing_id` | Lien annonce |
| `commission_pct` / `fee_notes` | Grille offre |
| `signed_at` · `starts_at` · `ends_at` | Exclusif typ. **90 j** |
| `agent_id` · `od_reviewer_id` | |
| `reporting_due_at` | Bi-mensuel exclusif |
| `documents[]` | PDF signé · CNI |

### 2.2 Workflow UI

```
Estimation / lead vendeur
  → Créer mandat (brouillon)
  → Remplir type + % + dates
  → Upload PDF signé (2 originaux papier hors système)
  → Attribuer n° registre (séquentiel / OD)
  → status=active → débloque Publish annonce
```

**Gate publish (`05` + checklist ops) :** mandat `active` + `paper_type` + photos ≥ 3.

### 2.3 Alertes

| Alerte | Condition |
| --- | --- |
| Expiry J−14 / J−7 | Mandat exclusif |
| Reporting overdue | Pas de note vendeur depuis 15 j |
| Simple sans motif GER | Flag si lead paid |

### 2.4 Écrans

| ID | Écran |
| --- | --- |
| W-AGT-MAN-LIST | Liste mandats (filtres type/status/échéance) |
| W-AGT-MAN-NEW | Création |
| W-AGT-MAN-DETAIL | Fiche + docs + lien annonce + reporting log |

---

## 3. Annonces (rappel CRUD)

Étend `03` W-AGT-NEW/EDIT + validation `05` :

| Action | Règle |
| --- | --- |
| Créer | Depuis mandat actif (idéalement) |
| Publier | Checklist avant publication cochée (ops `05` §1) |
| Éditer | Audit `updated_at` · regen OG |
| Dépublier | sold/rented/archived → SEO `08` |
| Photos | Upload → storage · ordre cover |

**Pas** d’open posting vendeur public.

---

## 4. Documents (vault)

### 4.1 Principes

| Principe | |
| --- | --- |
| Stockage | S3/R2 · accès auth agent/OD |
| Versioning | Nouveau upload = nouvelle version · pas écraser silent |
| Audit | `uploaded_by` · `at` · `doc_type` |
| Visibilité | Mandat / dossier scopés — pas drive perso agent |
| Rétention | Esprit **5 ans** archive deal |

### 4.2 Types doc (enum)

| `doc_type` | Exemples |
| --- | --- |
| `mandate_pdf` | Mandat signé |
| `id_mandant` | CNI / RCCM |
| `title_tf` · `bail` · `deliberation` | Papiers |
| `nicad` · `edr` · `plan` | Diligence |
| `offer` · `compromise` | Closing |
| `visit_sheet` | Fiche visite |
| `edl` | État des lieux (V3) |
| `partner_quote` | Devis BTP |
| `other` | — |

### 4.3 UI

- Onglet Docs sur mandat + sur dossier  
- Drag-drop · preview PDF/images  
- Tag type obligatoire  
- OD peut « validate » document (tampon soft)

---

## 5. Suivi dossier (Deal)

### 5.1 Objet `Deal` / dossier

Un dossier = transaction ou mandat de gestion en cours, lié leads + listing + mandate.

| Champ | |
| --- | --- |
| `deal_type` | `buy` · `sell` · `rent` · `manage` · `diaspora_secure` |
| `stage` | Aligné pipeline `04` (appointment → … → won) |
| `parties` | Vendeur / acquéreur / locataire / bailleur contacts |
| `listing_id` · `mandate_id` | |
| `checklist_state` | JSON cases ops |
| `next_action` · `next_action_at` · `owner_id` | |
| `risk_flags` | `wave_pressure` · `paper_doubt` · … |

### 5.2 Vues agent

| Vue | Contenu |
| --- | --- |
| Kanban / liste | Stages deal filtrés par owner |
| Timeline | Notes · docs · stage changes |
| Checklist | Cases `05-checklists-ops` (publish / paiement / EDL…) |
| Closing | Intro notaire · date acte · commission due |

### 5.3 Lien leads

Lead `stage=mandate` ou `diligence` → Deal auto ou lien manuel.  
1 chat WA = 1 dossier CRM (`manuel` anti-pattern).

---

## 6. Partenaires (PartnerLead)

### 6.1 Objet

| Champ | |
| --- | --- |
| `partner_id` | Shortlist conventionnée |
| `partner_type` | constructeur · archi · notaire · géomètre · … |
| `deal_id` · `lead_id` | |
| `brief` | Texte besoin client |
| `stage` | `sent` → `recalled` → `quoted` → `signed` → `commission_due` → `paid` |
| `sent_at` · `recall_deadline` | **SLA rappel 48 h** |
| `commission_due_fcfa` · `paid_at` | Double filet CA |
| `client_feedback` | Qualité |

### 6.2 UX agent

```
[Créer lead partenaire]
  → Choisir partenaire (convention live only)
  → Brief + pièces autorisées
  → Envoi (WA template + CRM stage=sent)
  → Timer 48 h → ping OD si no recall
  → Maj stage quoted / signed
  → Flag commission_due → EC
```

**Règles (`partenaires.md`) :**

- Pas d’intro sans convention  
- Agent **qualifie** · partenaire **exécute**  
- Ne pas promettre rappel &lt; 2 h (SLA = 48 h)  
- Droit retirer partenaire si SLA raté  

### 6.3 Écrans

| ID | |
| --- | --- |
| W-AGT-PL-LIST | PartnerLeads |
| W-AGT-PL-NEW | Form intro |
| W-AGT-PL-DETAIL | Timeline + commission |

---

## 7. Dashboard & tâches (routine matin)

Aligné manuel agent §1 :

| Widget | Donnée |
| --- | --- |
| Leads `new` sans humain &gt; SLA | Rouge |
| RDV du jour | Liste |
| Relances J+1/J+3/J+7 | Tasks |
| Mandats exclusifs reporting due | |
| PartnerLead &gt; 48 h sans recall | |
| Annonces draft incomplets | |

**Task model :** `title` · `due_at` · `deal_id` · `type` (call/visit/doc/partner) · `done_at`.

---

## 8. Rôles dans le BO (aperçu — détail `14`)

| Rôle | Annonces | Mandats | Docs | Deals | PartnerLead | Commissions |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| **AC** | CRUD own | CRUD own | Upload | Own pipeline | Create | View own |
| **OD** | Validate publish | Registre # | Validate | All view | Ping SLA | Track |
| **GER** | All | All + exceptions simple | All | All | All | Approve |
| **EC** | — | — | Finance docs | Won $ | `paid` | **R** |

---

## 9. Inventaire écrans (extension `03`)

| ID | Écran | Vague |
| --- | --- | :---: |
| W-AGT-LOGIN | Connexion | V0 |
| W-AGT-HOME | Dashboard | V0–1 |
| W-AGT-LIST | Annonces | V0 |
| W-AGT-NEW / EDIT | CRUD + media | V0 |
| W-AGT-LEADS | File leads | V0 |
| W-AGT-MAN-* | Mandats | V0 |
| W-AGT-DOC | Vault | V0 |
| W-AGT-DEAL-* | Dossiers | V1–2 |
| W-AGT-PL-* | Partenaires | V1 |
| W-AGT-TASKS | Tâches | V1 |
| W-AGT-CHECK | Checklist ops UI | V2 |

Chrome : **app shell** (nav secondary) — pas le marketing site public.

---

## 10. Data model (synthèse)

```
Agent ──┬── Mandate ── Listing
        ├── Lead (owner)
        ├── Deal ── Documents[]
        ├── Task
        └── PartnerLead ── Partner
```

Listing sans Mandate active = publish **bloqué** (ou warning GER).

---

## 11. Phasage build

| Phase | Livrable BO |
| --- | --- |
| **V0** | Login · annonces CRUD · upload photos · mandat min (n° + PDF) · vue leads assignés |
| **V1** | PartnerLead · tasks · dashboard SLA soft · deal basique |
| **V2** | Checklists ops · diligence docs · reporting vendeur · commission flags |
| **V3** | Tickets gestion / EDL liés dossier · paiements loyers view |
| **Scale** | E-sign · mobile app · trust accounting full |

**Interdit :** bloquer Vague 0 site public sur BO commissions parfait.

---

## 12. KPI adoption agent

| KPI | Cible |
| --- | ---: |
| % listings avec mandat_id | **100 %** published |
| % mandats avec PDF vault | ≥ 95 % |
| Reporting exclusif à l’heure | ≥ 80 % |
| PartnerLead recall &lt; 48 h | ≥ 80 % |
| Leads sans next_action &gt; 7 j | ↓ |
| Temps draft → published | Track |

---

## 13. Anti-patterns

| Anti | Fix |
| --- | --- |
| Docs sur WA perso / Drive perso | Vault dossier |
| Publish sans mandat / papier | Gates `05` + ops |
| Intro partenaire WhatsApp sans CRM | PartnerLead obligatoire |
| Pipeline leads ≠ pipeline deals | Lien Lead→Deal |
| GER invisible sur exceptions | Rôles OD/GER |
| Agent voit commissions tous | Scope own + EC |

---

## 14. Liens

| Doc | Rôle |
| --- | --- |
| [`04-crm-et-leads.md`](./04-crm-et-leads.md) | Stages · SLA · PartnerLead stages |
| [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) | Publish fields |
| [`../../juridique-operations/01-modeles-mandats.md`](../../juridique-operations/01-modeles-mandats.md) | Contenu juridique mandat |
| [`../../juridique-operations/05-checklists-ops.md`](../../juridique-operations/05-checklists-ops.md) | Cases UI |
| [`../../../docs/partenaires.md`](../../../docs/partenaires.md) | Conventions · % |
| [`14-matrice-droits-roles.md`](./14-matrice-droits-roles.md) | Permissions |

---

## 15. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| Brokerage back-office | Unifier deals · docs · compliance · referrals · tasks |
| Pipeline + vault | Audit trail timestampé · alertes échéances |
| Referral modules | Qui a envoyé · fee · statut paiement |

---

*Back-office agents EverGreen Site v1.0 — sept. 2026. Mandat→publish · vault · dossiers · PartnerLead 48 h · V0 CRUD lean.*
