# Mission du Research Lab — Pourquoi le lab

**Document :** Dossier · Tech · Research lab · 01  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`../../../docs/research-lab/strategy.md`](../../../docs/research-lab/strategy.md) · [`../../../docs/research-lab/README.md`](../../../docs/research-lab/README.md) · [`../../../docs/hub-roadmap.md`](../../../docs/hub-roadmap.md) · [`../../../docs/positioning.md`](../../../docs/positioning.md)  
**Aval :** [`02-catalogue-datasets.md`](./02-catalogue-datasets.md) · [`03-barometre-prix.md`](./03-barometre-prix.md) · [`07-roadmap-lab.md`](./07-roadmap-lab.md)

> **Ce doc = le « pourquoi ».** Architecture, crawl, phases L0–L5 → `docs/research-lab/strategy.md`.  
> Datasets & licences → `02`. Méthodo indices → `03`.

---

## 0. En une phrase

Le Research Lab est le **cerveau marché interne** d’EverGreen : il transforme études officielles + signaux d’annonces (dédupliqués) en **indices, études publiables, calibration d’outils et leads mandats** — sans jamais remplacer l’agence ni republier un miroir de classifieds.

```
Études officielles (ANSD, BM, CAHF…)  +  Crawl classifiés (dédup)
        =  Observatoire immo SN  =  avance asymétrique
```

---

## 1. Pourquoi un lab (et pas « juste le site »)

### 1.1 Le problème de marché

| Constat | Conséquence sans lab |
| --- | --- |
| Prix / m² **opaques** (rumeurs, posts FB) | Estimation vendeur et simus **au doigt mouillé** |
| Même bien **multi-posté** (Expat + CoinAfrique + WA) | Bruit = fausse « liquidité » · mauvaise lecture DOM |
| Études macro riches mais **pas micro temps réel** | Contenu blog générique vs Keur City / presses |
| Classifieds **publient** ; personne **comprend** le marché | Agence sans barème · diaspora sans preuve chiffrée |
| Concurrent PropTech (Noflaye, Yaweet) = outil / vérif | Moat data = rare si on **opère** + **mesure** |

Le hub vend la **confiance** et le **parcours**. Le lab fournit la **matière chiffrée** qui rend cette confiance crédible (Observatoire, carte prix, barèmes).

### 1.2 Ce que le lab n’est pas

| Pas ça | Pourquoi |
| --- | --- |
| Le produit face client | Le métier reste agence curated |
| Un scraper « on vole Expat » | Réputation + ToS ; on publie des **agrégats** |
| Vague 1 / MVP site | Anti-dispersion : hub live d’abord |
| Un centre de recherche académique | Finalité = **décideurs hub** + contenu + outils |
| Un data marketplace Y1 | Pas de revente de bases annonceurs |

### 1.3 Analogie (externe)

Les observatoires immobiliers (ex. centres univ. / Market & Observatory Lab) existent pour **identifier, classer, interpréter et rendre accessibles** données et outils afin d’aider à décider.  
EverGreen reprend l’esprit **observatoire** — en mode **PME** : lean, discret, branché sur le P&L (leads, simus, SEO).

---

## 2. Mission (formulée)

### Mission

> Produire et maintenir une **intelligence marché sénégalaise** actionnable pour EverGreen — cadre macro (études) + micro (annonces dédupliquées) — afin de (1) calibrer les outils, (2) publier un Observatoire crédible, (3) détecter des vendeurs à mandater, (4) nourrir la confiance diaspora et le SEO.

### Vision (horizon)

Devenir la référence **privée** d’indices prix / loyers / délais sur Dakar ouest → national — **sans** devenir un classifieds.

### Principes

| # | Principe | Implication |
| ---: | --- | --- |
| 1 | **Agence first** | Lab au service du closing / gestion — pas l’inverse |
| 2 | **Macro + micro** | PDF ANSD/BM ≠ crawl ; les deux |
| 3 | **Dédup ou rien** | Sans PropertyEntity, pas d’indice sérieux |
| 4 | **Agrégats publics** | Insights oui · annonces concurrentes verbatim non |
| 5 | **Discrétion** | Avantage compétitif **interne** ; message externe = études + agence |
| 6 | **Voie parallèle** | Ne bloque jamais Vague 0–1 |
| 7 | **Éthique / ToS** | Rate-limit · pas FB scrape agressif v1 · PII vendeur non revendue |

---

## 3. Ce que le lab débloque (valeur)

| Output | Usage métier | Visible public ? |
| --- | --- | --- |
| **Indice prix / m²** (quartier × type × période) | Carte prix · estimation vendeur · blog | Oui (agrégé) |
| **Études gold** (loyers Almadies, terrains Bambilor, DOM…) | SEO · LinkedIn · presse · diaspora | Oui (insights) |
| **Lead radar** | Multi-post / price drop → mandat exclusif | **Non** (CRM) |
| **Barèmes simus** | Construction / budget / comps | Interne → outils |
| **Compset agent** | « Aussi à X ailleurs » | Interne |
| **Calibration ICC/IMC** | Simu construction vs réalité matériaux | Interne / notes |

