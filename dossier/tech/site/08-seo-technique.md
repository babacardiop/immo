# SEO technique — Schema.org, perf, i18n FR, pages locales

**Document :** Dossier · Tech · Site · 08  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-sitemap-et-ia.md`](./01-sitemap-et-ia.md) · [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) · [`../../../docs/tech-stack.md`](../../../docs/tech-stack.md) · [`../../../docs/social-share-cards.md`](../../../docs/social-share-cards.md) · [`../../marketing/15-strategie-seo.md`](../../marketing/15-strategie-seo.md) · [`../../marketing/05-seo-sem.md`](../../marketing/05-seo-sem.md)  
**Aval :** `generateMetadata` · JSON-LD · `app/sitemap.ts` · landings geo · GSC

> **Rôle :** **implémentation eng** du SEO technique Next.js (schema, CWV, locale FR, landings locales).  
> Keywords / clusters / CdC vérifiable T01–T49 → **`marketing/15`** · SEM → `marketing/05`.  
> Ne pas dupliquer l’audit sémantique ici.

---

## 0. Principes

| # | Principe |
| ---: | --- |
| 1 | **SSR/SSG** du HTML utile — pas de shell JS vide crawlable |
| 2 | Schema = **miroir** du visible (prix, papier, NAP) |
| 3 | **FR only Y1** — `fr_SN` · pas de hreflang multi sauf page EN diaspora plus tard |
| 4 | Facettes catalogue = **canonical / noindex** anti-duplicate |
| 5 | Galeries = **ennemi #1 CWV** — `next/image` + lazy |
| 6 | Money pages ≤ 3 clics · landings geo **uniques** (pas doorway) |
| 7 | Bien vendu ≠ 404 soft massif |

Bench 2026 : `RealEstateListing` = **page** ; bien = `House`/`Apartment`/`Accommodation` + `Offer` ; agence = `RealEstateAgent` ; rich results listing Google **limités** — valeur = graph / AI / local.

---

## 1. Stack Next.js (mécaniques)

| Mécanique | Usage EverGreen |
| --- | --- |
| `generateMetadata` | Title, description, canonical, OG, robots |
| JSON-LD `<script type="application/ld+json">` | Schema par gabarit |
| `app/sitemap.ts` (+ index) | Sitemaps segmentés |
| `app/robots.ts` | Allow money paths · disallow staging patterns |
| `next/image` | WebP/AVIF · sizes · priority LCP |
| `next/og` | 3 crops share (`social-share-cards`) |
| ISR / `revalidate` | Fiches & landings après publish agent |

**Locale :** `lang="fr"` sur `<html>` · `og:locale` = `fr_SN` · dates ISO · devises **XOF** en schema.

---

## 2. Schema.org (JSON-LD)

### 2.1 Matrice page → types

| Gabarit | Types | CdC |
| --- | --- | --- |
| Site / `/agence` | `RealEstateAgent` (⊂ LocalBusiness) + `WebSite` (+ `SearchAction` soft) | T19 |
| Fiche vente/loc | `RealEstateListing` (WebPage) + `mainEntity` House\|Apartment\|Landform + `Offer` | T20 |
| Guide / pilier | `Article` + `FAQPage` (+ `HowTo` si checklist) | T21 |
| Landing geo | `Place` ou `WebPage` + `FAQPage` + ItemList soft | T22 |
| Toutes money | `BreadcrumbList` | T23 |
| Outil | `WebApplication` ou `HowTo` soft + WebPage | — |

### 2.2 Agence — `RealEstateAgent` (exemple)

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "EverGreen",
  "url": "https://www.exemple.sn",
  "telephone": "+221XXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "…",
    "addressLocality": "Dakar",
    "addressRegion": "Dakar",
    "addressCountry": "SN"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 14.72, "longitude": -17.47 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "areaServed": ["Dakar", "Almadies", "Mermoz", "Ngor", "Sacré-Cœur"],
  "priceRange": "$$"
}
```

**NAP** = identique GBP + footer + `/agence/contact`.

### 2.3 Fiche bien — pattern correct

