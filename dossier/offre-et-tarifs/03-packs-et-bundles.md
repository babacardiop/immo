# Packs & bundles — par vague

**Document :** Dossier · Offre & tarifs · 03  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-catalogue-offres.md`](./01-catalogue-offres.md) · [`02-grille-tarifs.md`](./02-grille-tarifs.md) · [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) · [`../../docs/add-ons.md`](../../docs/add-ons.md)  
**Aval :** [`04-politique-commerciale.md`](./04-politique-commerciale.md)

---

## 0. Synthèse

Les **bundles** sortent **vague par vague** : on n’annonce pas l’écosystème avant que les briques soient live. Chaque bundle = **parcours client** (outcome) + composants F/A/P/C + **prix** + KPI de go/no-go.

| Vague | Bundle commercial phare | Prix hub (ordre) | Monétisation principale |
| --- | --- | ---: | --- |
| **V0** | Socle Agence (pas un pack payant) | — | Commissions axes 1 & 4 |
| **V1** | **Décider Terrain** (+ Terrain→Maison soft) | Outils **0** | Apports BTP/archi/notaire |
| **V2** | **Sécuriser** / Terrain Serein | **150–400 k** | Forfait + apports formalités |
| **V3** | **Louer & Gérer** | 1 mois + **8 %** | Entrée + récurrent |
| **V4** | **Diaspora Secure** | **300–800 k** | Forfait (+ gestion) |
| **V5** | **Vendre Mieux** (estimation) | Outils **0** | Mandats exclusifs |
| **V6** | **Bâtir & Confort** | Leads / devis | Apports énergie + chantier |
| **V7** | **Confort+** satellites | Commissions | Annexes |
| **V8+** | Selectif / Full | Sur devis | Si KPI OK |

**Règle roadmap :** max **3–5 add-ons** + **2–3 partenaires** + **1–2 contenus** par vague — pas 20 d’un coup.

---

## 1. Méthode bundling

Alignée GTM packaging (introduction → expansion → optimisation) :

| Phase | Action EverGreen |
| --- | --- |
| **Introduction** | Bundle minimal testable (V0–V1) |
| **Expansion** | Cross-sell (V2 diligence → V1 simu ; V4 sur V1–V2) |
| **Optimisation** | Couper attach rate faible ; upsell Full |

Chaque bundle répond à 3 questions (Hillock) :
1. **Pour qui ?** (persona)  
2. **Quel résultat ?** (outcome)  
3. **Pourquoi ce prix / ce moment ?** (vague)

**Types utilisés :**
- **Pure** : composants seulement ensemble (ex. Diaspora Secure)  
- **Mixed** : dispo à la carte **ou** pack (ex. diligence)  
- **Tiered** : Secure → Full  
- **Partner-led** : hub orchestre, partenaire facture  

---

## 2. Légende composants

| Code | Nature |
| --- | --- |
| **F** | Feature produit cœur |
| **A** | Add-on / outil |
| **P** | Partenaire contractualisé |
| **C** | Contenu blog / guide |
| **$** | Ligne tarif `02` |

---

## 3. Bundles Vague 0 — Socle

**Nom interne :** *Agence Live*  
**Outcome :** « L’agence existe en ligne, crédible, curated. »  
**Persona :** tous (porte d’entrée)  
**Fenêtre :** S0–6  

| Inclus | Type |
| --- | --- |
| Site catalogue + fiche + WA | F |
| Mandats curated · facets TF/bail/délibération | F |
| Portail agent minimal | F |
| Page « Comment on travaille » + teaser TF vs bail | C |

| Prix | Monétisation |
| --- | --- |
| Pas de pack payant | **Axe 1** commission · mise en loc **1 mois** |

**Hors scope :** simus, diligence packagée, diaspora.  
**Gate Done :** ≥ N mandats en ligne · SLA WA &lt; 24 h · % fiches avec type papier.

---

## 4. Bundles Vague 1 — Décider Terrain

**Nom commercial :** **Bundle Décider** (lead magnet) + soft **Terrain→Maison**  
**Outcome :** *Je vois si je peux payer et combien coûtera la maison — je parle à un pro.*  
**Persona :** Mamadou · Fatou exploratrice  
**Fenêtre :** M1–2  

### 4.1 Bundle Décider (gratuit)

| Inclus | Type |
| --- | --- |
| Simu mensualité (étalé / loc-vente) | A · $0 |
| Simu construction | A · $0 |
| Simu budget total | A · $0 |
| Page `/outils` + embeds fiche terrain | A/F |
| CTA constructeur / archi / notaire | P |
| Piliers blog construction + TF vs bail | C |

**Monétisation :** commissions **apport** (BTP 2–5 %, archi, notaire 50–200 k) — pas de frais outil.

### 4.2 Soft Pack Terrain→Maison

| Inclus | Type |
| --- | --- |
| Sortie simu construction + shortlist 1–2 constructeurs / archi | A+P |
| Checklist permis (légère) | A |
| Forfait conseil hub (option) | $ **0–150 k** |

**Attach :** après simu_complete ou réservation étalé.  
**Gate Done Vague 1 :** 3 partenaires P0 live · sim_complete tracké · 1ʳᵉ commission apport.

**Hors scope V1 :** caution, solaire, marketplace matériaux.

---

## 5. Bundles Vague 2 — Sécuriser

**Nom commercial :** **Pack Sécuriser** · alias **Terrain Serein** (si + bornage + simu)  
**Outcome :** *Avant de payer : papiers lus, go/no-go clair.*  
**Persona :** acheteur terrain · diaspora  
**Fenêtre :** M3–4  

### 5.1 Pack Sécuriser (mixed)

| Inclus hub | Type | Tarif |
| --- | --- | ---: |
| Checklist diligence (EDR/NICAD/régime) | A | Inclus forfait |
| Orientation / orchestration dossier | Ops | |
| Calculateur frais d’acquisition | A · $0 | Lead |
| Lead formalités + géomètre + notaire | P | Apport |
| Contenu arnaques / Arrêt Dscos | C | $0 |
| **Forfait orchestration hub** | $ | **150–400 k** |

Prestations partenaires (bornage, formalités) = **au réel**, hors forfait hub.

### 5.2 Bundle Terrain Serein (expansion)

Sécuriser + bornage lead + rappel simu construction/budget (V1) — pour checkout / réservation terrain.

**Policy :** pas de boost listing terrain &gt; seuil sans diligence mini.  
**Gate :** diligences lancées · % go/no-go documentés · formalités &gt; 0.

---

## 6. Bundles Vague 3 — Louer & Gérer

**Nom commercial :** **Bundle Bailleur** / **Bundle Locataire**  
**Outcome :** *Louer sans friction ; encaisser en récurrent.*  
**Persona :** Ousmane / Ibrahima · Aïssatou  
**Fenêtre :** M5–6  

### 6.1 Bundle Mise en location

| Inclus | $ |
| --- | ---: |
| Annonce + visites + sélection + bail + EDL | **1 mois** de loyer |
| EDL digital (si live) | Inclus |
| CTA assurance / caution | Apport P |

### 6.2 Bundle Gestion Standard

| Inclus | $ |
| --- | ---: |
| Encaissement Wave/OM · quittances · relances · portails | **8 %** loyers encaissés |
| Reporting mensuel simple | Inclus |

### 6.3 Bundle Gestion Diaspora (tier)

| Inclus | $ |
| --- | ---: |
| Gestion Standard + reporting renforcé | **9–10 %** **ou** 8 % + forfait 50–100 k |

**Règle attach :** ≥ **50 %** des mises en loc → proposition gestion (`01`/`02` fiches).  
**Gate :** mandats gestion ON · % loyers digitaux · Ops M7 prêt.

---

## 7. Bundles Vague 4 — Diaspora

**Nom commercial :** **Diaspora Secure** → **Diaspora Full** (tier)  
**Outcome :** *Acheter / construire depuis l’étranger sans Wave au vendeur.*  
**Persona :** Fatou  
**Fenêtre :** M7–8  

### 7.1 Diaspora Secure (pure bundle)

| Inclus | Type | $ |
| --- | --- | ---: |
| Inspection à distance | A+P | Inclus forfait |
| Diligence (lien V2) | A+P | Inclus / co |
| Protocole paiement / anti-Wave vendeur | Process | Inclus |
| Reporting photo / statut | Ops | Inclus |
| Contenu pilier diaspora | C | $0 |
| **Forfait** | | **300–800 k** |

**Options à la carte :** procuration (+100–250 k si hors forfait) · multi-devise info.

### 7.2 Diaspora Full (upsell)

Secure + escrow/séquestre notaire + suivi chantier + multi-devise — **sur devis** (≥ ~1 M typ.).  
**Condition :** Secure vendu / NPS OK — pas de Full en cold open.

**Gate V4 :** inspections commandées · % closings diaspora avec séquestre.

---

## 8. Bundles Vague 5 — Gros tickets

**Nom commercial :** **Bundle Vendre Mieux**  
**Outcome :** *Estimation propre → mandat exclusif → ticket lourd.*  
**Persona :** Marième · investisseur  
**Fenêtre :** M9–10  

| Inclus | Type | $ |
| --- | --- | ---: |
| Estimation vendeur | A | **0** → mandat |
| Épargne construction / jauge (si live) | A | Lead |
| Co-acquisition familiale (si live) | A | Sur devis |
| Courtier crédit / financier | P | Apport |
| Contenu budget total | C | $0 |

**Monétisation :** commissions **Axe 1** (5–7 % exclusif) + success fees partenaires.  
**Gate :** estimation→mandat · tickets &gt; seuil.

---

## 9. Bundles Vague 6 — Bâtir & Confort

**Nom commercial :** **Bundle Chantier** / **Pack Confort**  
**Outcome :** *Terrain acheté → prêt à bâtir / habiter confortable.*  
**Persona :** Mamadou post-closing · bailleur rénov  
**Fenêtre :** M11–12  

| Inclus | Type | $ |
| --- | --- | ---: |
| Simu terrain nu → prêt à bâtir | A · $0 | Lead |
| Checklist permis / CU | A | Lead |
| Suivi chantier léger | A+P | Forfait / apport |
| Pack clim + kit solaire (leads) | A+P | Commission énergie |
| Contenu autorisation construire | C | $0 |

**Attach :** post Pack Terrain→Maison ou post Axe 1/2 terrain.  
**Gate :** leads énergie · suivis chantier actifs.

---

## 10. Bundles Vague 7 — Satellites

**Nom commercial :** **Hub+** (à la carte, pas un mega-pack)  
**Fenêtre :** M13–15  

| Satellite | $ hub |
| --- | --- |
| Home staging / photo | Commission P |
| Déménagement / remise clés | Commission P |
| Reporting fiscal proprio | Apport expert |
| Comparateur frais / carte prix | $0 lead |

**Règle :** densifier **autour** du client existant — pas nouveau métier.  
**Gate :** GMV annexes · renewals.

---

## 11. Vague 8+ — Bundles conditionnels

Ouvrir **seulement** si V1–V7 KPI OK (`hub-roadmap`) :

| Bundle candidat | Condition |
| --- | --- |
| Location saisonnière / meublé | Stock + conciergerie |
| Marketplace maintenance | Volume gestion + chantier |
| White-label réseau | 2+ villes |
| Co-marketing promoteur | Programme TF sécurisé |

Sinon : **approfondir** V1–V4 (2ᵉ constructeur, meilleure conversion Secure).

---

## 12. Matrice Vague × Bundle × Persona

| Bundle | V0 | V1 | V2 | V3 | V4 | V5 | V6 | Persona #1 |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | --- |
| Agence Live | ● | | | | | | | Tous |
| Décider / Terrain→Maison | | ● | ○ | | | | ○ | Mamadou |
| Sécuriser / Serein | | | ● | | ○ | | | Acheteur terrain |
| Louer & Gérer | | | | ● | ○ | | | Bailleur |
| Diaspora Secure/Full | | | ○ | ○ | ● | | ○ | Fatou |
| Vendre Mieux | ○ | | | | | ● | | Marième |
| Chantier & Confort | | | | | | | ● | Post-terrain |

○ = cross-sell possible · ● = vague d’introduction.

---

## 13. Parcours d’upsell (attach paths)

```
V0 catalogue
 └─► V1 Décider (simu)
      ├─► V2 Sécuriser ──► closing Axe 1/2
      │         └─► V4 Diaspora Secure (si extérieur)
      └─► Terrain→Maison ──► apport BTP ──► V6 Chantier/Confort