**P&L :** le lab n’est pas une ligne CA Y1 — c’est un **multiplicateur** (meilleure conversion estimation, contenu différenciant, supply exclusif). Budget léger prévu `ME-05` (tech + lab).

---

## 4. Formule Observatoire

```
┌─────────────────────┐     ┌─────────────────────┐
│ Études officielles  │     │ Classifieds crawl   │
│ ANSD ICC/IMC/ICAS   │     │ Expat · CoinAfrique │
│ CAHF · BM · Habitat │     │ + dédup cross-site  │
└──────────┬──────────┘     └──────────┬──────────┘
           │                           │
           └────────────┬──────────────┘
                        v
              ┌───────────────────┐
              │  OBSERVATOIRE SN  │
              │  indices · notes  │
              │  leads · barèmes  │
              └───────────────────┘
```

- **Macro** = cadre (déficit, conjoncture agences, matériaux).  
- **Micro** = prix affichés **réels** après dédup (pas le bruit multi-post).  
- Ensemble = ce que ni classifieds ni blog conseil seul ne livrent.

---

## 5. Place dans le hub (gouvernance)

| Question | Réponse |
| --- | --- |
| Owner | CT / data (lean) · GER A sur claims publics Observatoire |
| Lien Vague hub | **Parallèle** — L0 design **maintenant** · L1 spike **après** Vague 0 |
| Lien produit | Add-ons estimation · carte m² · simu construction |
| Lien marketing | Blog études · LinkedIn · one-pager « données » diaspora |
| Lien étude dossier | `dossier/etude-de-marche` = synthèse ; lab = **série vivante** |

### Anti-dispersion (règles dures)

1. Cataloguer & lire les études (**L0** — fait / à tenir à jour).  
2. Hub Vague 0–1 **live** avant crawl scale.  
3. Spike **1 source** (L1) avant multi-source.  
4. **Interdit** de retarder le site / simus pour « finir le crawler ».  
5. FB automatisé = **L5** seulement si L2–L4 prouvés.

---

## 6. Succès — à quoi on saura que le lab sert

| Horizon | Preuve de mission remplie |
| --- | --- |
| **L0** | PDFs archivés + catalogue datasets lu par GER/CT |
| **L1** | 200–500 annonces 1 source · dédup manuelle validée |
| **L2** | 1ʳᵉ série prix/m² Almadies / Mermoz utilisable estimation |
| **L3** | ≥ 1 lead mandat / mois issu du radar (mesuré CRM) |
| **L4** | **1 Observatoire public / trimestre** cité en com |
| **L5** | Densité multi-source sans incident ToS / réputation |

**KPI santé :** fraîcheur sources · % matches review humaine · 0 republication verbatim concurrents.

---

## 7. Risques si on ignore le lab

| Risque | Effet |
| --- | --- |
| Simus / estimations **non calibrés** | Perte crédibilité Mamadou / vendeurs |
| Contenu SEO **générique** | Impossible de battre blogs sur la fraîcheur chiffrée |
| Agents sans radar | Supply exclusif plus lent / plus cher |
| Surinvestissement crawl trop tôt | Cash brûlé · hub en retard |

---

## 8. Message externe vs interne

| Interne | Externe |
| --- | --- |
| « Lab · crawl · dédup · PropertyEntity » | « Observatoire / études de marché / indices » |
| Lead radar CRM | « On connaît les prix de votre quartier » |
| Jamais | « On aspire Expat-Dakar » |

Aligné Brand Book : preuve avant promesse — le lab **fabrique** une partie des preuves chiffrées.

---

## 9. Prochaines pièces

| Doc | Contenu |
| --- | --- |
| [`02-catalogue-datasets.md`](./02-catalogue-datasets.md) | Sources + licences (ponte `data-sources.md`) |
| [`03-barometre-prix.md`](./03-barometre-prix.md) | Méthodo indices |
| [`04-outils-publics.md`](./04-outils-publics.md) | Calculateurs / cartes / checklists |
| [`05-pipeline-data.md`](./05-pipeline-data.md) | Collecte → publication |
| [`06-gouvernance-sources.md`](./06-gouvernance-sources.md) | Citation · fraîcheur |
| [`07-roadmap-lab.md`](./07-roadmap-lab.md) | L0–L5 × vagues hub + blog |

Détail technique déjà dans [`docs/research-lab/strategy.md`](../../../docs/research-lab/strategy.md).

---

## 10. Sources

### Internes

`docs/research-lab/*` · hub-roadmap · positioning · blog stratégie · étude de marché · ME (budget lab léger).

### Externes (inspiration mission)

| Source | Insight |
| --- | --- |
| Observatoires immo (ex. OCVI² / Market & Observatory Lab) | Mission = identifier · classifier · interpréter · rendre accessible pour décider |
| Vertical SaaS research orgs (2025–26) | Research = avantage catégorie, pas gadget — mais **brancher** au revenue |
| Pratique EverGreen strategy | Dédup = hard problem · lab discret · agrégats publics |

---

*Mission Lab EverGreen v1.0 — sept. 2026. Pourquoi = cerveau marché asymétrique au service de l’agence — pas un 2ᵉ classifieds.*
