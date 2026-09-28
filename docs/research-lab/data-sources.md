# Data sources — quoi agréger (au-delà des annonces)

Le crawl classifiés est le cœur du lab. Voici **toutes les autres données** à ingérer pour être en avance — et comment s’en servir.

Voir aussi : [`strategy.md`](./strategy.md) · [`etudes/README.md`](./etudes/README.md)

---

## 1. Carte des familles de data

```
                    ┌──────────────────┐
                    │  OBSERVATOIRE    │
                    │  (outputs)       │
                    └────────┬─────────┘
           ┌─────────────────┼─────────────────┐
           v                 v                 v
     Prix / m²          Études gold        Lead radar
           ^                 ^                 ^
           │                 │                 │
    ┌──────┴──────┐   ┌──────┴──────┐   ┌──────┴──────┐
    │ Classifieds │   │ Études PDF  │   │ Signaux     │
    │ + dédup     │   │ ANSD/BM/…   │   │ vendeurs    │
    └─────────────┘   └─────────────┘   └─────────────┘
           ^                 ^                 ^
    + matériaux, finance, geo, démographie, admin…
```

---

## 2. Inventaire priorisé

### A. Offre & prix (P0 — lab core)

| Data | Source | Fréquence | Usage |
| --- | --- | --- | --- |
| Annonces vente/location | Expat, Immobilier-au-SN, CoinAfrique, Senhectare… | Quotidien / hebdo | Indice prix, dédup, DOM |
| Photos listings | Mêmes | Idem | Fingerprint dédup |
| Tél / WhatsApp annonceurs | Listings | Idem | Cluster vendeur / lead |
| Prix affichés historiques | Notre DB observations | Continu | Courbes, price drops |

### B. Coûts construction (P0 — simus)

| Data | Source | Fréquence | Usage |
| --- | --- | --- | --- |
| **ICC** | ANSD | Trimestriel | Barème simu construction |
| **IMC** | ANSD | Mensuel | Matériaux |
| **IBTP / ICAC** | ANSD | Trimestriel | Conjoncture BTP |
| Grilles négociants (ciment, fer, sable) | Partenaires matériaux / relevés manuels | Mensuel | Reality check ICC |
| Devis anonymisés partenaires BTP/archi | Conventions partenaires | Ad hoc | Calibration finition éco/standard/standing |

### C. Macro logement & démographie (P1 — études)

| Data | Source | Usage |
| --- | --- | --- |
| Tenure, typologie habitat | RGPH-5 / SES ANSD | Narratif études |
| Population / densités / urbanisation | ANSD | Demande par zone |
| Déficit logements | BM PID / Habitat III | Contexte offre |
| Production SICAP / SN HLM / ZAC | Rapport Habitat III, ministères | Offre formelle |
| Programme 100k + SAFRU sites | urbanisme.gouv / safru.sn | Pipeline |

### D. Finance & accessibilité (P1)

| Data | Source | Usage |
| --- | --- | --- |
| Profils finance habitat | CAHF Yearbook SN | Guides crédit |
| Produits BHS / banques | Sites banques + scrap léger | Comparateur frais / mensualité réelle |
| Taux / encours crédit habitat | BCEAO (si dispo) | Macro credit |
| Remittances → logement | CAHF / Banque mondiale | Angle diaspora |
| Her Home II (genre) | IFC | Contenu niche + partenaires |

### E. Loyers & régulation (P1)

| Data | Source | Usage |
| --- | --- | --- |
| Crawl locations | Classifieds | Baromètre loyers quartier |
| Décret 2023-382 & suites | JO / CAHF / presse | Impact politique |
| ICAS location immobilière | ANSD | Cycle pro |

### F. Foncier & admin (P1–P2)

| Data | Source | Usage |
| --- | --- | --- |
| Thesaurus quartiers + aliases | Interne (lab) | Normalisation dédup |
| Polygones quartiers / communes | OSM / ANAT | Cartes |
| Réformes cadastre / SGF / DGID-digitale | DGID | Guides TF/NICAD |
| Stats fiscalité foncière | FID/DGID papers | CGF/CFPB content |
| Permis TeleDAC volumes | Si open data un jour | Activité construction |

### G. Geo & risques (P2)

| Data | Source | Usage |
| --- | --- | --- |
| Zones inondables / relief | ANACIM / open data | Score risque fiche terrain |
| POI (écoles, transports) | OSM | Score livabilité |
| Satellites / land use change | Optional remote sensing | Exturbanisation (avancé) |

### H. Sentiment & attention (P2)

| Data | Source | Usage |
| --- | --- | --- |
| Posts groupes FB (manuel / semi) | Groupes immo | Signaux précoces prix / arnaques |
| Volume recherches Google (keywords immo SN) | Trends | Demande thématique |
| Engagement LinkedIn études | Notre content | KPI distribution |

### I. Concurrent & acteurs (P2)

| Data | Source | Usage |
| --- | --- | --- |
| Inventaire promoteurs / programmes neufs | Sites + presse | Co-marketing / VEFA watch |
| Annuaire agences (licence vs informel) | CAHF ~466 vs 100 | Positionnement curated |
| AML Estate Intelligence & pairs | Marché data | Concurrent ou partenaire data |

---

## 3. Idées d’outputs “en avance”

| Produit data | Ingrédients | Différenciation |
| --- | --- | --- |
| **Indice Immo Hub /m²** | Crawl dédup + thesaurus | Personne n’a ça publiquement fiable au SN |
| **Observatoire trimestriel** | ICC + ICAS + indice lab + 100k suivi | Études gold > blog générique |
| **Heatmap délais de vente** | Days-on-market observations | Négociation vendeurs → mandats |
| **Radar arnaques** | Multi-post + prix aberrants + tél recyclés | Confiance diaspora |
| **Calibrateur simulateurs** | ICC + devis partenaires + lab | Outils moins “fantaisie” |
| **Score accessibilité crédit** | CAHF + barèmes banques + revenus types | Add-on mensuel réel |
| **Watch promoteurs** | Livraison vs promesse, retards | Contenu + due diligence |
| **Baromètre loyers post-décret** | Crawl location + décret | Angle politique / médias |

---

## 4. Priorité d’ingestion (alignée phases lab)

| Phase | Data à brancher |
| --- | --- |
| **L0** | Catalogue études PDF ; thesaurus quartiers ; table ICC manuelle (CSV) |
| **L1** | 1 source classifieds ; photo-hash spike |
| **L2** | 2ᵉ source ; IMC mensuel auto ou semi ; premiers /m² |
| **L3** | Lead radar (price drop, multi-source) ; tél clusters |
| **L4** | Observatoire public (études + lab) ; OSM overlays |
| **L5** | FB semi-assisté ; banques comparateur ; remote sensing optionnel |

---

## 5. Principes

1. **Officiel d’abord pour le récit**, **lab pour le prix affiché** — les deux se confrontent.  
2. Ne jamais republier une annonce concurrente ; agréger.  
3. Toute série a une `source`, `retrieved_at`, `license_note`.  
4. PDF études = citation ; pas de dump copyrighted in extenso dans le repo public.  
5. Si une data n’alimente ni outil, ni étude, ni lead → ne pas la crawler.

---

*Enrichir ce fichier quand une nouvelle source est branchée en prod.*
