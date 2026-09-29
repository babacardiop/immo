# Cahier des charges fonctionnel (CdCF) — Hub EverGreen

**Document :** Dossier · Tech · Site · 11  
**Statut :** v1.0 — sept. 2026  
**Type :** CdCF (besoins métier) — pas CdCT  
**Amont :** [`01`](./01-sitemap-et-ia.md)–[`10`](./10-roadmap-features.md) · [`../../../docs/positioning.md`](../../../docs/positioning.md) · [`../../../docs/hub-roadmap.md`](../../../docs/hub-roadmap.md) · [`../../../docs/tech-stack.md`](../../../docs/tech-stack.md)  
**Aval :** [`12-user-stories-backlog.md`](./12-user-stories-backlog.md) · [`14-matrice-droits-roles.md`](./14-matrice-droits-roles.md) · [`19-data-flow-rgpd.md`](./19-data-flow-rgpd.md) · CdCT / tickets eng

> **Rôle :** document **maître d’ouvrage** — ce que le hub doit permettre de faire, pour qui, avec quelles règles et quels critères de recette.  
> Détail UX / data / vagues → docs `01`–`10`. Stories → `12`. Technique d’implémentation → CdCT (prestataire / eng).

---

## 0. En une phrase

EverGreen livre un **site + back-office d’agence immobilière sénégalaise** (catalogue curated, CRM WhatsApp, outils décision, portails, partenaires) — **pas** une marketplace open-posting.

```
Agence (métier)  ←amplifiée→  Hub PropTech (cet outil)
Mandats · Visites · Closing · Gestion loyers
Catalogue · Simus · WA/CRM · BO · SEO · Add-ons partenaires
```

---

## 1. Contexte & objectifs

### 1.1 Contexte

| Élément | Description |
| --- | --- |
| **Organisation** | Agence immobilière full-service au Sénégal (vente, location, gestion, accession étalée / loc-vente) |
| **Produit** | Hub web **EverGreen** — couche digitale du métier agence |
| **Marché** | Dakar / Z1 d’abord · diaspora FR · confiance papier (TF / bail / délibération) critique |
| **Différenciation** | Curated + papiers first-class + outils terrain→maison + orchestration partenaires — vs Expat volume / Senhectare domaine |

### 1.2 Objectifs mesurables (Y1)

| # | Objectif | Indicateur |
| ---: | --- | --- |
| O1 | Présence crédible en ligne | Site live · mandats curated publiés · SLA lead &lt; 24 h |
| O2 | Différenciation acheteur terrain | 3 simus + embeds fiche · ≥3 partenaires live (BTP, archi, notaire) |
| O3 | Pipeline commercial traçable | 100 % leads société · source taguée · owner assigné |
| O4 | Confiance foncière | % listings vente avec `paper_type` · disclaimer délibération |
| O5 | Base récurrente (Vague 3+) | Mandats gestion · portails L/P |

Message externe hub **après** Vague 1 Done uniquement (`hub-roadmap`).

### 1.3 Parties prenantes

| Rôle | Intérêt CdCF |
| --- | --- |
| Fondateur / GER | Scope, vagues, KPI Done |
| Agents (AC) / OD | BO usable, SLA tenables |
| Eng / prestataire | Exigences testables, hors-scope clair |
| Contenu / marketing | Surfaces SEO, CTA, guides |
| Partenaires | PartnerLead, pas exécution métier EverGreen |

---

## 2. Périmètre

### 2.1 Dans le périmètre (IN)

| Domaine | Description | Doc détail |
| --- | --- | --- |
| Site public | Accueil, catalogues vente/location, fiches, hubs métier, guides, outils, legal | `01` |
| Catalogue curated | CRUD agent-only · badges papiers · filtres · map | `05` |
| CRM / leads | Capture WA/forms/simus · pipeline · SLA · PartnerLead | `04` |
| Back-office agent | Mandats, annonces, docs, dossiers, tâches | `09` |
| Outils / add-ons | Simulateurs, checklists, embeds lead magnets | `06` |
| Intégrations | WA Business, maps, email, paiements (phasés) | `07` |
| SEO technique | Schema, sitemaps, perf, FR | `08` |
| Portails | Agent V0 · proprio / client V3 · diaspora V4 | `01` `02` |
| Hub partenaires | CTA + tracking commissions light | `10` |
| Observatoire | Page publique indices **si** Lab L4 | lab `07` |

