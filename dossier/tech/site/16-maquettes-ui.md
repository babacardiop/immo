# Maquettes UI HF — Spec Figma & handoff

**Document :** Dossier · Tech · Site · 16  
**Statut :** v1.0 — sept. 2026 · **Figma : à créer / lien §2**  
**Fidélité :** High-fidelity (couleur, typo, états) — **après** sign-off lo-fi `15`  
**Amont :** [`15-wireframes.md`](./15-wireframes.md) · [`03`](./03-wireframes-mvp.md) · [`13`](./13-sitemap-architecture-information.md) · [`../../../docs/design-tokens.md`](../../../docs/design-tokens.md) · [`../../marketing/01-brand-guidelines.md`](../../marketing/01-brand-guidelines.md) · [`../../../docs/social-share-cards.md`](../../../docs/social-share-cards.md)  
**Aval :** [`17-prototype-interactif.md`](./17-prototype-interactif.md) · [`18-design-system.md`](./18-design-system.md) · Dev Mode eng

> **Rôle :** cahier des **maquettes haute fidélité** — organisation fichier Figma, direction visuelle, inventaire frames HF, états composants, règles handoff.  
> Pas de pixels dans ce markdown : la vérité visuelle = **Figma Production**. Ce doc = contrat + lien + checklist.

---

## 0. En une phrase

HF = tokens EverGreen + frames Production prêts Dev Mode — **pas** exploration mélangée ; lien Figma unique ci-dessous.

```
15 lo-fi sign-off  →  16 HF Figma (Production)  →  17 proto  →  code
         ↑
   library tokens (→ 18)
```

---

## 1. Objectifs des maquettes HF

| # | Objectif |
| ---: | --- |
| 1 | Valider **marque** (hero, pastilles papier, CTA WA) en couleur réelle |
| 2 | Fournir specs Dev Mode (spacing, type, states) |
| 3 | Couvrir **tous** IDs P0/P0b (`03`) en mobile + desktop critiques |
| 4 | Séparer library composants du fichier flows |
| 5 | Préparer OG / share cards crops |

Hors scope HF Y1 : dark mode · i18n EN · portails L/P V3 (frames icebox optionnels).

---

## 2. Lien Figma (source de vérité visuelle)

| Champ | Valeur |
| --- | --- |
| **URL fichier hub** | `_À RENSEIGNER_` — ex. `https://www.figma.com/design/XXXXXXXX/EverGreen-Hub` |
| **URL library DS** | `_À RENSEIGNER_` — fichier séparé `EverGreen-UI` (composants) |
| **Prototype** | Voir `17` (lien proto distinct ou page Prototype du même fichier) |
| **Accès** | View : eng + OD · Edit : design lead · Dev Mode : eng |
| **Version nommée** | `HF-v0.1-MVP` à la 1ʳᵉ livraison Production |

**Statut lien :** ❌ placeholder — créer le fichier selon §3 puis remplacer cette cellule et cocher README.

Quand le lien est collé : mettre à jour aussi `dossier/tech/site/README.md` (note sources) si besoin.

---

## 3. Structure fichier Figma (canon 2026)

