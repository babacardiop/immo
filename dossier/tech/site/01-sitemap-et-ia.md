# Sitemap & architecture d’information — Hub EverGreen

**Document :** Dossier · Tech · Site · 01  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`../../../docs/positioning.md`](../../../docs/positioning.md) · [`../../../docs/hub-roadmap.md`](../../../docs/hub-roadmap.md) · [`../../../docs/tech-stack.md`](../../../docs/tech-stack.md) · [`../../../docs/blog/strategie.md`](../../../docs/blog/strategie.md) · [`../research-lab/04-outils-publics.md`](../research-lab/04-outils-publics.md) · [`../../00-synthese/05-fiches-personas.md`](../../00-synthese/05-fiches-personas.md)  
**Aval :** [`02-parcours-utilisateurs.md`](./02-parcours-utilisateurs.md) · [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) · [`13-sitemap-architecture-information.md`](./13-sitemap-architecture-information.md) (IA formelle élargie) · [`08-seo-technique.md`](./08-seo-technique.md)

> **Rôle :** arborescence **pages publiques + espaces authentifiés** du hub (accueil, vente, location, gestion, diaspora, blog, outils).  
> Journeys détaillés → `02`. Inventaire écrans wire → `03`. SEO technique / schema → `08`.

**Stack URL :** Next.js App Router · slugs **FR** · SSR fiches · pas un miroir Expat.

---

## 0. Principes d’IA

| # | Principe | Implication |
| ---: | --- | --- |
| 1 | **Agence ≠ classifieds** | Nav = parcours métier (acheter / louer / gérer) + confiance — pas « toutes catégories » |
| 2 | **≤ 7 items nav primaire** | Sticky mobile · libellés courts |
| 3 | **Money pages ≤ 3 clics** | Fiche bien, `/outils`, contact WA |
| 4 | **Papiers first-class** | Filtre TF / bail / délibération partout catalogue vente |
| 5 | **Map ↔ liste** | Découverte spatiale (diff vs Expat/CoinAfrique) |
| 6 | **CTA unique dominant** | WA / RDV / simu — pas 6 boutons |
| 7 | **Diaspora visible** | Entrée nav ou hub dédié (Fatou P0) — pas enterré footer |
| 8 | **Outils = produit** | `/outils` en nav dès Vague 1 |
| 9 | **Blog = aide à la décision** | Maillage guide → outil → fiche / partenaire |
| 10 | **Phaser** | V0 catalogue+confiance · V1 outils · V3 portails · V4 diaspora pack |

Bench agences / portails 2025–26 : sticky nav 2 niveaux · fil d’Ariane fiche · sitemaps XML **segmentés** (vente / location / éditorial) · pages secteurs locales · NAP cohérent.

---

## 1. Navigation primaire (cible)

```
[ Logo EverGreen ]
  Acheter · Louer · Gérer · Diaspora · Outils · Guides · Agence
                         [ Recherche ]  [ WA ]  [ Espace ]
```

| Item | URL racine | Job | Vague |
| --- | --- | --- | :---: |
| **Acheter** | `/acheter` | Catalogue vente + étalé / loc-vente | **V0** |
| **Louer** | `/louer` | Catalogue location | **V0** |
| **Gérer** | `/gerer` | Offre gestion + lead bailleur | **V0** landing · **V3** portails |
| **Diaspora** | `/diaspora` | Hub confiance + packs | Soft V0 · **V4** pack |
| **Outils** | `/outils` | Calculateurs / checklists | **V1** |
| **Guides** | `/guides` | Blog / hub décision | **V0** teaser · cadence M1+ |
| **Agence** | `/agence` | Qui / comment / contact | **V0** |

**Mobile :** même ordre · « Espace » (connexion) + FAB WhatsApp.  
**Secondaire (mega / footer) :** Estimation vendeur · Contact · Mentions · Zones.

**Alias SEO :** `/blog` → même contenu que `/guides` (canonical `/guides/...` ou inverse — figer en `08`).

---

## 2. Arborescence complète (cibles URL)

