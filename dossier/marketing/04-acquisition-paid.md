# Acquisition paid — Budget, créas, ciblage diaspora

**Document :** Dossier · Marketing · 04  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`../plan-commercial/03-canaux-acquisition.md`](../plan-commercial/03-canaux-acquisition.md) · [`../plan-commercial/08-growth-scorecard.md`](../plan-commercial/08-growth-scorecard.md) · [`../plan-commercial/01-gtm-12-18-mois.md`](../plan-commercial/01-gtm-12-18-mois.md) · [`02-personas-messages.md`](./02-personas-messages.md) · [`01-brand-guidelines.md`](./01-brand-guidelines.md) · [`03-plan-contenu.md`](./03-plan-contenu.md)  
**Aval :** [`14-media-plan-acquisition.md`](./14-media-plan-acquisition.md) · Ads Manager · pixel/CAPI · scorecard mensuelle

> **Thèse Y1 :** paid = **accélérateur**, pas la base. SOI + SEO + curated d’abord.  
> Plafonds lean : **0 → 200 k → 400 k**/mois — sous les budgets « agence agressive » Kolonell (0,35–1,2 M).

---

## 0. Synthèse

| Phase | Budget media / mois | GO condition |
| --- | ---: | --- |
| **M1–M2** | **0** | Catalogue + WA + CRM + 1 pilier |
| **M3–M6** | **200 000** FCFA | V1 simus live · SLA ≥ 90 % · cash ≥ 8 M |
| **M7–M12** | **400 000** FCFA | V4 diaspora · LTV:CAC test OK · cash ≥ 10 M |
| **Kill** | 0 | Cash &lt; **6 M** · LTV:CAC &lt; **3:1** 30 j · SLA WA rouge |

**Mix leads ads cible fin Y1 :** **10–20 %** des leads qualifiés (pas plus).

---

## 1. Principes non négociables

| # | Règle |
| --- | --- |
| 1 | **Click-to-WhatsApp** prioritaire (SN + diaspora) — forms seulement si qualifiés |
| 2 | **1 persona / ad set** — pas de fourre-tout |
| 3 | UTM + tag CRM `meta` / `google` + `campaign_id` **100 %** |
| 4 | Lead ads → suivi humain **&lt; 24 h** (cible 5 h) — sinon stop spend |
| 5 | Lead paid vente → pitch **exclusif** (≥ 50 % exclusifs sinon revoir créa, pas scale) |
| 6 | Claims = brand `01` (pas Wave vendeur, pas délibération = TF) |
| 7 | Retarget **avant** scale froid |
| 8 | Pixel + (dès possible) événement `wa_click` / `sim_complete` / `estimation_request` |

---

## 2. Budget & répartition

### 2.1 Enveloppe M3–M6 (200 k)

| Campagne | Part | FCFA | Objectif |
| --- | ---: | ---: | --- |
| **Estimation vendeur** (Meta) | 35 % | **70 k** | Supply Z1 |
| **Simu / terrain** (Meta) | 30 % | **60 k** | Mamadou |
| **Retarget** site/simu/blog | 25 % | **50 k** | Diligence / WA |
| **Google Search** brand + geo | 10 % | **20 k** | Demande active (test) |
| **Total** | 100 % | **200 k** | |

*Sous 150 k Meta seul = learning difficile — d’où concentration sur 2–3 ad sets max.*

### 2.2 Enveloppe M7–M12 (400 k)

| Campagne | Part | FCFA | Objectif |
| --- | ---: | ---: | --- |
| Estimation vendeur SN | 20 % | 80 k | Supply |
| Simu / terrain SN | 15 % | 60 k | Mamadou |
| **Diaspora FR/EU** (Meta) | **30 %** | **120 k** | Fatou Secure |
| Retarget (tous) | 20 % | 80 k | Warm |
| Google Search | 15 % | 60 k | Intent |
| **Total** | 100 % | **400 k** | |