### 2.2 Hors périmètre (OUT)

| Exclu | Motif |
| --- | --- |
| Marketplace open posting vendeur | Positionnement agence |
| App native iOS/Android Y1 | Web mobile-first |
| Underwriting / prêt bancaire | Simu = **étalé** seulement · crédit via courtier P |
| Escrow ledger agence | Séquestre via notaire |
| Comptabilité trust complète | Table OD / externe |
| E-sign légal SN full | Upload + process manuel V0–2 |
| Crawl lab comme dépendance V0–1 | Voie parallèle — ne bloque pas hub |
| White-label multi-agences | Vague 8+ |
| Multi-langue EN/WO Y1 | FR only |

### 2.3 Nature du livrable

| Décision | Choix |
| --- | --- |
| Sur-mesure vs progiciel | **Sur-mesure** hub (Next.js) + outils lean (CRM table→outil) |
| CdCF vs CdCT | Ce doc = **fonctionnel** · stack cible indiquée §9 sans figer chaque API |
| Phasage | **Vagues 0–8** (`10`) — CdCF couvre le **socle global** ; Must V0–1 = MVP contractuel |

---

## 3. Utilisateurs & rôles (vue CdCF)

Détail permissions → `14` (à forger). Synthèse :

| Persona | Accès | Besoin principal |
| --- | --- | --- |
| **Visiteur** | Public | Trouver bien · comprendre papier · contacter |
| **Lead / prospect** | Public + WA | Réponse rapide · suivi dossier |
| **Locataire** | `/espace/client` (V3) | Loyer, quittance, panne |
| **Acquéreur étalé** | `/espace/client` (V3+) | Échéancier, solde |
| **Propriétaire / bailleur** | `/espace/proprio` (V3) | Loyers, retards, docs |
| **Vendeur sous mandat** | Soft form + agent | Suivi mise en marché |
| **Diaspora** | `/diaspora` + Secure | Inspection, POA, pas Wave vendeur |
| **Agent (AC)** | `/espace/agent` | Publier, qualifier, closer |
| **OD / manager** | BO + droits élargis | SLA, mandats, commissions |
| **Admin technique** | Config | Users, intégrations |
| **Partenaire** | Pas de compte Y1 | Reçoit intro WhatsApp / email |

---

## 4. Processus métier — AS-IS → TO-BE

### 4.1 AS-IS (typique agence papier / Facebook)

```
Mandat oral / PDF  →  Post FB / Expat  →  WA perso agent  →  Visite
→ Closing notaire  →  (gestion) Excel loyers
```

Failles : leads perdus, pas d’historique société, papiers flous online, zéro outil décision, dépendance agent.

### 4.2 TO-BE (hub)

```
Mandat enregistré BO  →  Publish catalogue (gate papier)  →  SEO / share
→ Lead WA/form (CRM société, SLA)  →  Qualif + visite  →  Deal file
→ Closing (+ diligence V2)  →  PartnerLead si BTP/notaire
→ (V3) Gestion : portails + quittances
```

Réf. process détaillés : `juridique-operations/04` · journeys `02`.

---

## 5. Exigences fonctionnelles

Priorité MoSCoW **globale MVP** = Vague 0–1 Must. Autres = phasées (voir `10`).  
IDs `EF-MOD-nn` → stories `12`.

### 5.1 Module Site public & navigation — `EF-SITE`

| ID | Exigence | MoSCoW | Vague |
| --- | --- | :---: | :---: |
| EF-SITE-01 | Home brand-first : search + parcours (acheter / louer / gérer / diaspora) — **pas** dashboard stats | Must | V0 |
| EF-SITE-02 | Nav métier ≤7 items · `/outils` en nav dès V1 | Must | V0–1 |
| EF-SITE-03 | Pages institutionnelles `/agence/*` + legal (CGU, confidentialité, mentions) | Must | V0 |
| EF-SITE-04 | Hubs `/gerer`, `/diaspora` (landing + CTA) | Must | V0 soft |
| EF-SITE-05 | Guides `/guides` (teaser V0 · piliers V1+) | Must | V0 |
| EF-SITE-06 | Responsive mobile-first · CTA WA accessible | Must | V0 |
| EF-SITE-07 | Fil d’Ariane sur fiches | Should | V0 |

