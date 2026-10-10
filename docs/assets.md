# Assets

Design source: [EverGreen Real Estate Website Template](https://dribbble.com/shots/25548322-Real-Estate-Website-Template) (Sajibur Rahman / Oripio)

## Structure

```
assets/
  design/          # Full Dribbble boards (reference)
  design/previews/ # Horizontal strips of the full-page mockup
  images/          # Cropped section images for implementation
docs/
  design-tokens.md         # Palette + CSS variables
  tech-stack.md            # Next.js + shadcn + Node + maps
  competitive-analysis.md  # Local competitors & differentiation
  proptech-analysis.md     # PropTech features & phased roadmap
  add-ons.md               # Overview add-ons + synergies
  add-ons/                  # Specs détaillées (52, par catégories)
  partenaires.md           # Overview partenariats & commissions
  partenaires/             # Fiches partenaires (24, par catégories)
  hub-roadmap.md           # Stratégie hub + calendrier itérations
  research-lab/            # Lab: strategy, data-sources, etudes/ (+ pdf/)
  blog/                    # Stratégie blog & briefs guides
  positioning.md           # Brand / model one-pager
  social-share-cards.md    # OG cards for FB / WA / IG / TikTok
  assets.md                # This inventory
  first analysis/          # Business model Q&A (q1–q5)
```

## Design boards

| File | Size | Notes |
| --- | --- | --- |
| `design/01-evergreen-layout-board.png` | 3200×2400 | Component moodboard |
| `design/02-evergreen-layout-board.png` | 3200×2400 | Component moodboard |
| `design/03-evergreen-layout-board.png` | 1600×6894 | Full landing-page mockup |

## Cropped images (`assets/images/`)

| File | Use |
| --- | --- |
| `hero-photo.jpg` | Hero — photo seule (crop sans UI Dribbble) |
| `story-home.jpg` | Story — photo architecture |
| `discover-photo.jpg` | Discover — photo |
| `listing-01.jpg` … `listing-06.jpg` | Fallback grille home (sans badge EN) |
| `hero-bg.jpg` etc. | Archives mockup (ne plus utiliser en prod) |

> Home prod n’utilise **pas** les crops Dribbble avec chrome EN. Style cible = lean FR (réf. Partenaires / DS).
