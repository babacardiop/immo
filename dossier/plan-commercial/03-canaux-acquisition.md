# Canaux d’acquisition — WhatsApp, SEO, partenaires, classifieds, ads

**Document :** Dossier · Plan commercial · 03  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-gtm-12-18-mois.md`](./01-gtm-12-18-mois.md) · [`02-zones-prioritaires.md`](./02-zones-prioritaires.md) · [`../modele-economique/04-unites-economiques.md`](../modele-economique/04-unites-economiques.md) §9 · [`../etude-de-marche/05-positionnement-mix-marketing.md`](../etude-de-marche/05-positionnement-mix-marketing.md)  
**Aval :** [`04-objectifs-kpi.md`](./04-objectifs-kpi.md) · [`08-growth-scorecard.md`](./08-growth-scorecard.md) · [`../organisation/06-culture-et-sla.md`](../organisation/06-culture-et-sla.md)

---

## 0. Synthèse — mix canaux Y1

| Canal | Rôle | Priorité | CAC relatif | Budget cash Y1 |
| --- | --- | ---: | --- | --- |
| **Réseau / SOI / referral** | Supply mandats + closings | **P0** | Très bas | Temps |
| **WhatsApp Business** | Capture + nurture + closing | **P0** | Bas | Setup + temps |
| **Site + SEO + outils** | Demand + supply vendeur | **P0** | Bas–moyen | Contenu 300 k/mois |
| **Partenaires P0** | Apports + reverse leads | **P0** | Bas / négatif net | Temps + conventions |
| **Classifieds** | Syndication **sélective** | **P1** | Variable | Boost léger |
| **Meta / Google Ads** | Accélérateur M3+ | **P1→P2** | Moyen–élevé | **200→400 k**/mois |
| Social organique (FB/IG) | Reach & preuves | **P1** | Bas | Temps CT/AC |

```
SOI / farming ──┐
SEO / simus ────┼──► WhatsApp Business ──► CRM ──► Mandat / Closing / Gestion
Partenaires ────┤                              └──► Apport partenaire
Classifieds ────┤
Ads (M3+) ──────┘
```

**Règles d’or**

1. **Tout lead** entre dans le **CRM société** (pas livre perso).  
2. **1ʳᵉ réponse WA &lt; 24 h** (cible &lt; 5 h) — sinon le canal meurt.  
3. **Paid = accélérateur**, pas base — stop si LTV:CAC &lt; **3:1** ou cash &lt; **6 M**.  
4. Classifieds = **vitrine de mandats**, pas marketplace open posting.  
5. Lead **paid** → exclusif exigé (`04` politique).

---

## 1. Matrice canal × persona × vague

| Canal | Marième (vendeuse) | Mamadou (terrain) | Fatou (diaspora) | Ousmane (bailleur) | Vague ON |
| --- | --- | --- | --- | --- | --- |
| SOI / farming Z1 | ★★★ | ★★ | ★ | ★★★ | V0 |
| Estimation site → WA | ★★★ | ★ | ★★ | ★★ | V0–V5 |
| SEO guides / outils | ★ | ★★★ | ★★★ | ★★ | V1+ |
| Partenaires | ★ | ★★★ | ★★ | ★ | V1+ |
| Classifieds | ★★ | ★★ | ★ | ★★ | V0+ |
| Meta Ads | ★★ | ★★ | ★★★ (FR) | ★ | M3+ |
| Google Search | ★★ | ★★★ | ★★ | ★ | M3+ |

---

## 2. WhatsApp Business — canal #1 conversion

### 2.1 Rôle

| Usage | Détail |
| --- | --- |
| **Capture** | CTA site, fiches, ads, Status, partenaires → **1 numéro Business société** |
| **Nurture** | Dossiers photo, TF scan (si OK), comparables, RDV |
| **Closing** | Négociation, relances, handoff notaire |
| **Ops** | Quittances early, tickets bailleur (V3) |

Bench Kolonell / digit. agences Dakar : diaspora et clients locaux **ferment sur WA**, pas email. Estimation gratuite → WA &lt; 2 h = lead magnet vendeur (ordre de grandeur marché : forte conversion visite → mandat si suivi serré).

### 2.2 Setup Y1

| Élément | Standard hub |
| --- | --- |
| Compte | **WhatsApp Business** société (pas perso agent seul) |
| Catalogue | Biens curated (app native OK Y1 ; API si &gt; 200 conv/mois ou 6+ users — Kolonell) |
| Réponses rapides | Templates `06` culture |
| Horaires | Affichés ; hors horaires = message auto + reprise J+1 |
| Attribution | Tag CRM : source (SEO / ads / partenaire / classified / SOI) |
| API Meta Cloud | **Pas J0** — app Business suffit lean |

### 2.3 SLA & métriques

| KPI | Cible |
| --- | ---: |
| 1ʳᵉ réponse | **&lt; 24 h** (≥ 90 %) · cible **&lt; 5 h** |
| Lead chaud (visite/offre) | **&lt; 1 h** ouvrées (aspiration) |
| Taux lead WA → RDV | **25–40 %** |
| Conversations / agent / j | Capacité réaliste — pas noyer AC1 |

### 2.4 Anti-patterns

| Interdit | |
| --- | --- |
| Promesse orale seule (taux, TF) | Tout écrit mandat / CRM |
| Blast spam hors fenêtre 24 h Meta | Templates approuvés seulement si API |
| Agent qui garde le lead simu | Handoff partenaire tracké |
| Multi-numéros personnels non loggés | Fuite livre |

---

## 3. SEO + site + outils — canal #1 CAC bas (M6+)

### 3.1 Architecture acquisition

| Surface | Job | CTA |
| --- | --- | --- |
| Catalogue / fiches Z1–Z2 | Demand | WA / visite |
| **Estimation vendeur** | **Supply** | Form → WA &lt; 2–24 h |
| `/outils` simus (V1) | Mamadou | `sim_complete` → partenaire / WA |
| Blog piliers | Confiance + SEO | Outil / diligence / Secure |
| Landings geo | « appart Mermoz », « terrain Keur Massar » | Catalogue filtré |

**Insight marché (Kolonell) :** le site convainc d’abord le **vendeur** (mandat) autant que l’acheteur — GTM **vendeur-first**.

Horizon réaliste : **4–6 mois** avant mandats SEO significatifs ; estimations via ads peuvent arriver dès S1 si paid ON.

### 3.2 Contenu P0 (aligné blog)

| Pilier | Persona | CTA |
| --- | --- | --- |
| TF vs bail vs délibération | Tous | Diligence / fiche |
| Coût construction Dakar | Mamadou | Simu construction |
| Guide diaspora / pas Wave vendeur | Fatou | Secure / inspection |
| Gestion proprio / reporting | Ousmane | Mandat gestion |
| Arrêt Dscos / zones | Mamadou / Fatou | Checklist |

Règle : **100 %** contenus avec CTA outil ou partenaire (`02` fiches CT).

### 3.3 Budget & CAC

| Poste | Montant |
| --- | ---: |
| Contenu / SEO (CT) | **~300 k**/mois |
| Outils (Search Console, etc.) | **~50 k** |
| CAC / closing organique (amorti M6+) | **150–500 k** (`04` UE) |

### 3.4 KPI SEO

| KPI | Cible Y1 |
| --- | ---: |
| Piliers indexés live | Selon calendrier Vague |
| Leads organiques / mois (M9+) | **20–60** hyp. |
| Closings attribués SEO | **≥ 3–5** / an (montée) |
| `sim_complete` | Track dès V1 |

---

## 4. Partenaires — double filet (CA + leads)

### 4.1 Rôles

| Flux | Description |
| --- | --- |
| **Hub → partenaire** | Lead simu / diligence → commission **apport** (CA Axe 4 prévisionnel) |
| **Partenaire → hub** | Reverse : client BTP/notaire besoin terrain/gestion |
| **Co-brand** | Contenu + confiance |

### 4.2 P0 à activer (Vague 1)

| Partenaire | Lead type | SLA rappel |
| --- | --- | ---: |
| Constructeur BTP | Post-simu construction | **48 h** |
| Architecte | Idem / standing | 48 h |
| Notaire | Closing / diaspora POA | 48 h |
| Formalités + géomètre (V2) | Pack Sécuriser | 48 h |
| Inspecteur (V4) | Diaspora Secure | 48 h |

Conventions écrites · taux · déclencheur · clause sortie (`partenaires.md`).

### 4.3 Objectifs

| KPI | Y1 |
| --- | ---: |
| Partenaires P0 live | **3** fin V1 · **5+** fin V2 |
| Apports encaissés | **8** × ~0,9 M = **7,2 M** CA |
| % leads partenaires rappelés &lt; 48 h | **&gt; 80 %** |
| Reverse leads → mandats | Track CRM (bonus) |

### 4.4 Règles

- Pas de page « écosystème complet » avant **3 partenaires live**.  
- Agent **n’invente pas** délais partenaire.  
- Lead simu **toujours** CTA partenaire tracké (sinon marge apport perdue).

---

## 5. Classifieds — syndication sélective

### 5.1 Principe

| On fait | On ne fait pas |
| --- | --- |
| Republier **nos** mandats curated | Open posting tiers |
| Expat-Dakar, CoinAfrique, FB Marketplace… **sélectif** | 20 portails sans tracking |
| Prix **unique** = catalogue hub | Multi-prix / multi-discours |
| Lien / WA hub | Laisser le lead mourir sur le portail |

### 5.2 Policy

| Règle | |
| --- | --- |
| Bien en exclusif | Syndication OK (contrôle discours) |
| Bien en simple | Syndication **limitée** ; risque fuite |
| Terrain &gt; seuil Vague 2 | Pas de boost sans diligence mini |
| Boost payant portail | **P2** — tester CPL vs Meta |

### 5.3 Cadence

| Action | Fréquence |
| --- | --- |
| Sync nouveaux mandats Z1 | Sous **48 h** publish hub |
| Refresh annonces actives | Hebdo |
| Retrait vendu / sous offre | **Jour même** |
| UTM / note CRM « source = Expat » | Toujours |

### 5.4 KPI

| KPI | Cible |
| --- | ---: |
| % stock Z1 syndiqué | **≥ 80 %** |
| Leads classified → closing | Mesurer ; si CAC &gt; Search → réduire boost |
| Annonces orphelines (vendu encore en ligne) | **0** |

---

## 6. Ads payants — Meta & Google

### 6.1 Timing & plafonds

| Période | Budget / mois | Condition GO |
| --- | ---: | --- |
| M1–M2 | **0** | Catalogue + WA + CRM d’abord |
| **M3–M6** | **200 000** | V1 live · LTV:CAC test |
| **M7–M12** | **400 000** | V4 diaspora · cash ≥ 8–10 M |
| Stop immédiat | — | Cash &lt; **6 M** **ou** LTV:CAC &lt; **3:1** 30 j |

Ordre de grandeur marché Kolonell (agences plus agressives) : Meta+Google **0,35–1,2 M**/mois — **au-dessus** de notre lean Y1 ; on reste discipliné.

### 6.2 Coûts media SN (repères)

| Canal | Indicateur | Fourchette |
| --- | --- | --- |
| Google Search immo | CPC | **150–300 FCFA** (premium ↑) |
| Meta lead gen | CPC | **120–400 FCFA** |
| Budget test min. Meta | / mois | **≥ 150 k** |
| Budget test min. Google | / mois | **≥ 100–350 k** |

### 6.3 CAC closing attendu (réaliste)

| Canal | CAC / closing hyp. |
| --- | ---: |
| Google Search | **0,4 – 1,5 M** |
| Meta (froid) | **0,8 – 2,5 M** |
| Meta **retarget** simu / site | Meilleur — prioriser |

### 6.4 Campagnes autorisées Y1

| Campagne | Objectif | Landing |
| --- | --- | --- |
| **Estimation vendeur** (Meta) | Supply mandats Z1 | Form → WA |
| **Simu terrain** (Meta/Google) | Mamadou | `/outils` |
| **Retarget** visiteurs simu / blog | Diligence / Secure | Pack / WA |
| **Diaspora FR** (Meta, M7+) | Fatou | Guide + Secure |
| Search « agence immobilière Dakar » / geo | Marque + demande | Site |

### 6.5 Campagnes interdites / différées

| Interdit Y1 | Motif |
| --- | --- |
| Lead gen froid « achète appart pas cher » mass | Qualité pourrie · CAC explosé |
| Boost classifieds + Meta sans UTM | Impossible d’arbitrer |
| Scale Meta avant exclusif process | Burn sur simples |
| TikTok ads volume | Pas prioritaire lean |

### 6.6 Créas & conversion

Checklist 3Vision-style (adaptée) :
1. Mobile-first · CTA **WhatsApp** visible  
2. Offre claire &lt; 10 s (estimation / simu / Secure)  
3. Preuve (licence, type papier, équipe)  
4. Formulaire **court** (ou clic WA direct)  
5. Suivi &lt; 24 h garanti  

### 6.7 KPI ads

| KPI | Fréquence | Seuil alerte |
| --- | --- | --- |
| CPL | Hebdo | &gt; 2× médiane 4 sem. |
| CAC / closing (canal) | Mensuel | &gt; plafond persona `04` UE |
| LTV:CAC | Mensuel | &lt; **3:1** → kill |
| % leads ads → exclusif | Mensuel | Si &lt; 50 % → revoir pitch |

---

## 7. Canaux complémentaires

### 7.1 Réseau / SOI / farming (P0 invisible)

| Action | Owner |
| --- | --- |
| 100 contacts gérant+AC1 chargés CRM J-30 | GER / AC |
| Annonce lancement réseau | GER |
| Farming Z1 Mermoz–Sacré-Cœur | AC |
| Referral post-closing (geste / avis Google) | AC |

**Cible qualitative :** une part croissante du CA en referral (bench US top teams 50–65 % — aspiration, pas Y1).

### 7.2 Social organique

| Canal | Usage |
| --- | --- |
| Instagram / Facebook | Share cards biens · checklists · preuves |
| WhatsApp Status | Biens du jour · dispo visite |
| LinkedIn | Études lab · B2B bailleurs / partenaires |
| TikTok | **Option** Y2 si bande passante |

Ton : expert, daté, **pas clickbait** (`blog/strategie`).

### 7.3 Bureau / physique

Signatures, confiance diaspora en visite SN, point d’ancrage Mermoz/Sacré-Cœur — **pas** un canal lead volume, un **closer** de confiance.

---

## 8. Attribution & tracking

| Source | Tag CRM obligatoire |
| --- | --- |
| `soi` | Réseau / farming |
| `seo` | Organique / blog |
| `simu` | Outil (sous-source partenaire si handoff) |
| `partner` | Reverse ou co |
| `expat` / `coin` / `fbmp` | Classified |
| `meta` / `google` | Ads + campagne ID |
| `referral` | Client existant |

**Événements analytics :** `sim_start`, `sim_complete`, `partner_lead`, `wa_click`, `estimation_request`, `mandat_signé`, `closing`.

Sans tag = lead **non arbitrable** → traité comme coût perdu pour le scorecard (`08`).

---

## 9. Budget acquisition consolidé Y1 (ordre)

| Poste | M1–M2 | M3–M6 | M7–M12 |
| --- | ---: | ---: | ---: |
| Contenu SEO | 300 k | 300 k | 300 k |
| Paid ads | 0 | **200 k** | **400 k** |
| Classifieds boost | 0–50 k | 50–100 k | 50–100 k |
| Outils / WA | ~150 k tech global | idem | idem |
| **Cash media+contenu** | ~300 k | ~500–600 k | ~750–800 k |

Hors : capex site Vague 0–1 · salaires AC (COGS split).

**Mix leads cible fin Y1 (indicatif) :**

| Source | Part leads qualifiés |
| --- | ---: |
| SOI + referral | **25–35 %** |
| SEO + simus | **25–35 %** |
| Classifieds | **15–25 %** |
| Ads | **10–20 %** |
| Partenaires reverse | **5–10 %** |

---

## 10. Playbook décision mensuelle

```
Pour chaque canal :
  1. CPL et CAC / closing (30 j)
  2. Qualité (% exclusifs, % go diligence)
  3. LTV:CAC vs seuil 3:1 / 4:1
  → Scale / Hold / Kill
