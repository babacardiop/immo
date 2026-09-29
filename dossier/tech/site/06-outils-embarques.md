# Outils embarqués — Simus, embeds & lead magnets

**Document :** Dossier · Tech · Site · 06  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) · [`04-crm-et-leads.md`](./04-crm-et-leads.md) · [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) · [`../research-lab/04-outils-publics.md`](../research-lab/04-outils-publics.md) · specs [`../../../docs/add-ons/specs/01-outils-simulateurs/`](../../../docs/add-ons/specs/01-outils-simulateurs/)  
**Aval :** composants React `SimulatorEmbed` · APIs `/api/addons/*` · analytics · V1 ship

> **Rôle :** comment les **calculateurs** et **checklists** s’embarquent dans le hub (fiche, guides, `/outils`) pour convertir sans quitter le site — lead magnets brandés EverGreen.  
> Catalogue produit / barèmes lab → `research-lab/04`. Specs formules → add-ons `01`–`03`+.

**Clarif README « budget / crédit / loyer » :**

| Mot | Sens EverGreen Y1 | Outil |
| --- | --- | --- |
| **Budget** | Terrain + construction + frais | PUB-02 · PUB-03 |
| **Crédit** | Mensualité **étalé / loc-vente** (facilité vendeur) — **pas** prêt bancaire | PUB-01 |
| **Loyer** | Pas de simu crédit-loyer V1 · checklist entrants + catalogue `/louer` · évent. « capacité loyer » P2 | CHK-06 · soft |

---

## 0. Principes lead magnet

Bench calculateurs 2025–26 (Fintactix / mortgage UX) :

| # | Règle | EverGreen |
| ---: | --- | --- |
| 1 | Résultat **ungated** | Chiffre FCFA immédiat |
| 2 | CTA **in-result** | WA + email scénario |
| 3 | Capturer le **scénario** avec le contact | `sim_scenario` JSON → CRM |
| 4 | Rester **on-site** | Embed natif · pas iframe Zillow-like |
| 5 | Brand match | Tokens EverGreen · pas widget tiers nu |
| 6 | Mobile-first | Gros tap targets · sticky CTA |
| 7 | 1 CTA dominant | WA conseiller / intro partenaire |
| 8 | Disclaimer honnête | Estimation · pas offre · pas crédit banque |

**CTA post-résultat convertit ~3× mieux** qu’un gate avant calcul — on suit ça.

---

## 1. Surfaces d’embarquement

```
/outils/[outil]          ← page SEO pleine (hero + calc + FAQ)
fiche terrain            ← SimulatorEmbed compact (V1)
/guides/[slug]           ← <SimulatorEmbed id="…" /> MDX
/acheter?…               ← soft lien « Estimer ma mensuelle »
home                     ← pas de calc dans hero (brand rules)
```

| Surface | Outils | Mode embed |
| --- | --- | --- |
| `/outils` hub | Tous P0–P2 listés | Cards → pages |
| `/outils/mensualite` | PUB-01 | Full |
| `/outils/construction` | PUB-02 | Full |
| `/outils/budget-total` | PUB-03 | Full |
| Fiche `property_type=land` | 01 + 02 + lien 03 | **Compact** + deep-link full |
| Fiche étalé / loc-vente | PUB-01 prérempli prix | Compact |
| Guide construction / TF | 01 ou 02 | Compact ou CTA bandeau |
| Checklist page | PDF + WA | Pas de calc |

**Anti :** calc dans hero home · 3 simus empilés sans hiérarchie · email obligatoire avant résultat.

---

## 2. Inventaire outils (embarqueable)

### 2.1 P0 Vague 1 — ship

| ID | Nom | Job user | Lead magnet | Partner |
| --- | --- | --- | --- | --- |
| **EMB-01** | Mensualité étalé / loc-vente | « Je peux payer combien / mois ? » | WA + scénario | Réservation / agent |
| **EMB-02** | Coût construction | « La maison coûtera combien ? » | WA + devis | BTP / archi |
| **EMB-03** | Budget total projet | « Cash jour J + chantier » | WA / diligence | Notaire soft |

### 2.2 P1+ (embarquer plus tard)

| ID | Nom | Vague | Note |
| --- | --- | :---: | --- |
| EMB-04 | Estimation vendeur | V5 (soft V0 form) | Supply — pas embed fiche acheteur |
| EMB-05 | Frais acquisition | V2 | Closing |
| EMB-06 | Prêt à bâtir (VRD…) | V6 | Post-achat terrain |
| EMB-07 | Carte prix | V7 / L2 | Lab |
| EMB-CHK | Checklists 01–08 | Continu | PDF lead |