### 5.2 Module Catalogue & fiches — `EF-CAT`

| ID | Exigence | MoSCoW | Vague |
| --- | --- | :---: | :---: |
| EF-CAT-01 | Listes `/acheter`, `/louer` avec filtres (type, zone, prix, **papier**, transaction) | Must | V0 |
| EF-CAT-02 | Fiche bien : galerie, prix FCFA, surfaces, carte, description, CTA WA prérempli | Must | V0 |
| EF-CAT-03 | Champ `paper_type` obligatoire à la publication **vente** ; pastille above-the-fold | Must | V0 |
| EF-CAT-04 | Disclaimer fort si `deliberation` — jamais badge TF | Must | V0 |
| EF-CAT-05 | Publish gate : sans papier / douteux → bloqué (`draft`) | Must | V0 |
| EF-CAT-06 | Statuts : draft / published / reserved / sold / rented / archived | Must | V0 |
| EF-CAT-07 | Transactions : sale, rent, rent_to_own, installment_sale | Must | V0 |
| EF-CAT-08 | Vue map ↔ liste (Leaflet OSM) | Should | V0 |
| EF-CAT-09 | Landings SEO zone (3–5 Z1 min) | Should | V0–1 |
| EF-CAT-10 | Policy boost : pas de mise en avant sans diligence min (terrains &gt; seuil) | Must | V2 |
| EF-CAT-11 | Completeness score / checklist publish agent | Should | V0 |

Schéma champs complet → `05`.

### 5.3 Module CRM & leads — `EF-CRM`

| ID | Exigence | MoSCoW | Vague |
| --- | --- | :---: | :---: |
| EF-CRM-01 | Tout lead loggé **société** (pas livre agent perso) | Must | V0 |
| EF-CRM-02 | Sources taguées (`wa_fiche`, `form_*`, `sim_*`, …) | Must | V0 |
| EF-CRM-03 | Accusé auto &lt; 2 min · humain &lt; 24 h (≥90 %) · chaud &lt; 1 h ouvrées | Must | V0 |
| EF-CRM-04 | Deep link WA prérempli (intent + bien/outil + URL) | Must | V0 |
| EF-CRM-05 | Forms 3–4 champs step 1 · progressive profiling | Must | V0 |
| EF-CRM-06 | Owner assigné (round-robin / zone) | Must | V0 |
| EF-CRM-07 | Intent tôt : achat / vente / loc / gestion / diaspora | Must | V0 |
| EF-CRM-08 | Pipeline stages + notes ; nurture ≠ lost | Must | V0 |
| EF-CRM-09 | Objet **PartnerLead** distinct (intro BTP/archi/notaire…) | Must | V1 |
| EF-CRM-10 | Dédup téléphone/email | Should | V0 |
| EF-CRM-11 | Event `sim_complete` + scénario JSON si contact | Must | V1 |

Détail stages / SLA → `04`.

### 5.4 Module Back-office agent — `EF-BO`

| ID | Exigence | MoSCoW | Vague |
| --- | --- | :---: | :---: |
| EF-BO-01 | Auth agents · accès `/espace/agent` | Must | V0 |
| EF-BO-02 | CRUD annonces avec respect publish gates `05` | Must | V0 |
| EF-BO-03 | Registre mandats (type exclusive/simple, n°, échéance) | Must | V0 |
| EF-BO-04 | Upload docs (photos, PDF mandat) liés mandat/listing | Must | V0 |
| EF-BO-05 | Vue leads assignés + next action | Must | V0 |
| EF-BO-06 | Dashboard matin SLA (overdue) | Should | V0 |
| EF-BO-07 | Dossiers deal (achat/vente/loc/gestion) | Should | V1–2 |
| EF-BO-08 | Checklist diligence go/no-go | Must | V2 |
| EF-BO-09 | Suivi PartnerLead + commission light | Should | V1 |
| EF-BO-10 | Comptabilité trust / e-sign full | Won’t | Y1 |

Détail modules → `09`.

### 5.5 Module Outils & simulateurs — `EF-OUT`

