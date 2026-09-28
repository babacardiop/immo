# Hub immobilier Sénégal — stratégie & calendrier d’itérations

**Ambition :** devenir le **premier hub immobilier** au Sénégal — pas un site d’annonces, pas un blog conseil isolé, pas une agence papier + WhatsApp.

**Formule :**

```
Agence full-service  +  Add-ons (outils)  +  Partenaires (exécution)
        =  parcours complet décision → closing → chantier / gestion
        =  double revenu (commission métier + commission d’apport)
```

**Docs liés :** [`positioning.md`](./positioning.md) · [`add-ons.md`](./add-ons.md) · [`partenaires.md`](./partenaires.md) · [`blog/`](./blog/) · [`proptech-analysis.md`](./proptech-analysis.md) · [`research-lab/`](./research-lab/README.md) · [`research-lab/etudes/`](./research-lab/etudes/README.md) · **[`../dossier/etude-de-marche/`](../dossier/etude-de-marche/README.md)** (étude marché + parcours foncier)

---

## 1. Pourquoi “hub” (et pourquoi c’est crédible)

| Acteur typique SN | Ce qu’il a | Ce qui manque |
| --- | --- | --- |
| Classifieds (Expat, etc.) | Volume d’annonces | Confiance, outils, closing, après-vente |
| Blog conseil (ex. Keur City) | Contenu or | Cadence morte, pas de catalogue, pas d’outils |
| Agence classique | Confiance & mandats | Portée SEO, simulateurs, réseau industrialisé |
| Marketplace ouverte | Inventory | Qualité, curation, responsabilité |

**Nous :** agence curated + outils décisionnels + réseau de partenaires contractualisés + contenu haute valeur.

La proposition de valeur devient : *« Un seul interlocuteur pour trouver, sécuriser, financer, notariser, construire et gérer. »*

---

## 2. Anti-dispersion (règles non négociables)

Le catalogue stratégique est **large** (52 add-ons, 24 types partenaires, backlog blog).  
Le **scope de build** d’une itération doit rester **étroit**.

| Règle | Détail |
| --- | --- |
| **Backlog ≠ roadmap** | Specs écrites = inventaire. Seules les lignes d’une vague sont “ouvertes”. |
| **1 parcours / vague** | On ferme une boucle client (ex. acheteur terrain), pas une liste de features. |
| **Budget d’ouverture** | Max **3–5 add-ons** + **2–3 partenaires** + **1–2 contenus** + features cœur si besoin. **Pas 20–30.** |
| **Même workflow** | Chaque vague répète le même process (voir §3). |
| **Done = revenu ou preuve** | Un item n’est “sorti” que si CTA live + partenaire joignable **ou** outil utilisable + KPI tracké. |
| **Dormant = OK** | Tout le reste reste en `docs/add-ons/specs/` et `docs/partenaires/specs/` sans ticket build. |

> 20–30 items = taille du **catalogue** à long terme, pas d’une **itération**. Une itération = **tranche de parcours**.

---

## 3. Workflow d’itération (identique à chaque vague)

```
1. Choisir le PARCOURS (ex. Acheteur terrain)
2. Sélectionner 3–5 add-ons + 2–3 partenaires + 1–2 piliers blog
3. Produit     → brancher CTA / outil / page
4. Partenaire  → convention apporteur signée + shortlist dans CRM
5. Contenu     → publier guide qui pousse vers CTA
6. Mesurer     → leads, conversion, commissions encaissées
7. Go / Kill / Iterate  → puis vague suivante
```

### Checklist “ouverture” d’un add-on

- [ ] Spec relue (`docs/add-ons/specs/...`)
- [ ] Surface UX choisie (fiche, `/outils`, dashboard…)
- [ ] CTA → lead ou outil live
- [ ] Event analytics (`sim_start`, `partner_lead`, …)
- [ ] Lien partenaire ou disclaimer si outil seul

### Checklist “ouverture” d’un partenaire

- [ ] Fiche type (`docs/partenaires/specs/...`)
- [ ] Nommé (raison sociale, contact) + convention signée
- [ ] Taux / forfait / déclencheur de commission actés
- [ ] SLA rappel client (ex. 48 h)
- [ ] Bouton / WhatsApp template depuis le parcours

### Definition of Done vague

- Parcours demoable de bout en bout  
- Au moins **1** commission partenaire **ou** conversion mandat mesurable  
- Rien d’ouvert hors liste de la vague  

