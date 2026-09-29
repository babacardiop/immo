# Launch assets — Checklist inventaire lancement

**Document :** Dossier · Marketing · 17  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`08-launch-plan.md`](./08-launch-plan.md) · [`10-brand-book.md`](./10-brand-book.md) · [`01-brand-guidelines.md`](./01-brand-guidelines.md) · [`06-social-whatsapp.md`](./06-social-whatsapp.md) · [`07-partenariats-media.md`](./07-partenariats-media.md) · [`13-plan-taggage-analytics.md`](./13-plan-taggage-analytics.md) · [`15-strategie-seo.md`](./15-strategie-seo.md) · [`../../docs/design-tokens.md`](../../docs/design-tokens.md) · [`../../docs/social-share-cards.md`](../../docs/social-share-cards.md)  
**Aval :** Drive/Notion assets · Soft launch GO · recette Jour J

> **Rôle :** inventaire **fichier par fichier** + owners + DoD.  
> Timing Soft → public → `08`. Ops légal/cash → `plan-commercial/06`.

**Légende priorité :** **P0** = Soft (Jour J) · **P1** = Public amp / M3 paid · **P2** = Nice-to-have Y1.

---

## 0. Synthèse — DoD assets Soft

| Bloc | Minimum Soft |
| --- | --- |
| Identité | Logo SVG+PNG · favicon · tokens |
| Site | Home · catalogue · ≥1 fiche · CTA WA · Comment on travaille |
| Social/WA | Profil Business · Status S1 · message SOI · share cards 3 crops |
| Tracking | GA4 · `wa_click` · CRM tags · UTM doc |
| Contenu | Disclaimers papiers · OG défaut · A1 outline/draft |
| Ops com | Tarifs résumé · brand do/don’t 1-pager |

**Audit assets :** J−14 et J−3 (Designe / launch checklists).

---

## 1. Gouvernance fichiers

### 1.1 Arborescence recommandée

```
assets/
├── brand/
│   ├── logo/          (svg, png light/dark)
│   ├── favicon/
│   └── tokens/        (ref design-tokens.md)
├── og/                (default + templates)
├── social/
│   ├── profiles/
│   ├── status/
│   └── templates/
├── listings/          (photos par mandat)
├── media-kit/
├── ads/               (P1)
└── print/             (P2)
```

### 1.2 Naming

```
eg_{type}_{desc}_{WxH}_{vN}.{ext}
ex. eg_logo_wordmark_lockup_v1.svg
    eg_og_default_1200x630_v1.jpg
    eg_share_listing_{id}_1080x1080_v1.jpg
```

Versioning : `v1`, `v2` — ne pas écraser masters.  
Owners : CT (master) · Presta (web) · AC (listings photos).

---

## 2. Identité & brand (P0)

| # | Asset | Spec | Owner | ☐ |
| --- | --- | --- | :---: | --- |
| B01 | Logo primaire (lockup) | SVG + PNG transparent | CT | ☐ |
| B02 | Wordmark seul | SVG + PNG | CT | ☐ |
| B03 | Icône / mark | SVG · favicon source | CT | ☐ |
| B04 | Logo monochrome ink | PNG/SVG | CT | ☐ |
| B05 | Logo sur fond sage (si besoin) | PNG | CT | ☐ |
| B06 | Favicon set | 16/32/180 apple · `icon.svg` | Presta | ☐ |
| B07 | Palette documentée | Hex tokens `design-tokens` | CT | ☐ |
| B08 | Typo brand (fichiers / licences) | WOFF2 ou lien | Presta | ☐ |
| B09 | Brand do/don’t 1-pager PDF | 1 page A4 | CT | ☐ |
| B10 | Signature e-mail HTML/image | Logo + WA + url | CT | ☐ |
| B11 | Avatar WA / LinkedIn | 640×640 min | CT | ☐ |

**Vérif :** pas de stretch · clear space Brand Book · light/dark lisibles.

---

## 3. Site & conversion (P0)

| # | Asset / page | Spec | Owner | ☐ |
| --- | --- | --- | :---: | --- |
| S01 | Domaine + HTTPS | Cert OK · host canonique | Presta | ☐ |
| S02 | Home mobile | Promesse + CTA WA | Presta/CT | ☐ |
| S03 | Catalogue listing | Filtres · pastilles | Presta | ☐ |
| S04 | Template fiche bien | Papier · prix · photos · WA | Presta | ☐ |
| S05 | ≥ **1** fiche curated live (idéal 3+) | Copy + photos droits OK | AC | ☐ |
| S06 | Page Comment on travaille | Process anti-Wave | CT | ☐ |
| S07 | `/estimation` ou équivalent WA | Form / deep link | CT | ☐ |
| S08 | Mentions légales | RCCM/NINEA si dispo | GER | ☐ |
| S09 | Confidentialité / cookies | Si forms / analytics | CT | ☐ |
| S10 | 404 branded | Lien home / WA | Presta | ☐ |
| S11 | robots.txt + sitemap | Prod indexable (`15`) | Presta | ☐ |
| S12 | Staging noindex | **Pas** en prod | Presta | ☐ |

