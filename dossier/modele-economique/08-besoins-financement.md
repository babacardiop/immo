# Besoins de financement — Capex, opex, buffer, usages

**Document :** Dossier · Modèle économique · 08  
**Statut :** v1.0 — sept. 2026  
**Scénario de référence :** **BASE** ([`05`](./05-previsionnel-36-mois.md) · [`07`](./07-plan-tresorerie.md))  
**Unité :** FCFA (et M = millions)  
**Aval :** [`09-plan-financement-et-point-mort.md`](./09-plan-financement-et-point-mort.md) · [`11-dossier-subvention-levee.md`](./11-dossier-subvention-levee.md)

---

## 0. Synthèse — combien faut-il lever / apporter ?

| Option | Montant jour 0 | Profil | Creux trésorerie Y1 | Verdict |
| --- | ---: | --- | --- | --- |
| **A — Minimum viable** | **30 M** | Apport fondateurs (retenu `05`/`07`) | ~11 M (M7) · ~3 mois opex | **OK serré** |
| **B — Confort banque** | **35–40 M** | Apport + love money / dette légère | Creux &gt; 15 M · 4–6 mois | **Recommandé dossier** |
| **C — Sous-capitalisé** | **≤ 25 M** | — | Creux &lt; 7 M | **Non viable** BASE |
| **D — Scale early** | **50–80 M** | Levée / dette invest. | Buffer large + marketing | Optionnel ; pas requis BASE |

**Besoin retenu pour le dossier :**  
> **30 M minimum** dont **16 M capex/setup** + **~14 M buffer / BFR opex** ;  
> **cible présentation financeurs : 35–40 M** pour coller à la norme « 3–6 mois de charges ».

**Pas de stock foncier** dans le besoin — modèle asset-light.

---

## 1. Capex & setup (investissement initial)

### 1.1 Tableau d’emploi — immobilisations & frais d’établissement

| Poste | Montant | Timing | Nature | Justificatif |
| --- | ---: | --- | --- | --- |
| Site web Vague 0–1 (Next.js, catalogue, SEO base) | **8 000 000** | M1 | Immo. incorporelle | Levier mandats exclusifs (`01`/`03`) |
| Améliorations Vague 2–3 (simus, portails légers) | **2 000 000** | M3–M6 | Immo. incorporelle | Inclus total capex Y1 16 M |
| Identité visuelle, photo, templates share | **1 500 000** | M1 | Charge / incorp. | Marque / confiance |
| Constitution SARL, notaire, RCCM, NINEA | **400 000–800 000** | M0–M1 | Frais établissement | OHADA / APIX |
| Carte pro + **garantie financière** + RC pro | **1 500 000–2 200 000** | M1 | Conformité / parfois bloqué | Loi 82-07 / décret 83-423 |
| Matériel (PC, téléphonie, imprimante) | **800 000** | M1 | Immo. corporelle | |
| Dépôt de garantie loyer + 1ʳᵉs mois | **1 200 000–1 500 000** | M1 | Actif circulant / dépôt | Bureau ~400 k/mois |
| Softs, domaines, comptes Wave/OM marchand | **200 000** | M1 | | |
| **Sous-total capex / setup (cible)** | **~14 000 000** | M1–M2 | | Aligné `05` |
| **+ Capex produit reste Y1** | **~2 000 000** | M3–M6 | | Total Y1 **16 M** |

### 1.2 Fourchettes (sensibilité make vs buy)

| Intensité digital | Capex site + outils Y1 | Commentaire |
| --- | ---: | --- |
| **Lean** (retenu) | 8–12 M | MVP Vague 0–1 |
| **Standard agence digitale** | 12–20 M | Benchmarks « transformation » jusqu’à 6–11 M + récurrent (Kolonell) — on reste sous |
| **Overbuild** | &gt; 25 M | Anti-pattern hub (52 add-ons d’un coup) |

**Règle :** tout euro de capex digital doit servir un KPI (mandat, simu, closing) — sinon reporter.

### 1.3 Ce qui n’est **pas** dans le capex

| Exclu | Pourquoi |
| --- | --- |
| Achat terrains / lots | Asset-light ; hors modèle Y1–Y2 |
| Flotte véhicules | Location ponctuelle / perso |
| Fit-out standing Almadies | Bureau Mermoz / Sacré-Cœur suffisant |
| SaaS white-label pour tiers | Distraction |
| Stock marketing print massif | Digital first |

---

## 2. Opex — besoin de couverture 6 et 12 mois

### 2.1 Charge fixe mensuelle (rappels `05`/`07`)

| Période | Opex fixe / mois | Composition |
| --- | ---: | --- |
| **M1–M5** (lean) | **~2,6 M** | Gérant, 1 agent, contenu, loyer, tech, RC, divers + charges sociales |
| **M6** | **~3,1 M** | + Agent 2 |
| **M7–M12** | **~3,5 M** | + Ops gestion |
| **Moyenne Y1** | **~3,1 M** | 37,1 M / 12 |

