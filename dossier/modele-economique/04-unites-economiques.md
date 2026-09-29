# Unit economics — Hub immobilier Sénégal

**Document :** Dossier · Modèle économique · 04  
**Statut :** v1.0 — sept. 2026  
**Unité monétaire :** FCFA  
**Nature :** économie unitaire (commission, marge / mandat, LTV, CAC, payback) — **hypothèses de travail** à recalibrer dès les 10 premiers closings  
**Amont :** [`01-business-model.md`](./01-business-model.md) · [`03-business-plan.md`](./03-business-plan.md)  
**Aval :** [`05-previsionnel-36-mois.md`](./05-previsionnel-36-mois.md)

---

## Synthèse

| Métrique | Cible hub (directionnelle) | Benchmark externe |
| --- | --- | --- |
| **Marge contribution / vente exclusive** | **45–55 %** de la commission brute | Split agent US/EU souvent 30–50 % |
| **LTV bailleur (gestion)** | **~1,5–3 M** / unité sur 3–5 ans | Honoraires 6–9 % traditionnel (FR) |
| **LTV diaspora (parcours)** | **3–8 M+** (vente + gestion + apport) | — |
| **LTV:CAC (blended)** | **≥ 4:1** | Brokerages US cible **4:1+** (2026) |
| **Payback CAC payant** | **&lt; 3 mois** (transaction) · **&lt; 6–9 mois** (gestion seule) | SaaS ~12 mois ; services ~plus court |
| **CAC organique (SEO/réseau)** | **50–300k** / mandat ou closing | Referral US ~200–500 $ |
| **CAC payant (Meta/Google)** | **0,4–2,5 M** / closing selon canal | US close souvent 900–3 000 $ |

**Règle d’or :** un closing vendeur exclusif moyen (~50 M @ 6 %) **finance** plusieurs mois de CAC organique ; la **gestion** transforme un CAC bailleur en rente. Ne pas scaler le paid tant que LTV:CAC &lt; 3:1.

---

## 1. Définitions & unités d’analyse

| Terme | Définition hub |
| --- | --- |
| **Unité vente** | 1 mandat qui **close** (acte / compromis encaissé) |
| **Unité location** | 1 mise en location réussie (bail signé) |
| **Unité gestion** | 1 lot sous mandat de gestion (mois × durée) |
| **Unité apport** | 1 commission partenaire encaissée (déclencheur convention) |
| **Client LTV** | Somme des **marges de contribution** sur la durée de relation (pas le CA brut) |
| **CAC** | Coût d’acquisition **alloué** pour obtenir 1 mandat signé **ou** 1 closing (préciser laquelle) |
| **Marge contribution** | CA − coûts variables directs (part agent, ads alloués, frais pay, apporteur externe) |
| **Gross margin %** | Marge contribution / CA unitaire |

**Convention LTV :** on utilise la **marge**, pas le CA — sinon LTV:CAC est artificiellement gonflé (benchmark LTV Skok / services 2026).

---

## 2. Hypothèses de pricing (réf. marché SN)

| Prestation | Hypothèse base | Fourchette |
| --- | --- | --- |
| Commission vente **exclusive** | **6 %** | 5–7 % (premium jusqu’à 8 %) |
| Commission vente **simple** | **4,5 %** | 3–5 % |
| Mise en location | **1 mois** de loyer | Décret : part locataire plafonnée si loyer ≤ 500k |
| Gestion | **8 %** des loyers **encaissés** | Entrée 7 % ; diaspora +1–2 pts |
| Split agent commercial | **40 %** de la commission agence | 20–50 % selon rôle |
| Apport BTP | **3 %** du contrat travaux | 2–5 % |
| Apport archi | **200k** forfait (alt. 15 % honoraires) | 150–500k |
| Apport notaire | **100k** forfait | 50–200k |
| Wave / OM (si absorbé) | **1,5 %** du flux loyer | Wave ~1 % ; OM 1,5–2,5 % |

Sources internes : `01` · mix `05` · `partenaires.md`. Sources web : pratiques agences SN ; Kolonell (exclusif 5–7 %).

