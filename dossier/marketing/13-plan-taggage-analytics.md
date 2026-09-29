# Plan de mesure — Taggage & analytics (GA, Meta, LinkedIn…)

**Document :** Dossier · Marketing · 13  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`09-kpis-marketing.md`](./09-kpis-marketing.md) · [`04-acquisition-paid.md`](./04-acquisition-paid.md) · [`../plan-commercial/04-objectifs-kpi.md`](../plan-commercial/04-objectifs-kpi.md) · [`../plan-commercial/08-growth-scorecard.md`](../plan-commercial/08-growth-scorecard.md) · [`05-seo-sem.md`](./05-seo-sem.md) · [`06-social-whatsapp.md`](./06-social-whatsapp.md) · [`08-launch-plan.md`](./08-launch-plan.md)  
**Aval :** GTM / gtag · Pixel + CAPI · CRM · scorecard · [`14-media-plan-acquisition.md`](./14-media-plan-acquisition.md)

> **Objectif :** une seule taxonomie d’events + UTM + CRM pour piloter CAC, leads WA, `sim_complete`, ROAS, organic.  
> Y1 lean : **browser first** · CAPI / Measurement Protocol dès volume paid ou iOS loss.

---

## 0. Synthèse

| Couche | Outil Y1 | Rôle |
| --- | --- | --- |
| **Web analytics** | **GA4** (gtag ou GTM) | Funnel · organic · content |
| **Ads Meta** | Pixel + **CAPI** (redondant dès M3+) | Optim · ROAS · audiences |
| **Ads Google** | gtag / AW conversion (si SEM) | Search |
| **LinkedIn** | Insight Tag (option M6+) | Soft B2B — pas priorité V0 |
| **SEO** | Search Console | Clics · requêtes |
| **CRM** | Sheet/CRM + tags source | Source of truth leads / closings |
| **WA** | Labels Business + sync CRM | `wa_*` sources |

**Attribution Y1 :** last non-direct touch **ou** `source` CRM primaire.  
**North Star mesure :** events qualifiés → closings taggés — pas vanity sessions seules.

---

## 1. Stack & propriétaires

| Asset | Owner | GO Soft launch |
| --- | --- | --- |
| Propriété GA4 + flux web | CT / Presta | ☐ |
| GTM container (recommandé) | Presta | ☐ |
| Meta Pixel ID + Dataset CAPI | CT | ☐ M1–M2 (0 spend) |
| Google Ads (si SEM) | CT | ☐ M3+ |
| LinkedIn Insight Tag | CT | ☐ option |
| GSC propriété domaine | CT | ☐ J0–J30 |
| CRM colonnes source | AC + CT | ☐ **100 % leads** |

---

## 2. Convention UTM (obligatoire)

### 2.1 Paramètres

| Param | Valeurs autorisées (ex.) |
| --- | --- |
| `utm_source` | `meta` · `google` · `newsletter` · `soi` · `linkedin` · `fb_organic` · `partner` |
| `utm_medium` | `cpc` · `paid_social` · `organic` · `email` · `referral` · `status` · `broadcast` |
| `utm_campaign` | `{obj}_{geo}_{mois}` ex. `est_vendeur_z1_m3` · `dia_fr_m7` · `simu_terrain` |
| `utm_content` | `crea_a` · `crea_b` · `carousel_tf` |
| `utm_term` | KW Search (Google only) |

**Règles :** minuscules · `_` séparateur · pas d’accents · pas d’espaces · même `campaign` dans Ads Manager nom.

### 2.2 Miroir CRM

| Champ CRM | Valeur |
| --- | --- |
| `source` | `soi` · `seo` · `meta` · `google` · `wa_status` · `wa_broadcast` · `wa_group` · `organic_wa` · `newsletter` · `linkedin` · `partner` · `classifieds` |
| `campaign_id` | = `utm_campaign` ou ID Ads |
| `persona_guess` | fatou · mamadou · … |
| `first_touch_at` | datetime |
| `landing_path` | URL path |

Lead non taggé &gt; **5 %** = alerte ; &gt; **15 %** = freeze reporting paid (`09`).

---

## 3. Taxonomie d’events (source de vérité)

### 3.1 Funnel — events métier EverGreen

| Event | Définition | Déclencheur | Phase min |
| --- | --- | --- | --- |
| `page_view` | Vue page (auto GA4) | Toutes pages | V0 |
| `view_item` | Vue fiche bien | `/biens/[id]` | V0 |
| `wa_click` | Clic CTA WhatsApp | Bouton / lien wa.me | **V0 P0** |
| `estimation_request` | Demande estimation | Submit form / WA intent tagué | **V0 P0** |
| `sim_start` | Ouverture outil | Load `/outils` ou embed | V1 |
| `sim_complete` | Output généré | Fin parcours simu | **V1 P0** |
| `partner_lead` | Lead partenaire / rappel | Submit intro partenaire | V1 |
| `secure_interest` | Intérêt Pack Secure | CTA Secure | V2/V4 |
| `diligence_start` | Diligence ouverte | Checklist start | V2 |
| `mandat_signé` | Mandat signé | CRM / offline | Ops |
| `closing` | Closing vente/loc | CRM / offline | Ops |
| `gestion_on` | Mandat gestion actif | CRM | V3 |
| `generate_lead` | Alias Meta Lead | Form / WA qualifié | Paid |