```
/
├── acheter/                          ← hub vente
│   ├── ?type=&papier=&zone=&prix=    ← search (query)
│   ├── carte/                        ← map-first (V0–1)
│   ├── terrains/
│   ├── maisons/
│   ├── appartements/
│   ├── [zone]/                         ← landings SEO (ex. almadies, bambilor)
│   └── [slug]/                         ← fiche bien vente
├── louer/
│   ├── ?type=&meuble=&zone=&loyer=
│   ├── carte/
│   ├── appartements/ | maisons/ | bureaux/   (bureaux = plus tard)
│   ├── [zone]/
│   └── [slug]/
├── gerer/                            ← landing gestion
│   └── demande/                      ← form lead bailleur
├── diaspora/
│   ├── securiser/                    ← narrative + checklists
│   ├── inspection/                   ← V4
│   └── procuration/                  ← V4
├── outils/
│   ├── mensualite/
│   ├── construction/   (alias: /outils/construire)
│   ├── budget-total/
│   ├── estimation/
│   ├── frais-acquisition/
│   ├── pret-a-batir/
│   ├── carte-prix/                   ← L2+ / V7
│   └── checklists/
│       └── [slug]/
├── guides/                           ← hub éditorial
│   ├── securiser/ | terrains-construction/ | louer-gerer/ | diaspora/ | argent/
│   └── [slug]/
├── blog/                             ← alias / redirect → guides
├── observatoire/                     ← L4 lab (trim.)
├── agence/
│   ├── comment-on-travaille/
│   ├── equipe/                       ← option
│   └── contact/
├── estimation/                       ← shortcut → /outils/estimation (+ vendeur)
├── partenaires/                      ← pages légères P1+ (BTP, notaire…)
│   └── [slug]/
├── espace/                           ← auth
│   ├── connexion/
│   ├── proprio/                      ← V3
│   ├── client/                       ← locataire / acquéreur V3+
│   └── agent/                        ← back-office V0 minimal
├── legal/
│   ├── mentions-legales/
│   ├── confidentialite/
│   ├── cookies/
│   └── cgu/
└── 404 /
```

**Fiche bien (canon) :** une URL stable `/acheter/[slug]` ou `/louer/[slug]` selon nature — **pas** de double indexation. Redirect 301 si passage vente→loué/vendu vers page statut ou retrait sitemap.

Alternative technique (équivalente) : `/biens/[slug]` + `transaction=vente|location` — si choisie, landings SEO restent `/acheter/...` / `/louer/...`. **Décision V0 :** préférer **préfixe métier** dans l’URL (clarité IA + SEO « acheter terrain Dakar »).

---

## 3. Pages clés — job & contenu

### 3.1 Accueil `/`

| Zone | Contenu (1 composition) | Anti |
| --- | --- | --- |
| Hero | Marque + 1 promesse + recherche (lieu / acheter|louer) + visuel plein | Dashboard stats, pills |
| Suite | 3 parcours (Acheter · Louer · Gérer) · biens phares · preuve papiers · CTA WA | Cards décoratives sans CTA |

Promesse alignée marque : *Avant de payer, on vérifie. Ensuite on gère.*

### 3.2 Acheter `/acheter`

- Filtres : type (terrain/maison/appart) · **papier** · zone · prix · surface · étalé oui/non  
- Toggle **Liste | Carte**  
- Pastilles TF / bail / délibération (disclaimer délibération)  
- Embed soft : simu mensualité / construction sur fiches **terrain** (V1)

### 3.3 Louer `/louer`

- Filtres : type · meublé · loyer · zone · pièces  
- CTA visite / dossier · lien guides caution (V3)

### 3.4 Gérer `/gerer`

- Landing offre (loyers, quittances, reporting)  
- Personas Ousmane / Ibrahima  
- Form `/gerer/demande` → CRM  
- Lien « Espace proprio » quand V3 live

### 3.5 Diaspora `/diaspora`

- Hub : risques · séquestre · « pas Wave vendeur » · inspection · POA  
- CTA Pack Secure / WA conseiller FR timezone  
- Maillage guides hub D + outils estimation

### 3.6 Outils `/outils`

