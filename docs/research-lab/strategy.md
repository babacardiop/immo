# Research Lab — intelligence marché & déduplication

**Ambition :** un **back-office secret** qui ingère les annonces classées du marché sénégalais (Expat-Dakar, Immobilier-au-Sénégal, Facebook groupes/pages, Senhectare, CoinAfrique, etc.), **déduplique** le même bien multi-posté, puis transforme cette donnée en :

1. **Tendances de prix** (quartier × type × m² × période)  
2. **Études marché “or”** (contenu / PR / SEO — niveau au-dessus de Keur City)  
3. **Leads mandats** (biens chauds / vendeurs actifs → approche agence curated)  
4. **Calibration outils** (barèmes simus construction / estimation / carte prix/m²)

```
Crawl sources  →  Normalize  →  Dedupe (même bien)  →  Property graph
                                              ↓
                    Pricing · Studies · Lead radar · Simu calibration
```

**Ce n’est pas** le site public. C’est le **lab** — internal, asymétrique, difficile à copier.

**Docs liés :** [`../hub-roadmap.md`](../hub-roadmap.md) · [`../positioning.md`](../positioning.md) · [`etudes/README.md`](./etudes/README.md) · [`data-sources.md`](./data-sources.md) · [`../add-ons/specs/01-outils-simulateurs/04-estimation-vendeur.md`](../add-ons/specs/01-outils-simulateurs/04-estimation-vendeur.md) · [`../add-ons/specs/01-outils-simulateurs/52-carte-prix-m2.md`](../add-ons/specs/01-outils-simulateurs/52-carte-prix-m2.md) · [`../blog/strategie.md`](../blog/strategie.md)

---

## 1. Verdict stratégique

| Question | Réponse |
| --- | --- |
| Est-ce une sauce secrète ? | **Oui** — pour le *cerveau marché*, pas pour remplacer l’agence |
| Est-ce le produit face client ? | **Non** — le hub reste agence + outils + partenaires |
| Risque n°1 ? | Se disperser : crawler avant d’avoir Vague 0–1 live |
| Hard problem ? | **Déduplication cross-platform** (même villa sur FB + Expat + Immobilier-au-SN) |
| Différenciateur vs classifieds ? | Eux *publient* du bruit ; toi tu *comprends* le marché et tu *curates* |

Sans dédup, tu as un tas d’annonces.  
Avec dédup, tu as un **graphique de biens réels** + historique de prix + intensité d’offre.

---

## 2. Ce que le lab débloque

| Output | Usage | Public ? |
| --- | --- | --- |
| **Indice prix /m²** par quartier / typologie | Carte prix, estimation vendeur, blog “marché 2026” | Oui (agrégé) |
| **Études gold** (loyers Almadies, terrains Bambilor, délai de vente…) | SEO, LinkedIn, presse, confiance diaspora | Oui (insights, pas les annonces brutes) |
| **Lead radar** | Vendeur qui multi-poste / baisse le prix → appeler pour mandat exclusif | Non (interne CRM) |
| **Barèmes simus** | Recaler FCFA/m² construction & comps | Interne → outils publics |
| **Compset** | “Ce bien est aussi à X ailleurs” pour négociation agent | Interne |

Règle éthique / légale produit : on **ne republie pas** le catalogue concurrent en miroir. On publie des **agrégats** et on approche des **vendeurs** pour un mandat *chez nous*.

---

## 3. Le problème central : dédup

Un même appartement Almadies peut être :

- posté par l’agence A sur Expat  
- reposté par un “courtier” sur Immobilier-au-SN  
- mis dans 3 groupes Facebook avec des photos croppées et un prix ±5 %

### Signaux de similarité (scoring)

| Signal | Poids indicatif | Notes |
| --- | --- | --- |
| **Hash / embeddings photos** | Très fort | Même cliché = quasi-certain ; attention stocks promoteur |
| **Geo** (lat/lng ou quartier + précision) | Fort | FB souvent flou → quartier + landmarks texte |
| **Surface m² + nbre pièces** | Fort | Normaliser “3 chambres” / “F4” |
| **Prix** (tolérance ±8–15 %) | Moyen | Baisse de prix = même bien, nouveau snapshot |
| **Texte** ( titrefuzzy + n-grams + embeddings) | Moyen | “Villa standing Ngor” répété partout |
| **Téléphone / WhatsApp vendeur** | Fort si présent | Identité annonceur ≠ identité bien, mais cluster utile |
| **URL canonique / ID source** | Exact | Pour re-crawl, pas pour cross-site |

