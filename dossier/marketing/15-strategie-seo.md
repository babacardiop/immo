# Stratégie SEO — Audit sémantique & CdC technique

**Document :** Dossier · Marketing · 15  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`05-seo-sem.md`](./05-seo-sem.md) · [`11-strategie-contenu.md`](./11-strategie-contenu.md) · [`12-calendrier-editorial.md`](./12-calendrier-editorial.md) · [`13-plan-taggage-analytics.md`](./13-plan-taggage-analytics.md) · [`../../docs/blog/strategie.md`](../../docs/blog/strategie.md) · [`../../docs/tech-stack.md`](../../docs/tech-stack.md) · [`../plan-commercial/02-zones-prioritaires.md`](../plan-commercial/02-zones-prioritaires.md)  
**Aval :** Backlog Next.js · briefs landings · GSC · recette presta · [`17-launch-assets.md`](./17-launch-assets.md)

> **`05`** = keywords, clusters, SEM Search.  
> **`15`** = **audit sémantique** (priorisation / gaps) + **cahier des charges SEO technique** vérifiable (Hégo / SEOlivier).

---

## 0. Synthèse

| | |
| --- | --- |
| **Moat** | Guides longs + outils + catalogue curated (≠ volume Nadia) |
| **Horizon utile** | Trafic organique **M6+** · fondations tech **J0** |
| **Sémantique** | 5 hubs A–E + silo **geo Z1** + money pages |
| **Tech** | Next.js crawlable · CWV · schema · sitemap · pas de noindex oublié |
| **Cible Y1** | Closings `seo` **≥ 3–5** · 20–60 leads org. M9+ (`09`) |

---

## Partie A — Audit sémantique

### A.1 Objectifs & périmètre

| Objectif | Mesure |
| --- | --- |
| Autorité confiance (papiers) | Rank / clics A1–A4–D1 |
| Intent terrain + outils | `sim_complete` depuis organic |
| Money geo Z1 | Landings Mermoz / Almadies / Ngor / Sacré-Cœur |
| Diaspora | Cluster D → Secure / WA |
| Éviter | Doorway geo · cannibalisation · contenu orphelin |

**Volumes KW :** indicatifs jusqu’à validation GSC + Keyword Planner J0 (`05`).

### A.2 Carte d’intentions (audit)

| Intent | % effort Y1 | Clusters | Gap typique |
| --- | ---: | --- | --- |
| Informational | **40 %** | A, B, D, E | Piliers non publiés |
| Commercial investigation | **15 %** | About · diaspora · vendre | Page confiance fine |
| Transactional / geo | **30 %** | Landings Z1 · fiches | Landings absentes / stock 0 |
| Tool | **15 %** | `/outils` | Embed + schema HowTo |

### A.3 Matrice cluster × priorité × statut

*Statuts : `todo` · `draft` · `live` · `maj` — à cocher en prod.*

| Cluster | Pages P0 (90 j) | Pages P1 (M4–6) | Risque cannibalisation |
| --- | --- | --- | --- |
| **A** Sécuriser | A1 · A4 · hub A | A5 · A3 · glossaire | A1 vs glossaire — H1 distincts |
| **B** Terrain | B2 · B1 · B6 · `/outils` | B3 · B4 | B2 vs outil construction — outil = money |
| **C** Loc/gestion | Teaser C1 | C1 · C4 · landings loc | — |
| **D** Diaspora | D1 · sat séquestre | D3 full · hub D | D1 vs `/diaspora` — hub vs spoke |
| **E** Argent | Sat mensualités | E1–E4 | Via B/outils |
| **Geo Z1** | Mermoz · Almadies | Ngor · Sacré-Cœur | 1 KW primaire / landing |
| **Money** | Home · estimation · comment on travaille | `/vendre` · `/diaspora` | Brand vs geo |

Détail KW / URL → **table source `05`** (ne pas dupliquer ici).

### A.4 Gaps & quick wins (ordre)

