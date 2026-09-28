# PropTech opportunity analysis

**Context:** we are first a **classic full-service real estate agency** (transaction + property management / rent collection), amplified by a PropTech site. 100% intermédiaire, **four axes** — (1) vente classique terrains/maisons/appartements, (2) vente étalée terrains TF/bail, (3) location-vente bâti, (4) location **+ gestion locative**. UX moats: **search autocomplete** + **structured installment / rent-to-own**. Design: EverGreen. Stack: Next.js + Node + maps. Canonical positioning: `docs/positioning.md`. Historical Q&A: `docs/first analysis/`.

**Question:** what PropTech capabilities should we add beyond “nice classifieds” — i.e. software that runs the **agency** (not a marketplace)?

---

## 1. North star

Competitors in Senegal mostly sell **inventory lists**. African PropTech winners sell **trust + payment rails + ownership journeys**.

| Layer | Classifieds (Expat / CoinAfrique) | Our PropTech target |
| --- | --- | --- |
| Catalog | Anyone posts | We publish verified TF/bail listings |
| Discovery | Filters + scroll | Autocomplete + map ↔ list |
| Conversion | Call / WhatsApp | Simulate mensualité → reserve → pay Wave/OM |
| Trust | Hope the seller is legit | Title checks, escrow-style flow, dashboards |
| LTV | One lead | Locataire → achat terrain / maison / appart (comptant, étalé ou loc-vente) |

PropTech is not “add AI for buzz.” It is **software that runs the agency**: discovery → visits → contracts → **rent & installment collection** → owner payouts → follow-up.

---

## 2. What peers already prove (web scan)

