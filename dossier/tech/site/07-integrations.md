# Intégrations — WhatsApp, paiements, maps, email

**Document :** Dossier · Tech · Site · 07  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`../../../docs/tech-stack.md`](../../../docs/tech-stack.md) · [`04-crm-et-leads.md`](./04-crm-et-leads.md) · [`06-outils-embarques.md`](./06-outils-embarques.md) · [`../../plan-commercial/03-canaux-acquisition.md`](../../plan-commercial/03-canaux-acquisition.md) · [`../../../docs/social-share-cards.md`](../../../docs/social-share-cards.md)  
**Aval :** env vars · Route Handlers webhooks · `19-data-flow-rgpd.md` · ops KYB Wave/OM

> **Rôle :** décisions d’intégration **produit** (quoi brancher, quand, comment) — pas un tutoriel SDK complet.  
> SLA / pipeline → `04`. Stack cœur → `tech-stack.md`.

---

## 0. Matrice verdict Y1

| Intégration | Choix V0–1 | Scale | Priorité |
| --- | --- | --- | :---: |
| **WhatsApp** | Business **App** société + `wa.me` deep links | Cloud API + inbox partagée si &gt;~200 conv/mois ou 6+ agents | **P0** |
| **Maps** | **Leaflet + OSM** (tuiles) | Mapbox/MapLibre si markers massifs / style premium | **P0** |
| **Email** | **Resend** (transactionnel) + React Email | Queue si volume | **P0** (forms / simu) |
| **Paiements** | Liens / manuel V0–1 · **API Wave + OM** dès encaissement digital | Dual checkout + webhooks | **P1** (V3 loyers) · soft V1 acomptes |
| **OG / share** | `next/og` 3 crops | Cache-bust | **P0** |
| **Auth** | Auth.js plus tard (portails) | — | V3 |
| **SMS** | Non Y1 (WA suffit) | — | — |
| **Google Maps** | Non (coût + OSM OK SN) | — | — |

**Règle d’or paiements :** Wave/OM = **agence / séquestre / loyers** — **jamais** « paie le vendeur sur Wave » (marque + fraude).

---

## 1. WhatsApp Business

### 1.1 Rôle

| Usage | Implémentation |
| --- | --- |
| Capture | CTA site → deep link prérempli (`04`) |
| Closing | Négociation humaine sur numéro **société** |
| Ops | Quittances / tickets (V3) |
| Ads | Click-to-WA Meta |

### 1.2 Setup V0 (lean)

| Élément | Standard |
| --- | --- |
| Compte | WhatsApp **Business** (app) · 1 numéro EverGreen |
| Catalogue in-app | Optionnel Y1 (biens curated) |
| Away message | Accusé hors horaires + reprise |
| Quick replies | Templates culture / scripts `04` |
| CRM | Log manuel ou import · owner &lt; 15 min |
| Meta Cloud API | **Pas J0** |

Deep link canon — voir `04` §2.

### 1.3 Scale — Cloud API (quand)

Déclencheurs (aligné plan-commercial / Kolonell) :

- &gt; ~200 conversations / mois **ou**
- ≥ 6 users agents sur le même flux **ou**
- Besoin templates outbound hors fenêtre 24 h (nurture)

| Capacité API | Usage hub |
| --- | --- |
| Shared inbox | Plus de fuite perso |
| Templates approuvés | Relances J+1 / post-visite |
| Webhooks messages | Auto-création lead CRM |
| Routing | Assign zone / intent |

**Providers possibles :** Meta Cloud direct · BSP (WABA) — choisir à scale ; coût message + compliance.

### 1.4 Anti-patterns WA

| Interdit |
| --- |
| Numéros perso agents non loggés |
| Blast spam sans template / hors fenêtre |
| Promesses TF / délais dans auto-réponses |
| Paiement demandé via WA au vendeur |

### 1.5 Env / secrets

```
NEXT_PUBLIC_WA_E164=+221XXXXXXXXX
# Plus tard Cloud API :
WA_PHONE_NUMBER_ID=
WA_ACCESS_TOKEN=
WA_WEBHOOK_VERIFY_TOKEN=
WA_APP_SECRET=
```

---

## 2. Cartes (maps)

### 2.1 Décision

| Phase | Stack | Pourquoi |
| --- | --- | --- |
| **V0–1** | **Leaflet** + tuiles **OSM** (ou fournisseur OSM-compatible) | Gratuit · léger · &lt;1k pins OK · Senhectare-proven SN |
| **Scale** | **MapLibre GL** (prefer) ou Mapbox GL | Perf WebGL · style · cluster dense |

Bench perf : Leaflet excellent jusqu’à ~1–10k features ; au-delà privilégier GL. Catalogue EverGreen Y1 = dizaines–centaines → **Leaflet first**.

### 2.2 Surfaces

| Surface | Comportement |
| --- | --- |
| `/acheter?view=map` · `/louer?view=map` | Markers sync filtres · cluster soft |
| Fiche | Mini-carte · `geo_precision` |
| Agent back-office | Pin / approx au create |

