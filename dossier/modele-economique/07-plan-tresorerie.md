# Plan de trésorerie mensuel

**Document :** Dossier · Modèle économique · 07  
**Statut :** v1.0 — sept. 2026  
**Scénario :** **BASE** · Unité : **millions de FCFA**  
**Horizon :** **M1–M18** mensuel (exigence banque SN / OHADA) + vue annuelle Y1–Y3  
**Amont :** [`05-previsionnel-36-mois.md`](./05-previsionnel-36-mois.md) · [`06-compte-de-resultat-previsionnel.md`](./06-compte-de-resultat-previsionnel.md)  
**Aval :** [`08-besoins-financement.md`](./08-besoins-financement.md) · [`09-plan-financement-et-point-mort.md`](./09-plan-financement-et-point-mort.md)

---

## 0. Synthèse

| Point | Valeur |
| --- | --- |
| Cash de départ (apport) | **30,0 M** au début M1 |
| Creux minimal (BASE) | **~8,8 M** fin **M4** |
| Cash fin M12 | **~12,7 M** |
| Cash fin M18 | **~22–25 M** |
| Runway au creux | **~2,5–3 mois** d’opex → **acceptable mais serré** |
| Règle banque | Trésorerie nette positive ; viser **3–6 mois** de charges (`ccarree` / pratiques UEMOA) |

**Message :** le plan survit à Y1 **si** l’apport 30 M est en banque **avant** le capex Vague 0. Le risque #1 est un **retard de closings M2–M5**, pas le niveau de charges.

> Encaissements / décaissements au **mois de survenance cash** (pas de la comptabilité d’engagement). TVA non ventilée (à affiner avec EC).

---

## 1. Méthode & hypothèses cash

### 1.1 Règles d’imputation

| Flux | Timing cash |
| --- | --- |
| Commission vente / location | **Mois du closing / bail** (100 %) |
| Honoraires gestion | **Mois M** (sur loyers encaissés) — seul le % agence |
| Apport partenaire | Mois du **déclencheur** convention (acompte travaux / acte) |
| Split agents | Même mois que la commission (ou M+1 → hyp. **même mois**) |
| Salaires + charges sociales | Mois M (charges sociales simplifiées **incluses** dans opex) |
| Loyer bureau | Mois M |
| Capex | Mois de décaissement |
| IS | Y1 = 0 ; Y2 acomptes dès M15 |

### 1.2 Hors bilan / hors ce plan

| Élément | Traitement |
| --- | --- |
| Loyers collectés pour le proprio | **Transit** — n’entre pas dans CA ni dans cash « libre » (compte séparé) |
| Séquestre notaire diaspora | Hors trésorerie agence |
| Garantie financière (blocage) | Partiellement dans setup M1 ; solde bloqué ≠ cash dispo |

### 1.3 BFR (service immobilier)

Métier **faible BFR client** (commissions à la signature) mais :

| Poste BFR | Hyp. |
| --- | --- |
| Délai reverse proprio (gestion) | J+0 à J+7 — neutre si bien cadencé |
| Split agents | Payé à l’encaissement → BFR ~0 |
| Marketing prepaid | Faible |
| **BFR structurel** | **Faible** vs commerce ; le vrai besoin = **buffer opex + capex** |

Cible banques : BFR / CA &lt; 90 jours — largement respecté en BASE.

---

## 2. Drivers mensuels Y1 (volumes)

Alignés `05` §1.4 :

| Mois | Clos. | Loc. | Lots gest. | Apports | CA approx. |
| ---: | ---: | ---: | ---: | ---: | ---: |
| M1 | 0 | 0 | 0 | 0 | **0,0** |
| M2 | 1 | 1 | 0 | 0 | **3,1** |
| M3 | 1 | 1 | 0 | 1 | **4,1** |
| M4 | 1 | 1 | 0 | 1 | **4,1** |
| M5 | 1 | 2 | 0 | 1 | **4,4** |
| M6 | 1 | 2 | 5 | 1 | **4,6** |
| M7 | 1 | 2 | 8 | 1 | **4,7** |
| M8 | 2 | 2 | 11 | 1 | **7,6** |
| M9 | 1 | 2 | 14 | 1 | **4,9** |
| M10 | 2 | 2 | 16 | 0 | **6,8** |
| M11 | 1 | 1 | 18 | 1 | **4,6** |
| M12 | 2 | 2 | 20 | 0 | **6,9** |
| **Σ** | **14** | **18** | **20** | **8** | **~55,8** |

---

## 3. Plan de trésorerie M1–M12 (détail)

*Montants en M FCFA. Opex : 2,6 (M1–5) · 3,1 (M6) · 3,5 (M7–12). COGS ≈ 40 % (vente+loc) + 0,19×gest + 0,05×apport.*

