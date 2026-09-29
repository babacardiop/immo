# Media plan acquisition — Budget, ciblage, structure campagnes

**Document :** Dossier · Marketing · 14  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`04-acquisition-paid.md`](./04-acquisition-paid.md) · [`13-plan-taggage-analytics.md`](./13-plan-taggage-analytics.md) · [`02-personas-messages.md`](./02-personas-messages.md) · [`05-seo-sem.md`](./05-seo-sem.md) · [`09-kpis-marketing.md`](./09-kpis-marketing.md) · [`../plan-commercial/03-canaux-acquisition.md`](../plan-commercial/03-canaux-acquisition.md) · [`../plan-commercial/02-zones-prioritaires.md`](../plan-commercial/02-zones-prioritaires.md)  
**Aval :** Ads Manager · Google Ads · scorecard hebdo · Scale/Hold/Kill

> **Rôle :** media plan **opérationnel** (flights, budgets/jour, ad sets, naming).  
> Principes, créas bank, seuils → `04`. Events/UTM → `13`.

---

## 0. Synthèse media

| | |
| --- | --- |
| **Thèse** | Paid = accélérateur · SOI/SEO d’abord |
| **Enveloppes** | **0** (M1–2) → **200 k** (M3–6) → **400 k** (M7–12) FCFA/mois |
| **Mix leads ads** | **10–20 %** max des leads quali fin Y1 |
| **Plateformes Y1** | Meta (FB/IG) **primaire** · Google Search **secondaire** · LinkedIn ads **off** |
| **Objectif défaut** | Click-to-WhatsApp / Messages |
| **Géo cœur** | Z1 Dakar ouest · diaspora FR/EU dès M7 |

```
M1–M2  Pixel · audiences · 0 spend
M3     Soft GO 200 k — Est + Simu + Retarget + Search micro
M4–M6  Optim · kill sets morts · warm diaspora audiences
M7     + Diaspora 120 k dans enveloppe 400 k
M8–12  Scale si LTV:CAC ≥ 4:1
```

---

## 1. Conditions GO / Kill (rappel)

| GO phase | Conditions |
| --- | --- |
| **M3 (200 k)** | V1 simus live · SLA WA ≥ 90 % · cash ≥ **8 M** · pixel + `wa_click`/`estimation_request` |
| **M7 (400 k)** | V4 soft · LTV:CAC test OK · cash ≥ **10 M** · audiences D1/A4 |
| **Kill all** | Cash &lt; **6 M** · LTV:CAC &lt; **3:1** 30 j · SLA &lt; **75 %** |

Scale : +**20–30 %**/semaine max (pas ×2 overnight — Vikrama / Meta learning).

---

## 2. Budget annuel Y1 (media only)

| Mois | Enveloppe | Cumul |
| --- | ---: | ---: |
| M1–M2 | 0 | 0 |
| M3–M6 | 200 k × 4 | **800 k** |
| M7–M12 | 400 k × 6 | **2,4 M** |
| **Total Y1 media** | | **~3,2 M FCFA** |

*Hors salaires CT · hors 300 k contenu/SEO organique.*

### 2.1 Split M3–M6 (200 000 FCFA/mois)

| # | Campagne | % | FCFA/mois | ≈ FCFA/j |
| --- | ---: | ---: | ---: | ---: |
| C1 | Estimation vendeur (Meta) | 35 | **70 000** | ~2 300 |
| C2 | Simu / terrain (Meta) | 30 | **60 000** | ~2 000 |
| C3 | Retarget (Meta) | 25 | **50 000** | ~1 700 |
| C4 | Google Search | 10 | **20 000** | ~700 |
| | **Total** | 100 | **200 000** | ~6 700 |

*Meta ≥ ~150 k/mois pour learning (Kolonell) — concentré sur 2–3 ad sets froids + retarget.*

### 2.2 Split M7–M12 (400 000 FCFA/mois)