```

| Signal | Action |
| --- | --- |
| SEO monte, ads CAC ↑ | Transférer budget → contenu + retarget |
| Classifieds leads junk | Couper boost · garder free sync |
| Partenaire SLA &lt; 80 % | Clause sortie · remplacer |
| WA &gt; 24 h | Stop ads jusqu’à SLA rétabli |

---

## 11. Checklist ouverture canal

### WhatsApp
- [ ] Business société · templates · CRM tag · SLA affiché  

### SEO
- [ ] Landings Z1 · 1 pilier + CTA · Search Console · estimation live  

### Partenaires
- [ ] Convention · taux · SLA 48 h · bouton / template WA  

### Classifieds
- [ ] Compte pro · sync process · UTM · retrait J0 vendu  

### Ads
- [ ] Pixel / tag · landing mobile WA · plafond budget · exclusif policy brief agents  

---

## 12. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`04-unites-economiques.md`](../modele-economique/04-unites-economiques.md) §9 | CAC / CPC / matrice priorité |
| [`05-previsionnel-36-mois.md`](../modele-economique/05-previsionnel-36-mois.md) | Budgets paid 200→400 k |
| [`05-positionnement-mix-marketing.md`](../etude-de-marche/05-positionnement-mix-marketing.md) | 7P Place / Promotion |
| [`06-culture-et-sla.md`](../organisation/06-culture-et-sla.md) | SLA WA & partenaires |
| [`02-zones-prioritaires.md`](./02-zones-prioritaires.md) | Geo farming & SEO |
| [`../../docs/blog/strategie.md`](../../docs/blog/strategie.md) | Piliers éditoriaux |

### Externes

| Source | Insight |
| --- | --- |
| Kolonell — site leads / digitalisation agence Dakar 2026 | Estimation→WA ; diaspora WA ; CPC ; budgets ; SEO 4–6 mois |
| 3Vision-Group — ads SN agences | Tunnel mobile + CTA WhatsApp |
| Keur-Immo — site agence SN | SEO long terme indispensable |
| PulseRevOps GTM brokerage | Speed-to-lead ; mix canaux (recalibré SN) |

---

*Canaux d’acquisition v1.0 — sept. 2026. Prochain : `04-objectifs-kpi.md`.*
