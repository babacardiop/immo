# Growth scorecard — Dashboard CAC / LTV hebdo–mensuel

**Document :** Dossier · Plan commercial · 08  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`04-objectifs-kpi.md`](./04-objectifs-kpi.md) · [`03-canaux-acquisition.md`](./03-canaux-acquisition.md) · [`../modele-economique/04-unites-economiques.md`](../modele-economique/04-unites-economiques.md)  
**Outil Y1 :** Google Sheet / Excel (1 onglet Hebdo · 1 Mensuel · 1 Canaux) — pas besoin BI

---

## 0. Synthèse — pourquoi cette scorecard

| Principe | Application hub |
| --- | --- |
| **Hebdo = rythme** | Leads, SLA, pipeline, exclusifs — décisions de la semaine |
| **Mensuel = rentabilité** | CAC, LTV:CAC, CA, payback — Scale / Hold / Kill canaux |
| **North Star Y1** | **Closings exclusifs** + **lots gestion** (pas vanity trafic) |
| **LTV** | Toujours en **marge de contribution**, pas CA brut (`04` UE) |
| **Sans source CRM** | Scorecard **invalide** — tag obligatoire |

Bench Mapping Marketing / WebImmo / SaaS metrics : hebdo acquisition+rythme · mensuel CAC/ROI · LTV:CAC cible **≥ 3:1** (kill) / **≥ 4:1** (cible).

```
INPUTS (CRM + spend)
  → Scorecard HEBDO (lundi 30 min)
  → Scorecard MENSUEL (1ʳᵉ semaine · 60 min)
  → Décision : Scale / Hold / Kill / Escalade cash
```

---

## 1. Définitions de calcul (ne pas négocier en réunion)

### 1.1 CAC

| Variante | Formule | Usage |
| --- | --- | --- |
| **CAC media** | Spend ads + boost classifieds / n closings attribués | Kill ads |
| **CAC marketing** | Media + coût contenu CT (prorata) / closings | SEO vs paid |
| **CAC full** | Marketing + fixe AC alloué* / closings | Vision entreprise |
| **CAC / mandat** | Spend alloué / mandats signés (mois) | Lead indicator |

\*Y1 lean : optionnel ; par défaut tracker **CAC media** + **CAC marketing**.

**Attribution closing :** source **1ʳᵉ touche** taguée CRM (utm / `soi` / `seo` / `meta`…) — pas last-click WA seul.

### 1.2 LTV (marge)

| Segment | LTV marge hyp. (UE) | Notes |
| --- | ---: | --- |
| Vente (Marième) | **~1,6 M** | 1 closing |
| Parcours terrain (Mamadou) | **~2,1 M** | Closing + apport |
| Diaspora (Fatou) | **~3,5–5 M** | Vente + Secure + gestion |
| Bailleur multi | **~2–4 M** | Loc + gestion 3–5 ans |
| Gestion 1 lot | **~1,0 M** / 5 ans | Seul = faible |

**LTV utilisée dans le ratio** = marge moyenne du **segment** du closing (table fixe Y1, recalibrer après 10 closings).

### 1.3 Ratios & payback

```
LTV:CAC = LTV_marge_segment / CAC_canal
Payback_mois ≈ CAC / marge_mois_récurrente   (gestion)
Payback_transaction = 0 si marge_closing > CAC (à l’encaissement)
```

| Seuil | Action |
| --- | --- |
| LTV:CAC **≥ 4:1** | Scale OK |
| **3:1 – 4:1** | Hold · optimiser |
| **&lt; 3:1** (30 j glissants) | **Kill** canal / campagne |
| Cash **&lt; 6 M** | Stop paid toutes campagnes |

### 1.4 CPL

```
CPL = Spend canal / leads qualifiés taggés
```

CPL seul **ne scale pas** — toujours coupler à lead→closing.

---

## 2. Scorecard HEBDOMADAIRE (lundi matin · 30 min)

**Owner :** GER · Inputs : AC + CT  
**Période :** sem. S-1 (lun–dim)

### 2.1 Template à coller (Sheet)