---

## 4. Calendrier des vagues (18 mois)

Hypothèse : **~6–8 semaines / vague** (build léger + contractualisation + contenu). Ajuster selon équipe.

Légende : **F** = feature produit cœur · **A** = add-on · **P** = partenaire · **C** = contenu blog

---

### Vague 0 — Socle hub (semaines 0–6)

**Parcours :** “L’agence existe en ligne” — catalogue curated + confiance.

| Type | Item | Ref |
| --- | --- | --- |
| **F** | Site Next.js : catalogue, fiche bien, recherche, contact/WhatsApp | `tech-stack.md` |
| **F** | Mandats curated (pas d’open posting) | `positioning.md` |
| **F** | Facets **TF / bail / délibération** + disclaimer délibération | `dossier/…/06-parcours-foncier` |
| **F** | Portail agent minimal (créer / éditer annonce) | — |
| **C** | 1 page “Comment on travaille” + 1 guide TF vs bail vs délibération (teaser) | `blog/` + glossaire `07` |

**Partenaires / add-ons :** aucun nouveau — focus crédibilité catalogue.  
**KPI :** mandats en ligne, leads WhatsApp, taux réponse &lt; 24 h, % listings avec type papier renseigné.

---

### Vague 1 — Acheteur terrain (Mois 1–2)  ← *cœur différenciant*

**Parcours :** *Je vois un terrain → je sais si je peux payer → je sais combien construire → je parle à un pro.*

| Type | Item | Spec / fiche |
| --- | --- | --- |
| **A** | Simulateur mensualité (étalé / loc-vente) | `01-outils-simulateurs/01-…` |
| **A** | Simulateur coût construction | `01-outils-simulateurs/02-…` |
| **A** | Simulateur budget total (terrain + construction + frais) | `01-outils-simulateurs/03-…` |
| **A** | Page `/outils` (SEO) + embeds fiche terrain | `07-contenu…/05-guides-seo` |
| **P** | Constructeur BTP *(relation existante)* | `partenaires/…/01-constructeur` |
| **P** | Architecte *(relation existante)* | `…/02-architecte` |
| **P** | Notaire *(relation existante)* | `…/03-notaire` |
| **C** | Pilier coût construction + pilier TF vs bail | calendrier blog M1 |

**Hors scope vague 1 :** caution, solaire, marketplace matériaux, white-label…  
**KPI :** `sim_complete`, leads constructeur/archi/notaire, commissions apport, réservations étalé.

---

### Vague 2 — Sécuriser & formaliser (Mois 3–4)

**Parcours :** *Avant de payer : papiers, bornage, diligence — et on sait lire TF / bail / délibération.*

| Type | Item | Spec / fiche |
| --- | --- | --- |
| **A** | Due diligence foncière (CTA + checklist EDR/NICAD/régime) | `02-terrain…/08-…` |
| **A** | Bornage / géomètre (lead) | `02-terrain…/07-…` |
| **A** | Calculateur frais d’acquisition | `01-outils…/18-…` |
| **A** | Pack Terrain → Maison (funnel) | `02-terrain…/06-…` |
| **A** | *(option)* Orientation régularisation bail / Yastal | `02-terrain…/43-…` |
| **P** | Formalités / papiers légaux *(relation existante)* | `…/04-formalites` |
| **P** | Géomètre | `…/06-geometre` |
| **C** | Pilier arnaques / red flags + frais notaire + **Arrêt Dscos / zones** | blog M2–M4 · `dossier/…/06` |

**Référentiel métier :** [`dossier/etude-de-marche/06-parcours-foncier-securite.md`](../dossier/etude-de-marche/06-parcours-foncier-securite.md)  
**KPI :** diligences lancées, dossiers formalités, unblock rate closing, % go/no-go documentés.

**Policy catalogue Vague 2 :** pas de boost listing sans diligence minimale (EDR ou équivalent) sur terrains &gt; seuil.

---

### Vague 3 — Location + gestion (Mois 5–6)

**Parcours :** *Louer / faire gérer sans friction — cash récurrent agence.*

