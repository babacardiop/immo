# Business Model — Hub immobilier Sénégal

**Document :** Dossier · Modèle économique · 01  
**Statut :** v1.0 — sept. 2026  
**Nature :** modèle métier exhaustif · BMC : [`02`](./02-business-model-canvas.md) · BP : [`03`](./03-business-plan.md)  
**Suite :** [`02-business-model-canvas.md`](./02-business-model-canvas.md) · [`03-business-plan.md`](./03-business-plan.md) · [`04-unites-economiques.md`](./04-unites-economiques.md)

**Sources produit :** [`docs/positioning.md`](../../docs/positioning.md) · [`docs/hub-roadmap.md`](../../docs/hub-roadmap.md) · [`docs/partenaires.md`](../../docs/partenaires.md) · [`dossier/etude-de-marche/`](../etude-de-marche/)  
**Sources marché / benchmarks :** CAHF, ANSD ICAS, web SN (Kolonell, LT Immobilier, Wave/OM), PropTech Afrique (Spleet, Kasa, AppFolio thesis) — citations §14.

---

## Synthèse exécutive

Le modèle n’est **pas** celui d’un site d’annonces (take-rate sur volume) ni d’un SaaS pur (abonnement logiciel). C’est un **hybride agence + PropTech + réseau d’apporteurs** :

```
REVENUS =
  Commissions transaction (vente / mise en location)
+ Honoraires gestion locative récurrents (ancre LTV)
+ Frais / % vente étalée & location-vente
+ Commissions d’apport partenaires (BTP, archi, notaire, formalités…)
+ (Phase ultérieure) data / Observatoire / services premium diaspora
```

**Thèse économique :**

1. **Le métier paie** — commissions et gestion, comme une agence classique (marché SN : vente ~5–10 %, gestion ~5–10 %, mise en location ~1 mois de loyer).  
2. **Le digital multiplie** — SEO, portails, simulateurs, Wave/OM → plus de mandats exclusifs, moins de friction, reporting diaspora.  
3. **Le hub monétise l’aval** — le goulot du marché est le *closing sécurisé* et l’*après-vente* (construire, gérer) ; c’est là que la marge et la LTV se trouvent.  
4. **On n’achète pas le stock** au démarrage — modèle **asset-light** (intermédiaire), donc faible capex foncier, cash-flow lié aux mandats.

**Ce qu’on refuse volontairement :** open posting, guerre du CPM/classifieds, SaaS sans visage local, promotion capitalistique lourde (lotisseur) avant product-market fit.

---

## 1. Définition du business

### 1.1 Une phrase

> Agence immobilière **full-service** au Sénégal (vente, location, gestion, accession étalée / loc-vente), outillée d’un **site PropTech** et d’un **réseau de partenaires contractualisés**, qui orchestre le parcours *décider → sécuriser → closer → construire / gérer*.

### 1.2 Ce qu’on est / n’est pas

| On est | On n’est pas |
| --- | --- |
| Opérateur de mandats (responsabilité métier) | Marketplace ouverte type Expat-Dakar |
| Collecteur de loyers + reporting | Pure PropTech SaaS (Noflaye, Liamsi) |
| Apporteur d’affaires vers BTP / notaire / archi | Entreprise de construction |
| Catalogue **curated** (papiers lus) | Open inventory non vérifié |
| Hub parcours | Blog conseil isolé (Keur City mort) |

### 1.3 Deux couches de valeur (et de coût)

```
┌─────────────────────────────────────────────────┐
│  COUCHE MÉTIER (P&L agence)                       │
│  Mandats · Visites · Closing · Gestion · Agents   │
│  → CA commissions & honoraires                    │
└───────────────────────┬─────────────────────────┘
                        │ amplifiée / industrialisée par
┌───────────────────────▼─────────────────────────┐
│  COUCHE DIGITALE (capex/opex produit)             │
│  Site · Portails · Simus · Paiements · SEO · Lab  │
│  → levier conversion & LTV, pas le métier seul    │
└─────────────────────────────────────────────────┘
```