| # | Gap | Action | Horizon |
| --- | --- | --- | --- |
| 1 | 0 pilier A1 | Publier TF vs bail | Soft / M1 |
| 2 | Pas de GSC | Propriété + sitemap | J0–J30 |
| 3 | Landings geo absentes | 1 template × 2–4 quartiers | M1–M3 |
| 4 | Fiches sans schema | JSON-LD listing | V0–V1 |
| 5 | Outils non indexés | `/outils` + index | V1 |
| 6 | Maillage faible | 2–4 liens internes / pilier | Continu |
| 7 | Biens vendus 404 | Soft 301 / page « vendu » | Dès stock |
| 8 | Facettes catalogue | `noindex` ou canonical | Avant scale stock |

### A.5 Concurrent sémantique (bench blog)

| Acteur | Signal | Notre riposte |
| --- | --- | --- |
| Nadia / volume SEO | Bruit court | Qualité + date maj + outil |
| ImmoConnexion | Piliers longs | Match longueur + CTA produit |
| Keur City (zombie) | Autorité érodée | Cadence tenable `12` |
| Classifieds | Transactional | Curated + pastille papier |

### A.6 SEO local

| Asset | Exigence |
| --- | --- |
| Google Business Profile | ≤ J+14 Soft (`08` / `06` lancement) |
| NAP cohérent | Nom · adresse · tel WA = site |
| Catégorie | Agence immobilière |
| Posts GBP | Recycle Status / pilier 1×/sem option |
| Avis | Process post-closing (pas fake) |

### A.7 Roadmap sémantique (alignée `12`)

| Mois | Livrables SEO contenu |
| --- | --- |
| M1 | A1 · B2 · GSC · 1 landing geo |
| M2 | A4 · D1 · maillage |
| M3 | B1 · B6 · landing #2 · revue cannibalisation |
| M4 | A5 · B3 · calculateur frais |
| M5 | C1 · D3 · landings loc soft |
| M6 | B4 · C4 · audit sémantique v2 (données GSC) |

---

## Partie B — Cahier des charges SEO technique

> Chaque exigence = **attendu** + **vérification** (Hégo).  
> Annexable au devis presta / Definition of Done Vague 0–1.

### B.1 Indexabilité & crawl

| ID | Exigence | Vérification |
| --- | --- | --- |
| **T01** | Prod : **0** `noindex` sur URLs destinées à l’index | GSC Inspection · 5 URLs tirées au sort |
| **T02** | Staging / preview : `noindex` + auth si besoin | robots / meta |
| **T03** | `robots.txt` n’bloque pas `/blog` `/guides` `/quartiers` `/outils` `/biens` · déclare sitemap | Testeur robots.txt |
| **T04** | Sitemap XML auto · URLs **200** indexables only · maj à publish | Contrôle sitemap + GSC |
| **T05** | Sitemap index si &gt; 50k URLs (Y1 improbable) | — |
| **T06** | HTML utile crawlable (contenu principal en SSR/SSG ou prérendu) — pas shell JS vide | View-source / curl |
| **T07** | Facettes / tris catalogue : `noindex,follow` **ou** canonical vers listing parent | Audit URL params |

### B.2 URL, canonical, HTTPS

| ID | Exigence | Vérification |
| --- | --- | --- |
| **T08** | HTTPS only · redirect HTTP→HTTPS | Curl -I |
| **T09** | Une host canonique (www **ou** apex) | Redirect 301 |
| **T10** | Canonical auto-référente sur pages indexables | Balise link |
| **T11** | Trailing slash **politique unique** | Pas de duplicate |
| **T12** | Slugs FR lisibles : `/blog/titre-foncier-vs-bail-vs-deliberation` | Revue arbo |
| **T13** | Fiches bien : URL stable (id/slug) · pas de query session | Code review |

### B.3 Balises on-page (par gabarit)