*Noms GA4 : snake_case ≤ 40 car. Alignés `04` commercial + `09`.*

### 3.2 Paramètres events (custom)

| Param | Type | Exemple |
| --- | --- | --- |
| `content_type` | string | `listing` · `guide` · `outil` |
| `item_id` | string | slug bien / outil |
| `paper_type` | string | `tf` · `bail` · `deliberation` |
| `zone` | string | `mermoz` · `almadies` |
| `persona` | string | `fatou` · `mamadou` |
| `tool_id` | string | `construction` · `mensualite` · `budget` |
| `partner_type` | string | `btp` · `notaire` · `archi` |
| `lead_intent` | string | `vente` · `location` · `achat` · `gestion` |
| `event_id` | string | UUID — **dédup Pixel/CAPI** |
| `value` | number | marge FCFA si closing (offline) |
| `currency` | string | `XOF` |

### 3.3 Mapping Meta (Pixel / CAPI)

| Event EverGreen | Meta standard / custom | Optimiser ads sur |
| --- | --- | --- |
| `page_view` | `PageView` | — |
| `view_item` | `ViewContent` | Retarget |
| `wa_click` | `Contact` **ou** custom `wa_click` | Early M3 |
| `estimation_request` | `Lead` | **Oui** dès volume |
| `sim_start` | custom `sim_start` | — |
| `sim_complete` | `CompleteRegistration` **ou** custom | **Oui** V1+ |
| `partner_lead` | `Lead` (qualité) | Si volume |
| `secure_interest` | `SubmitApplication` / custom | Diaspora |
| `mandat_signé` | `Schedule` / custom offline | Qualif haute |
| `closing` | `Purchase` (value = marge) | Ideal long terme |

**Setup recommandé Meta (docs Meta) :** **redondant** Pixel + CAPI avec même `event_name` + `event_id` pour déduplication.

### 3.4 Mapping GA4 — conversions à marquer

| Priorité | Event | Mark as conversion |
| --- | :---: | --- |
| P0 Soft | `wa_click` | Oui |
| P0 Soft | `estimation_request` | Oui |
| P0 V1 | `sim_complete` | Oui |
| P1 | `partner_lead` | Oui |
| P1 | `secure_interest` | Oui |
| P2 offline | `mandat_signé` · `closing` | Oui (via MP / import) |

### 3.5 LinkedIn (option)

| Event | Insight Tag |
| --- | --- |
| Page view | Base |
| `wa_click` / `estimation_request` | Conversion LI si campagnes LI un jour |
| Y1 | Tag install OK · **pas** d’ads LI prioritaires |

---

## 4. Implémentation technique

### 4.1 Couches

```
Browser (gtag / GTM Web)
  → GA4
  → Meta Pixel
  → LinkedIn Insight (opt)
  → Google Ads tag (si SEM)

Server (M3+ recommandé)
  → Meta CAPI (event_id dédup)
  → GA4 Measurement Protocol (offline : mandat, closing)
  → (plus tard) GTM Server-Side
```

### 4.2 WhatsApp — bridging

| Touch | Mesure |
| --- | --- |
| Clic site `wa.me` | `wa_click` + UTM dans URL si possible |
| CTWA ads | Source CRM `meta` · campaign_id Ads |
| Status / Broadcast | Label WA → CRM `wa_status` / `wa_broadcast` **manuel Y1** |
| 1ʳᵉ réponse SLA | Timer CRM / sheet (pas GA) |

**Limite :** WA n’est pas un pixel — la vérité lead = **CRM**. GA mesure l’intention (clic).

### 4.3 Offline / CRM → ads & GA

| Étape | Comment |
| --- | --- |
| Mandat / closing | CT/AC log CRM → hebdo push CAPI `Purchase`/`Lead` qualifié + GA4 MP |
| `event_id` | Stable = `crm_{lead_id}_{event}` |
| Value closing | **Marge** XOF (pas CA brut) pour ROAS marge |
| Matching CAPI | email/phone hashés si consent (surtout diaspora FR) |

### 4.4 Enhanced measurement GA4

Activer : scrolls · outbound clicks · file downloads.  
Outbound vers `wa.me` / `api.whatsapp.com` → aussi event dédié `wa_click` (ne pas compter double en reporting — filtre).

---

## 5. Consentement & conformité

| Contexte | Règle |
| --- | --- |
| Site SN | Bandeau cookies / analytics si forms EU traffic |
| Diaspora FR Meta Lead Ads | Consent Meta + privacy policy live |
| CAPI user_data | Hash SHA-256 · pas de PII en clair dans GA |
| Photos / avis | Autorisation (Brand Book) |
| Ads kill | Si SLA WA rouge — tracking reste ON |

