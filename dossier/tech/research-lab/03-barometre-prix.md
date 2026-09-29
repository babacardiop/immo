# Baromètre prix — Méthodo indices

**Document :** Dossier · Tech · Research lab · 03  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-mission-lab.md`](./01-mission-lab.md) · [`02-catalogue-datasets.md`](./02-catalogue-datasets.md) · [`../../../docs/research-lab/strategy.md`](../../../docs/research-lab/strategy.md)  
**Aval :** [`04-outils-publics.md`](./04-outils-publics.md) · carte prix add-on `52` · Observatoire public · estimation vendeur  
**Dataset sortie :** **DS-A05** (indice agrégé OWN)

> **Objectif :** produire des **indices de prix affichés** (vente & location) par strate, traçables et honestes — pas un AVM magique, pas un cadastre transactionnel (inexistant en open data SN).

---

## 0. Verdict méthodo (EverGreen)

| Question | Choix Y1–Y2 |
| --- | --- |
| Base de prix | **Prix affichés** (asking) après **dédup** — pas transactions notariées |
| Statistique centrale | **Médiane** (pas moyenne — outliers standing) |
| Unité | **FCFA / m²** (bâti) · **FCFA / m² terrain** ou **prix lot** (terrains) · **FCFA / mois** (loyers) |
| Ajustement qualité | **Stratification** d’abord · hedonic **plus tard** (L4+) si n suffisant |
| Repeat-sales | Non Y1 (trop peu de reventes tracées) |
| Publication | Agrégats + n + période + disclaimer asking |

**Pourquoi pas hedonic d’emblée :** literature (IMF / Eurostat / CSO) privilégie hedonic ou repeat-sales pour un *true* HPI — mais exige caractéristiques riches et volumes. Au SN, open data = surtout **annonces** ; on commence par **médiane stratifiée sur PropertyEntity**, puis on monte en gamme.

**Biais asking :** spread asking↔transaction existe et varie (études Berlin etc.). On le dit toujours : *« prix demandés observés en ligne, pas prix de closing. »*

---

## 1. Famille d’indices

| Code | Nom | Périmètre | Unité | Public ? |
| --- | --- | --- | --- | :---: |
| **IX-SALE-M2** | Indice vente bâti | Apparts / maisons par quartier | FCFA/m² médian | ● agrégé |
| **IX-LAND** | Indice terrains | Terrains par zone / statut papier | FCFA/m² ou médiane lot | ● |
| **IX-RENT** | Baromètre loyers | Location résidentielle | FCFA/mois médian | ● |
| **IX-DOM** | Days-on-market | Entités actives | Jours médians | ○ puis ● |
| **IX-DROP** | Price-drop rate | % entités baissées / 30–90 j | % | Interne → lead |
| **IX-ICC-BRIDGE** | Pont matériaux | ICC/IMC ANSD vs barème simu | Index 100 | Interne outils |

Observatoire trimestriel = **IX-SALE-M2 + IX-RENT + contexte ANSD (ICAS/ICC)** + note méthodologique.

---

## 2. Unité d’observation

### 2.1 PropertyEntity (obligatoire)

Sans dédup, multi-post = **faux volume** et médiane faussée.

```
ListingObservation (source, date, prix, m², texte, photos)
        → score match → PropertyEntity (bien réel)
                → snapshot prix courant = dernière obs. « active »