| # | Campagne | % | FCFA/mois | ≈ FCFA/j |
| --- | ---: | ---: | ---: | ---: |
| C1 | Estimation vendeur SN | 20 | **80 000** | ~2 700 |
| C2 | Simu / terrain SN | 15 | **60 000** | ~2 000 |
| C5 | **Diaspora FR/EU** | **30** | **120 000** | ~4 000 |
| C3 | Retarget (tous) | 20 | **80 000** | ~2 700 |
| C4 | Google Search | 15 | **60 000** | ~2 000 |
| | **Total** | 100 | **400 000** | ~13 300 |

### 2.3 Arbitrage Meta vs Google (Propphy / WalledGarden adapté lean)

| Budget total | Priorité |
| --- | --- |
| ≤ 200 k | **Meta-first** (Est + Simu + Retarget) · Google micro brand/geo |
| 400 k | Meta ~75–85 % · Google 15 % intent |
| Si CAC Search &gt; Meta retarget | Transférer → retarget + SEO |

---

## 3. Naming & arborescence

### 3.1 Convention noms

```
[Plateforme]_[Objectif]_[Persona]_[Geo]_[YYYYMM]
Exemple : META_MSG_Marieme_Z1_202603
         META_TRAF_Mamadou_DK_202603
         META_MSG_Fatou_FR_202707
         GOOG_SEARCH_Brand_DK_202603
```

Ads : `crea_a` · `crea_b` · `crea_c` (= `utm_content`).

### 3.2 Structure Meta

```
Business Manager EverGreen
└─ Compte pubs
   ├─ C1_Estimation_Marieme
   │  ├─ AS_Z1_interets_30-65
   │  └─ AS_Z1_lookalike (dès 100+ leads)
   ├─ C2_Simu_Mamadou
   │  ├─ AS_DK_terrain_28-50
   │  └─ AS_exclu_retarget_simu
   ├─ C3_Retarget
   │  ├─ AS_outils_30j
   │  ├─ AS_blog_A1A4D1_30j
   │  └─ AS_video_50_14j
   └─ C5_Diaspora_Fatou (M7+)
      ├─ AS_FR_IDF
      └─ AS_BE (test)
```

**CBO :** OFF Y1 lean (contrôle manuel par campagne) — ou ON **au sein** d’une campagne à 2 ad sets max si learning OK.

**Objectif campagne :** Messages (CTWA) défaut · Traffic vers `/outils` pour simu · Leads Instant Form seulement si qualif + SLA &lt; 60 min.

### 3.3 Structure Google

```
GOOG_SEARCH
├─ Brand (EverGreen + variantes)
├─ Geo_Z1 (agence immobilière Dakar · terrain Mermoz…)
├─ Intent_simu (mensualité · coût construction SN)
└─ Diaspora_Search (M7+ : acheter terrain Sénégal depuis France…)
```

Match : Exact + Phrase P0 · Broad limité.  
Négatifs : emploi, gratuit, TeleDAc magique, hors SN.

---

## 4. Fiches campagnes

### C1 — Estimation vendeur (Marième)

| | |
| --- | --- |
| **Objectif** | Supply mandats Z1 · exclusif |
| **Plateforme** | Meta Messages / CTWA |
| **Geo** | Dakar · fencing Z1–Z2 (Mermoz, Sacré-Cœur, Almadies, Ngor, Point E…) |
| **Âge** | 30–65 · FR |
| **Ciblage** | Intérêts propriété / déménagement / investissement · exclu engagé simu acheteur |
| **Landing** | WA « estimation écrite » (+ page estimation si live) |
| **Budget M3–6** | 70 k · **M7–12** 80 k |
| **KPI** | CPL · % RDV · % exclusifs ≥ 50 % |
| **Créas** | « Un prix, pas cinq annonces » · reporting bi-mensuel · filtre curieux |

**Ad sets max :** 2. **Créas :** 2–3 / set.

---

### C2 — Simu / terrain (Mamadou)