---

## 3. Funnel & taux de conversion (hypothèses SN)

Benchmarks US 2025–26 (portails 0,4–1,2 % lead→close ; SEO 8–15 % ; referral 14–30 %) — **trop optimistes / contextuels** pour Dakar. On forge un funnel **conservateur** hub :

### 3.1 Côté demande (acquéreur / locataire)

| Étape | Taux hyp. | Notes |
| --- | --- | --- |
| Visite site → lead WA / form | **2–4 %** | Simus / fiche bien |
| Lead → RDV / visite bien | **25–40 %** | SLA &lt; 24 h critique (US : ×2 si &lt;5 min) |
| Visite → offre / dossier | **20–35 %** | |
| Offre → closing | **40–60 %** | Diligence = filtre |
| **Lead → closing (blended)** | **~1,5–4 %** | Entre portal US et SEO |

### 3.2 Côté offre (vendeur / bailleur) — levier #1

Insight Kolonell : le site convainc d’abord le **vendeur**. Hyp. hub :

| Étape | Taux hyp. | Notes |
| --- | --- | --- |
| Lead estimation / contact vendeur → RDV | **30–50 %** | |
| RDV → mandat signé | **25–40 %** | Case citée ~35 % estimation→mandat |
| Mandat → closing (12 mois) | **50–70 %** si **exclusif** | Plus bas si simple (fuite) |
| Dont part **exclusifs** cible | **≥ 60 %** | Pricing 5–7 % |

### 3.3 Simulateurs (Vague 1)

| Étape | Taux hyp. |
| --- | --- |
| Start simu → complete | **40–60 %** |
| Complete → lead partenaire / WA | **10–20 %** |
| Lead partenaire → commission apport | **15–30 %** (SLA 48 h) |

---

## 4. Économie unitaire — VENTE

### 4.1 Ticket de référence

| Scénario | Prix bien | Commission | CA brut |
| --- | --- | --- | --- |
| **A — Médian Dakar** | 50 000 000 | 6 % exclusif | **3 000 000** |
| **B — Terrain accession** | 25 000 000 | 5 % | **1 250 000** |
| **C — Standing** | 120 000 000 | 4 % dégressif | **4 800 000** |
| **D — Simple (non exclusif)** | 50 000 000 | 4,5 % | **2 250 000** |

### 4.2 Waterfall marge — scénario A (base)

| Poste | FCFA | % CA |
| --- | --- | --- |
| Commission brute | 3 000 000 | 100 % |
| − Split agent 40 % | −1 200 000 | −40 % |
| − Ads / CAC alloué (hyp. moyenne) | −300 000 | −10 % |
| − Frais dossier / notaire intro (si absorbé) | −50 000 | −2 % |
| **Marge contribution** | **1 450 000** | **~48 %** |
| Sans ads (CAC organique) | **1 750 000** | **~58 %** |

### 4.3 Sensibilité prix × taux

| Prix \ Taux | 5 % | 6 % | 7 % |
| --- | --- | --- | --- |
| 30 M | 1,5 M | 1,8 M | 2,1 M | ← CA brut |
| 50 M | 2,5 M | 3,0 M | 3,5 M |
| 80 M | 4,0 M | 4,8 M | 5,6 M |

Marge ~50 % après agent 40 % → contribution ≈ **0,5 × CA**.

### 4.4 Coût d’un mandat « perdu » (simple)

Mandat simple qui part chez un concurrent = **0 FCFA** + coût d’acquisition déjà dépensé.  
À 300k CAC + 20 h agent : **destruction de valeur**. D’où cible **≥ 60 % exclusifs**.

---

## 5. Économie unitaire — LOCATION (mise en loc)

| Loyer mensuel | Honoraires (1 mois) | Split agent 30 % | Marge contrib. |
| --- | --- | --- | --- |
| 150 000 | 150 000 | −45 000 | **~105 000** |
| 300 000 | 300 000 | −90 000 | **~210 000** |
| 600 000 | 600 000 | −180 000 | **~420 000** |
| 1 000 000 | 1 000 000 | −300 000 | **~700 000** |

