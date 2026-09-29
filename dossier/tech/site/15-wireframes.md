# Wireframes B&W — Doc design lo-fi

**Document :** Dossier · Tech · Site · 15  
**Statut :** v1.0 — sept. 2026  
**Fidélité :** B&W / grey-box · structure & flux · **pas** pixels ni tokens HF  
**Amont :** [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) (inventaire IDs) · [`13-sitemap-architecture-information.md`](./13-sitemap-architecture-information.md) · [`02`](./02-parcours-utilisateurs.md) · [`12`](./12-user-stories-backlog.md)  
**Aval :** [`16-maquettes-ui.md`](./16-maquettes-ui.md) · [`17-prototype-interactif.md`](./17-prototype-interactif.md) · [`18-design-system.md`](./18-design-system.md) · Figma lo-fi

> **Rôle :** schémas **noir & blanc** (ASCII + annotations) des écrans P0/P0b — ce qu’on dessine avant Figma HF.  
> Inventaire contractuel des IDs → `03`. IA / templates blocs → `13`. Couleurs / typo → `16`–`18`.

---

## 0. En une phrase

Lo-fi pour **décider** la structure (avant design) : mobile-first, pastille papier & CTA WA visibles, hero brand sans clutter.

```
03 inventaire IDs  →  15 schémas B&W (ce doc)  →  16 HF Figma  →  17 proto
```

---

## 1. Convention de schéma