**Règle de gouvernance économique :** le produit digital se justifie s’il **augmente** (a) le taux de mandats exclusifs, (b) la conversion lead→closing, (c) la rétention gestion, (d) le take-rate partenaire — pas s’il « fait joli ».

### 1.4 Formule hub (roadmap)

```
Agence full-service
  + Add-ons (outils décisionnels)
  + Partenaires (exécution)
  (+ Research lab : crédibilité Observatoire)
= Double revenu (métier + apport) + moat confiance
```

---

## 2. Problème client → monétisation

| Douleur (demande) | Solution hub | Comment on gagne |
| --- | --- | --- |
| Arnaques / papiers flous (surtout diaspora) | Diligence + catalogue curated | Mandat + forfaits formalités / apport notaire |
| Habiter Dakar cher ; accession difficile | Étalé, loc-vente, simus | Frais dossier + % flux + commission |
| Bailleur diaspora stressé | Gestion + portail + Wave/OM | **8 %** loyers (cible) récurrents |
| Terrain → construire opaque | Simu + pack constructeur/archi | Apport 2–5 % travaux |
| Closing lent / attentisme (ICAS −15 % 2025) | Process SLA + partenaires | Plus de closings = plus de commissions |
| Annonces infidèles / multi-post | Curated + fingerprint lab | Différenciation → prix mandat exclusif |

Le marché monétisable n’est **pas** les 278k demandes sociales ; ce sont les segments **solvables** : classe moyenne accession, cadres, standing, diaspora investisseur, bailleurs multi-biens (`02-analyse-demande`).

---

## 3. Segments clients & personas

### 3.1 Qui paie (payeurs)

| Segment | Rôle | Paye quoi | Priorité cash |
| --- | --- | --- | --- |
| **Vendeur / bailleur** | Offre | Commission vente ou gestion | **P0** |
| **Acquéreur / locataire** | Demande | Part honoraires location (selon décret) ; parfois frais dossier | P0 |
| **Partenaire** | Exécution | Commission d’apport (nous reverse) | P0 Vague 1+ |
| **Promoteur** (phase 2) | Stock | Mandat commercialisation / co-marketing | P2 |

### 3.2 Personas (demande) → LTV relative

| Persona | Ticket typique | Fréquence | LTV relative |
| --- | --- | --- | --- |
| **Fatou** diaspora investisseur | 10–150 M+ | 1–3 biens / cycle 5 ans | **Très haute** (vente + gestion + apport) |
| **Mamadou** primo terrain | 8–40 M étalé + chantier | 1 long parcours | Haute (étalé + BTP) |
| **Ousmane / Ibrahima** bailleurs | Loyers 150k–1 M / unité | Mensuel × N unités | **Ancre récurrente** |
| **Aïssatou** locataire | Loyer 150–600k | Ponctuel (entrée) | Basse unitaire ; volume + upsell |
| **Marième** vendeuse | Bien 30–200 M | One-shot | Haute si exclusif 5–7 % |

### 3.3 Segments à **ne pas** prioriser en P&L Y1–Y2

- Logement social file d’attente (278k) — orientation contenu seulement.  
- Rural hectares purs (Senhectare) sauf opportunité mandat.  
- VEFA promoteur sans exclusivité commerciale.

---

## 4. Offre & axes de revenus (détail)

### 4.1 Les 4 axes commerciaux

| # | Axe | Nature revenu | Timing cash | Rôle dans le modèle |
| --- | --- | --- | --- | --- |
| **1** | Vente classique | Commission % prix | Closing (irrégulier, gros tickets) | Cash ponctuel |
| **2** | Vente étalée (terrains) | Frais dossier + % sur flux / solde | Mensuel + closing final | Mix récurrent léger |
| **3** | Location-vente | Frais + % redevances | Mensuel long | Accession bâti |
| **4** | Location + **gestion** | 1 mois à l’entrée + **% loyers** | Mensuel | **Socle LTV** |

### 4.2 Grille tarifaire cible (alignée marché SN)

Sources : pratique agences SN (fourchettes 5–10 % vente ; ~1 mois location ; 5–10 % gestion) ; mix marketing dossier (`05`) ; benchmarks Kolonell (mandat simple 3–4 %, exclusif 5–7 %, premium jusqu’à 8 %).