| ID | Exigence | MoSCoW | Vague |
| --- | --- | :---: | :---: |
| EF-OUT-01 | Hub `/outils` index SEO | Must | V1 |
| EF-OUT-02 | Simu mensualité **étalé / loc-vente** (PUB-01) — disclaimer ≠ banque | Must | V1 |
| EF-OUT-03 | Simu coût construction (PUB-02) | Must | V1 |
| EF-OUT-04 | Simu budget total terrain+BTP+frais (PUB-03) | Must | V1 |
| EF-OUT-05 | Résultat **ungated** · CTA in-result (WA + email scénario) | Must | V1 |
| EF-OUT-06 | Embed compact sur fiche **terrain** | Must | V1 |
| EF-OUT-07 | Embed / CTA dans guides MDX | Should | V1 |
| EF-OUT-08 | Calculateur frais acquisition | Must | V2 |
| EF-OUT-09 | Estimation vendeur (lead mandat) | Must | V5 |
| EF-OUT-10 | Simu prêt-à-bâtir · TeleDAC checklist | Must | V6 |
| EF-OUT-11 | Carte prix / Observatoire | Must | V7 + Lab L4 |
| EF-OUT-12 | Afficher « crédit bancaire » comme simu interne | Won’t | — |

Règles lead magnet → `06`.

### 5.6 Module Contenu & SEO — `EF-SEO`

| ID | Exigence | MoSCoW | Vague |
| --- | --- | :---: | :---: |
| EF-SEO-01 | SSR/SSG pages catalogue & fiches · meta FR | Must | V0 |
| EF-SEO-02 | JSON-LD RealEstateListing / Place / FAQ | Must | V0 |
| EF-SEO-03 | Sitemaps segmentés + robots.txt | Must | V0 |
| EF-SEO-04 | OG / share cards WA-FB (crops) | Should | V0 |
| EF-SEO-05 | Perf images `next/image` · budgets LCP | Must | V0 |
| EF-SEO-06 | Chaque pilier blog → CTA outil ou partenaire vague | Must | V1+ |
| EF-SEO-07 | i18n EN | Won’t | Y1 |

→ `08` · marketing SEO CdC séparé si besoin.

### 5.7 Module Portails client / proprio — `EF-POR`

| ID | Exigence | MoSCoW | Vague |
| --- | --- | :---: | :---: |
| EF-POR-01 | Portail proprio : biens, loyers, retards, docs | Must | V3 |
| EF-POR-02 | Portail client locataire : prochain loyer, quittances, panne | Must | V3 |
| EF-POR-03 | Portail acquéreur étalé : échéancier, % payé | Should | V3+ |
| EF-POR-04 | État des lieux digital | Must | V3 |
| EF-POR-05 | Paiement loyer Wave/OM soft | Could | V3+ |

### 5.8 Module Diaspora — `EF-DIA`

| ID | Exigence | MoSCoW | Vague |
| --- | --- | :---: | :---: |
| EF-DIA-01 | Pack pages `/diaspora/*` + CTA Secure | Must | V4 |
| EF-DIA-02 | Lead inspection à distance | Must | V4 |
| EF-DIA-03 | Affichage multi-devise soft (FCFA/EUR/USD) | Must | V4 |
| EF-DIA-04 | Assistance procuration (via notaire) | Should | V4 |
| EF-DIA-05 | Message séquestre · **interdit** « paie Wave au vendeur » | Must | V4 |
| EF-DIA-06 | Tag CRM diaspora + SLA adapté | Should | V4 |

### 5.9 Module Partenaires & add-ons orchestration — `EF-PAR`

| ID | Exigence | MoSCoW | Vague |
| --- | --- | :---: | :---: |
| EF-PAR-01 | CTA partenaire post-simu / fiche avec tracking | Must | V1 |
| EF-PAR-02 | EverGreen **orchestre** — n’exécute pas le métier P | Must | all |
| EF-PAR-03 | Conventions P0 V1 : constructeur, archi, notaire | Must | V1 |
| EF-PAR-04 | Formalités + géomètre | Must | V2 |
| EF-PAR-05 | Assureur / caution | Should | V3 |
| EF-PAR-06 | Inspecteur diaspora | Must | V4 |
| EF-PAR-07 | Financier / courtier crédit | Must | V5 |

