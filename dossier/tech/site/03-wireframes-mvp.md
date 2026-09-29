# Wireframes MVP — Inventaire écrans Vague 0–1

**Document :** Dossier · Tech · Site · 03  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-sitemap-et-ia.md`](./01-sitemap-et-ia.md) · [`02-parcours-utilisateurs.md`](./02-parcours-utilisateurs.md) · [`../../../docs/hub-roadmap.md`](../../../docs/hub-roadmap.md) · [`../research-lab/04-outils-publics.md`](../research-lab/04-outils-publics.md)  
**Aval :** [`15-wireframes.md`](./15-wireframes.md) (B&W Figma) · [`16-maquettes-ui.md`](./16-maquettes-ui.md) · [`12-user-stories-backlog.md`](./12-user-stories-backlog.md) · scaffold Next.js

> **Rôle :** inventaire **contractuel** des écrans à wireframer / shipper en **Vague 0 + Vague 1** — pas de pixels, pas de Figma HF.  
> HF / proto → `15`–`17`. Design system → `18`.

**Fidélité ici :** blocs gris · hiérarchie · CTA · états. Mobile-first.

---

## 0. Scope MVP

### 0.1 In — Vague 0 (socle)

Catalogue curated · fiches · recherche list/map soft · contact WA · agence · 2 guides teaser · landing gérer · soft diaspora · agent CRUD min · legal.

### 0.2 In — Vague 1 (différenciant)

`/outils` hub · 3 simus (mensualité · construction · budget-total) · embeds sur fiche **terrain** · piliers blog M1 · CTA partenaires BTP/archi/notaire.

### 0.3 Out (explicit)

| Hors MVP V0–1 | Vague |
| --- | :---: |
| Portails proprio / locataire · EDL digital | V3 |
| Diligence funnel complet · frais acquisition outil | V2 |
| Pack diaspora inspection / POA / multi-devise | V4 |
| Estimation vendeur push produit | V5 (soft contact V0 OK) |
| Carte prix/m² · Observatoire | V7 / L4 |
| Caution · solaire · marketplace | V3+ / V6 |
| Favoris / saved search account | Plus tard |
| i18n EN full | Plus tard |

### 0.4 Règle wire

*Critical path ≤ ~5 écrans pour un go/no-go acheteur terrain* (bench MVP wire 2026) : Home/search → Catalogue → Fiche → Simu → WA. Le reste = shell / support.

---

## 1. Inventaire écrans (IDs)

Légende priorité : **P0** ship V0 · **P0b** ship V1 · **P1** nice-in-MVP · **—** hors scope.

### 1.1 Public — shell & marketing

| ID | Écran | Route | Vague | Prio | Journey |
| --- | --- | --- | :---: | :---: | --- |
| **W-HOME** | Accueil | `/` | V0 | **P0** | Tous |
| **W-NAV** | Nav sticky + menu mobile | global | V0 | **P0** | — |
| **W-FOOT** | Footer NAP + legal links | global | V0 | **P0** | — |
| **W-404** | Not found | `/404` | V0 | **P0** | — |
| **W-LEGAL-ML** | Mentions légales | `/legal/mentions-legales` | V0 | **P0** | — |
| **W-LEGAL-PRIV** | Confidentialité | `/legal/confidentialite` | V0 | **P0** | — |
| **W-LEGAL-CGU** | CGU | `/legal/cgu` | V0 | P1 | — |
| **W-LEGAL-COOK** | Cookies | `/legal/cookies` | V0 | P1 | — |

### 1.2 Catalogue & fiches

| ID | Écran | Route | Vague | Prio | Journey |
| --- | --- | --- | :---: | :---: | --- |
| **W-ACH-HUB** | Hub Acheter (liste) | `/acheter` | V0 | **P0** | J1 J5 |
| **W-ACH-MAP** | Acheter vue carte | `/acheter?view=map` | V0 | **P0** | J1 |
| **W-ACH-TYPE** | Filtre type (terrains…) | `/acheter/terrains` | V0 | P1 | J1 |
| **W-ACH-ZONE** | Landing zone SEO | `/acheter/[zone]` | V0 | P1 | J1 J5 |
| **W-ACH-FICHE** | Fiche vente | `/acheter/[slug]` | V0 | **P0** | J1 J5 |
| **W-ACH-FICHE-T** | Fiche **terrain** + embeds simu | idem + bloc V1 | V1 | **P0b** | J1 |
| **W-LOU-HUB** | Hub Louer | `/louer` | V0 | **P0** | J3 |
| **W-LOU-MAP** | Louer carte | `/louer?view=map` | V0 | P1 | J3 |
| **W-LOU-FICHE** | Fiche location | `/louer/[slug]` | V0 | **P0** | J3 |
| **W-CARD** | Composant card listing | — | V0 | **P0** | — |
| **W-FILTERS** | Panneau filtres (papier!) | drawer/sheet | V0 | **P0** | J1 |
| **W-EMPTY-CAT** | Empty / 0 résultat | état | V0 | **P0** | — |
| **W-SHARE** | Sheet partage OG / WA | modal | V0 | P1 | — |

### 1.3 Hubs métier (légers V0)

| ID | Écran | Route | Vague | Prio | Journey |
| --- | --- | --- | :---: | :---: | --- |
| **W-GER** | Landing Gérer | `/gerer` | V0 | **P0** | J4 |
| **W-GER-FORM** | Demande audit / mandat | `/gerer/demande` | V0 | **P0** | J4 |
| **W-DIA** | Landing Diaspora (soft) | `/diaspora` | V0 | **P0** | J5 |
| **W-AGE** | Hub Agence | `/agence` | V0 | P1 | — |
| **W-AGE-HOW** | Comment on travaille | `/agence/comment-on-travaille` | V0 | **P0** | Tous |
| **W-AGE-CONTACT** | Contact | `/agence/contact` | V0 | **P0** | J2 |
| **W-EST-SOFT** | Contact estimation vendeur | form sur contact ou `/estimation` redirect | V0 | P1 | J2 |

### 1.4 Guides (teaser V0 · piliers V1)

| ID | Écran | Route | Vague | Prio | Journey |
| --- | --- | --- | :---: | :---: | --- |
| **W-GUI-HUB** | Hub Guides | `/guides` | V0 | **P0** | — |
| **W-GUI-TF** | Pilier TF vs bail vs délibération | `/guides/[slug]` | V0–1 | **P0** | J1 J5 |
| **W-GUI-CONST** | Pilier coût construction | `/guides/[slug]` | V1 | **P0b** | J1 |
| **W-GUI-TMPL** | Template article (TOC, FAQ, CTA) | — | V0 | **P0** | — |

### 1.5 Outils (Vague 1)

| ID | Écran | Route | Vague | Prio | Journey |
| --- | --- | --- | :---: | :---: | --- |
| **W-OUT-HUB** | Hub Outils | `/outils` | V1 | **P0b** | J1 |
| **W-OUT-MEN** | Simu mensualité | `/outils/mensualite` | V1 | **P0b** | J1 |
| **W-OUT-CON** | Simu construction | `/outils/construction` | V1 | **P0b** | J1 |
| **W-OUT-BUD** | Budget total projet | `/outils/budget-total` | V1 | **P0b** | J1 |
| **W-OUT-RES** | Panneau résultat + CTA (pattern) | partial | V1 | **P0b** | — |
| **W-OUT-EMB** | Embed simu compact (fiche) | partial fiche | V1 | **P0b** | J1 |
| **W-OUT-ERR** | État erreur / input invalide | état | V1 | **P0b** | — |

### 1.6 Agent (back-office min V0)

| ID | Écran | Route | Vague | Prio | Who |
| --- | --- | --- | :---: | :---: | --- |
| **W-AGT-LOGIN** | Connexion agent | `/espace/connexion` | V0 | **P0** | Agent |
| **W-AGT-LIST** | Liste mandats / annonces | `/espace/agent` | V0 | **P0** | Agent |
| **W-AGT-NEW** | Créer annonce | `/espace/agent/nouveau` | V0 | **P0** | Agent |
| **W-AGT-EDIT** | Éditer annonce | `/espace/agent/[id]` | V0 | **P0** | Agent |
| **W-AGT-MEDIA** | Upload photos | partial | V0 | **P0** | Agent |
| **W-AGT-EMPTY** | Empty state 0 mandat | état | V0 | P1 | Agent |

### 1.7 Globaux UX

| ID | Écran / pattern | Vague | Prio |
| --- | --- | :---: | :---: |
| **W-WA-FAB** | FAB / sticky WhatsApp | V0 | **P0** |
| **W-TOAST** | Confirmation envoi form | V0 | **P0** |
| **W-LOAD** | Skeleton catalogue / fiche | V0 | **P0** |
| **W-DISC-PAP** | Disclaimer délibération (inline) | V0 | **P0** |
| **W-DISC-SIM** | Disclaimer estimation (outils) | V1 | **P0b** |

**Total P0+P0b ≈ 35–40 écrans/états** (hors legal secondaires) — aligné fourchette MVP lead-gen / catalogue (pas 80 écrans).

---

## 2. Chemins critiques (flows)

### 2.1 Acheteur terrain (J1) — Happy path V1

```
W-HOME → W-ACH-HUB (filtre terrain + papier)
      → W-ACH-FICHE-T
      → W-OUT-EMB ou W-OUT-MEN / CON / BUD
      → W-OUT-RES (CTA WA)
      → WhatsApp externe (hors app)
