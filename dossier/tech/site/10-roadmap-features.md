# Roadmap features — Mapping ↔ vagues hub

**Document :** Dossier · Tech · Site · 10  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`../../../docs/hub-roadmap.md`](../../../docs/hub-roadmap.md) · [`01`](./01-sitemap-et-ia.md)–[`09`](./09-back-office-agents.md) · [`../research-lab/07-roadmap-lab.md`](../research-lab/07-roadmap-lab.md) · [`../../../docs/positioning.md`](../../../docs/positioning.md)  
**Aval :** [`11-cahier-des-charges-fonctionnel.md`](./11-cahier-des-charges-fonctionnel.md) · [`12-user-stories-backlog.md`](./12-user-stories-backlog.md) · épiques sprint

> **Rôle :** inventaire **features site** (F / A / P / C) classées par **Vague 0–8+**, avec MoSCoW, outcome KPI et refs docs — pour figer le scope à chaque kickoff sans relire tout le catalogue add-ons.

---

## 0. En une phrase

Chaque vague = **un parcours** + **≤12 ouvertures** (Must ≤60 %) ; le reste est **dormant documenté**, pas « bientôt ».

```
Hub Vague N  →  Features Must/Should  →  Pages (01) + CRM (04) + BO (09)
             ↕ sync Lab L* (07) · Blog CTA · KPI Done gate
```

---

## 1. Méthode (forge 2026)

