# Architecture d’information & sitemap complet

**Document :** Dossier · Tech · Site · 13  
**Statut :** v1.0 — sept. 2026  
**Type :** Document d’IA formel (normatif URL / nav / taxonomies / templates)  
**Amont :** [`01-sitemap-et-ia.md`](./01-sitemap-et-ia.md) · [`02`](./02-parcours-utilisateurs.md) · [`03`](./03-wireframes-mvp.md) · [`05`](./05-catalogue-annonces.md) · [`08`](./08-seo-technique.md) · [`09`](./09-back-office-agents.md) · [`10`](./10-roadmap-features.md) · [`11`](./11-cahier-des-charges-fonctionnel.md) · [`12`](./12-user-stories-backlog.md)  
**Aval :** App Router folders · wire HF `15` · Figma `16` · proto `17` · `app/sitemap.ts`

> **Rôle :** spécification **complète** de l’architecture d’information du hub — au-delà du résumé `01` : registre URL, taxonomies, systèmes de navigation, templates décisionnels, espaces app, règles SEO/facettes, validation.  
> `01` reste le **aperçu exécutif** ; en cas de conflit, **ce doc (`13`) prime** après validation GER.

---

## 0. En une phrase

IA **journey-first (agence)** + discovery spatiale (map/liste) + **papiers first-class** — pas un miroir MLS/classifieds.

```
Parcours métier (nav)  →  Taxonomies (type/papier/zone)  →  Templates décisionnels
                        →  Espaces auth (agent / L / P)
                        →  XML sitemaps segmentés
```

---

## 1. Objectifs IA & principes

### 1.1 Objectifs

| # | Objectif | Mesure |
| ---: | --- | --- |
| 1 | Trouver un bien curated en ≤3 clics | Home/nav → catalogue → fiche |
| 2 | Lire le papier **avant** le CTA | Pastille above-the-fold fiche + filtre |
| 3 | Séparer intents tôt | Acheter ≠ Louer ≠ Gérer ≠ Diaspora ≠ Vendre |
| 4 | Outils = produit (V1) | `/outils` en L1 nav |
| 5 | BO ≠ chrome marketing | `/espace/*` shell app distinct |
| 6 | SEO local sans doorway | Landings zone uniques + contenu |

### 1.2 Principes (hérités `01` + benches 2026)

