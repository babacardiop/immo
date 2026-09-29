# Organigramme — Direction, agents, back-office, content, tech

**Document :** Dossier · Organisation · 01  
**Statut :** v1.0 — sept. 2026  
**Scénario :** **BASE** (aligné [`../modele-economique/05-previsionnel-36-mois.md`](../modele-economique/05-previsionnel-36-mois.md))  
**Aval :** [`02-fiches-de-poste.md`](./02-fiches-de-poste.md) · [`04-plan-recrutement.md`](./04-plan-recrutement.md) · [`07-matrice-raci.md`](./07-matrice-raci.md)

---

## 0. Synthèse

| Horizon | Effectif interne (ETP approx.) | Forme |
| --- | ---: | --- |
| **M1–M5** (lean) | **~3,0–3,5** | Plat : gérant + 1 agent + contenu (freelance/mi-temps) |
| **M6–M12** | **~5,0** | + Agent 2 (M6) + Ops/gestion (M7) |
| **Fin Y2** | **~7–8** | + Gestionnaire dédié + renfort commercial / diligence |
| **Fin Y3** | **~9–11** | Pôles distincts ; tech encore lean / externe |

**Principe :** organigramme d’**agence immobilière classique** (direction → commercial → admin/gestion) + couche **contenu / produit digital** — sans structure PropTech type « squads CPO/CMO » en Y1 (trop lourd pour 30 M d’apport).

**Règle cash (`07`/`10`) :** ne pas recruter Agent 2 / Ops si &lt; 2 closings/mois stables ou solde &lt; 8 M.

---

## 1. Principes de design organisationnel

| Principe | Application EverGreen |
| --- | --- |
| **Plat Y1** | Une seule ligne hiérarchique : tout le monde reporte au **gérant** |
| **Métier d’abord** | Headcount prioritaire = **closings + gestion** (CA) ; tech = make lean / buy |
| **Partenaires ≠ salariés** | Constructeur, archi, notaire, formalités = force de frappe **hors organigramme** (`partenaires.md`) |
| **CRM central** | Les mandats appartiennent à la société — anti-fuite livre agents (`03` BP) |
| **Conformité au sommet** | Carte pro / garantie / RC = responsabilité **direction** (loi 82-07) |
| **Organigramme à date vs cible** | §3 = aujourd’hui / Y1 ; §4 = cible Y2–Y3 |

Réf. structure type agence : gérant → négociateurs → assistant / gestion locative (Observatoire franchise, Co-entreprendre) — adapté hub digital SN.

---

## 2. Vue d’ensemble — 5 pôles

```
                         ┌─────────────────────┐
                         │  DIRECTION          │
                         │  Gérant / Fondateur │
                         │  (+ associés*)      │
                         └──────────┬──────────┘
              ┌─────────────┬───────┴───────┬─────────────┐
              v             v               v             v
        ┌──────────┐  ┌──────────┐   ┌──────────┐  ┌──────────┐
        │ COMMERCIAL│  │BACK-OFFICE│   │ CONTENT  │  │  TECH    │
        │ Agents    │  │ Ops /     │   │ SEO/blog │  │ Produit  │
        │ terrain   │  │ Gestion   │   │ marque   │  │ site     │
        └──────────┘  └──────────┘   └──────────┘  └──────────┘
              │             │               │             │
              └──────┬──────┴───────┬───────┴──────┬──────┘
                     v              v              v
              Partenaires      Expert-comptable   Freelances
              (hors headcount)  / juridique        (build)
```

\*Gouvernance associés → [`03-gouvernance-societe.md`](./03-gouvernance-societe.md).

| Pôle | Mission en une phrase | KPI principal |
| --- | --- | --- |
| **Direction** | Stratégie, licence, cash, gros tickets, partenaires P0 | EBE / runway / exclusifs |
| **Commercial** | Mandats, visites, closings, WhatsApp | Closings / mois · % exclusifs |
| **Back-office** | Dossiers, CRM, gestion locative, apports trackés | Lots gérés · SLA 48 h partenaires |
| **Content** | SEO, blog, templates, preuve sociale | Trafic organique · leads / mandat |
| **Tech** | Site, outils, portail agent, simus | Uptime · vagues Done · mandats en ligne |

