# Pipeline data — Collecte → publication

**Document :** Dossier · Tech · Research lab · 05  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-mission-lab.md`](./01-mission-lab.md) · [`02-catalogue-datasets.md`](./02-catalogue-datasets.md) · [`03-barometre-prix.md`](./03-barometre-prix.md) · [`../../../docs/research-lab/strategy.md`](../../../docs/research-lab/strategy.md)  
**Aval :** [`06-gouvernance-sources.md`](./06-gouvernance-sources.md) · [`07-roadmap-lab.md`](./07-roadmap-lab.md) · Pricing API · Observatoire · lead radar

> **Rôle :** décrire le **chemin opérationnel** d’une observation (annonce, PDF ANSD, note web) jusqu’à un **artefact publiable** (indice, calibrage outil, alerte CRM, note Observatoire).  
> Méthodo indices → `03`. Licences → `02`. Citation / SLA fraîcheur → `06`.

**⚠** Pas un runbook d’exploit scrape. Connecteurs = pages publiques · robots.txt · rate-limit · **agrégats only**. Revue juridique avant scale.

---

## 0. En une phrase

Deux rails parallèles (**Institutionnel** + **Classifieds**) atterrissent en couches **raw → staging → curated → serving**, avec un gate **Write–Audit–Publish** avant tout chiffre visible hors lab.

```
Collecte  →  Landing raw (immutable)  →  Normalize / QA
        →  Entity resolve (PropertyEntity)  →  Features / indices
        →  Audit  →  Publish (API · Observatoire · CRM · outils)
```

---

## 1. Principes pipeline (EverGreen)

| # | Principe | Implication |
| ---: | --- | --- |
| 1 | **ELT, pas ETL opaque** | Charger le brut d’abord · transformer versionné · rejouer sans re-crawl |
| 2 | **Raw immuable** | `payload_json` / PDF hashés jamais écrasés · corrections = nouvelles versions |
| 3 | **Deux horloges** | `source_published_at` ≠ `ingested_at` (feed retardé ≠ “frais”) |
| 4 | **WAP** | Write staging → Audit QA → Publish atomique — jamais demi-table publique |
| 5 | **Contract data** | Schéma + champs requis + bornes + fraîcheur max par dataset (`02`) |
| 6 | **Idempotence** | Rejouer la même fenêtre ≠ doubler les observations |
| 7 | **Pas de miroir** | Serving = agrégats / features · 0 catalogue concurrent |
| 8 | **Agence first** | Si ça n’alimente ni outil, ni étude, ni lead → **ne pas crawler** |
| 9 | **Voie parallèle** | Pipeline ne bloque jamais Vague 0–1 hub |

Bench industrie proptech 2025–26 (RealtyAPI, lakehouse RE, lineage AI discovery) : couches séparées · lineage d’événements · metrics qualité (freshness, duplicate rate, unresolved entities) plutôt que seul uptime workers.

---

## 2. Vue d’ensemble — 4 couches

```
┌──────────────────────────────────────────────────────────────────┐
│  LANE A — Institutionnel          LANE B — Classifieds            │
│  ANSD ICC/IMC · CAHF · BM · web   Expat · Immo-au-SN · Coin…     │
└─────────────────┬──────────────────────────────┬─────────────────┘
                  v                              v
┌──────────────────────────────────────────────────────────────────┐
│  ① RAW LANDING — object store + listings_raw / docs_raw           │
│     payload intact · source_id · checksum · ingested_at            │
└────────────────────────────┬─────────────────────────────────────┘
                             v
┌──────────────────────────────────────────────────────────────────┐
│  ② STAGING — parse léger · schéma · quarantine DLQ                │
└────────────────────────────┬─────────────────────────────────────┘
                             v
┌──────────────────────────────────────────────────────────────────┐
│  ③ CURATED — normalize · PropertyEntity · observations · indices │
│     + review humaine (matches 0,70–0,89)                          │
└────────────────────────────┬─────────────────────────────────────┘
                             v