| # | Indicateur | S-1 | Objectif | Feu | Commentaire |
| --- | --- | ---: | ---: | --- | --- |
| H1 | Leads qualifiés | | ↑ MoM baseline | 🟢🟡🔴 | |
| H2 | % leads **taggés source** | | **100 %** | | |
| H3 | Médiane 1ʳᵉ réponse WA (h) | | **&lt; 24** (≥ 90 %) | | |
| H4 | Estimations faites | | ≥ 2–5 selon phase | | |
| H5 | Mandats signés (dont exclusifs) | | — / **≥ 60 %** excl. | | |
| H6 | Exclusifs **actifs** (stock) | | ≥ 3 / 6 / 8 selon mois | | |
| H7 | Visites / sem. | | — | | |
| H8 | Offres / compromis en cours | | — | | |
| H9 | CA prévisionnel 30 j (M) | | — | | |
| H10 | `sim_complete` (si V1+) | | tracké | | |
| H11 | Partner leads envoyés | | — | | |
| H12 | Lots gestion (stock) | | rampe `05` | | |
| H13 | Cash flash (M) | | ≥ 6 | | |
| H14 | Spend ads S-1 (k) | | ≤ plafond phase | | |

### 2.2 Feux hebdo (règles)

| Feu | Condition |
| --- | --- |
| 🔴 | SLA &lt; 75 % **ou** cash &lt; 6 M **ou** 0 exclusif actif + 0 lead sem. |
| 🟡 | SLA 75–90 % **ou** exclusifs &lt; cible phase **ou** pipeline 30 j faible |
| 🟢 | SLA ≥ 90 % · pipeline OK · cash OK |

### 2.3 Décisions types lundi

| Signal | Action semaine |
| --- | --- |
| SLA rouge | **Stop ads** · AC file only |
| Leads ↑ / RDV ↓ | Coaching qualif + Playbook `07` |
| Estimations OK / mandats ↓ | Pitch exclusif `05` · revue objections |
| Cash jaune | Reporter boost · focus SOI |
| Simus ↑ / partner_lead ↓ | Fix CTA handoff |

### 2.4 North Star hebdo (une ligne)

> **Cette semaine on gagne si :** exclusifs actifs ≥ cible **et** SLA ≥ 90 % **et** ≥ 1 avancement closing/gestion.

---

## 3. Scorecard MENSUELLE (rentabilité · 60 min)

**Owner :** GER · EC en copie cash  
**Période :** mois M-1 · comparer M-2 et YTD

### 3.1 Bloc A — Volume & CA

| Indicateur | Réalisé | Cible rampe `05` | Écart |
| --- | ---: | ---: | --- |
| Closings vente | | voir rampe mensuelle | |
| Mises en location | | | |
| Lots gestion fin mois | | | |
| Apports n / CA apport | | | |
| CA total mois (M) | | trim. / 3 indicatif | |
| % exclusifs (nouveaux mandats) | | ≥ 50→60 % | |
| Attach loc→gestion | | ≥ 50 % | |

**Rampe closings rappel Y1 :** M2–5 ≈ 1/mois · M8/10/12 ≈ 2 · **Σ 14**.

### 3.2 Bloc B — Acquisition & CAC par canal

| Canal | Spend (k) | Leads | CPL (k) | Closings attr. | **CAC / closing (k)** | LTV seg. | **LTV:CAC** | Décision |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| SOI / referral | | | | | | 1,6–4 M | | Scale/Hold |
| SEO / contenu* | | | | | | | | |
| Partenaires | | | | | | | | |
| Classifieds | | | | | | | | |
| Meta | | | | | | | | |
| Google | | | | | | | | |
| **Total / blended** | | | | | | ~2,2 M | **≥ 3:1** | |

\*Spend SEO = CT 300 k + outils 50 k (ou prorata si multi-objectifs).

**Plafonds CAC closing (rappel UE) :**

| Canal | CAC typique attendu |
| --- | ---: |
| Organique / SOI | **150–500 k** |
| Google | **400 k – 1,5 M** |
| Meta froid | **0,8 – 2,5 M** |

### 3.3 Bloc C — LTV:CAC & payback