**Upsell critique :** chaque mise en location doit pousser un **mandat de gestion** — sinon LTV ≈ one-shot faible.

---

## 6. Économie unitaire — GESTION (ancre LTV)

### 6.1 Cash mensuel / lot

| Loyer | Honoraires 8 % | − Pay 1,5 % (si absorbé) | Net avant agent |
| --- | --- | --- | --- |
| 200 000 | 16 000 | −3 000 | **13 000** |
| 300 000 | 24 000 | −4 500 | **19 500** |
| 500 000 | 40 000 | −7 500 | **32 500** |
| 800 000 | 64 000 | −12 000 | **52 000** |

**Politique recommandée :** frais Wave/OM en **pass-through** bailleur ou inclus dans 8–9 % — sinon marge s’érode sur petits loyers.

### 6.2 LTV / unité (durée de mandat)

Hyp. **churn annuel bailleur 20 %** → durée moyenne ≈ **1 / 0,20 = 5 ans** (ordre de grandeur ; à mesurer).  
Vacance locative cible **&lt; 8 %** du temps (bench FR portefeuille : alerte &gt; 10 %).

| Loyer | CA gestion / an (8 %) | Marge ~70 %* / an | LTV 3 ans | LTV 5 ans |
| --- | --- | --- | --- | --- |
| 200k | 192 000 | 134 000 | **0,40 M** | **0,67 M** |
| 300k | 288 000 | 202 000 | **0,61 M** | **1,01 M** |
| 500k | 480 000 | 336 000 | **1,01 M** | **1,68 M** |
| 800k | 768 000 | 538 000 | **1,61 M** | **2,69 M** |

\*70 % = après pay + portion ops allouée (hors loyer bureau) ; **hors** CAC.  
+ **mise en location** à l’entrée (~1 mois) une fois / cycle locataire (~tous les 2–3 ans).

### 6.3 Portefeuille mini pour « payer un demi-salaire »

Hyp. besoin contribution gestion **1,5 M FCFA / mois** (ops partiel) :

| Loyer moyen | Honoraires nets ~20k / mois / lot | Lots nécessaires |
| --- | --- | --- |
| ~300k | ~20k | **~75 lots** |

→ La gestion **seul** ne remplace pas la vente en Y1 ; elle **lisse** et monte en Y2–Y3.  
**10 lots** @ 300k = **~240k CA / mois** (~2,9 M / an) — ancre psychologique, pas encore le P&L entier.

### 6.4 Valorisation implicite (bench FR cession)

Cabinets gestion FR : multiple **200–380 %** du CA récurrent.  
Portefeuille 50 lots × 288k CA/an = **14,4 M CA** → valeur indicative **29–55 M** si qualité (vacance basse, honoraires à jour).  
**Signal stratégique :** chaque lot gagné = actif, pas seulement du cash-flow.

---

## 7. Économie unitaire — APPORT PARTENAIRE

| Cas | Base | Taux / forfait | CA hub | Coût var. | Marge |
| --- | --- | --- | --- | --- | --- |
| BTP maison | Contrat 45 M | 3 % | **1 350 000** | ~10 % suivi | **~1,2 M** |
| BTP villa | 80 M | 3 % | **2 400 000** | idem | **~2,1 M** |
| Archi | — | Forfait | **200 000** | faible | **~180k** |
| Notaire | — | Forfait | **100 000** | faible | **~90k** |
| Géomètre | Devis 800k | 12 % | **96 000** | faible | **~85k** |

**Coût d’acquisition du lead apport** souvent **déjà payé** par le funnel terrain (simu) → marge apport ≈ **quasi pure** si Vague 1 bien branchée.

---

## 8. LTV par persona (forgée)

### 8.1 Marième — vendeuse (one-shot)

| Poste | FCFA |
| --- | --- |
| Bien 50 M @ 6 % | 3 000 000 CA |
| Marge contrib. (~48 %) | **~1,45 M** |
| Prob. referral 2ᵉ mandat (20 %) × 0,8 M | +160k espéré |
| **LTV** | **~1,6 M** |

