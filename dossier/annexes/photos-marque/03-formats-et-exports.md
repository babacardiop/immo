# Formats & exports — canaux

**Document :** Annexes · Photos-marque · 03  
**Sources tailles :** `docs/social-share-cards.md` · Meta / LinkedIn / env.dev OG 2026

---

## 1. Open Graph & share (P0 Soft)

| Variant | Px | Ratio | Usage | Poids cible |
| --- | ---: | --- | --- | --- |
| `og-landscape` | **1200 × 630** | 1.91:1 | FB · WA · LI · défaut `og:image` | **&lt; 300 KB** (idéal) · max pratique &lt; 1 MB |
| `og-square` | **1080 × 1080** | 1:1 | IG bio/DM · TikTok profile | &lt; 500 KB |
| `og-story` | **1080 × 1920** | 9:16 | Stories · Status WA · créateurs | &lt; 800 KB |

**Safe zone :** logo + titre dans le **centre ~66 %** (crops mobiles variables).  
**Format :** JPEG listings / OG · PNG si transparence logo.  
**Meta :** `og:image:width/height/alt/type` · URL HTTPS absolue · cache-bust `?v=`.

QA : Facebook Sharing Debugger · LinkedIn Post Inspector · test WA Android+iOS.

---

## 2. Profils & covers

| Surface | Px min | Notes |
| --- | ---: | --- |
| Avatar WA / LI / IG | **640 × 640** (export 1080² ok) | Visage GER ou mark |
| Cover Facebook | 820 × 312 (affiche) · design **1200 × 630** safe | Pas de texte aux bords |
| Banner LinkedIn | 1584 × 396 | Slogan court + sage |
| Favicon | 16 · 32 · 180 · `icon.svg` | Mark ink |

---

## 3. Ads Meta (P1)

| Placement | Ratio | Export type |
| --- | --- | --- |
| Feed | 1:1 ou 4:5 | `eg_ad_{campagne}_1080x1350_v1.jpg` |
| Stories / Reels | 9:16 | réutiliser story brand |
| Carousel | 1:1 | 1 claim / slide |

Règle paid `04` : **UGC / photo terrain SN** &gt; render gloss.

---

## 4. Print / media kit (P1–P2)

| Asset | Spec |
| --- | --- |
| One-pager | A4 · 300 dpi · PDF + JPG preview |
| Photo GER presse | ≥ 2400 px grand côté · JPEG qualité haute |
| Carte de visite | 85×55 mm · fond `bg` · ink · sage accent |
| Flyer fiche | 1 prix · pastille papier · QR WA |

---

## 5. Logo exports

| Fichier | Fond | Usage |
| --- | --- | --- |
| Lockup SVG | — | Master |
| Lockup PNG @2x / @3x | Transparent | Site / mail |
| Mark monochrome ink | Transparent | Favicon · tampon |
| Mark sur sage | `#C4CEB8` | Rare — contraste check |

**Clear space :** ≥ hauteur du « E » autour du lockup (Brand Book).

---

## 6. Checklist export avant publish

- [ ] Nom `eg_*` conforme  
- [ ] Ligne `registre-assets.csv`  
- [ ] Droits / consent OK  
- [ ] Poids WA si OG  
- [ ] Contraste logo OK  
- [ ] Pas de mockup Dribbble en prod client  
