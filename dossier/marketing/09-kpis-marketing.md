# KPI marketing — CAC, leads WA, sim_complete, ROAS, organic

**Document :** Dossier · Marketing · 09  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`../plan-commercial/04-objectifs-kpi.md`](../plan-commercial/04-objectifs-kpi.md) · [`../plan-commercial/08-growth-scorecard.md`](../plan-commercial/08-growth-scorecard.md) · [`../modele-economique/04-unites-economiques.md`](../modele-economique/04-unites-economiques.md) · [`04-acquisition-paid.md`](./04-acquisition-paid.md) · [`05-seo-sem.md`](./05-seo-sem.md) · [`06-social-whatsapp.md`](./06-social-whatsapp.md) · [`08-launch-plan.md`](./08-launch-plan.md)  
**Aval :** [`13-plan-taggage-analytics.md`](./13-plan-taggage-analytics.md) · scorecard mensuelle · Scale/Hold/Kill

> **Rôle :** couche **marketing** du pilotage.  
> Closings / CA / exclusifs / cash → `04` commercial + scorecard.  
> Ici = **acquisition, attribution, efficacité media & owned**.

---

## 0. Synthèse — 5 familles nord

| Famille | KPI phare | Cible Y1 (ordre) |
| --- | --- | --- |
| **CAC** | LTV:CAC blended | ≥ **3:1** (kill) · ≥ **4:1** (scale) |
| **Leads WA** | Leads WA qualifiés / mois + SLA | Baseline M2 → croissance MoM · SLA ≥ **90 %** |
| **Sim / funnel outils** | `sim_complete` → `partner_lead` | **10–20 %** |
| **ROAS / paid** | Recette attrib. / spend media | ≥ **3:1** hold · ≥ **4–5:1** scale (proxy marge) |
| **Organic** | Sessions + leads `seo` + closings | Closings `seo` **≥ 3–5** / an · 20–60 leads org. M9+ |

**Mix leads fin Y1 :** SOI/farming dominant · SEO croissant · paid **10–20 %** max.

---

## 1. Définitions & formules

### 1.1 CAC (3 niveaux)

| Niveau | Formule | Usage |
| --- | --- | --- |
| **CAC media** | Spend ads (+ boost classifieds) / closings attribués canal | Kill ads |
| **CAC marketing** | Media + coût contenu CT (prorata) / closings | SEO vs paid |
| **CAC full** | Marketing + part fixe AC / closings | Vision entreprise (optionnel Y1) |

**Attribution Y1 :** last non-direct touch **ou** source CRM primaire (`soi`, `seo`, `meta`, `google`, `wa_status`…). Recalibrer après 10 closings.

**Plafonds CAC closing attendus (UE / `04` paid) :**

| Canal | CAC closing typique |
| --- | ---: |
| SOI / farming | Faible / quasi 0 media |
| SEO | Faible media · coût CT amorti |
| Google Search | **0,4–1,5 M** FCFA |
| Meta froid | **0,8–2,5 M** |
| Meta retarget | Meilleur que froid |

### 1.2 LTV & LTV:CAC

```
LTV = marge de contribution segment (pas CA brut)
LTV:CAC = LTV_marge_segment / CAC_canal
```

| Signal | Action |
| --- | --- |
| ≥ **4:1** | Scale OK |
| **3–4:1** | Hold · tester |
| &lt; **3:1** 30 j | **Kill** canal paid |
| Payback transaction | OK si marge closing &gt; CAC à l’encaissement |

*Segments LTV : table UE / scorecard (vente ~1,6 M marge hyp. — recalibrer).*

### 1.3 CPL / CPA

| Métrique | Formule | Note |
| --- | --- | --- |
| **CPL** | Spend / leads | Qualité obligatoire (CPL bas ≠ bon) |
| **CPA closing** | = CAC media | Décision Scale/Kill |
| **CPA mandat** | Spend / mandats signés | Leading indicator |

Bench externes (USD, Promodo/Scale 2026) : CPL RE blend ~$212–473 — **ne pas coller** en FCFA ; utiliser plafonds locaux §1.1 + médiane mobile 4 sem.

### 1.4 ROAS (paid)

```
ROAS_brut = CA_attribué_ads / spend_media
ROAS_marge = marge_attribuée_ads / spend_media   ← décision EverGreen
```

| Seuil | Action |
| --- | --- |
| ROAS marge ≥ **4–5:1** | Scale |
| **3–4:1** | Hold |
| &lt; **3:1** 30 j | Kill |
| Bench lit. | Social 3–5× · Search 4–8× · blend &lt; 3× = optimiser avant scale (1Click / Digital Applied) |