| Prestation | Prix cible hub | Fourchette marché | Notes modèle |
| --- | --- | --- | --- |
| Commission **vente** mandat simple | **4–5 %** | 3–5 % | Moins attractif → pousser exclusif |
| Commission **vente** mandat **exclusif** | **5–7 %** | 5–7 % (jusqu’à 8 % standing) | **Cœur marge transaction** |
| Commission vente ticket &gt; 100 M | **3–5 %** dégressif | Souvent 3 % au-delà 100 M (pratique citée) | Négociation écrite |
| **Mise en location** | **1 mois** de loyer | Standard | Respect plafond décret part locataire si loyer ≤ 500k |
| **Gestion locative** | **8 %** des loyers **encaissés** | 5–10 % (FR online 4–6 % ; traditionnel 7–10 %) | Entrée possible à 7 % pour gagner stock |
| Pack **diaspora reporting** | +1–2 pts ou forfait | — | Différenciation |
| Frais dossier **étalé / loc-vente** | **25–50k FCFA** | — | Filtre + cash immédiat |
| Estimation / conseil | Gratuit → mandat | — | Lead magnet |
| Services diaspora (procuration, suivi) | **300–800k** forfait | Observé premium | Upsell closing |

**Principes pricing :**

1. Transparence écrite dans le mandat (vs informel).  
2. Pas de dump price Y1 — battre sur **valeur** (preuves, SLA, portail).  
3. Gestion : accepter un rate compétitif pour **volume d’unités** (effet AppFolio / property-mgmt : le software monétise le *flux* une fois le stock capturé).  
4. Outils digitaux **gratuits** ; monétisation = closing / gestion / apport.

### 4.3 Revenus partenaires (deuxième filet)

| Partenaire (P0–P1) | Modèle commission hub | Ordre de grandeur |
| --- | --- | --- |
| Constructeur BTP | **2–5 %** du contrat travaux | 3 % × 80 M = **2,4 M** |
| Architecte | **10–20 %** honoraires **ou** forfait 150–500k | Selon ticket |
| Notaire | Forfait intro **50–200k** / dossier | Déontologie : éviter % agressif |
| Formalités / papiers | Forfait ou % honoraires cabinet | Diligence V2 |
| Géomètre | 10–15 % ou forfait | Vague 2 |
| Courtier crédit / assurance | Partage commission | Vague 3+ |
| Promoteur (lots) | % vente lot | Vague ultérieure |

**Double filet type :** vente terrain 40 M à 5 % = **2,0 M** + apport chantier 60 M à 3 % = **1,8 M** → **3,8 M** sur un même client Mamadou.

### 4.4 Revenus futurs (optionnels — ne pas compter en Y1)

| Flux | Condition | Risque |
| --- | --- | --- |
| Sponsoring / data Observatoire | Lab L4 + audience | Dilution marque si pub agressive |
| SaaS white-label pour autres agences | Après productisation interne | Concurrence Noflaye ; distraction |
| Financement loyers (type Spleet RNPL) | Licence / partenaire banque | Crédit risk, régulation |
| Courtage assurance / énergie | Volume gestion | Opportuniste |

**Décision v1 :** ces lignes restent **hors scénario base** du prévisionnel jusqu’à preuve Vague 3+.

---

## 5. Structure de coûts

### 5.1 Coûts variables (liés au CA)

| Poste | Base | Ordre de grandeur |
| --- | --- | --- |
| Commission agents / apporteurs internes | % de la commission agence | **20–50 %** selon rôle (pratique SN : 20–100 %) |
| Frais paiement mobile (encaissement loyers) | % du flux encaissé | Wave ~**1 %** (souvent capé) ; OM **1,5–2,5 %** |
| Publicité performance (ads) | CAC | Variable ; viser &lt; 15–20 % marge contribution early |
| Frais dossiers notariaux / pièces (si avancés) | Par dossier | Refacturables ou absorbés |

**Règle Wave/OM :** accepter **les deux** ; Wave par défaut (urbain, coût) ; OM pour couverture / clients 35+. Sur un portefeuille de loyers, 1–2 % de frais sur le **flux** est un coût d’encaissement — à **imputer au bailleur** (contrat) ou à **absorber dans les 8 %** selon positionnement. Hypothèse modèle : **frais pass-through ou inclus**, marge nette gestion cible **≥ 5–6 pts** après coût paiement + agent.