### 2.3 « Loyer » — position

Pas de simulateur « loyer vs mensualité banque » Y1 (crédit rare ~4 %).  
Option P2 : mini-outil « total entrée location » (loyer × N + caution) branché CHK-06 — hors V1.

---

## 3. Composant `SimulatorEmbed`

### 3.1 Props

```ts
type SimulatorId = 'mensualite' | 'construction' | 'budget-total'

interface SimulatorEmbedProps {
  id: SimulatorId
  variant: 'full' | 'compact' | 'inline'
  listingId?: string      // préremplit prix / zone
  defaultInputs?: Partial<Inputs>
  source?: string         // analytics: fiche | guide | outils
  showPartnerCta?: boolean
}
```

### 3.2 Variants

| Variant | Où | Contenu |
| --- | --- | --- |
| **full** | `/outils/*` | Tous inputs · résultat large · FAQ sous |
| **compact** | Fiche / guide | Inputs essentiels · résultat · lien « Ouvrir l’outil complet » |
| **inline** | MDX court | 1–2 champs · résultat · CTA |

### 3.3 Panneau résultat (canon — aligné lab `04`)

```
┌─────────────────────────────────────┐
│  [ Gros chiffre FCFA ]              │
│  Fourchette min – max (si applicable)│
│  Disclaimer 1 ligne                 │
│  [ WhatsApp conseiller ]  ← primary │
│  [ Email / sauver ce scénario ]     │
│  Lien checklist / autre outil       │
└─────────────────────────────────────┘
```

Microcopy ungated : *« Pas d’email requis pour calculer. »*

---

## 4. Specs rapides par outil P0

### 4.1 EMB-01 Mensualité (« crédit » étalé)

| | |
| --- | --- |
| **Inputs** | `prix_bien` · `acompte` (% ou fixe) · `duree_mois` (12/24/36) · `mode` etale\|loc_vente · `frais_dossier` |
| **Formule** | `(prix - acompte) / duree` (+ frais lissés option) |
| **Prérempli fiche** | `price_fcfa` si étalé / loc-vente |
| **Disclaimer** | *Simulation indicative — facilité vendeur via agence, **pas** un prêt bancaire.* |
| **CTA primary** | WA « Parler de ce plan de paiement » |
| **CTA secondary** | Email scénario · lien budget total |
| **Events** | `sim_start` · `sim_complete` · `sim_cta_wa` |

Règles admin : `PlanRule` (min acompte par palier) — éditable sans redeploy.

### 4.2 EMB-02 Construction

| | |
| --- | --- |
| **Inputs** | `surface_m2` · `niveaux` · `finition` · `zone` · options (clôture, fosse, VRD, imprévus 10–15 %) |
| **Barèmes** | `ConstructionRate` zone × finition (lab ICC bridge + devis PART) |
| **Prérempli fiche** | zone depuis `quartier` / city |
| **Output** | Fourchette FCFA · FCFA/m² · hint archi si &gt; ~30 M |
| **CTA primary** | WA / intro constructeur |
| **CTA secondary** | Deep-link budget total · PDF |
| **Disclaimer** | *Fourchette ±10–15 % · hors prix terrain · devis réel obligatoire.* |

Recalibrage barèmes : **trimestriel** post-ICC (`research-lab`).

### 4.3 EMB-03 Budget total

| | |
| --- | --- |
| **Inputs** | prix terrain (listing) · params 01 · params 02 · `include_frais` |
| **Output** | cash initial · mensuelles · construction · frais · **grand total** |
| **CTA** | Visite + diligence · WA |
| **Note** | Orchestre 01+02 (+ grille frais soft jusqu’à PUB-05 V2) |

---

## 5. Prefill & deep-links

| Depuis | Vers | Query |
| --- | --- | --- |
| Fiche terrain | `/outils/mensualite?listing=ID` | prix + mode |
| Fiche | `/outils/construction?listing=ID` | zone |
| Résultat 01 | `/outils/budget-total?...` | scénario sérialisé |
| Guide | embed `source=guide_slug` | UTM content |

**Partage WA :** image/PDF résultat optionnel V1.1 — texte résumé + lien scénario court.

---

## 6. Lead capture & CRM

Aligné `04-crm-et-leads` :

```
sim_complete
  → (option) user clique WA / email
  → lead upsert
      intent=buy
      source=sim_{outil}
      sim_scenario={inputs, outputs, listingId}
      score += 15
  → PartnerLead si CTA BTP/archi
```

| Action | Champs capturés |
| --- | --- |
| WA click | phone via WA · scénario en texte prérempli |
| Email scénario | email · name · JSON scenario |
| Intro partenaire | PartnerLead `sent` + brief |