### 8.2 Mamadou — primo terrain → construire (double filet)

| Poste | CA | Marge ~ |
| --- | --- | --- |
| Terrain 25 M @ 5 % | 1 250 000 | 650k |
| Frais dossier étalé | 40 000 | 35k |
| Archi forfait | 200 000 | 180k |
| BTP 45 M @ 3 % | 1 350 000 | 1 200k |
| **Total** | **~2,84 M** | **~2,07 M LTV** |

CAC Mamadou (SEO + simu, organique) hyp. **150–400k** → **LTV:CAC ≈ 5–14:1**.

### 8.3 Fatou — diaspora (haute LTV)

| Poste | Hypothèse | Marge ~ |
| --- | --- | --- |
| Achat 60 M @ 6 % | Closing | ~1,7 M |
| Forfait assistance diaspora | 500k | ~400k |
| Apport notaire / formalités | 150k | ~130k |
| Gestion locative 400k loyer × 8 % × 4 ans | 1,54 M CA | ~1,1 M |
| 2ᵉ bien (30 % des Fatou) | espérance | +0,5 M |
| **LTV typique** | | **~3,5–5 M** |
| **LTV haute (multi-biens)** | | **6–10 M+** |

CAC diaspora (contenu SEO + léger ads FR) hyp. **200–800k** → cible **LTV:CAC ≥ 5:1**.

### 8.4 Ousmane — bailleur (3 lots)

| Poste | Calcul | Marge 5 ans |
| --- | --- | --- |
| 3 × loyer 350k @ 8 % | 1,01 M CA / an | |
| Marge 70 % × 5 ans | | **~3,5 M** |
| + 3 mises en loc (cycles) | ~3 × 350k × 0,7 | +~0,7 M |
| **LTV** | | **~4 M** |

CAC bailleur (réseau + estimation) hyp. **100–400k** → **LTV:CAC ≈ 10:1+**.

### 8.5 Aïssatou — locataire

LTV unitaire **faible** (~marge sur 1 mois d’honoraires si elle paie une part).  
Valeur = **volume** + **upsell** (bon payeur → terrain / étalé) — tracker en CRM, ne pas optimiser CAC locataire isolément.

---

## 9. CAC par canal (adapté Sénégal)

### 9.1 Coûts media locaux (web 2026)

| Canal | Indicateur | Fourchette SN |
| --- | --- | --- |
| Google Search immo | CPC | **150–300 FCFA** (Kolonell) ; jusqu’à plus haut sur keywords premium |
| Meta lead gen Dakar | CPC | **120–400 FCFA** |
| Meta CPM | | **2–8 USD** (~1 300–5 200 FCFA) |
| Budget test min. Meta | / mois | **≥ 150k** |
| Budget test min. Google | / mois | **≥ 100–350k** (Smart Bidding) |

### 9.2 Modèle CPL → CAC (hypothèses hub)

**Google Search (intention haute) — exemple**

| Étape | Hyp. |
| --- | --- |
| CPC | 250 FCFA |
| Taux clic→lead | 8 % |
| **CPL** | 250 / 0,08 = **~3 125 FCFA** |
| Lead→closing (demande) | 2,5 % |
| **CAC / closing** | 3 125 / 0,025 = **~125 000 FCFA** |

→ Trop beau si vrai ; en pratique keywords compétitifs + track WA dégradent. **Fourchette réaliste paid Search closing : 0,4–1,5 M**.

**Meta (intention moyenne)**

| Étape | Hyp. |
| --- | --- |
| CPC lead | 250 FCFA |
| Qualité lead plus basse | Lead→close **1 %** |
| **CAC / closing** | ~ **0,8–2,5 M** |

**SEO / contenu (organique)**

| Poste | Hyp. mensuelle Y1 | Output |
| --- | --- | --- |
| Temps contenu (valorisé) | 400–800k | |
| Outils | 50k | |
| Leads organiques | 20–60 | |
| Closings / mois (montée M6+) | 1–3 | |
| **CAC / closing organique** | | **150–500k** (amorti) |