Bench lo-fi 2026 ([wireframe-doc](https://github.com/JimmySadek/wireframe-doc) / [UXClaim](https://uxclaim.com/skills/wireframe-doc), [Genfy ASCII](https://genfy.net/en/text-wireframe-generator), [Visily RE](https://www.visily.ai/templates/real-estate-website-wireframe), page-spec ASCII) :

| Règle | EverGreen |
| --- | --- |
| Largeur mobile | ~32–40 car. (viewport phone) |
| Largeur desktop | ~68–76 car. |
| Labels | `[Section]` entre crochets |
| CTA primaire | `[ CTA ]` gras conceptuel |
| Zones image | `::::` ou `IMG` |
| Greys only | Pas de couleur — annotations texte |
| Responsive | **2 frames** si structure change (M + D) |
| États | Frame séparé ou note `∅ / … / ! / ✓` |

### 1.1 Légende annotations

| Marque | Sens |
| --- | --- |
| `★` | Above-the-fold critique |
| `→WA` | Deep link WhatsApp |
| `PAPIER` | Pastille TF/bail/délibération |
| `⚠` | Disclaimer obligatoire |
| `FAB` | Floating / sticky |
| `own` | Scope agent (ACL `14`) |
| `V1` | Bloc Vague 1 only |

### 1.2 Anti-patterns wire (rejet review)

- Stat strip / KPI cards sur home  
- Badges flottants sur hero image  
- CTA multiples égaux (WA noyé)  
- Pastille papier sous le fold  
- Simu gated avant résultat  
- Nav « Annonces » générique  
- Shell agent avec nav marketing Acheter/Louer  

### 1.3 Checklist frame Done

- [ ] ID `W-*` + route  
- [ ] Mobile ASCII (+ desktop si layout change)  
- [ ] Notes comportement / empty  
- [ ] Lien US / EF si critique  
- [ ] Validé métier (papier / disclaimer) si applicable  

---

## 2. Carte des flows (B&W)

### 2.1 J1 Acheteur terrain (V1)

```
[W-HOME]──►[W-ACH-HUB]──►[W-FILTERS]──►[W-ACH-FICHE-T]
                                              │
                    ┌─────────────────────────┼────────────────┐
                    ▼                         ▼                ▼
              [W-OUT-EMB]              [W-OUT-MEN]      [W-OUT-CON/BUD]
                    │                         │                │
                    └──────────►[W-OUT-RES]───┴──► →WA / PartnerLead
```

### 2.2 Supply agent (V0)

```
[W-AGT-LOGIN]──►[W-AGT-LIST]──►[W-AGT-NEW]──►[W-AGT-MEDIA]
                                      │
                                      ▼ publish gates
                               [W-ACH-FICHE] live
```

### 2.3 Bailleur / diaspora soft

```
[W-GER]──►[W-GER-FORM]──►[W-TOAST]
[W-DIA]──►[W-GUI-TF]──►[W-ACH-HUB?papier=tf]──► fiche ──► →WA
```

---

## 3. Shell global

### 3.1 W-NAV + W-WA-FAB — Mobile

```
┌──────────────────────────────────┐
│ [☰]  EVERGREEN          [WA]     │  ★ sticky
├──────────────────────────────────┤
│ … page …                         │
│                                  │
│                          ┌────┐  │
│                          │WA  │  │  FAB
│                          └────┘  │
└──────────────────────────────────┘

Drawer ouvert:
┌──────────────────────────────────┐
│ Acheter                          │
│ Louer                            │
│ Gérer                            │
│ Diaspora                         │
│ Outils (V1)                      │
│ Guides                           │
│ Agence                           │
│ ────────                         │
│ Espace / Connexion               │
└──────────────────────────────────┘
```

### 3.2 W-NAV — Desktop

```
┌──────────────────────────────────────────────────────────────────────────┐
│ EVERGREEN   Acheter Louer Gérer Diaspora Outils Guides Agence  [⌕] [WA]│
└──────────────────────────────────────────────────────────────────────────┘
```

**Note V0 :** item Outils absent L1 → footer jusqu’à V1.

### 3.3 W-FOOT (extrait)

```
Parcours | Outils | Confiance | Agence NAP | Legal
```

---

## 4. Home — W-HOME

### 4.1 Mobile — 1ʳᵉ composition (viewport 1)

```
┌──────────────────────────────────┐
│ [NAV]                            │
├──────────────────────────────────┤
│ :::::::::: HERO FULL ::::::::::  │  ★ brand-first
│ ::                            ::  │
│ ::  EVERGREEN                 ::  │
│ ::  Une promesse (1 ligne)    ::  │
│ ::  Une phrase support        ::  │
│ ::  [ Acheter ] [ Louer ]     ::  │
│ ::  [ Lieu ........ ] [→]     ::  │
│ ::                            ::  │
├──────────────────────────────────┤
│ (sous fold — scroll)             │
│ [Acheter] [Louer] [Gérer]        │  3 parcours
│ Cards phares (3)                 │
│ Bandeau preuve PAPIER            │
│ [FOOT]                           │
└──────────────────────────────────┘
```

**Anti ★ :** pas de stats · pas d’overlay chip sur hero · pas de 2ᵉ H1 plus fort que la marque.

### 4.2 Desktop — hero

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [NAV]                                                                    │
├──────────────────────────────────────────────────────────────────────────┤
│ :::::::::::::::::::::::::::: HERO EDGE-TO-EDGE ::::::::::::::::::::::::::│
│ ::  Brand + headline + phrase + search/CTA     (image atmosphère)      ::│
│ :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::│
├──────────────────────────────────────────────────────────────────────────┤
│  Parcours ×3     |     Phares 3–6 cards     |     Preuve papiers         │
└──────────────────────────────────────────────────────────────────────────┘
```

US : US-V0-01 · EF-SITE-01

---

## 5. Catalogue — W-ACH-HUB / W-LOU-HUB / W-CARD / W-FILTERS

### 5.1 Mobile — liste

```
┌──────────────────────────────────┐
│ Acheter            24 biens      │
│ [Liste|Carte]    [Filtres ▾]     │
│ chip:Terrain  chip:TF  chip:…    │  ★ papier
├──────────────────────────────────┤
│ ┌──────────────────────────────┐ │
│ │ IMG                          │ │  W-CARD
│ │ 12,5 M FCFA     [TF]         │ │  ★ PAPIER
│ │ Terrain · 300 m² · Almadies  │ │
│ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │
│ │ …                            │ │
│ └──────────────────────────────┘ │
│                    [→WA soft]    │
└──────────────────────────────────┘
```

### 5.2 Desktop — liste + filtres

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Acheter — 24 biens                              [Liste|Carte]            │
├────────────────────┬─────────────────────────────────────────────────────┤
│ FILTRES            │  [Card] [Card] [Card]                               │
│ Type               │  [Card] [Card] [Card]                               │
│ ★ Papier           │                                                     │
│ Zone               │                                                     │
│ Prix / surface     │                                                     │
│ Étalé oui/non      │                                                     │
│ [Réinit.]          │                                                     │
└────────────────────┴─────────────────────────────────────────────────────┘
```

### 5.3 W-ACH-MAP — Mobile sheet

```
┌──────────────────────────────────┐
│ [Liste|Carte★]    [Filtres]      │
│ :::::::::: MAP ::::::::::::::::: │
│ ::    • pin   • pin            :: │
│ ::         •                   :: │
├──────────────────────────────────┤
│ ══ sheet preview card ══         │
│ IMG | prix | PAPIER | zone       │
└──────────────────────────────────┘
```

### 5.4 W-FILTERS — Sheet mobile

```
┌──────────────────────────────────┐
│ Filtres                    [×]   │
│ Type     ( ) Terrain ( ) Maison  │
│ ★ Papier ( ) TF ( ) Bail         │
│          ( ) Délibération        │
│ Zone     [............]          │
│ Prix     [min] — [max]           │
│ [ Voir N résultats ]             │
└──────────────────────────────────┘
```

### 5.5 W-EMPTY-CAT

```
┌──────────────────────────────────┐
│ Aucun bien pour ces filtres      │
│ [Élargir]  [→WA conseiller]      │
└──────────────────────────────────┘
```

### 5.6 W-CARD — détail anatomie

```
┌─────────────────────┐
│ :::::: IMG :::::::: │
│ Prix FCFA   [PAPIER]│  ← pastille coin
│ Type · m² · Zone    │
│ (étalé badge soft)  │
└─────────────────────┘
```

US : US-V0-10 · EF-CAT-01

---

## 6. Fiche bien — W-ACH-FICHE / W-ACH-FICHE-T / W-LOU-FICHE

### 6.1 Mobile — séquence décisionnelle

```
┌──────────────────────────────────┐
│ ← Accueil › Acheter › …          │
│ :::::::: GALERIE SWIPE ::::::::  │  ★ LCP
│ • • ○ ○                          │
├──────────────────────────────────┤
│ 45 000 000 FCFA     [TF]         │  ★ faits + PAPIER
│ Terrain 300 m² · Almadies        │
│ Ref EG-T-042 · Vente             │
│ ⚠ si délibération → W-DISC-PAP   │  ★ avant long texte
├──────────────────────────────────┤
│ Description…                     │
│ Caractéristiques (liste)         │
│ :::::: CARTE 320px ::::::        │
├──────────────────────────────────┤
│ V1 TERRAIN ONLY                  │
│ [Embed mensualité]  W-OUT-EMB    │
│ [Embed construction]             │
│ Lien → budget-total              │
├──────────────────────────────────┤
│ Process / guides                 │
│ Similaires (cards)               │
│ Agence NAP soft                  │
├──────────────────────────────────┤
│ [████ Visite WhatsApp ████]      │  ★ sticky CTA →WA
└──────────────────────────────────┘
```

### 6.2 Desktop — split CTA

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Fil d’Ariane                                                             │
├─────────────────────────────────────────────┬────────────────────────────┤
│ Galerie large                               │ Prix · PAPIER · titre      │
│                                             │ Faits clés                 │
│                                             │ ⚠ disclaimer si besoin     │
│                                             │ [ Visite WA ]              │
│                                             │ [ Appeler ]                │
│ Description · attrs · carte · embeds V1     │ (sticky sidebar)           │
│ Similaires                                  │                            │
└─────────────────────────────────────────────┴────────────────────────────┘
```

### 6.3 W-DISC-PAP (inline)

```
┌──────────────────────────────────┐
│ ⚠ Délibération = droit d’usage   │
│   ≠ titre foncier. En savoir +   │
└──────────────────────────────────┘
```

US : US-V0-11/12 · blocs `13` §6.2

---

## 7. Hubs métier & agence

### 7.1 W-GER — Mobile

```
┌──────────────────────────────────┐
│ Gérer vos biens                  │
│ Promesse (loyers, quittances)    │
│ Étapes 1·2·3                     │
│ [ Demander un audit ]            │  → /gerer/demande
│ Preuves / personas soft          │
│ Lien guides C                    │
└──────────────────────────────────┘
```

### 7.2 W-GER-FORM

```
┌──────────────────────────────────┐
│ Demande gestion                  │
│ Nom                              │
│ Téléphone WA                     │
│ Nb biens / zone                  │
│ [ Envoyer ]                      │  ≤4 champs
└──────────────────────────────────┘
     → W-TOAST « Réponse < 24 h »
```

### 7.3 W-DIA — Soft V0

```
┌──────────────────────────────────┐
│ Diaspora — acheter sans arnaque  │
│ ★ Pas de Wave au vendeur         │
│ Risques · séquestre · TF         │
│ [ Contacter conseiller ] →WA     │
│ Lien guide TF · catalogue TF     │
└──────────────────────────────────┘
```

### 7.4 W-AGE-HOW / W-AGE-CONTACT

```
HOW:  Process mandat → contrôle papier → publish → visite
CONTACT: Form 3–4 ch. | NAP | carte | →WA | estimation soft
```

---

## 8. Guides — W-GUI-HUB / W-GUI-TMPL

### 8.1 Hub

```
┌──────────────────────────────────┐
│ Guides                           │
│ [A Sécuriser] [B Construction]   │
│ [C Louer] [D Diaspora] [E Argent]│
│ Articles récents (cards)         │
└──────────────────────────────────┘
```

### 8.2 Article template — Mobile

```
┌──────────────────────────────────┐
│ H1 · date MAJ                    │
│ TL;DR                            │
│ TOC                              │
│ Corps…                           │
│ Checklist                        │
│ FAQ                              │
│ ┌─ GuideCtaBand ───────────────┐ │
│ │ [ Lancer le simulateur ]     │ │  V1
│ │ [ →WA ]                      │ │
│ └──────────────────────────────┘ │
│ Fiches ex. · Sources             │
└──────────────────────────────────┘
```

---

## 9. Outils Vague 1 — W-OUT-*

### 9.1 W-OUT-HUB

```
┌──────────────────────────────────┐
│ Outils                           │
│ [Mensualité étalé]               │
│ [Coût construction]              │
│ [Budget total]                   │
│ (plus tard : frais, estimation…) │
└──────────────────────────────────┘
```

### 9.2 Pattern outil — Mobile (MEN / CON / BUD)

```
┌──────────────────────────────────┐
│ Mensualité étalé / loc-vente     │
│ 1 phrase job                     │
│ Prix [........]                  │
│ Apport [......]  Durée [..]      │
│ [ Calculer ]                     │
├──────────────────────────────────┤
│ W-OUT-RES ★ ungated              │
│   ≈ 285 000 FCFA / mois          │
│   fourchette soft                │
│   ⚠ W-DISC-SIM ≠ prêt banque     │
│   [ →WA conseiller ]             │
│   [ Email scénario ]             │
│   [ Intro constructeur ] V1      │
└──────────────────────────────────┘
```

### 9.3 Desktop — outil

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Titre + job                                                              │
├──────────────────────────────┬───────────────────────────────────────────┤
│ Inputs                       │  Résultat sticky (gros FCFA)              │
│ [Calculer]                   │  Disclaimer · CTAs                        │
│                              │  FAQ dessous full-width                   │
└──────────────────────────────┴───────────────────────────────────────────┘
```

### 9.4 W-OUT-EMB — Compact fiche

```
┌──────────────────────────────────┐
│ Estimer ma mensualité            │
│ Prix prérempli (listing)         │
│ [Calculer] → mini résultat       │
│ [Plein écran → /outils/…]        │
└──────────────────────────────────┘
```

### 9.5 W-OUT-ERR

```
Champs en erreur soulignés · message sous input · pas de crash page
```

US : US-V1-01…06 · EF-OUT-* · RG-04

---

## 10. Back-office agent — W-AGT-*

### 10.1 W-AGT-LOGIN

```
┌──────────────────────────────────┐
│ Espace agent                     │
│ Email                            │
│ Mot de passe                     │
│ [ Connexion ]                    │
└──────────────────────────────────┘
```

### 10.2 W-AGT-LIST — Mobile

```
┌──────────────────────────────────┐
│ Agent · [Leads] [Annonces] …     │  shell app ≠ marketing
│ SLA : 2 overdue                  │
│ ──────── Annonces ────────       │
│ EG-T-042  draft   [Éditer]       │
│ EG-T-041  live    [Éditer]       │
│ [ + Nouvelle annonce ]           │
└──────────────────────────────────┘
```

### 10.3 W-AGT-NEW / EDIT — Mobile

```
┌──────────────────────────────────┐
│ Nouvelle annonce                 │
│ Titre                            │
│ Transaction / Type               │
│ Prix FCFA · Surface · Zone       │
│ ★ Papier [TF|Bail|Délib|…]       │  required
│ Description                      │
│ Étalé ?  Statut draft            │
│ Photos → W-AGT-MEDIA             │
│ Mandat lié (ref)                 │
│ [Enregistrer] [Publier]          │
│ Si publish sans papier → bloque  │
└──────────────────────────────────┘
```

### 10.4 Desktop — agent form

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Nav app: Dashboard Leads Mandats Annonces Docs …                         │
├──────────────────────────────────────────────────────────────────────────┤
│ Form 2 colonnes                          │ Preview card soft             │
│ + gate papier avant Publier              │                               │
└──────────────────────────────────────────────────────────────────────────┘
```

### 10.5 W-AGT-EMPTY

```
Aucune annonce — [Créer la première]
```

US : US-V0-30…34 · ACL `14`

---

## 11. Patterns globaux

### 11.1 W-LOAD — Skeleton

```
┌──────────────────────────────────┐
│ ░░░░░░░░░ image ░░░░░░░░░        │
│ ░░░░░ titre ░░░                  │
│ ░░ prix ░░  ░ badge ░            │
└──────────────────────────────────┘
```

### 11.2 W-TOAST

```
        ┌─────────────────────────┐
        │ ✓ Message envoyé        │
        │   Réponse sous 24 h     │
        └─────────────────────────┘
```

### 11.3 W-SHARE (P1)

```
Partager : [WA] [Copier lien] [Télécharger card]
```

### 11.4 W-404

```
Page introuvable · [Acheter] [Accueil] [→WA]
```

### 11.5 Legal (W-LEGAL-*)

```
Titre · corps prose · retour footer — pas de chrome marketing lourd
```

---

## 12. Matrice frames livrés (ce doc)

| ID | Mobile | Desktop | États notés |
| --- | :---: | :---: | :---: |
| W-NAV / FAB | ● | ● | drawer |
| W-HOME | ● | ● | — |
| W-ACH-HUB | ● | ● | empty |
| W-ACH-MAP | ● | ○ (même principe) | sheet |
| W-FILTERS | ● | sidebar D | — |
| W-CARD | ● | ● | — |
| W-ACH-FICHE / T | ● | ● | disc |
| W-LOU-* | = ACH pattern | = | — |
| W-GER / FORM | ● | ○ | toast |
| W-DIA | ● | ○ | — |
| W-AGE-HOW/CONTACT | notes | ○ | — |
| W-GUI-* | ● | ○ | CTA band |
| W-OUT-* | ● | ● | err/res |
| W-OUT-EMB | ● | ● | — |
| W-AGT-* | ● | ● | empty |
| W-LOAD/TOAST/404 | ● | — | — |

Louer = même chassis qu’Acheter (filtres sans papier obligatoire V0).

---

## 13. Annotations review (ouvrir avant HF)

| # | Question | Décision provisoire |
| ---: | --- | --- |
| Q1 | Sticky WA fiche vs FAB global seul ? | **Les deux** : sticky fiche + FAB ailleurs |
| Q2 | Filtres desktop toujours visibles ? | Oui sidebar ≥1024 |
| Q3 | Embed simu au-dessus ou sous carte ? | **Sous** carte · après compréhension geo |
| Q4 | Preview card agent à la saisie ? | Soft V0 · P1 |
| Q5 | Map default ou liste ? | **Liste** default · `?view=map` |

---

## 14. Handoff → Figma (`16`) / proto (`17`)

| Étape | Livrable |
| --- | --- |
| 1 | Import frames P0 dans Figma **lo-fi** (greys) — 1 frame = 1 ID |
| 2 | Auto-layout mobile 390 · desktop 1440 |
| 3 | Prototype liens flows §2 |
| 4 | Review OD : papier + disclaimer + copy étalé≠banque |
| 5 | Puis HF tokens (`18`) — **pas avant** sign-off lo-fi |

**DoD lo-fi :** checklist §1.3 sur tous P0/P0b · flows cliquables · anti-patterns §1.2 absents.

---

## 15. Lien inventaire `03`

Ce doc **ne remplace pas** `03` :  
- `03` = liste contractuelle + prio + DoD wire→build  
- `15` = **schémas B&W** annotés  

Tout nouvel écran : ajouter ID dans `03` **puis** frame ici.

---

## 16. Sources

| Source | Apport |
| --- | --- |
| `03` · `13` · `05` · `06` · `09` · brand rules user | Structure EverGreen |
| wireframe-doc / UXClaim | Markdown → lo-fi avant Figma |
| Genfy ASCII | Largeurs M/D · labels sections |
| Visily RE lo-fi | Listing · detail · search · contact |
| Foundey / DiverseKit (via `13`) | Fiche décisionnelle · sticky CTA |

---

## 17. Liens

| Doc | Rôle |
| --- | --- |
| [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) | Inventaire IDs |
| [`13-sitemap-architecture-information.md`](./13-sitemap-architecture-information.md) | Templates blocs |
| [`16-maquettes-ui.md`](./16-maquettes-ui.md) | HF (à forger) |
| [`17-prototype-interactif.md`](./17-prototype-interactif.md) | Proto |
| [`18-design-system.md`](./18-design-system.md) | Tokens / composants |

---

*Wireframes B&W EverGreen Site v1.0 — sept. 2026. ASCII mobile+desktop · papier & WA first · hero sans clutter · agent shell séparé · ungated simus.*