### 5.2 Coûts fixes / semi-fixes

| Poste | Y0–Y1 (indicatif) | Commentaire |
| --- | --- | --- |
| Loyer bureau / ancrage Dakar | 0,5–2 M / mois | Confiance locale obligatoire |
| Salaires (fondateur + 1–2 agents + ops) | Dominant | Voir `organisation/` |
| Hébergement / domaine / maps / SaaS | 50–300k / mois | Stack Next.js |
| Télécom / WhatsApp Business | Faible | Canal P0 |
| Assurance RC pro + garantie financière | Obligatoire métier (loi 82-07 / décret 83-423) | Non négociable |
| Marketing contenu / SEO | Temps + outils | CAC organique |
| Comptabilité / juridique | Forfait | Conformité |
| Lab crawl (plus tard) | Capex temps + infra | Différenciation L2+ |

### 5.3 Capex initial (hors stock foncier)

| Poste | Fourchette indicative | Source / note |
| --- | --- | --- |
| Création SARL / notaire / RCCM | **0,1–0,5 M+** | Capital SARL libre OHADA ; frais notaire selon capital |
| Carte pro / garantie financière / RC | Selon engagements | Décret transaction/gestion |
| Site Vague 0–1 (build) | **5–15 M** selon make/buy | Benchmark Kolonell « transformation digitale agence » 5,8–11 M + récurrent |
| Identité / photo / matériel | 0,5–2 M | |
| Fonds de roulement 3–6 mois | **Variable** | Voir `08-besoins-financement` |

**Asset-light :** pas d’achat de terrains en propre au démarrage → le risque est **opérationnel / commercial**, pas bilan foncière.

---

## 6. Activités clés

| Activité | Pourquoi c’est le modèle | Vague |
| --- | --- | --- |
| Captation & qualification mandats | Stock = oxygène | Continu |
| Diligence papiers (TF/bail/NICAD) | Moat confiance + pricing exclusif | V0–2 |
| Mise en marché curated + SEO | Demande solvable | V0 |
| Visites / négociation / closing | Encaissement commission | Continu |
| Encaissement loyers + reversement | Récurrent | V3 |
| Activation partenaires (conventions) | 2ᵉ filet | V1+ |
| Contenu décisionnel (blog) | CAC organique diaspora | Continu |
| (Lab) Observatoire / indices | Autorité + leads B2B | L0→L4 |

---

## 7. Ressources clés

| Ressource | Type | Criticité |
| --- | --- | --- |
| **Licence / carte pro + garantie + RC** | Réglementaire | Bloquant |
| Catalogue mandats exclusifs | Actif commercial | P0 |
| Équipe agents formés diligence | Humain | P0 |
| Plateforme (site + portails + paiements) | Tech | Différenciation |
| Réseau partenaires signés | Relationnel | P0 Vague 1 |
| Réputation diaspora / preuves | Marque | Moat |
| Thesaurus / data lab (plus tard) | Data | Moat soft |

---

## 8. Partenaires clés (écosystème)

Voir détail taux dans [`docs/partenaires.md`](../../docs/partenaires.md).

| Tier | Qui | Rôle économique |
| --- | --- | --- |
| **P0** | Constructeur, archi, notaire, formalités | Closing + apport immédiat |
| **P1** | Géomètre, avocat, assureur, courtier crédit | Diligence & retention |
| **P2** | VRD, solaire, déménagement, agences villes | Densification |
| **Infra** | Wave, Orange Money, hébergeur, maps | Coût variable / fiabilité |
| **Institutionnel** (veille) | SAFRU, urbanisme 100k, ANSD | Contenu / pipeline — pas revenu direct Y1 |

**Règle :** client signe **avec le partenaire** pour l’exécution ; hub = apporteur — limite la responsabilité chantier.

---

## 9. Canaux (go-to-market économique)