| Gabarit | Title | H1 | Meta description |
| --- | --- | --- | --- |
| Home | Marque + agence Dakar | EverGreen / promesse | ≤ 155 car. |
| Pilier | KW primaire + année si frais | = intent | Unique |
| Landing geo | `[Type] [Quartier] Dakar` | Unique / quartier | Unique |
| Fiche | Type · quartier · pastille papier | Titre bien | Prix + zone |
| Outil | Intent tool | Nom outil | CTA simu |

| ID | Exigence | Vérification |
| --- | --- | --- |
| **T14** | 1 H1 unique / page | Audit |
| **T15** | Title unique · 50–60 car. cible | Crawl sample |
| **T16** | Meta description unique | Crawl |
| **T17** | OG + Twitter cards (`social-share-cards`) | Debug FB/LI |
| **T18** | `hreflang` : **non** Y1 (FR only) sauf EN diaspora page dédiée plus tard | — |

### B.4 Données structurées (JSON-LD)

| Page | Schema | ID |
| --- | --- | --- |
| Site / about | `RealEstateAgent` / `LocalBusiness` | **T19** |
| Fiche bien | `RealEstateListing` ou `Product` (+ offre prix XOF) | **T20** |
| Pilier / FAQ | `Article` + `FAQPage` (+ `HowTo` si checklist) | **T21** |
| Landing geo | `Place` + `FAQPage` | **T22** |
| Fil d’Ariane | `BreadcrumbList` | **T23** |

**Vérif :** Rich Results Test · 0 erreur critique.  
Pastille papier = propriété custom texte visible (pas seulement schema).

### B.5 Performance & Core Web Vitals

| ID | Métrique | Seuil (mobile p75) |
| --- | --- | --- |
| **T24** | LCP | ≤ **2,5 s** |
| **T25** | INP | ≤ **200 ms** |
| **T26** | CLS | ≤ **0,1** |
| **T27** | TTFB | ≤ **600 ms** (cible) |

| ID | Exigence images | Vérif |
| --- | --- | --- |
| **T28** | `next/image` · WebP/AVIF · sizes · lazy below fold | Lighthouse / code |
| **T29** | Hero LCP priorisé (`priority`) · pas de galerie 20 full-res above fold | CWV |
| **T30** | Fiches : galerie lazy · placeholders dimensions (anti-CLS) | CLS |

*Ts-Immo / Triaina : galeries immo = #1 killer CWV.*

### B.6 Maillage & architecture

| ID | Exigence | Vérif |
| --- | --- | --- |
| **T31** | Hub → spokes A–E linkés · spokes → hub | Crawl |
| **T32** | Chaque pilier : ≥ **2–4** liens internes + 1 outil + 1–2 fiches si pertinent | Checklist publish |
| **T33** | Breadcrumb visible | UI |
| **T34** | Menu / footer : money pages + guides hub | IA |
| **T35** | 0 orphan page money | Crawl depth ≤ 3 |

### B.7 Catalogue & biens vendus (spécifique immo)

| ID | Exigence | Vérif |
| --- | --- | --- |
| **T36** | Bien vendu/loué : page « Vendu / Loué » **ou** 301 vers geo/type — **pas** 404 soft massif | Process AC |
| **T37** | Soft 404 HTML évitées | Status code réel |
| **T38** | Pagination catalogue crawlable · rel next/prev ou load + liens | HTML |
| **T39** | Filtres papier TF/bail/délib en URL propres ou UI sans duplicate | Canonical |

### B.8 Analytics & Search

| ID | Exigence | Vérif |
| --- | --- | --- |
| **T40** | GSC propriété domaine/URL préfixe | Invite OK |
| **T41** | GA4 + events `wa_click` / `sim_*` (`13`) | DebugView |
| **T42** | Sitemap soumis GSC | UI GSC |

### B.9 Migration / refonte (si applicable)

| ID | Exigence | Vérif |
| --- | --- | --- |
| **T43** | Plan 301 ancienne→nouvelle (si URLs changent) | Table + test ≥ 50 URLs |
| **T44** | Recette préprod **avant** bascule | Checklist T01–T42 |
| **T45** | Contrôle J+7 / J+30 : couverture index · 404 · CWV field | GSC + CrUX |