*Y1 lean (200–400 k/mois) : peu de volume → juger sur **30 j** + ≥ 3 closings attr. si possible, sinon CPL + qualité exclusifs.*

### 1.5 Leads WhatsApp

| KPI | Définition |
| --- | --- |
| **Lead WA** | 1ʳᵉ conversation inbound avec intention (vente/loc/achat/simu) |
| **Lead WA qualifié** | Budget/zone/timeline OK **ou** vendeur avec bien Z1 |
| **Source tags** | `wa_status` · `wa_broadcast` · `wa_group` · `meta` (CTWA) · `organic_wa` |
| **SLA** | 1ʳᵉ réponse humaine &lt; **24 h** (cible &lt; 5 h) |

```
Taux qualif WA = leads_qualifiés / leads_WA
Lead → RDV = RDV / leads_qualifiés   (cible 25–40 %)
```

### 1.6 Funnel outils (`sim_*`)

| Event | Signification |
| --- | --- |
| `sim_start` | Ouverture outil |
| `sim_complete` | Parcours terminé (output généré) |
| `partner_lead` | Lead envoyé partenaire / rappel demandé |
| `wa_click` | Clic CTA WhatsApp (site/ads) |
| `estimation_request` | Demande estimation |

```
Completion rate = sim_complete / sim_start
Outil → partner = partner_lead / sim_complete   (cible 10–20 %)
```

### 1.7 Organic

| KPI | Définition |
| --- | --- |
| Sessions organiques | Search non-paid |
| Leads `seo` | CRM source seo |
| CTR guide → outil | Clics outil / sessions page pilier (cible **&gt; 8 %**) |
| Closings `seo` | Closings attribués |

Bench : organic ~42–48 % trafic RE mondial (CUFinder) — cible EverGreen Y1 **croissance**, pas % magique.

---

## 2. Scorecard marketing (template)

### 2.1 Hebdo (lundi — 15 min)

| KPI | Sem. n | Sem. n-1 | Feu |
| --- | ---: | ---: | --- |
| Leads WA (n) | | | |
| Dont qualifiés % | | | |
| SLA WA &lt; 24 h % | | | |
| `wa_click` | | | |
| `estimation_request` | | | |
| `sim_start` / `sim_complete` | | | |
| Status publiés | | | |
| Bugs / file rouge | | | |

*V0 : pas de CAC paid obligatoire.*

### 2.2 Mensuel (GER + CT)

| Bloc | KPI | Cible / seuil |
| --- | --- | --- |
| **Volume** | Leads totaux taggés | 100 % sources |
| | Mix `soi` / `seo` / `wa_*` / `meta` / `google` | Paid ≤ 20 % fin Y1 |
| **WA** | Leads WA · % qualif · SLA | SLA ≥ 90 % |
| **Outils** | sim_complete · partner_lead · taux 10–20 % | Gate V1+ |
| **Paid** | Spend · CPL · CAC · ROAS marge · LTV:CAC | Kill &lt; 3:1 |
| **Organic** | Sessions · leads seo · rankings P0 | MoM ↑ M6+ |
| **Contenu** | Piliers live · Status / sem | Calendrier `03` |
| **Qualité** | % exclusifs leads ads | ≥ 50 % si paid |

### 2.3 Trimestriel

- Recalibrage LTV segments  
- ROMI marketing (marge − coût mktg) / coût mktg — cible ≥ **3:1**  
- Mix canaux · concentration risk (&gt; 60 % un seul canal = alerte)  

---

## 3. Cibles par phase

| Phase | Focus marketing KPI | Ignore / secondaire |
| --- | --- | --- |
| **Soft / V0** | Leads WA · SLA · tags 100 % · ≥1 fiche | ROAS · CAC paid |
| **V1 (simus)** | sim_complete · partner_lead 10–20 % | Scale ads |
| **M3–M6** | CPL · CAC media · exclusifs ads · ROAS | Volume froid massif |
| **M7–M12** | LTV:CAC diaspora · organic closings · mix ≤20 % paid | Vanity impressions |

---

## 4. Seuils alerte

| KPI | Jaune | Rouge → action |
| --- | --- | --- |
| SLA WA | &lt; 85 % | **&lt; 75 %** → **stop all paid** + Broadcast |
| LTV:CAC paid | &lt; 4:1 | **&lt; 3:1** 30 j → Kill |
| ROAS marge | &lt; 4:1 | **&lt; 3:1** → Kill |
| CPL | &gt; 1,5× médiane 4 sem. | &gt; **2×** → pause ad set |
| % exclusifs ads | &lt; 50 % | &lt; 40 % → stop scale |
| sim_complete → partner | &lt; 8 % | &lt; 5 % → UX / rappel partenaire |
| Leads non taggés | &gt; 5 % | &gt; 15 % → freeze reporting |
| Cash | &lt; 10 M | **&lt; 6 M** → Kill ads |