### 2.3 Données geo

Aligné `05-catalogue` :

- `geo_lat` / `geo_lng` · `geo_precision` = `exact` \| `approx` \| `zone`
- Flouter exact si vendeur sensible (approx quartier)
- Attribution OSM obligatoire (footer carte / legal)

### 2.4 Features V0

- [ ] Toggle liste / carte  
- [ ] Marker → preview card (prix + pastille papier)  
- [ ] Fit bounds résultats filtrés  
- [ ] Fallback si geo manquante (centrer Dakar / zone)

### 2.5 Plus tard

- Draw-to-search  
- Isochrones / « près de »  
- Heat carte prix (lab L2 — pas pins concurrents)

### 2.6 Env

```
NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
# Si Mapbox plus tard :
NEXT_PUBLIC_MAPBOX_TOKEN=
```

Respecter usage policy tuiles (rate / caching CDN si volume).

---

## 3. Email transactionnel

### 3.1 Décision

| Choix | **Resend** (+ React Email templates) |
| --- | --- |
| Pourquoi | DX Next.js · Server Actions · domaine vérifié · idempotency |
| Pas Y1 | Mailchimp blast marketing (canal = WA + SEO) |

### 3.2 Cas d’usage

| Email | Trigger | Vague |
| --- | --- | :---: |
| Accusé form (contact / gérer / estimation) | Server Action form | V0 |
| Notif **interne** agent (nouveau lead) | Même + BCC ops | V0 |
| Scénario simu (PDF/lien) | Soft gate post-`sim_complete` | V1 |
| Relance nurture | CRM / cron | V2+ |
| Quittance / reporting | Portail | V3 |

**Canal client #1 reste WA** — email = diaspora + scénarios + audit trail.

### 3.3 Pattern technique

```
Form → Server Action (Zod)
  → upsert CRM
  → resend.emails.send (user ack)
  → resend.emails.send (agent notify)
```

- Clé `RESEND_API_KEY` **server-only**  
- `from:` domaine vérifié `noreply@…` / `leads@…`  
- Idempotency key sur sends critiques  
- Rate-limit + Turnstile soft anti-spam forms  

### 3.4 Env

```
RESEND_API_KEY=
EMAIL_FROM=EverGreen <noreply@domaine.sn>
EMAIL_LEADS_TO=leads@domaine.sn
```

---

## 4. Paiements (Wave · Orange Money)

### 4.1 Contexte SN (2026)

- Mobile money **dominant** (&gt;70 % online via Wave/OM — bench Kolonell)  
- Cartes = niche  
- Wave Business : Checkout sessions + webhooks HMAC · fee ~**1 %** (cap) · KYB NINEA/RCCM **5–10 j**  
- Orange Money Web Payment : OAuth + `/webpayment` · `notif_url` + **polling** recommandé · KYB **7–15 j**

### 4.2 Ce qu’on paie (et ce qu’on ne paie pas)

| Cas | Canal | Vague |
| --- | --- | :---: |
| Loyers → agence (gestion) | Wave + OM API | **V3** |
| Frais dossier / acompte **structuré** agence | Wave/OM ou lien | V1–2 soft |
| Commission / packs services | Facture + MM | Ops |
| Séquestre / notaire | **Hors** Wave vendeur — circuit notaire | Continu |
| Achat bien → **vendeur perso** | **INTERDIT** produit | — |

### 4.3 Phasage technique

| Phase | Implémentation |
| --- | --- |
| **V0** | Pas de checkout site obligatoire · virement / Wave **Business** manuel tracké CRM |
| **V1 soft** | Payment **links** merchant (Wave Business) pour frais dossier |
| **V3** | Dual API : `createPaymentSession(provider, amount, orderId)` · webhooks · statut `Payment` en DB |
| **V3+** | Payouts reversement proprio (Wave Payout) — conformité KYB renforcée |

### 4.4 Architecture cible (V3)

```
Client → POST /api/payments/checkout {provider, amount, purpose, leaseId?}
       ← { redirectUrl }
Client → Wave / OM hosted page
Provider → POST /api/payments/webhook/{wave|om}  (verify signature)
       → mark Payment paid (idempotent)
       → update CRM / portail quittance
```

| Règle | |
| --- | --- |
| Montants | Entiers **XOF** |
| Source of truth | **Webhook** (pas seulement return_url) |
| OM | Polling status si notif flaky |
| Idempotency | `order_id` unique · replay safe |
| Secrets | Jamais dans le browser |

### 4.5 Modèle `Payment` (min)

`id` · `provider` wave\|om · `amount_xof` · `purpose` (rent\|fee\|other) · `status` · `external_id` · `lead_or_lease_id` · `paid_at`

### 4.6 Env

```
WAVE_API_KEY=
WAVE_WEBHOOK_SECRET=
OM_CLIENT_ID=
OM_CLIENT_SECRET=
OM_MERCHANT_KEY=
PAYMENTS_SUCCESS_URL=
PAYMENTS_CANCEL_URL=
```

