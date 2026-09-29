# Plan de recrutement — Timing vs vagues

**Document :** Dossier · Organisation · 04  
**Statut :** v1.0 — sept. 2026  
**Scénario :** **BASE**  
**Amont :** [`01-organigramme.md`](./01-organigramme.md) · [`02-fiches-de-poste.md`](./02-fiches-de-poste.md) · [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) · [`../modele-economique/05`](../modele-economique/05-previsionnel-36-mois.md)  
**Aval :** [`05-plan-recrutement-salaires.md`](./05-plan-recrutement-salaires.md) · [`06-culture-et-sla.md`](./06-culture-et-sla.md)

---

## 0. Synthèse

| Principe | Application |
| --- | --- |
| Embaucher sur **jalons**, pas sur calendrier aveugle | Closings, lots, Vague Done, **runway** |
| Priorité | 1) CA (agents) → 2) goulot ops → 3) contenu → 4) tech interne (tard) |
| Y1 headcount max BASE | **~5 ETP** (gérant + 2 agents + ops + contenu 0,5–1) |
| Gel automatique | Cash **&lt; 8 M** → stop hires (`07`/`10`) |
| Lead time sourcing | Ouvrir le poste **4–6 semaines** avant date d’entrée cible |

```
Vague 0──1──2──3──4──5+
M1        M3   M5  M7  M9
│         │    │   │
Ag.1+CT   (no) Ag.2 Ops  (conditionnel Y2+)
+Gérant        hire hire
```

---

## 1. Méthode

Alignée hiring scale-up / plan embauche runway (Heelio, ICARE, Sparkier) :

1. **Cartographier** besoins 18 mois vs vagues produit.  
2. Lier chaque poste à un **déclencheur** (revenu ou capacité).  
3. Modéliser le coût à la **date d’entrée réelle** + ramp (pas la date « idéale »).  
4. Fixer un **runway plancher** sous lequel aucun poste n’ouvre.  
5. Process court **3–4 étapes** (PME sans DRH).  
6. Revoir le plan **chaque trimestre**.

**Priorité d’embauche (ordre) :**
1. Rôles générateurs de CA (**agents**)  
2. Rôles qui lèvent un goulot (**ops / gestion**)  
3. Remplacement fondateur sur une tâche critique (**contenu** dès M1 car SEO = CAC)  
4. Qualité / support (tech interne, middle management) — **Y2–Y3 seulement**

---

## 2. Matrice Vague × recrutement

| Vague | Fenêtre | Produit / métier ON | **Hire** | **Ne pas embaucher** |
| --- | --- | --- | --- | --- |
| **V0** Socle | S0–M1,5 | Site, catalogue, portail agent | **Gérant** (déjà) · **Agent 1** · **Contenu** (freelance) · presta tech | Ops, Agent 2, GL, CTO |
| **V1** Terrain | M1–M2 | Simus + 3 partenaires P0 | Aucun *nouveau* salarié | Diligence dédié |
| **V2** Diligence | M3–M4 | Checklist foncier, formalités | Aucun — gérant + agents absorbent | Ops trop tôt |
| **V3** Gestion | M5–M6 | Location + gestion ON | Lancer sourcing **Agent 2** (entrée M6) | GL dédié |
| **V4** Diaspora | M7–M8 | Forfaits diaspora | **Ops / diligence** entrée **M7** | 3ᵉ agent |
| **V5+** | M9–M18 | Densification | Uniquement si déclencheurs §4 | Scale PropTech |

---

## 3. Calendrier d’embauche Y1 (BASE)

### 3.1 Timeline détaillée

| Poste | Code | Ouvrir sourcing | Entretiens | **Entrée cible** | Fixe indic. | Condition GO |
| --- | --- | --- | --- | --- | ---: | --- |
| Gérant | DG | — | — | **M0–M1** | 700 k | Constitution SARL |
| Agent commercial 1 | AC1 | M0 | M0–M1 | **M1** | 250 k | Vague 0 live / imminente |
| Contenu / SEO | CT | M0 | M0–M1 | **M1** | 300 k | Calendrier blog V0–V1 |
| Agent commercial 2 | AC2 | **M4–M5** | M5 | **M6** | 220 k | §4.1 |
| Ops / diligence | OD | **M5–M6** | M6 | **M7** | 280 k | §4.2 |
| Gestionnaire locatif | GL | Y2 Q1 | — | **Y2** | 280–350 k | ≥ 40–50 lots |
| Agent 3 | AC3 | Y2 | — | Y2 H2 | ~220–250 k | Pipeline saturé 2 agents |
| Tech interne | TECH | Y3? | — | Optionnel | — | Volume produit + cash |