┌──────────────────────────────────────────────────────────────────┐
│  ④ SERVING — Pricing API · CRM alerts · barèmes simu · Observat. │
│     uniquement après gate WAP                                    │
└──────────────────────────────────────────────────────────────────┘
```

| Couche | Stockage cible | Qui lit |
| --- | --- | --- |
| Raw | MinIO/S3 + Postgres `*_raw` | Lab only |
| Staging | Schémas `stg_*` | Transform jobs |
| Curated | `property_entities` · `listing_observations` · `ix_*` | Lab UI · jobs indices |
| Serving | Vues / API versionnées · exports Observatoire | Hub · agents · public **agrégé** |

Stack rappel (`strategy.md`) : **Python workers** (crawl / dédup) + **Postgres/PostGIS** + **Redis queue** · API Node/Next côté hub/CRM plus tard. Lab **à côté** de l’app, pas dans le chemin critique Vague 1.

---

## 3. Les deux lanes de collecte

### 3.1 Lane A — Institutionnel (études / indices officiels)

| Étape | Action | Datasets typiques |
| --- | --- | --- |
| A1 Watch | Calendrier ANSD + RSS/LinkedIn ANSD + bookmarks BM/CAHF | B01–B04 · C* · D* |
| A2 Fetch | Télécharger PDF/XLS · hash SHA-256 · `retrieved_at` | `etudes/pdf/` + MANIFEST |
| A3 Extract | Table → CSV lab (ICC, IMC lignes clés) | DS-B01, B02… |
| A4 Validate | MoM/QoQ cohérents · base 100 documentée | vs note ANSD |
| A5 Serve | Pont **IX-ICC-BRIDGE** → barèmes PUB-02/03 | Outils · Observatoire contexte |

**Cadence réelle ANSD (repères 2026, à re-vérifier) :**

| Série | Fréq. source | Exemple | Action pipeline |
| --- | --- | --- | --- |
| **ICC** | Trimestriel | T1 2026 publié 15 mai · prochaine ~15 août | Watch J+2 · update pont simu |
| **IMC** | Mensuel | Mai 2026 (~fin juin) | Watch mensuel · log MoM |
| **Repères / SES** | Variable | Calendrier ansd.sn | Notes narratif Observatoire |
| CAHF / BM | Ad hoc | Profils PDF | Re-cite avant publish blog |

Pas d’automatisation scrape agressive du site ANSD Y1 : **semi-manuel L0–L1** (checklist + Drive) → script download + parse XLS en L2 si volume.

### 3.2 Lane B — Classifieds (prix affichés)

| Étape | Action | Datasets |
| --- | --- | --- |
| B1 Discover | Liste URLs / pages catégorie (pagination) | DS-A01 |
| B2 Fetch | GET public · delay · honor robots / 429 | Raw |
| B3 Parse | Titre, prix, m², quartier, photos, tél, date | Staging |
| B4 Fingerprint | pHash / embedding photos | DS-A02 |
| B5 Resolve | Blocking + score → PropertyEntity | DS-A04 |
| B6 Observe | Snapshot prix / statut | ListingObservation |
| B7 Aggregate | Médianes strates (`03`) | DS-A05 |

**Priorité sources (`strategy.md`) :**

| Prio | Source | Phase |
| --- | --- | --- |
| P0 | Expat-Dakar · Immobilier-au-Sénégal | L1 (1 source) → L2 |
| P1 | CoinAfrique · Senhectare | L2–L3 |
| P2 | FB groupes | **L5 only** · pas bot v1 |
| P3 | WA / OLX-like | Hors scope Y1 |

**Connecteur = contrat :**

```
source_id, base_url, robots_checked_at, crawl_delay_ms,
fields_map, tos_notes, owner, max_rps, enabled
```

**Éthique crawl (bench 2024–26) :** lire ToS · robots.txt · rate-limit conservateur · pas de bypass login/CAPTCHA · pas de PII revente · photos = fingerprint **interne** seulement · publication = **agrégats transformés**.

---

## 4. Modèle canonique (événements + tables)

### 4.1 Tables (minimal — aligné strategy §9)

| Entité | Rôle |
| --- | --- |
| `Source` | Connecteur + règles crawl |
| `ListingRaw` | Payload immuable |
| `ListingObservation` | Prix/statut à `observedAt` |
| `PropertyEntity` | Bien réel (cluster) |
| `Quartier` | Thesaurus DS-F01 + aliases |
| `MatchReview` | Queue humaine |
| `LeadSignal` | Price-drop / multi-source / DOM |
| `DocRaw` | PDF/XLS institutionnels |
| `SeriesPoint` | Point série officielle (ICC, IMC…) |
| `IndexSnapshot` | IX-* calculé · version méthodo |
| `PublishBundle` | Artefact WAP (Observatoire, API release) |

### 4.2 Lineage (événements à logger)

Chaque étape critique émet un event :

| Event | Champs clés |
| --- | --- |
| `source_acquired` | source_id · url · checksum · ingested_at |
| `parsed` | schema_version · ok / quarantine_reason |
| `normalized` | transform_version |
| `entity_resolved` | score · auto / human · property_id |
| `index_computed` | index_code · n · window · meth_version |
| `audited` | reviewer · pass/fail · notes |
| `published` | channel · bundle_id · public_at |
| `corrected` / `retracted` | motif · remplace bundle_id |

Tables actuelles = **projections** ; l’historique events permet rejeu et audit Observatoire.

---

## 5. Étapes transform (Lane B détail)

```
ListingRaw
  → normalize_currency (→ FCFA, taux documenté)
  → normalize_area_m2 (parse texte)
  → normalize_type (appart / maison / terrain / location)
  → normalize_quartier (thesaurus + aliases)
  → media_fingerprint
  → blocking (quartier + type + m²±20%)
  → match_score (0–1)
  → merge / review / separate
  → upsert PropertyEntity + ListingObservation