---

## 3. Organigrammes à date (Y1 BASE)

### 3.1 Phase A — M1 à M5 (lean / Vague 0–2)

```
                    Gérant / Fondateur
                    (Direction + commercial
                     senior + partenariats)
                           │
         ┌─────────────────┼─────────────────┐
         v                 v                 v
   Agent 1            Contenu /          Tech (externe)
   Commercial         Produit            Dev freelance
   (salarié)          (0,5–1 ETP         + gérant PO
                      freelance)         product owner
```

| Poste | Statut | Effectif | Charge typ. (`05`) |
| --- | --- | ---: | ---: |
| Gérant | Salarié / rémunération | 1 | 700 k/mois |
| Agent 1 | Salarié + split 40 % | 1 | 250 k fixe |
| Contenu / produit | Freelance ou mi-temps | 0,5–1 | 300 k |
| Tech build | Presta Vague 0–1 | 0 (externe) | Capex 8–10 M |

**Opex fixe lean :** ~2,6 M/mois.

**Qui fait quoi en lean (cumuls gérant) :**

| Fonction | Portée par |
| --- | --- |
| Licence / RC / banque | Gérant |
| Gros tickets & diaspora | Gérant |
| Mandats / visites volume | Agent 1 (+ gérant) |
| CRM saisie | Agent 1 + gérant |
| Blog / fiches SEO | Contenu |
| Spec site / recette | Gérant (PO) + presta |
| Comptabilité | Expert-comptable (externe) |

### 3.2 Phase B — M6 à M12 (équipe complète Y1)

```
                         Gérant / Fondateur
                                │
     ┌──────────────┬───────────┼───────────┬──────────────┐
     v              v           v           v              v
 Agent 1        Agent 2     Ops / Admin  Contenu/      Tech
 Commercial     Commercial  Gestion      Produit       (externe
 (senior)       (M6+)       (M7+)        (0,5–1)       + PO gérant)
```

| Poste | Entrée | Effectif | Charge typ. (`05`) |
| --- | --- | ---: | ---: |
| Gérant | M1 | 1 | 700 k |
| Agent 1 | M1 | 1 | 250 k + split |
| Agent 2 | **M6** | 1 | 220 k + split |
| Ops / admin-gestion | **M7** | 1 | 280 k |
| Contenu / produit | M1 | 0,5–1 | 300 k |
| **Total interne Y1 fin** | | **~5** | Opex fixe ~**3,5 M**/mois |

**Répartition commerciale indicative :**

| Agent | Focus |
| --- | --- |
| Agent 1 | Vente exclusifs + terrains (Vague 1) |
| Agent 2 | Location / volume + appui vente |
| Gérant | Tickets &gt; seuil, diaspora, partenariats stratégiques |

**Ops dès M7 (Vague 3 ON) :** quittances, baux, suivi Wave/OM honoraires, CRM, tracking apports partenaires — libère les agents du back-office.

---

## 4. Organigramme cible Y2–Y3

### 4.1 Fin Y2 (~7–8 ETP)

```
                         Gérant / DG
                              │
     ┌────────────────────────┼────────────────────────┐
     v                        v                        v
┌─────────────┐        ┌─────────────┐          ┌─────────────┐
│ COMMERCIAL  │        │ BACK-OFFICE │          │ DIGITAL     │
│ Resp. com.* │        │ Ops lead    │          │ Contenu     │
│ + 2–3 agents│        │ + Gest. loc.│          │ + Tech/PO   │
└─────────────┘        └─────────────┘          └─────────────┘
```

\*Resp. commercial = souvent le gérant encore, ou Agent 1 promu si volume ≥ 3 closings/mois équipe.

| Poste nouveau Y2 | Déclencheur |
| --- | --- |
| Gestionnaire locatif dédié | **≥ 40–50 lots** en gestion |
| 3ᵉ agent / chasseur | Pipeline &gt; capacité 2 agents |
| Diligence / diaspora (0,5) | Vague 4 volume + forfaits |
| Contenu full-time | SEO = canal #1 leads |

Masse salariale Y2 ~**42 M** (`06`) — cohérent ~7–8 personnes chargées.