| Segment | Closings / clients n | CAC moy. | LTV marge | Ratio | Payback | Feu |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| Vente pure | | | 1,6 M | | Immédiat si marge &gt; CAC | |
| Terrain + apport | | | 2,1 M | | | |
| Diaspora | | | 4,0 M | | | |
| Gestion (+ loc) | | | 2–4 M | | &lt; 6–9 mois cible | |
| **Blended** | | ≤ **550 k** cible | ~2,2 M | **≥ 4:1** | | |

### 3.4 Bloc D — Funnel conversion (mensuel)

| Étape | n | Taux | Cible |
| --- | ---: | ---: | ---: |
| Lead → RDV | | | 25–40 % |
| Estimation → mandat | | | 30–50 % |
| Mandat excl. → closing (cohorte 12 mois)* | | | 50–70 % |
| Simu → partner_lead | | | 10–20 % |
| Loc → gestion signée | | | ≥ 50 % |

\*Suivre en **cohorte** (mandats signés mois M → closings cumulés) — pas mélanger avec closings du mois.

### 3.5 Bloc E — Ops & qualité

| Indicateur | Cible | Réalisé |
| --- | ---: | ---: |
| SLA WA &lt; 24 h | ≥ 90 % | |
| Partenaires rappel &lt; 48 h | &gt; 80 % | |
| % fiches type papier | 100 % | |
| Remises sous plancher (n) | 0 sans GER | |
| Annonces orphelines classifieds | 0 | |

### 3.6 Bloc F — Cash & capacité

| Indicateur | Réalisé | Seuil |
| --- | ---: | --- |
| Cash fin mois (M) | | Rouge &lt; **6** · Jaune &lt; **10** |
| Runway (mois opex) | | ≥ 2 mini · cible 3+ |
| Spend paid vs plafond | | M3–6 : 200 k · M7–12 : 400 k |
| Productivité AC (closings / AC / mois) | | → ≥ ~1 médian long terme |

---

## 4. Matrice Scale / Hold / Kill (mensuel)

| Canal | Scale si… | Hold si… | Kill si… |
| --- | --- | --- | --- |
| **Meta / Google** | LTV:CAC ≥ 4:1 · SLA OK · cash ≥ 10 M | 3–4:1 | &lt; 3:1 **ou** cash &lt; 6 M **ou** SLA rouge |
| **Classifieds boost** | CAC &lt; Search · leads clean | CPL haut mais closings | Junk / orphelines |
| **SEO** | Leads org. ↑ MoM | Stable | 0 publish 30 j → fix CT |
| **SOI** | Toujours | — | — (ne jamais kill) |
| **Partenaires** | Apports + SLA &gt; 80 % | SLA 60–80 % | SLA &lt; 60 % × 2 mois → clause sortie |

**Règle paid lead → mandat :** si % exclusifs sur leads ads &lt; **50 %** → revoir pitch (pas augmenter budget).

---

## 5. Vue « 1 écran » mensuelle (résumé dirigeants)

| Carte | Valeur | Feu |
| --- | --- | --- |
| Closings M / YTD | __ / __ | vs rampe |
| CA M / YTD | __ / __ M | |
| Lots gestion | __ | |
| LTV:CAC blended | __ : 1 | ≥ 3 |
| CAC paid moy. | __ k | |
| % exclusifs | __ % | ≥ 60 |
| SLA WA | __ % | ≥ 90 |
| Cash | __ M | ≥ 6 |
| Décision paid | Scale / Hold / **Kill** | |

---

## 6. Exemple chiffré fictif (M8 — pédagogie)

| Canal | Spend | Closings | CAC | LTV used | Ratio | Décision |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| SOI | 0 | 1 | ~50 k | 1,6 M | **32:1** | Scale farming |
| SEO | 350 k | 1 | 350 k | 2,1 M | **6:1** | Scale contenu |
| Meta | 400 k | 0 | ∞ | — | — | **Kill** froid · garder retarget |
| Google | 200 k | 1 | 200 k* | 1,6 M | 8:1* | Hold (vérifier attr.) |
| **Blended** | 950 k | 3 | ~317 k | ~1,8 M | **~5,7:1** | OK |

\*Exemple ; recalculer avec attribution réelle.

---

## 7. Routine & RACI scorecard