```

### 2.2 Locataire (J3) — V0

```
W-HOME → W-LOU-HUB → W-LOU-FICHE → W-WA-FAB / CTA visite
```

### 2.3 Bailleur soft (J4) — V0

```
W-GER → W-GER-FORM (3–4 champs) → W-TOAST → CRM
```

### 2.4 Diaspora soft (J5) — V0

```
W-DIA → W-GUI-TF → W-ACH-HUB?papier=TF → W-ACH-FICHE → WA
```

### 2.5 Agent publish (supply) — V0

```
W-AGT-LOGIN → W-AGT-NEW → W-AGT-MEDIA → publish → W-ACH-FICHE live
```

---

## 3. Blocs wire (lo-fi) — écrans P0

### 3.1 W-HOME

```
┌─────────────────────────────┐
│ [Logo]  Nav…        [WA]    │
├─────────────────────────────┤
│ HERO full-bleed             │
│  Brand + 1 promesse         │
│  [Acheter|Louer] [Lieu] [→] │
│  1 CTA secondaire Guides    │
├─────────────────────────────┤
│ 3 parcours : Acheter Louer  │
│              Gérer          │
├─────────────────────────────┤
│ Biens phares (3–6 cards)    │
├─────────────────────────────┤
│ Preuve papiers (1 bandeau)  │
├─────────────────────────────┤
│ Footer                      │
└─────────────────────────────┘
```

**Anti (brand rules) :** pas de stat strip · pas de cards décoratives · pas d’overlay badges sur hero.

### 3.2 W-ACH-HUB / W-LOU-HUB

```
┌─────────────────────────────┐
│ Titre hub + compteur        │
│ [Liste|Carte]  [Filtres]    │
│ Chips : type · papier · …   │
├──────────────┬──────────────┤
│ Card         │ Card         │
│ Card         │ Card         │
│ …            │              │
└──────────────┴──────────────┘
```

Filtres **Acheter** obligatoires : type · **papier (TF/bail/délibération)** · zone · prix · surface · étalé.  
Carte : markers sync liste · sheet preview card (mobile).

### 3.3 W-ACH-FICHE (vente) / terrain V1

```
┌─────────────────────────────┐
│ ← Fil d’Ariane              │
│ Galerie photos              │
│ Prix FCFA · pastille PAPIER │
│ Titre · m² · zone           │
│ [Visite WA]  [Appeler]      │  ← sticky bas mobile
├─────────────────────────────┤
│ Description                 │
│ Bloc papiers + disclaimer   │
│ Mini-carte                  │
├─────────────────────────────┤
│ V1 TERRAIN ONLY :           │
│ Embed simu mensualité       │
│ Embed simu construction     │
│ Lien budget total           │
├─────────────────────────────┤
│ CTA partenaires (soft)      │
│ Biens similaires            │
└─────────────────────────────┘
```

Pastille délibération → **W-DISC-PAP** visible près du prix, pas en footer seul.

### 3.4 W-OUT-* (pattern outil)

```
┌─────────────────────────────┐
│ Titre outil · 1 phrase job  │
│ Inputs (peu)                │
│ [Calculer]                  │
├─────────────────────────────┤
│ W-OUT-RES                   │
│  Gros FCFA                  │
│  Fourchette                 │
│  Disclaimer                 │
│  [WA conseiller]            │
│  [Email / sauver scénario]  │
└─────────────────────────────┘
```

Résultat **immédiat ungated** ; capture contact = soft post-résultat.

### 3.5 W-GUI-TMPL

```
Titre · date MAJ · TL;DR
TOC sticky
Corps H2/H3 · tableaux
Checklist
Erreurs fréquentes
FAQ
CTA outil + WA
Sources
```

### 3.6 W-AGT-NEW / EDIT

```
Champs : titre, type, transaction, prix, m², zone,
         **papier** (required), description, étalé?,
         statut (brouillon/publié), photos