### Africa — installment & ownership access
| Player | Relevant idea | Source |
| --- | --- | --- |
| [Buildbay](https://www.mybuildbay.com/) | Flexible land plans (daily/weekly/monthly), **auto-debit**, SMS/email payment receipts | Nigeria land PropTech |
| [Sytemap](https://sytemap.com/) | Verified plots, **24-month installments**, buyer dashboard, docs + GPS, diaspora remote buy | Nigeria |
| [Geofort FlexPay](https://geofort.ng/flexpay/) | Deposit + interest-free tenor, allocation after payment milestones | Nigeria |
| [Jawudi](https://jawudi.com/en) | **Escrow** released on verified milestones; title check before listing; diaspora-first | West Africa expansion |
| [Conekta](https://useconekta.com/) | Escrow, e-leases, rent-to-own, owner-only listings | Nigeria housing |
| [Senguka](https://senguka.com/) | MoMo wallet, **land savings toward 30% deposit**, rent-to-own path | Uganda |
| [TrustGaps](https://trustgaps.com/) | Diaspora escrow + inspections + title close | Multi-country |

### Senegal / UEMOA — local stack to learn from
| Player | Relevant idea | Source |
| --- | --- | --- |
| [Immobilier au Sénégal](https://immobilier-au-senegal.com/) | “Payez votre terrain en plusieurs fois” as **marketing** — weak product depth | Competitor |
| [Senhectare](https://senhectare.com/) | Map + papier + nº dossier + prix/ha | Competitor |
| [Noflaye](https://www.noflaye.sn/) | Full **gestion locative**: Wave/OM rent pay, quittances, maintenance tickets | SN PropTech |
| [Diavix](https://diavix.com/) | Wave/OM + notarial/foncier workflow digitalization | SN |
| [YAWEET](https://yaweet.com/) | **Due diligence foncière** reports for diaspora before paying | SN |
| [SysSamba](https://syssamba.com/en) | UEMOA property mgmt + Wave/OM/Flutterwave matching to leases | UEMOA SaaS |
| Industry note | Mobile money + installment + dematerialized rental as SN PropTech themes | [Proptech in Senegal](https://www.jarniascyril.com/international-real-estate/invest-in-real-estate-senegal/rise-of-proptech-senegal/) |

**Lesson:** Nigeria/Uganda already productize what Immobilier-au-Sénégal only advertises. Senegal has strong **gestion locative** tools (Noflaye) and **title diligence** (Yaweet) — few players unite **vente classique (tous biens) + vente étalée + location-vente + location** under one curated brand.

**État / SI public (lecture, pas concurrence) :** DGID (Livre foncier, NICAD, SGF 2026), PROCASEF/SIFCOM (délibérations), DGSCOS (contentieux / futurs quitus TRA-COS), TeleDAc (**non** guichet AC de masse). Le hub **lit** ces coffres ; il n’écrit pas le titre. Détail : `dossier/etude-de-marche/06` · `07`.

---

## 3. Feature map (by product axis)

### A. Discovery PropTech (shared surface)

| Feature | Why it matters | Priority |
| --- | --- | --- |
| **Killer autocomplete** | Type “terrain Bam…” → Bambilor, TF, 150–300 m², mensualité from X FCFA | **P0 — moat** |
| Map ↔ list sync, draw area, near-me | Beats Expat/CoinAfrique; upgrades Senhectare UX | **P0** |
| Facets Senegal-native | Type bien (terrain/maison/appart), mode (vente / étalé / loc-vente / location), TF/bail, m²/ha, viabilisé, distance mer, région/quartier | **P0** |
| Saved searches + WhatsApp/SMS alerts | Recurring engagement | P1 |
| SEO city×type landings | Crawlable pages for “terrain Saly”, “appart Mermoz” | **P0** |
| Social share cards (3 crops) | FB / WA / IG / TikTok | **P0** (see `docs/social-share-cards.md`) |
| Natural-language search (later) | “Terrain TF &lt; 10M près Lac Rose” via Typesense + light LLM | P2 |
| Comparables / price per m² hints | Trust + conversion (not full AVM day one) | P2 |
| Virtual tours / 360 | Nice for bâti; optional Matterport-class later | P3 |
| AI listing copy / photo quality checks | Ops efficiency for “we publish ads” | P2 |

### B. Axe 1 — Vente classique (terrains · maisons · appartements)

Offre “marché standard” : acheteur solvable ou diaspora qui paie comptant / négocie. Volume et SEO naturels (“maison à vendre Almadies”, “appartement Plateau”).

| Feature | Why | Priority |
| --- | --- | --- |
| Listing detail SSR + share cards | Lead + WhatsApp conversion | **P0** |
| Filters beds/baths/surface/price | Parity with classifieds, cleaner UX | **P0** |
| Visit booking / lead CRM | Agency ops (“we publish ads”) | P1 |
| Offer / negotiation notes (internal) | Agent workflow | P2 |
| Comparables prix/m² | Trust on bâti & terrains | P2 |
| Virtual tour (bâti) | Differentiation on premium homes | P3 |

### C. Axe 2 — Vente étalée terrains (killer feature)

| Feature | Why | Priority |
| --- | --- | --- |
| **Mensualité simulator** on eligible listings | Show acompte 10%/30%, durée 12–36 mois, mensualité FCFA — Immobilier-au-SN only banners this | **P0** |
| Plan builder (buyer) | Choose tenor; lock quote; share card | **P0** |
| Reservation + frais de dossier online | Filter unserious buyers (25–50k FCFA) | P1 |
| Buyer payment dashboard | Balance, history, next due — like Buildbay/Sytemap | **P1** |
| Wave / Orange Money installment collection | Local rails mandatory ([SysSamba](https://syssamba.com/en), [Noflaye](https://www.noflaye.sn/), [Diavix](https://diavix.com/)) | **P1** |
| Auto reminders (SMS + WhatsApp + email) | Cut churn on low-deposit plans | P1 |
| Owner (vendeur) payout dashboard | Show collections minus commission | P1 |
| Document vault | Extrait LF, plan, promesse, quittances | P1 |
| Default / clause résolutoire workflow | Ops + trust for owners | P2 |
| GPS plot pin + optional parcel outline | Trust / diaspora | P2 |
| Partner title check (Yaweet-style) | Upsell diligence before first payment | **P1** |
| Optional: étalé on maisons later | Same engine, higher ticket | P3 |

### D. Axe 3 — Location-vente (maisons · appartements)

| Feature | Why | Priority |
| --- | --- | --- |
| Equity-style payment tracker | “X% already paid toward ownership” UI | **P1** |
| Dual-status contract UX | Occupant + future owner narrative | P1 |
| Soft credit / payment history from Axe 4 | Cross-sell path from reliable tenants | P2 |
| E-sign promesse / mandat | Reduce office friction | P2 |
| Milestone escrow (if building/finish) | Jawudi/TrustGaps pattern — only if you enter construction | P3 |

### E. Axe 4 — Location (cash engine)

| Feature | Why | Priority |
| --- | --- | --- |
| Digital bail + quittances | Table stakes vs [Noflaye](https://www.noflaye.sn/) | P1 |
| Rent collection Wave/OM | Recurring revenue ops | P1 |
| Maintenance tickets | Tenant → agency → owner | P2 |
| Tenant score / on-time history | Fuel Axes 1–3 offers | **P1** (strategic) |
| Short-stay / meublé calendar | Higher commission niche | P3 |

### E. Trust, diaspora & ops (horizontal)

| Feature | Why | Priority |
| --- | --- | --- |
| Curated publish CMS (“we put the ads”) | Mandate checklist before go-live | **P0** |
| Title badge system | TF / Bail / Délibération+disclaimer / vérifié | **P0** |
| Partner title check (Yaweet-style) + checklist régime | Upsell diligence **before** first payment | **P1** (was P2 — Vague 2) |
| Escrow or dedicated collection account | Don’t let money bypass platform (Conekta/Jawudi lesson) | P1 (legal setup first) |
| Diaspora mode | Multi-currency display, remote KYC, French/English, time-zone reminders | P1 |
| Agent / branch CRM | Leads from web → WhatsApp → visit | P1 |
| Owner portal | List performance, payouts, documents | P1 |
| Fraud reporting + listing audit trail | Brand protection | P2 |
| Watch futurs quitus DGSCOS / TRA-COS | Conditionnement notaire/banque éventuel | P3 |
| Blockchain certificate | **Reject as product** (intégrité = hash + audit) — aligné vision Tracos | — |

---

## 4. Suggested product phases

### Phase 0 — Launch narrative (website)
EverGreen landing + SEO shell + curated listings + map + **autocomplete** + **simulateur de mensualités** + WhatsApp + share cards.  
*Looks like PropTech; still light backend.*

### Phase 1 — Transaction PropTech
Accounts (buyer / owner / agent) · Wave/OM payments · échéancier · dashboards · reminders · document vault · frais de dossier.  
*Becomes the operating system of Axes 1–4.*

### Phase 2 — Trust & growth
Escrow/séquestre policy · saved alerts · diaspora UX · partner diligence API · tenant→owner funnel automation · Typesense NLP search.

### Phase 3 — Moats that compound
Credit-like scoring from payment history · partner bank/MFI for deposit top-ups · optional AVM/comps · virtual tours · open data layers on map (schools, flood — where data exists).

---

## 5. What *not* to chase early

| Tempting feature | Why wait |
| --- | --- |
| Full bank mortgage origination | Licensing / capital / CBN-style complexity (Conekta caveat) |
| Open self-serve posting | Breaks “we put the ads” trust model |
| Blockchain titles as core | Marketing fluff until legal ops are solid |
| Heavy 3D Matterport on every terrain | Terrains don’t need it; burn cost |
| Generic ChatGPT homepage bot | Autocomplete + simulator convert better |

---

## 6. Moat stack (how pieces lock together)

```
Autocomplete + Map          →  find the right bien fast
        ↓
Mensualité / Loc-vente UX   →  make accession tangible (vs banners)
        ↓
Wave/OM + Dashboard         →  collect & prove payments
        ↓
Title badges + Docs         →  trust vs classifieds
        ↓
Location history            →  qualify buyers for Axes 1–3
        ↓
SEO + Share cards           →  acquire traffic cheaper than ads
```

No single competitor in Senegal owns this full chain. Closest fragments: Senhectare (map/meta), Immobilier-au-SN (installment *message*), Noflaye (rent ops), Yaweet (diligence).

---

## 7. Tech implications (align with `docs/tech-stack.md`)

| Need | Suggestion |
| --- | --- |
| Instant autocomplete | Typesense or Meilisearch (French + typos + facets) |
| Map | Leaflet/Mapbox + PostGIS later |
| Payments | Wave + Orange Money via aggregator (PayTech / InTouch / Flutterwave-class) |
| Schedules | Cron + WhatsApp Business API / SMS gateway |
| Docs | S3-compatible storage + signed URLs |
| OG cards | `next/og` (already specified) |
| Search NLP | Later: embed + hybrid search |

---

## 8. Recommendations (opinion)

1. **Lead PropTech with accession tooling**, not with “AI.” The killer feature Immobilier-au-Sénégal *hints* at — paiement échelonné — should be a **first-class interactive product** (simulator → reserve → pay → track). Keep **vente classique** (terrains / maisons / appartements) as the default catalog volume.
2. **Autocomplete is the front door** of that moat: search by *mensualité* and *titre*, not only keyword.
3. **Wave/Orange Money is non-negotiable** for SN realism; card-only is diaspora-secondary.
4. **Don’t rebuild Noflaye day one** — ship location as Axis 3 with light management; deepen once Axis 1 payments work.
5. **Partner for diligence** (Yaweet-like) instead of becoming a cadastre office — and **encode paper hierarchy** (délibération ≠ TF).
6. **Don’t promise TeleDAc** or admin SLAs you don’t control.
6. Position copy: *agence immobilière full-service* (vente, location, **gestion / loyers**) — PropTech underneath. Catalogue : **vente** (terrains, maisons, apparts) + **étalé** + **loc-vente** + **location gérée**. See `docs/positioning.md`.

---

## 9. Sources

- [Buildbay](https://www.mybuildbay.com/), [Sytemap](https://sytemap.com/), [Geofort FlexPay](https://geofort.ng/flexpay/), [Jawudi](https://jawudi.com/en)
- [Conekta](https://useconekta.com/), [Senguka](https://senguka.com/), [TrustGaps](https://trustgaps.com/)
- [Noflaye](https://www.noflaye.sn/), [Diavix](https://diavix.com/), [YAWEET](https://yaweet.com/), [SysSamba](https://syssamba.com/en)
- [Proptech in Senegal](https://www.jarniascyril.com/international-real-estate/invest-in-real-estate-senegal/rise-of-proptech-senegal/)
- Internal: `docs/first analysis/q1–q5.md`, `docs/competitive-analysis.md`, `docs/social-share-cards.md`
