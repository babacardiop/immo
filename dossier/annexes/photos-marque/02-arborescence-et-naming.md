# Arborescence & naming — DAM lean

**Document :** Annexes · Photos-marque · 02  
**Bench :** AgentPulse / PropertyPixel / ImageSystems (2026) — dossiers numérotés · kebab/underscore stable · masters ≠ dérivés

---

## 1. Deux bibliothèques (ne pas mélanger)

| Lib | Contenu | Owner |
| --- | --- | --- |
| **`photos-marque/`** (ce pack) | Logo, équipe, lieux brand, process, exports canaux, moodboard | CT |
| **`assets/listings/{mandat_id}/`** | Shoot biens sous mandat | AC |

---

## 2. Arborescence recommandée (Drive / NAS)

```
photos-marque/
├── 00_README/                 (copie README.md + charte PDF)
├── 01_brand/
│   ├── logo/                  masters SVG + PNG
│   ├── favicon/
│   └── tokens/                swatches / export Figma
├── 02_equipe/
│   ├── ger/
│   ├── agents/
│   └── bureau/
├── 03_lieux/                  atmosphère Z1 (non-listing)
├── 04_process/                visite, diligence narrative
├── 05_moodboard/              refs URL + screenshots internes
├── 06_masters/                selects retouchés (plein format)
├── 07_exports/
│   ├── og/                    1200×630 …
│   ├── social/                1080² · 1080×1920
│   ├── print/                 A4 / flyer
│   └── ads/                   Meta crops
└── 99_archive/                retirés (ne pas supprimer 12 mois)
```

**Workflow shoot listing** (ops, hors marque) :

```
listings/{mandat_id}/
  01_RAW/  02_selects/  03_masters/  04_exports/
```

---

## 3. Naming EverGreen

```
eg_{type}_{desc}_{WxH}_v{N}.{ext}

Types : logo | mark | favicon | equipe | lieu | process | og | share | print | ad | swatch | ref
```

### Exemples

| Fichier | Usage |
| --- | --- |
| `eg_logo_wordmark_lockup_v1.svg` | Logo primaire |
| `eg_logo_mark_ink_v1.svg` | Icône seule |
| `eg_favicon_180_v1.png` | Apple touch |
| `eg_equipe_ger_portrait_2400x2400_v1.jpg` | Media kit |
| `eg_lieu_almadies_facade_matin_v1.jpg` | Hero soft |
| `eg_process_visite_interieur_anonyme_v1.jpg` | About |
| `eg_og_default_1200x630_v1.jpg` | OG site |
| `eg_share_home_1080x1080_v1.jpg` | IG |
| `eg_share_home_1080x1920_v1.jpg` | Stories / Status |

### Règles

- Minuscules · underscore · **pas d’espaces** · pas d’accents dans le nom fichier  
- Version `v1`, `v2` — **ne jamais écraser** un master publié  
- Interdit : `final`, `new`, `latest`, `(1)`, `copie`  
- Date shoot optionnelle : `…_20261015_v1.jpg` si utile archive  
- Listing photos : `eg_listing_{mandatId}_{piece}_{seq}_v1.jpg` (lib listings)

---

## 4. Métadonnées obligatoires (registre CSV)

Chaque fichier publié = 1 ligne dans [`registre-assets.csv`](./registre-assets.csv) :

`asset_id, filename, type, source, rights, consent, usage, channels, owner, status, date_added, notes`

| Champ | Valeurs types |
| --- | --- |
| `source` | `shoot_own` · `shoot_presta` · `stock_unsplash` · `stock_pexels` · `client_mandat` · `mockup_ui` |
| `rights` | `owned` · `licence_stock` · `mandat_diffusion` · `ref_interne` |
| `consent` | `na` · `written` · `oral_logged` · `blurred` · `pending` |
| `status` | `draft` · `approved` · `live` · `retired` |

---

## 5. Masters vs dérivés

| Couche | Règle |
| --- | --- |
| Master | Plus grande résolution utile · RGB · pas de logo baked si possible |
| Export canal | Crop + compression **dans** `07_exports/` · nom avec `WxH` |
| UI mockup Dribbble | Jamais en ads / OG prod — tag `mockup_ui` + `ref_interne` |

Backup : 1 copie cloud (Drive) + 1 locale CT. Pas de master unique sur téléphone AC.