### 2.3 Benchmarks coûts (repères SN 2026)

| Canal | Métrique | Fourchette |
| --- | --- | --- |
| Google Search immo | CPC | **150–300** FCFA |
| Meta | CPC | **120–400** FCFA |
| Google Search (CAC closing) | | **0,4–1,5 M** |
| Meta froid (CAC closing) | | **0,8–2,5 M** |
| Meta retarget | | Meilleur CAC — prioriser |

Sources : Kolonell CPC SN · canaux hub `03`.

### 2.4 Seuils Scale / Hold / Kill

| Signal | Action |
| --- | --- |
| LTV:CAC ≥ **4:1** · SLA OK · cash ≥ 10 M | **Scale** +20–30 % |
| LTV:CAC 3–4:1 | **Hold** · tester créa |
| LTV:CAC &lt; **3:1** 30 j | **Kill** campagne |
| CPL &gt; 2× médiane 4 sem. | Pause ad set · refresh créa |
| % exclusifs ads &lt; 50 % | Stop scale · coach pitch |
| SLA WA &lt; 75 % | **Stop all paid** |

---

## 3. Structure comptes

### 3.1 Meta (FB + IG)

```
Compte Business EverGreen
└─ Campagne [Objectif]
   ├─ Ad set Persona × Geo
   │  └─ 2–3 créas (A/B)
```

| Objectif Meta Y1 | Usage |
| --- | --- |
| **Messages** / Click-to-WhatsApp | Défaut SN + diaspora |
| **Traffic** landing `/outils` ou estimation | Simu · guide |
| **Leads** Instant Form | Uniquement + 2–3 questions qualif + SLA &lt; 15–60 min |
| Awareness large | **Non** Y1 (budget trop petit) |

### 3.2 Google Ads

| Type | Keywords exemples | Landing |
| --- | --- | --- |
| Brand | ever green immo · nom agence | Home |
| Demand geo | agence immobilière Dakar · terrain à vendre Mermoz | Catalogue / zone |
| Intent simu | acheter terrain Sénégal mensualité · coût construction maison Sénégal | `/outils` |
| Diaspora Search (M7+) | acheter terrain Sénégal depuis France · arnaque immobilier Sénégal | D1 / Secure |

**Négatifs :** emploi, gratuit pure, hors SN non ciblé, « TeleDAc magique ».  
**Géo M3–6 :** Dakar + Z1 (Mermoz, Almadies, Ngor, Sacré-Cœur, Point E…) — fencing pour baisser coût (Kolonell).

---

## 4. Ciblage par persona

### 4.1 Marième — Vendeuse (Meta, dès M3)

| | |
| --- | --- |
| **Geo** | Dakar · rayons Z1–Z2 |
| **Âge** | 30–65 |
| **Intérêts / comportements** | Propriété immobilière · déménagement · investissement · (lookalike clients si data) |
| **Exclusions** | Locataires purs si possible · audiences engagé simu acheteur |
| **Langue** | FR |
| **Objectif** | WA « estimation gratuite écrite » |

### 4.2 Mamadou — Primo terrain (Meta + Google)

| | |
| --- | --- |
| **Geo** | Dakar + banlieue Est / couronne selon stock |
| **Âge** | 28–50 |
| **Intérêts** | Terrain · construction · crédit · Wave (prudent) |
| **Creative angle** | Simu mensualité · TF vs délibération |
| **Landing** | `/outils` ou fiche terrain + WA |

### 4.3 Fatou — **Diaspora** (Meta M7+, prep audiences M5–6)

*40–60 % premium Dakar financé diaspora (Kolonell) — campagne séparée, pas mélangée au local.*

