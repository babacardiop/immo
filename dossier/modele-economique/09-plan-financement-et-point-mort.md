# Plan de financement & seuil de rentabilité (point mort)

**Document :** Dossier · Modèle économique · 09  
**Statut :** v1.0 — sept. 2026  
**Scénario :** **BASE** · Unité : **millions de FCFA** (sauf mention)  
**Amont :** [`08-besoins-financement.md`](./08-besoins-financement.md) · [`06-compte-de-resultat-previsionnel.md`](./06-compte-de-resultat-previsionnel.md) · [`07-plan-tresorerie.md`](./07-plan-tresorerie.md) · [`04-unites-economiques.md`](./04-unites-economiques.md)  
**Aval :** [`10-scenarios.md`](./10-scenarios.md) · [`11-dossier-subvention-levee.md`](./11-dossier-subvention-levee.md)

---

## 0. Synthèse

| Élément | Verdict BASE |
| --- | --- |
| **Plan de financement initial** | Emplois = ressources = **30 M** (option A) ou **38 M** (option B confort) |
| Structure | **100 % fonds propres / CCA** en BASE ; dette FONGIP possible en option B |
| **Seuil de rentabilité cash Y1** | **~56 M** de CA (≈ CA prévu 55,9 M → **quasi à l’équilibre EBE**) |
| **Seuil EBIT Y1** (avec amort.) | **~64 M** de CA → perte d’exploitation **attendue** Y1 |
| **Point mort opérationnel** | **~2 closings / mois** (+ gestion naissante) dès opex lean |
| **Point mort calendaire Y2** | ~**septembre** (jour ~264) — marge de sécurité **~28 %** |
| Message banque | Structure équilibrée, asset-light, rentabilité cash dès Y2 |

---

## 1. Cadre & formules

### 1.1 Plan de financement initial (emplois / ressources)

Conforme pratique **Bpifrance Création** / dossiers **OHADA–SYSCOHADA** attendus par les banques SN (Carrée 2026) :

> Tableau à **deux colonnes** : besoins du jour 0 (emplois) = sources mobilisées (ressources).  
> Équilibre **au franc près**. Pas de stock foncier dans les emplois.

| Emplois typiques | Ressources typiques |
| --- | --- |
| Immobilisations incorporelles / corporelles | Capital social |
| Frais d’établissement | Comptes courants d’associés (CCA) |
| Dépôts / garanties bloquées | Emprunts moyen terme |
| BFR / trésorerie de sécurité | Love money, subventions d’investissement |

**Norme UEMOA / banques SN :** apport personnel souvent **≥ 25–30 %** du projet ; runway **3–6 mois** de charges.

### 1.2 Seuil de rentabilité & point mort

| Notion | Formule | Unité |
| --- | --- | --- |
| Marge sur coûts variables (MCV) | CA − charges variables | M FCFA |
| Taux de MCV (TMCV) | MCV ÷ CA | % |
| **Seuil de rentabilité (SR)** | Charges fixes ÷ TMCV | M FCFA de CA |
| **Point mort** | (SR ÷ CA annuel) × 365 | jours |
| **Marge de sécurité** | (CA − SR) ÷ CA | % |

*Réf. méthode PME : Guide des CE / Cadrio / Clementine — SR = CF / TMCV ; point mort = traduction temporelle.*

**Convention EverGreen :**

| Variante | Charges fixes retenues | Usage |
| --- | --- | --- |
| **SR cash (EBE ≈ 0)** | Opex fixe cash (`06`) | Pilotage trésorerie / runway |
| **SR comptable (RE ≈ 0)** | Opex cash + **dotations** | Lecture banque / P&L |
| **SR unitaire** | Opex mensuel ÷ marge / closing | Ops terrain |

---

## 2. Plan de financement initial — option A (retenue BASE)

### 2.1 Tableau emplois / ressources (30 M)