| | |
| --- | --- |
| **Objectif** | `sim_start` → `sim_complete` → WA |
| **Plateforme** | Meta Traffic ou Messages · Google Intent |
| **Geo** | Dakar + couronne selon stock |
| **Âge** | 28–50 |
| **Ciblage** | Terrain · construction · crédit |
| **Landing** | `/outils` · fiche terrain + WA |
| **Budget** | 60 k constant |
| **KPI** | CPC · sim_complete · CPL WA |
| **Créas** | « Tu peux payer ? » · budget total · TF vs délibération |

---

### C3 — Retarget (prioritaire ROI)

| Audience | Fenêtre | Message | Part indicative |
| --- | --- | --- | ---: |
| Visiteurs `/outils` | 30 j | Finis ta simu | 40 % |
| Blog A1/A4/D1 | 30 j | Checklist / Secure | 35 % |
| Vidéo ≥ 50 % | 14 j | CTA WA | 25 % |

| | |
| --- | --- |
| **Exclusions** | Convertis CRM (custom list) si upload OK |
| **Budget** | 50 k → 80 k |
| **Règle** | **Ne jamais couper en premier** |

---

### C4 — Google Search

| Groupe | KW exemples | Landing | Bid note |
| --- | --- | --- | --- |
| Brand | evergreen immo dakar | Home | Bas |
| Geo | agence immobilière Dakar · terrain Mermoz | Catalogue / zone | Medium |
| Simu | coût construction maison Sénégal · mensualité terrain | `/outils` | Medium |
| Diaspora M7+ | acheter terrain Sénégal France · arnaque immo SN | D1 / Secure | Test |

| | |
| --- | --- |
| **Budget** | 20 k → 60 k |
| **CPC cible** | 150–300 FCFA |
| **Extensions** | Callout séquestre · sitelinks outils · call WA si dispo |

---

### C5 — Diaspora Fatou (M7+)

| | |
| --- | --- |
| **Objectif** | Pack Secure · anti-Wave · pas mélangé local |
| **Geo** | FR (IDF + Lyon/Marseille/Lille) · BE test |
| **Âge** | 28–55 · FR |
| **Signaux** | Sénégal / diaspora / immo / engagé D1–A4 |
| **Split** | Ad set FR vs BE |
| **Diffusion** | Soir FR (+ backup matin Dakar) |
| **Budget** | **120 k**/mois |
| **Landing** | Guide D1 · protocole PDF · CTWA |
| **Interdits** | Paie pour bloquer · −50 % sans papier · cousin unique |

Qualif form (si Lead Ads) : budget bande · délai · remote/sur place · usage.

---

## 5. Flighting calendaire

| Fenêtre | Actions media |
| --- | --- |
| **M1–M2** | Pixel · CAPI prep · custom audiences · **0 FCFA** |
| **M3 S1** | Soft ON C1+C2+C3 · C4 brand only |
| **M3 S2–4** | A/B créas · kill si CPL &gt; 2× médiane |
| **M4–M5** | Renfort retarget · Search geo · warm diaspora (0 spend diaspora) |
| **M6** | Revue LTV:CAC · GO/NO-GO 400 k |
| **M7 S1** | ON C5 diaspora 120 k · trim C1/C2 % |
| **M8–M12** | Scale +20–30 % winners · Hold/Kill losers |

**Saisonnalité soft SN :** ramadan / fêtes — réduire froid, garder retarget (décision GER).

---

## 6. Ciblage — matrice persona × canal

| Persona | Meta froid | Retarget | Google | Dès |
| --- | :---: | :---: | :---: | --- |
| Marième | C1 | C3 | Geo seller KW | M3 |
| Mamadou | C2 | C3 outils | Intent simu | M3 |
| Fatou | C5 | C3 blog D | Diaspora Search | M7 |
| Ousmane | ○ Y1 | ○ | ○ | Contenu/organic |
| Aïssatou | ○ | ○ | ○ | Organic loc |