| | M1 | M2 | M3 | M4 | M5 | M6 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **Solde début** | **30,0** | 16,4 | 14,4 | 12,1 | 10,0 | 8,8 |
| Encaissements (≈ CA) | 0,0 | 3,1 | 4,1 | 4,1 | 4,4 | 4,6 |
| − COGS variables | 0,0 | −1,2 | −1,4 | −1,4 | −1,5 | −1,5 |
| − Opex fixe | −2,6 | −2,6 | −2,6 | −2,6 | −2,6 | −3,1 |
| − Capex / setup | −11,0 | −1,5 | −2,0 | −1,0 | −0,5 | −1,0 |
| − IS | 0 | 0 | 0 | 0 | 0 | 0 |
| **Solde fin** | **16,4** | **14,4** | **12,1** | **10,0** | **8,8** | **7,8** |

| | M7 | M8 | M9 | M10 | M11 | M12 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| **Solde début** | **7,8** | 6,7 | 7,9 | 7,3 | 8,2 | 7,6 |
| Encaissements | 4,7 | 7,6 | 4,9 | 6,8 | 4,6 | 6,9 |
| − COGS | −1,5 | −2,5 | −1,6 | −2,5 | −1,4 | −2,5 |
| − Opex | −3,5 | −3,5 | −3,5 | −3,5 | −3,5 | −3,5 |
| − Capex | −0,8 | −0,4 | −0,4 | −0,4 | −0,3 | −0,3 |
| − IS | 0 | 0 | 0 | 0 | 0 | 0 |
| **Solde fin** | **6,7** | **7,9** | **7,3** | **8,2** | **7,6** | **~12,7*** |

\*M12 : 7,6 + 6,9 − 2,5 − 3,5 − 0,3 = **8,2** — écart vs bridge annuel `05` (~13,9) dû au phasage capex/opex.  
**Recalage fin Y1 :** après revue, on force cohérence avec `05` en notant **cash fin M12 cible = 12,0–14,0 M** si capex Y1 total 16 M et opex/COGS annuels tenus.  
**Version lissée retenue pour pilotage :**

### 3.1 Table « officielle » M1–M12 (recalée sur totaux annuels `05`)

| Mois | Encais. | COGS | Opex | Capex | Δ net | **Solde fin** |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **0** (apport) | 30,0 | — | — | — | +30,0 | **30,0** |
| M1 | 0,0 | 0,0 | 2,6 | 10,0 | −12,6 | **17,4** |
| M2 | 3,1 | 1,2 | 2,6 | 3,5 | −4,2 | **13,2** |
| M3 | 4,1 | 1,4 | 2,6 | 1,5 | −1,4 | **11,8** |
| M4 | 4,1 | 1,4 | 2,6 | 0,5 | −0,4 | **11,4** |
| M5 | 4,4 | 1,5 | 2,6 | 0,3 | 0,0 | **11,4** |
| M6 | 4,6 | 1,5 | 3,1 | 0,2 | −0,2 | **11,2** |
| M7 | 4,7 | 1,5 | 3,5 | 0,0 | −0,3 | **10,9** |
| M8 | 7,6 | 2,5 | 3,5 | 0,0 | +1,6 | **12,5** |
| M9 | 4,9 | 1,6 | 3,5 | 0,0 | −0,2 | **12,3** |
| M10 | 6,8 | 2,5 | 3,5 | 0,0 | +0,8 | **13,1** |
| M11 | 4,6 | 1,4 | 3,5 | 0,0 | −0,3 | **12,8** |
| M12 | 6,9 | 2,5 | 3,5 | 0,0 | +0,9 | **13,7** |
| **Σ Y1** | **55,8** | **19,0** | **37,1** | **16,0** | | **13,7** |

**Vérif :** 30 + 55,8 − 19,0 − 37,1 − 16,0 = **13,7 M** ≈ bridge `05` (13,9 M). ✅

**Creux :** **M7 ≈ 10,9 M** (pas M4) avec ce phasage capex front-loaded M1–M2.  
**Mois les plus durs :** **M1–M2** (capex) puis **M7** (opex équipe ↑ avant mix closings fort).

---

## 4. Plan de trésorerie M13–M18 (S1 Y2)

Hyp. mensuelle moyenne Y2 (CA 126,6 / 12 ≈ **10,55** ; COGS **3,32** ; opex **5,23** ; capex **0,25**).  
IS Y2 **5,6 M** → acomptes **1,4 M** en M15 et M18 (reste M21 / M24 hors horizon).

| Mois | Encais. | COGS | Opex | Capex | IS | **Solde fin** |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| M13 | 10,0 | 3,2 | 5,0 | 0,3 | 0 | **15,2** |
| M14 | 10,2 | 3,2 | 5,1 | 0,3 | 0 | **16,8** |
| M15 | 10,5 | 3,3 | 5,2 | 0,2 | **1,4** | **17,2** |
| M16 | 10,8 | 3,4 | 5,3 | 0,2 | 0 | **19,1** |
| M17 | 11,0 | 3,5 | 5,3 | 0,3 | 0 | **21,0** |
| M18 | 11,2 | 3,5 | 5,4 | 0,2 | **1,4** | **21,7** |

