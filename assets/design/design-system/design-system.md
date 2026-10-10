# EverGreen — Design system (site)

**Statut :** v2.0 — composants + **toutes pages / forms / states** + dashboards  
**Source visuelle :** mockups `../` (`01|02|03-evergreen-layout-board.png` + `previews/strip-*.jpg`)  
**Crops photo :** `../../images/`  
**Eng amont :** `docs/design-tokens.md` · `dossier/tech/site/18-design-system.md` · sitemap `13`  
**Sprints :** `S05-mockup-fidelity` · `S06-catalogue-carte-geo` · `S09-dashboards-reporting`

> Contrat visuel opérationnel. Boards = screenshots → ce doc + `components/` **infèrent** le reste.  
> Copy prod = **FR métier SN** (pas les placeholders EN du template).

---

## 0. Principes

| # | Règle |
| ---: | --- |
| 1 | **Layout = mockup** (composition, radius, densités, hero full-bleed) |
| 2 | **Copy = FR métier SN** |
| 3 | Palette lock hex (pas purple / pas glow) |
| 4 | Coins larges (pills · cards 24px · search sheet ~40px) |
| 5 | 1 CTA primaire fort par section viewport |
| 6 | Photos = ancre ; chrome UI = ink / sage / leaf |
| 7 | **3 thèmes** : light · dark · green (`data-theme`) |
| 8 | Logo = **lockup unique** (feuille + EverGreen + IMMOBILIER) ; favicon = **feuille seule** |

**Brand assets :** [`brand/brand.md`](./brand/brand.md)

---

## 1. Foundations

### 1.1 Couleurs

| Token | Hex | Rôle |
| --- | --- | --- |
| `bg` | `#F2F2F2` | Fond page |
| `ink` | `#0F0F09` | Texte · boutons primaires |
| `sage` | `#C4CEB8` | CTA secondaire / Sign up |
| `muted` | `#585E5F` | Texte secondaire |
| `olive` | `#453F22` | Focus · pastille TF |
| `steel` | `#9EA9B2` | Borders · chips |
| `bronze` | `#8D7658` | Pastille délibération |
| `white` | `#FFFFFF` | Cards · badges |
| `danger` | `#B42318` | Erreurs |
| `success` | `#3F6212` | Succès soft |

```css
:root {
  --color-bg: #f2f2f2;
  --color-ink: #0f0f09;
  --color-sage: #c4ceb8;
  --color-muted: #585e5f;
  --color-olive: #453f22;
  --color-steel: #9ea9b2;
  --color-bronze: #8d7658;
  --color-white: #ffffff;
  --radius-pill: 9999px;
  --radius-card: 24px;
  --radius-sheet: 40px;
}
```

![Color palette](./components/ds-01-color-palette.jpg)

### 1.2 Typographie

| Rôle | Face | Taille | Poids |
| --- | --- | --- | --- |
| Display / H1 | Syne (ou geometric bold) | 40–64 / 1.05 | 700 |
| H2 | DM Sans | 28–40 / 1.15 | 700 |
| Body | DM Sans | 16–18 / 1.5 | 400 |
| Meta / chips | DM Sans | 13–14 | 500 |
| Prix | tabular-nums | 18–28 | 700 |
| Button | DM Sans | 14–16 | 600 |

Rejet : Inter/Roboto/Arial seuls.

### 1.3 Spacing · radius · breakpoints

- Spacing : `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` · sections 64–96  
- `radius-pill` · `radius-card` 24px · `radius-sheet` 40px top  
- Frames : 390 / 768 / 1024 / **1440**

---

## 2. Composants

### DS-02 Buttons

Primary ink · Secondary sage · Outline · Ghost · Search large.

![Buttons](./components/ds-02-buttons.jpg)

### DS-03 Nav / header

Logo · pill nav translucide · actif blanc · CTA sage · FR : Accueil Agence Biens Contact.

![Nav](./components/ds-03-nav.jpg)

### DS-04 Property card

Photo 24px · badge À vendre/À louer · meta · titre · prix FCFA · lieu.

![Property card](./components/ds-04-property-card.jpg)

### DS-05 Search / filter card

Sheet overlap hero · 4 champs · chips · Rechercher.

![Search card](./components/ds-05-search-card.jpg)

### DS-06 Hero

Full-bleed photo · tags · headline split · nav overlay · amorce search sheet.

![Hero](./components/ds-06-hero.jpg)

### DS-07 Filter chips

Chips Ville / Maison / … + CTA noir Rechercher.

![Filter chips](./components/ds-07-filter-chips.jpg)

### DS-08 Feature / story grid

Headline + video pill · trio large photo / card / pool + CTA.

![Feature grid](./components/ds-08-feature-grid.jpg)

### DS-09 Stats row

4 colonnes chiffres + labels séparateurs.

![Stats](./components/ds-09-stats-row.jpg)

### DS-10 Discover map split

Carte + pin sage · copy · CTA Trouver les biens proches.

![Discover](./components/ds-10-discover-map.jpg)