```

| Score | Action pipeline |
| ---: | --- |
| ≥ 0,90 | Auto-merge |
| 0,70–0,89 | `MatchReview` · SLA **&lt; 48 h** (L2+) |
| &lt; 0,70 | Entités séparées |

**Idempotence clé :** `(source_id, external_id, observed_day)` unique pour une obs. « active » ; re-crawl = update statut / nouveau snapshot si prix change ≥ seuil (ex. 1 %).

---

## 6. Gate Write–Audit–Publish (WAP)

Aucun chiffre **public** ou **outil prod** sans ce gate.

| Étape | Contenu | Fail → |
| --- | --- | --- |
| **Write** | Calculer indices / barèmes dans schéma `ix_staging` / `bar_staging` | — |
| **Audit** | Checks QA automatiques + spot check humain (L2+) | Bloquer publish · ticket |
| **Publish** | Swap atomique vers `ix_prod` / API · tag `PublishBundle` | Rollback = bundle précédent |

### 6.1 Checklist Audit (indices publics)

- [ ] `n` par strate ≥ seuil (`03` : n≥8 Y1)  
- [ ] \|Δ MoM\| &gt; 25 % → review manuel  
- [ ] `% unresolved` / file review backlog OK  
- [ ] Duplicate rate vs baseline 2 semaines  
- [ ] Disclaimer + `meth_version` + `computed_at` présents  
- [ ] Aucune URL / texte / photo listing concurrent dans le payload public  
- [ ] Licence / citation sources institutionnelles (`02` · bientôt `06`)

### 6.2 Checklist Audit (barèmes simu / ICC bridge)

- [ ] Série ANSD = dernière note connue · `retrieved_at` &lt; SLA  
- [ ] Base 100 documentée (ex. ICC base 100 **2022**)  
- [ ] Écart vs grille négociants (si PART) expliqué  
- [ ] Version barème bumpée → changelog outils

### 6.3 Canaux de publication

| Canal | Contenu autorisé | Gate |
| --- | --- | --- |
| **Pricing API** (interne) | Agrégats strates · n · P25–P75 | WAP auto + alert |
| **Carte / estimation** (hub) | Même · soft CTA | WAP + product OK |
| **Observatoire** (blog/PDF) | Trim. IX + contexte ANSD + méthodo | WAP + GER review |
| **Lead radar → CRM** | Signaux (pas indices publics) | Règles L3 · pas WAP marketing |
| **LinkedIn / presse** | Chiffres **uniquement** depuis PublishBundle | Interdit inventer |

**Comportement stale :** UI affiche dernier bundle vérifié + timestamp · **jamais** zéro silencieux ni chiffre “probable”.

---

## 7. Cadences opérationnelles

| Job | Fréquence cible | Phase | Sortie |
| --- | --- | --- | --- |
| Crawl 1 source | Hebdo → quotidien soft | L1→L2 | Raw + obs |
| Crawl 2ᵉ source | Hebdo | L2 | Cross-dedup |
| Match review queue | Continu (jours ouvrés) | L2+ | Merges |
| Calcul IX-SALE / RENT | Hebdo | L2+ | `ix_staging` |
| Calcul IX-DOM / DROP | Quotidien | L3 | LeadSignal |
| Watch IMC ANSD | Mensuel (J+3 après parution) | L0+ | SeriesPoint |
| Watch ICC ANSD | Trimestriel | L0+ | IX-ICC-BRIDGE |
| Publish soft indices | Mensuel interne | L2–L3 | Slack/Notion lab |
| **Observatoire public** | **Trimestriel** | L4 | Bundle public |
| Recalib barèmes simu | Trim. ou post-ICC | L0+ | PUB-02/03 |

Aligné `03` §6 : fenêtres 90 j vente · 60 j loyer · publish Observatoire **trimestriel**.

---

## 8. Qualité & monitoring (SLO lab)

| Métrique | Pourquoi | Alerte indicative Y1 |
| --- | --- | --- |
| Rows ingested / run | Couverture | −50 % vs médiane 4 runs |
| Parse fail rate | Schéma drift | &gt; 5 % |
| Quarantine / DLQ size | Santé | Croissance 3 j |
| Freshness lag (source) | Stale | &gt; 2× cadence attendue |
| Auto-merge % | Dédup mature | Drift fort vs baseline |
| Review backlog | Capacité humaine | &gt; 48 h P50 |
| Unresolved entity rate | Qualité graphe | &gt; 5 % nouveaux |
| Index n coverage Z1 | Produit carte | % quartiers n≥8 |
| Leads → mandats | ROI | Suivi CRM mensuel |

Dead-letter : classer (`schema` · `network` · `blocked` · `parse`) · owner · replay path. Un connecteur cassé **ne doit pas** stopper les autres (queue isolée / source).

---

## 9. Environnements & promotion

| Env | Données | Règle |
| --- | --- | --- |
| **lab-dev** | Samples / copies anonymisées | Expérimenter transforms |
| **lab-prod** | Vrai raw + curated | Credentials séparés |
| Hub prod outils | **Uniquement** serving publié | Jamais lecture raw classifiés depuis Next public |

- Transforms versionnés (git) · promotion par PR revue  
- Parallel-run avant cutover majeur (1 cycle indices)  
- Secrets crawl hors repo · logs sans PII vendeur en clair

---

## 10. Flux bout-en-bout (exemples)

### 10.1 « Médiane Almadies appartement » (Lane B)

1. Crawl Expat catégorie location/vente Almadies → `ListingRaw`  
2. Parse + normalize quartier=`Almadies` · type=`appartement`  
3. Fingerprint photos · merge PropertyEntity  
4. Snapshot actifs fenêtre 90 j · filtre n / bornes (`03`)  
5. Médiane FCFA/m² → `ix_staging.IX-SALE-M2`  
6. Audit n≥8 · MoM OK → PublishBundle `2026-Q3-z1`  
7. Carte / Observatoire consomment API `ix_prod`

### 10.2 « Recalage simu construction » (Lane A)

1. Note ICC T1 2026 PDF + XLS → `DocRaw` + MANIFEST  
2. Extract variation QoQ / YoY → `SeriesPoint`  
3. Job bridge met à jour coefficient barème `v2026.3`  
4. Audit vs note ANSD · bump changelog outils  
5. PUB-02 sert nouveau barème · citation « Source: ANSD »

### 10.3 « Lead price-drop » (interne)

1. 2ᵉ observation −8 % / 45 j sur PropertyEntity  
2. `LeadSignal(reason=price_drop)`  
3. Assign agent · WhatsApp (CRM) — **pas** de publish public  
4. KPI : délai détection → 1ʳᵉ prise de contact

---

## 11. Phasage pipeline (L0 → L5)

| Phase | Collecte | Transform | Publish |
| --- | --- | --- | --- |
| **L0** | PDFs archivés · ICC CSV manuel · thesaurus | Docs only | Barèmes manuels outils Vague 1 |
| **L1** | 1 source · 200–500 listings · Excel/Notion dédup | Semi-manuel | Mini table médiane interne (pas carte publique) |
| **L2** | 2 sources · workers + queue · Lab UI review | Auto-score + hebdo IX | API interne A05 · soft blog chiffres |
| **L3** | + lead rules DOM/DROP | Continu | CRM alerts |
| **L4** | + séries contextuelles C/D/E | Bundle trim. | **Observatoire public** + carte |
| **L5** | FB semi / dense multi-source | Si L2–L4 prouvés | Élargir couverture — sinon stop |

**Spike L1 (2 semaines post Vague 0)** — rappel strategy §10 : 1 source · 300 annonces · dédup intra · photo-hash 50 paires · 1 rapport médiane · **Go/No-Go L2**.

---

## 12. Registre & artefacts ops

| Artefact | Emplacement / format | Owner |
| --- | --- | --- |
| `registre-datasets.csv` | Drive lab / repo data (cf. `02` §5) | Lab |
| `MANIFEST.md` études | `docs/research-lab/etudes/` | Lab |
| Thesaurus quartiers | DB + export CSV | Lab |
| `meth_version` indices | Code + `03` | Lab + GER |
| `PublishBundle` JSON | Store serving | Lab |
| Runbooks connecteur | 1 page / source (ToS, delay, fields) | Lab |
| Changelog barèmes | Outils / add-ons | Product |

---

## 13. Anti-patterns (refusés)

| Anti-pattern | Pourquoi |
| --- | --- |
| Écraser raw « pour faire propre » | Perd le debug / rejeu |
| Publier depuis staging | Demi-chiffres publics |
| Peupler la carte avant n ≥ seuil | Crédibilité brûlée |
| Scraper FB pour « finir L1 » | ToS + complexité · L5 |
| Bloquer Vague 1 simus sur le crawler | Dispersion stratégique |
| API qui renvoie l’annonce Expat | Miroir = risque + anti-positionnement |
| Zéro silencieux si source late | Mensonge UX |
| Même credential dev/prod | Contournement WAP |

---

## 14. Liens

| Doc | Rôle |
| --- | --- |
| [`02-catalogue-datasets.md`](./02-catalogue-datasets.md) | IDs · licences · priorité ingestion |
| [`03-barometre-prix.md`](./03-barometre-prix.md) | Formules · fenêtres · QA indices |
| [`04-outils-publics.md`](./04-outils-publics.md) | Consommateurs publics |
| [`06-gouvernance-sources.md`](./06-gouvernance-sources.md) | Citation · fraîcheur (suivant) |
| [`../../../docs/research-lab/strategy.md`](../../../docs/research-lab/strategy.md) | Archi · dédup · L0–L5 |
| ANSD ICC / IMC / calendrier | [ansd.sn](https://www.ansd.sn/) · Indicateurs construction |

---

## 15. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| Property data pipelines (RealtyAPI / lakehouse RE) | Raw → staging → normalize → entity resolution → serving · raw immutable |
| Write–Audit–Publish | Land hors vue conso · audit · publish atomique · rollback bundle |
| Lineage 2026 (AI property discovery) | Events source_acquired → published · dual clocks · unresolved-entity % |
| Scraping éthique classifiés | robots + rate-limit · ToS · pas bypass · agrégats ≠ republication |
| ANSD 2026 | ICC trim. (ex. T1’26, prochaine ~15 août) · IMC mensuel · Open Data / PDF+XLS |

---

*Pipeline data EverGreen Research Lab v1.0 — sept. 2026. Collecte dual-lane · ELT · WAP · serving agrégats only.*
