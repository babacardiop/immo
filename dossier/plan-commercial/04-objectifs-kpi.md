# Objectifs & KPI — Par vague (V0→V8+)

**Document :** Dossier · Plan commercial · 04  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-gtm-12-18-mois.md`](./01-gtm-12-18-mois.md) · [`03-canaux-acquisition.md`](./03-canaux-acquisition.md) · [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) · [`../modele-economique/05-previsionnel-36-mois.md`](../modele-economique/05-previsionnel-36-mois.md)  
**Aval :** [`08-growth-scorecard.md`](./08-growth-scorecard.md) · revue hebdo commerciale

---

## 0. Synthèse — nord Y1 & rythme de pilotage

| Famille | KPI nord Y1 (BASE) | Source |
| --- | ---: | --- |
| **CA** | **55,9 M** FCFA | Prévisionnel `05` |
| **Closings vente** | **14** | Rampe M1–M12 |
| **Mises en location** | **18** | Idem |
| **Lots gestion (fin)** | **20** | Idem |
| **Apports partenaires** | **8** (~7,2 M CA) | Idem |
| **% exclusifs** | **≥ 60 %** | UE / politique `04` |
| **SLA WA &lt; 24 h** | **≥ 90 %** | Culture `06` |
| **LTV:CAC blended** | **≥ 3:1** (cible 4:1) | UE `04` |

**Rythme (bench agences FR + brokerage US, adapté lean) :**

| Cadence | Contenu |
| --- | --- |
| **Lundi hebdo** | Leads · estimations · mandats · exclusifs · visites · pipeline 30 j · SLA WA |
| **Mensuel** | Closings · CA · CAC/canal · lots gestion · attach · partenaires SLA |
| **Fin de vague** | Gate **Done** · Go / Kill / Iterate → vague suivante |
| **Trimestriel** | CA vs BASE · cash · hires GO/NO-GO · LTV:CAC |

---

## 1. North Star & compteurs transverse (toutes vagues)

### 1.1 Funnel commercial (cibles Y1)

| Étape | KPI | Cible |
| --- | --- | ---: |
| Entrée | Leads WA qualifiés / mois | Croissance MoM (baseline M2) |
| Speed-to-lead | Médiane 1ʳᵉ réponse | **&lt; 24 h** (≥ 90 %) |
| Qualif | Lead → RDV | **25–40 %** |
| Supply | Estimation → mandat | **30–50 %** (bench FR 30–40 %) |
| Qualité supply | % mandats **exclusifs** | **≥ 60 %** (fin Y1) |
| Closing | Mandat exclusif → closing 12 mois | **50–70 %** |
| Loc | Mise en loc → gestion | **≥ 50 %** |
| Demande outils | `sim_complete` → `partner_lead` | **10–20 %** |

### 1.2 Santé business (mensuel)

| KPI | Alerte jaune | Alerte rouge |
| --- | --- | --- |
| Closings / mois | 1 | **0 × 2 mois** + pipeline &lt; 4 exclusifs |
| Cash | &lt; 10 M | **&lt; 6 M** |
| LTV:CAC canal paid | &lt; 4:1 | **&lt; 3:1** → kill ads |
| % exclusifs (nouveaux) | &lt; 50 % | &lt; 40 % |
| SLA WA &lt; 24 h | &lt; 85 % | **&lt; 75 %** → stop ads |

### 1.3 Événements analytics (obligatoires)

`estimation_request` · `sim_start` · `sim_complete` · `partner_lead` · `wa_click` · `mandat_signé` · `diligence_start` · `closing` · `gestion_on` · `secure_sold`

---

## 2. KPI par vague

### Vague 0 — Socle (S0–M1,5)

**Parcours :** l’agence existe en ligne.

| # | KPI | Cible Done | Fréquence |
| --- | --- | ---: | --- |
| V0.1 | Site catalogue live | **Oui** | Gate |
| V0.2 | Mandats en ligne | **≥ 5** | Gate |
| V0.3 | Dont exclusifs | **≥ 3** | Gate |
| V0.4 | % fiches **type papier** renseigné | **100 %** | Gate |
| V0.5 | SLA WA &lt; 24 h | **≥ 90 %** | Hebdo |
| V0.6 | Leads WA / sem. | Baseline (&gt; 0) | Hebdo |
| V0.7 | Open posting tiers | **0** | Gate |
| V0.8 | CRM : 100 % leads taggés source | **Oui** | Gate |

**Gate Done V0 :** V0.1–V0.4 + V0.5 + V0.7.  
**CA :** inclus rampe T1 (peu / 0–1 closing OK si pipeline).

---

### Vague 1 — Acheteur terrain (M1–M2 / → M3)

**Parcours :** terrain → simu → pro.

| # | KPI | Cible Done | Fréquence |
| --- | --- | ---: | --- |
| V1.1 | Simus live (`/outils`) | **3** | Gate |
| V1.2 | Partenaires P0 conventions signées | **3** (BTP, archi, notaire) | Gate |
| V1.3 | `sim_complete` tracké | **Oui** + baseline n | Gate |
| V1.4 | `partner_lead` envoyés | **≥ 5** | Mensuel |
| V1.5 | 1ʳᵉ commission **apport** encaissée | **≥ 1** | Gate |
| V1.6 | Closings cumul | **≥ 2** (fin M3) | Mensuel |
| V1.7 | Loc. cumul | **≥ 2** | Mensuel |
| V1.8 | CA T1 | **~7,3 M** | Trim. |
| V1.9 | Piliers blog ON | **≥ 2** (construction + TF/bail) | Gate |
| V1.10 | SLA partenaires rappel &lt; 48 h | **&gt; 80 %** | Mensuel |

**Gate Done V1 :** V1.1–V1.3 + V1.5 + 3 partenaires joignables.  
**Bloque V8 / scale ads agressif** si V1 non Done.

---

### Vague 2 — Sécuriser (M3–M4 / → M5)

**Parcours :** papiers avant paiement.

| # | KPI | Cible Done | Fréquence |
| --- | --- | ---: | --- |
| V2.1 | Pack Sécuriser vendable | **Oui** (150–400 k) | Gate |
| V2.2 | Partenaires formalités + géomètre | **Live** | Gate |
| V2.3 | Diligences / packs lancés | **≥ 3** | Gate |
| V2.4 | % nouveaux terrains avec go/no-go doc | **≥ 70 %** | Mensuel |
| V2.5 | Process diligence documenté | **Oui** | Gate |
| V2.6 | Closings cumul | **~4–5** (fin M5) | Mensuel |
| V2.7 | Policy : pas de boost sans diligence &gt; seuil | **100 %** respect | Mensuel |
| V2.8 | Unblock rate (dossiers bloqués → closables) | Tracké ↑ | Mensuel |
| V2.9 | Paid ON (si GO) | ≤ **200 k**/mois · LTV:CAC ≥ 3:1 | Mensuel |

**Gate Done V2 :** V2.1–V2.3 + V2.5.

---

### Vague 3 — Louer & Gérer (M5–M6 / → M7)

**Parcours :** loc → gestion récurrente.

| # | KPI | Cible Done | Fréquence |
| --- | --- | ---: | --- |
| V3.1 | Mandats **gestion** ON | **Oui** | Gate |
| V3.2 | Lots sous gestion fin **M6** | **≥ 5** | Gate |
| V3.3 | Lots fin M7 | **~8** | Mensuel |
| V3.4 | Attach mise en loc → proposition gestion | **≥ 50 %** | Mensuel |
| V3.5 | Attach → **signature** gestion | **≥ 50 %** des props (cible) | Mensuel |
| V3.6 | Loc. cumul fin M6 | **≥ 7** | Mensuel |
| V3.7 | Closings cumul fin M6 | **≥ 5** | Mensuel |
| V3.8 | % loyers collectés digital (Wave/OM) | Tracké ↑ | Mensuel |
| V3.9 | 1ʳᵉs quittances émises | **Oui** | Gate |
| V3.10 | CA T2 | **~13,4 M** | Trim. |
| V3.11 | Honoraires gestion T2 | **~0,4 M** | Trim. |
| V3.12 | GO Agent 2 | Pipeline ≥ 6 exclusifs · cash ≥ 10 M | Gate hire |

**Gate Done V3 :** V3.1–V3.2 + V3.9.  
**Alerte :** 0 lot fin M6 → reporter AC2.

---

### Vague 4 — Diaspora (M7–M8 / → M9)

**Parcours :** acheter remote sans arnaque.

| # | KPI | Cible Done | Fréquence |
| --- | --- | ---: | --- |
| V4.1 | Pack Diaspora Secure live | **Oui** (300–800 k) | Gate |
| V4.2 | Inspecteur partenaire live | **Oui** | Gate |
| V4.3 | Inspections commandées | **≥ 3** | Gate |
| V4.4 | % closings diaspora avec **séquestre** | **≥ 50 %** dossiers diaspora | Mensuel |
| V4.5 | Closings cumul fin M9 | **≥ 9** | Mensuel |
| V4.6 | Lots gestion fin M9 | **≥ 11** | Mensuel |
| V4.7 | CA T3 | **~17,2 M** | Trim. |
| V4.8 | Forfaits Secure / diligence CA | Montée (part « Autres ») | Mensuel |
| V4.9 | NPS / sat diaspora (proxy) | Tracké (≥ 1 feedback / closing) | Mensuel |
| V4.10 | Paid plafond | ≤ **400 k**/mois si CAC OK | Mensuel |
| V4.11 | OD en poste | **M7** si GO | Hire |

**Gate Done V4 :** V4.1–V4.3.

---

### Vague 5 — Gros tickets (M9–M10)

| # | KPI | Cible | Fréquence |
| --- | --- | ---: | --- |
| V5.1 | Estimation vendeur live | **Oui** | Gate |
| V5.2 | Estimation → mandat | **≥ 30 %** | Mensuel |
| V5.3 | Tickets closing &gt; **80 M** | **≥ 1–2** / an | Mensuel |
| V5.4 | % exclusifs via estimation | Tracké | Mensuel |
| V5.5 | Closings cumul trajectoire | Vers **14** @ M12 | Mensuel |

**Gate :** estimation→mandat mesurable · pas seulement page jolie.

---

### Vague 6 — Chantier & confort (M11–M12)

| # | KPI | Cible | Fréquence |
| --- | --- | ---: | --- |
| V6.1 | Leads énergie / permis (si live) | Tracké | Mensuel |
| V6.2 | Upsell post-achat terrain | **≥ 1** apport lié | Gate soft |
| V6.3 | **Y1 close-out** closings | **14** | Gate Y1 |
| V6.4 | Lots gestion fin M12 | **20** | Gate Y1 |
| V6.5 | CA Y1 | **~55,9 M** | Gate Y1 |
| V6.6 | % exclusifs | **≥ 60 %** | Gate Y1 |

---

### Vague 7 — Densifier (M13–M15)

| # | KPI | Cible | Condition |
| --- | --- | ---: | --- |
| V7.1 | GMV services annexes | Tracké | V1–V4 Done |
| V7.2 | Time-to-publish annonce | ↓ vs baseline | |
| V7.3 | Lots gestion | **~35–40** @ M18 | Bridge Y2 |
| V7.4 | Run-rate CA mensuel | **~8–10 M** | |

**Ouvrir seulement si** V1–V4 KPI verts.

---

### Vague 8+ — Expansion (M16–M18+)

| # | KPI prérequis | Seuil |
| --- | --- | ---: |
| Pré.1 | V1–V7 gates | Majorité Done |
| Pré.2 | LTV:CAC blended | **≥ 4:1** |
| Pré.3 | Cash runway | **≥ 4 mois** opex |
| Pré.4 | Sinon | **Approfondir V1–V4** (pas élargir) |

---

## 3. Objectifs volume & CA par jalon (rappel)

| Jalon | Closings Σ | Loc Σ | Lots gest. | Apports Σ | CA trim. / an |
| --- | ---: | ---: | ---: | ---: | ---: |
| Fin **M3** | 2 | 2 | 0 | 1 | T1 **7,3 M** |
| Fin **M6** | 5 | 7 | **5** | 4 | T2 **13,4 M** |
| Fin **M9** | 9 | 13 | **11** | 7 | T3 **17,2 M** |
| Fin **M12** | **14** | **18** | **20** | **8** | Y1 **55,9 M** |
| **M18** | ~20–22* | — | ~35–40 | — | Run-rate ↑ Y2 |

\*Cumul depuis M1, rythme Y2.

---

## 4. KPI par rôle (lien org)

| Rôle | KPI individuels (extrait) | Cible |
| --- | --- | ---: |
| **AC** | Closings / an · % exclusifs · SLA WA | ≥ 6 clos. · ≥ 60 % excl. · &lt; 24 h |
| **GER** | CA · cash · gates vague · remises | BASE / runway |
| **CT** | Piliers live · leads SEO · % CTA | Calendrier · CAC org. 150–500 k |
| **OD** | SLA partenaires · diligences · lots early | &gt; 80 % · process V2–V3 |
| **GL** (Y2) | Lots · encaissement · churn | — |

Détail fiches : [`../organisation/02-fiches-de-poste.md`](../organisation/02-fiches-de-poste.md).

---

## 5. KPI canaux (mensuel — détail `03`)

| Canal | KPI | Cible / seuil |
| --- | --- | --- |
| WhatsApp | % &lt; 24 h · lead→RDV | ≥ 90 % · 25–40 % |
| SEO | Leads org. · closings SEO | 20–60 / mois M9+ · ≥ 3–5 / an |
| Partenaires | Apports n · SLA 48 h | 8 / an · &gt; 80 % |
| Classifieds | % Z1 syndiqué · orphelines | ≥ 80 % · **0** |
| Ads | CAC closing · LTV:CAC | ≤ plafonds UE · ≥ 3:1 |

---

## 6. KPI zones (mensuel — détail `02`)

| KPI | Cible Y1 |
| --- | ---: |
| % mandats exclusifs actifs en **Z1** | **≥ 70 %** |
| % closings depuis Z1 | **≥ 60 %** |
| % lots gestion Z1 | **≥ 50 %** |
| Closings / mandats **Z3** | **1–3** (qualité) |
| Mandats no-go publiés | **0** |

---

## 7. Tableau de bord lundi matin (1 page)

| Bloc | Indicateurs |
| --- | --- |
| **Pipeline** | Leads 7 j · RDV bookés · estimations · exclusifs actifs · simples |
| **Conversion** | Est.→mandat · visites·semaine · offres en cours |
| **Closing** | Compromis / actes du mois · CA prévisionnel 30 j |
| **Récurrence** | Lots gestion · attach loc·semaine · impayés |
| **Ops** | SLA WA % · partenaires en retard · cash flash |
| **Qualité** | % papier renseigné · diligences ouvertes · incidents |

*Inspiré LeSiteImmo / Journal de l’Agence / IA-Lab — recalibré hub (gestion + apports + simus).*

---

## 8. Matrice Go / Kill fin de vague

| Résultat | Action |
| --- | --- |
| **Done** (gates verts) | Ouvrir vague N+1 (budget ouvertures ≤ 8–12) |
| **Partiel** (1–2 KPI jaunes) | Prolonger 2–4 sem. · pas ouvrir N+2 |
| **Fail** (gate rouge) | Kill items hors parcours · recentrer supply exclusif |
| V1 fail | **Pas** de paid scale · **pas** V8 |
| V3 fail (0 lot) | Reporter AC2 · forcer attach |
| Ads LTV:CAC &lt; 3:1 | Kill campagne · garder SEO/SOI |

---

## 9. Définitions (éviter les débats)

| Terme | Définition hub |
| --- | --- |
| **Lead qualifié** | Contact avec intention + zone/budget ou bien identifié · entré CRM |
| **Mandat actif** | Mandat signé non résilié · bien encore à commercialiser |
| **Exclusif** | Mandat exclusif écrit (pas « oral prioritaire ») |
| **Closing** | Acte / encaissement commission vente |
| **Lot gestion** | Unité avec mandat gestion signé · loyer en cours ou à placer |
| **Apport** | Commission partenaire encaissée (pas lead seul) |
| **CAC** | Spend alloué (media + contenu au prorata) / closing **ou** mandat — préciser laquelle |
| **LTV** | Somme **marges** de contribution sur la relation (pas CA brut) |

---

## 10. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`hub-roadmap.md`](../../docs/hub-roadmap.md) | KPI natifs par vague · DoD |
| [`01-gtm-12-18-mois.md`](./01-gtm-12-18-mois.md) | Jalons M3/M6/M9/M12 · gates |
| [`05-previsionnel-36-mois.md`](../modele-economique/05-previsionnel-36-mois.md) | Volumes · CA trim. |
| [`04-unites-economiques.md`](../modele-economique/04-unites-economiques.md) | Funnel · LTV:CAC |
| [`03-canaux-acquisition.md`](./03-canaux-acquisition.md) | KPI canaux |
| [`02-zones-prioritaires.md`](./02-zones-prioritaires.md) | KPI geo |
| [`06-culture-et-sla.md`](../organisation/06-culture-et-sla.md) | SLA |

### Externes

| Source | Insight retenu |
| --- | --- |
| LeSiteImmo — KPI agence | Leads · est.→mandat · % exclusivité · visites · CA prévi. |
| IA-Lab Immo — 12 KPI 2026 | Est.→mandat 30–40 % · exclusifs &gt; 70 % (aspiration FR) |
| Journal de l’Agence — 11 indicateurs | R1 · mandats · compromis · ventes |
| LinkedIn Fechter — brokerage KPIs | Pipeline health · speed-to-lead · CAC/closing |

*Cibles FR/US = **ordres de grandeur** ; chiffres hub = BASE Sénégal (tickets FCFA, SLA 24 h Y1).*

---

*Objectifs & KPI v1.0 — sept. 2026. Scorecard opérationnel → `08-growth-scorecard.md`.*