### 5.10 Module Admin & droits — `EF-ADM`

| ID | Exigence | MoSCoW | Vague |
| --- | --- | :---: | :---: |
| EF-ADM-01 | Rôles : Visiteur, Client, Proprio, Agent, OD, Admin | Must | V0–3 |
| EF-ADM-02 | Agent ne voit que ses leads (sauf OD) | Must | V0 |
| EF-ADM-03 | Seul OD/Admin archive / force publish exception | Should | V0 |
| EF-ADM-04 | Matrice complète | Must | → `14` |

---

## 6. Règles de gestion (extraits critiques)

| ID | Règle |
| --- | --- |
| RG-01 | **Curated only** — aucun self-publish vendeur |
| RG-02 | **Délibération ≠ TF** — disclaimer + orientation régularisation |
| RG-03 | Prix catalogue en **FCFA** |
| RG-04 | Simu « crédit » = **étalé / loc-vente** — jamais présenté comme prêt banque |
| RG-05 | Lead = record société · historique survit au départ agent |
| RG-06 | Pas de promesse orale seule — stage + note CRM |
| RG-07 | Séparer rôles diaspora (présentateur ≠ vérificateur ≠ fonds) |
| RG-08 | Notaire choisi avec l’acheteur |
| RG-09 | Jamais « paie d’abord, on régularise après » |
| RG-10 | Claims indices publics = gouvernance Lab + GER A |
| RG-11 | Budget vague ≤12 ouvertures · Must ≤60 % effort |
| RG-12 | Lab crawl ne retarde pas Vague 0–1 |

---

## 7. Données & volumétrie

### 7.1 Entités métier (cœur)

| Entité | Description | Doc |
| --- | --- | --- |
| `Listing` | Annonce curated | `05` |
| `Mandate` | Mandat vente/loc/gestion | `09` |
| `Lead` / `PartnerLead` | Contact + source + stage | `04` |
| `Deal` / Dossier | Pipeline closing | `09` |
| `Document` | Vault pièces | `09` |
| `User` / rôles | Auth | `14` |
| `SimScenario` | Inputs/outputs outil | `06` |
| `PropertyEntity` (lab) | Dédup indices — **hors** catalogue agence | lab |

### 7.2 Volumétrie Y1 (ordres de grandeur)

| Objet | Hypothèse Y1 |
| --- | --- |
| Listings live | Dizaines → basses centaines (pas 10k) |
| Leads / mois | Dizaines → bas centaines |
| Agents concurrent | &lt; 20 |
| Médias / listing | 5–20 photos |
| Guides | 2 piliers/mois + satellites |

Implication tech : Leaflet first OK (`07`) — pas besoin stack map haute densité Y1.

### 7.3 Données sensibles

Identité, téléphone, pièces mandat, évent. justificatifs locataires (V3) → conservation, base légale, hébergement : **`19-data-flow-rgpd.md`**. CdCF exige : consentement forms, politique confidentialité, accès restreint vault, pas de fuite docs dans WA perso.

---

## 8. Intégrations (exigences)

| ID | Système | Sens | Vague | Must? |
| --- | --- | --- | :---: | :---: |
| INT-01 | WhatsApp Business | Sortant deep link · inbox société | V0 | Must |
| INT-02 | Email transactionnel | Ack, quittances (V3), digest simu | V0–3 | Must ack |
| INT-03 | Leaflet / OSM | Cartes fiche & liste | V0 | Should |
| INT-04 | Analytics (events) | `wa_click`, `sim_complete`, funnels | V0–1 | Must |
| INT-05 | Stockage fichiers | Photos + PDF | V0 | Must |
| INT-06 | Wave / Orange Money | Loyers / acomptes soft | V3+ | Could |
| INT-07 | WA Cloud API | Inbox partagée scale | post-V0 | Should si volume |
| INT-08 | CRM externe (HubSpot…) | Option si table saturée | later | Could |
| INT-09 | Lab API indices | Observatoire | V7 | Must si L4 |

Détail → `07`. Pas d’intégration MLS US / IDX — hors marché SN.

---

## 9. Exigences non fonctionnelles (ENF)