[Enregistrer] [Publier]
```

Pas de self-serve vendeur public — **agent only**.

---

## 4. Composants réutilisables (design inventory)

| Composant | Utilisé par |
| --- | --- |
| `ListingCard` | Catalogues · home · similaires |
| `PaperBadge` | Card · fiche · filtres |
| `FilterSheet` | Acheter / Louer |
| `MapListToggle` | Catalogues |
| `StickyCtaBar` | Fiche · outils mobile |
| `WaButton` | Global |
| `SimResultPanel` | Outils · embeds |
| `DisclaimerInline` | Papier · simu |
| `GuideCtaBand` | Guides |
| `FormLead` (3–4 fields) | Gérer · Contact · post-simu |
| `AgentFieldGroup` | Back-office |

Tokens / HF → `18-design-system` + `docs/design-tokens.md`.

---

## 5. États à wireframer (obligatoires)

| Écran | Empty | Loading | Error | Success |
| --- | :---: | :---: | :---: | :---: |
| Catalogue | ● 0 bien / 0 filtre | skeleton | retry | — |
| Fiche | — | skeleton galerie | 404 bien | — |
| Form lead | validation inline | submit disabled | fail réseau | toast + next step |
| Simu | — | calc brief | input invalide | résultat + CTA |
| Agent list | CTA créer | — | — | — |
| Carte | no geo | tiles load | fallback liste | — |

---

## 6. Contenu & data minimum par écran P0

| Écran | Contenu min pour « Done » |
| --- | --- |
| Home | Promesse brand · search · ≥3 biens réels ou placeholders validés |
| Acheter | ≥5 listings dont terrains avec **papier** renseigné |
| Fiche | ≥3 photos · prix · papier · WA agent · geo approx |
| Guides | 1 TF vs bail live V0 · +1 construction V1 |
| Outils | 3 simus calculent · disclaimer · event `sim_complete` |
| Agent | Create→publish→visible `/acheter` |
| Gérer / Diaspora | Landing + form / CTA WA (pas portail) |

---

## 7. Definition of Done wire → build

- [ ] Chaque ID P0/P0b a un frame mobile (+ desktop catalogue/fiche/outil)  
- [ ] Flows §2 prototyped cliquables (lo-fi)  
- [ ] Filtres papier + disclaimer validés métier  
- [ ] Copy CTA WA / « pas Wave vendeur » (diaspora) placés  
- [ ] Hors scope §0.3 signé Product  
- [ ] Handoff dev : liste routes = inventaire  

HF / marque → Vague design `15`–`18` **après** alignement sur cet inventaire.

---

## 8. Priorisation sprint suggérée

| Sprint | Écrans |
| --- | --- |
| **S1** | Shell · Home · Acheter liste · Card · Fiche · WA · Legal · Agent CRUD |
| **S2** | Louer hub+fiche · Filtres papier · Map toggle · Gérer+form · Agence how/contact · Guide TF |
| **S3 V1** | Outils hub · 3 simus · embeds fiche terrain · Guide construction · events analytics |

---

## 9. Liens

| Doc | Rôle |
| --- | --- |
| [`01-sitemap-et-ia.md`](./01-sitemap-et-ia.md) | Routes |
| [`02-parcours-utilisateurs.md`](./02-parcours-utilisateurs.md) | Flows métier |
| [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) | Champs listing |
| [`06-outils-embarques.md`](./06-outils-embarques.md) | Spec embeds |
| [`09-back-office-agents.md`](./09-back-office-agents.md) | Agent élargi |
| Specs simus | `docs/add-ons/specs/01-outils-simulateurs/01–03` |

---

## 10. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| MVP wireframes | Critical path only · grey boxes · align before HF · 8–40 écrans selon produit |
| RE app / site MVP | Map+list · detail sticky contact · filters · mobile-first |
| Property detail UX | Galerie · attrs · map · CTA persistants · back to search |
| EverGreen brand rules | Hero composition unique · pas dashboard stats · brand first |

---

*Wireframes MVP EverGreen Site v1.0 — sept. 2026. Inventaire V0–1 · ~35–40 écrans P0 · critical path acheteur 5 taps.*