### DS-11 FAQ accordion

Header · item expanded (+ image) · items collapsed chevron.

![FAQ](./components/ds-11-faq.jpg)

### DS-12 Testimonials

Avatars + compteur · card portrait/quote · flèches · dots sage.

![Testimonials](./components/ds-12-testimonial.jpg)

### DS-13 CTA banner

Photo full-bleed overlay · headline · pill blanche Commencer.

![CTA](./components/ds-13-cta-banner.jpg)

### DS-14 Footer

Headline + contact · nav 3 zones + logo centre · legal.

![Footer](./components/ds-14-footer.jpg)

### DS-15 PaperBadge (métier SN)

Titre foncier (olive) · Bail (steel) · Délibération (bronze) · Autre.

![PaperBadge](./components/ds-15-paper-badge.jpg)

### DS-16 Listing fiche (inféré)

Galerie · pastille · prix · specs · WA + Contacter · lead soft.

![Fiche](./components/ds-16-listing-fiche.jpg)

### DS-17 Catalogue (+ empty)

Filtres · grille cards · état vide soft + WA.

![Catalogue](./components/ds-17-catalogue.jpg)

### DS-18 Lead form / contact

Card · champs · consent · Envoyer + WhatsApp.

![Lead form](./components/ds-18-lead-form.jpg)

### DS-19 Mobile nav

Drawer pill links · CTA sage bas · 390 frame.

![Mobile nav](./components/ds-19-mobile-nav.jpg)

### DS-20 Inputs / focus

Default · focus ring olive · error · select · checkbox/radio.

![Inputs](./components/ds-20-inputs.jpg)

---

## 3. Inventaire

| ID | Item | Source | Statut |
| --- | --- | --- | --- |
| DS-01 | Color palette | tokens | ✅ |
| DS-02 | Buttons | strip 00/03 | ✅ |
| DS-03 | Nav / header | strip 00 | ✅ |
| DS-04 | Property card | strip 03–04 | ✅ |
| DS-05 | Search / filter | strip 00–01 | ✅ |
| DS-06 | Hero | strip 00 | ✅ |
| DS-07 | Filter chips | strip 01 | ✅ |
| DS-08 | Feature grid | strip 01 | ✅ |
| DS-09 | Stats row | strip 02 | ✅ |
| DS-10 | Discover map | strip 02 | ✅ |
| DS-11 | FAQ | strip 04–05 | ✅ |
| DS-12 | Testimonials | strip 05–06 | ✅ |
| DS-13 | CTA banner | strip 06 | ✅ |
| DS-14 | Footer | strip 07 | ✅ |
| DS-15 | PaperBadge | métier | ✅ |
| DS-16 | Fiche listing | inféré | ✅ |
| DS-17 | Catalogue | inféré | ✅ |
| DS-18 | Lead form | inféré | ✅ |
| DS-19 | Mobile nav | inféré | ✅ |
| DS-20 | Inputs | inféré | ✅ |

---

## 4. Mapping pages ↔ DS

| Route | Composants |
| --- | --- |
| `/` | 03 · 05 · 06 · 07 · 08 · 09 · 10 · cards · 11 · 12 · 13 · 14 |
| `/acheter` · `/louer` | 03 · 07 · 04 · 17 · map soft |
| Fiche | 16 · 15 · 02 · 18 |
| `/contact` | 18 · 20 |
| `/agence` · `/guides` | 03 · typo · 02 · 14 |
| `/espace/*` | tokens only · densité compacte |

---

## 5. Arborescence renforcée (v2)

| Branche | Index | Contenu |
| --- | --- | --- |
| [`components/`](./components/) | §2 ci-dessus | DS-01…20 atomes |
| [`pages/`](./pages/INDEX.md) | **toutes les pages** | `public/*` · `espace/*` · chaque feuille = `layout.jpg` |
| [`forms/`](./forms/INDEX.md) | **tous les formulaires** | leads · simus · BO · portails |
| [`states/`](./states/INDEX.md) | empty / load / error / toast / gate | |
| [`dashboards/`](./dashboards/README.md) | personas | dash + reports |

Voir aussi [`README.md`](./README.md) pour le schéma dossiers.

## 6. Dashboards & reports

| Dossier | Dashboard | Reports |
| --- | :---: | :---: |
| [`dashboards/agent/`](./dashboards/agent/) | ✅ | ✅ |
| [`dashboards/moderator/`](./dashboards/moderator/) | ✅ | ✅ |
| [`dashboards/ger/`](./dashboards/ger/) | ✅ | ✅ |
| [`dashboards/admin/`](./dashboards/admin/) | ✅ | ✅ |
| [`dashboards/client/`](./dashboards/client/) | ✅ | ❌ |
| [`dashboards/landlord/`](./dashboards/landlord/) | ✅ | ✅ |

## 7. Next

Implémenter contre ces frames (S05 public · S08 BO).  
Régénérer une frame : indiquer le chemin dossier (ex. `pages/public/outils/mensualite`).
