# Prévisionnel 36 mois — Hub immobilier Sénégal

**Document :** Dossier · Modèle économique · 05  
**Statut :** v1.0 — sept. 2026  
**Unité :** FCFA · **Scénario :** **BASE** (central)  
**Périmètre :** CA par axe · charges · résultat · trésorerie · hypothèses  
**Amont :** [`04-unites-economiques.md`](./04-unites-economiques.md) · [`03-business-plan.md`](./03-business-plan.md) · [`01-business-model.md`](./01-business-model.md)  
**Aval :** [`06-compte-de-resultat-previsionnel.md`](./06-compte-de-resultat-previsionnel.md) · [`07-plan-tresorerie.md`](./07-plan-tresorerie.md) · [`10-scenarios.md`](./10-scenarios.md)

---

## 0. Synthèse exécutive

| Indicateur | **Y1** | **Y2** | **Y3** |
| --- | --- | --- | --- |
| CA total | **55,9 M** | **126,6 M** | **193,8 M** |
| dont gestion + étalé | **5 %** | **9 %** | **12 %** |
| EBITDA approx. (avant amort.) | **~0** | **~+24 M** | **~+51 M** |
| Résultat net approx. | **~−5 M** | **~+13 M** | **~+32 M** |
| Cash fin d’année (départ 30 M) | **~11–14 M** | **~32 M** | **~65 M** |
| Closings vente | **14** | **28** | **40** |
| Lots sous gestion (fin d’année) | **20** | **55** | **95** |

**Lecture :** Y1 = **investissement** (site, conformité, rampe) — EBITDA ~0 acceptable si buffer cash. Y2 = **bascule** profitable. Y3 = scale. Cible BP « 35 % récurrent » = **scénario stretch** (`10`), pas le BASE.

> Chiffres = **modèle de travail**, pas comptabilité. Recalibrer après 10 closings (`04` guardrail).

---

## 1. Hypothèses structurantes

### 1.1 Calendrier vagues → revenus

| Mois | Vague | Ce qui s’allume dans le P&L |
| --- | --- | --- |
| M0–M1,5 | **V0** Socle | Catalogue ; 1ʳᵉs mandats ; peu de CA |
| M1,5–M3 | **V1** Terrain | Simus + **apports** BTP/archi/notaire |
| M3–M4,5 | **V2** Sécuriser | Forfaits diligence (inclus dans « autres / formalités ») |
| M5–M6,5 | **V3** Gestion | **Honoraires gestion** + Wave/OM |
| M7–M9 | **V4** Diaspora | Upsell tickets + forfaits assistance |
| M9–M12 | **V5+** | Densification ; estimation vendeur |
| M13–M24 | Scale | Volume + lots |
| M25–M36 | Mature | Mix récurrent cible |

### 1.2 Pricing (aligné `04`)

| Axe | Hyp. base |
| --- | --- |
| Commission vente moyenne **encaissée** | **2,8 M** / closing (mix tickets 25–80 M, taux 5–6 %) |
| Mise en location moyenne | **320 k** (loyer moyen ~320 k) |
| Gestion | **8 %** × loyer moyen **320 k** = **25,6 k** / lot / mois |
| Apport partenaire moyen | **900 k** (mix BTP gros + forfaits) |
| Frais dossier étalé / loc-vente | **40 k** / dossier |

### 1.3 Volumes — scénario BASE

| Driver | Y1 | Y2 | Y3 |
| --- | --- | --- | --- |
| Closings vente | 14 | 28 | 40 |
| Mises en location | 18 | 42 | 65 |
| Lots gestion **fin d’année** | 20 | 55 | 95 |
| Lots gestion **moyenne annuelle*** | 8 | 35 | 72 |
| Commissions apport (nb) | 8 | 22 | 35 |
| Dossiers étalé / loc-vente | 10 | 24 | 36 |

\*Moyenne pour calcul CA gestion = (stock début + stock fin) / 2 approximé par rampe.

### 1.4 Rampe mensuelle Y1 (volumes)