*COGS variables (split agents) ne sont **pas** à préfinancer comme opex : ils sortent quand le CA rentre.*

### 2.2 Couverture opex brute (sans recettes)

| Horizon | Calcul | Montant |
| --- | --- | --- |
| **6 mois lean** (si zéro CA) | 6 × 2,6 M | **15,6 M** |
| **6 mois mixte** (M1–6 réel) | 5×2,6 + 3,1 | **16,1 M** |
| **12 mois opex fixe Y1** | | **37,1 M** |
| **3 mois buffer @ 3,5 M** | runway post-creux | **10,5 M** |
| **6 mois buffer @ 3,5 M** | norme banque haute | **21,0 M** |

### 2.3 Opex net à financer (avec recettes BASE)

Le plan `07` montre que le CA absorbe une grande partie de l’opex après M2.  
**Besoin net de trésorerie** ≠ somme des opex 12 mois.

| Approche | Formule | Résultat |
| --- | --- | --- |
| **A — Brute (worst case)** | Capex 16 + opex 12 mois 37 | **53 M** — trop pessimiste (ignore CA) |
| **B — Cash flow BASE** | Capex 16 + buffer pour tenir creux | **~30 M** (retenu) |
| **C — Confort** | Capex 16 + 6 mois opex @ 3,5 | **16 + 21 = 37 M** ≈ option B haute |

**Retenir B/C :** on finance le **trou de trésorerie** (capex + mois déficitaires), pas le P&L entier.

---

## 3. Buffer & BFR

### 3.1 Buffer recommandé

| Niveau | Mois d’opex | FCFA | Usage |
| --- | ---: | ---: | --- |
| Minimal | ~3 | **~10–11 M** | Inclus dans apport 30 M |
| **Cible dossier** | **4–6** | **14–21 M** | Apport 35–40 M |
| Stress (−2 closings) | +5 M | | Voir `07` §7 / `10` |

### 3.2 BFR exploitation

| Poste | Besoin | Commentaire |
| --- | ---: | --- |
| Clients (créances commissions) | **~0–1 M** | Closing cash-heavy |
| Stocks | **0** | Pas de stock |
| Fournisseurs (crédit) | **0 à −0,5 M** | Peu de levier |
| Marketing prepaid | **0,5 M** | |
| **BFR net estimé** | **&lt; 2 M** | Négligeable vs buffer opex |
| Garantie financière (partie bloquée) | Variable | Traiter comme **non disponible** |

**Conclusion BFR :** le dossier ne demande pas une ligne « stock » ; il demande un **fonds de roulement de sécurité salariale / loyer**.

---

## 4. Récapitulatif du besoin total

### 4.1 Emplois des fonds — option A (30 M)

| Emploi | M FCFA | % |
| --- | ---: | ---: |
| Capex / setup (site, conformité, dépôt, matériel) | **14,0** | 47 % |
| Buffer opex / trésorerie (dont 3 mois runway) | **14,0** | 47 % |
| Contingence (retards, IMF éventuelle, imprévus) | **2,0** | 7 % |
| **Total** | **30,0** | **100 %** |

```
Capex/setup ████████████████████░░░░░░░░  47%
Buffer opex ████████████████████░░░░░░░░  47%
Contingence ███░░░░░░░░░░░░░░░░░░░░░░░░░   7%
```

### 4.2 Emplois — option B confort (38 M)

| Emploi | M FCFA | % |
| --- | ---: | ---: |
| Capex / setup | 16,0 | 42 % |
| Buffer 5–6 mois opex | 18,0 | 47 % |
| Contingence + marketing ramp | 4,0 | 11 % |
| **Total** | **38,0** | **100 %** |

### 4.3 Calendrier de décaissement (drawdown)

| Fenêtre | Emplois prioritaires | Cumul décaissé |
| --- | --- | --- |
| **J0–M1** | SARL, garantie, RC, dépôt loyer, 60 % site | ~12–14 M |
| **M2–M3** | Fin site Vague 0–1, identité, 1ʳᵉs salaires | +4–6 M |
| **M4–M6** | Capex simus / portails légers, Agent 2 | +2–3 M |
| **M7–M12** | Buffer consommé / reconstitué par CA | Net ≈ reconstitution |

Les fonds non dépensés restent en **compte courant société** (visibilité banque).

---

## 5. Ressources — d’où vient l’argent ?

### 5.1 Structure cible (option A 30 M)

| Ressource | Montant | % | Commentaire |
| --- | ---: | ---: | --- |
| **Apports en capital / CCA fondateurs** | **25–30 M** | 83–100 % | Priorité ; banques UEMOA aiment **≥ 25–30 %** equity sur projet |
| Love money / diaspora associés | 0–5 M | 0–17 % | Complément option B |
| Crédit bancaire investissement | **0** en BASE | — | Possible plus tard (équipement / BFR) |
| Subvention / concours | 0 | — | Opportuniste (`11`) |
| **Total** | **30 M** | | |