### Pipeline dédup (cible)

```
ListingRaw (par source)
    → normalize (FCFA, m², type, quartier thesaurus)
    → media fingerprint (pHash / CLIP embedding)
    → candidate pairs (blocking: quartier + type + m²±20%)
    → score match (0–1)
    → PropertyEntity (cluster) + ListingObservation (prix, date, source)
```

| Score | Action |
| --- | --- |
| ≥ 0,90 | Auto-merge même `PropertyEntity` |
| 0,70–0,89 | Queue **review humaine** (lab UI) |
| &lt; 0,70 | Entités séparées |

**PropertyEntity** = le bien réel dans le temps.  
**ListingObservation** = une annonce vue à une date (prix, texte, source).  
C’est ça qui permet les *tendances* (“ce bien a baissé 3× en 60 j”).

---

## 4. Sources (priorité d’ingestion)

| Priorité | Source | Difficulté crawl | Qualité signal |
| --- | --- | --- | --- |
| P0 | Expat-Dakar (immobilier) | Moyenne (HTML) | Haute volume Dakar |
| P0 | Immobilier-au-Sénégal | Moyenne | Haute, étalé visible |
| P1 | CoinAfrique / autres portails | Moyenne | Variable |
| P1 | Senhectare (terrains/rural) | Moyenne | Niches terrains |
| P2 | Groupes Facebook immo | **Très haute** (ToS, login, anti-bot) | Bruit + or ; souvent premier signal |
| P3 | WhatsApp status / OLX-like | Élevée | Faible structure |

**Facebook :** traiter à part — souvent le graal et le pire cauchemar légal/tech. V1 lab **sans** FB scrape automatisé ; phase 2 = export manuel semi-assisté ou partenariats data, pas un bot qui brûle des comptes.

---

## 5. Architecture lab (cible)

```
┌─────────────────────────────────────────────────────────┐
|  Collectors (workers)  — 1 connecteur / source            |
└────────────────────────────┬────────────────────────────┘
                             v
┌─────────────────────────────────────────────────────────┐
|  Raw store (S3/MinIO + Postgres listings_raw)            |
└────────────────────────────┬────────────────────────────┘
                             v
┌─────────────────────────────────────────────────────────┐
|  Normalize + Dedupe service  →  property_entities         |
└────────────────────────────┬────────────────────────────┘
                             v
        ┌────────────────────┼────────────────────┐
        v                    v                    v
   Pricing API          Lab UI (review)      Lead radar → CRM
   (aggregates)         human merge          agent WhatsApp
        v
   Blog études / carte m² / estimation
```

| Composant | Rôle |
| --- | --- |
| **Connecteurs** | Fetch + parse ; idempotents ; respect robots / rate limits |
| **Normalizer** | Thesaurus quartiers Dakar (Almadies / Ngor / …), types, devises |
| **Dedupe** | Blocking + score + merge |
| **Lab UI** | Review matches douteux, blacklist sources pourries |
| **Pricing API** | Endpoints internes agrégés (jamais “restitue l’annonce Expat”) |
| **Lead radar** | Règles : multi-source, price drop, days-on-market élevé |

Stack suggérée (alignée repo) : Python workers (crawl/dedupe ML) + Postgres/PostGIS + Redis queue ; API Node/Next pour le CRM plus tard. Le lab peut vivre **à côté** de l’app Next.js.

---

## 6. Cadre légal & éthique (non optionnel)

| Risque | Mitigation |
| --- | --- |
| ToS / interdiction scrape | Lire ToS ; rate-limit ; préférer pages publiques ; documenter base légale |
| Facebook / Meta | **Pas de scrape agressif v1** ; données manuelles ou APIs officielles si un jour dispo |
| Droit des photos / texte | Pas de republication verbatim ; agrégats + insights |
| Données perso (tél vendeur) | Finalité légitime prospection B2B limitée ; pas de revente de bases ; RGPD-like hygiene |
| Réputation “on vole les annonces” | Positionnement public = **études de marché** + **agence** ; lab invisible |