| Type | Item | Spec / fiche |
| --- | --- | --- |
| **F** | Portail locataire + proprio (loyers, quittances) | `positioning` portails |
| **A** | État des lieux digital | `03-location…/12-…` |
| **A** | Caution locative (lead partenaire) | `03-location…/11-…` |
| **A** | Assurance MRH + PNO (CTA) | `03-location…/13–14` |
| **P** | Assureur / courtier | `…/09-assureur` |
| **P** | Fintech caution *(ou process manuel)* | `…/23-fintech-caution` |
| **C** | Pilier louer à Dakar + gestion proprio | blog M5 |

**KPI :** mandats de gestion, % loyers collectés digital, polices assurance, activation caution.

---

### Vague 4 — Diaspora (Mois 7–8)

**Parcours :** *Acheter / construire depuis l’étranger sans se faire arnaquer.*

| Type | Item | Spec / fiche |
| --- | --- | --- |
| **A** | Inspection à distance | `05-diaspora…/15-…` |
| **A** | Multi-devise (FCFA / EUR / USD) | `05-diaspora…/16-…` |
| **A** | Assistance procuration | `05-diaspora…/37-…` |
| **A** | Escrow / séquestre (via notaire) | `04-vente…/35-…` |
| **P** | Inspecteur indépendant | `…/10-inspection` |
| **P** | Notaire (renfort diaspora / POA) | déjà V1 |
| **C** | Pilier diaspora FR + “pas de Wave au vendeur” | blog M2/M5 |

**KPI :** inspections commandées, % closings diaspora avec séquestre, NPS diaspora.

---

### Vague 5 — Gros tickets & accession avancée (Mois 9–10)

**Parcours :** *Investissement lourd / co-acquisition / crédit.*

| Type | Item | Spec / fiche |
| --- | --- | --- |
| **A** | Estimation vendeur (lead mandat) | `01-outils…/04-…` |
| **A** | Épargne construction (jauge dashboard) | `04-vente…/24-…` |
| **A** | Co-acquisition familiale | `04-vente…/50-…` |
| **P** | Financier haut de gamme *(relation existante)* | `…/05-financier` |
| **P** | Courtier crédit / banque | `…/08-courtier-credit` |
| **C** | Pilier budget total projet + mensualités chiffrées | blog M3–M4 |

**KPI :** tickets &gt; seuil, success fees, mandats exclusifs via estimation.

---

### Vague 6 — Chantier & confort (Mois 11–12)

**Parcours :** *Terrain acheté → prêt à bâtir / confort.*

| Type | Item | Spec / fiche |
| --- | --- | --- |
| **A** | Simu terrain nu → prêt à bâtir | `01-outils…/10-…` |
| **A** | Permis / TeleDAC checklist | `02-terrain…/09-…` |
| **A** | Pack clim + kit solaire (leads) | `06-energie…/19–20` |
| **A** | Suivi chantier léger | `02-terrain…/26-…` |
| **P** | Clim / solaire | `…/15–16` |
| **P** | (option) VRD ou forage si demande | `…/13–14` |
| **C** | Pilier autorisation de construire | blog M6 |

**KPI :** leads énergie, suivis chantier actifs, upsell post-achat terrain.

---

### Vague 7 — Densifier le hub (Mois 13–15)

**Parcours :** *Plus de services autour du même client — sans nouveau métier.*

| Type | Item | Spec / fiche |
| --- | --- | --- |
| **A** | Comparateur frais + carte prix/m² | `01-outils…/34`, `52` |
| **A** | Home staging / photo | `04-vente…/33` |
| **A** | Déménagement / remise clés | `03-location…/30`, `48` |
| **A** | Reporting fiscal proprio | `03-location…/38` |
| **P** | Photo / staging | `…/18` |
| **P** | Expert fiscal CGF/CFPB | `…/12` |
| **P** | Déménagement | `…/17` |
| **C** | Satellites checklists + maj chiffres | — |

**KPI :** GMV services annexes, renewals assurance/fiscal, time-to-publish annonces.

---

### Vague 8+ — Expansion sélective (Mois 16–18+)

Ouvrir **seulement** si KPI vagues 1–7 OK :

| Candidats | Condition |
| --- | --- |
| Marketplace matériaux / maintenance | Volume chantier + gestion suffisant |
| Crédit MFI / épargne construction bancarisée | Partenaire bancaire signé |
| White-label branches / réseau agences | 2+ villes ou franchises prêtes |
| Location saisonnière | Stock meublé + conciergerie |
| Promoteur lots (co-marketing) | Programme TF sécurisé |