**Photos listings (Dignuz) :** résolution · ratio · alt · **droits** — audit J−14.

---

## 4. Open Graph & share cards (P0)

*Specs `docs/social-share-cards.md`.*

| # | Asset | Taille | Usage | ☐ |
| --- | --- | ---: | --- | --- |
| O01 | OG défaut site | **1200×630** · JPEG &lt; 300 KB | FB/WA/LI | ☐ |
| O02 | Template OG listing | 1200×630 dynamique | Fiches | ☐ |
| O03 | OG square | **1080×1080** | IG / bio | ☐ |
| O04 | OG story | **1080×1920** | Status / Stories | ☐ |
| O05 | Meta tags home | title · desc · og:* · locale `fr_SN` | Presta | ☐ |
| O06 | Meta tags fiche | Dynamiques + cache-bust `?v=` | Presta | ☐ |
| O07 | Twitter cards | summary_large_image | Presta | ☐ |

**QA Jour J−1 :** Facebook Sharing Debugger · LinkedIn Inspector · share test WA.

---

## 5. WhatsApp & social profiles (P0)

| # | Asset | Spec | Owner | ☐ |
| --- | --- | --- | :---: | --- |
| W01 | WA Business profil | Photo · horaires · lien site · description | AC/GER | ☐ |
| W02 | Message d’accueil / accusé auto | ≤ 5 lignes brand | AC | ☐ |
| W03 | Réponses rapides (5–8) | Estimation · visite · papiers | AC | ☐ |
| W04 | Labels CRM | `soi` `wa_status` `meta`… | AC | ☐ |
| W05 | Queue Status **S1** (7 j) | Biens + tips | AC/CT | ☐ |
| W06 | Message SOI Jour J | Texte validé GER (`08`) | GER | ☐ |
| W07 | Captions J0–J7 | 7 textes prêts | CT | ☐ |
| W08 | FB page (si live) | Cover · avatar · CTA WA | CT | ☐ |
| W09 | LinkedIn GER / page | Banner · about | GER/CT | ☐ |
| W10 | Share cards 3 crops × 1–3 biens | WA/FB/IG | CT | ☐ |

---

## 6. Contenu & SEO pack (P0/P1)

| # | Asset | Priorité | ☐ |
| --- | --- | :---: | --- |
| C01 | Disclaimers TF / bail / délibération (copier `01`) | P0 | ☐ |
| C02 | Pastilles couleur papier (assets UI) | P0 | ☐ |
| C03 | Outline ou draft **A1** | P0 | ☐ |
| C04 | Title/meta home + fiches | P0 | ☐ |
| C05 | GSC propriété + sitemap soumis | P0 | ☐ |
| C06 | Pilier A1 publié | P1 ≤ J+30 | ☐ |
| C07 | Landing geo #1 (Mermoz) draft | P1 | ☐ |
| C08 | Template cover blog | P1 | ☐ |

---

## 7. Tracking & CRM (P0)

| # | Asset / config | Spec | ☐ |
| --- | --- | --- | --- |
| T01 | GA4 propriété + flux | DebugView OK | ☐ |
| T02 | Event `wa_click` | Fire 1× / clic | ☐ |
| T03 | Event `estimation_request` | Si form | ☐ |
| T04 | Doc UTM 1-pager | `13` résumé | ☐ |
| T05 | CRM colonnes source | Sheet/CRM | ☐ |
| T06 | Meta Pixel (0 spend) | Test Events | ☐ |
| T07 | GTM container (si utilisé) | Publish prod | ☐ |

---

## 8. Ops commercial / com interne (P0)

| # | Asset | ☐ |
| --- | --- | --- |
| P01 | Grille honoraires / FAI résumé agent (1 page) | ☐ |
| P02 | Scripts persona courts (`02`) | ☐ |
| P03 | Argumentaire exclusif (extrait `05` commercial) | ☐ |
| P04 | Modèle mandat (PDF) — juridique | ☐ |
| P05 | Horaires + escalade WA (interne) | ☐ |

---

## 9. Media kit & PR (P2 → P1 si amp)

| # | Asset | Spec | ☐ |
| --- | --- | --- | --- |
| M01 | One-pager EverGreen PDF | Positionnement · promesse | ☐ |
| M02 | Bio GER 80 mots FR | + EN option | ☐ |
| M03 | Photo GER / équipe (droits) | Haute rés | ☐ |
| M04 | 3 angles pitch (`07`) | Texte | ☐ |
| M05 | Dossier presse zip | Logo + one-pager + photos | ☐ |
| M06 | Contact presse | mail / WA | ☐ |