| Mois | Closings | Loc. | Lots gest. fin | Apports | Notes |
| --- | --- | --- | --- | --- | --- |
| M1 | 0 | 0 | 0 | 0 | Build Vague 0 |
| M2 | 1 | 1 | 0 | 0 | 1ʳᵉ vente |
| M3 | 1 | 1 | 0 | 1 | Vague 1 live |
| M4 | 1 | 1 | 0 | 1 | |
| M5 | 1 | 2 | 0 | 1 | |
| M6 | 1 | 2 | 5 | 1 | **Gestion ON** |
| M7 | 1 | 2 | 8 | 1 | |
| M8 | 2 | 2 | 11 | 1 | Diaspora |
| M9 | 1 | 2 | 14 | 1 | |
| M10 | 2 | 2 | 16 | 0 | |
| M11 | 1 | 1 | 18 | 1 | |
| M12 | 2 | 2 | 20 | 0 | |
| **Σ** | **14** | **18** | **20** | **8** | |

### 1.5 Charges — hyp. coûts Dakar

| Poste | Hyp. mensuelle | Source / logique |
| --- | --- | --- |
| Loyer bureau ~35–45 m² (Mermoz / Sacré-Cœur) | **350–450 k** | Loyer m² résidentiel/bureau zone 6–10,5 k ; hyp. **400 k** TTC charges |
| Gérant (rémunération / compte courant) | **700 k** | Fixe pilotage ; pas 100 % commission |
| Agent 1 fixe | **250 k** | + split 40 % sur ses deals (en COGS) |
| Agent 2 (dès M6) | **220 k** | Idem |
| Ops / admin (dès M7) | **280 k** | Gestion + dossiers |
| Contenu / produit (freelance ou mi-temps) | **300 k** Y1 → 400 k Y2 | Site + SEO |
| Tech (hébergement, tools, maps, WA) | **150 k** après go-live | |
| Marketing paid | **200 k** M3–M6 → **400 k** M7–M12 | CPC SN bas ; discipline LTV:CAC |
| RC + garantie + assurance (lissé) | **120 k** | Conformité loi 82-07 |
| Comptabilité / juridique / divers | **200 k** | |
| Charges sociales patronales (sur salaires) | **~20–23 %** brut | IPRES+CSS+IPM+CFCE (plafonds) — **forfait +22 %** sur masse salariale « fixe » |

**IS :** 30 % du bénéfice (sociétés) — appliqué en Y2–Y3 sur résultat positif ; Y1 perte reportable (simplifié ici : pas d’IS Y1).

### 1.6 Capex & financement initial

| Poste M0–M2 | FCFA |
| --- | --- |
| Site Vague 0–1 (build lean) | **8 000 000** |
| Identité / photo / setup | **1 500 000** |
| SARL + carte + garantie + RC (setup) | **2 500 000** |
| Matériel / dépôt loyer | **2 000 000** |
| **Capex + setup** | **14 000 000** |
| **Apport / cash de départ (hypothèse)** | **30 000 000** |
| dont BFR / buffer | **16 000 000** |

Scénarios financement : voir `08` / `10`. Sans les 30 M, Y1 est **non viable** en trésorerie.

### 1.7 COGS variables (% CA)

| Sur | % CA concerné |
| --- | --- |
| Split agents (vente + location) | **40 %** du CA vente+loc |
| Frais mobile money gestion | **1,5 %** du **flux loyers** (≈ 18,75 % des honoraires 8 %) — hyp. **absorbé** → **~19 %** du CA gestion |
| Autres var. (apports : faible) | **5 %** CA apport |

---

## 2. Chiffre d’affaires prévisionnel

### 2.1 CA annuel par axe (BASE)

| Axe | Formule | **Y1** | **Y2** | **Y3** |
| --- | --- | --- | --- | --- |
| **1. Vente** | closings × 2,8 M | 14 × 2,8 = **39,2 M** | 28 × 2,8 = **78,4 M** | 40 × 2,8 = **112,0 M** |
| **2. Mise en location** | n × 0,32 M | 18 × 0,32 = **5,8 M** | 42 × 0,32 = **13,4 M** | 65 × 0,32 = **20,8 M** |
| **3. Gestion** | lots moy. × 25,6 k × 12 | 8 × 0,0256 × 12 = **2,5 M** | 35 × 0,0256 × 12 = **10,8 M** | 72 × 0,0256 × 12 = **22,1 M** |
| **4. Apports partenaires** | n × 0,9 M | 8 × 0,9 = **7,2 M** | 22 × 0,9 = **19,8 M** | 35 × 0,9 = **31,5 M** |
| **5. Étalé / dossiers** | n × 0,04 M | 10 × 0,04 = **0,4 M** | 24 × 0,04 = **1,0 M** | 36 × 0,04 = **1,4 M** |
| **6. Forfaits diaspora / diligence** | forfait | **0,8 M** (montée M7–12) | **3,2 M** | **6,0 M** |
| **CA TOTAL** | | **55,9 M** | **126,6 M** | **193,8 M** |