### 5.2 Si montage dette + equity (option B 38 M)

| Ressource | Montant | Notes 2026 SN |
| --- | ---: | --- |
| Equity fondateurs | **20–25 M** (≥ 50–65 %) | Crédibilité |
| Crédit investissement 3–5 ans | **10–15 M** | Taux indicatifs crédits PME **~9–14 %** (Carrée 2026) |
| Garantie **FONGIP** | jusqu’à **80 %** du crédit | Via banque partenaire (SGBS, BHS, Ecobank, BICIS…) ; TPE jusqu’à 50 M garantis / PME jusqu’à 200 M selon dispositifs |
| BNDE / lignes développement | Étudier | Plutôt secteurs prioritaires ; services immo = au cas par cas |

**BASE recommande :** **100 % equity / CCA** pour démarrer (simplicité, pas de charge financière Y1). Introduire la dette **après** 6–12 mois de CA tracé (lignes digitales banques).

### 5.3 Ce qu’on ne cherche pas (Y1)

| Source | Pourquoi pas maintenant |
| --- | --- |
| Série A PropTech (type Yakeey 15 M$) | Pas le positionnement ; cash-flow agency d’abord |
| Crédit stock / promotion | Pas de stock |
| Microfinance taux élevés | Coût / tickets inadaptés |
| Avance sur commissions clients | Risque réputation |

---

## 6. Usages des fonds — narration financeur

> « Nous levons / apportons **30 à 38 millions FCFA** pour lancer une **agence immobilière full-service asset-light** à Dakar.  
> **~45–50 %** financent le **socle digital et la conformité** (site curated, simulateurs, carte pro, garantie, RC).  
> **~45–50 %** constituent un **buffer de trésorerie** permettant de payer l’équipe et le bureau pendant la rampe de mandats (creux M7 couvert avec &gt; 3 mois d’opex).  
> Aucun franc n’est alloué à l’achat de foncier. Le retour passe par commissions de transaction, gestion locative récurrente et apports partenaires — voir P&L `06` et trésorerie `07`. »

### 6.1 KPI de suivi des usages

| Emploi | KPI de preuve |
| --- | --- |
| Site / produit | Vague 0 live ; ≥ N mandats en ligne |
| Conformité | Carte + RC + garantie actives |
| Buffer | Solde mensuel ≥ seuils `07` §8 |
| Marketing (si option B) | LTV:CAC ≥ 3:1 (`04`) |

---

## 7. Tableau « Demande vs couverture »

| Besoin | Montant | Couvert par |
| --- | ---: | --- |
| Capex / setup | 14–16 M | Equity |
| Buffer 3 mois | 10–11 M | Equity |
| Contingence | 2–4 M | Equity |
| Buffer additionnel 2–3 mois (option B) | +8–10 M | Equity ou dette |
| **Total A** | **30 M** | 100 % equity |
| **Total B** | **35–40 M** | Equity ± dette FONGIP |

---

## 8. Risques liés au financement

| Risque | Impact | Mitigation |
| --- | --- | --- |
| Apport promis non libéré | Arrêt Vague 0 | Libération **avant** contrats freelances |
| Garantie financière bloque cash | Moins de dispo | Séparer « cash libre » vs bloqué dans `07` |
| Tentation d’acheter du foncier | Dilution runway | Covenant interne asset-light |
| Crédit trop tôt (intérêts Y1) | Charge financière | Attendre track record |
| Sous-estimation capex digital | Creux anticipé | Cap +2 M déjà en contingence option B |

---

## 9. Prochaines étapes (process)

1. Figer **option A (30 M)** ou **B (38 M)**.  
2. Libérer les fonds sur compte SARL.  
3. Ordonnancer décaissements M1 selon §4.3.  
4. Si dette : préparer dossier banque + FONGIP (`11`) avec `06` + `07` + ce doc.  
5. Calculer point mort formel → [`09`](./09-plan-financement-et-point-mort.md).

---

## 10. Sources

### Internes

- [`05-previsionnel-36-mois.md`](./05-previsionnel-36-mois.md) — capex 16 M, opex 37,1 M, apport 30 M  
- [`07-plan-tresorerie.md`](./07-plan-tresorerie.md) — creux, runway, stress  
- [`06-compte-de-resultat-previsionnel.md`](./06-compte-de-resultat-previsionnel.md) — pas de charge financière BASE  
- [`01-business-model.md`](./01-business-model.md) — asset-light  

### Externes

| Source | Usage |
| --- | --- |
| Financement PME Sénégal 2026 (Carrée) | FONGIP jusqu’à 80 % ; taux crédits 9–14 % ; schéma equity + garantie |
| FONGIP / BNDE | Garanties, orientation dossiers bancables |
| Pratiques UEMOA BP | Apport personnel souvent **≥ 25–30 %** ; 3–6 mois charges en trésorerie |
| Loi 82-07 / décret 83-423 | Coût conformité carte / garantie / RC |

---

*Besoins de financement v1.0 — sept. 2026.*