`RealEstateListing` décrit la **page** (`datePosted`) ; le bien va dans `mainEntity` ; le prix dans `Offer` avec `businessFunction` Sell ou LeaseOut.

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "Terrain 300 m² TF — Almadies",
  "url": "https://www.exemple.sn/acheter/terrain-almadies-eg-t-042",
  "datePosted": "2026-09-15",
  "description": "Terrain viabilisé, titre foncier déclaré…",
  "mainEntity": {
    "@type": "Place",
    "name": "Terrain Almadies 300 m²",
    "floorSize": { "@type": "QuantitativeValue", "value": 300, "unitCode": "MTK" },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Almadies",
      "addressRegion": "Dakar",
      "addressCountry": "SN"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 14.74, "longitude": -17.52 },
    "additionalProperty": [{
      "@type": "PropertyValue",
      "name": "Type de papier",
      "value": "Titre foncier"
    }]
  },
  "offers": {
    "@type": "Offer",
    "price": 45000000,
    "priceCurrency": "XOF",
    "availability": "https://schema.org/InStock",
    "businessFunction": "https://purl.org/goodrelations/v1#Sell"
  }
}
```

| Type bien | `@type` mainEntity hint |
| --- | --- |
| Maison | `House` / `SingleFamilyResidence` |
| Appart | `Apartment` |
| Terrain | `Place` (+ `additionalProperty` papier / m²) |

**Location :** `businessFunction` LeaseOut · `price` = loyer mensuel · `leaseLength` optionnel sur RealEstateListing.

**Règles :**

- Prix schema = prix **visible**  
- Pastille papier visible HTML **et** `additionalProperty`  
- Retirer / maj schema si `sold` / `rented`  
- Valider Rich Results Test (0 erreur critique)

### 2.4 Guide — Article + FAQ

- `Article` : headline, datePublished, dateModified, author Organization, image  
- `FAQPage` : questions = FAQ visible page  
- `HowTo` si checklist numérotée  

### 2.5 BreadcrumbList

Aligné fil d’Ariane UI : Accueil › Acheter › Terrains › Almadies › Titre.

---

## 3. Metadata & canonicals

### 3.1 Patterns title / description (FR)

| Gabarit | Title (cible 50–60 car.) | Meta desc |
| --- | --- | --- |
| Home | EverGreen — Agence immobilière Dakar | Promesse + zones |
| Fiche | {Type} {quartier} — {prix} FCFA \| EverGreen | Papier + m² + CTA |
| Landing geo | {Type} à vendre {Quartier} Dakar \| EverGreen | Intent + curated |
| Guide | {KW} (2026) \| Guide EverGreen | Bénéfice + date |
| Outil | Simulateur {nom} FCFA \| EverGreen | Ungated + CTA |

H1 unique ≠ title clone robot · 1 H1 / page (T14–T16).

### 3.2 Canonical & duplicates

| Cas | Règle |
| --- | --- |
| Page indexable | Canonical self |
| `/blog/x` vs `/guides/x` | **Canonical `/guides/...`** · `/blog` redirect |
| `?view=map` · tris · facettes | Canonical → listing parent **ou** `noindex,follow` |
| Pagination | Canonical page courante ou policy unique (fixer V0) |
| Host | Apex **ou** www — 301 unique · HTTPS |

### 3.3 robots

**Allow :** `/`, `/acheter`, `/louer`, `/guides`, `/outils`, `/agence`, `/diaspora`, `/gerer`  
**Disallow :** `/espace/`, preview/staging, APIs  
Staging : `noindex` global.

---

## 4. Sitemaps XML

Implémenter segmentation `01` §7 :

| Fichier | Contenu | Changefreq |
| --- | --- | --- |
| `sitemap-static.xml` | Home, hubs, agence, legal | monthly |
| `sitemap-acheter.xml` | Fiches vente published + landings geo | daily |
| `sitemap-louer.xml` | Fiches location | daily |
| `sitemap-guides.xml` | Articles | weekly |
| `sitemap-outils.xml` | Pages outils | monthly |
| `sitemap.xml` | Index des ci-dessus | — |

Règles : **200 only** · exclure draft/sold/rented · `lastmod` = `updated_at` · soumettre GSC (T40–T42).

Option V2 : sitemap images listings.

---

## 5. Performance & Core Web Vitals

### 5.1 Seuils (mobile p75) — CdC T24–T27

| Métrique | Seuil |
| --- | ---: |
| LCP | ≤ **2,5 s** |
| INP | ≤ **200 ms** |
| CLS | ≤ **0,1** |
| TTFB | ≤ **600 ms** (cible) |

### 5.2 Recettes Next.js

| Levier | Action |
| --- | --- |
| LCP fiche/home | 1 image hero `priority` · pas 12 full-res above fold |
| Galerie | Lazy · width/height ou aspect-ratio → anti-CLS |
| Maps | Charger Leaflet **après** interaction / idle (dynamic import) |
| Fonts | `next/font` · subset FR · swap |
| JS | Pas de widget tiers lourd Y1 · WA = lien pas SDK |
| Images | WebP/AVIF · max edge CDN · &lt; 300 KB OG |
| Liste catalogue | Virtualize / pagination · pas 200 DOM cards |

### 5.3 Mesure

- Lighthouse CI soft PR  
- CrUX / GSC CWV field J+30  
- Spotlight : home · fiche · landing geo · `/outils/construction`

---

## 6. i18n FR (Y1)

| Décision | Détail |
| --- | --- |
| Langue UI | **Français** uniquement |
| `html lang` | `fr` |
| `og:locale` | `fr_SN` |
| Copy | FCFA · tutoiement/vouvoiement selon surface (Brand) |
| hreflang | **Non Y1** (T18) — sauf futur `/en/diaspora` → alors `fr`+`en` + x-default |
| Slugs | FR ASCII kebab : `titre-foncier-vs-bail` |
| Dates | Format FR affiché · ISO en schema |
| Devise schema | `XOF` |

**Diaspora EN :** page dédiée plus tard — pas de mix FR/EN sur même URL.

---

## 7. Pages locales (geo / quartiers)

### 7.1 Priorité Z1 (Y1)

| Priorité | Quartiers landings |
| :---: | --- |
| **P0** | Mermoz · Sacré-Cœur · Almadies · Ngor |
| **P1** | Ouakam · Point E · Yoff |
| **P2** | Autres Z1/Z2 si stock + contenu unique |

URL canon (aligné sitemap) : `/acheter/[zone]` et/ou `/acheter/terrains/[zone]` — **une** KW primaire / landing (`marketing/05`).

Ex. : `appartement Mermoz` · `terrain Almadies TF` · `location Ngor`.

### 7.2 Template landing (anti-doorway)

| Bloc | Exigence |
| --- | --- |
| H1 unique | `{Type} à {Quartier}` |
| Intro 800–1 500 mots | Spécificités quartier · papiers · vigilance (inondation / DPM si littoral) |
| Embed catalogue | Filtré zone · liens fiches live |
| FAQ | 4–6 Q locales → FAQ schema |
| CTA | WA + outils si terrain |
| Maillage | Guide TF · guide zone · hub Acheter |
| Schema | Place + FAQ + Breadcrumb |

**Interdit :** 20 landings × 200 mots dupliqués (doorway).

### 7.3 GBP / local pack

| Asset | |
| --- | --- |
| Google Business Profile | ≤ Soft launch J+14 |
| Catégorie | Agence immobilière |
| NAP | = site |
| Posts | Option recycle contenu |
| Avis | Process post-closing réel |

---

## 8. Catalogue & cycle de vie URL

| Événement | SEO action |
| --- | --- |
| Publish | Ajouter sitemap · schema InStock |
| Reserved | Badge · schema soft |
| Sold / Rented | Page « Vendu/Loué » **ou** 301 → landing geo/type · retirer sitemap |
| Archive | 301 ou gone contrôlé — pas soft 404 |

Facettes papier (`?paper=tf`) : noindex ou canonical parent (T07 / T39).

---

## 9. Impl checklist par vague

### Vague 0

- [ ] `generateMetadata` home / catalogue / fiche / agence / 1 guide  
- [ ] `RealEstateAgent` + Breadcrumb  
- [ ] robots + sitemap static + acheter/louer  
- [ ] `next/image` + OG landscape  
- [ ] GSC propriété + sitemap soumis  
- [ ] NAP footer = GBP  

### Vague 1

- [ ] Schema fiche complet (Offer + papier)  
- [ ] `/outils` indexables + metadata  
- [ ] 2 landings geo P0 (contenu unique)  
- [ ] Article + FAQ sur piliers M1  
- [ ] CWV pass Lighthouse mobile sur 4 gabarits  

### Plus tard

- [ ] hreflang EN diaspora  
- [ ] sitemap images  
- [ ] HowTo outils  

DoD aligné `marketing/15` §D.

---

## 10. Anti-patterns

| Anti | Fix |
| --- | --- |
| Prix / chambres collés sur RealEstateListing root | mainEntity + Offer |
| noindex staging oublié en prod | Checklist release |
| Indexer toutes les facettes | Canonical / noindex |
| Galerie uncompressed | next/image + lazy |
| Doorway geo thin | Template §7.2 |
| `/blog` et `/guides` dupliqués | Canonical guides |
| Claim TeleDAc SEO | Brand interdiction |
| Leaflet bloquant LCP | Dynamic import |

---

## 11. Liens

| Doc | Rôle |
| --- | --- |
| [`../../marketing/15-strategie-seo.md`](../../marketing/15-strategie-seo.md) | CdC T01–T49 · audit sémantique |
| [`../../marketing/05-seo-sem.md`](../../marketing/05-seo-sem.md) | KW · clusters · briefs |
| [`01-sitemap-et-ia.md`](./01-sitemap-et-ia.md) | Routes · sitemaps |
| [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) | Champs → schema |
| [`../../../docs/social-share-cards.md`](../../../docs/social-share-cards.md) | OG |
| [`../../plan-commercial/02-zones-prioritaires.md`](../../plan-commercial/02-zones-prioritaires.md) | Z1 landings |

---

## 12. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| RealEstateListing | Type **WebPage** · datePosted · bien en mainEntity · Offer + businessFunction |
| RealEstateAgent | LocalBusiness subtype · NAP · areaServed · Knowledge Panel |
| Tech SEO immo 2026 | CWV (LCP/INP/CLS) · schema sync · galeries = risque |
| Interne Hégo/SEOlivier via `15` | Attendu + vérif · facettes · recette |

---

*SEO technique EverGreen Site v1.0 — sept. 2026. JSON-LD correct · CWV galeries · FR-only · landings Z1 uniques · CdC marketing/15.*
