# Research Lab

Back-office d’intelligence marché : crawl classifiés + **études officielles** + autres séries de données → indices, observatoire, leads mandats, calibration simulateurs.

```
docs/research-lab/
├── README.md              ← tu es ici
├── strategy.md            ← vision lab, dédup, architecture, phases
├── data-sources.md        ← autres data à agréger (au-delà des annonces)
└── etudes/                ← catalogue d’études & rapports externes
    └── README.md
```

## Formule

```
Études officielles (ANSD, BM, CAHF…) archivées dans [`etudes/pdf/`](./etudes/pdf/)  +  Crawl classifiés (dédup)
        =  Observatoire immo SN (notre avance)
```

Les études donnent le **cadre macro** (déficit logements, ICC, tenure, finance).  
Le lab crawl donne le **micro temps réel** (prix/m² quartier, baisses, multi-post).  
Ensemble = études “gold” publiables + outils calibrés + leads.

## Docs

| Fichier | Rôle |
| --- | --- |
| [`strategy.md`](./strategy.md) | Sauce secrète, dédup, architecture, roadmap lab L0–L5 |
| [`data-sources.md`](./data-sources.md) | Inventaire des data streams à agréger |
| [`etudes/README.md`](./etudes/README.md) | Catalogue d’études + liens vers PDFs |
| [`etudes/MANIFEST.md`](./etudes/MANIFEST.md) | Liste des PDF téléchargés |
| [`etudes/pdf/`](./etudes/pdf/) | Archive (ANSD, BM, IFC, CAHF, Habitat…) |

## Liens hub

- [`../hub-roadmap.md`](../hub-roadmap.md) — lab = voie parallèle, pas Vague 1  
- [`../positioning.md`](../positioning.md)  
- [`../blog/strategie.md`](../blog/strategie.md) — études → contenu public  
- [`../../dossier/etude-de-marche/`](../../dossier/etude-de-marche/README.md) — synthèse marché + **parcours foncier / DGSCOS**  
- Add-ons nourris : estimation vendeur, carte prix/m², simu construction, diligence  

**Veille foncier État à croiser :** NICAD/eNICAD, SGF, SIFCOM, ICAS, plaintes DGSCOS (zones chaudes), délais AC réels — voir `data-sources.md` §F et `dossier/…/06`. 

## Règle anti-dispersion

1. Cataloguer & lire les études (**maintenant** — faible coût).  
2. Hub Vague 0–1 live.  
3. Spike crawl L1 (1 source).  
4. Fusion études + indices lab → 1ʳᵉ note “Observatoire”.