**Réseau / referral / partenaires reverse**

| Canal | CAC typique |
| --- | --- |
| Referral client | **0–100k** (cadeau / geste) |
| Apporteur externe 10 % commission | Variable |
| Partenaire reverse lead | Souvent **négatif net** si on reverse peu |

### 9.3 Matrice canal × priorité spend

| Canal | CAC relatif | Qualité | Priorité Y1 |
| --- | --- | --- | --- |
| Referral / SOI | Très bas | Haute | **P0** (cultiver) |
| SEO / blog / simus | Bas–moyen | Haute | **P0** |
| WhatsApp nurture | Bas | Haute | **P0** |
| Partenaires | Bas | Haute | **P0** |
| Google Search | Moyen | Haute | **P1** (test) |
| Meta | Moyen–élevé | Moyenne | **P1** retarget |
| Classifieds boost | Variable | Basse–moy. | **P2** |
| Portails type US Zillow | Très élevé | Basse | **Éviter** logique pure lead buy |

Bench US : repeat/referral = **50–65 %** du CA des meilleures équipes — **même cible qualitative** pour le hub.

---

## 10. LTV:CAC & payback

### 10.1 Cibles

| Segment | LTV marge | CAC max pour 4:1 | CAC max pour 3:1 |
| --- | --- | --- | --- |
| Vente A (Marième) | 1,6 M | **400k** | 533k |
| Mamadou parcours | 2,1 M | **525k** | 700k |
| Fatou diaspora | 4,0 M | **1,0 M** | 1,3 M |
| Bailleur 3 lots | 4,0 M | **1,0 M** | 1,3 M |
| Gestion 1 lot seul | 1,0 M (5 ans) | **250k** | 333k |

### 10.2 Payback

| Cas | Marge M0 | CAC | Payback |
| --- | --- | --- | --- |
| Closing vente organique | 1,5 M | 250k | **Immédiat** (&lt; 1 mois) |
| Closing vente paid | 1,5 M | 1,0 M | **Immédiat** à closing |
| Bailleur 1 lot (gestion seule) | 20k / mois | 300k | **~15 mois** → combiner avec mise en loc |
| Bailleur + mise en loc 300k marge | 210k + 20k/mois | 300k | **~1–2 mois** |

**Règle :** ne jamais acquérir un bailleur **sans** honoraire d’entrée (mise en loc) si CAC &gt; 200k.

### 10.3 Ratio blended entreprise (cible Y2)

```
LTV_blended ≈ mix (40% vente × 1,6M + 25% parcours × 2,1M + 20% diaspora × 4M + 15% gestion × 2M)
            ≈ ~2,2 M marge moyenne / client acquis « lourd »

CAC_blended cible ≤ 550k  →  LTV:CAC ≥ 4:1
```

---

## 11. Coût marginal d’un agent & productivité

| Hypothèse | Valeur |
| --- | --- |
| Coût chargé agent / mois | **400–700k** |
| Closings / agent / an (cible) | **8–15** (US team avg ~12 ; top 20–28) |
| Commission moyenne agence / closing | **2–3 M** |
| Split agent 40 % | 0,8–1,2 M / closing |

**Seuil :** agent à 700k/mois chargé doit générer **≥ ~1,2–1,5 M marge agence / mois** → grosso modo **1 closing médian / mois** ou mix location+gestion.

Si &lt; **6 closings / an** : sous-performance (bench) → coaching ou sortie.

---

## 12. Contribution & point mort unitaire (lien `09`)

Fixe mensuel hyp. lean Y1 (bureau + 2 personnes + site) : **3–6 M / mois**.

| Marge moyenne / closing | Closings / mois pour couvrir 4 M fixes* |
| --- | --- |
| 1,0 M | **4** |
| 1,5 M | **~2,7** |
| 2,0 M | **2** |

