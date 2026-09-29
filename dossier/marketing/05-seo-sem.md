# SEO & SEM — Keywords, clusters, briefs landing

**Document :** Dossier · Marketing · 05  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`03-plan-contenu.md`](./03-plan-contenu.md) · [`04-acquisition-paid.md`](./04-acquisition-paid.md) · [`../../docs/blog/strategie.md`](../../docs/blog/strategie.md) · [`../plan-commercial/02-zones-prioritaires.md`](../plan-commercial/02-zones-prioritaires.md) · [`../plan-commercial/03-canaux-acquisition.md`](../plan-commercial/03-canaux-acquisition.md) · [`02-personas-messages.md`](./02-personas-messages.md)  
**Aval :** [`15-strategie-seo.md`](./15-strategie-seo.md) (CdC technique) · Search Console · landings Next.js · briefs MDX

> **Volumes :** indicatifs (pas d’export GSC/Ahrefs live) — valider J0 avec Search Console + Keyword Planner.  
> **Horizon :** SEO utile **M6+** ; SEM Search = filet intent dès M3 (budget léger).  
> **Règle :** cluster hub–spoke–bridge · 100 % pages → CTA WA / outil / catalogue.

---

## 0. Synthèse

| | |
| --- | --- |
| **Architecture** | 5 hubs éditoriaux (A–E) + **silo geo Z1** + money pages (catalogue / estimation / outils) |
| **Priorité Y1** | Confiance (TF/bail) · terrain/simu · diaspora · geo Mermoz–Almadies–Ngor |
| **SEM Search** | Brand + geo + intent simu — **pas** scale Display |
| **Moat** | Guide long + **outil** + **catalogue curated** (≠ Nadia volume creux) |

---

## 1. Intent & mapping page types

| Intent | Exemple requête | Type page | CTA |
| --- | --- | --- | --- |
| **Informational** | titre foncier vs bail Sénégal | Pilier blog | Diligence / filtre |
| **Commercial investigation** | agence immobilière Dakar diaspora | Landing confiance / about | WA |
| **Transactional** | terrain titre foncier Mermoz à vendre | Catalogue / fiche / landing geo | Visite WA |
| **Navigational** | EverGreen immo · nom agence | Home / brand SEM | — |
| **Tool** | coût construction maison Sénégal m² | `/outils` + pilier B2 | sim_complete |

**Formule keyword SN (Cyril Jarnias / Kolonell) :**  
`[type bien] + [transaction] + [quartier/ville] + [attribut]`  
ex. `villa piscine Ngor` · `terrain constructible Diamniadio` · `appartement meublé Mermoz`.

---

## 2. Clusters thématiques (hub → spokes)

### Cluster A — Sécuriser l’achat *(autorité confiance)*

| Rôle | URL cible | Keyword primaire | Secondaires |
| --- | --- | --- | --- |
| **Hub** | `/guides/securiser-achat-senegal` | sécuriser achat immobilier Sénégal | vérifier titre foncier |
| Spoke | `/blog/titre-foncier-vs-bail-vs-deliberation` **(A1)** | titre foncier vs bail Sénégal | délibération ≠ titre · domaine national |
| Spoke | `/blog/documents-fonciers-senegal` **(A2)** | documents fonciers Sénégal NICAD | EDR · plan cadastral |
| Spoke | `/blog/etat-des-droits-reels-senegal` **(A3)** | état des droits réels Sénégal | Conservation foncière EDR |
| Spoke | `/blog/arnaques-immobilier-senegal` **(A4)** | arnaque immobilier Sénégal WhatsApp | red flags diaspora |
| Spoke | `/blog/frais-notaire-senegal` **(A5)** | frais notaire Sénégal 2026 | droits enregistrement |
| Spoke | `/blog/bornage-terrain-senegal` **(A6)** | bornage terrain Sénégal | géomètre |
| Spoke | `/guides/glossaire-foncier` **(A7)** | glossaire foncier Sénégal | NICAD DGSCOS Yastal |

**Bridge :** A1 ↔ A4 ↔ D1 · A3 ↔ checklist paiement.

### Cluster B — Terrains & construction