**Mix gestion + étalé** (récurrent « dur ») :

| | Y1 | Y2 | Y3 |
| --- | --- | --- | --- |
| Gestion + étalé | 2,9 M | 11,8 M | 23,5 M |
| **% du CA** | **5 %** | **9 %** | **12 %** |

→ Pour viser **35 % récurrent** au sens BP, il faut soit (a) **plus de lots**, soit (b) compter une part des **apports récurrents assurance** + **étalé flux** (mensualités) non encore modélisés en flux.  
**Ajustement stratégique Y3 :** hyp. complémentaire **flux étalé / loc-vente** = **+15 M** CA (mensualités / % solde) si 30 dossiers actifs — alors récurrent ≈ (23,5+15)/209 ≈ **18 %** ; avec **120 lots** → gestion ~29 M + flux 15 M ≈ **22 %**.  

**Cible BP 35 %** = ambition **stretch** : documentée en `10` scénario optimiste (120+ lots + flux étalé). **BASE** reste plus prudent (~12–22 % selon flux).

### 2.2 CA Y1 par trimestre

| Trim. | Vente | Loc. | Gest. | Apport | Autres* | **Total** |
| --- | --- | --- | --- | --- | --- | --- |
| **T1** (M1–3) | 5,6 | 0,6 | 0 | 0,9 | 0,2 | **7,3** |
| **T2** (M4–6) | 8,4 | 1,6 | 0,4 | 2,7 | 0,3 | **13,4** |
| **T3** (M7–9) | 11,2 | 1,9 | 0,9 | 2,7 | 0,5 | **17,2** |
| **T4** (M10–12) | 14,0 | 1,6 | 1,2 | 0,9 | 0,3 | **18,0** |
| **Y1** | **39,2** | **5,8** | **2,5** | **7,2** | **1,2** | **55,9** |

\*Étalé + diaspora/diligence.

### 2.3 CA Y2–Y3 par semestre (M)

| Période | Vente | Loc. | Gest. | Apport | Autres | **Total** |
| --- | --- | --- | --- | --- | --- | --- |
| Y2 S1 | 36,4 | 6,1 | 4,2 | 9,0 | 1,8 | **57,5** |
| Y2 S2 | 42,0 | 7,4 | 6,6 | 10,8 | 2,4 | **69,2** |
| **Y2** | **78,4** | **13,4** | **10,8** | **19,8** | **4,2** | **126,6** |
| Y3 S1 | 53,2 | 9,6 | 9,8 | 14,4 | 3,4 | **90,4** |
| Y3 S2 | 58,8 | 11,2 | 12,3 | 17,1 | 4,0 | **103,4** |
| **Y3** | **112,0** | **20,8** | **22,1** | **31,5** | **7,4** | **193,8** |

---

## 3. Charges prévisionnelles

### 3.1 Masse salariale & fixes Y1 (mensuel type)

**M1–M5 (lean)**

| Poste | kFCFA / mois |
| --- | --- |
| Gérant | 700 |
| Agent 1 | 250 |
| Contenu | 300 |
| Loyer | 400 |
| Tech | 150 |
| Marketing | 150→200 |
| RC/garantie lissé | 120 |
| Comptabilité/divers | 200 |
| Charges sociales (~22 % sur 700+250+300) | ~275 |
| **Sous-total opex fixe** | **~2,55–2,7 M** |

**M6–M12 (équipe +)**

| + | kFCFA |
| --- | --- |
| Agent 2 | +220 |
| Ops | +280 (M7+) |
| Marketing | +200 (→400) |
| Charges sociales add. | +110 |
| **Sous-total** | **~3,4–3,6 M / mois** |

**Opex fixe Y1 (approx.)**

| Période | Mois × montant | Total |
| --- | --- | --- |
| M1–M5 | 5 × 2,6 M | 13,0 M |
| M6 | 1 × 3,1 M | 3,1 M |
| M7–M12 | 6 × 3,5 M | 21,0 M |
| **Total opex fixe Y1** | | **~37,1 M** |

### 3.2 COGS variables Y1

| Base | Calcul | Montant |
| --- | --- | --- |
| Split 40 % × (vente+loc) | 0,4 × (39,2+5,8) | **18,0 M** |
| Frais pay gestion | 0,19 × 2,5 | **0,5 M** |
| Var. apports 5 % | 0,05 × 7,2 | **0,4 M** |
| **Total COGS var. Y1** | | **~18,9 M** |