V0/V3 mise en loc ──► Gestion 8 % ──► Gestion Diaspora 9–10 %

V5 Estimation ──► Mandat exclusif ──► (+ Sécuriser si terrain)
```

**Talk track agents :** parler **outcome** (« avant de payer ») pas liste de features.

---

## 14. KPI bundles (revue trimestrielle)

| KPI | Cible indicative |
| --- | --- |
| Attach rate mise en loc → gestion | **≥ 50 %** |
| Simu_complete → lead partenaire | Tracké V1 |
| Pack Sécuriser / closing terrain | ↑ |
| Diaspora Secure / closing diaspora | ↑ |
| Revenu forfaits / CA total Y1 | Faible mais **preuve** |
| Bundles à attach &lt; 5 % après 90 j | **Prune** ou repackage |

---

## 15. Règles go-to-market

1. **Ne pas** publier page « Pack Diaspora Full » avant V4 Done Secure.  
2. **Ne pas** vendre Sécuriser sans partenaire formalités/géomètre joignable &lt; 48 h.  
3. Outils toujours **gratuits** ; pack = orchestration humaine.  
4. Prix packs = fourchettes `02` — devis si Full / chantier.  
5. Chaque vague : **1** bundle phare max en com marketing.  
6. Budget ouverture vague : ≤ 3–5 add-ons (`hub-roadmap`).

---

## 16. Sources

### Internes

- [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) — V0→V8+  
- [`../../docs/add-ons.md`](../../docs/add-ons.md) — Starter Terrain, Diaspora Secure/Full, P0  
- [`01-catalogue-offres.md`](./01-catalogue-offres.md) · [`02-grille-tarifs.md`](./02-grille-tarifs.md)  
- [`../../docs/partenaires.md`](../../docs/partenaires.md)  

### Externes

| Source | Usage |
| --- | --- |
| Zigpoll / Hillock — bundling roadmap | Intro → expand → optimize · outcome-based |
| Prospeo / GTM Labs — packaging GTM | Gates, phases, enablement |

---

*Packs & bundles v1.0 — sept. 2026. Remises / exclusivité → `04`.*