| **EMPLOIS** | M FCFA | **RESSOURCES** | M FCFA |
| --- | ---: | --- | ---: |
| Immobilisations incorporelles (site Vague 0–1 + outils) | **10,0** | Capital social | **20,0** |
| Immobilisations corporelles (PC, téléphonie) | **0,8** | CCA fondateurs | **10,0** |
| Frais d’établissement (SARL, notaire, RCCM, NINEA) | **0,6** | Emprunts bancaires | **0,0** |
| Identité / photo / templates | **1,5** | Love money / associés | **0,0** |
| Conformité (carte pro, garantie financière, RC) | **2,0** | Subventions | **0,0** |
| Dépôt de garantie loyer + 1ʳᵉs mois | **1,3** | | |
| Capex produit restant Y1 (Vague 2–3) | **2,0** | | |
| **Trésorerie de sécurité / buffer opex** | **10,8** | | |
| Contingence | **1,0** | | |
| **TOTAL EMPLOIS** | **30,0** | **TOTAL RESSOURCES** | **30,0** |

```
EMPLOIS                              RESSOURCES
████████████ Capex digital 10,0      ████████████████████ Capital 20,0
████         Capex / setup  7,2      ██████████          CCA     10,0
███████████  Buffer        10,8
█            Contingence    1,0
═══════════════════════════════════════════════════════════════════
                         30,0  =  30,0
```

**Équilibre :** ✅ emplois = ressources.

### 2.2 Lecture banque

| Critère | Situation A |
| --- | --- |
| Fonds propres / total | **100 %** |
| Dette / total | 0 % |
| Capex / total | ~47 % (aligné `08`) |
| Buffer / total | ~36 % (+ contingence) |
| Stock / foncier | **0** |
| Autonomie financière | Maximale ; pas de charge d’intérêts Y1 |

**Point d’attention :** partie de la **garantie financière** peut être **bloquée** → cash libre &lt; 30 M. Traiter le buffer sur la base du **cash disponible** (`07`).

---

## 3. Plan de financement initial — option B (confort dossier)

### 3.1 Tableau emplois / ressources (38 M)

| **EMPLOIS** | M FCFA | **RESSOURCES** | M FCFA |
| --- | ---: | --- | ---: |
| Capex / setup (étendu + marketing ramp) | **16,0** | Capital social | **18,0** |
| Buffer opex 5–6 mois | **18,0** | CCA / love money | **7,0** |
| Contingence | **4,0** | Crédit investissement 3–5 ans | **13,0** |
| **TOTAL** | **38,0** | **TOTAL** | **38,0** |

| Indicateur | Valeur |
| --- | --- |
| Equity + CCA / total | **25 / 38 ≈ 66 %** (≥ 30 % exigé) |
| Dette / total | **34 %** |
| Garantie FONGIP (cible) | jusqu’à **50–80 %** du crédit (via banque) |
| Charge financière indicative | 13 M × ~10–12 % ≈ **1,3–1,6 M / an** (si activée) |

### 3.2 Montage dette + FONGIP (si option B)

| Étape | Acteur | Contenu |
| --- | --- | --- |
| 1 | Fondateurs | Libérer equity **avant** demande crédit |
| 2 | Banque partenaire | SGBS, BHS, Ecobank, BICIS… — dossier `06`+`07`+`09` |
| 3 | **FONGIP** | Garantie via la banque ; quotité courante **50–70 %**, plafond théorique **80 %** ; TPE jusqu’à ~50 M garantis |
| 4 | Diaspora (option) | Sous-fonds type **FOGARISE** si co-investisseur extérieur (garantie 40–80 %, jusqu’à 500 M) |
| 5 | Décision | Crédit investissement 3–5 ans ; taux négociés parfois **&lt; 9–10 %** avec garantie vs **9–14 %** marché |

**BASE recommande :** démarrer en **option A**, ouvrir la dette **après 6–12 mois** de CA tracé (lignes digitales banques) — éviter intérêts sur Y1 d’investissement.

### 3.3 Ce qui n’entre pas au plan initial

| Exclu | Motif |
| --- | --- |
| Achat terrains / lots | Asset-light (`01`) |
| Crédit stock / promotion | Hors modèle |
| Série A PropTech | Trop tôt ; cash-flow agency d’abord |
| Microfinance haut taux | Ticket / coût inadaptés |