| Paramètre | Setting |
| --- | --- |
| **Geo** | France (Île-de-France + Lyon/Marseille/Lille) · Belgique · (test US/CA plus tard) |
| **Âge** | 28–55 |
| **Langue** | Français |
| **Signaux** | Intérêts Sénégal / Afrique / investissement immobilier / diaspora ; comportements voyage SN ; engagé contenus D1/A4 |
| **Exclusions** | Audiences « looking for job » · tourists only si possible |
| **Split** | Ad set FR vs BE (budgets séparés) |
| **Objectif** | **Click-to-WhatsApp** (fuseau : diffuser soir FR / matin Dakar backup) |
| **Message** | *Avant de payer, on vérifie* · séquestre · pas Wave vendeur |
| **Landing** | Guide D1 / Pack Secure · protocole PDF |
| **Qualif form** (si form) | Budget bande · délai · sur place/remote · usage (famille/locatif) |

**Interdit diaspora ads :** « Paie maintenant pour bloquer » · prix −50 % sans papier · cousin unique glorifié.

### 4.4 Retarget (tous)

| Audience | Fenêtre | Message |
| --- | --- | --- |
| Visiteurs `/outils` sim_start | 30 j | Finis ta simu / WA lecture |
| Visiteurs blog A1/A4/D1 | 30 j | Checklist / Secure |
| Engagés vidéo ≥ 50 % | 14 j | CTA WA |
| Leads WA non clos | CRM hors Meta + nurture organique | — |

Budget retarget = **meilleur ROI** — ne jamais le couper en premier.

---

## 5. Créas — do / don’t & bank

### 5.1 Règles créatives (mobile-first)

| Do | Don’t |
| --- | --- |
| Hook &lt; 3 s · offre claire &lt; 10 s | Roman 30 s sans CTA |
| CTA **WhatsApp** visible | « En savoir plus » vague seul |
| Preuve : type papier · process · équipe | Stock villa Dubai |
| 1 persona / créa | « Tout le monde immo » |
| UGC / photo terrain SN réelle | Gloss render mensonger |
| Disclaimer si délibération | « TF » faux |

### 5.2 Angles créa par campagne

| Campagne | Angle A | Angle B | Angle C |
| --- | --- | --- | --- |
| Estimation | « Un prix, pas cinq annonces » | Reporting WA bi-mensuel | Filtrage curieux |
| Simu | « Tu peux payer ce terrain ? » | Terrain + maison = budget total | TF vs délibération |
| Diaspora | « Pas de Wave au vendeur » | Protocole 5 points | Inspection + séquestre |
| Retarget | « Ta simu t’attend » | Checklist avant paiement | Secure forfait |

### 5.3 Formats priorisés Y1

| Format | Priorité |
| --- | :---: |
| Story / Reels 15–20 s + sticker WA | ●● |
| Carrousel 3 cartes (problème → preuve → CTA) | ●● |
| Image statique pastille papier + prix | ● |
| Instant Form + 3 questions | ◐ (si SLA rapide) |
| Lead magnet PDF | ● diaspora |

### 5.4 Copy frames (exemples)

**Estimation (Marième)**
```
Votre bien à [quartier] mérite un seul discours prix.
Estimation écrite + mandat curated — on filtre les curieux.
WhatsApp → [lien]
```

**Simu (Mamadou)**
```
Avant le coup de cœur : ta mensualité + le coût de la maison.
Simulateur gratuit · on lit aussi tes papiers (TF / bail / délibération).
```

**Diaspora (Fatou)**
```
Acheter au Sénégal depuis la France sans envoyer de Wave au vendeur.
Vérification → séquestre notaire → (gestion).
Protocole WhatsApp → [lien]
```

---

## 6. Funnel conversion paid

```
Ad (Meta/Google)
  → WA Business  OU  Landing mobile
  → Accusé auto &lt; 2 min
  → Humain &lt; 24 h (tag source=meta/google)
  → Qualif persona (scripts 02 / 05)
  → RDV / simu / Secure / estimation
  → CRM stage + event analytics
```