### 4.2 Fin Y3 (~9–11 ETP)

| Pôle | Composition cible |
| --- | --- |
| Direction | DG + (option) adjoint ops |
| Commercial | 3–4 agents (+ splits) |
| Back-office | 1 ops + 1–2 gestion locative |
| Content | 1 contenu/SEO (+ intermittents photo/vidéo) |
| Tech | 0,5–1 product/tech internalisé **ou** retainer presta ; Lab Observatoire = voie parallèle (`research-lab/`) — **pas** un centre de coût Y0 |

Pas de C-level PropTech (CPO/CMO/CTO) avant preuve scale et levée éventuelle (`11`).

---

## 5. Détail par pôle

### 5.1 Direction

| Rôle | Titre | Reports | Missions clés |
| --- | --- | --- | --- |
| **Gérant / Fondateur** | Directeur d’agence / DG SARL | Associés | Stratégie, carte pro, cash, recrutement, gros closings, signature conventions P0, arbitrage produit |
| Associés (si) | — | AG | Apports, décisions `03` gouvernance |
| Expert-comptable | Externe | Gérant | SYSCOHADA, IS, paie |
| Conseil juridique | Externe | Gérant | Statuts, mandats, litiges |

**N+1 de tous les salariés Y1 :** le gérant (pas de middle management).

### 5.2 Commercial (agents)

| Rôle | Missions | Lien |
| --- | --- | --- |
| **Agent commercial** | Prospection mandats, estimation, exclusivité, visites, négociation, closing, WA &lt; 24 h | Fiches `02` |
| **Agent location** (souvent Agent 2) | Mises en location, états des lieux entrée, passation gestion | Vague 3 |
| Apporteurs externes | Hors organigramme ; commission ponctuelle | COGS |

**Règle perf (`04`) :** &lt; 6 closings / an → plan 90 jours ou sortie.

### 5.3 Back-office (ops / gestion)

| Rôle | Missions | Depuis |
| --- | --- | --- |
| **Ops / admin** | CRM, dossiers diligence, agenda, facturation agence, suivi apports 48 h | M7 |
| **Gestionnaire locatif** | Baux, quittances, relances, vacance, relation bailleur/locataire, Wave/OM | Y1 Ops polyvalent → Y2 dédié |
| Accueil | Souvent absorbé par Ops (pas de réceptionniste Y1) | — |

Réf. métier : chargé de gestion locative (baux, encaissements, relation bailleur) — Option Métier / pratiques agence.

### 5.4 Content

| Rôle | Missions | Mode Y1 |
| --- | --- | --- |
| **Contenu / SEO** | Blog hub, guides, templates, optimisation fiches biens, social léger | Freelance / mi-temps 300 k |
| Photo / vidéo | Reportages biens | Presta à la mission |
| Community | WA status / réseaux | Agents + contenu (pas CM dédié Y1) |

Chaque contenu → CTA outil ou partenaire de la vague (`hub-roadmap`) — pas de « blog orphelin ».

### 5.5 Tech / produit

| Rôle | Missions | Mode |
| --- | --- | --- |
| **Product owner** | Priorisation backlog vagues, recette, KPI produit | **Gérant** Y1–Y2 |
| **Développeur / studio** | Next.js, catalogue, simus, portails | **Freelance / agence** (capex) |
| Admin site / outils | Hébergement, domaines, accès | Contenu + gérant |
| Data / Lab | Observatoire, crawl | Parallèle post Vague 0 — pas dans l’org Y1 |

Droits digitaux (Visiteur / Client / Admin…) → [`../tech/site/`](../tech/site/) `05-matrice-droits-roles.md` — **distinct** de l’organigramme RH.

---

## 6. Hors organigramme (écosystème)

```
[ Équipe salariée / freelance ]     [ Force externe ]
         │                                    │
         │         Conventions écrites        │
         └──────────────► Partenaires P0–P2 ──┘
                          Constructeur, archi,
                          notaire, formalités,
                          BTP, assurance…
```

| Acteur | Relation | Compte dans headcount ? |
| --- | --- | --- |
| 24 partenaires (`partenaires.md`) | Commission apport | Non |
| Expert-comptable | Honoraires | Non |
| Dev / design | Factures / capex | Non (sauf embauche Y3) |
| Agents indépendants ponctuels | Split deal | Non (COGS) |