| ID | Catégorie | Exigence |
| --- | --- | --- |
| ENF-01 | Perf | LCP fiche acceptable mobile 4G SN · images optimisées |
| ENF-02 | Dispo | Objectif best-effort Y1 · HTTPS obligatoire |
| ENF-03 | Sécurité | Auth BO · secrets hors repo · HTTPS · least privilege |
| ENF-04 | Confidentialité | Politique + consentement · vault restreint · → `19` |
| ENF-05 | Accessibilité | Contraste / focus / labels formulaires — niveau pragmatique WCAG A→AA progressif |
| ENF-06 | Navigateurs | 2 dernières versions Chrome, Safari, Firefox, Edge mobile |
| ENF-07 | Langue | Interface **FR** |
| ENF-08 | Devise | Affichage FCFA · multi-devise soft V4 |
| ENF-09 | SEO | Indexable catalogue/guides · pas cloaking |
| ENF-10 | Observabilité | Logs erreurs · tracking events métier |
| ENF-11 | Réversibilité | Export listings / leads CSV (OD) |
| ENF-12 | Offline | **Non requis** Y1 (hors PWA) |

### 9.1 Contraintes techniques **imposées** (justifiées)

Stack verrouillée produit (`tech-stack.md`) — à respecter sauf arbitrage GER écrit :

| Couche | Choix |
| --- | --- |
| App | Next.js App Router + TypeScript |
| UI | Tailwind + shadcn · tokens EverGreen |
| Data | PostgreSQL + Prisma/Drizzle (cible) |
| Maps | Leaflet OSM (défaut Y1) |
| Auth | Auth.js / équivalent quand portails |

Le CdCT détaillera hébergement, backups, CI — hors scope rédactionnel ici.

---

## 10. Priorisation & planning

### 10.1 MVP contractuel = Vague 0 + Vague 1 Must

Voir inventaire `FEAT-V0-*` / `FEAT-V1-*` dans [`10-roadmap-features.md`](./10-roadmap-features.md).

**Done Vague 0 :** site HTTPS · catalogue + fiches papier · WA+CRM · BO CRUD · 2 contenus confiance.  
**Done Vague 1 :** 3 simus + embeds · 3 P live · 2 piliers · message hub autorisé.

### 10.2 Calendrier vagues (rappel)

| Vague | Fenêtre | Parcours |
| --- | --- | --- |
| 0 | S0–6 | Socle catalogue |
| 1 | M1–2 | Acheteur terrain |
| 2 | M3–4 | Sécuriser |
| 3 | M5–6 | Location / gestion |
| 4 | M7–8 | Diaspora |
| 5 | M9–10 | Gros tickets |
| 6 | M11–12 | Chantier / confort |
| 7 | M13–15 | Densifier + Observatoire |
| 8+ | M16+ | Expansion si preuves |

Budget / vague : ≤12 ouvertures. Kickoff = liste figée.

### 10.3 Budget

Enveloppe financière : **hors CdCF** (annexe commerciale / GER). CdCF impose : couper Could avant d’augmenter budget vague.

---

## 11. Critères de recette

### 11.1 Recette MVP (V0–1)

| # | Critère | Preuve |
| ---: | --- | --- |
| R1 | Publier un terrain TF et un bail avec pastilles correctes | Parcours agent → fiche publique |
| R2 | Bloquer publish sans papier | Tentative BO refusée |
| R3 | Disclaimer délibération visible | Capture fiche |
| R4 | Clic WA fiche ouvre chat prérempli | Device réel |
| R5 | Lead form/WA apparaît CRM avec source + owner | Capture CRM |
| R6 | SLA : ack auto + tâche agent créée | Test horodaté |
| R7 | 3 simus : résultat ungated + CTA + disclaimer étalé≠banque | Parcours mobile |
| R8 | Embed simu sur fiche terrain | Fiche live |
| R9 | PartnerLead créé depuis CTA P | Record CRM |
| R10 | Schema.org fiche valide (test riche) | Outil test |
| R11 | Pages légales accessibles | Liens footer |
| R12 | Lighthouse / LCP fiche non catastrophique 4G | Rapport |

### 11.2 Recette par vague suivante

Chaque kickoff vague ajoute une **checklist R-Vn** dérivée des Must `10`. Pas de Go vague N+1 sans rétro KPI N.

### 11.3 Non-régression