| Rôle | URL | KW primaire | Secondaires |
| --- | --- | --- | --- |
| **Hub** | `/guides/terrains-construction-senegal` | acheter terrain construire Sénégal | budget maison |
| Spoke | `/blog/acheter-terrain-senegal-2026` **(B1)** | acheter terrain Sénégal guide | erreurs à éviter |
| Spoke | `/blog/cout-construction-maison-senegal` **(B2)** | coût construction maison Sénégal m² | prix m² Dakar |
| Spoke | `/blog/budget-total-terrain-maison` **(B3)** | budget terrain + construction Sénégal | frais annexes |
| Spoke | `/blog/autorisation-construire-senegal` **(B4)** | permis construire Sénégal mairie | délais AC · pas TeleDAc magique |
| Spoke | `/blog/arret-dscos-zones` **(B4b)** | Arrêt Dscos Sénégal | contentieux occupation |
| Spoke | `/blog/vente-etalee-terrain` **(B6)** | payer terrain plusieurs fois Sénégal | mensualité terrain |
| Spoke | `/outils/mensualite` · `/outils/construction` · `/outils/budget` | (tool intent) | simuler mensualité terrain |

### Cluster C — Louer & gérer *(M5+)*

| Spoke | KW primaire |
| --- | --- |
| C1 Louer Dakar | louer appartement Dakar caution bail |
| C2 EDL | état des lieux location Dakar |
| C4 Gestion | gestion locative Dakar agence |
| Landing | location appartement Mermoz / Almadies / Ngor |

### Cluster D — Diaspora *(P0 SEO)*

| Rôle | URL | KW primaire | Secondaires |
| --- | --- | --- | --- |
| **Hub** | `/guides/diaspora-immobilier-senegal` | acheter Sénégal diaspora | investir depuis France |
| Spoke | `/blog/acheter-senegal-depuis-france` **(D1)** | acheter terrain Sénégal depuis la France | protocole confiance |
| Spoke | `/blog/procuration-immobilier-senegal` **(D2)** | procuration achat immobilier Sénégal | clauses POA |
| Spoke | `/blog/sequestre-pas-wave-vendeur` **(D3)** | séquestre notaire Sénégal | ne pas payer Wave vendeur |
| Spoke | Landing | Pack Diaspora Secure | inspection à distance Sénégal |

### Cluster E — Argent & décisions

| Spoke | KW |
| --- | --- |
| E1 Mensualités chiffrées | simulateur mensualité terrain Sénégal |
| E4 Louer vs acheter | louer ou acheter Dakar |

---

## 3. Cluster **géo** Z1–Z2 (money + authority)

*Priorité farming `02-zones`. 1 landing / quartier cœur avant expansion.*

### 3.1 Priorité build (90–180 j)

| Priorité | Landing | KW primaire | Stock CTA |
| --- | --- | --- | --- |
| P0 | `/quartiers/mermoz` | immobilier Mermoz Dakar · appartement Mermoz | Catalogue filtre Mermoz |
| P0 | `/quartiers/almadies` | villa Almadies à vendre · location Almadies | Idem |
| P0 | `/quartiers/ngor` | villa Ngor · appartement Ngor | Idem |
| P0 | `/quartiers/sacre-coeur` | appartement Sacré-Cœur Dakar | Idem (+ bureau) |
| P1 | `/quartiers/point-e` | location Point E Dakar | Loc standing |
| P1 | `/terrains/keur-massar` | terrain Keur Massar titre foncier | Terrains Z2 |
| P1 | `/terrains/diamniadio` | terrain Diamniadio constructible | + disclaimer DGSCOS |
| P2 | Petite Côte / Saly | villa Saly · terrain Saly | Z3 partenaire |

### 3.2 Template H2 landing geo (brief)

1. H1 : `[Type] à [Quartier] — agence curated`  
2. Pour qui (persona) + promesse confiance  
3. Snapshot marché (fourchette FCFA **datée** ou « devis »)  
4. Types de biens / papiers fréquents (TF/bail/délib)  
5. Bloc catalogue filtré (embed)  
6. Checklist diligence locale  
7. FAQ 5 questions  
8. CTA WA + estimation vendeur si supply  

**Longueur :** 800–1 500 mots + listings.  
**Schema :** `Place` + `FAQPage` + `RealEstateAgent` (site).  
**Ne pas :** doorway page 200 mots dupliqués × 20 quartiers.

---

## 4. Money pages & SEM (Search)

### 4.1 Money pages site