| Étape | Owner | KPI |
| --- | --- | --- |
| Créa / budget | CT | CPL · CTR |
| Réponse WA | AC | FRT &lt; 24 h |
| Qualité | AC + GER | % exclusif / % GO diligence |
| Arbitrage | GER | Scale/Hold/Kill mensuel |

**Lead form → WA :** message auto « Bien reçu — on revient sous 24 h · budget + zone ? »

---

## 7. Tracking & conformité

### 7.1 Tags obligatoires

| Param | Exemple |
| --- | --- |
| `utm_source` | meta · google |
| `utm_medium` | paid_social · cpc |
| `utm_campaign` | est_vendeur_m3 · dia_fr_m7 · simu_terrain |
| `utm_content` | crea_a · crea_b |
| CRM | `source` + `campaign_id` + `persona_guess` |

### 7.2 Events (cible)

`wa_click` · `estimation_request` · `sim_start` · `sim_complete` · `secure_interest` · `mandat_signé` · `closing`

Optimiser Meta sur **événements qualifiés** dès que volume le permet — pas seulement clics.

### 7.3 Légal / brand

- Mentions marque EverGreen · pas de rendement garanti  
- Diaspora : pas d’incitation paiement vendeur  
- Photos biens = mandats actifs seulement  
- RGPD / consent Meta lead forms EU (diaspora FR)  

---

## 8. Calendrier d’activation

| Mois | Action paid |
| --- | --- |
| M1–M2 | Pixel · catalogue events · audiences pixel · **0 spend** |
| M3 | Soft GO 200 k · estimation + simu + retarget micro |
| M4–M6 | Optim créas · Google Search léger · kill sets morts |
| M5–M6 | Construire audiences engagé contenu D1/A4 (warm diaspora) |
| M7 | **ON diaspora FR** 120 k dans enveloppe 400 k |
| M8–M12 | Scale si LTV:CAC · sinon Hold retarget + SEO |

---

## 9. Checklist GO campagne

- [ ] SLA WA ≥ 90 % dernières 2 sem.  
- [ ] Cash ≥ seuil phase  
- [ ] Landing / WA testé mobile  
- [ ] UTM + CRM tag prêts  
- [ ] Créas brand-compliant (`01`)  
- [ ] Plafond journalier = mensuel / 30  
- [ ] Agents briefés exclusif sur leads paid  
- [ ] Scorecard ligne Meta/Google ouverte  

---

## 10. Reporting

| Fréquence | Contenu |
| --- | --- |
| **Hebdo** | Spend · CPL · leads taggés · FRT (H14 scorecard) |
| **Mensuel** | CAC closing · LTV:CAC · % exclusifs ads · Scale/Hold/Kill |

Template décisions : `08-growth-scorecard` bloc B.

---

## 11. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`03-canaux-acquisition.md`](../plan-commercial/03-canaux-acquisition.md) | Plafonds · CPC · campagnes autorisées |
| [`08-growth-scorecard.md`](../plan-commercial/08-growth-scorecard.md) | LTV:CAC · stop ads |
| [`02-personas-messages.md`](./02-personas-messages.md) | Hooks · CTA |
| [`01-brand-guidelines.md`](./01-brand-guidelines.md) | Claims interdits |
| [`03-plan-contenu.md`](./03-plan-contenu.md) | Warm audiences blog |

### Externes

| Source | Insight |
| --- | --- |
| Kolonell — Google Ads SN 2026 / site leads Dakar | CPC 150–300 · budgets 0,35–1,2 M · diaspora 40–60 % premium · WA |
| Meta RE playbooks (UAE/India/diaspora) | Split geo diaspora · CTWA · qualif forms · retarget · CAPI |
| Arcad / Cocoon Immo — FB ads vendeurs | Estimation funnel · Meta interrupt vs Google intent |
| SABMA — Meta Ads SN | Budget pub ≠ frais gestion · mobile-first Dakar |

---

*Acquisition paid v1.0 — sept. 2026. Prochain : `05-seo-sem.md`.*