| Zone | Garde-fou |
| --- | --- |
| Publish gates papier | Tests auto ou checklist OD |
| Disclaimer délibération | Snapshot UI |
| Copy « crédit » / banque | Review contenu avant merge |

---

## 12. Risques & mitigations (CdCF)

| Risque | Mitigation |
| --- | --- |
| Scope creep add-ons | Budget ouvertures + Won’t list `10` |
| Contenu sans produit | Pilier → CTA vague |
| CRM perso agents | Politique société + BO |
| Lab mange capacité hub | Règle sync lab `07` |
| Confusion étalé / banque | Disclaimer + copy review |
| Partenaire défaillant | Shortlist 2–3 · SLA · clause sortie |
| Promesse hub trop tôt | Message externe post V1 Done |

---

## 13. Glossaire CdCF (mini)

| Terme | Sens |
| --- | --- |
| **Curated** | Agence publie après mandat / contrôle |
| **Étalé** | Vente à mensualités vendeur/agence — pas prêt banque |
| **PartnerLead** | Intro trackée vers partenaire |
| **Vague** | Tranche roadmap hub (0–8+) |
| **GER A** | Niveau claim public indices (lab) |
| **OD** | Opérations / direction agence |
| **CdCT** | Cahier des charges **technique** (comment) |

Glossaire foncier complet → `etude-de-marche/07`.

---

## 14. Documents de référence

| Doc | Rôle vs CdCF |
| --- | --- |
| [`positioning.md`](../../../docs/positioning.md) | Métier & non-négociables |
| [`hub-roadmap.md`](../../../docs/hub-roadmap.md) | Vagues A/P/F/C |
| [`tech-stack.md`](../../../docs/tech-stack.md) | Contraintes tech |
| [`01`–`09`](./README.md) | Spécifications détaillées modules |
| [`10-roadmap-features.md`](./10-roadmap-features.md) | FEAT-IDs ↔ vagues |
| [`12`](./12-user-stories-backlog.md) | Stories depuis EF-* |
| [`14`](./14-matrice-droits-roles.md) | Droits |
| [`19`](./19-data-flow-rgpd.md) | Data / confidentialité |
| Lab [`07`](../research-lab/07-roadmap-lab.md) | Observatoire phasé |

### Sources méthode CdCF (web)

| Source | Apport |
| --- | --- |
| [IT Systèmes — CdC logiciel 2026](https://www.itsystemes.fr/articles/cahier-des-charges-logiciel) | 7 rubriques · CdCF≠CdCT · MoSCoW · recette |
| [Digital Unicorn — modèle app immo](https://digitalunicorn.fr/modele-cahier-des-charges-application-immobiliere-gratuit-a-telecharger/) | Cas d’usage immo · RGPD candidats · intégrations |
| [La Fabrique du Net](https://www.lafabriquedunet.fr/agences/tendances/cahier-des-charges-logiciel) | AS-IS/TO-BE · règles de gestion · données |
| [Sidely — CdC CRM](https://www.go-sidely.com/post/cahier-des-charges-crm) | CRM société · intégrations · hébergement |
| [Asana — BRD/CdCF](https://asana.com/fr/resources/business-requirements-document-template) | Objectifs · priorisation actions |

---

## 15. Validation & versions

| Version | Date | Auteur | Décision |
| --- | --- | --- | --- |
| v1.0 | sept. 2026 | Forge dossier | Baseline CdCF hub |

**Approbation GER :** □ date ____  
**Approbation OD :** □ date ____  

Amendements scope = nouvelle version mineure + MAJ `10` si vague impactée.

---

## 16. Checklist envoi prestataire / eng

- [ ] Périmètre IN/OUT lu et signé  
- [ ] MVP = V0+V1 Must listé  
- [ ] EF-* prioritaires compris  
- [ ] RG-01…12 acceptées  
- [ ] INT-* & ENF-* chiffrables  
- [ ] Grille recette R1–R12 = critères d’acceptation  
- [ ] Hors-scope (open posting, banque, app native) rappelé  
- [ ] Liens `05` `04` `09` `06` fournis comme annexes normatives  

---

*CdCF EverGreen Hub Site v1.0 — sept. 2026. Agence + PropTech · curated · papiers first-class · CRM société · simus étalé ≠ banque · vagues 0–8 · lab parallèle.*