---

## 6. Plan de déploiement par phase

| Phase | Livrables mesure |
| --- | --- |
| **J-7 Soft** | GA4 · GSC · `wa_click` · `estimation_request` · UTM doc · CRM tags |
| **M1–M2** | Pixel · `ViewContent` · audiences · **0 spend** · DebugView QA |
| **V1** | `sim_start` / `sim_complete` · conversion GA4 |
| **M3 paid ON** | CAPI redondant · optim Meta sur `Lead`/`sim_complete` · Google conversion si SEM |
| **M4–M6** | Offline mandat/closing · audiences engagé contenu · LI tag opt |
| **M7+** | Value `Purchase` marge · scale si LTV:CAC |

---

## 7. KPI ↔ events (matrice)

| Famille KPI (`09`) | Events / sources |
| --- | --- |
| **CAC / LTV:CAC** | Spend Ads + closings CRM `source` |
| **Leads WA** | CRM + `wa_click` (proxy) + labels WA |
| **sim_complete** | GA4/Meta `sim_complete` → `partner_lead` |
| **ROAS** | Spend / marge closings attr. + CAPI Purchase |
| **Organic** | GA4 sessions organic · GSC · CRM `seo` |

**Dashboards :**

| Cadence | Où | Contenu |
| --- | --- | --- |
| Hebdo | Sheet + GA Explorations | Leads · SLA · wa_click · sim_* |
| Mensuel | Scorecard `08` commercial | CAC · ROAS · Scale/Hold/Kill |
| Ads | Meta/Google | CPL · events quali · freq |

---

## 8. QA & gouvernance

### 8.1 Checklist QA (avant Soft / avant paid)

- [ ] GA4 DebugView : `wa_click` fire 1× / clic  
- [ ] Meta Test Events : Pixel + CAPI dédup OK  
- [ ] Staging **noindex** · prod indexable  
- [ ] UTM exemples collés Ads + CRM  
- [ ] Conversion GA4 marquées  
- [ ] Mobile WhatsApp deep link OK  
- [ ] 0 PII en clair dans hits GA  

### 8.2 Anti-patterns

| | |
| --- | --- |
| Optimiser Meta sur `PageView` seul | Junk traffic |
| Double count wa_click + outbound sans filtre | CPL faussé |
| Closings sans `source` | CAC impossible |
| CAPI sans `event_id` | Dédup cassée |
| Changer noms events mid-campagne | Break historiques |

### 8.3 RACI

| Acte | CT | Presta | AC | GER |
| --- | :---: | :---: | :---: | :---: |
| Taxonomie / doc | **R/A** | C | C | I |
| GTM / Pixel / CAPI | C | **R** | I | A budget |
| CRM tags quotidiens | C | — | **R** | I |
| Offline conversion push | **R** | C | C | A |
| Scale/Kill sur data | C | — | C | **A** |

**Revue taggage :** trimestrielle · à chaque nouvelle vague produit (nouveaux events).

---

## 9. Spécimens d’implémentation (réf.)

### 9.1 gtag event (illustratif)

```js
gtag('event', 'wa_click', {
  lead_intent: 'achat',
  zone: 'mermoz',
  event_id: crypto.randomUUID(),
});
```

### 9.2 Meta Pixel + même event_id

```js
fbq('trackCustom', 'wa_click', { /* params */ }, { eventID: event_id });
// CAPI server: same event_name + event_id
```

### 9.3 Naming campagne Ads

`meta | paid_social | est_vendeur_z1_m3 | crea_a`

---

## 10. Lien docs

| Doc | Rôle |
| --- | --- |
| [`09-kpis-marketing.md`](./09-kpis-marketing.md) | Définitions KPI / seuils |
| [`04-acquisition-paid.md`](./04-acquisition-paid.md) | UTM paid · Scale/Kill |
| [`08-growth-scorecard.md`](../plan-commercial/08-growth-scorecard.md) | Dashboard CAC |
| [`14-media-plan-acquisition.md`](./14-media-plan-acquisition.md) | Campagnes |

---

## 11. Sources

### Internes

KPI marketing · objectifs commercial · paid · launch · social WA · SEO.

### Externes

| Source | Insight |
| --- | --- |
| Meta — CAPI end-to-end | Setup **redondant** Pixel+CAPI · `event_id` dédup · leads CRM / lower funnel |
| Meta — CAPI + GTM server | Bridge GA4 → CAPI possible plus tard |
| Google — GA4 Measurement Protocol | Offline / server events en complément gtag |
| Pratique RE lead gen | WA = CRM truth · pixel = intent · optim sur Lead quali pas clic seul |

---

*Plan taggage & analytics v1.0 — sept. 2026. Prochain : `14-media-plan-acquisition.md`.*