---

## 10. Ads creatives (P1 — avant M3)

| # | Asset | Campagne | ☐ |
| --- | --- | --- | --- |
| A01 | 2 visuels estimation | C1 Marième | ☐ |
| A02 | 2 visuels simu / terrain | C2 Mamadou | ☐ |
| A03 | 1–2 retarget « simu » | C3 | ☐ |
| A04 | Landing mobile testée | Tous | ☐ |
| A05 | Copy frames Ads (`04`/`14`) | — | ☐ |
| A06 | Pack diaspora (M7) | C5 | ☐ |

Formats : 1080×1080 · 1080×1920 · 1200×628.

---

## 11. Print / terrain (P2)

| # | Asset | ☐ |
| --- | --- | --- |
| R01 | Carte de visite | ☐ |
| R02 | Flyer estimation / « Comment on travaille » | ☐ |
| R03 | Panneau mandat (si usage) | ☐ |
| R04 | Chemise dossier client | ☐ |

---

## 12. Calendrier production assets

| Fenêtre | Focus |
| --- | --- |
| **J−30 → J−23** | B01–B11 · arbo Drive · tokens |
| **J−23 → J−16** | Photos listings · share cards · S04–S05 |
| **J−16 → J−9** | Pages site · OG · SEO meta · disclaimers |
| **J−9 → J−4** | WA pack · SOI · Status S1 · captions |
| **J−3 → J−1** | Tracking QA · Debugger OG · noindex check · freeze P0 |
| **J+14** | Media kit si public amp |
| **M2–M3** | Ads creatives P1 |

---

## 13. Checklist recette Jour J−1 (1 page)

### Identité
- [ ] Logo header/footer/favicon cohérents  
- [ ] Couleurs = tokens  

### Site
- [ ] Mobile home + fiche + WA  
- [ ] HTTPS · 0 noindex prod  
- [ ] ≥ 1 fiche live  

### Social
- [ ] WA ouvert · Status queue prête · SOI texte  
- [ ] OG testé (Debugger)  

### Tracking
- [ ] `wa_click` DebugView  
- [ ] CRM tags  

### Contenu
- [ ] Pastille papier sur fiche  
- [ ] Disclaimer si ≠ TF  

### Interdit Jour J
- [ ] 0 ads  
- [ ] 0 claim Wave vendeur  
- [ ] 0 open posting  

**Sign-off :** CT ______ · GER ______ · date ______

---

## 14. RACI

| Bloc | R | A | C |
| --- | :---: | :---: | :---: |
| Brand files | CT | GER | Presta |
| Site pages | Presta | GER | CT/AC |
| Listings photos | AC | GER | CT |
| WA / Status | AC | GER | CT |
| OG / SEO tech | Presta | CT | — |
| Tracking | Presta/CT | GER | AC |
| Media kit | CT | GER | — |
| Ads creatives | CT | GER | — |

---

## 15. Anti-patterns assets

| | |
| --- | --- |
| Logo JPG compressé flou favicon | Brand weak |
| OG 200×200 ou &gt; 1 MB | WA preview cassé |
| Photos stock Dubai | Off-brand |
| Fiche sans pastille papier | Faute grave |
| Assets dans WhatsApp perso non versionnés | Perte / dérive |
| Publier sans droits photo | Litige |

---

## 16. Lien docs

| Doc | Rôle |
| --- | --- |
| [`08-launch-plan.md`](./08-launch-plan.md) | Soft → public · runbooks |
| [`10-brand-book.md`](./10-brand-book.md) | Règles usage |
| [`../../docs/social-share-cards.md`](../../docs/social-share-cards.md) | OG 3 crops |
| [`../../docs/design-tokens.md`](../../docs/design-tokens.md) | Couleurs |
| [`15-strategie-seo.md`](./15-strategie-seo.md) | T01–T49 tech |

---

## 17. Sources

### Internes

Launch plan §5 · brand book · social WA · media · taggage · SEO CdC · share cards · tokens.

### Externes

| Source | Insight |
| --- | --- |
| Designe / DesignLogo — brand launch checklists | Logo formats · social · gouvernance fichiers |
| env.dev / Rank Local — OG 2026 | 1200×630 · absolute HTTPS · Debugger |
| Dignuz — RE website launch | Audit photos listings · CWV fiche · droits images |
| ListingKit — listing launch | Assets prêts **48 h** avant go-live |

---

*Launch assets checklist v1.0 — sept. 2026. Pack marketing 01–17 complet.*
