# S05 — Frontend

**Source de vérité visuelle :** `assets/design/`  
**Boards :** `01` · `02` (mood) · `03` (landing full)  
**Strips QA :** `assets/design/previews/strip-00-y0.jpg` → `strip-07-y6300.jpg`  
**Crops :** `assets/images/` (voir `docs/assets.md`)

## Outcome

Home (+ shell nav/footer) **même composition** que le mockup Dribbble EverGreen — sections, densités, radius, hero full-bleed, search card, grids, FAQ, témoignages, CTA, footer.  
Copy **FR / métier SN** (Acheter · Louer · Contact · pastille papier) — pas coller l’anglais placeholder du template.

## Todo

- [ ] Tokens + typo alignés mockup (`docs/design-tokens.md` · `18`) — radii pills / cards 24–32px
- [ ] Header mockup : logo · nav pill · CTA sage (pas layout “minimal S00”)
- [ ] `strip-00` Hero full-bleed + tags + headline split + search card overlap
- [ ] `strip-01` Filter chips + story headline + feature grid (large + card + pool)
- [ ] `strip-02` Stats row 4 cols + Discover map split
- [ ] `strip-03` / `strip-04` Premier houses grid + listing cards (badge For Sale → FR)
- [ ] `strip-04` / `strip-05` FAQ accordion (+ image inset expanded)
- [ ] `strip-05` / `strip-06` Testimonials carousel + CTA banner
- [ ] `strip-07` Footer mockup (nav tiers + legal)
- [ ] Catalogue / fiche : cards + spacing coherents avec board (pas redesign BO)
- [ ] Mobile : même sections, stack — pas casser CWV (images `next/image`)

## Strip map (acceptance)

| Strip | Section | Done when |
| --- | --- | --- |
| `strip-00` | Nav + hero + find card | Side-by-side match composition |
| `strip-01` | Filters + story + feature trio | |
| `strip-02` | Stats + discover | |
| `strip-03`–`04` | Premier grid | Live listings if any, else seeded soft |
| `strip-04`–`05` | FAQ | |
| `strip-05`–`06` | Testimonials + dream CTA | |
| `strip-07` | Footer | |

## Refs

`../../../docs/assets.md` · `../15` · `../16` · `../18`
