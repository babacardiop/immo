# Immo — Hub immobilier Sénégal

Agence immobilière **full-service** au Sénégal, outillée en PropTech : catalogue curated, simulateurs, partenaires (BTP, notaire, archi…), gestion locative, contenu décisionnel.

> Pas une marketplace ouverte. Une **agence** qui orchestre le parcours : décider → sécuriser → closer → construire / gérer.

```
Agence  +  Add-ons (outils)  +  Partenaires (exécution)  +  Blog haute valeur
        (+ Research lab : crawl + études officielles)
        =  Hub immobilier
```

---

## Par où commencer

| Priorité | Doc | Contenu |
| --- | --- | --- |
| **1** | [`docs/hub-roadmap.md`](docs/hub-roadmap.md) | Stratégie hub + **calendrier des vagues** (features / add-ons / partenaires) |
| **2** | [`docs/positioning.md`](docs/positioning.md) | Métier, 4 axes, portails, hiérarchie des papiers |
| **3** | [`dossier/`](dossier/README.md) | **Dossier final** (étude, BP, tech, marketing…) — étude ✅ |
| **4** | [`docs/tech-stack.md`](docs/tech-stack.md) | Next.js, Tailwind, shadcn, maps, SEO |

Ensuite selon le sujet :

| Sujet | Doc |
| --- | --- |
| Add-ons (52 specs, 7 catégories) | [`docs/add-ons.md`](docs/add-ons.md) · [`docs/add-ons/README.md`](docs/add-ons/README.md) |
| Partenaires (24 fiches, 5 catégories) | [`docs/partenaires.md`](docs/partenaires.md) · [`docs/partenaires/README.md`](docs/partenaires/README.md) |
| Research lab (crawl, dédup, études PDF) | [`docs/research-lab/`](docs/research-lab/README.md) · [`etudes/pdf/`](docs/research-lab/etudes/pdf/) |
| Blog / guides | [`docs/blog/`](docs/blog/README.md) |
| Foncier / diligence (ops) | [`dossier/…/06`](dossier/etude-de-marche/06-parcours-foncier-securite.md) · [`07 glossaire`](dossier/etude-de-marche/07-glossaire-foncier.md) |
| Concurrence / PropTech | [`docs/competitive-analysis.md`](docs/competitive-analysis.md) · [`docs/proptech-analysis.md`](docs/proptech-analysis.md) |
| Design EverGreen | [`docs/design-tokens.md`](docs/design-tokens.md) · [`assets/`](assets/) · [`docs/assets.md`](docs/assets.md) |
| Share cards (WA / IG / TikTok) | [`docs/social-share-cards.md`](docs/social-share-cards.md) |

---

## Quatre axes commerciaux

1. **Vente classique** — terrains, maisons, appartements  
2. **Vente étalée** — terrains TF / bail  
3. **Location-vente** — accession bâti  
4. **Location + gestion** — cash récurrent (loyers)

Détail : [`docs/positioning.md`](docs/positioning.md).

---

## Roadmap en une ligne

| Vague | Parcours | Sortie |
| --- | --- | --- |
| **0** | Socle | Site + catalogue curated |
| **1** | Acheteur terrain | 3 simulateurs + constructeur / archi / notaire |
| **2** | Sécuriser | Diligence, formalités, géomètre |
| **3** | Location / gestion | Portails, caution, assurances |
| **4+** | Diaspora → chantier → densifier | Voir hub-roadmap |

**Règle :** backlog large, itérations étroites (~8–12 ouvertures max / vague). Specs ≠ scope de build.

---

## État du repo

| Zone | Statut |
| --- | --- |
| Documentation produit / hub | **En place** (`docs/`) |
| Assets design EverGreen | **En place** (`assets/`) |
| Scripts génération specs | `scripts/generate_*.py`, `reorganize_specs.py` |
| App Next.js | **Pas encore scaffoldée** — prochain build = Vague 0 |

---

## Structure

```
immo/
├── README.md                 ← ce fichier
├── assets/                   # Design boards + crops
├── dossier/                  # Pack docs finaux (voir dossier/README.md)
│   ├── etude-de-marche/      # ✅ Étude + foncier
│   ├── modele-economique/    # BP, prévisionnel
│   ├── tech/site + research-lab/
│   ├── marketing/
│   └── …
├── docs/
│   ├── hub-roadmap.md        # Plan de sortie (lire en premier)
│   ├── positioning.md
│   ├── tech-stack.md
│   ├── add-ons.md + add-ons/ # Specs par catégorie
│   ├── partenaires.md + partenaires/
│   ├── blog/                 # Stratégie, calendrier, briefs
│   └── …
└── scripts/                  # Génération / réorg des specs
```

---

## Stack cible

**Next.js** (App Router) · TypeScript · Tailwind · shadcn/ui · Node · Leaflet/Mapbox · Wave / Orange Money (plus tard).

Voir [`docs/tech-stack.md`](docs/tech-stack.md).

---

## Prochaine action

1. Lire [`docs/hub-roadmap.md`](docs/hub-roadmap.md) § Vague 0 → 1  
2. Signer les 3 partenaires P0 (constructeur, archi, notaire)  
3. Scaffold Next.js + catalogue curated (Vague 0)