| Canal | Coût relatif | Rôle CA | Priorité |
| --- | --- | --- | --- |
| Site SEO + outils | Capex + contenu | Leads acquéreurs / vendeurs | **P0** |
| WhatsApp Business | Faible | Closing | **P0** |
| Bureau / réseau local | Fixe | Mandats vendeurs | **P0** |
| Partenaires (reverse leads) | Commission partagée | Cross-sell | P0 V1 |
| Syndication sélective classifieds | Temps | Demande | P1 |
| Social + share cards | Temps / léger ads | Reach | P1 |
| Ads Meta/Google | CAC cash | Boost | P2 |
| Banques / BHS | Relation | Financement | P2 |

**Insight marché (Kolonell) :** le site convainc d’abord le **vendeur** (mandat exclusif 5–7 %) plus que l’acheteur — le modèle digital sert le **supply** autant que le demand.

---

## 10. Relation client & portails

| Portail | Objectif économique |
| --- | --- | --- |
| **Propriétaire** | Rétention gestion ; upsell 2ᵉ bien ; preuve reporting |
| **Client** (locataire / acquéreur) | Réduction churn / impayés ; cross-sell terrain |
| **Agence** (CRM) | Productivité agents → marge |

La relation n’est pas « self-serve pur » : au Sénégal la confiance exige un **visage** + un **process digital**. Coût humain reste structurel ; le soft **réduit** le coût marginal par unité gérée.

---

## 11. Mécanique unitaire (esquisse — détail dans `04`)

### 11.1 Exemple vente exclusive

| Hypothèse | Valeur |
| --- | --- |
| Prix bien | 50 000 000 FCFA |
| Commission 6 % | **3 000 000** |
| Part agent 40 % | −1 200 000 |
| Ads / frais dossier | −200 000 |
| **Marge contribution** | **~1 600 000** |

### 11.2 Exemple gestion (1 unité)

| Hypothèse | Valeur |
| --- | --- |
| Loyer | 300 000 / mois |
| Honoraires 8 % | **24 000** / mois |
| Frais Wave/OM (si absorbés, ~1–2 %) | −3–6 000 |
| Coût agent alloué | variable |
| **CA annuel / unité** | **288 000** |
| + mise en location (entrée) | **300 000** one-shot |

**10 unités** à 300k loyer → CA gestion **~2,9 M / an** (+ entrées). C’est l’**ancre** qui lisse le P&L face aux ventes irrégulières.

### 11.3 Exemple parcours Mamadou (double filet)

| Étape | CA hub |
| --- | --- |
| Terrain 25 M, commission 5 % | 1 250 000 |
| Frais dossier étalé | 40 000 |
| Apport archi (forfait) | 200 000 |
| Apport BTP 45 M × 3 % | 1 350 000 |
| **Total parcours** | **~2,84 M** |

### 11.4 Ratios cibles (à valider en `04` / prévisionnel)

| Ratio | Cible directionnelle Y2 |
| --- | --- |
| Part CA **récurrent** (gestion + étalé) | **≥ 35–40 %** |
| Part CA **apport partenaires** | **15–25 %** |
| Part CA **transaction vente** | **40–50 %** |
| CAC payant / LTV (diaspora) | **&lt; 1:5** |
| Mandats exclusifs / total mandats vente | **≥ 60 %** |

---

## 12. Flywheel & avantage concurrentiel

```
Mandats exclusifs (qualité)
    → Catalogue curated + SEO
        → Leads solvables (diaspora / locaux)
            → Closing + diligence
                → Apport partenaires (BTP…)
                    → Preuves / CRG / quittances
                        → Plus de mandats gestion
                            → Données / Observatoire
                                → Autorité → encore plus de mandats
```

| Moat | Comment il se construit | Copiable ? |
| --- | --- | --- |
| Confiance + preuves | Process diligence, séparation rôles fonds | Lentement |
| Stock exclusif | Relation vendeurs + site vendeur-first | Moyen |
| Réseau partenaires SLA | Conventions + CRM commissions | Moyen |
| Data / indices | Lab + études PDF | Difficile si tenu |
| Marque diaspora | Contenu + reporting | Lent |

**Non-moat :** « avoir un site » — table stakes 2026.

---

## 13. Phasage du modèle (aligné vagues)

