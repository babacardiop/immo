# Design system — Charte composants UI + tokens

**Document :** Dossier · Tech · Site · 18  
**Statut :** v1.0 — sept. 2026  
**Stack UI :** Tailwind CSS + **shadcn/ui** · Next.js App Router  
**Amont :** [`../../../docs/design-tokens.md`](../../../docs/design-tokens.md) · [`../../marketing/01-brand-guidelines.md`](../../marketing/01-brand-guidelines.md) · [`16-maquettes-ui.md`](./16-maquettes-ui.md) · [`15-wireframes.md`](./15-wireframes.md) · [`03`](./03-wireframes-mvp.md) · [`../../../docs/tech-stack.md`](../../../docs/tech-stack.md)  
**Aval :** `globals.css` · Figma library `EverGreen-UI` · `packages/ui` · Storybook opt.

> **Rôle :** charte **tokens + composants** — contrat unique design ↔ eng (et agents IA).  
> Hex primitifs source → `docs/design-tokens.md`. HF frames → `16`. Comportements → shadcn composition.

---

## 0. En une phrase

Primitives EverGreen (ink / sage / olive…) mappées en **tokens sémantiques** shadcn ; composants = variants + états — **jamais** de hex hardcodés dans les screens.

```
Primitive (hex) → Semantic CSS vars → Tailwind utilities → shadcn / custom
```

---

## 1. Principes DS