*1 persona / ad set — pas de fourre-tout (`04`).*

---

## 7. Créas & formats (ops)

| Format | Priorité Y1 |
| --- | --- |
| Image + overlay texte mobile | ●●● |
| Carrousel checklist (3–5 cards) | ●● |
| Vidéo ≤ 15–20 s | ●● |
| UGC / photo terrain réelle | ●●● |
| Lead form Instant | ● (si SLA) |

**Rotation :** refresh créa si frequency &gt; ~3–4 / sem. ou CTR ↓ 30 % vs baseline.  
Bank angles → `04` §5.

---

## 8. Tracking media (lien `13`)

Chaque ad :

- [ ] UTM `source` / `medium` / `campaign` / `content`  
- [ ] CRM `meta`|`google` + `campaign_id`  
- [ ] Optim Meta sur `Lead` / `sim_complete` / `wa_click` — pas PageView seul  
- [ ] Exclusion convertis quand liste &gt; 50  

---

## 9. KPI media & rituels

### Hebdo (lundi)

| KPI | Seuil action |
| --- | --- |
| Spend vs plafond | Drift &gt; 15 % → adjust daily |
| CPL / ad set | &gt; 2× médiane 4 sem. → pause |
| Leads taggés | 100 % |
| FRT WA leads ads | &lt; 24 h |
| Frequency | &gt; 4 → refresh créa |

### Mensuel

CAC closing · LTV:CAC · ROAS marge · % exclusifs ads · Scale/Hold/Kill par campagne (`09` / scorecard).

---

## 10. Checklist lancement campagne

- [ ] GO cash + SLA  
- [ ] Landing / WA mobile testé  
- [ ] Pixel + events live  
- [ ] UTM + CRM  
- [ ] Naming conforme  
- [ ] 2–3 créas brand-compliant  
- [ ] Plafond journalier = mensuel / 30  
- [ ] Agents briefés exclusif sur leads paid  
- [ ] Ligne scorecard ouverte  

---

## 11. Anti-patterns media plan

| | |
| --- | --- |
| Awareness large Y1 | Budget trop petit |
| 8 ad sets sur 70 k | Learning mort |
| Diaspora mélangée local | Message / CAC cassés |
| Scale ×2 overnight | Reset learning |
| Couper retarget pour « tester froid » | Pire ROI |
| Google seul &lt; 20 k sans brand | Volume insuffisant |

---

## 12. RACI

| Acte | CT | AC | GER |
| --- | :---: | :---: | :---: |
| Media plan / budgets | **R** | C | **A** |
| Créas / ads | **R** | C | I |
| Réponse leads ads | C | **R** | I |
| Scale/Hold/Kill | R | C | **A** |

---

## 13. Lien docs

| Doc | Rôle |
| --- | --- |
| [`04-acquisition-paid.md`](./04-acquisition-paid.md) | Principes · créas · diaspora detail |
| [`13-plan-taggage-analytics.md`](./13-plan-taggage-analytics.md) | Events · UTM |
| [`05-seo-sem.md`](./05-seo-sem.md) | KW Search |
| [`08-growth-scorecard.md`](../plan-commercial/08-growth-scorecard.md) | Décisions CAC |

---

## 14. Sources

### Internes

Acquisition paid · canaux · zones · KPI · taggage · personas · SEM.

### Externes

| Source | Insight |
| --- | --- |
| Propphy / WalledGarden — Meta vs Google RE | Meta-first si budget lean · Google intent si floor OK |
| Vikrama — Meta RE structure | 1 campagne / objectif · 3–5 ad sets max · scale +20–30 % |
| SocialRealtr — funnel 3 couches | Froid + lead + retarget simultanés |
| Kolonell — Dakar digital | CPC SN · WA close · budgets agence vs lean EverGreen |

---

*Media plan acquisition v1.0 — sept. 2026. Prochain : `15-strategie-seo.md`.*