**Jamais :** bloquer `sim_complete` sur formulaire.

---

## 7. Architecture technique (cible)

```
apps/web
  components/simulators/
    SimulatorEmbed.tsx
    MensualiteForm.tsx
    ConstructionForm.tsx
    BudgetTotalForm.tsx
    SimResultPanel.tsx
  app/outils/...
  app/api/addons/{mensualite,construction,budget-total}/simulate
```

| Couche | Choix |
| --- | --- |
| Calcul | Server Action ou Route Handler (barèmes côté serveur) |
| Barèmes | DB / config JSON versionnée · admin later |
| Client | Optimistic UI · debounce inputs |
| Analytics | `sim_*` events (GA4 / house analytics) |
| Brand | CSS variables design-tokens — **pas** iframe white-label externe Y1 |

API stubs : specs add-ons §9 (`POST /api/addons/.../simulate`).

---

## 8. Copy CTA (exemples qui convertissent)

| Mauvais | Bon |
| --- | --- |
| Envoyer | **WhatsApp mon plan de paiement** |
| Learn more | **Voir le budget chantier pour ce terrain** |
| Get started | **Recevoir ce scénario par email** |
| Contact | **Parler à un conseiller (&lt; 24 h)** |

Post-résultat = verbe + bénéfice + possession (« mon »).

---

## 9. Disclaimers (obligatoires UI)

| Outil | Ligne courte |
| --- | --- |
| Mensualité | Pas un crédit bancaire · conditions agence / vendeur |
| Construction | Fourchette · hors terrain · devis partenaire |
| Budget total | Indicatif · frais réels selon notaire / dossier |
| Tous | Chiffres FCFA · MAJ barème datée (`retrieved` / version) |

Interdit : « offre de prêt » · « prix officiel m² » · « TeleDAc inclus ».

---

## 10. KPIs

| KPI | Cible esprit V1 |
| --- | --- |
| `sim_complete` / session outils | ↑ |
| `sim_complete` depuis fiche (`sim_from_listing`) | Track |
| Taux `sim_cta_wa` / complete | Soft 5–15 % |
| Partner leads depuis construction | Track |
| Temps sur page `/outils/*` | &gt; générique blog |

Vanité : impressions embed sans `sim_complete`.

---

## 11. Phasage

| Phase | Livrable |
| --- | --- |
| **V1 S3** | 3 pages full + embeds fiche terrain + events + WA CTA |
| **V1.1** | Email scénario · PDF · share card |
| **V2** | Frais acquisition outil · deep-links diligence |
| **V4** | Multi-devise indicatif EUR/USD (diaspora) |
| **V5** | Estimation vendeur page |
| **V7** | Carte prix embed |

---

## 12. Checklist DoD embed

- [ ] Calcul client/serveur cohérent (±1 FCFA arrondi documenté)  
- [ ] Ungated + CTA in-result  
- [ ] Prefill listing testé  
- [ ] Disclaimer visible  
- [ ] Events `sim_start/complete/cta_*`  
- [ ] Mobile sticky CTA  
- [ ] Brand tokens (pas iframe tiers)  
- [ ] Lien checklist papiers sur fiche terrain  

---

## 13. Anti-patterns

| Anti | |
| --- | --- |
| Iframe calculateur US non brandé | Fuite + hors contexte étalé SN |
| Gate email avant chiffre | Tue conversion |
| Mensualité appelée « crédit » sans disclaimer | Confusion banque |
| Embed construction sur fiche appart | Hors job |
| 5 CTA post-résultat | Paralysie |
| Barèmes hardcodés jamais MAJ | Crédibilité |

---

## 14. Liens

| Doc | Rôle |
| --- | --- |
| [`../research-lab/04-outils-publics.md`](../research-lab/04-outils-publics.md) | Catalogue PUB / CHK |
| Specs `01` `02` `03` | Formules · API · monétisation |
| [`04-crm-et-leads.md`](./04-crm-et-leads.md) | Pipeline post-CTA |
| [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) | W-OUT-* · W-OUT-EMB |
| [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) | Prefill listing |

---

## 15. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| Mortgage calc lead gen | Embed listing + SEO page · ungated · CTA in-result · brand white-label |
| CTA data | Post-résultat ≫ pre-gate · verbes bénéfices (« my payment ») |
| Fintactix | Capturer scénario via email results · events comportementaux |

---

*Outils embarqués EverGreen Site v1.0 — sept. 2026. 3 simus V1 · embeds fiche · ungated · scénario → CRM · pas de prêt bancaire déguisé.*