Sinon : **approfondir** V1–V4 (meilleure conversion, plus de contenu, 2ᵉ constructeur shortlist) plutôt qu’élargir.

---

## 5. Vue calendrier condensée

| Vague | Fenêtre | Parcours | Add-ons (≈) | Partenaires (≈) | Features cœur |
| --- | --- | --- | --- | --- | --- |
| **0** | S0–6 | Socle catalogue | 0 | 0 | Site + mandats + agent |
| **1** | M1–2 | Acheteur terrain | 3–4 | 3 (BTP, archi, notaire) | `/outils`, embeds fiche |
| **2** | M3–4 | Sécuriser / papiers | 4 | 2 (formalités, géomètre) | Checklist diligence |
| **3** | M5–6 | Location / gestion | 3–4 | 2 (assureur, caution) | Portails L / P |
| **4** | M7–8 | Diaspora | 4 | 1–2 (inspecteur) | Multi-devise, POA |
| **5** | M9–10 | Gros tickets | 3 | 2 (financier, crédit) | Estimation vendeur |
| **6** | M11–12 | Chantier / confort | 4 | 2 (énergie, VRD?) | Suivi chantier |
| **7** | M13–15 | Densifier | 4 | 3 | Carte prix, staging |
| **8+** | M16–18+ | Expansion | ≤5 | ≤3 | Seulement si preuves |

**Charge typique / vague :** ~8–12 “ouvertures” max (A+P+F+C), **jamais 20–30**.

---

## 6. Matrice “dormant jusqu’à…”

Tout le reste du catalogue reste **documenté mais fermé** :

| Catégorie specs | Exemples dormants | Débloqué en vague |
| --- | --- | --- |
| Matériaux, white-label, MFI | 27, 28, 40 | 8+ |
| Forage, clôture, groupe élec | 41, 44, 45 | 6 ou 7 si demande |
| Colocation, saisonnier | 47, 49 | 8+ |
| Avocat, huissier, syndic | partenaires 07, 19, 22 | 7+ ou ad hoc litige |

---

## 7. Gouvernance

| Rituel | Fréquence | Décision |
| --- | --- | --- |
| **Kickoff vague** | Début de vague | Liste figée A/P/F/C (écrit dans ce doc ou ticket épique) |
| **Review mid-vague** | Mi-parcours | Couper scope si retard — ne pas ajouter |
| **Rétro + KPI** | Fin de vague | Go vague N+1 / prolonger / pivot parcours |
| **Revue catalogue** | Trimestrielle | Archiver specs mortes, promouvoir 1–2 dormants max |

**Owner vague :** un responsable unique (fondateur / PM) — pas “tout le monde ouvre des add-ons”.

---

## 8. Risques hub & mitigations

| Risque | Mitigation |
| --- | --- |
| Se disperser (trop d’ouvertures) | Budget §2 + kickoff figé |
| Syndrome Keur City (contenu sans produit) | Chaque pilier blog → CTA outil ou partenaire de la vague |
| Partenaire qui déçoit | Shortlist 2–3, SLA, clause de sortie |
| Devenir BTP / banque par accident | Règle : on orchestre, on n’exécute pas le métier partenaire |
| Hub “vide” (promesse &gt; preuve) | Vague 0–1 d’abord ; ne pas communiquer “écosystème” avant 3 partenaires live |
| Lab crawl qui mange le build hub | Lab = voie parallèle (`research-lab/`) ; spike seulement après Vague 0 |

---

## 9. Message externe (quand c’est vrai)

À n’utiliser qu’après **Vague 1 Done** (simus + 3 partenaires live) :

> *Votre hub immobilier au Sénégal — biens vérifiés, outils pour décider, partenaires pour exécuter.*

Avant : rester sur le message agence (`positioning.md`).

---

## 10. Prochaine action immédiate

1. **Verrouiller Vague 0 → 1** (dates réelles selon dispo équipe).  
2. **Signer** les 3 conventions P0 Vague 1 (constructeur, archi, notaire) — remplir §12 des fiches partenaires.  
3. **Build** les 3 simulateurs + CTA partenaires.  
4. **Publier** 2 piliers blog branchés.  
5. Ne rien ouvrir d’autre jusqu’au **Done** Vague 1.

---

*Document vivant : mettre à jour les dates et cocher les vagues au fur et à mesure. Le catalogue add-ons/partenaires reste la bibliothèque ; ce fichier est le **plan de sortie**.*