| Cadence | Qui prépare | Qui décide | Durée |
| --- | --- | --- | ---: |
| **Lundi hebdo** | AC (pipeline) + CT (leads SEO) | **GER** | 30 min |
| **Mensuel J+3** | GER consolide spend + CRM | GER (+ associés si rouge cash) | 60 min |
| **Trimestre** | GER + EC | Associés | CA vs BASE · LTV recalibrée |

| Donnée | Source | Responsable saisie |
| --- | --- | --- |
| Leads / sources | CRM | AC (tag) |
| Spend ads | Meta/Google ads manager | GER / CT |
| Coût contenu | Paie / freelance | GER |
| Closings / CA | Registre mandats | GER / OD |
| Lots gestion | Fichier gestion | OD / AC |
| Cash | Banque | GER |

---

## 8. Implémentation Sheet (structure recommandée)

| Onglet | Contenu |
| --- | --- |
| `Hebdo` | Lignes H1–H14 · historique 12 sem. |
| `Mensuel` | Blocs A–F · 12 mois |
| `Canaux` | Spend · leads · closings · CAC · ratio |
| `Cohortes` | Mandats mois M → closings M+n |
| `Seuils` | Table LTV segments · plafonds (copie UE) |
| `Décisions` | Log Scale/Hold/Kill + date |

**Pas de vanity :** likes, impressions brutes, « portée » — hors scorecard (annexe CT OK).

---

## 9. Alertes automatiques (règles à coller)

| ID | Si… | Alors… |
| --- | --- | --- |
| A1 | LTV:CAC paid &lt; 3:1 sur 30 j | Kill campagne · mail GER |
| A2 | Cash &lt; 6 M | Stop paid · revue opex |
| A3 | 2 mois &lt; 1 closing **et** exclusifs &lt; 4 | Plan PESS `10` |
| A4 | SLA &lt; 75 % | Stop ads jusqu’à rétablissement |
| A5 | Attach gestion &lt; 30 % sur 8 sem. | Coaching Playbook E |
| A6 | % exclusifs nouveaux &lt; 40 % | Revue politique + AC |

---

## 10. Lien vagues produit

| Vague | Focus scorecard additionnel |
| --- | --- |
| V0 | H2 tag · H3 SLA · H6 exclusifs · **pas** CAC paid |
| V1 | H10 simu · partner_lead · 1er CAC apport |
| V2 | Diligence n · % go/no-go |
| V3 | H12 lots · attach · CA gestion |
| V4 | Secure n · séquestre % · CAC diaspora |
| V5+ | Tickets &gt; 80 M · estimation→mandat |

Gates détaillés : [`04-objectifs-kpi.md`](./04-objectifs-kpi.md).

---

## 11. Checklist mise en place (J0 scorecard)

- [ ] Sheet créé · onglets §8  
- [ ] LTV segments collés depuis UE  
- [ ] Tags CRM = liste canaux `03`  
- [ ] 1ʳᵉ ligne hebdo remplie (même à 0)  
- [ ] Plafonds paid M3/M7 notés  
- [ ] Rituel lundi tenu 4 sem. d’affilée  

---

## 12. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`04-unites-economiques.md`](../modele-economique/04-unites-economiques.md) | CAC · LTV · ratios · payback |
| [`04-objectifs-kpi.md`](./04-objectifs-kpi.md) | Cibles · alertes · funnel |
| [`03-canaux-acquisition.md`](./03-canaux-acquisition.md) | Budgets · mix · kill rules |
| [`05-previsionnel-36-mois.md`](../modele-economique/05-previsionnel-36-mois.md) | Rampe volumes / CA |
| [`01-gtm-12-18-mois.md`](./01-gtm-12-18-mois.md) | Jalons |

### Externes

| Source | Insight |
| --- | --- |
| Mapping Marketing — KPI immo | Hebdo rythme · mensuel rentabilité / CAC |
| LeSiteImmo — dashboard agence | Pipeline lundi · CA prévisionnel |
| WebImmo — 20 KPI marketing | CAC vs marge · North Star + 3–5 soutiens |
| SaaS metrics (LTV:CAC) | Ratio ≥ 3× · payback ; **recalibré** services immo SN |

---

*Growth scorecard v1.0 — sept. 2026. Pack plan-commercial `01`→`08` complet.*