### 4.7 Prérequis ops

- NINEA + RCCM pour merchant APIs  
- Compte settlement bancaire  
- Paralléliser KYB **avant** sprint V3  

---

## 5. Open Graph & partage (lié WA)

Pas un « provider » externe mais intégration critique mobile SN :

| Item | Spec |
| --- | --- |
| Impl | `next/og` · 3 crops (`social-share-cards.md`) |
| WA | Landscape &lt; 300 KB · cache-bust `?v=updatedAt` |
| Fiches | Titre court + prix FCFA + pastille papier dans image si possible |

---

## 6. Autres intégrations (backlog)

| Intégration | Quand | Note |
| --- | --- | --- |
| Auth.js | V3 portails | Proprio / locataire / agent |
| Calendly-like / cal.com | Option RDV | Ou créneaux WA only Y1 |
| Google Analytics 4 / Plausible | V0 | Events `sim_*` · `lead_*` |
| Meta Pixel | Ads ON | Consent |
| Sentry | V0 soft | Erreurs API payments |
| Storage S3/R2 | V0 | Photos listings |
| PostGIS | V1+ | Geo queries catalogue |

---

## 7. Diagramme flux (synthèse)

```
                    ┌─────────────┐
   Site Next.js ───►│  wa.me CTA  │──► WA Business App ──► Agents / CRM
        │           └─────────────┘
        ├──────────► Resend ──► user ack + agent notify
        ├──────────► Leaflet map ◄── OSM tiles + listing geo
        │
        └─ V3 ─────► Wave / OM checkout ──webhook──► Payment + quittance
```

---

## 8. Sécurité & conformité

| Domaine | Règle |
| --- | --- |
| Secrets | `.env` / vault · jamais commit |
| Webhooks | Vérif signature HMAC · HTTPS only |
| PII | Minimiser dans logs email/WA |
| Paiements | Réconciliation quotidienne · match CRM |
| RGPD-like | Consent forms · détail `19` |
| Marque | Scripts anti-Wave-vendeur dans onboarding agents |

---

## 9. Checklist go-live par vague

### V0

- [ ] Numéro WA Business live + away message  
- [ ] Deep links fiches / FAB  
- [ ] Resend domaine vérifié · ack forms  
- [ ] Leaflet catalogue + fiche  
- [ ] OG landscape fiches  

### V1

- [ ] Email scénario simu  
- [ ] Events analytics branchés  
- [ ] (Option) Wave payment link frais dossier  

### V3

- [ ] KYB Wave + OM approuvés  
- [ ] Dual checkout + webhooks testés sandbox→prod  
- [ ] Quittances liées `Payment.paid`  
- [ ] Runbook incident paiement  

---

## 10. Coûts ordre de grandeur (indicatif)

| Poste | Ordre |
| --- | --- |
| WA App | Gratuit / abo Business léger |
| WA Cloud API | Variable / conversation |
| Leaflet + OSM | ~0 (attention fair-use tiles) |
| Mapbox | Free tier puis usage |
| Resend | Free tier → payant volume |
| Wave merchant | ~1 % / tx (cap) |
| OM merchant | ~1,5–2,5 % négocié |
| Intégration dual MM | Bench 150–350 k FCFA setup (agence web) |

---

## 11. Anti-patterns

| Anti | |
| --- | --- |
| Stripe-only checkout SN | Ignore majorité MM |
| Google Maps sans besoin | Coût + dépendance |
| Email comme canal closing #1 | Contre réalité terrain |
| Cloud API WA J0 | Complexité avant volume |
| Confirmer paiement sur return_url seul | Fraude / faux positifs |
| Stocker PIN / secrets OM côté client | Fail sécu |

---

## 12. Liens

| Doc | Rôle |
| --- | --- |
| [`04-crm-et-leads.md`](./04-crm-et-leads.md) | Deep links · SLA · CRM |
| [`05-catalogue-annonces.md`](./05-catalogue-annonces.md) | Geo fields |
| [`06-outils-embarques.md`](./06-outils-embarques.md) | Email scénario |
| [`../../../docs/tech-stack.md`](../../../docs/tech-stack.md) | Leaflet/Mapbox choice |
| [`../../../docs/social-share-cards.md`](../../../docs/social-share-cards.md) | OG WA |
| Wave docs | Checkout + webhooks |
| Kolonell guides 2026 | Wave/OM SN pratiques |

---

## 13. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| Wave Business SN | Checkout sessions · webhook HMAC · KYB 5–10 j · ~1 % |
| Orange Money WebPay | OAuth · webpayment · notif + polling · KYB plus long |
| Maps | Leaflet pour catalogue lean · GL si dense |
| Email Next | Resend + Server Actions · domain verify · idempotency |

---

*Intégrations EverGreen Site v1.0 — sept. 2026. WA App P0 · Leaflet P0 · Resend P0 · Wave/OM API en V3 · jamais Wave vendeur.*