Hub SEO listant PUB-01→07 + checklists (`research-lab/04`).  
Chaque outil = page dédiée + résultat ungated + CTA in-result.

### 3.7 Guides `/guides`

5 hubs éditoriaux (`blog/strategie`) :

| Hub | Path | Intention |
| --- | --- | --- |
| A Sécuriser | `/guides/securiser/` | TF, arnaques, notaire |
| B Terrains & construction | `/guides/terrains-construction/` | Coût m², budget, AC |
| C Louer & gérer | `/guides/louer-gerer/` | Bail, caution, proprio |
| D Diaspora | `/guides/diaspora/` | Acheter à distance |
| E Argent | `/guides/argent/` | Mensualités, frais |

Article : `/guides/[slug]` · CTA `<SimulatorEmbed />` · date MAJ.

### 3.8 Agence `/agence`

- Différence vs classifieds · process mandat · horaires · NAP Dakar  
- `/agence/comment-on-travaille` (V0)  
- `/agence/contact` — form + WA + carte

### 3.9 Observatoire `/observatoire` (L4)

- Trim. indices agrégés · méthodo · **pas** catalogue concurrent  
- CTA carte prix / estimation

---

## 4. Espaces authentifiés (hors nav marketing)

| Espace | Path | Vague | Qui |
| --- | --- | :---: | --- |
| Agent | `/espace/agent` | **V0** CRUD annonces | Agents |
| Proprio | `/espace/proprio` | **V3** | Bailleurs sous mandat gestion |
| Client | `/espace/client` | **V3+** | Locataire · acquéreur étalé |

Détail droits → `14-matrice-droits-roles.md` · back-office → `09`.

---

## 5. Phasage sitemap ↔ vagues

| Vague | Pages **à ship** | Pas encore |
| --- | --- | --- |
| **V0** | `/` · `/acheter` · `/louer` · fiches · `/gerer` landing · `/agence/*` · `/guides` teaser (2) · `/espace/agent` min · legal | Outils complets · portails L/P · observatoire |
| **V1** | `/outils` + mensualité · construction · budget-total · embeds fiche terrain · piliers M1 | Carte prix · comparateur |
| **V2** | `/outils/frais-acquisition` · diligence CTA · landings zones clés · piliers arnaques | — |
| **V3** | `/espace/proprio` · `/espace/client` · guides location | — |
| **V4** | `/diaspora/*` pack · inspection · multi-devise soft | — |
| **V5** | `/outils/estimation` push · pages gros tickets | — |
| **V6** | `/outils/pret-a-batir` · checklist AC | — |
| **V7** | `/outils/carte-prix` · `/observatoire` | — |
| **V8+** | Expansion sélective | Marketplace matériaux… |

---

## 6. Modèle de page (templates)

| Template | Exemples | Composants clés |
| --- | --- | --- |
| **Home** | `/` | Hero brand · search · parcours |
| **Catalogue** | `/acheter`, `/louer` | Filtres · list/map · cards |
| **Fiche bien** | `/acheter/[slug]` | Galerie · prix · **papiers** · carte · CTA WA · simus embed |
| **Landing SEO zone** | `/acheter/almadies` | Intro · listings filtrés · guide lié |
| **Hub métier** | `/gerer`, `/diaspora` | Promesse · preuves · form |
| **Outil** | `/outils/*` | Inputs · résultat · CTA · disclaimer |
| **Guide** | `/guides/[slug]` | TOC · checklist · FAQ JSON-LD · embeds |
| **Institutionnel** | `/agence/*` | NAP · process · contact |
| **App shell** | `/espace/*` | Nav app · pas marketing chrome lourd |

**Fil d’Ariane (fiche) :** Accueil › Acheter › Terrains › Almadies › [Titre]

---

## 7. Priorités XML sitemap (tech)

Segmenter (`08` détaillera) :

| Fichier | Contenu | Priority esprit | Changefreq |
| --- | --- | --- | --- |
| `sitemap-static.xml` | Home, hubs, agence, legal | 0,8–1,0 | monthly |
| `sitemap-acheter.xml` | Fiches + landings vente | 0,8 | daily |
| `sitemap-louer.xml` | Fiches location | 0,8 | daily |
| `sitemap-guides.xml` | Articles | 0,6 | weekly |
| `sitemap-outils.xml` | Calculateurs | 0,7 | monthly |