---

## 5. Attribution & events (minimum viable)

### 5.1 Events obligatoires

`wa_click` · `estimation_request` · `sim_start` · `sim_complete` · `partner_lead` · `mandat_signé` · `closing`

*(Aligné `04` commercial + `04` paid.)*

### 5.2 UTM / CRM

| Champ | Exemple |
| --- | --- |
| `utm_source` | meta · google · newsletter · soi |
| `utm_medium` | cpc · organic · status · referral |
| `utm_campaign` | est_vendeur_z1_m3 |
| CRM `source` | miroir last touch |

Détail plan taggage → `13`.

---

## 6. Canaux — KPI spécifiques

| Canal | KPI phares | Cible |
| --- | --- | --- |
| **SOI** | Leads · mandats · coût ~0 | Base volume |
| **WA Status** | Leads `wa_status` · Status/sem | 5–6 / sem |
| **Broadcast** | Opt-out · leads | Opt-out **&lt; 3 %** |
| **SEO** | Sessions · leads · closings | 3–5 closings/an |
| **Meta** | CPL · CAC · ROAS · % exclusifs | Seuils §4 |
| **Google** | CPC 150–300 · CAC Search | Plafonds §1.1 |
| **Partenaires média** | Leads taggés · CPL collab | `07` |

---

## 7. North Star marketing vs vanity

| Garder | Éviter comme nord |
| --- | --- |
| LTV:CAC · closings attr. · SLA · sim→partner | Likes · reach brut · impressions seules |
| Leads **qualifiés** taggés | Leads ads non rappelés |
| ROAS **marge** | ROAS CA sans honoraires nets |

Bench WebImmo / Mapping : **1 North Star + 3–5 soutiens** — ici North Star marketing = **LTV:CAC blended** (dès paid) ; avant paid = **SLA × leads WA qualifiés**.

---

## 8. Cadence & owners

| Cadence | Owner | Livrable |
| --- | --- | --- |
| Quotidien | AC | File WA · tags |
| Hebdo | CT + AC | Tableau §2.1 |
| Mensuel | GER + CT | Scorecard §2.2 · Scale/Hold/Kill |
| Vague | GER | Gate Done commercial |

---

## 9. Hypothèses numériques Y1 (ordres de grandeur)

| Item | Hypothèse |
| --- | --- |
| Budget media M3–M6 | 200 k / mois |
| Budget media M7–M12 | 400 k / mois |
| Mix leads paid | 10–20 % |
| Leads org. M9+ | 20–60 / mois (hyp. SEO `05`) |
| Closings SEO | ≥ 3–5 / an |
| Commission / closing | Selon grille offre (CAC plafonds UE) |

*Recalibrer dès n ≥ 10 closings attribués.*

---

## 10. Anti-patterns

| | |
| --- | --- |
| Optimiser CPL sans qualité / exclusifs | Burn + junk |
| ROAS CA sans marge | Fausse rentabilité |
| Ads si SLA rouge | Amplifie le chaos |
| Vanity social = succès | Ignorer pipeline |
| Attribution multi-touch complexe Y1 | Overkill — last touch + tags |

---

## 11. Lien docs

| Doc | Rôle |
| --- | --- |
| [`04-objectifs-kpi.md`](../plan-commercial/04-objectifs-kpi.md) | Gates vagues · funnel commercial |
| [`08-growth-scorecard.md`](../plan-commercial/08-growth-scorecard.md) | Dashboard CAC/LTV ops |
| [`04-acquisition-paid.md`](./04-acquisition-paid.md) | Budgets · Scale/Kill |
| [`13-plan-taggage-analytics.md`](./13-plan-taggage-analytics.md) | Events / GA / Meta |

---

## 12. Sources

### Internes

Objectifs KPI commercial · growth scorecard · UE · paid · SEO · social WA · launch plan.

### Externes

| Source | Insight |
| --- | --- |
| Promodo / Scale Growth — RE KPIs 2026 | CPL élevé · couple qualité · CAC organic vs paid |
| CUFinder — RE benchmarks | Organic ~48 % trafic · LP CVR ~3,2 % |
| 1Click / Digital Applied — ROAS 2026 | Blend ≥ 3:1 · social 3–5× · Search 4–8× · LTV:CAC 3–5:1 |
| Mapping / WebImmo | Hebdo rythme · mensuel rentabilité · North Star + soutiens |

---

*KPI marketing v1.0 — sept. 2026. Prochain : `10-brand-book.md`.*