| # | Principe | Source forge |
| ---: | --- | --- |
| P1 | Journey-first brokerage, pas search-only portal | [ValidateThat IA template](https://validatethat.io/templates/real-estate-website-ia-template) · Compass split consumer/agent ([Foundey](https://foundey.com/blog/real-estate-product-design)) |
| P2 | Listing detail = **décision structurée**, pas brochure | [WPResidence 6 blocks](https://wpresidence.net/property-website-design-patterns/) · [DiverseKit](https://diversekit.com/blog/property-listing-page-design) · [Onething](https://www.onething.design/post/real-estate-app-ux) |
| P3 | Card = surface de décision (prix, papier, zone) | Foundey listing card |
| P4 | Mobile sticky contact (WA) thumb-zone | DiverseKit / immo mobile |
| P5 | Nav L1 ≤7 · money pages ≤3 clics | `01` |
| P6 | Facets query = canonical / noindex anti-dup | `08` |
| P7 | Phaser vagues — ne pas publier `/observatoire` avant L4 | lab `07` |

### 1.3 Décisions verrouillées (ex-ouvertes `01`)

| Sujet | Décision | Norme |
| --- | --- | --- |
| URL fiche | Préfixe métier | `/acheter/[slug]` · `/louer/[slug]` |
| Éditorial | Canon `/guides` | `/blog` → 301 `/guides` |
| Carte | Toggle + query | `/acheter?view=map` (pas route `/carte` obligatoire) |
| Estimation | Shortcut | `/estimation` → `/outils/estimation` |
| Langue | FR only Y1 | `lang=fr` · `og:locale=fr_SN` |

---

## 2. Systèmes de navigation

### 2.1 L1 — Nav primaire (public)

```
[Logo]  Acheter · Louer · Gérer · Diaspora · Outils · Guides · Agence
        [Search]  [WA]  [Espace]
```

| Label UI | URL | Visible dès | Notes |
| --- | --- | :---: | --- |
| Acheter | `/acheter` | V0 | Mega soft : Terrains / Maisons / Apparts / Carte |
| Louer | `/louer` | V0 | |
| Gérer | `/gerer` | V0 | |
| Diaspora | `/diaspora` | V0 soft | Pack pages V4 |
| Outils | `/outils` | **V1** | Masqué L1 en V0 → footer + post-V0 |
| Guides | `/guides` | V0 | |
| Agence | `/agence` | V0 | |

**Mobile :** drawer même ordre · FAB WA (`W-WA-FAB`) · Search icon.

**Interdit L1 :** « Annonces », « Marketplace », « Crédit banque », mega 20 liens.

### 2.2 L2 — Contextuels

| Contexte | L2 |
| --- | --- |
| Sous Acheter | Type (terrains…) · Zones phares · Étalé · Estimation vendeur |
| Sous Outils | Mensualité · Construction · Budget · (V2+) Frais · Estimation |
| Sous Guides | 5 hubs A–E |
| Sous Agence | Comment on travaille · Contact · Équipe (opt.) |
| Sous Diaspora (V4) | Sécuriser · Inspection · Procuration |

### 2.3 Footer

| Colonne | Liens |
| --- | --- |
| Parcours | Acheter · Louer · Gérer · Diaspora · Vendre (`/estimation`) |
| Outils | Hub + 3 simus P0 (dès V1) |
| Confiance | Comment on travaille · Guides TF · Observatoire *(si L4)* |
| Agence | Contact · NAP · Horaires |
| Legal | Mentions · Confidentialité · Cookies · CGU · Plan du site |

NAP = identique schema `RealEstateAgent` (`08`).

### 2.4 Shells authentifiés (hors L1 marketing)

| Shell | Base | Nav app |
| --- | --- | --- |
| Agent | `/espace/agent` | Dashboard · Leads · Mandats · Annonces · Dossiers · Docs · Partenaires · Tâches · Profil |
| Proprio | `/espace/proprio` | Biens · Loyers · Docs · Messages Soft |
| Client | `/espace/client` | Bail/Échéancier · Quittances · Panne · Docs |

Chrome marketing **réduit** (logo + logout + WA support) — pas la nav Acheter/Louer.

---

## 3. Taxonomies & vocabulaire

### 3.1 Transaction

| Valeur | Label UI | Path catalogue |
| --- | --- | --- |
| `sale` | À vendre | `/acheter` |
| `installment_sale` | Vente étalée | `/acheter` + facet |
| `rent_to_own` | Location-vente | `/acheter` + facet |
| `rent` | À louer | `/louer` |

### 3.2 Type de bien

| Valeur | Label | Path type (option) | Vague |
| --- | --- | --- | :---: |
| `land` | Terrain | `/acheter/terrains` | V0 |
| `house` | Maison | `/acheter/maisons` | V0 |
| `apartment` | Appartement | `/acheter/appartements` · `/louer/...` | V0 |
| `office` | Bureau | — | later |

### 3.3 Papier (first-class)

| Valeur | Label pastille | Disclaimer |
| --- | --- | --- |
| `tf` | Titre foncier | Soft réserve EDR si `declared` |
| `bail_emphyteotique` | Bail emphytéotique | Bail ≠ TF |
| `bail_ordinaire` | Bail | |
| `deliberation` | Délibération | **Fort** — usage ≠ propriété · jamais badge TF |
| `other` | — | **Non publiable** vente |

Filtre catalogue vente : facet `papier` obligatoire en UI (`W-FILTERS`).

### 3.4 Zones (geo IA)

| Niveau | Usage | Exemples Z1 Y1 |
| --- | --- | --- |
| `zone_slug` | Landing SEO + facet | `almadies`, `mermoz`, `ngor`, `sacre-coeur`, `ouakam`, `bambilor`… |
| `city` | Dakar / Thiès… | Expansion |
| `quarter` | Affichage fiche | Texte libre contrôlé |

**Règle :** landing `/acheter/[zone]` seulement si contenu unique (intro ≥150 mots + listings) — anti-doorway (`08`).

### 3.5 Hubs éditoriaux

| Code | Path | Intention |
| --- | --- | --- |
| A | `/guides/securiser/` | TF, arnaques, notaire, diligence |
| B | `/guides/terrains-construction/` | Coût m², budget, AC |
| C | `/guides/louer-gerer/` | Bail, caution, proprio |
| D | `/guides/diaspora/` | Acheter à distance |
| E | `/guides/argent/` | Mensualités, frais, étalé |

### 3.6 Dictionnaire de labels (UI)

| Concept | Dire | Ne pas dire |
| --- | --- | --- |
| Simu PUB-01 | Mensualité étalé / loc-vente | « Crédit », « Prêt banque » |
| Agence | Agence immobilière | Marketplace, site d’annonces |
| Délibération | Droit d’usage / délibération | Titre foncier |
| Contact | WhatsApp / Conseiller | Chatbot agressif multi-CTA |
| Outils | Outils | Widgets, calculateurs bancaires |

---

## 4. Arborescence cible (tree)

```
/                                 Home
├── acheter/                      Hub vente + facets
│   ├── terrains|maisons|appartements/
│   ├── [zone]/                   Landing SEO
│   └── [slug]/                   Fiche vente
├── louer/                        Hub location
│   ├── … types / [zone] /
│   └── [slug]/
├── gerer/                        Landing gestion
│   └── demande/
├── diaspora/
│   ├── securiser/
│   ├── inspection/               V4
│   └── procuration/              V4
├── outils/
│   ├── mensualite|construction|budget-total/     V1
│   ├── frais-acquisition/                        V2
│   ├── estimation/                               V5 (shortcut tôt soft)
│   ├── pret-a-batir/                             V6
│   ├── carte-prix/                               V7
│   └── checklists/[slug]/
├── guides/
│   ├── securiser|terrains-construction|louer-gerer|diaspora|argent/
│   └── [slug]/
├── blog/                         → 301 /guides
├── observatoire/                 V7 / L4
├── agence/
│   ├── comment-on-travaille/
│   ├── equipe/                   opt
│   └── contact/
├── estimation/                   → /outils/estimation
├── partenaires/[slug]/           P1+
├── plan-du-site/                 HTML V1–2
├── espace/
│   ├── connexion/
│   ├── agent/…                   V0
│   ├── proprio/…                 V3
│   └── client/…                  V3+
├── legal/…
└── (404)
```

---

## 5. Registre URL complet

Légende priorité : **P0** ship vague · **P1** should · **P2** could · **—** icebox.

### 5.1 Public — socle

| URL | Template | Vague | Prio | Wire | Index |
| --- | --- | :---: | :---: | --- | :---: |
| `/` | Home | V0 | P0 | W-HOME | ● |
| `/acheter` | Catalogue | V0 | P0 | W-ACH-HUB | ● |
| `/acheter?view=map` | Catalogue map | V0 | P0 | W-ACH-MAP | ○ canon hub |
| `/acheter?…facets` | Catalogue filtré | V0 | P0 | W-FILTERS | ○ noindex/canon |
| `/acheter/terrains` | Catalogue type | V0 | P1 | W-ACH-TYPE | ● si contenu |
| `/acheter/maisons` | Catalogue type | V0 | P1 | | ● |
| `/acheter/appartements` | Catalogue type | V0 | P1 | | ● |
| `/acheter/[zone]` | Landing geo | V0–2 | P1 | W-ACH-ZONE | ● si unique |
| `/acheter/[slug]` | Fiche vente | V0 | P0 | W-ACH-FICHE | ● published |
| `/louer` | Catalogue | V0 | P0 | W-LOU-HUB | ● |
| `/louer?view=map` | Map | V0 | P1 | W-LOU-MAP | ○ |
| `/louer/[zone]` | Landing | V1+ | P1 | | ● |
| `/louer/[slug]` | Fiche loc | V0 | P0 | W-LOU-FICHE | ● |
| `/gerer` | Hub métier | V0 | P0 | W-GER | ● |
| `/gerer/demande` | Form | V0 | P0 | W-GER-FORM | ○ |
| `/diaspora` | Hub métier | V0 | P0 | W-DIA | ● |
| `/diaspora/securiser` | Hub | V4 | P0 | | ● |
| `/diaspora/inspection` | Lead | V4 | P0 | | ● |
| `/diaspora/procuration` | Lead | V4 | P1 | | ● |
| `/agence` | Institutionnel | V0 | P1 | W-AGE | ● |
| `/agence/comment-on-travaille` | Process | V0 | P0 | W-AGE-HOW | ● |
| `/agence/contact` | Contact | V0 | P0 | W-AGE-CONTACT | ● |
| `/agence/equipe` | Opt | — | P2 | | ○ |
| `/guides` | Hub éditorial | V0 | P0 | W-GUI-HUB | ● |
| `/guides/{hub}/` | Hub A–E | V0+ | P0 | | ● |
| `/guides/[slug]` | Article | V0+ | P0 | W-GUI-TMPL | ● |
| `/blog` | Redirect | V0 | P0 | | — |
| `/legal/mentions-legales` | Legal | V0 | P0 | W-LEGAL-ML | ● |
| `/legal/confidentialite` | Legal | V0 | P0 | W-LEGAL-PRIV | ● |
| `/legal/cgu` | Legal | V0 | P1 | W-LEGAL-CGU | ● |
| `/legal/cookies` | Legal | V0 | P1 | W-LEGAL-COOK | ● |
| `/plan-du-site` | HTML sitemap | V1–2 | P1 | | ● |
| `/404` | Erreur | V0 | P0 | W-404 | ○ |

### 5.2 Public — outils & data

| URL | Template | Vague | Prio | Wire | Index |
| --- | --- | :---: | :---: | --- | :---: |
| `/outils` | Hub outils | V1 | P0 | W-OUT-HUB | ● |
| `/outils/mensualite` | Outil | V1 | P0 | W-OUT-MEN | ● |
| `/outils/construction` | Outil | V1 | P0 | W-OUT-CON | ● |
| `/outils/construire` | Alias → construction | V1 | P1 | | — |
| `/outils/budget-total` | Outil | V1 | P0 | W-OUT-BUD | ● |
| `/outils/frais-acquisition` | Outil | V2 | P0 | | ● |
| `/outils/estimation` | Outil lead | V5 (soft V0 form) | P0/P1 | W-EST-SOFT | ● |
| `/estimation` | Redirect | V0 | P1 | | — |
| `/outils/pret-a-batir` | Outil | V6 | P0 | | ● |
| `/outils/carte-prix` | Outil/data | V7 | P0 | | ● |
| `/outils/checklists/[slug]` | Checklist | V1+ | P1 | | ● |
| `/observatoire` | Data public | V7/L4 | P0 | | ● |
| `/partenaires/[slug]` | Partner light | V1+ | P1 | | ● |

### 5.3 Auth — agent (V0+)

| URL | Module | Vague | Prio |
| --- | --- | :---: | :---: |
| `/espace/connexion` | Auth | V0 | P0 |
| `/espace/agent` | Dashboard / home | V0 | P0 |
| `/espace/agent/leads` | File CRM | V0 | P0 |
| `/espace/agent/mandats` | Registre | V0 | P0 |
| `/espace/agent/mandats/[id]` | Fiche mandat | V0 | P0 |
| `/espace/agent/annonces` | Liste | V0 | P0 |
| `/espace/agent/nouveau` | Créer | V0 | P0 |
| `/espace/agent/[id]` | Éditer | V0 | P0 |
| `/espace/agent/dossiers` | Deals | V1–2 | P1 |
| `/espace/agent/dossiers/[id]` | Deal | V1–2 | P1 |
| `/espace/agent/documents` | Vault | V0 | P0 |
| `/espace/agent/partenaires` | PartnerLead | V1 | P0 |
| `/espace/agent/taches` | SLA tasks | V0–1 | P1 |
| `/espace/agent/profil` | Profil | V0 | P1 |

**Robots :** `/espace/*` → `noindex, nofollow`.

### 5.4 Auth — proprio / client (V3+)

| URL | Qui | Vague |
| --- | --- | :---: |
| `/espace/proprio` | BAI dashboard | V3 |
| `/espace/proprio/biens` | Liste | V3 |
| `/espace/proprio/loyers` | Encaissements | V3 |
| `/espace/proprio/docs` | Docs | V3 |
| `/espace/client` | LOC / acquéreur | V3 |
| `/espace/client/loyers` | Quittances | V3 |
| `/espace/client/echeancier` | Étalé | V3+ |
| `/espace/client/panne` | Ticket | V3 |

---

## 6. Templates de page (structure blocs)

### 6.1 Catalogue (list)

Ordre mobile :

1. Titre hub + compteur résultats  
2. Filtres (drawer) — **papier** visible vente  
3. Toggle Liste | Carte  
4. Grid cards (`W-CARD`)  
5. Empty state (`W-EMPTY-CAT`)  
6. CTA WA soft bas de page  

**Card = décision :** photo · prix FCFA · type · zone · **pastille papier** · badge étalé si applicable · CTA discret.

### 6.2 Fiche bien — séquence décisionnelle

Alignée 6–8 blocs immo 2026, adaptée SN :

| # | Bloc | Contenu EverGreen |
| ---: | --- | --- |
| 1 | **Hero galerie** | Swipe mobile · LCP priority 1ʳᵉ image |
| 2 | **Faits clés** | Prix · type · surface · zone · **pastille papier** · ref · transaction |
| 3 | **Disclaimer** | Si délibération / bail — inline (`W-DISC-PAP`) **avant** long texte |
| 4 | **CTA dominant** | WA sticky / sidebar desktop |
| 5 | **Description** | 150–400 mots structurés |
| 6 | **Caractéristiques** | Liste champs `05` |
| 7 | **Carte quartier** | Leaflet embed in-page (~320–400px) |
| 8 | **Outils embed** | Terrain V1 : simus compact |
| 9 | **Confiance process** | Lien comment-on-travaille / diligence V2 |
| 10 | **Similaires** | 3–4 cards même zone/type |
| 11 | **Agent / agence** | NAP soft + WA |

**Fil d’Ariane :** Accueil › Acheter › {Type} › {Zone} › {Titre}

### 6.3 Hub métier (Gérer / Diaspora)

1. Promesse (1 H1)  
2. Preuves / risques adressés  
3. Étapes process  
4. Form ou CTA WA  
5. Maillage guides + outils  

### 6.4 Outil

1. H1 + 1 phrase job  
2. Inputs  
3. Résultat ungated + disclaimer (`W-DISC-SIM`)  
4. CTA in-result (WA / PartnerLead / email)  
5. FAQ JSON-LD  
6. Liens catalogue / guide  

### 6.5 Guide

1. H1 · date MAJ · TOC  
2. Corps + checklists  
3. FAQ  
4. `<SimulatorEmbed />` ou bandeau CTA  
5. 1–2 fiches ex. · 1 partenaire  

### 6.6 Home

**Une composition** (règles design projet) : marque hero · 1 headline · 1 phrase · CTA group + search · visuel plein — **pas** stats / cards décoratives en premier viewport. Suite : 3 parcours · phares · preuve papiers · WA.

---

## 7. Facettes, canonicals & états URL

| Pattern | Indexation | Canonical |
| --- | --- | --- |
| `/acheter` | ● | self |
| `/acheter?papier=tf&zone=almadies` | ○ noindex ou canon hub | `/acheter` ou landing zone si équivalent |
| `/acheter/almadies` | ● si unique | self |
| `/acheter/[slug]` published | ● | self |
| `/acheter/[slug]` sold | ○ retirer sitemap · page statut ou 301 soft | règle |
| `/espace/*` | ○ noindex | — |
| `/gerer/demande` thank-you | ○ | — |

Query map : `view=map|list` · conserve autres facets.

---

## 8. Maillage interne (graphe)

```
Home ──► Acheter/Louer/Gérer/Diaspora
Fiche terrain ──► Outils (01/02/03) ──► PartnerLead
Fiche ──► Guide papier / zone
Guide ──► 1 outil + 1–2 fiches + 1 P
Outil résultat ──► WA + catalogue filtré
Diaspora ──► Guides D + Inspection + Sécuriser
Observatoire ──► Carte prix + Estimation (V7)
```

**Règle orpheline :** toute URL `index=●` a ≥1 lien interne depuis hub parent ou zone.

---

## 9. Mapping personas → entrées IA

| Persona | Entrée L1 | Deep links | Escape |
| --- | --- | --- | --- |
| Mamadou (ACH) | Acheter · Outils | Fiche terrain · PUB-* | Guide B · WA |
| Fatou (DIA) | Diaspora | Sécuriser · Inspection | Guides D · Acheter TF |
| Aïssatou (LOC) | Louer | Fiche · Guides C | Upsell accession |
| Ousmane (BAI) | Gérer | `/gerer/demande` · Espace V3 | — |
| Marième (VEN) | Agence / Estimation | Contact · `/outils/estimation` | — |
| Agent | Espace (direct) | BO modules | — |

Journeys détail → `02`.

---

## 10. XML sitemaps & plan HTML

### 10.1 Fichiers

| Fichier | Contenu | Changefreq esprit |
| --- | --- | --- |
| `sitemap-static.xml` | Home, hubs, agence, legal, outils hub | monthly |
| `sitemap-acheter.xml` | Fiches vente + landings + types | daily |
| `sitemap-louer.xml` | Fiches loc + landings | daily |
| `sitemap-guides.xml` | Hubs + articles | weekly |
| `sitemap-outils.xml` | Pages calculateurs | monthly |
| `sitemap-observatoire.xml` | Si L4 | monthly |

Index : `sitemap.xml` liste les enfants. **200 only** · retirer unpublished.

### 10.2 HTML `/plan-du-site`

Arborescence humaine (parcours + outils + guides + legal) — audit IA + accessibilité. Ship V1–2.

---

## 11. Phasage IA ↔ vagues

| Vague | IA ship | Ne pas publier |
| --- | --- | --- |
| **V0** | Nav sans Outils L1 · catalogues · fiches · hubs Gérer/Diaspora soft · agence · guides teaser · agent BO · legal | `/outils/*` full · portails L/P · observatoire |
| **V1** | Outils L1 · 3 simus · embeds fiche · piliers · partenaires pages light | Carte prix |
| **V2** | Frais acquisition · landings zone + · diligence surfaces | — |
| **V3** | Shells proprio/client · guides C | — |
| **V4** | `/diaspora/*` pack | — |
| **V5** | Estimation push | — |
| **V6** | Prêt-à-bâtir · checklists AC | — |
| **V7** | Carte prix · Observatoire | Avant L4 GER |

---

## 12. Espaces app — IA agent (rappel)

```
/espace/agent
├── (home)           SLA / overdue
├── leads/
├── mandats/[id]
├── annonces/ | nouveau | [id]
├── dossiers/[id]    V1–2
├── documents/
├── partenaires/     V1
├── taches/
└── profil/
```

Publish UI doit exposer **gate papier** avant bouton Publier (US-V0-12).

---

## 13. Validation IA (méthode)

| Méthode | Quand | Succès |
| --- | --- | --- |
| **Card sort** (fermé) | Avant Figma HF | Labels L1 ≥80 % accord parcours |
| **Tree test** | Proto `17` | Tâches : « trouver terrain TF Almadies », « simu construction », « contact gestion » ≥70 % direct |
| **5-second test** home | Design | Marque + parcours identifiés |
| **Crawl audit** | Pre-prod | 0 orpheline indexable · canonicals OK |
| **Parcours mobile** | Recette R* | Sticky WA · filtres papier accessibles |

Cartes sort suggérées (extrait ValidateThat adapté SN) : Acheter, Louer, Gérer, Diaspora, Outils, Guides, Terrains, Maisons, TF, Bail, Délibération, Mensualité étalé, Construction, Estimation, Contact, Espace proprio…

---

## 14. Anti-patterns (normatifs)

| Anti | Sanction IA |
| --- | --- |
| Nav « Annonces » générique | Rejet review |
| Outils footer-only après V1 | Bloque Done V1 |
| Fiche sans pastille papier vente | Bloque publish |
| Dupliquer blog/guides sans 301 | Bloque SEO |
| Observatoire avant L4 | Bloque com |
| Doorway zones clones | noindex / ne pas créer |
| Portail agent avec nav Acheter | Rejet UX |
| Calculatrice « prêt bancaire » en L1 | Interdit |

---

## 15. Matrice template → schema → wire

| Template | Schema (`08`) | Wire IDs |
| --- | --- | --- |
| Home | WebSite + org | W-HOME |
| Catalogue | ItemList soft | W-ACH-* W-LOU-* |
| Fiche | RealEstateListing + Offer + Breadcrumb | W-ACH-FICHE |
| Landing zone | Place / WebPage + FAQ | W-ACH-ZONE |
| Guide | Article + FAQ | W-GUI-* |
| Outil | WebApplication / HowTo soft | W-OUT-* |
| Agence | RealEstateAgent | W-AGE-* |
| App | — noindex | W-AGT-* |

---

## 16. Changelog vs `01`

| Ajout dans `13` | Motif |
| --- | --- |
| Décisions URL verrouillées | Trancher avant code |
| Registre URL exhaustif + index flags | CdCF / eng |
| Taxonomies + dictionnaire labels | Éviter drift copy |
| Templates blocs décisionnels fiche | Bench 2026 |
| Shells auth détaillés | Align `09` |
| Facets / canonical matrix | Align `08` |
| Plan validation card sort / tree test | Qualité IA |
| Primauté `13` sur `01` si conflit | Gouvernance doc |

`01` conserve rôle **onboarding rapide** ; lien croisé obligatoire en tête de `01` (déjà aval → `13`).

---

## 17. Sources

| Source | Apport |
| --- | --- |
| Docs site `01`–`12`, `05`, `08`, `09` | Données EverGreen |
| Foundey PropTech UX 2026 | Split personas / spaces · decision listing |
| Onething RE app UX | Hierarchy confiance · evaluation |
| WPResidence / DiverseKit | Ordre blocs fiche · sticky CTA mobile |
| ValidateThat RE IA template | Journey-first · card sort · tools placement |
| Marketing `15` SEO | Clusters (ne pas dupliquer ici) |

---

## 18. Liens

| Doc | Rôle |
| --- | --- |
| [`01-sitemap-et-ia.md`](./01-sitemap-et-ia.md) | Résumé exécutif |
| [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) | Écrans |
| [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) | Champs / badges |
| [`08-seo-technique.md`](./08-seo-technique.md) | Schema / sitemaps tech |
| [`09-back-office-agents.md`](./09-back-office-agents.md) | Modules BO |
| [`15-wireframes.md`](./15-wireframes.md) | Schémas B&W (à forger) |

---

*IA & sitemap complet EverGreen Site v1.0 — sept. 2026. Journey-first · papiers first-class · fiche décisionnelle · registre URL · shells auth séparés · observatoire L4 only.*