### 3.3 Capex Y1 (cash, pas P&L complet)

| | |
| --- | --- |
| Setup M0–M2 | **14,0 M** |
| Amélioration site Vague 2–3 | **2,0 M** |
| **Capex cash Y1** | **16,0 M** |

*(Amortissement comptable : lisser sur 36 mois en `06` si besoin — ici focus **trésorerie**.)*

### 3.4 Charges Y2–Y3 (ordre de grandeur annuel)

| Poste | Y2 | Y3 |
| --- | --- | --- |
| Masse salariale + charges (équipe ↑) | 42 M | 55 M |
| Loyer / bureau | 5,5 M | 7 M (évent. plus grand) |
| Tech + lab léger | 3 M | 5 M |
| Marketing | 6 M | 9 M |
| RC / juridique / divers | 4 M | 5 M |
| **Opex fixe** | **~60,5 M** | **~81 M** |
| COGS var. (~38 % CA transactionnel) | ~42 M | ~62 M |
| **Charges totales cash approx.** | **~102 M** | **~143 M** |

---

## 4. Compte de résultat simplifié (BASE)

| Poste | **Y1** | **Y2** | **Y3** |
| --- | --- | --- | --- |
| **CA** | 55,9 | 126,6 | 193,8 |
| − COGS variables | −18,9 | −42,0 | −62,0 |
| **Marge contribution** | **37,0** | **84,6** | **131,8** |
| − Opex fixe | −37,1 | −60,5 | −81,0 |
| **EBITDA approx.*** | **−0,1** | **+24,1** | **+50,8** |
| − Amort. capex (lissé 36 mois, ~0,44 M/mois) | −5,3 | −5,3 | −5,3 |
| **EBIT approx.** | **−5,4** | **+18,8** | **+45,5** |
| − IS 30 % (si bénéfice) | 0 | −5,6 | −13,7 |
| **Résultat net approx.** | **−5,4** | **+13,2** | **+31,8** |

\*EBITDA ici = marge − opex fixe (hors amort.). Capex cash traité en trésorerie.

**Point mort Y1 (qualitatif) :** ~2,6–3,5 M opex / mois ÷ ~1,5 M marge / closing → **~2 closings / mois** + gestion naissante — atteint en T4 si rampe respectée.

---

## 5. Plan de trésorerie (vue annuelle + Y1 trimestrielle)

### 5.1 Hypothèses cash

- Encaissement commissions : **M0** (closing) — pas de délai long modélisé.  
- Loyers gestion : encaissement mois M, reversement proprio M+0/M+1 — **seul le % honoraires** reste (pas le flux propriétaire dans le CA).  
- Capex au début.  
- Pas de dette ; pas de distribution dividendes Y1–Y2.  
- **Cash départ : 30 M.**

### 5.2 Bridge trésorerie annuel

| | **Y1** | **Y2** | **Y3** |
| --- | --- | --- | --- |
| Cash ouverture | **30,0** | **11,0** | **32,3** |
| + Encaissements ≈ CA | +55,9 | +126,6 | +193,8 |
| − COGS cash | −18,9 | −42,0 | −62,0 |
| − Opex fixe | −37,1 | −60,5 | −81,0 |
| − Capex | −16,0 | −3,0 | −4,0 |
| − IS payé | 0 | −5,6 | −13,7 |
| **Cash clôture** | **~13,9*** | **~32,3** | **~65,4** |

\*30+55,9−18,9−37,1−16 = **13,9 M**. (Synthèse §0 « 8–12 M » = si capex/marketing un peu plus élevés — **retenir 10–14 M** buffer fin Y1.)

### 5.3 Trésorerie Y1 par trimestre (M)

| | T1 | T2 | T3 | T4 |
| --- | --- | --- | --- | --- |
| Cash début | 30,0 | 12,5 | 9,8 | 11,2 |
| + CA trim. | 7,3 | 13,4 | 17,2 | 18,0 |
| − COGS (~34 % CA) | −2,5 | −4,6 | −5,8 | −6,0 |
| − Opex | −7,8 | −8,5 | −10,5 | −10,5 |
| − Capex | −14,5 | −1,5 | 0 | 0 |
| **Cash fin** | **12,5** | **9,8** | **11,2** | **12,7** |

**Mois critiques :** **M1–M4** (capex + faible CA) — ne pas descendre cash &lt; **6 M** (règle buffer ~2 mois opex).

### 5.4 Alertes trésorerie