| Page | KW / rôle | CTA |
| --- | --- | --- |
| `/` | marque · agence immobilière Dakar | Catalogue / WA |
| `/estimation` | estimation maison Dakar gratuite | Form → WA |
| `/outils` | hub outils | Simus |
| `/vendre` | vendre bien Dakar agence | Estimation / exclusif |
| `/diaspora` | agence immobilière diaspora Sénégal | Secure |
| `/a-propos` / comment on travaille | confiance | WA |
| Fiches bien | longue traîne adresse / quartier | Visite |

### 4.2 Groupes d’annonces Google Search (M3+)

| Ad group | Exemples KW | Match | Landing | Bid note |
| --- | --- | --- | --- | --- |
| **Brand** | evergreen immo · [raison sociale] | Exact/phrase | Home | Bas |
| **Agence Dakar** | agence immobilière Dakar · agence immo Mermoz | Phrase | Home / vendre | Moyen |
| **Estimation** | estimation maison Dakar · vendre appartement Almadies | Phrase | `/estimation` | Moyen |
| **Terrain** | terrain à vendre Dakar · terrain titre foncier Sénégal | Phrase | Catalogue terrains / A1 | Moyen |
| **Construction** | coût construction maison Sénégal | Phrase | B2 / simu | Bas–moyen |
| **Diaspora** (M7+) | acheter Sénégal depuis France · arnaque immobilier Sénégal | Phrase | D1 / diaspora | Moyen |
| **Loc Z1** | location appartement Mermoz · location Almadies meublé | Phrase | Catalogue loc | Test |

**Négatifs :** emploi, stage, gratuit pure spam, hors pays non ciblé, « TeleDAc instantané ».

CPC attendu immo Search SN : **150–300 FCFA** (`04` paid / Kolonell).

---

## 5. Matrice keyword → persona → priorité

| KW / thème | Persona | Cluster | Priorité SEO | SEM |
| --- | --- | :---: | :---: | :---: |
| titre foncier vs bail | Tous | A | **P0** | ○ |
| arnaque WhatsApp / Wave vendeur | Fatou | A/D | **P0** | ◐ M7 |
| acheter depuis France | Fatou | D | **P0** | ● M7 |
| coût construction m² | Mamadou | B | **P0** | ● M3 |
| mensualité / étalé terrain | Mamadou | B/E | **P0** | ● |
| estimation / vendre Dakar | Marième | Money | **P0** | ● M3 |
| appart/villa [Z1] | JP / Aïssatou / Marième | Geo | **P0** | ◐ |
| gestion locative Dakar | Ousmane | C | P1 | ○ |
| Arrêt Dscos | Mamadou | B | P1 | ○ |
| caution louer Dakar | Aïssatou | C | P1 | ○ |

---

## 6. Briefs landing (canevas + 4 priorités)

### 6.1 Canevas brief (copier)

```md
# Landing — [NOM]
- URL:
- Intent: informational | commercial | transactional
- KW primaire / secondaires:
- Persona:
- Promesse (1 ligne brand-aligned):
- Outline H2:
- Preuves / chiffres (datés):
- Embed: catalogue filtre | simu | aucun
- CTA primaire / secondaire:
- FAQ (5):
- Maillage: hub + 2 spokes + 1 money page
- Schema:
- Owner / relecture métier:
- Statut: brief | draft | live
```

### 6.2 Brief — `/estimation` (supply)

| Champ | Contenu |
| --- | --- |
| **KW** | estimation maison Dakar · vendre appartement [Z1] |
| **Persona** | Marième |
| **Promesse** | Estimation écrite + un seul discours prix — on filtre les curieux |
| **H2** | Comment ça marche · Ce qu’on livre · Zones couvertes · Exclusif 90 j · FAQ |
| **CTA** | Form court (quartier, type, délai) → WA &lt; 24 h |
| **Preuve** | Process reporting · pastille papiers · pas marketplace |
| **Interdit** | Promesse délai vente garanti · dump % |

### 6.3 Brief — `/diaspora`

| Champ | Contenu |
| --- | --- |
| **KW** | acheter Sénégal diaspora · agence immobilière diaspora Dakar |
| **Persona** | Fatou · Ibrahima |
| **Promesse** | Avant de payer, on vérifie. Ensuite on gère. |
| **H2** | Protocol 5 points · Séparation des rôles · Séquestre · POA · Pack Secure · FAQ |
| **CTA** | WA protocole · Secure |
| **Maillage** | D1 · D3 · A4 · gestion |

### 6.4 Brief — `/quartiers/mermoz` (modèle geo)

