# Brand — logo & thèmes

## Logo

| Asset | Fichier | Usage |
| --- | --- | --- |
| **Lockup complet** | `logo-full.png` | Nav, footer — **PNG transparent** (feuille + wordmark) |
| Lockup dark | `logo-full-on-dark.png` | Sur fond sombre — transparent |
| Lockup green | `logo-full-on-green.png` | Sur fond thème vert — transparent |
| **Favicon** | `favicon.png` / `icon-*.png` | **Uniquement l’icône feuille** (pas le wordmark) |

Règles :
1. Ne jamais séparer feuille et wordmark dans le lockup produit.
2. Favicon / app icon / PWA = feuille dans le cercle **seule**.
3. Clearspace ≈ hauteur de la feuille de chaque côté.
4. Pas de stretch · min-height nav ≈ 32–40px.

## Thèmes

Trois thèmes site (`data-theme` sur `<html>`) :

| Theme | `data-theme` | Fond | Texte | Accent |
| --- | --- | --- | --- | --- |
| **Clair (white)** | `light` (défaut) | `#F2F2F2` | `#0F0F09` | sage `#C4CEB8` + verts logo |
| **Sombre** | `dark` | `#0F0F09` | `#F2F2F2` | sage + leaf green |
| **Vert** | `green` | `#1B3A2A` | `#F5F7F2` | `#A8C49A` / leaf `#3D8B4F` |

Voir `themes-palette-board.jpg`.

Tokens runtime → `web/src/app/globals.css`.  
Toggle UI → header. Préférence `localStorage` key `eg-theme`.
