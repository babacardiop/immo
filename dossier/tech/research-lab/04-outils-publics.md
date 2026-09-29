# Outils publics — Calculateurs, cartes, checklists

**Document :** Dossier · Tech · Research lab · 04  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-mission-lab.md`](./01-mission-lab.md) · [`03-barometre-prix.md`](./03-barometre-prix.md) · [`../../../docs/add-ons/README.md`](../../../docs/add-ons/README.md) · [`../../../docs/hub-roadmap.md`](../../../docs/hub-roadmap.md) · [`../../../docs/blog/strategie.md`](../../../docs/blog/strategie.md)  
**Aval :** Specs add-ons `01-outils-simulateurs/*` · pages `/outils` · Observatoire

> **Rôle :** catalogue des **surfaces publiques** (gratuit / lead magnet) nourries ou calibrées par le lab.  
> Specs produit détaillées → `docs/add-ons/specs/`. Lab = **données + méthodo** ; hub = **UX + CTA**.

---

## 0. Principe

| Type | Job | Gate lead | Lab input |
| --- | --- | --- | --- |
| **Calculateur** | Chiffre FCFA avant engagement | Soft post-résultat | ICC/IMC · barèmes · taux |
| **Carte / indice** | Ordre de grandeur prix quartier | Soft / email note | IX-SALE / LAND / RENT (`03`) |
| **Checklist** | Réduire arnaque / oublis | PDF + WA | Contenu + pastilles papiers |

**Règles conversion (bench 2026 calculateurs lead) :**

1. Résultat **immédiat** — ne pas gater le 1ʳᵉ chiffre  
2. CTA **dans** le panneau résultat (« Email ce scénario » · « WA conseiller »)  
3. Capturer le **scénario** (inputs) avec le contact  
4. 1 CTA dominant · mobile first · brand EverGreen (pas widget tiers nu)  
5. Disclaimer : estimation · **pas** offre · **pas** titre magique  

**Anti :** TeleDAc en 48 h · « prix officiel » · dump PDF ANSD.

---

## 1. Carte des outils publics

```
/outils
├── mensualite/          ← P0 Vague 1
├── construction/        ← P0 Vague 1
├── budget-total/        ← P0 Vague 1
├── estimation/          ← P0–P1
├── frais-acquisition/   ← P1
├── pret-a-batir/        ← P1
├── carte-prix/          ← P2 (lab L2+)
└── checklists/          ← Continu (PDF + pages)
```

Sur **fiches terrain** : embed simu mensualité + construction + lien checklist papiers.

---

## 2. Calculateurs

| ID | Outil | Add-on | Priorité | Vague | Persona | Output user | CTA |
| --- | --- | :---: | :---: | --- | --- | --- | --- |
| **PUB-01** | Simulateur mensualité (étalé) | `01` | **P0** | V1 | Mamadou · Fatou | Mensuelle FCFA · durée · reste | WA / Pack Secure |
| **PUB-02** | Simulateur coût construction | `02` | **P0** | V1 | Mamadou · Fatou | Fourchette FCFA + FCFA/m² | Intro BTP/archi |
| **PUB-03** | Budget total projet | `03` | **P0** | V1 | Mamadou | Terrain + bâti + frais + buffer | Visite + diligence |
| **PUB-04** | Estimation vendeur (lead) | `04` | **P0–P1** | V0–1 | Marième | Fourchette indicative | RDV estimation |
| **PUB-05** | Frais d’acquisition | `18` | **P1** | V2 | Fatou · Mamadou | Notaire / droits / divers | Checklist closing |
| **PUB-06** | Terrain nu → prêt à bâtir | `10` | **P1** | V2 | Mamadou | Postes VRD / clôture / fosse | Pack Terrain→Maison |
| **PUB-07** | Comparateur frais | `34` | **P2** | V4+ | Tous | Table scénarios | Contenu SEO |

### 2.1 Inputs / barèmes (lab)

| Outil | Barème / data | Source lab |
| --- | --- | --- |
| PUB-01 | Taux indicatif / durée étalé | Produit hub · pas BCEAO forcé |
| PUB-02 | FCFA/m² finition × zone | ICC/IMC **DS-B*** + devis PART · recalibrage trimestriel |
| PUB-03 | Somme PUB-01/02 + frais | PUB-05 + buffer 10–15 % |
| PUB-04 | Comps strate | **IX-SALE / LAND** quand L2+ · sinon fourchettes EM + agent |
| PUB-05 | Grille frais type SN | Contenu juridique · MAJ avocat |
| Carte | Médianes stratifiées | **IX-*** (`03`) |

**Ordre grandeur construction (indicatif, à recalibrer partenaires) :** ~300–500 k FCFA/m² clé en main · buffer +10–15 % · archi si projet &gt; ~30 M.

### 2.2 UX résultat (canon)

```
[ Résultat gros FCFA ]
[ Fourchette min–max ]
[ Disclaimer 1 ligne ]
[ CTA primaire : WhatsApp ]
[ CTA secondaire : Email ce scénario / PDF ]
[ Lien checklist liée ]
```

Events analytics : `sim_start` · `sim_complete` · `sim_cta_wa` · `sim_email` (aligné MK analytics).

---

## 3. Cartes & indices publics

| ID | Surface | Dépendance lab | Priorité | Publish |
| --- | --- | --- | :---: | --- |
| **PUB-MAP-01** | Carte chaleur prix/m² Z1 | IX-SALE-M2 · IX-LAND · n≥8 | **P2** | L2+ données |
| **PUB-MAP-02** | Fiche quartier (snippet) | Même + DOM soft | P2 | Observatoire |
| **PUB-OBS-01** | Page Observatoire trimestriel | IX-* + ANSD cite | P2 | L4 |
| **PUB-OBS-02** | Widget « médiane [quartier] » | API A05 | P2 | Embed blog |

**Règles carte (`03`) :**

- Afficher **médiane · n · période · disclaimer asking**  
- Pas de pin = annonce concurrente  
- Couleur sage/olive · pas heatmap « luxe fake »  
- CTA : estimation vendeur / simu terrain dans la zone  

Spec produit : [`52-carte-prix-m2.md`](../../../docs/add-ons/specs/01-outils-simulateurs/52-carte-prix-m2.md).

---

## 4. Checklists publiques

| ID | Checklist | Format | Persona | CTA |
| --- | --- | --- | --- | --- |
| **CHK-01** | TF vs bail vs délibération | Page + PDF | Fatou · Mamadou | Diligence / WA |
| **CHK-02** | Avant de payer à distance (diaspora) | Page + PDF | Fatou · Ibrahima | Pack Secure |
| **CHK-03** | Diligence terrain (pièces + questions) | Page | Mamadou · Fatou | Intro géomètre / formalités |
| **CHK-04** | Closing / séquestre (anti-Wave) | Page | Fatou | Notaire client |
| **CHK-05** | Avant signature mandat vendeur | Page | Marième | RDV estimation |
| **CHK-06** | Entrée locataire (total à prévoir) | Page | Aïssatou | Visite curated |
| **CHK-07** | Reprise gestion (bailleur) | Page | Ousmane · Ibrahima | Audit mandat |
| **CHK-08** | Terrain → construire (permis, AC papier) | Page | Mamadou | PUB-02 + BTP |

**Contenu obligatoire CHK-01/02 :** pastilles papiers · phrases interdites Brand Book · jamais « délibération = TF ».

**Gate PDF :** email ou WA optionnel **après** preview HTML (même logique calculateurs).

Sources copy : `marketing/01` §5 · `etude-de-marche/06–07` · blog piliers A–E.

---

## 5. Matrice persona × outil

| Persona | Calculateurs | Carte | Checklists |
| --- | --- | --- | --- |
| **Mamadou** | 01 · 02 · 03 · 06 | LAND zone | 01 · 03 · 08 |
| **Fatou** | 01 · 02 · 05 | SALE soft | 01 · 02 · 04 |
| **Marième** | 04 | SALE quartier | 05 |
| **Ousmane / Ibrahima** | — | RENT soft | 07 |
| **Aïssatou** | — | — | 06 |
| **Jean-Pierre** | — | — | 06 soft |

---

## 6. Placement site (priorité)

| Surface | Outils |
| --- | --- |
| Home (sous hero) | Lien `/outils` · 1 simu terrain |
| Fiche terrain | PUB-01 + PUB-02 embed |
| Fiche bâti | PUB-05 · estimation |
| `/outils` hub | Grille tous PUB + CHK |
| Blog guide | Embed simu / checklist en fin d’article |
| Status WA / ads | Landing **1 outil + 1 CTA** |

---

## 7. Disclaimers outils (canon)

**Calculateurs :**

> *Simulation indicative hors frais exacts et hors capacité réelle de paiement. Ce n’est pas un conseil financier ni une offre de crédit.*

**Carte / indices :**

> *Prix demandés observés en ligne, dédupliqués. Pas des prix de transaction notariés. n et période affichés.*

**Checklists :**

> *Information générale. Ne remplace pas notaire, géomètre ou avocat. EverGreen n’accompagne pas le paiement Wave au vendeur.*

---

## 8. Phasage (anti-dispersion)

| Phase | Outils live |
| --- | --- |
| **Vague 0** | CHK-01 page · estimation lead soft · pas carte |
| **Vague 1** | PUB-01 · 02 · 03 sur fiches + `/outils` · CHK-02/03 |
| **Vague 2** | PUB-05 · 06 · diligence CTA · CHK-04/08 |
| **Vague 3** | CHK-06/07 · portails gestion (hors lab) |
| **Lab L2+** | PUB-MAP-01 branché indices |
| **Lab L4** | PUB-OBS-01 Observatoire |

**Interdit :** bloquer Vague 1 sur la carte prix (P2 / L2).

---

## 9. KPIs outils publics

| KPI | Cible esprit |
| --- | --- |
| `sim_complete` / session outils | ↑ |
| Taux CTA WA post-simu | Mesurer · objectif &gt; soft 5–15 % selon canal |
| Leads taggés `sim_*` / `chk_*` | CRM |
| Estimation → RDV Marième | Conversion supply |
| Observatoire : lectures / citations | Autorité |

Pas de vanité « pages vues outils » sans CTA.

---

## 10. Gouvernance

| Rôle | |
| --- | --- |
| **CT** | Build UX · events · barèmes techniques |
| **GER** | A claims chiffres publics (carte / Observatoire) |
| **Lab / data** | Refresh IX-* · ICC bridge |
| **Avocat / OD** | Grilles frais · wording papiers |
| **AC** | Suivi leads simu &lt; 24 h |

Barèmes construction : revue **trimestrielle** (ICC + devis partenaires).

---

## 11. Hors scope public (rappel)

| Interne lab | Pas page publique |
| --- | --- |
| Lead radar price-drop | CRM agent |
| ListingObservation brutes | — |
| File review dédup | Lab UI |
| Microdonnées ANSD | — |

---

## 12. Liens specs

| Outil | Spec |
| --- | --- |
| Mensualité | [`01-simulateur-mensualite.md`](../../../docs/add-ons/specs/01-outils-simulateurs/01-simulateur-mensualite.md) |
| Construction | [`02-simulateur-construction.md`](../../../docs/add-ons/specs/01-outils-simulateurs/02-simulateur-construction.md) |
| Budget total | [`03-simulateur-budget-total.md`](../../../docs/add-ons/specs/01-outils-simulateurs/03-simulateur-budget-total.md) |
| Estimation | [`04-estimation-vendeur.md`](../../../docs/add-ons/specs/01-outils-simulateurs/04-estimation-vendeur.md) |
| Prêt à bâtir | [`10-simulateur-pret-a-batir.md`](../../../docs/add-ons/specs/01-outils-simulateurs/10-simulateur-pret-a-batir.md) |
| Frais | [`18-calculateur-frais-acquisition.md`](../../../docs/add-ons/specs/01-outils-simulateurs/18-calculateur-frais-acquisition.md) |
| Comparateur | [`34-comparateur-frais.md`](../../../docs/add-ons/specs/01-outils-simulateurs/34-comparateur-frais.md) |
| Carte | [`52-carte-prix-m2.md`](../../../docs/add-ons/specs/01-outils-simulateurs/52-carte-prix-m2.md) |

---

## 13. Sources

### Internes

Add-ons catalogue · hub-roadmap Vague 1 simus · baromètre `03` · brand papiers · personas Mamadou/Fatou.

### Externes

| Source | Insight |
| --- | --- |
| Calculateurs lead (Fintactix / broker UX 2026) | Résultat ungated · CTA in-result · capturer scénario |
| Investissement Immo Afrique / HUBCephas | Bench simu construction SN — différencier par **agence + papiers + CTA réel** |
| Mission lab / Observatoires | Indices publics = confiance · pas catalogue concurrent |

---

*Outils publics EverGreen v1.0 — sept. 2026. Calculateurs P0 Vague 1 · checklists confiance · carte après lab L2.*