Règles : URL **200** only · retirer vendu/loué · canonical unique · images à part si volume.

Page HTML `/plan-du-site` (option V2) : aide users + audit interne stock.

---

## 8. Maillage interne (règles)

| Depuis | Vers |
| --- | --- |
| Fiche terrain | Outils mensualité + construction · checklist papiers · guide TF |
| Guide | 1 outil · 1–2 fiches ex. · 1 partenaire |
| Outil résultat | WA · catalogue filtré · guide lié |
| Diaspora | Guides D · `/gerer` · séquestre narrative |
| Home | 3 parcours · 1 preuve · WA |

**Orphelines interdites :** toute fiche indexable ≥ 1 lien depuis catalogue ou zone.

---

## 9. Mapping personas → entrées

| Persona | Entrée principale | Secondaire |
| --- | --- | --- |
| **Mamadou** | `/acheter` terrains · `/outils/construction` | Guides B |
| **Fatou** | `/diaspora` · `/acheter` TF | `/gerer` · guides D |
| **Ousmane / Ibrahima** | `/gerer` | `/espace/proprio` |
| **Marième** | `/outils/estimation` · `/agence/contact` | — |
| **Aïssatou** | `/louer` | Guides C · upsell accession |
| **Jean-Pierre** | `/louer` standing | — |

---

## 10. Anti-patterns IA

| Anti | Pourquoi |
| --- | --- |
| Nav « Annonces » générique type marketplace | Dilue positionnement agence |
| Outils cachés footer | Tue Vague 1 SEO/conversion |
| Diaspora seulement en article blog | Fatou P0 sans porte d’entrée |
| Fiche sans type papier | Contredit promesse confiance |
| Mega-menu 20 liens | Paralysie mobile |
| Dupliquer `/blog/x` et `/guides/x` sans canonical | Dilution SEO |
| Publier `/observatoire` avant L4 | Crédibilité brûlée |
| Portail agent = site public chrome | Confusion marque |

---

## 11. Décisions ouvertes (trancher avant code V0)

| Sujet | Option A | Option B | Recommandation |
| --- | --- | --- | --- |
| URL fiche | `/acheter/[slug]` | `/biens/[slug]` | **A** (métier dans path) |
| Guides path | `/guides` canon | `/blog` canon | **`/guides`** · `/blog` redirect |
| Carte | `/acheter/carte` | Toggle sur `/acheter` | **Toggle** + URL `?view=map` |
| Estimation | Nav « Vendre » | Sous Outils + shortcut | Shortcut `/estimation` → outils |

---

## 12. Liens

| Doc | Rôle |
| --- | --- |
| [`02-parcours-utilisateurs.md`](./02-parcours-utilisateurs.md) | Journeys (suivant) |
| [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) | Champs · badges · filtres |
| [`06-outils-embarques.md`](./06-outils-embarques.md) | Embeds fiches |
| [`10-roadmap-features.md`](./10-roadmap-features.md) | Features ↔ vagues |
| [`../research-lab/07-roadmap-lab.md`](../research-lab/07-roadmap-lab.md) | Observatoire timing |
| [`../../../docs/social-share-cards.md`](../../../docs/social-share-cards.md) | OG fiches / guides |

---

## 13. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| Sitemaps XML immo | Segmenter vente / location / éditorial · maj fréquente fiches · 200 only |
| SEO technique agences | Money pages peu profondes · maillage secteurs · NAP · perf mobile |
| UX portails annonces | Sticky nav · fil d’Ariane · filtres dynamiques · libellés Achat/Location clairs |
| Concurrent SN | Immo-au-SN = Acheter/Louer clair · Senhectare = map-first · EverGreen = les deux + papiers + outils |

---

*Sitemap & IA EverGreen Site v1.0 — sept. 2026. Nav métier ≤7 · papiers first-class · outils en Vague 1 · observatoire en L4.*