### 3.2 Gantt simplifié (mois)

```
Poste     M1  M2  M3  M4  M5  M6  M7  M8  M9  M10 M11 M12
Gérant    ████████████████████████████████████████████████
AC1       ████████████████████████████████████████████████
CT        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  (0,5–1)
AC2               ···source···████████████████████████████
OD                    ···source···████████████████████████
Presta tech ███capex V0-1██░░░░ V2-3 ░░░░░░░░░░░░░░░░░░░░
```

`█` = en poste · `▓` = freelance/mi-temps · `·` = sourcing · `░` = presta ponctuelle

### 3.3 Effectif cumulé vs opex

| Mois | ETP | Opex fixe / mois (`05`) |
| --- | ---: | ---: |
| M1–M5 | ~2,5–3 | **~2,6 M** |
| M6 | ~3,5–4 | **~3,1 M** |
| M7–M12 | ~4,5–5 | **~3,5 M** |

---

## 4. Déclencheurs GO / NO-GO

### 4.1 Agent 2 (entrée M6)

| GO si (tous ou quasi) | NO-GO / reporter |
| --- | --- |
| Pipeline **≥ 6 mandats exclusifs** actifs | &lt; 4 exclusifs |
| **≥ 1 closing / mois** moy. sur M3–M5 | 0 closing sur 2 mois |
| Cash projeté M6 **≥ 10 M** | Cash **&lt; 8 M** |
| Agent 1 saturé (visites / WA) | Agent 1 sous-chargé |
| Vague 3 location prête (besoin volume) | Gestion reportée |

**Si NO-GO :** reporter AC2 à M8–M9 ; gérant + AC1 absorbent location.

### 4.2 Ops / diligence (entrée M7)

| GO si | NO-GO / reporter |
| --- | --- |
| Vague 2 process diligence documenté | Diligence encore ad hoc &lt; 2 dossiers/mois |
| Gestion ON (lots **≥ 5** fin M6 plan) | 0 lot gestion |
| Apports partenaires à tracker (≥ 1/mois) | Aucun partenaire live |
| Cash **≥ 8 M** au moment de l’offre | Cash &lt; 8 M |
| Agents passent &gt; 30 % temps en admin | Admin encore gérable |

**Si NO-GO :** reporter OD ; gérant tient CRM + checklists ; pas de scale localisation.

### 4.3 Gel global (tous postes)

| Seuil cash (`07`) | Action recrutement |
| --- | --- |
| **&lt; 12 M** | Review hebdo ; pas d’ouverture de poste non critique |
| **&lt; 8 M** | **Stop** sourcing AC2 / OD ; geler paid ads |
| **&lt; 6 M** | Pas d’offre signée ; mode survie |
| **&lt; 4 M** | Contenu only / partenaires only |

### 4.4 Scénarios (`10`)

| Scénario | Ajustement recrutement |
| --- | --- |
| **PESS** | AC2 et OD **reportés** ; rester lean M1–M5+ |
| **BASE** | Calendrier §3 |
| **OPT** | AC2 dès M5 si +4 closings ; OD M6 ; CT full-time plus tôt |

---

## 5. Lead times & canaux

| Poste | Délai sourcing typ. | Canaux prioritaires |
| --- | --- | --- |
| Agent commercial | **4–6 sem.** | Cooptation, LinkedIn, groupes immo Dakar, annonces Senjob / Emploi SN |
| Ops / diligence | **4–6 sem.** | Cabinets formalités, assistants notaire, ops startup |
| Contenu SEO | **2–4 sem.** | Freelance (portfolio), Upwork local, écoles com |
| Gestionnaire | **6–8 sem.** | Agences concurrentes, BTS PI, cabinets gestion |
| Tech | Presta | Studio / freelance déjà Vague 0 — **pas** CDI Y1 |

**Coût recrutement PME (ordre de grandeur) :** temps gérant + annonces ; éviter cabinet sauf poste rare Y2. Prévoir **+20 %** buffer postes non anticipés (ICARE) — pour nous = 1 remplacement agent max.

---

## 6. Process de recrutement (3–4 étapes)

```
1. Brief + fiche `02` + budget `05`
2. Screen CV / portfolio (CT) ou pipeline commercial (AC)
3. Entretien gérant (métier + culture `06`)
4. Essai terrain / cas (visite simulée · checklist diligence · draft article)
→ Offre écrite (fixe + split / freelance)
```

| Étape | Délai max |
| --- | --- |
| Réponse candidat après entretien | **5 j ouvrés** |
| Process bout en bout | **≤ 4 semaines** une fois shortlist |
| Onboarding | 30 / 60 / 90 j (`02` §7) |