---

## 4. Plan de financement pluriannuel (Y1–Y3)

Vue « emplois / ressources » **en fin d’exercice** (logique plan financier OHADA, hors bilan détaillé).

| | **Y1** | **Y2** | **Y3** |
| --- | ---: | ---: | ---: |
| **Emplois** | | | |
| Capex net de l’année | 16,0 | 3,0 | 4,0 |
| Variation BFR / buffer (net) | +14,0* | reconstitution | reconstitution |
| Remboursement dette (si B) | 0 | (2–3) | (2–3) |
| **Ressources** | | | |
| Apports jour 0 | 30,0 | 0 | 0 |
| CAF / autofinancement approx.** | −0,1 | +24 | +51 |
| Nouveaux emprunts | 0 | 0 | 0 |
| **Solde trésorerie fin (`07`)** | **~11–14** | **~32** | **~70+** |

\*Buffer initial consommé puis reconstitué par le CA.  
\*\*Proxy : EBE (`06`) — avant IS / WCR fins.

**Lecture :** après l’apport initial, le modèle **s’autofinance** dès Y2 (EBE positif). Pas de 2ᵉ levée obligatoire en BASE.

---

## 5. Seuil de rentabilité — calcul formel (P&L `06`)

### 5.1 Décomposition charges (rappel)

| Poste | Y1 | Y2 | Y3 |
| --- | ---: | ---: | ---: |
| CA | 55,9 | 126,6 | 193,8 |
| Charges variables | 18,9 | 39,8 | 58,9 |
| **MCV** | **37,0** | **86,8** | **134,9** |
| **TMCV** | **66,2 %** | **68,6 %** | **69,6 %** |
| Charges fixes cash | 37,1 | 62,7 | 83,1 |
| + Dotations | 5,3 | 5,3 | 5,3 |
| **CF cash** | **37,1** | **62,7** | **83,1** |
| **CF + amort.** | **42,4** | **68,0** | **88,4** |

*TMCV élevé (~66–70 %) : métier de services (peu d’achats) ; le levier principal reste le **volume de closings**, pas la compression COGS.*

### 5.2 Seuil de rentabilité en valeur

| Année | **SR cash** (EBE = 0) | **SR comptable** (RE = 0) | CA prévu | Écart vs SR cash |
| --- | ---: | ---: | ---: | --- |
| **Y1** | **37,1 / 0,662 = 56,0** | **42,4 / 0,662 = 64,0** | 55,9 | **≈ −0,1 M** (EBE ≈ 0) |
| **Y2** | **62,7 / 0,686 = 91,4** | **68,0 / 0,686 = 99,1** | 126,6 | **+35,2 M** au-dessus |
| **Y3** | **83,1 / 0,696 = 119,4** | **88,4 / 0,696 = 127,0** | 193,8 | **+74,4 M** au-dessus |

### 5.3 Point mort calendaire & marge de sécurité

| Année | Point mort cash (jours) | ≈ date (exercice civil) | Marge de sécurité |
| --- | ---: | --- | ---: |
| **Y1** | (56,0 / 55,9) × 365 ≈ **366** | **Fin d’année / hors année** | **~0 %** (fil du rasoir) |
| **Y2** | (91,4 / 126,6) × 365 ≈ **264** | **~ mi-septembre** | **(126,6−91,4)/126,6 ≈ 28 %** |
| **Y3** | (119,4 / 193,8) × 365 ≈ **225** | **~ mi-août** | **≈ 38 %** |

```
Y1  CA ████████████████████░░░░  SR cash ──┐ quasi collés
Y2  CA ████████████████████████████████    SR ████████████████░░░░  MS 28%
Y3  CA ████████████████████████████████████████  SR ████████████░░░░  MS 38%
```

**Interprétation :**

