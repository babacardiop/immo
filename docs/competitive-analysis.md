# Competitive analysis — Senegal real estate

Goal: build a modern, map-first, SEO-strong platform (EverGreen UI) that beats local classifieds and niche portals on discovery and trust.

## Competitors overview

| Competitor | URL | Positioning | Strengths | Weaknesses |
| --- | --- | --- | --- | --- |
| **Expat-Dakar** | [expat-dakar.com/terrains-a-vendre](https://www.expat-dakar.com/terrains-a-vendre) | General classifieds (cars, jobs, immo…) | High traffic, large inventory (~445 terrains), WhatsApp/phone CTAs, VIP boosts | Ad-heavy, dated list UX, no map, immo diluted in marketplace noise |
| **CoinAfrique SN** | [sn.coinafrique.com/categorie/immobilier](https://sn.coinafrique.com/categorie/immobilier) | Multi-category marketplace | Volume, city filters, TOP/PRO badges, favorites | Same classified pattern, no map, UI not immo-specialized |
| **Immobilier au Sénégal** | [immobilier-au-senegal.com](https://immobilier-au-senegal.com/) | Niche agency portal | Clear Acheter/Louer IA, WhatsApp widget, Petite Côte focus (Saly, Mbour, Somone) | WordPress template look, thin filters, spam/junk content risk, no map |
| **Senhectare** | [senhectare.com](https://senhectare.com/) | Rural / agricultural land specialist | **Has a map (Leaflet + OSM)**, dossier numbers, paper type (acte/délibération), price/ha & m², cadastral services | Niche only (hectares/vergers), aggressive newsletter popup, spam footer SEO links, dated card UI, weak urban coverage |

## Feature matrix

| Capability | Expat-Dakar | CoinAfrique | Immo au Sénégal | Senhectare | **Us (target)** |
| --- | --- | --- | --- | --- | --- |
| Modern product UI | ✗ | ✗ | ✗ | △ | **✓ EverGreen** |
| Interactive map search | ✗ | ✗ | ✗ | ✓ (basic) | **✓ map ↔ list sync** |
| Urban + coastal inventory | ✓ | ✓ | ✓ | ✗ (rural) | **✓** |
| Terrains agricoles / hectares | △ | △ | △ | ✓ | **✓** |
| Titre foncier / acte / délibération | △ | △ | △ | ✓ | **✓ first-class filters** |
| Price / m² or / ha | △ | ✗ | ✗ | ✓ | **✓** |
| WhatsApp contact | ✓ | ✓ | ✓ | ✓ | **✓ one-tap** |
| SEO landing pages | ✓ | ✓ | △ | △ | **✓ Next.js SSR** |
| Saved search / alerts | △ | △ | ✗ | △ newsletter | **✓** |
| Trust / verification | △ | safety tip | ✗ | “Protégé” labels | **✓ verified agents + docs** |
| Payment plans UX | ✗ | ✗ | banners only | ✗ | **✓ clean product feature** |
| Outright sale (all types) | ✓ | ✓ | ✓ | △ rural | **✓ terrains + maisons + apparts** |

## Competitor deep dives

### Expat-Dakar
- Model: everything marketplace → immo is one vertical among many.
- Listing UX: vertical list, VIP badges, phone / WhatsApp / chat per row.
- Filters: category, city counts (Dakar, Thiès…), sort by price/date.
- Opportunity: feel like a **dedicated real-estate product**, not another annonces board.

### CoinAfrique
- Same marketplace DNA; strong Dakar rental volume.
- Filters exist (ville, pièces, vente/location) but discovery stays list-only.
- Opportunity: **spatial search** + cleaner cards beat “scroll until tired.”

### Immobilier au Sénégal
- Agency-style site with hero + basic search (lieu, type, vente/location).
- Good Petite Côte content angle; weak product craft and SEO hygiene (spam FAQ/casino links observed).
- Opportunity: professional trust + map + structured data without template clutter.

### Senhectare — closest feature peer on maps
- Hero is a **full-bleed Leaflet map** (OpenStreetMap) — validates that map-first works in Senegal.
- Strong rural domain model:
  - Categories: terrain agricole, verger, ferme, grande surface
  - Metadata: papier (acte de cession / délibération), numéro dossier, région
  - Pricing: FCFA/m² and FCFA/hectare
  - Services: délimitation & extrait plan cadastral
- Gaps vs our product:
  - Not positioned for apartments/villas/urban Dakar
  - Map appears exploratory more than **synced filtered list + draw area**
  - Design and spam/SEO junk hurt trust
  - Aggressive subscribe modal blocks first impression

**Takeaway:** copy Senhectare’s *domain seriousness* (paper type, dossier, €/m²) for terrains — then beat them with EverGreen UI, urban+coastal inventory, and a tighter map↔list experience. Don’t cede agricultural land entirely; own **all property types** with rural filters included.

## Our differentiation (product thesis)

1. **Full catalog** — vente classique de **terrains, maisons, appartements** + étalé + location-vente + location (see `docs/positioning.md`).
2. **Map-first discovery** — pins on Dakar / Petite Côte / régions; list sync; draw-to-search; “near me.”
3. **Senegal-native listing model** — m²/ha, titre foncier vs bail, viabilisé, angle, distance mer + **simulateur de mensualités**.
4. **Premium UI** — EverGreen design language; mobile-first; low ad noise.
5. **SEO moat** — Next.js SSR for city × type × mode queries.
6. **Trust** — we publish ads (mandat), verified titles, WhatsApp one-tap.
7. **Immo-only** — not cars/jobs/phones.

## Risks

| Risk | Mitigation |
| --- | --- |
| Competitors have inventory volume | Seed with agents/promoters; easy publish flow; import partnerships |
| Senhectare already has a map | Ship superior map UX + broader inventory + design |
| WhatsApp is the real CRM | Keep one-tap WhatsApp; don’t hide phone behind signup walls early |
| Spam/scam erodes trust | Verification badges, report flow, paper-type transparency |

## v1 feature priorities (from this analysis)

1. Landing (EverGreen) + SEO shell  
2. Property list + detail (SSR)  
3. **Map search with list sync** (Leaflet or Mapbox)  
4. Core filters: type, vente/location, city, price, surface, paper type  
5. WhatsApp CTA on every listing  
6. Agent publish (basic)  

Later: saved searches, payment plans, cadastral/PDF attach, compare, alerts.

## Sources

- [Expat-Dakar — Terrains](https://www.expat-dakar.com/terrains-a-vendre)
- [CoinAfrique — Immobilier SN](https://sn.coinafrique.com/categorie/immobilier)
- [Immobilier au Sénégal](https://immobilier-au-senegal.com/)
- [Senhectare](https://senhectare.com/)