Synthèse priorisation SaaS / PropTech 2026 ([Userpilot](https://userpilot.com/blog/feature-prioritization-matrix/), [Fungies RICE/MoSCoW](https://fungies.io/saas-product-roadmap-prioritization-guide-2026/), [Oril PropTech stages](https://oril.co/blog/real-estate-product-roadmaps-how-to-go-from-mvp-to-data%E2%80%91driven-platform/), ERP « no list » [skpaul](https://skpaul.me/ai-assisted-erp-product-roadmap-case-study/)) adaptée EverGreen :

| Couche | Usage ici |
| --- | --- |
| **Outcome-led** | Chaque vague a 1 parcours + 2–4 KPI — pas une liste features orpheline |
| **MoSCoW** | Must / Should / Could / Won’t **par vague** (Must ≈ 60 % effort) |
| **RICE / ICE** | Seulement *intra*-vague pour départager Should vs Could |
| **Deferred list** | Explicite (V8+ / jamais) — 33+ items catalogue restent hors scope |
| **Data before AI** | Lab L0–L2 avant Observatoire / estimation calibrée (aligné MLS-first US roadmaps) |
| **Vertical slice** | V0–V1 = plus petit vertical qui « fait mal » de couper (catalogue + 3 simus + 3 P) |

### 1.1 Légende types

| Code | Signifie | Owner typique |
| --- | --- | --- |
| **F** | Feature produit cœur (site / CRM / BO) | Eng |
| **A** | Add-on (outil, pack, lead magnet) | Produit + partenaire |
| **P** | Partenaire (CTA / SLA / commission) | Ops commercial |
| **C** | Contenu blog / guide SEO | Contenu |

### 1.2 MoSCoW (règle dure)

| Tag | Si on ne ship pas… |
| --- | --- |
| **Must** | La vague est **annulée** / non Done |
| **Should** | Done possible avec dette — planifier fast-follow ≤2 sem. |
| **Could** | Nice ; couper en mid-vague si retard |
| **Won’t** | Hors vague (dormant ou jamais) — ne pas « glisser » |

**Budget ouvertures / vague :** 8–12 max (A+P+F+C). Kickoff = liste figée écrite.

---

## 2. Matrice condensée — Vague × livrables

| Vague | Fenêtre | Parcours (outcome) | Features cœur Must | KPI Done (seuils indicatifs) |
| --- | --- | --- | --- | --- |
| **0** | S0–6 | Agence existe en ligne | Site catalogue + fiches + WA + BO agent min + SEO base | ≥N mandats live · lead WA · SLA &lt;24 h · % papier renseigné |
| **1** | M1–2 | Voir → payer → construire → pro | 3 simus + `/outils` + embeds + 3 P live | `sim_complete` · leads P · 2 piliers blog |
| **2** | M3–4 | Sécuriser avant payer | Diligence CTA + frais acquisition + géomètre/formalités | Diligences lancées · go/no-go docs |
| **3** | M5–6 | Louer / gérer cash récurrent | Portails L/P + EDL + caution/assurance CTA | Mandats gestion · loyers digitaux |
| **4** | M7–8 | Diaspora sans arnaque | Inspection + multi-devise + POA + escrow soft | Inspections · % séquestre |
| **5** | M9–10 | Gros tickets / accession | Estimation vendeur + épargne + co-acq + financier/crédit | Tickets &gt; seuil · mandats via estimation |
| **6** | M11–12 | Prêt à bâtir / confort | Simu prêt-à-bâtir + TeleDAC + suivi chantier + énergie | Leads énergie · suivis actifs |
| **7** | M13–15 | Densifier hub | Carte prix + staging + déménag. + fiscal | GMV annexes · Observatoire trim. |
| **8+** | M16+ | Expansion sélective | Seulement si KPI 1–7 OK | Gate explicite / candidat |

---

## 3. Inventaire features par vague

IDs `FEAT-Vn-xx` → backlog `12`. Refs pages → `01` · écrans → `03` · CRM → `04` · catalogue → `05` · outils → `06` · integ → `07` · SEO → `08` · BO → `09`.

---

### Vague 0 — Socle hub (S0–6)

**Outcome :** un acheteur / locataire trouve un bien curated, comprend les papiers, contacte en &lt;24 h.

| ID | Type | Feature | MoSCoW | Surface / note | Ref |
| --- | --- | --- | --- | --- | --- |
| FEAT-V0-01 | F | Site Next.js public (home, hubs, legal) | Must | `/` `/agence` CGU | `01` `03` |
| FEAT-V0-02 | F | Catalogue `/acheter` `/louer` + filtres | Must | Facets type, zone, prix, **papier** | `05` |
| FEAT-V0-03 | F | Fiche bien (galerie, prix, carte, CTA WA) | Must | Badges TF/bail/délibération + disclaimer | `05` `07` |
| FEAT-V0-04 | F | Recherche + landings zone SEO min | Should | 3–5 zones Z1 | `01` `08` |
| FEAT-V0-05 | F | Capture lead WA Business + form → CRM | Must | Stages New→… · SLA 24 h | `04` `07` |
| FEAT-V0-06 | F | BO agent `/espace/agent` CRUD mandat | Must | Créer/éditer/publier · docs légers | `09` |
| FEAT-V0-07 | F | Schema RealEstateListing + perf LCP | Must | JSON-LD fiche · images | `08` |
| FEAT-V0-08 | C | Page « Comment on travaille » | Must | Confiance process | hub-roadmap |
| FEAT-V0-09 | C | Guide teaser TF vs bail vs délibération | Must | 1 guide + glossaire | blog |
| FEAT-V0-10 | F | Map Leaflet OSM fiche / liste | Should | Pas clustering avancé | `07` |
| FEAT-V0-11 | F | i18n FR only + OG cards | Should | Share cards | `08` |
| FEAT-V0-12 | A/P | — aucun add-on / partenaire **nouveau** | Won’t | Focus crédibilité | — |

**Lab sync :** **L0** only (catalogue datasets, ICC manuel) — **pas** de crawl scale.  
**Won’t V0 :** portails L/P · simus · observatoire · multi-devise · paiements Wave en prod.

**Done gate V0 :** site live HTTPS · ≥ mandats curated avec papier · WA + CRM opérationnel · BO agent usable · 2 contenus confiance.

---

### Vague 1 — Acheteur terrain (M1–2) ← *différenciant*

**Outcome :** *Je vois un terrain → je sais si je peux payer → je sais combien construire → je parle à un pro.*

| ID | Type | Feature | MoSCoW | Surface / note | Ref |
| --- | --- | --- | --- | --- | --- |
| FEAT-V1-01 | A | Simu mensualité (étalé / loc-vente) | Must | Disclaimer ≠ banque | `06` |
| FEAT-V1-02 | A | Simu coût construction | Must | Barèmes PUB | `06` |
| FEAT-V1-03 | A | Simu budget total (terrain+BTP+frais) | Must | Agrège 01+02 | `06` |
| FEAT-V1-04 | F | Hub `/outils` + SEO | Must | Nav principale | `01` `06` |
| FEAT-V1-05 | F | Embeds simus sur fiche **terrain** | Must | CTA post-résultat → P | `03` `06` |
| FEAT-V1-06 | P | Constructeur BTP (CTA + PartnerLead) | Must | Convention signée | partenaires |
| FEAT-V1-07 | P | Architecte | Must | idem | — |
| FEAT-V1-08 | P | Notaire | Must | idem | — |
| FEAT-V1-09 | F | CRM stages partenaires + attribution | Must | Commission tracking light | `04` `09` |
| FEAT-V1-10 | C | Pilier coût construction + TF vs bail | Must | CTA outils / P | blog M1 |
| FEAT-V1-11 | F | Events analytics `sim_complete` | Should | Funnel simu | `04` |
| FEAT-V1-12 | A | Email digest post-simu | Could | Soft nurture | `07` |

**Lab sync :** L0→**L1 start** seulement si V0 Done (spike post-live).  
**Won’t V1 :** caution · solaire · marketplace · white-label · carte prix · crédit bancaire UI.

**Done gate V1 :** 3 simus live · 3 P live · 2 piliers · message hub externe **autorisé**.

---

### Vague 2 — Sécuriser & formaliser (M3–4)

**Outcome :** avant de payer — papiers, bornage, diligence lisibles.

| ID | Type | Feature | MoSCoW | Surface / note | Ref |
| --- | --- | --- | --- | --- | --- |
| FEAT-V2-01 | A | Due diligence foncière (CTA + checklist) | Must | EDR/NICAD/régime | add-on 08 |
| FEAT-V2-02 | A | Calculateur frais d’acquisition | Must | `/outils/frais-acquisition` | `06` |
| FEAT-V2-03 | A | Bornage / géomètre (lead) | Must | PartnerLead | — |
| FEAT-V2-04 | A | Pack Terrain → Maison (funnel) | Should | Upsell V1 | — |
| FEAT-V2-05 | P | Formalités / papiers légaux | Must | SLA docs | — |
| FEAT-V2-06 | P | Géomètre | Must | — | — |
| FEAT-V2-07 | F | Policy catalogue : boost interdit sans diligence min | Must | Règle métier `05` | `05` |
| FEAT-V2-08 | F | Checklist diligence dans BO dossier | Should | Agent coche go/no-go | `09` |
| FEAT-V2-09 | C | Piliers arnaques / frais notaire / Dscos | Must | CTA diligence | blog |
| FEAT-V2-10 | A | Orientation régularisation bail / Yastal | Could | Option | add-on 43 |

**Lab sync :** **L1** spike (médianes manuelles internes — pas claims publics crawl).  
**Won’t V2 :** Observatoire public · estimation ML.

**Done gate V2 :** diligence + frais live · ≥1 P formalités + géomètre · % go/no-go documentés.

---

### Vague 3 — Location + gestion (M5–6)

**Outcome :** louer / faire gérer sans friction — cash récurrent.

| ID | Type | Feature | MoSCoW | Surface / note | Ref |
| --- | --- | --- | --- | --- | --- |
| FEAT-V3-01 | F | Portail proprio `/espace/proprio` | Must | Loyers · quittances | `01` |
| FEAT-V3-02 | F | Portail locataire `/espace/client` | Must | Voir loyer · docs | `01` |
| FEAT-V3-03 | A | État des lieux digital | Must | Photos + PDF | add-on 12 |
| FEAT-V3-04 | A | Caution locative (lead P) | Should | Fintech ou manuel | 11 |
| FEAT-V3-05 | A | Assurance MRH + PNO CTA | Should | — | 13–14 |
| FEAT-V3-06 | P | Assureur / courtier | Must | — | — |
| FEAT-V3-07 | P | Fintech caution (ou process manuel) | Should | — | — |
| FEAT-V3-08 | F | CRM mandats de gestion | Must | Stages location | `04` |
| FEAT-V3-09 | C | Pilier louer Dakar + gestion proprio | Must | — | blog M5 |
| FEAT-V3-10 | F | Paiement loyer Wave/OM soft | Could | V3+ si PCI/ops OK | `07` |

**Lab sync :** L1 wrap / L2 prep · IX-RENT proto interne.  
**Won’t V3 :** saisonnier · colocation marketplace.

**Done gate V3 :** portails live · ≥ mandats gestion · EDL utilisé · P assureur.

---

### Vague 4 — Diaspora (M7–8)

**Outcome :** acheter / construire depuis l’étranger sans se faire arnaquer.

| ID | Type | Feature | MoSCoW | Surface / note | Ref |
| --- | --- | --- | --- | --- | --- |
| FEAT-V4-01 | F | Hub `/diaspora/*` pack | Must | Landing + parcours | `01` `02` |
| FEAT-V4-02 | A | Inspection à distance | Must | Lead inspecteur | 15 |
| FEAT-V4-03 | A | Multi-devise FCFA/EUR/USD | Must | Soft convert affichage | 16 |
| FEAT-V4-04 | A | Assistance procuration (POA) | Should | Via notaire | 37 |
| FEAT-V4-05 | A | Escrow / séquestre (via notaire) | Should | Message « pas Wave vendeur » | 35 |
| FEAT-V4-06 | P | Inspecteur indépendant | Must | — | — |
| FEAT-V4-07 | P | Notaire renfort diaspora | Should | Déjà V1 | — |
| FEAT-V4-08 | C | Pilier diaspora FR | Must | CTA inspection | blog |
| FEAT-V4-09 | F | CRM tag diaspora + timezone SLA | Should | — | `04` |

**Lab sync :** **L2 early** · API A05 soft **si** indices OK — citation Observatoire conditionnelle.  
**Won’t V4 :** wallet crypto · compte bancaire agence escrow propre.

**Done gate V4 :** pack diaspora · inspection live · multi-devise · NPS diaspora tracké.

---

### Vague 5 — Gros tickets & accession (M9–10)

**Outcome :** investissement lourd / co-acquisition / orientation crédit.

| ID | Type | Feature | MoSCoW | Surface / note | Ref |
| --- | --- | --- | --- | --- | --- |
| FEAT-V5-01 | A | Estimation vendeur (lead mandat) | Must | `/outils/estimation` | 04 |
| FEAT-V5-02 | A | Épargne construction (jauge) | Should | Dashboard light | 24 |
| FEAT-V5-03 | A | Co-acquisition familiale | Should | Funnel + disclaimer | 50 |
| FEAT-V5-04 | P | Financier haut de gamme | Must | — | — |
| FEAT-V5-05 | P | Courtier crédit / banque | Must | Clarif ≠ simu étalé | — |
| FEAT-V5-06 | F | BO scoring tickets &gt; seuil | Should | Radar light | `09` |
| FEAT-V5-07 | C | Pilier budget total + mensualités | Must | — | blog |
| FEAT-V5-08 | F | Lead radar price-drop (lab→CRM) | Could | Si L3 | lab 07 |

**Lab sync :** L2→**L3** · estimation mieux calibrée si n≥.  
**Won’t V5 :** score crédit propriétaire EverGreen · underwriting.

**Done gate V5 :** estimation live · P financier/crédit · tickets mesurés CRM.

---

### Vague 6 — Chantier & confort (M11–12)

**Outcome :** terrain acheté → prêt à bâtir / confort.

| ID | Type | Feature | MoSCoW | Surface / note | Ref |
| --- | --- | --- | --- | --- | --- |
| FEAT-V6-01 | A | Simu terrain nu → prêt à bâtir | Must | `/outils/pret-a-batir` | 10 |
| FEAT-V6-02 | A | Permis / TeleDAC checklist | Must | CTA formalités | 09 |
| FEAT-V6-03 | A | Pack clim + kit solaire (leads) | Should | — | 19–20 |
| FEAT-V6-04 | A | Suivi chantier léger | Should | Jalons + photos | 26 |
| FEAT-V6-05 | P | Clim / solaire | Should | — | — |
| FEAT-V6-06 | P | VRD / forage (si demande) | Could | Ad hoc | — |
| FEAT-V6-07 | C | Pilier autorisation de construire | Must | — | blog M6 |
| FEAT-V6-08 | F | Upsell post-achat terrain dans CRM | Should | Playbook agent | `04` |

**Lab sync :** **L3** · DOM/DROP → CRM · barèmes prêt-à-bâtir.  
**Won’t V6 :** ERP chantier complet · marketplace matériaux.

**Done gate V6 :** outils prêt-à-bâtir + TeleDAC · ≥1 P énergie · suivis actifs.

---

### Vague 7 — Densifier le hub (M13–15)

**Outcome :** plus de services autour du même client — sans nouveau métier.

| ID | Type | Feature | MoSCoW | Surface / note | Ref |
| --- | --- | --- | --- | --- | --- |
| FEAT-V7-01 | A | Comparateur frais | Should | — | 34 |
| FEAT-V7-02 | A/F | Carte prix/m² + `/observatoire` | Must | **Lab L4 + GER A** | 52 · lab |
| FEAT-V7-03 | A | Home staging / photo | Should | Lead P | 33 |
| FEAT-V7-04 | A | Déménagement / remise clés | Could | — | 30, 48 |
| FEAT-V7-05 | A | Reporting fiscal proprio | Should | — | 38 |
| FEAT-V7-06 | P | Photo / staging · fiscal · déménag. | Should | 1–3 P | — |
| FEAT-V7-07 | C | Satellites checklists + maj chiffres | Must | Bundle Observatoire | blog |
| FEAT-V7-08 | F | Observatoire page publique trim. | Must | Méthodo + caveats | lab 03–06 |

**Lab sync :** **L4** — 1 Observatoire public / trim.  
**Won’t V7 :** FB crawl dense (L5) · white-label.

**Done gate V7 :** carte/observatoire live gouvernance OK · GMV services annexes tracké.

---

### Vague 8+ — Expansion sélective (M16+)

**Ouvrir seulement si** KPI V1–V7 OK (voir hub-roadmap §4).

| Candidat | Type | Condition Go | Sinon |
| --- | --- | --- | --- |
| Marketplace matériaux / maintenance | A | Volume chantier + gestion | Approfondir V1–V4 |
| Crédit MFI / épargne bancarisée | A/P | Partenaire bancaire signé | — |
| White-label / réseau agences | F | 2+ villes ou franchises | — |
| Location saisonnière | F/A | Stock meublé + conciergerie | — |
| Promoteur lots co-marketing | P | Programme TF sécurisé | — |
| Avocat / huissier / syndic | P | Ad hoc litige | 7+ ou hors vague |

Chaque candidat = **épique séparée** + kickoff MoSCoW — pas de « panier 8+ ».

---

## 4. Matrice croisée — Feature domaine × Vague d’entrée

Vue « où tombe mon idée ? » pour product/eng :

| Domaine | V0 | V1 | V2 | V3 | V4 | V5 | V6 | V7 | V8+ |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Catalogue / fiches / papiers | ● | ○ | ○ policy | | | | | | |
| CRM / WA / SLA | ● | ○ P | ○ | ○ gestion | ○ dia | ○ | ○ | | |
| BO agents | ● | ○ | ○ diligence | ○ | | ○ | ○ | | |
| SEO / Schema / perf | ● | ○ outils | ○ zones | | ○ dia | | | ○ obs | |
| Simulateurs budget/BTP | | ● | ○ frais | | | ○ estim | ○ PAB | ○ carte | |
| Partenaires BTP/archi/notaire | | ● | ○ form/géo | ○ assur | ○ insp | ○ fin | ○ énergie | ○ staging | |
| Portails L/P + EDL | | | | ● | | | | ○ fiscal | |
| Diaspora pack | | | | | ● | | | | |
| Observatoire / carte prix | | | | | soft | | | ● | |
| Marketplace / WL / MFI | | | | | | | | | ● |

● = entrée Must · ○ = enrichissement

---

## 5. Alignement Lab × Features site

| Vague | Lab | Features site **bloquées** par lab ? | Features **débloquées** par lab |
| --- | --- | --- | --- |
| V0–1 | L0 | **Non** — hub first | — |
| V2–3 | L1 | Non (notes internes) | Barèmes simus mieux sourcés |
| V4–5 | L2–L3 | Non pour pack diaspora | Estimation · radar soft |
| V7 | L4 | **Oui** Observatoire public | Carte prix · claims GER A |
| V8+ | L5? | Selon legal/ROI | Densité nationale |

Règle dure (lab `07`) : **interdit** de retarder simus V1 pour le crawler.

---

## 6. Liste Won’t / dormant (extraits)

Documentés dans specs add-ons — **fermés** jusqu’à vague indiquée :

| Spec / thème | Vague min | Motif |
| --- | --- | --- |
| Matériaux, WL, MFI (27, 28, 40) | 8+ | Expansion |
| Forage, clôture, groupe élec | 6–7 si demande | Confort optionnel |
| Colocation, saisonnier (47, 49) | 8+ | Stock / ops |
| Carte prix avant L2+ | 7 | Data readiness |
| Crédit bancaire = simu étalé | — | **Jamais** — clarif produit |
| Open posting vendeur | — | Positionnement curated |
| Escrow ledger agence | — | Via notaire only |

---

## 7. Gouvernance delivery

| Rituel | Quand | Livrable |
| --- | --- | --- |
| **Kickoff vague** | J0 | Tableau §3 figé (Must/Should/Could) + owner |
| **Mid-vague cut** | Mi | Couper Could — **ne pas ajouter** |
| **Rétro KPI** | Fin | Go N+1 / prolonger / pivot |
| **Revue catalogue** | Trim. | Promouvoir ≤2 dormants |

**Capacité :** si retard → approfondir conversion V0–V4 **avant** ouvrir V5+.

### 7.1 Mapping docs site → vague (rappel)

| Doc site | Couvre surtout |
| --- | --- |
| `01` sitemap | V0–V7 pages |
| `02` journeys | Ancres persona ↔ vague |
| `03` wireframes | **V0–V1** écrans contractuels |
| `04` CRM | V0+ (enrichi chaque vague) |
| `05` catalogue | V0 + policy V2 |
| `06` outils | V1 Must · V2+ Should |
| `07` integ | V0 WA/maps · V3+ paiements |
| `08` SEO | V0 base · V1 outils · V7 obs |
| `09` BO | V0 Must · modules + |

---

## 8. Backlog seed (pour `12`)

Priorité globale **actuelle** (tant que V0–1 non Done) :

1. FEAT-V0-01 → V0-07, V0-08–09  
2. FEAT-V1-01 → V1-10  
3. Tout le reste = **Won’t maintenant**

ICE rapide V0 (Impact×Confidence÷Effort, 1–3) — à recalculer en kickoff :

| Feature | I | C | E | ICE |
| --- | ---: | ---: | ---: | ---: |
| Catalogue + fiche + papier | 3 | 3 | 2 | 4,5 |
| WA → CRM SLA | 3 | 3 | 2 | 4,5 |
| BO agent CRUD | 3 | 2 | 2 | 3,0 |
| 3 simus + embeds (V1) | 3 | 2 | 3 | 2,0 |
| Landings zone SEO | 2 | 2 | 2 | 2,0 |

---

## 9. Sources & benches

| Source | Apport |
| --- | --- |
| [`docs/hub-roadmap.md`](../../../docs/hub-roadmap.md) | Vagues 0–8, F/A/P/C, dormant, gouvernance |
| Site `01`–`09` | Pages, journeys, CRM, catalogue, outils, integ, SEO, BO |
| Lab [`07-roadmap-lab.md`](../research-lab/07-roadmap-lab.md) | Sync L0–L5 |
| Userpilot / Fungies 2026 | Outcome-led · MoSCoW · RICE intra-vague |
| Oril PropTech | Stages MVP→PMF→data-driven · gates |
| skpaul ERP case | Deferred list explicite · vertical slice |

---

## 10. Checklist kickoff (copier-coller)

```
Vague : __
Parcours outcome : __
Must (≤60% effort) : …
Should : …
Could (coupables mid) : …
Won’t cette vague : …
KPI Done : …
Owner : __
Lab sync : L__
Blog CTA liés : …
Partenaires conventions : …
Date mid-cut : __
```

---

## 11. Liens

| Doc | Usage |
| --- | --- |
| [`hub-roadmap.md`](../../../docs/hub-roadmap.md) | Source de vérité vagues |
| [`01-sitemap-et-ia.md`](./01-sitemap-et-ia.md) | Pages ↔ vague |
| [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) | Écrans V0–1 |
| [`06-outils-embarques.md`](./06-outils-embarques.md) | Simus phasage |
| [`09-back-office-agents.md`](./09-back-office-agents.md) | Modules BO |
| [`../research-lab/07-roadmap-lab.md`](../research-lab/07-roadmap-lab.md) | Lab × vague |
| [`11-cahier-des-charges-fonctionnel.md`](./11-cahier-des-charges-fonctionnel.md) | CdCF (à forger) |
| [`12-user-stories-backlog.md`](./12-user-stories-backlog.md) | US depuis FEAT-IDs |

---

*Roadmap features EverGreen Site v1.0 — sept. 2026. Outcome par vague · MoSCoW · ≤12 ouvertures · lab ne bloque pas V0–1 · Observatoire en V7/L4.*