---

## 7. Tableau d’effectifs & vagues

| Vague | Fenêtre | Org impact |
| --- | --- | --- |
| **V0** Socle | S0–6 | Gérant + Agent 1 + Contenu + presta tech |
| **V1** Terrain | M1–2 | Même équipe ; gérant signe 3 partenaires |
| **V2** Diligence | M3–4 | Contenu + gérant process ; pas de hire |
| **V3** Gestion | M5–6 | **Ops M7** (légèrement après ON gestion) |
| **V4** Diaspora | M7–8 | Gérant + Ops ; Agent 2 déjà là |
| **V5+** | M9–18 | Renforts selon volume (`04` recrutement) |

| Mois | Gérant | Ag.1 | Ag.2 | Ops | Contenu | **Σ ETP** |
| --- | :---: | :---: | :---: | :---: | :---: | ---: |
| M1–M5 | 1 | 1 | — | — | 0,5–1 | **2,5–3** |
| M6 | 1 | 1 | 1 | — | 0,5–1 | **3,5–4** |
| M7–M12 | 1 | 1 | 1 | 1 | 0,5–1 | **4,5–5** |
| Fin Y2 | 1 | 2–3 | | 1–2 | 1 | **~7–8** |
| Fin Y3 | 1 | 3–4 | | 2–3 | 1 | **~9–11** |

---

## 8. Lignes de reporting & rituels

| Qui → qui | Fréquence |
| --- | --- |
| Agents → Gérant | Daily stand-up WA / weekly pipeline |
| Ops → Gérant | Weekly dossiers + lots |
| Contenu → Gérant | Bi-weekly éditorial + SEO |
| Presta tech → Gérant (PO) | Sprint / jalon vague |
| EC → Gérant | Mensuel |

**Réunion commerciale hebdo** (pratique directeur d’agence) : closings, mandats exclusifs, blocages diligence.

---

## 9. Seuils de mutation organisationnelle

| Signal | Mutation |
| --- | --- |
| ≥ 2 closings/mois × 3 mois | OK pour maintenir Agent 2 |
| ≥ 40 lots gestion | Split Ops → **Gestionnaire** dédié |
| Cash &lt; 8 M | Geler hires (`07`) |
| Vague 1 Done + CA tracé 6 mois | Envisager resp. commercial délégué |
| Levée / scale 50 M+ | Revoir org (middle management, tech interne) |

---

## 10. Ce que cet organigramme n’est pas

| Anti-pattern | Pourquoi refusé Y1 |
| --- | --- |
| Organigramme à 4 C-level | Coût &gt; CA |
| Réceptionniste + assistant + CM + CTO | Overstaffing ; absorbé |
| Agents 100 % indépendants sans CRM | Fuite mandats |
| Lab data avec 2 data scientists | Distraction post Vague 0 |
| Syndic copro dédié | Hors scope early |

---

## 11. Sources

### Internes

- [`../modele-economique/03-business-plan.md`](../modele-economique/03-business-plan.md) §7 — structure Y1  
- [`../modele-economique/05-previsionnel-36-mois.md`](../modele-economique/05-previsionnel-36-mois.md) — salaires & timing M6/M7  
- [`../modele-economique/06`](../modele-economique/06-compte-de-resultat-previsionnel.md) — masse salariale Y1–Y5  
- [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) — vagues vs capacité équipe  
- [`../../docs/partenaires.md`](../../docs/partenaires.md) — hors headcount  

### Externes

| Source | Usage |
| --- | --- |
| Co-entreprendre / Observatoire franchise — org agence | Gérant, négociateurs, assistant, gestion locative |
| ESG Immobilier — directeur d’agence | Management commercial + admin |
| Option Métier — chargé gestion locative | Missions baux / loyers / relation |
| PropTech métiers 2026 (Neodigita) / Rocket4RPO | Couche digital sans overbuild Y1 |
| pretarecruter — org à date vs cible | Phasage M1 / Y2 / Y3 |

---

*Organigramme v1.0 — sept. 2026. Fiches de poste détaillées → `02`.*