Le lab est un **avantage compétitif discret**. Le message externe reste : études + agence curated — jamais “on aspirons Expat”.

---

## 7. Place dans la roadmap hub (anti-dispersion)

Le lab est une **voie parallèle**, pas Vague 1.

| Phase lab | Quand | Livrable |
| --- | --- | --- |
| **L0 — Design** | Maintenant | Modèle données, sources, scoring dédup + **catalogue études** (`etudes/`) |
| **L1 — Manual spike** | Après Vague 0 (site live) | 200–500 annonces scrapées **1 source**, dédup manuelle Excel/Notion pour valider signaux |
| **L2 — 2 sources + auto-score** | Pendant Vague 2–3 | Pipeline + UI review ; premiers prix/m² Almadies/mermoz |
| **L3 — Lead radar** | Vague 3–5 | Alerts CRM agents |
| **L4 — Études publiques** | Vague 4+ | 1 “Observatoire immo SN” / trimestre |
| **L5 — FB / multi-source dense** | Seulement si L2–L4 prouvés | Sinon piège à complexité |

**Interdit :** bloquer le scaffold Next.js / Vague 1 simulateurs pour “finir le crawler”.

Synergie produit quand le lab mature :

- Add-on **estimation vendeur** + **carte prix/m²** nourris par le lab  
- Blog études > ImmoConnexion / SamaGalle sur la *fraîcheur chiffrée*  
- Agents : file “vendeurs à démarcher cette semaine”

---

## 8. KPI lab

| KPI | Pourquoi |
| --- | --- |
| Listings raw / semaine | Couverture |
| % auto-merge vs review | Qualité dédup |
| Precision@merge (sample humain) | Éviter faux jumeaux |
| Quartiers avec indice prix fiable | Produit études / estimation |
| Leads radar → mandats signés | ROI business |
| Temps entre price-drop détecté → appel agent | Avantage terrain |

---

## 9. Modèle de données (minimal)

```
Source { id, name, baseUrl, connector }
ListingRaw { id, sourceId, externalId, url, crawledAt, payload_json }
PropertyEntity { id, canonicalType, area_m2, rooms, quartier_id, geo, photo_fingerprint }
ListingObservation { id, propertyId, listingRawId, price_fcfa, currency, observedAt, status }
Quartier { id, name, aliases[], city }
MatchReview { id, a_raw, b_raw, score, decision, reviewer }
LeadSignal { id, propertyId, reason, score, assignedAgentId?, status }
```

---

## 10. Spike L1 recommandé (2 semaines chrono, post Vague 0)

1. Choisir **une** source HTML stable (ex. Immobilier-au-SN ou Expat listings).  
2. Extraire : titre, prix, quartier, m² si dispo, photos URLs, tél, date.  
3. Stocker 300 annonces.  
4. Dédup **intra-source** d’abord (reposts), puis tester photo-hash sur 50 paires.  
5. Produire un mini rapport : “prix médian appart 3 ch. {quartier}”.  
6. Décider Go L2 ou pause.

---

## 11. Ce que le lab n’est pas

| Non | Pourquoi |
| --- | --- |
| Un clone Expat | Contredit le positionnement agence |
| Une excuse pour retarder le hub | Dispersion |
| Un dataset à vendre en brut | Risque légal + commodité |
| Un substitut aux partenaires / simulateurs | Autre couche de valeur |

---

## 12. Synthèse

Oui : **dedupe cross-platform + observations de prix dans le temps** = secret sauce back-office.  
Oui : études marché gold + calibration outils + leads mandats.  
Non : ce n’est pas le cœur visible du hub — c’est le **radar** qui rend l’agence et le contenu imbattables.

Ordre de bataille : **Hub Vague 0–1 d’abord** → spike lab L1 → industrialiser seulement ce qui prouve un indice prix ou un mandat.

---

*Doc vivant. Index lab : [`README.md`](./README.md). Prochaine étape : enrichir [`etudes/`](./etudes/) + thesaurus quartiers pendant Vague 0.*