| # | Principe |
| ---: | --- |
| 1 | **Token-only** — pas de `#C4CEB8` dans un composant écran |
| 2 | Paires `*-foreground` sur chaque surface ([shadcn theming](https://ui.shadcn.com/docs/theming)) |
| 3 | **1 CTA primaire** par section viewport |
| 4 | Densité **confortable public** · **compacte** BO agent |
| 5 | Accessibilité : focus ring visible · contrast AA texte ink/bg |
| 6 | Light only Y1 — pas de `.dark` ship |
| 7 | Composants métier (`PaperBadge`, `ListingCard`) au-dessus de shadcn |
| 8 | Anti-slop : pas purple glow, pas pills excessives, pas hero clutter |

Réf. agent : [DESIGN.md shadcn](https://designmd.directory/guides/design-md-for-shadcn) — densité + overrides explicites.

---

## 2. Foundations — Tokens

### 2.1 Primitives (source vérité)

| Primitive | Hex | Rôle |
| --- | --- | --- |
| `bg` | `#F2F2F2` | Fond page |
| `ink` | `#0F0F09` | Texte / primary button |
| `sage` | `#C4CEB8` | Accent secondaire / soft CTA |
| `muted` | `#585E5F` | Texte secondaire |
| `olive` | `#453F22` | Accent terre · pastille TF |
| `steel` | `#9EA9B2` | Borders · icons · chips |
| `bronze` | `#8D7658` | Accent chaud · pastille délibération |
| `white` | `#FFFFFF` | Surface card |
| `danger` | `#B42318` | Erreurs (dérivé — figer OKLCH) |
| `success` | `#3F6212` | Succès soft (dérivé olive family) |

### 2.2 Mapping sémantique → shadcn

| shadcn / semantic | EverGreen | Usage |
| --- | --- | --- |
| `--background` | `bg` | Page |
| `--foreground` | `ink` | Texte |
| `--card` | `white` | Cards catalogue |
| `--card-foreground` | `ink` | |
| `--primary` | `ink` | Bouton principal · liens forts |
| `--primary-foreground` | `bg` / white | Texte sur primary |
| `--secondary` | `sage` | CTA secondaire |
| `--secondary-foreground` | `ink` | |
| `--muted` | steel @ 20% / bg mix | Surfaces muted |
| `--muted-foreground` | `muted` | Labels |
| `--accent` | `sage` soft | Hover rows |
| `--accent-foreground` | `ink` | |
| `--destructive` | `danger` | Erreurs · delete |
| `--border` | `steel` | Borders 1px |
| `--input` | `steel` | Input border |
| `--ring` | `olive` | Focus |
| `--radius` | **0.5rem** (8px) base | Cards/inputs — pas full pill |

**EverGreen extensions** (custom CSS vars) :

```css
--paper-tf: var(--olive-ish);      /* #453F22 */
--paper-bail: var(--steel);
--paper-delib: var(--bronze);
--wa-fab-bg: var(--primary);       /* ink — pas vert WA brand */
--price: var(--foreground);
```

Impl. : `globals.css` `:root` en HSL ou OKLCH dérivés des hex — eng convertit une fois.

### 2.3 Exemple `:root` (indicatif)

```css
:root {
  --background: 0 0% 95%;           /* #F2F2F2 */
  --foreground: 60 27% 5%;          /* #0F0F09 */
  --card: 0 0% 100%;
  --card-foreground: 60 27% 5%;
  --primary: 60 27% 5%;
  --primary-foreground: 0 0% 95%;
  --secondary: 85 18% 76%;          /* sage approx */
  --secondary-foreground: 60 27% 5%;
  --muted-foreground: 190 4% 36%;   /* #585E5F */
  --border: 210 12% 66%;            /* steel approx */
  --ring: 48 35% 20%;               /* olive */
  --radius: 0.5rem;
  --paper-tf: 48 35% 20%;
  --paper-bail: 210 12% 66%;
  --paper-delib: 33 23% 45%;
}
```

Valeurs exactes = calibration Figma Variables (`16`) puis lock ici.

### 2.4 Spacing

Échelle **4-pt / 8-pt** :

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`

| Contexte | Padding typique |
| --- | --- |
| Page mobile margin | 16 |
| Card padding | 16 |
| Section gap | 48–64 |
| BO table cell | `px-3 py-2` (compact) |
| Form stack | gap 16 |

### 2.5 Radius & elevation

| Token | Valeur | Usage |
| --- | --- | --- |
| `radius-sm` | `calc(var(--radius) - 2px)` | Chips |
| `radius-md` | `var(--radius)` | Inputs · buttons |
| `radius-lg` | `calc(var(--radius) + 4px)` | Cards |
| `radius-full` | **rare** | FAB only · pas chips nav |

Elevation : **border 1px** preferred · shadow `sm` max sur card hover — pas multi-layer glow.

### 2.6 Typographie

| Rôle | Famille (working) | Taille / leading | Poids |
| --- | --- | --- | --- |
| Display | **Syne** ou Fraunces | 32–48 / 1.1 | 600–700 |
| H1 page | Display | 28–40 | 600 |
| H2 | Sans **DM Sans** / Source Sans 3 | 22–28 | 600 |
| Body | Sans | 16 / 1.5 | 400 |
| Small / meta | Sans | 13–14 / 1.4 | 400 · muted |
| Prix FCFA | Sans **tabular-nums** | 24–36 | 600 |
| Button | Sans | 14–16 | 500 |

Lock final fonts dans Figma + `next/font`. **Inter/Roboto/Arial seuls = rejet.**

### 2.7 Iconographie

- Lucide (shadcn default) stroke 1.5–2  
- WA : glyph officiel monochrome sur bouton ink  
- Pas d’emoji comme UI chrome  

### 2.8 Breakpoints

| Name | Min |
| --- | ---: |
| `sm` | 640 |
| `md` | 768 |
| `lg` | 1024 |
| `xl` | 1280 |
| Design frames | 390 / 1440 |

Grille : 4 col mobile · 12 col desktop · gutters 8 / 24.

---

## 3. Catalogue composants

Légende : **S** = shadcn stock (thémé) · **C** = custom EverGreen · **P** = pattern composé

### 3.1 Actions & forms

| Composant | Type | Variants / règles |
| --- | :---: | --- |
| `Button` | S | `default`=primary ink · `secondary`=sage · `outline` · `ghost` · `destructive` · size `default`\|`sm`\|`lg` · **pas** `rounded-full` sauf FAB |
| `Button` WA | C/P | `variant="wa"` = primary + icon WA · label « WhatsApp » / « Visite » |
| `Input` | S | Focus ring olive · error border destructive |
| `Textarea` | S | idem |
| `Select` | S | Filtres · papier enum |
| `Checkbox` / `Radio` | S | Forms agent |
| `Label` | S | |
| `Form` | S | RHF + zod patterns |
| `FormLead` | P | 3–4 fields max · toast success |

**Règle CTA :** 1 `default` visible above-the-fold section ; WA peut être le primary sur fiche.

### 3.2 Feedback

| Composant | Type | Règles |
| --- | :---: | --- |
| `Alert` | S | Disclaimers longs OK · pas pour toast |
| `DisclaimerInline` | C | Variants `paper` \| `sim` · icon ⚠ · near price / result |
| `Toast` (sonner) | S | Success form · errors réseau |
| `Skeleton` | S | Catalogue · fiche galerie |
| `Empty` | S/P | Catalogue 0 résultat + CTA WA |
| `Badge` | S | Meta soft — **pas** remplacer `PaperBadge` |

### 3.3 Navigation & chrome

| Composant | Type | Règles |
| --- | :---: | --- |
| `SiteHeader` | C | Logo · L1 ≤7 · search · WA · Espace |
| `MobileNav` | P | Sheet/Drawer · même ordre |
| `Footer` | C | NAP · legal · parcours |
| `AppNav` | C | Shell agent — **sans** L1 marketing |
| `Breadcrumb` | S | Fiche |
| `FAB` | C | WA sticky · `radius-full` OK |

### 3.4 Catalogue & confiance (cœur métier)

| Composant | Type | Variants |
| --- | :---: | --- |
| **`PaperBadge`** | **C** | `tf` · `bail` · `deliberation` — styles distincts (§4) |
| `ListingCard` | C | Image · price · PaperBadge · type · zone · optional étalé |
| `FilterChip` | C/P | Toggle facet |
| `FilterSheet` | P | Drawer mobile filtres |
| `MapListToggle` | C | Liste \| Carte |
| `ListingGallery` | C | Swipe · LCP priority first |
| `KeyFacts` | C | Prix + PaperBadge + m² + zone |
| `StickyCtaBar` | C | Mobile fiche / outil |
| `MapEmbed` | C | Leaflet wrapper · ~320–400px |

### 3.5 Outils

| Composant | Type | Règles |
| --- | :---: | --- |
| `SimulatorEmbed` | C | Compact (fiche) \| Full (page) |
| `SimResultPanel` | C | Gros FCFA · disc · CTAs in-result |
| `SimDisclaimer` | C | Alias disc `sim` · étalé ≠ banque |

### 3.6 Contenu

| Composant | Type | Règles |
| --- | :---: | --- |
| `GuideCtaBand` | C | Outil + WA |
| `Prose` | P | typography plugin · guides |
| `FaqAccordion` | S Accordion | JSON-LD sync eng |

### 3.7 BO agent

| Composant | Type | Densité |
| --- | :---: | --- |
| `DataTable` | S | compact |
| `AgentFieldGroup` | C | paper required indicator |
| `PublishGateAlert` | C | Bloque publish sans papier |
| `StatusPill` | C | draft / published / sold… |

### 3.8 Overlays (composition shadcn)

| Cas | Composant |
| --- | --- |
| Filtres mobile | `Sheet` / `Drawer` |
| Confirm destructive | `AlertDialog` |
| Share | `Dialog` or Sheet |
| Hover info | `HoverCard` rare |

Toujours `*Title` accessible ([composition rules](https://github.com/shadcn/ui/blob/HEAD/skills/shadcn/rules/composition.md)).

---

## 4. `PaperBadge` — spec normative

| Variant | Surface | Texte | Interdit |
| --- | --- | --- | --- |
| `tf` | bg olive · text light/bg | « Titre foncier » | — |
| `bail` | border steel · text muted/ink | « Bail … » | Style identique TF |
| `deliberation` | bg bronze soft · text ink | « Délibération » | Badge vert « OK » · label TF |

Toujours paired avec `DisclaimerInline variant="paper"` si `deliberation` sur fiche.

---

## 5. États obligatoires (tous composants interactifs)

| État | Requis |
| --- | :---: |
| Default | ● |
| Hover (desktop) | ● |
| Focus-visible | ● |
| Disabled | ● |
| Loading | ● si async |
| Error | ● forms |
| Empty | ● listes |

Button loading : composer `Spinner` + disabled — pas de prop magique inventée hors pattern shadcn.

---

## 6. Patterns d’écran (applique tokens)

| Pattern | Règles DS |
| --- | --- |
| **Home hero** | Brand display · 1 headline · search · full-bleed · **0** stats |
| **Catalogue** | Cards border · PaperBadge coin · 1 primary filter papier |
| **Fiche** | KeyFacts + badge · disc avant prose · sticky WA |
| **Outil** | Result ungated · disc sim · 1 CTA dominant |
| **Agent** | Compact · gate alert · AppNav |

---

## 7. Motion (DS)

| Motion | Spec |
| --- | --- |
| Card hover | `translateY(-2px)` · 150ms ease |
| Sheet | shadcn default |
| Sticky CTA | opacity 0→1 on scroll threshold |
| Page hero | optional fade 200–300ms |

Préférer CSS/`motion` léger — pas Lottie spam.

---

## 8. Contenu UI (microcopy tokens)

| Clé | FR |
| --- | --- |
| `cta.visit_wa` | Visite WhatsApp |
| `cta.sim_wa` | Parler à un conseiller |
| `disc.sim_credit` | Estimation indicative — ce n’est pas une offre de crédit bancaire. |
| `disc.delib` | Délibération = droit d’usage, pas un titre foncier. |
| `empty.catalog` | Aucun bien pour ces filtres. |
| `gate.paper` | Indiquez le type de papier avant publication. |

Vouvoiement UI public par défaut · ton brand `01`.

---

## 9. Anti-patterns (rejet review)

| Anti | Remède |
| --- | --- |
| Hex inline `className="bg-[#C4CEB8]"` | Token `bg-secondary` |
| `PaperBadge` générique Badge vert | Variants §4 |
| Primary blue shadcn défaut | Override `--primary` = ink |
| Rounded-full chips partout | `radius-sm` |
| Multi primary CTAs | 1 default / section |
| Dark mode classes ship | Strip Y1 |
| Inter only | Display + sans §2.6 |
| Ombre 3 niveaux + glow | Border + shadow-sm |
| Vert WhatsApp bouton full-bleed | Ink + icon |

---

## 10. Fichier & tooling

| Artefact | Rôle |
| --- | --- |
| `app/globals.css` | CSS variables |
| `components/ui/*` | shadcn |
| `components/evergreen/*` | PaperBadge, ListingCard, … |
| Figma `EverGreen-UI` | Library visuelle (`16`) |
| `docs/design-tokens.md` | Primitives hex doc |
| Storybook (opt. Y1+) | Revue états |

**Publish order :** tokens → shadcn theme → custom C → screens.

---

## 11. Checklist PR UI

- [ ] Pas de hex orphelin  
- [ ] Focus visible clavier  
- [ ] PaperBadge correct si papier  
- [ ] Disc si délibération / simu  
- [ ] Densité BO vs public respectée  
- [ ] Images `next/image`  
- [ ] Mobile 390 smoke  

---

## 12. Roadmap DS

| Vague | Ajouts |
| --- | --- |
| V0 | Tokens · Button/Input · ListingCard · PaperBadge · Nav · StickyCta · Alert disc |
| V1 | SimulatorEmbed · SimResultPanel · Partner CTA |
| V3 | Portal shells · Receipt · Ledger table |
| V7 | Chart tokens Observatoire |
| Later | Dark mode · i18n typographic tweaks |

---

## 13. Sources

| Source | Apport |
| --- | --- |
| `design-tokens.md` · brand `01` · `16` | EverGreen |
| [shadcn theming](https://ui.shadcn.com/docs/theming) | Semantic pairs · radius |
| [shadcn customization](https://github.com/shadcn/ui/blob/HEAD/skills/shadcn/customization.md) | CSS var pipeline |
| [DESIGN.md directory](https://designmd.directory/guides/design-md-for-shadcn) | Density · agent contract |
| Composition rules shadcn | Overlay / Empty / Toast |

---

## 14. Liens

| Doc | Rôle |
| --- | --- |
| [`../../../docs/design-tokens.md`](../../../docs/design-tokens.md) | Hex |
| [`16-maquettes-ui.md`](./16-maquettes-ui.md) | HF / Figma |
| [`15-wireframes.md`](./15-wireframes.md) | Structure |
| [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) | Champs badge |
| [`14-matrice-droits-roles.md`](./14-matrice-droits-roles.md) | Shells auth |

---

*Design system EverGreen Site v1.0 — sept. 2026. ink primary · sage secondary · PaperBadge normatif · shadcn token-only · light Y1 · anti-slop.*