- **Y1** : l’entreprise est conçue pour être **à l’équilibre cash d’exploitation** (EBE ≈ 0) ; la perte nette vient surtout des **amortissements** (investissement digital).  
- **Y2** : vrai **franchissement** du seuil — ~3 mois de marge avant clôture.  
- **Y3** : marge de sécurité confortable pour absorber un stress closings (`10`).

### 5.4 Sensibilité du seuil (Y2)

| Hypothèse | TMCV | CF cash | SR | Δ vs BASE |
| --- | ---: | ---: | ---: | --- |
| BASE | 68,6 % | 62,7 | **91,4** | — |
| Split agents +5 pts (TMCV −3 pts) | 65,6 % | 62,7 | **95,6** | +4,2 |
| Opex +10 % | 68,6 % | 69,0 | **100,6** | +9,2 |
| Mix gestion↑ (TMCV +2 pts)* | 70,6 % | 62,7 | **88,8** | −2,6 |

\*La gestion a des COGS bas (frais Wave) → améliore le TMCV blended.

---

## 6. Point mort opérationnel (unités)

### 6.1 Closings nécessaires

Hypothèses `04` / `05` :

| Paramètre | Valeur |
| --- | --- |
| Marge contribution / closing vente médian | **~1,45–1,5 M** |
| Opex fixe lean M1–M5 | **~2,6 M / mois** |
| Opex fixe M7–M12 | **~3,5 M / mois** |

| Opex mensuel | Closings / mois pour couvrir (hors gestion) |
| --- | ---: |
| 2,6 M | **~1,7** |
| 3,0 M | **~2,0** |
| 3,5 M | **~2,3** |
| 4,0 M | **~2,7** |

**Règle de pilotage (retenue) :**

> **≥ 2 closings / mois** en moyenne glissante + démarrage gestion = **point mort ops Y1**.

### 6.2 Effet levier de la gestion locative

| Lots en gestion | Contribution nette / mois (hyp. ~20k/lot) | Closings « évités » |
| --- | ---: | ---: |
| 10 | 0,2 M | −0,1 |
| 40 | 0,8 M | −0,5 |
| 80 | 1,6 M | −1,1 |

→ À **40 lots**, le seuil tombe vers **~1,5–1,8 closings / mois** à opex 3,5 M.

### 6.3 Contribution partenaires (apports)

CA apports Y1 **7,2 M** (`06`) — MCV quasi élevée si lead déjà payé par le funnel.  
**~0,5–0,6 M / mois** de contribution moyenne Y1 = équivalent **~0,3–0,4 closing**.

**Mix point mort ops réaliste T4 Y1 :**

```
2 closings vente  → ~3,0 M marge
+ mise en loc     → ~0,3–0,5 M
+ gestion early   → ~0,2–0,4 M
+ apports         → ~0,5 M
────────────────────────────────
≈ 4,0–4,4 M  ≥  opex 3,5 M  ✅
```

---

## 7. Calendrier d’atteinte (lien trésorerie `07`)

| Mois | Signal |
| --- | --- |
| M1–M3 | Sous le seuil unitaire ; burn couvert par apport |
| M4–M6 | Approche ~1–2 closings / mois ; creux encore possible |
| **M7** | **Creux de trésorerie** (~11 M restants en A) — ne pas confondre avec point mort P&L |
| **T4 (M10–M12)** | **Point mort ops** si rampe respectée |
| **Fin Y1** | SR cash annuel **atteint** (EBE ≈ 0) ; RE encore négatif (amort.) |
| **Y2 ~sept.** | Point mort calendaire cash franchi ; RN positif sur l’année |

**Distinction critique pour le banquier :**

| Concept | Signifie |
| --- | --- |
| Creux de cash M7 | Timing des encaissements vs opex — **couvert par le buffer** |
| Point mort ops | Volume mensuel qui couvre les fixes |
| SR annuel | CA annuel qui annule le résultat (cash ou comptable) |

---

## 8. Objectifs de vente dérivés du seuil