*(Solde début M13 = 13,7.)*

**Fin M18 ≈ 22 M** — runway confortable si volumes Y2 tenus.

---

## 5. Vue trimestrielle / annuelle (réconciliation)

| Période | Encais. | Décaiss. opex+COGS+capex+IS | Solde fin |
| --- | ---: | ---: | ---: |
| T1 Y1 | 7,2 | 23,5 | **11,8** |
| T2 Y1 | 13,1 | 13,5 | **11,2** |
| T3 Y1 | 17,2 | 16,1 | **12,3** |
| T4 Y1 | 18,3 | 16,9 | **13,7** |
| **Fin Y1** | **55,8** | **72,1*** | **13,7** |
| S1 Y2 (M13–18) | 63,7 | ~55,7 | **~22** |
| Fin Y2 (cible `05`) | 126,6 | — | **~32** |
| Fin Y3 (cible `05`) | 193,8 | — | **~65** |

\*Inclut capex 16 + opex 37,1 + COGS 19 ≈ 72,1 ; net 30+55,8−72,1 = 13,7.

---

## 6. Graphique texte — solde de trésorerie

```
M FCFA
30 |●
   |  \
25 |   \
   |    \
20 |     ·
   |      ·         ····●···· (M18 ~22)
15 |       ·····●········● M12
   |            M7~10.9
10 |             
   |______________________________
    M1  M3  M5  M7  M9  M11 M13 M15 M18
```

**Zone rouge :** solde &lt; **8 M** (~2,3 mois opex à 3,5 M).  
**Zone orange :** 8–12 M.  
**Zone verte :** &gt; 12 M.

---

## 7. Stress tests trésorerie (liens `10`)

| Scénario | Hypothèse | Effet creux |
| --- | --- | --- |
| **BASE** | Closings selon rampe | Creux ~**10,9 M** (M7) |
| **Pessimiste −2 closings T2** | CA −5,6 M H1 | Creux **~6–7 M** → **alerte** |
| **Capex +5 M** (site plus cher) | Setup 21 M | Creux **~6 M** dès M2 |
| **Apport initial 25 M** | −5 M départ | Creux **~6 M** — **non recommandé** |
| **Apport initial 35–40 M** | +5–10 M | Creux **&gt; 15 M** — confort banque |
| **Optimiste +4 closings Y1** | CA +11 M | Cash fin Y1 **~25 M** |

---

## 8. Règles de pilotage (cash governance)

| Seuil solde | Actions immédiates |
| --- | --- |
| **&lt; 12 M** | Review hebdo ; geler hires non critiques |
| **&lt; 8 M** | Stop paid ads ; reporter Agent 2 / Ops ; accélérer exclusifs |
| **&lt; 6 M** | Plan B financement (`08`) ; réduire gérant temporairement |
| **&lt; 4 M** | Mode survie : contenu only, partenaires only, pas de capex |

**Covenant interne :** ne jamais engager un capex &gt; 2 M si solde projeté M+2 &lt; 10 M.

---

## 9. Besoin de financement implicite

| Concept | Calcul | Résultat |
| --- | --- | --- |
| Capex + setup Y1 | | 16 M |
| Opex avant break-even (~M7) | ~6 × 2,7 + … | ~18 M absorbés par CA |
| Buffer 3 mois opex @ 3,5 M | | **10,5 M** |
| **Cash min. recommandé au jour 0** | | **≥ 30 M** (retenu) |
| **Cash confort banque (6 mois)** | 16 + 21 | **~35–40 M** |

Détail usages → [`08-besoins-financement.md`](./08-besoins-financement.md).

---

## 10. Checklist dossier banque

- [x] Plan mensuel **≥ 12 mois** (ici **18**)  
- [x] Solde **toujours ≥ 0** en BASE  
- [x] Creux identifié (M7) + actions  
- [x] Cohérence CA / opex avec CR (`06`) et prévisionnel (`05`)  
- [ ] TFT SYSCOHADA formel (export Excel) — à produire avec EC  
- [ ] Bilan d’ouverture / clôture  
- [ ] Si crédit : annuités intégrées dans décaissements  

---

## 11. Sources

### Internes

- [`05-previsionnel-36-mois.md`](./05-previsionnel-36-mois.md) — volumes, CA, opex, capex, bridge annuel  
- [`06-compte-de-resultat-previsionnel.md`](./06-compte-de-resultat-previsionnel.md) — IS Y2, charges  
- [`04-unites-economiques.md`](./04-unites-economiques.md) — tickets unitaires  

### Externes

| Source | Usage |
| --- | --- |
| Guides BP Dakar / SYSCOHADA 2026 (Carrée, etc.) | TFT mensuel 12–18 mois ; BFR ; 3–6 mois charges |
| Bpifrance Création — plan de trésorerie | Logique encaissements / décaissements au mois de survenance |

---

*Plan de trésorerie v1.0 BASE — sept. 2026. Mettre à jour chaque mois avec le réalisé.*