Bench ([Mantlr file structure](https://mantlr.com/blog/figma-file-structure-senior-designers), [handoff Interactive Studio](https://insights.theinteractive.studio/how-to-prepare-figma-for-development-handoff), [Figma→code 2026](https://webdesigndev.com/figma-to-code-design-handoff-guide-2026/), [Dev Mode handoff](https://wpdean.com/figma-developer-handoff/)) :

### 3.1 Fichier `EverGreen-Hub` (flows / écrans)

| Page | Contenu |
| --- | --- |
| 📗 **Cover** | Nom, statut, date, owners, **liens** library + proto + docs `15`/`18` |
| 🚀 **Production** | Frames **Ready for Dev** only · titrés `W-ID / breakpoint` |
| 🔗 **Flows** | Flèches / overview parcours J1 · agent · gérer |
| 📝 **Annotations** | Notes motion, edge cases, copy legal |
| 🧪 **Exploration** | Broillons — **interdit** handoff |
| 📦 **Archive** | Anciennes versions datées |
| 📎 **Reference** | Moodboards Dribbble Oripio · photos SN mood |

### 3.2 Fichier `EverGreen-UI` (library)

| Page | Contenu |
| --- | --- |
| Cover | Version tokens |
| Foundations | Color · type · space · radius · elevation |
| Components | Buttons, inputs, cards, badges, nav… + **variants** |
| Patterns | Listing row, sim result, disclaimer, sticky CTA |
| Assets | Icons, logos, illustration slots |

**Règle :** 1 feature file ≠ library mélangée. Publish library → consume dans Hub.

### 3.3 Naming frames

```
W-HOME / Mobile 390
W-HOME / Desktop 1440
W-ACH-FICHE / Mobile · TF
W-ACH-FICHE / Mobile · Délibération+disc
W-OUT-MEN / Desktop · résultat
```

Statuts frame (prefix ou stamp) :

| Stamp | Sens |
| --- | --- |
| `✅ Ready` | Handoff OK |
| `👀 Review` | Attente OD/GER |
| `🚧 WIP` | Pas pour eng |
| `❄ Icebox` | V2+ |

---

## 4. Direction visuelle HF

### 4.1 Tokens couleur (source `design-tokens.md`)

| Token | Hex | Usage HF |
| --- | --- | --- |
| `bg` | `#F2F2F2` | Fond page |
| `ink` | `#0F0F09` | Texte · boutons dark |
| `sage` | `#C4CEB8` | Accent CTA secondaire / Sign-up-like |
| `muted` | `#585E5F` | Texte secondaire |
| `olive` | `#453F22` | Accent terre profond |
| `steel` | `#9EA9B2` | Borders · chips |
| `bronze` | `#8D7658` | Accent chaud secondaire |

**Surfaces :** `bg` + cartes **blanches** `#FFFFFF` pour lisibilité catalogue (dérivé — figer en Variables Figma).  
**CTA WA :** ink ou olive plein · **pas** vert WhatsApp brand squatté — icône WA OK, bouton EverGreen.

Figma Variables : modes `Primitive` → `Semantic` (`bg/page`, `fg/default`, `accent/primary`, `border/subtle`, `paper/tf`, `paper/bail`, `paper/delib`).

### 4.2 Pastilles papier (HF critique)

| Papier | Traitement UI |
| --- | --- |
| TF | Chip solid olive/ink · label « Titre foncier » |
| Bail | Chip outline steel · « Bail… » |
| Délibération | Chip bronze/warning soft · **jamais** même style que TF + zone disclaimer `⚠` sous faits clés |

### 4.3 Typographie (direction — figer dans `18`)

Éviter stacks AI-default (Inter/Roboto/Arial seuls). Proposition working :

| Rôle | Direction | Notes |
| --- | --- | --- |
| Display / brand | Serif ou grotesque expressive (ex. **Fraunces** / **Libre Baskerville** / **Syne**) | Hero, prix fiche |
| UI / body | Sans humaniste (ex. **Source Sans 3** / **DM Sans**) | Nav, forms, cards |
| Mono soft | Optionnel chiffres simu | Tabular nums FCFA |

**À valider** en Exploration puis lock Variables · documenter choix final dans `18`.

### 4.4 Grille & breakpoints

| Breakpoint | Frame width | Colonnes |
| --- | ---: | --- |
| Mobile | **390** | 4 · margin 16 · gutter 8 |
| Tablet (opt.) | 768 | 8 |
| Desktop | **1440** | 12 · margin 64 · gutter 24 |

Spacing scale : **4 / 8 / 12 / 16 / 24 / 32 / 48 / 64** (8-pt base).  
Radius : cards catalogue **8–12** · pas `rounded-full` pills partout (anti-slop).  
Elevation : ombres **légères** 1 niveau max sur cards interactives — pas multi-layer glow.

### 4.5 Motion (présence, pas bruit) — annoter pour `17`

Min. **2–3** motions intentionnelles HF→proto :

1. Hero fade/slide soft marque + search  
2. Card hover lift 2px desktop  
3. Sticky CTA fiche appear on scroll  

Pas de parallax agressif · pas de confetti.

### 4.6 Anti-direction (rejet HF)

Aligné règles design projet + brand :

| Interdit |
| --- |
| Thème purple-on-white / purple→indigo |
| Cream `#F4F1EA` + serif terracotta cliché |
| Layout « broadsheet » dense hairline |
| Dark mode par défaut |
| Glow neon · pills excessives · emoji UI |
| Hero inset / card flottante / collage tuilé |
| Overlay badges promo sur hero media |
| Stats strip premier viewport |
| CTA « Crédit banque » style simu |

### 4.7 Imagerie

- Photos **réelles** SN (terrain, façade, rue) — pas stock generic US suburb  
- Hero = **full-bleed** edge-to-edge  
- Galerie fiche : 1 LCP nette · reste lazy  
- Placeholder HF : photos `assets/design/` / mood Reference page  

---

## 5. Inventaire maquettes HF (MVP)

Priorité = `03`. Chaque ligne = frame M (+ D si ●).

### 5.1 Vague 0 — Must HF

| ID | Mobile | Desktop | Notes HF |
| --- | :---: | :---: | --- |
| W-HOME | ● | ● | Brand hero · search · 0 stats |
| W-NAV / drawer | ● | ● | Sage/ink accents |
| W-ACH-HUB | ● | ● | Sidebar filtres D · chips papier |
| W-ACH-MAP | ● | ○ | Sheet preview |
| W-FILTERS | ● | (sidebar) | Papier prominent |
| W-CARD | ● | ● | Variants TF/bail/délib |
| W-ACH-FICHE | ● | ● | Split CTA D · disc délib |
| W-LOU-HUB | ● | ● | Sans facet papier req |
| W-LOU-FICHE | ● | ● | |
| W-GER | ● | ○ | |
| W-GER-FORM | ● | ○ | |
| W-DIA | ● | ○ | « Pas Wave vendeur » near CTA |
| W-AGE-HOW | ● | ○ | |
| W-AGE-CONTACT | ● | ● | NAP |
| W-GUI-HUB | ● | ○ | |
| W-GUI-TF | ● | ● | |
| W-AGT-LOGIN | ● | ○ | |
| W-AGT-LIST | ● | ● | Shell app distinct |
| W-AGT-NEW/EDIT | ● | ● | Gate papier UI |
| W-AGT-MEDIA | ● | ○ | |
| W-EMPTY / LOAD / TOAST / 404 | ● | — | |
| W-LEGAL-* | ● | ● | Minimal |
| W-FOOT | ● | ● | |

### 5.2 Vague 1 — Must HF

| ID | Mobile | Desktop | Notes HF |
| --- | :---: | :---: | --- |
| W-OUT-HUB | ● | ● | Nav L1 Outils |
| W-OUT-MEN | ● | ● | Résultat ungated + disc |
| W-OUT-CON | ● | ● | |
| W-OUT-BUD | ● | ● | |
| W-OUT-RES pattern | ● | ● | Gros FCFA tabular |
| W-OUT-EMB | ● | ● | Sur fiche terrain |
| W-OUT-ERR | ● | — | |
| W-GUI-CONST | ● | ● | CTA outil |
| W-ACH-FICHE-T | ● | ● | + embeds |
| Partner CTA states | ● | ○ | Intro BTP/archi/notaire |

### 5.3 Share / OG (artboards)

| Artboard | Size | Usage |
| --- | --- | --- |
| OG landscape | 1200×630 | Fiche / home / guide |
| OG square | 1080×1080 | IG |
| OG story | 1080×1920 | Stories / TikTok kit |

Templates : photo + prix FCFA + pastille papier + logo EverGreen — `social-share-cards.md`.

### 5.4 Icebox (ne pas bloquer MVP)

Portails proprio/client · Observatoire · Carte prix · Estimation push V5 — stamp `❄`.

---

## 6. Composants HF prioritaires (library)

Chaque composant = variants Default / Hover / Focus / Disabled / Error (+ Loading si async).

| Composant | Variants clés |
| --- | --- |
| `Button` | Primary ink · Secondary sage · Ghost · WA |
| `Input` / `Select` | Default · Focus · Error · Filled |
| `ListingCard` | TF · Bail · Délib · Sold overlay |
| `PaperBadge` | 3 types |
| `FilterChip` | On/Off |
| `DisclaimerInline` | Papier · Simu |
| `StickyCtaBar` | Fiche · Outil |
| `SimResultPanel` | Success · Empty calc |
| `Nav` / `Drawer` | Public |
| `AppNav` | Agent shell |
| `Toast` | Success · Error |
| `MapPin` + preview sheet | — |
| `FormLead` | 3–4 fields |

Publish library avant de peindre Production screens (évite drift).

---

## 7. Copy HF (garde-fous)

| Surface | Copy imposé |
| --- | --- |
| Home promise | *Avant de payer, on vérifie. Ensuite on gère.* (ou tagline P0 brand) |
| Simu PUB-01 | « Mensualité étalé / loc-vente » · disc **≠ offre de crédit bancaire** |
| Délibération | Disc fort near price |
| Diaspora | « Pas de paiement Wave au vendeur » near CTA |
| Agent publish | Erreur explicite si papier manquant |

Review OD copy avant stamp `✅ Ready`.

---

## 8. Handoff eng (Definition of Done HF)

Bench Dev Mode 2026 :

- [ ] Frames Production Auto Layout · layers nommés (`card/listing/…`)  
- [ ] Variables liées (pas hardcode hex orphelin)  
- [ ] Tous états composants critiques  
- [ ] Annotations interactions (hover, sticky, drawer)  
- [ ] Assets export : icons SVG · photos slots documentés  
- [ ] Stamp `✅ Ready` + version Figma nommée  
- [ ] Lien §2 renseigné + accès eng  
- [ ] Écarts vs `15` documentés (si structure changée → MAJ `15`)  
- [ ] Pas de frame Exploration dans le parcours eng  

**Red flags handoff :** « Rectangle 47 » · spacing magique · mobile-only pour catalogue · pastille délibération stylée comme TF.

---

## 9. Process & RACI

| Étape | Design | OD/GER | Eng |
| --- | :---: | :---: | :---: |
| Sign-off `15` lo-fi | ● | ● | ○ |
| Foundations Variables | ● | ○ | ◐ review |
| Production V0 screens | ● | ● review | ○ |
| Production V1 outils | ● | ● | ○ |
| Ready for Dev | ● | ● | ● consume |
| Écarts impl. | ○ | ○ | ● + comment Figma |

Cadence : review HF **1× / semaine** jusqu’à MVP Ready.

---

## 10. Checklist création fichier (jour 0)

1. Créer `EverGreen-UI` + `EverGreen-Hub`  
2. Pages canon §3  
3. Importer tokens §4.1 en Variables  
4. Dupliquer frames depuis `15` (structure) → appliquer skin  
5. Peindre W-HOME + W-ACH-FICHE + W-CARD d’abord (marque test)  
6. **Brand test :** retirer la nav du hero — la page doit encore dire EverGreen  
7. Coller URL dans §2 · notifier eng  

---

## 11. Mood & références

| Ref | Usage |
| --- | --- |
| Dribbble Oripio / Sajibur (tokens source) | Layout boards — **adapter** nav métier EverGreen (pas Property List US) |
| `assets/design/*` (si présent repo) | Moodboard local |
| Senhectare (sérieux domaine) | Sérieux papier — pas copier UI |
| Concurrent SN clutter | Anti-ref |

PropTech UI kits (ex. Houzy-like) : **référence pattern** listing/map only — rebrander tokens · retirer dark/favoris non-MVP.

---

## 12. Traçabilité docs

| Doc | Relait à HF |
| --- | --- |
| `15` | Structure spatiale source |
| `03` | Liste IDs obligation |
| `13` | Ordre blocs fiche |
| `05` | Champs / badges |
| `06` | Simus embeds |
| `08` | OG sizes |
| `18` | DS gelé post-HF |
| `17` | Hotspots proto |

---

## 13. Journal versions HF

| Version | Date | Contenu | Lien Figma |
| --- | --- | --- | --- |
| v0.0 | — | Spec doc only (ce fichier) | — |
| v0.1 | _TBD_ | Production V0 P0 | _URL_ |
| v0.2 | _TBD_ | + V1 outils | _URL_ |

---

## 14. Sources

| Source | Apport |
| --- | --- |
| Tokens + brand `01` + `15`/`03`/`13` | EverGreen |
| Mantlr / Interactive Studio / WebDesignDev / WP Dean 2026 | Structure fichier · Ready for Dev · Dev Mode |
| RE UI kits (pattern only) | Inventory listing/detail/map |

---

## 15. Liens

| Doc | Rôle |
| --- | --- |
| [`15-wireframes.md`](./15-wireframes.md) | Lo-fi |
| [`18-design-system.md`](./18-design-system.md) | Tokens/composants gelés |
| [`17-prototype-interactif.md`](./17-prototype-interactif.md) | Proto |
| [`../../../docs/design-tokens.md`](../../../docs/design-tokens.md) | Hex source |

---

*Maquettes UI HF EverGreen Site v1.0 — sept. 2026. Figma Hub+UI séparés · Production only handoff · tokens sage/ink/olive · papier badges · anti-slop · lien §2 à coller.*