| Horizon | Objectif lié au SR |
| --- | --- |
| Y1 | CA **≥ 56 M** (plan = 55,9) → **ne pas glisser** sous 50 M sans couper opex |
| Y2 | CA **≥ 91 M** minimum vital ; plan **127 M** = marge de sécu 28 % |
| Mensuel run-rate | CA **≥ ~4,7 M / mois** (Y1 SR) ; **≥ ~7,6 M / mois** (Y2 SR) |
| Closings | **≥ 2 / mois** moyenne ; **≥ 24 / an** plancher Y1 vente |

**Alerte rouge :** 2 mois consécutifs &lt; 1 closing **et** pipeline &lt; 4 mandats exclusifs → plan de réduction opex (`10` pessimiste).

---

## 9. Ratios de structure financière (lecture dossier)

| Ratio | Option A (J0) | Cible Y2 |
| --- | --- | --- |
| Capitaux propres / total ressources | 100 % | Autofinancement |
| Dettes financières / capitaux | 0 | 0 (BASE) |
| Capacité de remboursement | N/A | CAF ≫ éventuelle annuité |
| Couverture intérêts | N/A | Si dette B : EBE / intérêts ≫ 3 |
| Runway au creux | **~3 mois** opex | **&gt; 6 mois** |

---

## 10. Risques & leviers sur le point mort

| Risque | Effet sur SR | Levier |
| --- | --- | --- |
| Split agent trop généreux | ↑ SR (↓ TMCV) | Plafond 40–45 % ; exclusivité |
| Opex personnel trop tôt | ↑ SR | Recruter **après** 2 closings/mois stables |
| Paid ads CAC &gt; 1,5 M | ↓ marge unitaire | Stop canal si LTV:CAC &lt; 3 (`04`) |
| Retard Vague 0 site | ↓ volume closings | Capex prioritaire J0–M2 |
| Mandats simples (fuite) | ↑ closings nécessaires | Exclusivité d’abord |
| Montée gestion | ↓ SR | Accélérer lots post-location |

---

## 11. Synthèse « une page » pour financeur

```
PLAN DE FINANCEMENT (jour 0)
  Emplois 30 M  =  Capex/setup ~16 M  +  Buffer/BFR ~14 M
  Ressources    =  Capital 20 M  +  CCA 10 M
  (Option B 38 M = +8 M buffer + évent. crédit 13 M / FONGIP)

SEUIL DE RENTABILITÉ
  TMCV ≈ 66–70 %  (services)
  Y1 SR cash ≈ 56 M ≈ CA prévu  →  EBE ≈ 0
  Y1 SR EBIT ≈ 64 M              →  perte comptable attendue
  Y2 SR cash ≈ 91 M  /  CA 127 M →  MS ≈ 28 %  ·  point mort ~sept.
  Ops : ≥ 2 closings/mois + gestion

PAS DE STOCK FONCIER — modèle asset-light
```

---

## 12. Sources

### Internes

- [`08-besoins-financement.md`](./08-besoins-financement.md) — emplois 30/38 M, FONGIP, equity  
- [`06-compte-de-resultat-previsionnel.md`](./06-compte-de-resultat-previsionnel.md) — CA, CV, CF, MCV  
- [`07-plan-tresorerie.md`](./07-plan-tresorerie.md) — creux M7, runway  
- [`05-previsionnel-36-mois.md`](./05-previsionnel-36-mois.md) — point mort qualitatif  
- [`04-unites-economiques.md`](./04-unites-economiques.md) — marge / closing, §12  

### Externes

| Source | Usage |
| --- | --- |
| Bpifrance Création — plan de financement initial | Structure emplois / ressources |
| Guide des CE / Cadrio / Clementine — seuil de rentabilité | Formules SR, TMCV, point mort, marge de sécurité |
| Cabinet Carrée — financement PME Sénégal 2026 | FONGIP jusqu’à 80 % ; taux 9–14 % ; equity ≥ 25–30 % |
| FONGIP / FOGARISE (2025–2026) | Garanties 40–80 % ; TPE/PME ; diaspora |
| Pratiques BP OHADA / SYSCOHADA (UEMOA) | Plan financier 3–5 ans, équilibre emplois-ressources |

---

*Plan de financement & point mort v1.0 — sept. 2026.*