\*Hors montée gestion. Avec **40 lots** @ 20k net → **0,8 M / mois** de contribution récurrente = −0,8 M de closings nécessaires.

---

## 13. Tableaux de bord — métriques à tracker dès J1

| KPI | Formule | Fréquence |
| --- | --- | --- |
| Commission moyenne | Σ CA vente / # closings | Mensuel |
| % exclusifs | Exclusifs / mandats | Mensuel |
| Marge contribution % | Marge / CA | Par closing |
| CPL par canal | Spend / leads | Hebdo |
| CAC / mandat | Spend alloué / mandats | Mensuel |
| CAC / closing | Spend / closings | Mensuel |
| LTV:CAC (cohorte) | LTV marge / CAC | Trimestriel |
| Unités sous gestion | Stock | Mensuel |
| Honoraires / lot / an | CA gestion / lots | Mensuel |
| Taux vacance | Jours vides / jours | Mensuel |
| Churn bailleurs | Départs / stock | Trimestriel |
| Take-rate apport | CA apport / leads envoyés | Mensuel |
| Speed-to-lead | Médiane 1ʳᵉ réponse | Hebdo |

---

## 14. Guardrails (règles de décision)

1. **Pas de scale paid** si LTV:CAC canal &lt; **3:1** sur 30 jours glissants.  
2. **Mandat simple** seulement si CAC ≈ 0 (réseau) ou vendeur refuse exclusif **et** bien stratégique.  
3. **Tout lead simu** doit avoir un CTA partenaire tracké (sinon marge apport perdue).  
4. **Gestion** : viser honoraires **≥ 7 %** ; ne pas descendre à 5 % « pour gagner le lot » sauf volume ≥ 10 lots même proprio.  
5. **Diaspora** : séquestre notaire — coût forfait &lt; 10 % LTV Fatou.  
6. **Agent** sous 6 closings / an → plan 90 jours.  
7. Recalibrer ce doc après **10 closings** et **20 lots** en gestion.

---

## 15. Scénarios unitaires (sanity check prévisionnel)

### Base (par closing vente médian)

- CA 3,0 M · marge 1,45 M · CAC 0,35 M · **net unitaire 1,1 M**

### Optimiste (exclusif + apport Mamadou)

- Marge parcours 2,1 M · CAC 0,25 M · **net 1,85 M**

### Pessimiste (simple + paid cher + pas d’apport)

- CA 2,25 M · agent 40 % · CAC 1,2 M · marge **~0,15 M** → **quasi break-even unitaire** → **stop canal**

---

## 16. Sources

### Internes

- [`01-business-model.md`](./01-business-model.md) §§4, 11  
- [`03-business-plan.md`](./03-business-plan.md)  
- [`../etude-de-marche/05-positionnement-mix-marketing.md`](../etude-de-marche/05-positionnement-mix-marketing.md)  
- [`../../docs/partenaires.md`](../../docs/partenaires.md)

### Externes (web, sept. 2026)

| Source | Usage |
| --- | --- |
| Dreamgate / Lead Systems Go / FoundryCRO / RealEstateAgentLeads — benchmarks 2025–26 | LTV:CAC 4:1 ; CPL/CAC US ; conv. par canal |
| Pharallax — team revenue 2026 | Closings / agent ; % referral |
| Kolonell — Google/Meta Ads SN 2026 | CPC immo 150–300 ; Meta lead 120–400 ; budgets min. |
| Kolonell — agence Dakar / commissions | Exclusif 5–7 % ; funnel estimation |
| AgenceImmobiliereACeder — honoraires gestion / multiples | 6–9 % ; valo 200–380 % CA |
| Simiz / Kolonell — Wave/OM | ~1–2,5 % frais encaissement |

*Les benchmarks US sont **recalibrés** (pas copiés) via CPC SN et tickets FCFA. Toute citation investisseur doit préciser « hypothèses de travail ».*

---

*Unit economics v1.0 — sept. 2026. Prochaine étape : injecter ces hyp. dans [`05-previsionnel-36-mois.md`](./05-previsionnel-36-mois.md).*