**Grille entretien minimale :**
- AC : 2 deals racontés · éthique papiers · dispo terrain  
- OD : organisation dossier · cas « délibération vs TF »  
- CT : 2 URLs · CTA proposé sur un sujet hub  

---

## 7. Alignement charges vs vagues (pourquoi ce timing)

| Hire | Pourquoi à cette vague | Risque si trop tôt | Risque si trop tard |
| --- | --- | --- | --- |
| **AC1 @ M1** | Besoin mandats dès catalogue V0 | Burn sans leads | Site vide / pas de closings |
| **CT @ M1** | SEO = CAC bas ; piliers V1 | Coût si 0 publish | Dépendance ads |
| **AC2 @ M6** | Volume loc + vente T2 ; V3 | Opex avant CA | Goulot visites / WA |
| **OD @ M7** | Diligence V2 mûre + gestion V3 + apports | Salaire admin inutile | Agents noyés ; SLA partenaires ratés |
| **GL @ Y2** | Portefeuille &gt; capacité OD | Sous-charge | Churn bailleurs / vacance |

**Tech :** reste **externe** tant que vagues = build discontinu ; internaliser seulement si charge continue &gt; 1 ETP presta (Y3+).

---

## 8. Plan Y2–Y3 (indicatif)

| Trimestre | Déclencheur | Poste |
| --- | --- | --- |
| Y2 T1–T2 | Lots **≥ 40–50** | **Gestionnaire locatif** |
| Y2 T2–T3 | ≥ 3 closings/mois équipe × 3 mois | **Agent 3** ou resp. commercial délégué |
| Y2 T3–T4 | Volume diaspora / diligence | Renfort OD 0,5 **ou** specialist diligence |
| Y3 | Contenu = canal #1 | CT **full-time** (400 k `05`) |
| Y3 | Produit permanent | Tech / PO partiel (option) |

Effectif cible : **~7–8** fin Y2 · **~9–11** fin Y3 (`01`).

---

## 9. Tableau de bord recrutement (revue trimestrielle)

| KPI | Cible |
| --- | --- |
| Postes ouverts vs pourvus | 100 % des GO pourvus à date+6 sem. |
| Délai moyen ouverture → entrée | ≤ 6 semaines |
| Rétention 6 mois | ≥ 80 % |
| Closings / agent / an | ≥ 6 (`04` UE / `02`) |
| Hires annulés pour cash | Tracer (signe discipline) |
| Écart masse salariale vs `05` | Expliquer dates d’entrée |

---

## 10. Checklist avant chaque offre

- [ ] Fiche de poste `02` à jour  
- [ ] Budget fixe + charges dans runway (`05` / `07`)  
- [ ] Déclencheurs GO cochés (§4)  
- [ ] Cash ≥ seuil  
- [ ] Vague associée **Done ou ON**  
- [ ] N+1 = gérant clair  
- [ ] Contrat (CDI/CDD/freelance) + clause CRM / non-sollicitation  

---

## 11. Synthèse « une page »

| Quand | Qui | Si |
| --- | --- | --- |
| **M1** | Gérant + AC1 + CT | Vague 0 |
| **M6** | + AC2 | Pipeline + cash OK |
| **M7** | + OD | Gestion + diligence + cash OK |
| **Y2** | + GL (± AC3) | Lots / volume |
| **Toujours** | Stop si cash &lt; 8 M | Survie |

---

## 12. Sources

### Internes

- [`01-organigramme.md`](./01-organigramme.md) §7–9 — effectifs & seuils  
- [`02-fiches-de-poste.md`](./02-fiches-de-poste.md) — profils & onboarding  
- [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) — V0→V5+  
- [`../modele-economique/05-previsionnel-36-mois.md`](../modele-economique/05-previsionnel-36-mois.md) — M6/M7, salaires  
- [`../modele-economique/07`](../modele-economique/07-plan-tresorerie.md) · [`10`](../modele-economique/10-scenarios.md) — gel cash / PESS  

### Externes

| Source | Usage |
| --- | --- |
| Hiring Scale-Up Playbook — jalons revenu | Embaucher sur milestones |
| Heelio — plan embauche & runway | Coût à date d’entrée + runway plancher |
| ICARE — plan recrutement annuel PME | Lead times, +20 % buffer, KPI trimestre |
| Sparkier — stratégie recrutement PME | Process 3–4 étapes, canaux |

---

*Plan de recrutement v1.0 — sept. 2026. Grille salariale détaillée → `05`.*