| Phase | Ce qui monétise | Ce qu’on investit | Preuve |
| --- | --- | --- | --- |
| **Vague 0** | Premiers mandats / commissions vente-location | Site + catalogue | 1ère commission |
| **Vague 1** | + apport BTP/archi/notaire ; simus = lead | Conventions P0 | 1ère commission partenaire |
| **Vague 2** | + forfaits diligence / formalités | Pack sécuriser | Upsell diligence |
| **Vague 3** | **Gestion récurrente** live | Portails + Wave/OM | N unités sous mandat |
| **Vague 4+** | Diaspora scale ; densifier partenaires | Contenu + lab | LTV diaspora, Observatoire |

**Règle cash :** ne pas attendre Vague 3 pour vivre — Y1 = **transaction + premiers apports** ; Y2 = **bascule récurrence**.

---

## 14. Benchmarks & enseignements externes

### 14.1 Agences SN

- Volume formel : ordres de grandeur **plusieurs milliers** de transactions/an via agences (hors informel) — marché actif mais **ICAS services immo −15 %** (2025) = friction closing.  
- Digital vendeur-first : case « 11 → 48 mandats » (contenu marketing Kolonell) illustre le levier SEO → exclusifs — **à prendre comme ordre de grandeur**, pas comme promesse.  
- Investissement site + récurrent : ~**6–11 M** initial + **0,9–2,4 M / mois** cité pour une transformation lourde — calibrer à notre Vague 0 plus lean.

### 14.2 PropTech Afrique / global

| Modèle | Exemple | Leçon pour nous |
| --- | --- | --- |
| Marketplace seule | Portails annonces | Take-rate faible si offline closing |
| Rent finance + mgmt | **Spleet** (NG) | Récurrent fort mais **risque crédit** — phase 3+ seulement |
| SaaS property mgmt | Liamsi, Noflaye, AppFolio thesis | Valeur = **être dans le flux loyers** puis upsell |
| Hybrid portal + ops | Kasa | Listings + CRM ; monétisation tardive |

**Notre choix :** *agency-led hybrid* — on capture le flux (loyers, closings) **parce qu’on est le mandataire**, pas parce qu’on vend un abonnement.

### 14.3 Paiements SN (coût du récurrent)

| Rail | Frais marchand typiques (sources 2026, variables) | Usage hub |
| --- | --- | --- |
| **Wave** | ~1 % (souvent cap) ; parfois narratif « client paie » selon produit | Défaut urbain |
| **Orange Money** | ~1,5–2,5 % selon volume | Couverture / profils |
| Virement bancaire | Faible / délai | Gros tickets, diaspora |

Intégrer **dès Vague 3** ; provisionner le coût dans la marge gestion.

### 14.4 Cadre légal du modèle

- Activité transaction / gestion : **loi 82-07** + **décret 83-423** — carte pro, **garantie financière**, **RC professionnelle**.  
- Honoraires : **libres** mais pratiques de marché + décret loyers (part locataire plafonnée sous seuils).  
- Forme : **SARL** recommandée (crédibilité, responsabilité limitée ; capital libre OHADA).  
- IS : **30 %** du bénéfice (sociétés) — à intégrer au prévisionnel net.

---

## 15. Risques du modèle (économiques)

| Risque | Impact | Mitigation |
| --- | --- | --- |
| Dépendance ventes one-shot | Trésorerie en dents de scie | Pousser gestion dès que possible ; buffer 6 mois |
| Agents qui partent avec le livre | Perte stock | CRM central, exclusifs écrits, culture |
| Impayés locataires | Tension bailleur / réputation | Process sélection + assurance / caution Vague 3 |
| Partenaire défaillant (chantier) | Réputation | Contrat client↔partenaire ; shortlist ; SLA |
| Guerre prix commissions | Compression marge | Différenciation preuves, pas discount |
| Régulation / DGSCOS / foncier | Allongement délais closing | Pédagogie + diligence (déjà dans dossier 06) |
| Distraction SaaS / 52 add-ons | Burn | Règle hub : 8–12 ouvertures / vague |
| Frais mobile money mal gérés | Marge gestion érodée | Pass-through clair ou pricing 8 %+ |