```

Règles (alignées `strategy.md`) :

| Score match | Action |
| ---: | --- |
| ≥ 0,90 | Auto-merge |
| 0,70–0,89 | Review humaine |
| &lt; 0,70 | Entités séparées |

### 2.2 Snapshot « actif »

Une entité entre dans le pool d’indice si :

- [ ] Obs. dans la **fenêtre** (ex. 90 j glissants vente · 60 j location)  
- [ ] Statut ≠ vendu/loué/expiré (si signal)  
- [ ] m² renseigné **ou** imputable (voir §4)  
- [ ] Quartier normalisé (thesaurus **DS-F01**)  
- [ ] Prix &gt; 0 et dans bornes anti-spam (§4)

Si plusieurs sources actives : **prix médian des obs. actives** de l’entité (ou dernière obs. la plus récente — figer la règle en code et la documenter).

---

## 3. Stratification (mix-adjustment lean)

Découper avant de médianiser — évite de mélanger Almadies standing et Keur Massar.

### 3.1 Strates vente bâti (IX-SALE-M2)

| Dimension | Modalités Y1 |
| --- | --- |
| **Geo** | Quartier thesaurus Z1 d’abord (Almadies, Ngor, Ouakam, Mermoz, Sacré-Cœur, Point E…) puis communes |
| **Type** | Appartement · Maison/Villa · (Studio séparé si n≥) |
| **Standing soft** | Standard · Standing (heuristique texte/prix — optionnel L2) |
| **Période** | Mois · Trimestre |

**Publication mini :** strate affichée seulement si **n ≥ 8** entités (Y1) · sinon « n insuffisant » ou remonter au niveau commune.

### 3.2 Strates terrains (IX-LAND)

| Dimension | Modalités |
| --- | --- |
| Geo | Zone (Z1 / couronne / Petite Côte / secondaire) |
| Papier déclaré | TF · Bail · Délibération · Inconnu (**ne jamais fusionner** TF et délibération) |
| Surface | Buckets (&lt;150 · 150–300 · 300–500 · &gt;500 m²) |

### 3.3 Strates loyers (IX-RENT)

| Dimension | Modalités |
| --- | --- |
| Geo | Quartier / arrondissement |
| Typologie | Chambre · F2 · F3 · F4+ · Villa |
| Meublé | Oui / Non / ND |

**Attention biais haut de gamme** des classifieds (déjà noté EM-01 : médiane app Dakar affichée ~950k vs CAHF « marché large » bien plus bas). Toujours **segmenter** et citer le biais.

---

## 4. Nettoyage & exclusions

| Filtre | Règle |
| --- | --- |
| Prix aberrants | Winsorize ou drop hors **P1–P99** intra-strate · ou bornes métier (ex. bâti Z1 hors 50k–10 M FCFA/m²) |
| m² manquant | Imputer depuis texte (« 120 m² ») si parse OK · sinon **exclure** du /m² (garder pour IX-LAND lot) |
| Promo / VEFA stock | Flag `promoteur` · série séparée ou exclure de l’indice résidentiel secondaire |
| Doublons non mergés | Ne pas compter 3 listings = 3 biens |
| Devise | Tout en **FCFA** · convertir € au taux fixe documenté du jour crawl |
| Spam / « prix sur demande » | Exclure |

Loguer `excluded_reason` pour audit méthodo.

---

## 5. Formules

### 5.1 Médiane de strate (cœur)

Pour strate \(s\) et période \(t\) :

\[
P_{s,t}^{\text{med}} = \mathrm{median}\{\, p_i / m_i \,\} \quad i \in \text{PropertyEntity actifs de } s
\]

- \(p_i\) = prix asking snapshot  
- \(m_i\) = surface m² utile / construite (bâti) ou surface terrain  

**Communiquer :** médiane · **n** · P25–P75 (si n≥12) · période · zone.

### 5.2 Indice base 100 (option Observatoire)

Choisir période de base \(t_0\) (ex. T3 2026) :

\[
I_{s,t} = 100 \times \frac{P_{s,t}^{\text{med}}}{P_{s,t_0}^{\text{med}}}
\]

Utile pour courbes ; **toujours** afficher aussi le niveau FCFA.

### 5.3 DOM (IX-DOM)

\[
\mathrm{DOM}_i = \text{date_fin_active} - \text{date_première_obs}
\]

Médiane DOM par strate — signal liquidité / négociation vendeur.

### 5.4 Price drop (IX-DROP)

Entité avec ≥2 snapshots : baisse ≥ **5 %** sur 30/60/90 j → flag.  
Taux = % d’entités actives flaguées — alimente **lead radar** (interne).

### 5.5 Hedonic (roadmap L4+)

Quand n et champs suffisent (quartier, m², pièces, type, standing) :

- Régression log-prix ~ caractéristiques + dummies temps  
- Indice = coefficient temps (qualité constante)

**Ne pas** publier hedonic avant validation GER + note méthodo dédiée.

---

## 6. Fenêtres & fraîcheur

| Indice | Fenêtre obs. | Refresh calcul | Publish |
| --- | --- | --- | --- |
| IX-SALE-M2 | 90 j glissants | Hebdo (L2+) | Mensuel soft · **Trimestriel** Observatoire |
| IX-LAND | 120 j | Hebdo | Trimestriel |
| IX-RENT | 60 j | Hebdo | Mensuel / trim. |
| IX-DOM / DROP | Continu | Quotidien lab | Interne d’abord |

`retrieved_at` / `computed_at` obligatoires (gouvernance `06`).

---

## 7. Disclaimers (copy canonique)

**Court (carte / fiche) :**

> *Prix demandés observés en ligne (annonces), dédupliqués. Ce ne sont **pas** des prix de transaction notariés. n = … · période = …*

**Long (Observatoire) :**

> *L’indice EverGreen mesure l’évolution des **prix affichés** sur un panel d’annonces après élimination des doublons cross-plateformes. Il ne remplace pas une expertise ni un EDR. Biais possible : sur-représentation standing / multi-post résiduel / m² déclaratifs. Sources : [liste] · Méthodo v1.0.*

**Interdit marketing :** « Prix officiel du m² à Dakar » · « Valeur garantie » · confondre avec ICC ANSD (coût **construction**, pas prix de revente).

---

## 8. Lien outils & produits

| Produit | Indice consommé |
| --- | --- |
| Carte prix/m² (add-on `52`) | IX-SALE-M2 · IX-LAND |
| Estimation vendeur | Comps strate + n + DOM |
| Simu construction | **IX-ICC-BRIDGE** (ANSD) — pas IX-SALE |
| Blog / LinkedIn Observatoire | Niveaux + indices 100 + ICAS contexte |
| Lead radar agents | IX-DROP · multi-source · DOM élevé |
| Pack diaspora | Citations indices + disclaimer confiance |

---

## 9. Contrôles qualité (QA)

| Check | Seuil / action |
| --- | --- |
| n strate | &lt; 8 → ne pas publier niveau |
| MoM jump | \|Δ\| &gt; 25 % → review manuel (composition / bug) |
| Couverture Z1 | % quartiers avec n≥8 |
| Dédup rate | % listings mergés · file review &lt; 48 h |
| Concordance externe | Contrast CAHF / EM-01 fourchettes — pas égalité forcée |

**Benchmark interne (ordres EM-01, à ne pas figer comme vérité) :** Almadies/Ngor bâti affiché ~1,1–2,5 M FCFA/m² · Mermoz/Point E ~0,5–1,6 M — le lab doit **converger ou expliquer** l’écart.

---

## 10. Phasage méthodo

| Phase | Livrable baromètre |
| --- | --- |
| **L0** | Ce doc + thesaurus + extraction ICC CSV (pont simu) |
| **L1** | Médiane manuelle 1 source · 2–3 quartiers Z1 · table Excel |
| **L2** | Pipeline auto · IX-SALE-M2 + IX-RENT Z1 · API interne A05 |
| **L3** | IX-DOM / DROP → CRM |
| **L4** | Observatoire public trimestriel + note méthodo PDF |
| **L5+** | Hedonic exploratoire · multi-ville |

---

## 11. Gouvernance méthodo

| Rôle | Responsabilité |
| --- | --- |
| **CT / data** | Calcul · QA · version méthodo |
| **GER** | A — publication chiffres publics |
| **AC** | Usage comps · feedback terrain |
| **Avocat** | Review ToS si crawl scale |

Versioning : `method_barometre_v1.0` · tout changement de formule = bump + changelog Observatoire.

---

## 12. Anti-patterns

| Ne pas faire | Pourquoi |
| --- | --- |
| Moyenne simple sur listings bruts | Outliers + multi-post |
| Fusionner TF et délibération | Mensonge papier |
| Publier sans n | Irreproductible |
| Appeler ça « prix de marché officiel » | Asking ≠ closing |
| Utiliser 221.sn / Numbeo comme série | Secondaire incohérent (`02`) |
| Retarder Vague 1 pour hedonic parfait | Anti-dispersion |

---

## 13. Sources

### Internes

`strategy.md` (dédup) · `02-catalogue` (DS-A*) · EM-01 fourchettes · mission lab · add-on carte `52`.

### Externes (méthodo)

| Source | Insight |
| --- | --- |
| IMF WP 16/213 · Eurostat HPI handbook | Hedonic / repeat-sales / stratification |
| CSO RPPI notes | Médiane vs mean · hedonic pour pure price change |
| Recherches asking vs transaction | Asking = proxy biaisé · disclaimer obligatoire |
| Pratique observatoires privés SN | Panels affichés petits · toujours donner n |

---

## 14. Liens

| Doc | Rôle |
| --- | --- |
| [`02-catalogue-datasets.md`](./02-catalogue-datasets.md) | DS-A04 / A05 |
| [`05-pipeline-data.md`](./05-pipeline-data.md) | Collecte → calcul |
| [`06-gouvernance-sources.md`](./06-gouvernance-sources.md) | Citation · fraîcheur |
| [`../../../docs/add-ons/specs/01-outils-simulateurs/52-carte-prix-m2.md`](../../../docs/add-ons/specs/01-outils-simulateurs/52-carte-prix-m2.md) | Surface produit |
| [`../../etude-de-marche/01-analyse-sectorielle.md`](../../etude-de-marche/01-analyse-sectorielle.md) | Fourchettes contexte |

---

*Baromètre prix EverGreen v1.0 — sept. 2026. Médiane stratifiée sur prix affichés dédupliqués · hedonic plus tard · honesty asking-first.*