| Champ | Contenu |
| --- | --- |
| **KW** | appartement Mermoz · immobilier Mermoz Dakar · location Mermoz |
| **Persona** | Mix demand + supply |
| **Promesse** | Catalogue curated Mermoz — type de droit affiché |
| **H2** | Pourquoi Mermoz · Fourchettes (datées) · Acheter / louer / vendre · Papiers fréquents · Listings · FAQ |
| **Embed** | Filtre `quartier=mermoz` |
| **CTA** | WA visite · estimation vendeur |

### 6.5 Brief — `/outils` (hub tools)

| Champ | Contenu |
| --- | --- |
| **KW** | simulateur terrain Sénégal · coût construction maison |
| **Persona** | Mamadou |
| **Promesse** | Chiffres avant engagement — puis on lit tes papiers |
| **H2** | 3 simus · Comment lire les résultats (±) · Prochaine étape diligence · FAQ |
| **CTA** | sim_start · WA lecture dossier |
| **SEO** | Index `/outils` + pages enfants ; pas orphan |

---

## 7. On-page & technique (mini-CdC)

| Élément | Standard Y1 |
| --- | --- |
| Title | KW + bénéfice + Dakar/SN · ≤ ~60 car |
| Meta description | Décision + CTA · ≤ ~155 |
| H1 unique | Aligné intent |
| FAQ schema | Piliers + landings |
| OG cards | `social-share-cards` |
| Internal links | Spoke→hub · hub→spokes · bridge adjacent |
| Facets catalogue | Quartier + **type de droit** indexables (URLs propres) |
| Perf mobile | LCP OK · WA sticky |
| Search Console | Prop + sitemap J0 |
| Maj chiffres | Date visible · bandeau indicatif |

Détail technique exhaustif → doc `15`.

---

## 8. Calendrier SEO 90–180 j (aligné contenu)

| Fenêtre | Livrable SEO |
| --- | --- |
| **J0–J30** | GSC · sitemap · A1 · page Comment on travaille · estimation live · 1 landing geo (Mermoz) |
| **J31–J60** | A4 · D1 · B2 (+ embed si V1) · landing Almadies ou Ngor |
| **J61–J90** | B1 · B6 · `/outils` index · 3ᵉ landing geo |
| **M4–M6** | A5 · B3 · cluster C teaser · maillage complet A/B/D |
| **M7+** | Hub diaspora · landings Z2 terrains · SEM diaspora Search |

---

## 9. KPI SEO / SEM

| KPI | Cible |
| --- | ---: |
| Pages indexées piliers + landings P0 | Selon calendrier |
| Clics organiques / mois (M9+) | Croissance MoM · hyp. **20–60** leads org. |
| CTR guide → outil | **&gt; 8 %** |
| Closings attribués `seo` | **≥ 3–5** / an Y1 |
| SEM Search | CPL & CAC dans plafonds `04` · QS suivi |
| Cannibalisation | 0 doublon H1/KW primaire |

---

## 10. Gouvernance

| Acte | Rôle |
| --- | --- |
| Priorisation KW / clusters | CT **A/R** · GER I |
| Brief landing | CT R · AC C geo |
| Publish | CT R · OD relecture papier |
| SEM Search | CT R · GER A budget |
| Audit cannibalisation | CT trimestriel |

---

## 11. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`blog/strategie.md`](../../docs/blog/strategie.md) | Hubs A–E · backlog piliers |
| [`03-plan-contenu.md`](./03-plan-contenu.md) | Ordre publication 90 j |
| [`02-zones-prioritaires.md`](../plan-commercial/02-zones-prioritaires.md) | Landings geo Z1 |
| [`03-canaux-acquisition.md`](../plan-commercial/03-canaux-acquisition.md) | SEO CAC · surfaces |
| [`04-acquisition-paid.md`](./04-acquisition-paid.md) | SEM Search groups |
| [`blog/briefs/`](../../docs/blog/briefs/README.md) | Intents article |

### Externes

| Source | Insight |
| --- | --- |
| Cyril Jarnias — SEO annonces SN | KW type+quartier+attribut · éviter générique |
| Kolonell — SEO par quartier Dakar | Piliers 2–4k mots geo · 4–6 mois avant mandats |
| Hub-spoke SEO (Instant Press / SEOBRO) | Clusters · bridges · money pages |
| Locadakar / Immorise — SERP | Intent TF + diaspora fort sur landings vente |

---

*SEO-SEM v1.0 — sept. 2026. Valider volumes en Search Console J0. Prochain : `06-social-whatsapp.md`.*
