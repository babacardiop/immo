# Catalogue annonces — Champs, badges papiers, filtres

**Document :** Dossier · Tech · Site · 05  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-sitemap-et-ia.md`](./01-sitemap-et-ia.md) · [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) · [`../../../docs/positioning.md`](../../../docs/positioning.md) · [`../../marketing/01-brand-guidelines.md`](../../marketing/01-brand-guidelines.md) · [`../../etude-de-marche/07-glossaire-foncier.md`](../../etude-de-marche/07-glossaire-foncier.md) · [`../../../docs/competitive-analysis.md`](../../../docs/competitive-analysis.md)  
**Aval :** [`09-back-office-agents.md`](./09-back-office-agents.md) · Prisma schema · `ListingCard` / `PaperBadge` · SEO `08`

> **Rôle :** modèle de données **listing curated** + règles d’affichage (pastilles) + filtres catalogue.  
> Pas d’open posting vendeur — **agent only** (`positioning`).

---

## 0. Principes catalogue

| # | Principe | Implication |
| ---: | --- | --- |
| 1 | **Agence publie** | Mandat → contrôle → mise en ligne |
| 2 | **Papier first-class** | Champ obligatoire vente · filtre · pastille above-the-fold |
| 3 | **Délibération ≠ TF** | Disclaimer canon · jamais badge « TF » |
| 4 | **Sans papier / douteux** | **Non publié** vente classique |
| 5 | **FCFA partout** | Prix + `/m²` ou `/ha` calculés |
| 6 | **Map ↔ liste** | Geo utilisable (point ou zone) |
| 7 | **Completeness &gt; volume** | Mieux 30 fiches propres que 300 floues |
| 8 | **Structured &gt; prose** | Champs pour filtres / Schema.org / futurs indices lab |

Bench SN : Senhectare = sérieux domaine (papier, dossier, €/m²) ; Expat = volume sans confiance. EverGreen = **Senhectare-domain × urban full catalog × UI**.

---

## 1. Entité `Listing` — champs

### 1.1 Identité & statut

| Champ | Type | Req. publish | Notes |
| --- | --- | :---: | --- |
| `id` | uuid | ● | Interne |
| `slug` | string | ● | URL `/acheter|louer/[slug]` |
| `reference` | string | ● | Ref agence visible (ex. EG-T-042) |
| `status` | enum | ● | `draft` · `published` · `reserved` · `sold` · `rented` · `archived` |
| `transaction` | enum | ● | `sale` · `rent` · `rent_to_own` · `installment_sale` |
| `property_type` | enum | ● | `land` · `house` · `apartment` · `office` (office = plus tard) |
| `title` | string | ● | ≤ 80 car. SEO |
| `description` | text | ● | Markdown soft · pas claims TF magiques |
| `published_at` | datetime | ● si live | |
| `updated_at` | datetime | ● | Freshness |
| `agent_id` | fk | ● | Owner mandat |
| `mandate_type` | enum | ● | `exclusive` · `simple` |
| `mandate_ref` | string | ○ | N° registre |

### 1.2 Papiers & confiance (cœur SN)

| Champ | Type | Req. | Notes |
| --- | --- | :---: | --- |
| **`paper_type`** | enum | **● vente** | `tf` · `bail_emphyteotique` · `bail_ordinaire` · `deliberation` · `other` |
| `paper_label` | string | ○ | Affichage court dérivé |
| `paper_verified_level` | enum | ● | `declared` · `docs_on_file` · `diligence_done` |
| `nicad` | string | ○ | 16 car. si connu — **ne pas inventer** |
| `edr_date` | date | ○ | Si EDR en dossier |
| `dossier_number` | string | ○ | Style Senhectare |
| `title_notes` | text | ○ | Interne / agent |
| `deliberation_disclaimer_ack` | bool | ● si délib. | Agent a coché disclaimer |

**Publish gate vente :**

| `paper_type` | Publier ? | Condition |
| --- | :---: | --- |
| `tf` | ● | Pièces ou `declared` + note réserve EDR |
| `bail_*` | ● | Si inscrit / pièces · disclaimer bail |
| `deliberation` | ● **avec** disclaimer fort | Jamais présenté comme TF · orientation régularisation |
| `other` / vide | ✕ | Bloquer publish |
| Doute documentaire | ✕ | `draft` jusqu’à clarification |

Location : `paper_type` du bailleur **optionnel** V0 · recommandé si terrain nu loué rare.

### 1.3 Prix & surfaces

| Champ | Type | Req. | Notes |
| --- | --- | :---: | --- |
| `price_fcfa` | int | ● | Prix vente **ou** loyer mensuel |
| `price_period` | enum | ● si rent | `month` (défaut) |
| `currency` | enum | ● | `XOF` only Y1 |
| `area_m2` | decimal | ● bâti / terrain | Surface utile / terrain |
| `area_ha` | decimal | ○ | Terrains grands · dérivable |
| `price_per_m2` | computed | ○ | `price / area_m2` |
| `price_per_ha` | computed | ○ | Terrains |
| `charges_fcfa` | int | ○ | Location |
| `deposit_months` | decimal | ○ | Caution |
| `installment_months` | int | ○ | Étalé 12–36 typ. |
| `installment_down_fcfa` | int | ○ | Apport |
| `negotiable` | bool | ○ | Afficher soft |

### 1.4 Localisation

| Champ | Type | Req. | Notes |
| --- | --- | :---: | --- |
| `city` | enum/string | ● | Dakar, Thiès… |
| `quartier_id` | fk thesaurus | ● | Aligné lab DS-F01 |
| `quartier_label` | string | ● | Affichage |
| `address_public` | string | ○ | Approximative OK |
| `geo_lat` / `geo_lng` | float | ○→● | Point carte · flouter si besoin |
| `geo_precision` | enum | ● | `exact` · `approx` · `zone` |
| `distance_sea_km` | decimal | ○ | Côte |
| `zone_risk_flags` | string[] | ○ | `flood` · `dscos_watch` · … (soft V2) |

### 1.5 Caractéristiques

| Champ | Applicable | Notes |
| --- | --- | --- |
| `rooms` / `bedrooms` / `bathrooms` | house, apt | |
| `floor` / `floors_total` | apt | |
| `furnished` | rent | `yes` · `no` · `partial` |
| `year_built` | bâti | ○ |
| `condition` | bâti | `new` · `good` · `to_renovate` |
| `amenities` | string[] | parking, clim, groupe, piscine, titre… |
| `land_viabilise` | land | eau / élec / voie — bools ou enum |
| `land_use` | land | `residential` · `agricole` · `mixed` |
| `facing` / `angle` | land | Soft |

### 1.6 Média & contact

| Champ | Req. | Notes |
| --- | :---: | --- |
| `photos[]` | ≥ 3 publish | Ordre · cover · alt |
| `video_url` | ○ | |
| `plan_url` | ○ | |
| `wa_phone` | ● | Numéro Business ou agent routé |
| `show_phone` | bool | Défaut false → WA first |

### 1.7 SEO & lab

| Champ | Notes |
| --- | --- |
| `meta_title` / `meta_description` | Auto + override |
| `canonical_path` | `/acheter|louer/slug` |
| `lab_property_entity_id` | Lien soft L2+ (interne) |

---

## 2. Badges & pastilles

### 2.1 Pastille papier (obligatoire vente)

Aligné Brand Book §5 :

| `paper_type` | Label UI | Couleur esprit | Disclaimer |
| --- | --- | --- | --- |
| `tf` | **Titre foncier** | Vert sage / success | Court : vérif EDR recommandée |
| `bail_emphyteotique` | **Bail emphytéotique** | Bleu / info | Bail ≠ TF |
| `bail_ordinaire` | **Bail** | Bleu / info | Idem |
| `deliberation` | **Délibération** | Ambre / warning | **Long canon** Brand §5 |

**Placement :** card (coin) · fiche **above the fold près du prix** · filtre chips.  
**Interdit :** badge « Vérifié TF » si seulement `declared` · confondre couleurs TF / délibération.

### 2.2 Autres badges (max 2–3 hors papier)

| Badge | Condition | Priorité |
| --- | --- | :---: |
| `Étalé` | `transaction = installment_sale` | P0 |
| `Loc-vente` | `rent_to_own` | P0 |
| `Exclusif` | `mandate_type = exclusive` | P1 |
| `Viabilisé` | flags viab. OK | P1 |
| `Meublé` | location | P0 |
| `Docs en dossier` | `paper_verified_level ≥ docs_on_file` | P1 |
| `Diligence faite` | `diligence_done` | P2 (V2) |

**Anti :** VIP / TOP / PRO type CoinAfrique · « Protégé » creux · overload promo.

### 2.3 Copy disclaimer délibération (canon — rappel)

> *Statut déclaré : **délibération**. Ce n’est **pas** un titre foncier. …*  
> (texte complet Brand Book §5 — ne pas réécrire ici)

Afficher : fiche (bandeau) · modal 1ʳᵉ visite si filtre délib. · PDF checklist.

---

## 3. Filtres catalogue

### 3.1 Acheter `/acheter` (P0)

| Filtre | UI | Valeurs |
| --- | --- | --- |
| **Type** | chips / select | terrain · maison · appartement |
| **Papier** | chips **required UX** | TF · Bail · Délibération · Tous |
| Zone / quartier | search + list | thesaurus |
| Prix min–max | range FCFA | |
| Surface m² | range | |
| Étalé | toggle | oui / non |
| Loc-vente | toggle | |
| Ville | select | Dakar, … |
| Viabilisé | toggle soft | P1 |
| Tri | select | récent · prix ↑↓ · surface · `/m²` |

**Défaut UX :** type = tous · papier = tous · tri = récent.  
**Empty state :** suggérer élargir papier / zone · CTA WA.

### 3.2 Louer `/louer` (P0)

| Filtre | Valeurs |
| --- | --- |
| Type | appart · maison |
| Loyer min–max | FCFA / mois |
| Pièces / chambres | |
| Meublé | oui / non / tous |
| Zone | |
| Tri | récent · loyer · surface |

### 3.3 Carte

- Markers filtrés = même query string que liste  
- Preview card au tap : photo · prix · **pastille papier** · WA  
- Pas de pin = annonce concurrente  

### 3.4 Query string (canon)

```
/acheter?type=land&paper=tf&zone=almadies&price_max=25000000&view=list
/louer?type=apartment&furnished=1&rooms_min=2&view=map
```

Partageable · SEO landings = paths `/acheter/terrains` + query.

---

## 4. Affichage card vs fiche

### 4.1 `ListingCard` (liste / home)

| Élément | Obligatoire |
| --- | :---: |
| Cover photo | ● |
| Prix FCFA | ● |
| Pastille papier (vente) | ● |
| Type + zone | ● |
| m² (+ pièces si bâti) | ● |
| Badge étalé / meublé | si applicable |
| `/m²` soft | ○ terrains |

### 4.2 Fiche détail

Ordre contenu (wire `03`) :

1. Galerie  
2. Prix + pastille + badges  
3. Titre · ref · m² · zone  
4. CTA sticky WA  
5. Description  
6. **Bloc papiers** (type · NICAD si dispo · disclaimer · niveau vérif)  
7. Caractéristiques / viab.  
8. Mini-carte  
9. Embeds simu (terrain V1)  
10. Similaires  

---

## 5. Formulaire agent — validation publish

Checklist back-office (`W-AGT-NEW`) :

- [ ] `transaction` + `property_type`  
- [ ] `title` · `description` · `price_fcfa` · `area_m2`  
- [ ] `paper_type` (vente) + disclaimer coché si délib.  
- [ ] `quartier` · geo au moins `approx`  
- [ ] ≥ 3 photos  
- [ ] `wa_phone` / routage  
- [ ] Pas de wording interdit (« délibération = TF », « TeleDAc 48 h »)  

Bloquer `published` si gate fail — message agent explicite.

---

## 6. Tri & ranking (V0 simple)

| Score soft (option) | Poids esprit |
| --- | --- |
| Exclusif + photos ≥ 5 | ↑ |
| `docs_on_file` / diligence | ↑ |
| TF &gt; bail &gt; délibération | soft boost confiance (ne pas cacher délib.) |
| Fraîcheur `updated_at` | ↑ |
| Prix aberrant vs strate | flag interne · pas auto-hide V0 |

Pas de pay-for-VIP marketplace.

---

## 7. Mapping Schema.org (cible `08`)

| Listing field | Schema hint |
| --- | --- |
| title | `name` |
| description | `description` |
| price_fcfa + XOF | `offers.price` / `priceCurrency` |
| area_m2 | `floorSize` |
| geo | `geo` |
| photos | `image` |
| address/quartier | `address` |
| rooms | `numberOfRooms` |

Type : `RealEstateListing` / `Accommodation` / `Landform` selon cas — détail SEO technique dans `08`.

---

## 8. États listing & sitemap

| `status` | Visible catalogue | Sitemap XML |
| --- | :---: | :---: |
| `draft` | ✕ | ✕ |
| `published` | ● | ● |
| `reserved` | ● badge « Sous offre » | ○ ou ● |
| `sold` / `rented` | page statut ou 301 | ✕ |
| `archived` | ✕ | ✕ |

---

## 9. KPI qualité catalogue

| KPI | Cible V0–1 |
| --- | ---: |
| % listings vente avec `paper_type` | **100 %** |
| % avec ≥ 3 photos | ≥ 95 % |
| % avec geo utilisable carte | ≥ 80 % |
| % délibération avec disclaimer ack | **100 %** |
| Listings douteux publiés | **0** |
| Temps draft → published | Track |

---

## 10. Phasage champs

| Vague | Ajouts |
| --- | --- |
| **V0** | Champs §1 cœur · pastilles · filtres papier · card/fiche |
| **V1** | Flags pour embeds simu terrain · `installment_*` polish |
| **V2** | `diligence_done` · risk flags DGSCOS soft · NICAD push |
| **V3** | Champs location riches (EDL link) |
| **L2+** | `lab_property_entity_id` · price history interne |

---

## 11. Anti-patterns

| Anti | |
| --- | --- |
| Publier sans papier | Contredit marque |
| Pastille verte sur délibération | Mensonge UX |
| Filtre papier enterré | Diff vs classifieds tuée |
| Prix en € only | Diaspora : FCFA + equiv soft plus tard |
| Self-serve vendeur upload | Open marketplace |
| Badge « Vérifié État » | On n’est pas DGID |
| 12 badges promo | Bruit CoinAfrique |

---

## 12. Liens

| Doc | Rôle |
| --- | --- |
| [`../../marketing/01-brand-guidelines.md`](../../marketing/01-brand-guidelines.md) | Pastilles · disclaimers |
| [`../../etude-de-marche/06-parcours-foncier-securite.md`](../../etude-de-marche/06-parcours-foncier-securite.md) | Diligence métier |
| [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) | W-ACH-* · W-CARD |
| [`09-back-office-agents.md`](./09-back-office-agents.md) | CRUD agent |
| Glossaire | [`07-glossaire-foncier.md`](../../etude-de-marche/07-glossaire-foncier.md) |

---

## 13. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| Listing models / VPR 2026 | Champs structurés identité · geo · prix · trust signals · completeness |
| Concurrent SN | Papier + €/m² (Senhectare) · volume sans map (Expat) → hybrider |
| Schema RealEstateListing | price, floorSize, geo, images pour SSR |

---

*Catalogue annonces EverGreen Site v1.0 — sept. 2026. Papier obligatoire · pastilles Brand · filtres first-class · agent-only publish.*