| Seuil | Action |
| --- | --- |
| Cash &lt; 8 M | Geler paid ads ; reporter Agent 2 |
| Cash &lt; 6 M | Couper freelance contenu non SEO ; accélérer mandats exclusifs |
| Cash &lt; 4 M | Plan B financement (`08`) |

---

## 6. KPIs de pilotage du prévisionnel

| KPI | Y1 cible | Y2 | Y3 |
| --- | --- | --- | --- |
| Closings / mois (fin période) | ≥ 1,5 | ≥ 2,3 | ≥ 3,3 |
| % CA apport | ≥ 10 % | ≥ 15 % | ≥ 15 % |
| Lots gestion | 20 | 55 | 95 |
| Marge contribution % | ≥ 60 % | ≥ 65 % | ≥ 65 % |
| Cash runway (mois opex) | ≥ 3 | ≥ 4 | ≥ 6 |
| LTV:CAC blended | ≥ 3:1 | ≥ 4:1 | ≥ 4:1 |

---

## 7. Sensibilités (lien `10`)

| Variable | Choc | Effet Y1 approx. |
| --- | --- | --- |
| Closings −30 % (10 au lieu de 14) | CA −11 M | EBITDA **~−11 M** ; cash fin **~3 M** → danger |
| Closings +30 % (18) | CA +11 M | EBITDA **~+11 M** |
| Commission moy. 2,2 M au lieu de 2,8 M | CA −8,4 M | Serré |
| Loyer bureau +50 % | −2 M / an | Mineur |
| Gestion 40 lots fin Y1 | +CA ~+2 M | Buffer + preuve LTV |
| Pas d’apport partenaire | −7,2 M CA | Y1 très tendu |

**Variable #1 :** nombre de **closings exclusifs**.  
**Variable #2 :** **apports BTP**.  
**Variable #3 :** date de démarrage **gestion**.

---

## 8. Écart vs ambitions BP (`03`)

| Ambition BP | Prévisionnel BASE | Commentaire |
| --- | --- | --- |
| ≥ 35 % CA récurrent Y2–Y3 | 9–12 % (hors flux étalé) | Stretch → scénario opt. `10` |
| Point mort Y1 | Quasi EBITDA ~0 avant amort. | OK si 14 closings |
| Buffer 6 mois | Cash fin Y1 ~3–4 mois opex | Apport initial 30 M **minimum** ; idéal **35–40 M** |

---

## 9. Checklist hypothèses à valider sur le terrain

- [ ] Ticket commission moyen réel (vs 2,8 M)  
- [ ] Délai mandat → closing (cash timing)  
- [ ] Split agents réellement payé  
- [ ] Loyer bureau négocié  
- [ ] Taux conversion simu → apport  
- [ ] Churn bailleurs / vacance  
- [ ] Frais Wave/OM pass-through ou absorbés  
- [ ] IS / CGU si EI vs SARL  

---

## 10. Sources

### Internes

- [`04-unites-economiques.md`](./04-unites-economiques.md) — tickets, marges, CAC  
- [`03-business-plan.md`](./03-business-plan.md) — phasage, organisation  
- [`01-business-model.md`](./01-business-model.md) — axes revenus  
- [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) — vagues  

### Externes (web, sept. 2026)

| Source | Usage prévisionnel |
| --- | --- |
| Kolonell — loyers / prix m² Dakar 2026 | Loyer bureau zone Mermoz / Sacré-Cœur |
| WorldSalaries / Votresalaire — agents SN | Fixes agents 150–500 k ; moy. ~280 k |
| Africarrieres / OpenAccountants / CLEISS — cotisations 2026 | Patronales ~19–23 % (+ CFCE) |
| PwC WTS Senegal — IS 30 % | Impôt sociétés |
| Kolonell — Ads SN | Budgets marketing test 150–400 k / mois |

---

## 11. Prochaines briques

| Doc | Contenu |
| --- | --- |
| [`06`](./06-compte-de-resultat-previsionnel.md) | P&L formalisé 3–5 ans (présentation banque) |
| [`07`](./07-plan-tresorerie.md) | Trésorerie **mensuelle** M1–M24 |
| [`08`](./08-besoins-financement.md) | Usages des 30–40 M |
| [`09`](./09-plan-financement-et-point-mort.md) | Seuil de rentabilité formel |
| [`10`](./10-scenarios.md) | Base / opt. / pess. (dont 35 % récurrent) |

---

*Prévisionnel v1.0 BASE — sept. 2026. Ne pas confondre avec comptabilité certifiée.*