### B.10 Contenu technique (E-E-A-T soft)

| ID | Exigence |
| --- | --- |
| **T46** | Date `dateModified` visible sur piliers chiffrés |
| **T47** | Auteur / agence identifiable |
| **T48** | Disclaimer chiffres + pastille papier |
| **T49** | Pas de thin doorway geo (&lt; 800 mots dupliqués) |

---

## C. Specs gabarit (resume presta)

### C.1 Pilier blog (MDX)

- SSR/SSG · TOC · FAQ schema · OG · maillage slots · embed `<SimulatorEmbed />` · CTA WA  
- Longueur 2 000–4 000+ · barème `11`

### C.2 Landing geo

- 800–1 500 mots · embed catalogue filtré · FAQ · Place schema · H2 template `05` §3.2

### C.3 Fiche bien

- Pastille papier above fold · prix · photos optimisées · RealEstateListing · CTA WA · related geo

### C.4 `/outils`

- Indexable · sim_start/complete events · liens depuis B2/B6/E  

---

## D. Recette & gouvernance

### D.1 Definition of Done SEO Vague 0

- [ ] T01–T06 · T08–T17 · T19 · T28–T30 · T40–T42  
- [ ] ≥ 1 pilier + home + catalogue crawlables  
- [ ] 0 staging noindex en prod  

### D.2 DoD Vague 1

- [ ] T20–T23 · outils indexés · T31–T35  
- [ ] 2 landings geo P0  

### D.3 RACI

| Acte | CT | Presta | AC | GER |
| --- | :---: | :---: | :---: | :---: |
| Audit sémantique / priorisation | **R/A** | C | C | I |
| CdC tech / recette | **A** | **R** | I | I |
| Contenu on-page | **R** | C | C métier | I |
| GBP / NAP | C | — | C | **R** |
| Biens vendus URLs | C | C | **R** | I |

### D.4 KPI SEO (rappel)

| KPI | Cible |
| --- | ---: |
| Pages indexées P0 | Selon calendrier |
| Clics org. M9+ | Croissance MoM |
| CTR guide → outil | **&gt; 8 %** |
| Closings `seo` Y1 | **≥ 3–5** |
| CWV gabarits | Pass T24–T26 |
| Cannibalisation H1 | 0 doublon primaire |

---

## E. Anti-patterns

| | |
| --- | --- |
| noindex staging oublié en prod | Soft launch invisible (Veeber) |
| 20 landings geo 200 mots | Doorway penalty risk |
| Galerie uncompressed | LCP mort |
| Indexer toutes les facettes | Crawl budget burn |
| Publier pilier sans CTA outil/WA | Syndrome Keur City |
| « TeleDAc = permis en ligne » | Brand + faux SEO claim |

---

## F. Lien docs

| Doc | Rôle |
| --- | --- |
| [`05-seo-sem.md`](./05-seo-sem.md) | KW · clusters · SEM |
| [`12-calendrier-editorial.md`](./12-calendrier-editorial.md) | Timing piliers |
| [`13-plan-taggage-analytics.md`](./13-plan-taggage-analytics.md) | Events |
| [`../../docs/blog/strategie.md`](../../docs/blog/strategie.md) | Barème éditorial |

---

## G. Sources

### Internes

SEO-SEM · calendrier · stratégie contenu · blog stratégie · zones · tech stack · share cards.

### Externes

| Source | Insight |
| --- | --- |
| Vincent Hégo — CdC SEO 12 exigences | Attendu + vérification · noindex · sitemap · CWV · recette |
| SEOlivier — CdC SEO technique | Crawl HTML · canonicals · robots · specs gabarit |
| Ts-Immo — SEO immo 2026 | Quartiers · RealEstateListing · biens vendus · crawl budget |
| Triaina — SEO agence immo | CWV galeries · schema LocalBusiness/FAQ · E-E-A-T |

---

*Stratégie SEO (audit sémantique + CdC technique) v1.0 — sept. 2026. Prochain : `16-plan-partenariats-influence.md`.*