---

## 16. KPIs économiques (pilotage)

| KPI | Définition | Cible directionnelle |
| --- | --- | --- |
| CA mensuel | Toutes lignes | Croissance MoM |
| % CA récurrent | Gestion + flux étalé | ↑ vers 35 %+ |
| Mandats exclusifs | Part des mandats vente | ≥ 60 % |
| Unités sous gestion | Stock | Ramp Vague 3 |
| Commission moyenne / vente | FCFA | Suivi mix tickets |
| Take-rate partenaire | CA apport / leads envoyés | &gt; 0 dès V1 |
| Délai lead → mandat | Jours | ↓ |
| Délai mandat → closing | Jours | ↓ |
| Taux impayés (gestion) | % loyers | &lt; 5–8 % |
| CAC (canal) | Coût / mandat | Par canal |
| Contribution margin | Après var. agents + ads + pay | &gt; 40–50 % transaction |

---

## 17. Lien avec les autres docs du dossier

| Doc | Apport |
| --- | --- |
| [`02` BMC](./02-business-model-canvas.md) | Vue 1 page des 9 blocs |
| [`03` BP](./03-business-plan.md) | Narratif investisseur / banque |
| [`04` Unit economics](./04-unites-economiques.md) | LTV, CAC, marge / mandat chiffrés |
| [`05`–`07`](./05-previsionnel-36-mois.md) | Prévisionnel, P&L, trésorerie |
| [`08`–`09`](./08-besoins-financement.md) | Financement & point mort |
| [`10` scénarios](./10-scenarios.md) | Base / haut / bas |
| [`../offre-et-tarifs/`](../offre-et-tarifs/) | Grille commerciale publique |
| [`../etude-de-marche/05`](../etude-de-marche/05-positionnement-mix-marketing.md) | Prix & messages |

---

## 18. Décisions figées (v1 modèle)

1. **Asset-light** — pas de stock promoteur au démarrage.  
2. **Agence d’abord** — PropTech = levier, pas identité client.  
3. **Gestion = ancre** — même si live en Vague 3, le modèle Y2–Y3 en dépend.  
4. **Double filet** métier + apport partenaires dès Vague 1.  
5. **Pas de RNPL / crédit** en propre avant partenaire bancaire.  
6. **Pas de marketplace ouverte** — curated only.  
7. **Pricing aligné marché** — pas de guerre des 3 %.  
8. **Wave + OM** tous les deux pour l’encaissement.  
9. **Conformité carte / garantie / RC** avant scale commercial.  
10. **Scope produit étroit par vague** — protéger la marge et le focus.

---

## 19. Sources & références (web + internes)

| Source | Usage |
| --- | --- |
| [`docs/positioning.md`](../../docs/positioning.md) | Métier, 4 axes, portails |
| [`docs/hub-roadmap.md`](../../docs/hub-roadmap.md) | Phasage revenus |
| [`docs/partenaires.md`](../../docs/partenaires.md) | Taux apport |
| [`dossier/etude-de-marche/02–05`](../etude-de-marche/) | Demande, concurrence, pricing |
| CAHF / ANSD (PDFs `docs/research-lab/etudes/pdf/`) | Macro, ICAS |
| Kolonell — commissions & digital agences Dakar (2026) | 3–4 % / 5–7 % ; coût digital |
| LT Immobilier — devenir agent SN | ~1 mois location ; barèmes vente cités |
| Simiz / Kolonell — frais Wave vs OM (2026) | ~1 % vs 1,5–2,5 % |
| New Market Pitch — PropTech business models | Récurrent via property mgmt / payments |
| Spleet / Kasa / Liamsi | Benchmarks Afrique (finance loyer, SaaS, hybrid) |
| Loi 82-07 / décret 83-423 (Keur City) | Garantie, RC, carte |
| SenPages / APIX — création société | SARL, coûts, IS 30 % |

*Les fourchettes web sont **indicatives** et hormis sources officielles, à retraiter dans `04` avec nos premiers mandats réels.*

---

*Document livré : sept. 2026. Prochaine étape naturelle : BMC 1 page (`02`) puis unit economics (`04`).*
