# User stories & backlog initial

**Document :** Dossier · Tech · Site · 12  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`11-cahier-des-charges-fonctionnel.md`](./11-cahier-des-charges-fonctionnel.md) · [`10-roadmap-features.md`](./10-roadmap-features.md) · [`02-parcours-utilisateurs.md`](./02-parcours-utilisateurs.md) · [`03-wireframes-mvp.md`](./03-wireframes-mvp.md)  
**Aval :** tickets sprint · [`14-matrice-droits-roles.md`](./14-matrice-droits-roles.md) · proto `17`

> **Rôle :** traduire les **EF-\*** / **FEAT-\*** en user stories **« En tant que… »** + critères d’acceptation, et figer le **backlog initial** (MVP Vague 0–1 + icebox V2+).

---

## 0. En une phrase

Backlog ordonné : **stories INVEST** découpées en tranches verticales — d’abord catalogue+CRM+BO (V0), puis simus+partenaires (V1) ; le reste est icebox, pas « bientôt ».

```
EF-* (CdCF) → Epic → US-Vn-xx → AC Given/When/Then → sprint tasks
```

---

## 1. Convention rédaction

Bench 2026 ([IdeaPlan](https://www.ideaplan.io/templates/user-story-template), [StackPractices](https://stackpractices.com/docs/user-story-template/), [GitScrum](https://docs.gitscrum.com/en/best-practices/creating-actionable-user-stories), [MoSCoW](https://www.em-tools.io/templates/moscow-prioritization)) :

| Élément | Règle EverGreen |
| --- | --- |
| Format | **En tant que** [persona], **je veux** [action], **afin de** [bénéfice] |
| AC | 3–6 critères · **Given / When / Then** · inclure 1 négatif si gate |
| INVEST | Indépendante, Négociable, Valuable, Estimable, Small (≤1 sprint), Testable |
| Taille | Fibonacci **1–8** · si ≥13 → split |
| MoSCoW | Hérité vague `10` · Must ≤60 % effort sprint |
| Split | **Vertical slice** (valeur user) — pas front/back séparés |
| Spike | Time-box 1–2 j → reco, pas feature |

### 1.1 Personas (raccourci)

| Code | Qui | Journey |
| --- | --- | --- |
| **VIS** | Visiteur / prospect | J1–J5 découverte |
| **ACH** | Acheteur (Mamadou) | J1 |
| **VEN** | Vendeur (Marième) | J2 |
| **LOC** | Locataire (Aïssatou) | J3 |
| **BAI** | Bailleur (Ousmane) | J4 |
| **DIA** | Diaspora (Fatou) | J5 |
| **AGT** | Agent AC | BO |
| **OD** | Ops / direction | BO élargi |
| **ADM** | Admin tech | Config |

### 1.2 Statuts backlog

| Statut | Sens |
| --- | --- |
| `Ready` | AC OK · estimable · deps claires |
| `Next` | Top of backlog MVP |
| `Later` | Vague connue, pas découpé fin |
| `Icebox` | V2+ ou Won’t Y1 |
| `Done` | Recette OK |

### 1.3 Definition of Done (globale)

- [ ] AC Given/When/Then vérifiés (QA ou auteur + eng)  
- [ ] Mobile OK (parcours critique)  
- [ ] Copy FR · disclaimers métier si applicable  
- [ ] Event / source CRM si interaction lead  
- [ ] Pas de régression publish gates papier  
- [ ] Lien EF / FEAT renseigné  

---

## 2. Carte des epics

| Epic | Code | Vague cœur | EF modules |
| --- | --- | :---: | --- |
| Socle site & legal | **E-SITE** | V0 | EF-SITE, EF-SEO |
| Catalogue & fiches | **E-CAT** | V0 | EF-CAT |
| Capture & CRM | **E-CRM** | V0 | EF-CRM |
| Back-office agent | **E-BO** | V0 | EF-BO, EF-ADM |
| Confiance contenu | **E-CNT** | V0 | EF-SITE-05, C |
| Outils simulateurs | **E-OUT** | V1 | EF-OUT |
| Partenaires intros | **E-PAR** | V1 | EF-PAR, EF-CRM-09 |
| Sécuriser diligence | **E-SEC** | V2 | EF-CAT-10, EF-BO-08, EF-OUT-08 |
| Location & gestion | **E-LOC** | V3 | EF-POR |
| Diaspora Secure | **E-DIA** | V4 | EF-DIA |
| Gros tickets | **E-GRO** | V5 | EF-OUT-09, EF-PAR-07 |
| Chantier / confort | **E-CHA** | V6 | EF-OUT-10 |
| Observatoire | **E-OBS** | V7 | EF-OUT-11 |

---

## 3. Backlog ordonné MVP (Vague 0 → 1)

Ordre de delivery suggéré (dépendances). Points = ordre de grandeur relatif.

### 3.1 Vague 0 — Must / Should

#### Epic E-SITE

##### US-V0-01 — Home parcours
**En tant que** VIS, **je veux** comprendre en un écran que EverGreen est une agence (acheter / louer / gérer / diaspora) avec une recherche, **afin de** choisir mon parcours sans dashboard marketing.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · Epic E-SITE · EF-SITE-01 · FEAT-V0-01 · `Ready`/`Next` |

**AC :**
1. Given je charge `/` sur mobile, When le hero s’affiche, Then je vois la marque dominante + 1 headline + 1 phrase + CTA group + search — **pas** de bandeau stats.  
2. Given je tape une zone dans search, When je valide, Then j’arrive sur catalogue filtré ou `/acheter`.  
3. Given je clique un parcours (ex. Gérer), When la nav répond, Then j’atterris sur le hub correspondant.

##### US-V0-02 — Nav + pages agence + legal
**En tant que** VIS, **je veux** accéder à l’agence et aux mentions légales, **afin de** faire confiance et vérifier l’identité.

| | |
| --- | --- |
| MoSCoW | Must · Pts **3** · EF-SITE-02/03 · FEAT-V0-01 |

**AC :**
1. Given je suis sur n’importe quelle page public, When j’ouvre la nav, Then ≤7 items métier + liens footer legal.  
2. Given j’ouvre `/agence/contact` et CGU / confidentialité / mentions, When les pages chargent, Then contenu FR lisible + NAP cohérent.

##### US-V0-03 — Hubs Gérer & Diaspora (landing)
**En tant que** BAI ou DIA, **je veux** une page promesse + CTA clair, **afin de** démarrer sans chercher dans le catalogue.

| | |
| --- | --- |
| MoSCoW | Must · Pts **3** · EF-SITE-04 · FEAT-V0-01 |

**AC :**
1. Given `/gerer`, When je scroll, Then promesse gestion + form/WA ≤4 champs.  
2. Given `/diaspora`, When je vois les CTA, Then message confiance (pas Wave vendeur) visible près du CTA.

---

#### Epic E-CAT

##### US-V0-10 — Catalogue acheter / louer + filtres
**En tant que** ACH ou LOC, **je veux** filtrer les biens (type, zone, prix, **papier**, transaction), **afin de** ne voir que des annonces pertinentes et crédibles.

| | |
| --- | --- |
| MoSCoW | Must · Pts **8** · EF-CAT-01/07 · FEAT-V0-02 · `Next` |

**AC :**
1. Given des listings `published`, When j’ouvre `/acheter` ou `/louer`, Then je vois une liste cards (prix FCFA, zone, pastille papier si vente).  
2. Given je filtre `paper_type=tf`, When j’applique, Then seuls les biens TF restent.  
3. Given aucun résultat, When la liste est vide, Then message clair + CTA WA / élargir filtres.

##### US-V0-11 — Fiche bien + CTA WA
**En tant que** ACH, **je veux** une fiche complète (photos, prix, surfaces, carte, description, pastille papier) et contacter en un tap WhatsApp, **afin d’**évaluer puis engager une visite.

| | |
| --- | --- |
| MoSCoW | Must · Pts **8** · EF-CAT-02 · EF-CRM-04 · FEAT-V0-03 |

**AC :**
1. Given un listing published, When j’ouvre `/acheter/[slug]`, Then galerie, prix FCFA, surfaces, carte, description, pastille papier above-the-fold.  
2. Given je clique CTA WA, When WhatsApp s’ouvre, Then le message contient intent + titre + URL.  
3. Given mobile, When je scroll, Then CTA WA reste accessible (FAB ou sticky).

##### US-V0-12 — Publish gate papier + disclaimer délibération
**En tant que** AGT, **je veux** que le système refuse de publier sans papier valide et force un disclaimer délibération, **afin de** protéger la marque et l’acheteur.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-CAT-03/04/05 · FEAT-V0-03 · RG-02 |

**AC :**
1. Given un draft vente sans `paper_type`, When je clique Publier, Then l’action est **bloquée** avec message explicite.  
2. Given `paper_type=deliberation`, When la fiche est published, Then disclaimer fort visible et **aucun** badge TF.  
3. Given `paper_type=tf|bail_*` conforme, When je publie, Then status `published` + pastille correcte.

##### US-V0-13 — Statuts listing
**En tant que** AGT, **je veux** passer un bien en reserved / sold / rented / archived, **afin de** refléter le stock réel.

| | |
| --- | --- |
| MoSCoW | Must · Pts **3** · EF-CAT-06 |

**AC :**
1. Given un listing published, When je passe `sold`, Then la fiche publique indique non disponible (ou redirect catalogue) selon règle produit figée.  
2. Given `archived`, When un VIS utilise l’ancienne URL, Then comportement soft-404 ou message défini — pas de lead trompeur.

##### US-V0-14 — Map liste / fiche (Should)
**En tant que** ACH, **je veux** voir le bien sur une carte OSM, **afin de** situer le quartier.

| | |
| --- | --- |
| MoSCoW | Should · Pts **5** · EF-CAT-08 · FEAT-V0-10 |

**AC :**
1. Given geo renseignée, When j’ouvre la fiche, Then une carte Leaflet affiche le point ou zone.  
2. Given geo absente, When la fiche charge, Then pas d’erreur — carte masquée ou placeholder.

##### US-V0-15 — Landings zone SEO (Should)
**En tant que** VIS venant de Google, **je veux** une page zone (ex. Almadies) avec listings filtrés, **afin de** atterrir utilement.

| | |
| --- | --- |
| MoSCoW | Should · Pts **5** · EF-CAT-09 · FEAT-V0-04 |

**AC :**
1. Given `/acheter/[zone]` configurée, When je charge, Then intro + listings de la zone + lien guide si existant.  
2. Given meta FR, When j’inspecte le head, Then title/description zone-specific.

---

#### Epic E-CRM

##### US-V0-20 — Lead form → CRM société
**En tant que** OD, **je veux** que chaque form contact/gérer crée un lead société avec source et owner, **afin de** ne perdre aucun prospect.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-CRM-01/02/05/06/07 · FEAT-V0-05 |

**AC :**
1. Given un form ≤4 champs soumis valide, When le webhook/API répond, Then un lead existe avec `source`, `intent`, `owner`, timestamp.  
2. Given téléphone déjà connu, When nouveau submit, Then dédup soft ou même record enrichi (pas orphelin silencieux).  
3. Given submit OK, When user voit confirmation, Then message « on vous répond sous 24 h » (ou ack auto).

##### US-V0-21 — Clic WA → lead / event
**En tant que** OD, **je veux** tracer les clics WA fiche/FAB, **afin de** mesurer et assigner.

| | |
| --- | --- |
| MoSCoW | Must · Pts **3** · EF-CRM-02/04 · FEAT-V0-05 |

**AC :**
1. Given CTA `wa_fiche`, When clic, Then event analytics + payload `listing_id` loggable.  
2. Given inbox société, When l’agent répond, Then le thread n’est pas un numéro perso isolé (process + config doc `07`).

##### US-V0-22 — SLA ack + tâche agent
**En tant que** AGT, **je veux** une tâche / notif sur nouveau lead, **afin de** répondre dans les SLA.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-CRM-03 · FEAT-V0-05 |

**AC :**
1. Given nouveau lead, When créé, Then ack auto &lt; 2 min **ou** confirmation page + notif agent créée.  
2. Given lead non touché &gt; 24 h, When OD consulte, Then le lead apparaît overdue (dashboard ou file).  
3. Given lead tagué chaud, When créé en heures ouvrées, Then priorité / SLA cible &lt; 1 h visible.

##### US-V0-23 — Pipeline stages + notes
**En tant que** AGT, **je veux** faire avancer un lead dans des stages avec notes, **afin de** ne pas dépendre de la mémoire WhatsApp.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-CRM-08 |

**AC :**
1. Given un lead, When je change de stage, Then l’historique conserve l’ancien stage + timestamp.  
2. Given nurture / follow_later, When je classe ainsi, Then ce n’est **pas** équivalent à lost/deleted.  
3. Given note ajoutée, When un autre agent OD ouvre, Then la note est visible (société).

---

#### Epic E-BO

##### US-V0-30 — Auth agent + shell BO
**En tant que** AGT, **je veux** me connecter à `/espace/agent`, **afin d’**accéder à mon espace ops.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-BO-01 · EF-ADM-01 · FEAT-V0-06 |

**AC :**
1. Given credentials valides, When login, Then j’accède au shell BO.  
2. Given VIS non auth, When j’ouvre `/espace/agent`, Then redirect login.  
3. Given rôle Agent, When j’essaie une route admin, Then refus (403 / hide).

##### US-V0-31 — CRUD annonces
**En tant que** AGT, **je veux** créer / éditer une annonce (champs `05`) et publier si gates OK, **afin de** mettre le stock en ligne.

| | |
| --- | --- |
| MoSCoW | Must · Pts **8** · EF-BO-02 · FEAT-V0-06 · écrans W-AGT |

**AC :**
1. Given formulaire complet, When je sauve draft, Then listing `draft` persisté.  
2. Given gates papier OK + photos min, When je publie, Then listing live sur `/acheter` ou `/louer`.  
3. Given champ requis manquant, When publish, Then erreurs champ-par-champ.

##### US-V0-32 — Mandats registre
**En tant que** AGT, **je veux** enregistrer un mandat (exclusive/simple, n°, échéance) lié au listing, **afin de** tracer le droit de publier.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-BO-03 · FEAT-V0-06 |

**AC :**
1. Given création mandat, When sauvé, Then visible dans registre avec dates.  
2. Given listing sans mandat, When publish attempted, Then warning ou blocage selon règle OD figée au kickoff.

##### US-V0-33 — Upload docs / photos
**En tant que** AGT, **je veux** uploader photos et PDF mandat, **afin de** alimenter fiche et vault.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-BO-04 |

**AC :**
1. Given images valides, When upload, Then elles apparaissent en galerie fiche après publish.  
2. Given PDF mandat, When upload, Then lié au mandat — **non** exposé public.  
3. Given fichier non autorisé / trop lourd, When upload, Then erreur claire.

##### US-V0-34 — File leads assignés
**En tant que** AGT, **je veux** voir mes leads et la next action, **afin de** traiter ma file du jour.

| | |
| --- | --- |
| MoSCoW | Must · Pts **3** · EF-BO-05 · EF-ADM-02 |

**AC :**
1. Given leads assignés à moi, When j’ouvre `/espace/agent/leads`, Then je les vois triés (SLA / date).  
2. Given lead d’un autre agent, When je suis Agent (pas OD), Then je ne le vois pas.

##### US-V0-35 — Dashboard SLA matin (Should)
**En tant que** AGT/OD, **je veux** un aperçu overdue, **afin de** prioriser.

| | |
| --- | --- |
| MoSCoW | Should · Pts **3** · EF-BO-06 |

**AC :**
1. Given leads overdue, When j’ouvre le dashboard, Then compteur + liste courte.  
2. Given zéro overdue, When j’ouvre, Then état vide positif (pas d’erreur).

---

#### Epic E-CNT + SEO

##### US-V0-40 — Guide teaser TF vs bail + page process
**En tant que** ACH, **je veux** lire comment l’agence travaille et la différence TF/bail/délibération, **afin de** réduire la peur d’arnaque.

| | |
| --- | --- |
| MoSCoW | Must · Pts **3** · FEAT-V0-08/09 · EF-SITE-05 |

**AC :**
1. Given `/agence/...` process + `/guides/...` teaser, When je lis, Then CTA catalogue ou WA présents.  
2. Given glossaire, When termes TF/bail/délibération, Then définitions alignées `etude-de-marche/07`.

##### US-V0-41 — SEO technique fiche
**En tant que** VIS Google, **je veux** des fiches indexables avec rich results possibles, **afin de** découvrir EverGreen hors FB.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-SEO-01/02/03/05 · FEAT-V0-07 |

**AC :**
1. Given fiche published, When view-source, Then JSON-LD RealEstateListing présent.  
2. Given sitemap, When fetch `/sitemap*.xml`, Then fiches listées.  
3. Given images, When fiche mobile, Then `next/image` (pas full-res brut non borné).

##### US-V0-42 — OG share cards (Should)
**En tant que** ACH partageant sur WA, **je veux** une preview propre, **afin d’**attirer mon réseau.

| | |
| --- | --- |
| MoSCoW | Should · Pts **3** · EF-SEO-04 · FEAT-V0-11 |

**AC :**
1. Given fiche, When OG scraped, Then title FR + image 1200×630 cohérents.

---

### 3.2 Vague 1 — Must / Should

#### Epic E-OUT

##### US-V1-01 — Hub `/outils`
**En tant que** ACH, **je veux** un hub listant les calculateurs, **afin de** démarrer sans fiche précise.

| | |
| --- | --- |
| MoSCoW | Must · Pts **3** · EF-OUT-01 · FEAT-V1-04 · `Ready` post-V0 |

**AC :**
1. Given nav V1, When je clique Outils, Then `/outils` liste PUB-01/02/03 avec liens.  
2. Given SEO, When meta hub, Then title/description FR outils.

##### US-V1-02 — Simu mensualité étalé
**En tant que** ACH, **je veux** estimer ma mensualité d’achat étalé / loc-vente sans compte, **afin de** savoir si je peux payer — **sans** croire que c’est un prêt banque.

| | |
| --- | --- |
| MoSCoW | Must · Pts **8** · EF-OUT-02/05 · FEAT-V1-01 · RG-04 |

**AC :**
1. Given inputs valides (prix, apport, durée…), When je calcule, Then résultat FCFA **immédiat** (ungated).  
2. Given résultat affiché, When je lis la page, Then disclaimer visible « estimation · pas offre de crédit bancaire ».  
3. Given CTA in-result, When je clique WA, Then message inclut résumé scénario.  
4. Given inputs incohérents, When calcul, Then erreur champ sans crash.

##### US-V1-03 — Simu coût construction
**En tant que** ACH, **je veux** estimer le coût de construction, **afin de** budgéter après le terrain.

| | |
| --- | --- |
| MoSCoW | Must · Pts **8** · EF-OUT-03 · FEAT-V1-02 |

**AC :**
1. Given surface + standing/barème, When calcul, Then fourchette FCFA ungated.  
2. Given disclaimer, When résultat, Then « estimation · pas devis ».  
3. Given CTA, When clic, Then WA ou intro partenaire BTP trackable.

##### US-V1-04 — Simu budget total
**En tant que** ACH, **je veux** agréger terrain + construction + frais, **afin de** voir le ticket global.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-OUT-04 · FEAT-V1-03 |

**AC :**
1. Given préremplissage depuis PUB-01/02 ou saisie, When calcul, Then total FCFA + détail lignes.  
2. Given CTA, When contact, Then `sim_scenario` JSON attachable au lead.

##### US-V1-05 — Embed simus fiche terrain
**En tant que** ACH sur une fiche terrain, **je veux** lancer un simu sans quitter la fiche, **afin de** décider plus vite.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-OUT-06 · FEAT-V1-05 |

**AC :**
1. Given `property_type=land` published, When fiche, Then embed compact (mensualité et/ou construction) visible.  
2. Given prix listing, When embed charge, Then prix prérempli si pertinent.  
3. Given « voir en plein écran », When clic, Then deep-link `/outils/...` avec query.

##### US-V1-06 — Event `sim_complete` + lead soft
**En tant que** OD, **je veux** mesurer les simus complétés et capturer email/WA post-résultat, **afin de** nurturer.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-CRM-11 · FEAT-V1-11 |

**AC :**
1. Given calcul réussi, When résultat affiché, Then event `sim_complete` (outil, params hash).  
2. Given soft gate email optionnel, When submit, Then lead `form_sim_email` + scénario.

##### US-V1-07 — Embed guide MDX (Should)
**En tant que** VIS lisant un guide, **je veux** un calculateur ou CTA bandeau, **afin d’**agir sans re-chercher.

| | |
| --- | --- |
| MoSCoW | Should · Pts **3** · EF-OUT-07 · EF-SEO-06 |

**AC :**
1. Given guide M1 construction, When lecture, Then `SimulatorEmbed` ou CTA outil/P visible.

---

#### Epic E-PAR

##### US-V1-10 — CTA partenaires + PartnerLead
**En tant que** ACH après simu, **je veux** être mis en relation avec constructeur / archi / notaire, **afin d’**avancer avec un pro — sans que EverGreen fasse leur métier.

| | |
| --- | --- |
| MoSCoW | Must · Pts **5** · EF-PAR-01/02/03 · EF-CRM-09 · FEAT-V1-06…09 |

**AC :**
1. Given CTA « Intro constructeur », When clic + consent, Then objet **PartnerLead** créé (partenaire, lead parent, source).  
2. Given PartnerLead, When agent/OD ouvre, Then statut intro + notes.  
3. Given UI, When copy, Then EverGreen = orchestration (pas « nous construisons »).

##### US-V1-11 — Piliers blog V1 + CTA
**En tant que** VIS SEO, **je veux** des guides coût construction / TF branchés outils, **afin de** décider puis convertir.

| | |
| --- | --- |
| MoSCoW | Must · Pts **3** (contenu) · FEAT-V1-10 · EF-SEO-06 |

**AC :**
1. Given 2 piliers publiés, When CTA, Then lien `/outils` ou WA partenaire.  
2. Given claims chiffrés, When citation, Then source officielle / caveat (pas crawl non gouverné).

##### US-V1-12 — Email digest post-simu (Could)
**En tant que** ACH, **je veux** recevoir mon scénario par email, **afin d’**y revenir.

| | |
| --- | --- |
| MoSCoW | Could · Pts **3** · FEAT-V1-12 |

**AC :**
1. Given email fourni, When envoi, Then mail FR avec chiffres + lien reprendre + unsubscribe.

---

## 4. Backlog seed Vague 2+ (icebox découpé léger)

Stories **Later/Icebox** — affiner au kickoff vague. Format court.

### 4.1 Vague 2 — E-SEC

| ID | Story | MoSCoW | Pts | EF |
| --- | --- | :---: | ---: | --- |
| US-V2-01 | En tant qu’ACH, je veux une checklist diligence (EDR/NICAD) + CTA, afin de sécuriser avant paiement | Must | 5 | diligence |
| US-V2-02 | En tant qu’ACH, je veux calculer les frais d’acquisition, afin d’anticiper le closing | Must | 5 | EF-OUT-08 |
| US-V2-03 | En tant qu’ACH, je veux demander un bornage / géomètre, afin de lever le doute bornes | Must | 3 | P |
| US-V2-04 | En tant qu’AGT, je veux cocher go/no-go diligence sur le dossier, afin de documenter la décision | Must | 5 | EF-BO-08 |
| US-V2-05 | En tant qu’OD, je veux bloquer le boost catalogue sans diligence min, afin d’appliquer la policy | Must | 3 | EF-CAT-10 |

### 4.2 Vague 3 — E-LOC

| ID | Story | MoSCoW | Pts | EF |
| --- | --- | :---: | ---: | --- |
| US-V3-01 | En tant que BAI, je veux voir loyers/retards/docs sur `/espace/proprio`, afin de suivre mon bien | Must | 8 | EF-POR-01 |
| US-V3-02 | En tant que LOC, je veux voir mon prochain loyer et quittances, afin de payer sereinement | Must | 8 | EF-POR-02 |
| US-V3-03 | En tant qu’AGT, je veux faire un EDL digital (photos+PDF), afin de sécuriser entrée/sortie | Must | 8 | EF-POR-04 |
| US-V3-04 | En tant que LOC/BAI, je veux un CTA caution/assurance, afin d’être couvert via partenaire | Should | 3 | EF-PAR-05 |
| US-V3-05 | En tant qu’acquéreur étalé, je veux mon échéancier et % payé, afin de suivre mon accession | Should | 5 | EF-POR-03 |

### 4.3 Vague 4 — E-DIA

| ID | Story | MoSCoW | Pts | EF |
| --- | --- | :---: | ---: | --- |
| US-V4-01 | En tant que DIA, je veux un pack `/diaspora` Secure, afin d’acheter à distance sans arnaque | Must | 5 | EF-DIA-01 |
| US-V4-02 | En tant que DIA, je veux commander une inspection à distance, afin de valider le bien | Must | 5 | EF-DIA-02 |
| US-V4-03 | En tant que DIA, je veux voir les prix aussi en EUR/USD, afin de budgéter depuis l’étranger | Must | 3 | EF-DIA-03 |
| US-V4-04 | En tant que DIA, je veux une aide procuration via notaire, afin de signer sans voyager | Should | 3 | EF-DIA-04 |
| US-V4-05 | En tant que DIA, je veux qu’on me refuse le paiement Wave vendeur, afin de passer par séquestre | Must | 2 | EF-DIA-05 |

### 4.4 Vague 5–7 — seed

| ID | Story | Vague | MoSCoW |
| --- | --- | :---: | :---: |
| US-V5-01 | En tant que VEN, je veux une estimation soft lead mandat, afin d’être rappelé | V5 | Must |
| US-V5-02 | En tant qu’ACH gros ticket, je veux intro financier/courtier, afin d’explorer le crédit banque (P) | V5 | Must |
| US-V6-01 | En tant qu’ACH post-terrain, je veux simu prêt-à-bâtir + checklist TeleDAC, afin de préparer le chantier | V6 | Must |
| US-V6-02 | En tant qu’ACH, je veux un suivi chantier léger, afin de voir les jalons | V6 | Should |
| US-V7-01 | En tant que VIS, je veux une carte prix / Observatoire sourcé, afin de calibrer le marché | V7 | Must |

### 4.5 Won’t / hors backlog Y1

| Thème | Motif |
| --- | --- |
| Self-publish vendeur | Positionnement |
| Simu « prêt bancaire » interne | RG-04 · courtier P seulement |
| App native | Web mobile |
| i18n EN | EF-SEO-07 |
| Trust accounting full | EF-BO-10 |
| Marketplace matériaux / WL | Vague 8+ |

---

## 5. Ordre de sprint suggéré (MVP)

| Sprint (indicatif) | Stories | Outcome |
| ---: | --- | --- |
| **S0** | US-V0-30, fondations data Listing/Lead | Auth + schéma |
| **S1** | US-V0-31, 32, 33, 12 | Agent peut publier gated |
| **S2** | US-V0-01, 02, 10, 11, 41 | Catalogue public crédible |
| **S3** | US-V0-20, 21, 22, 23, 34 | CRM + SLA |
| **S4** | US-V0-03, 40, 13, Should 14/15/35/42 | Confiance + polish V0 |
| **S5** | US-V1-01…04 | 3 simus live |
| **S6** | US-V1-05, 06, 10, 11 | Embeds + PartnerLead + contenu |

Ajuster selon capacité ; **ne pas** ouvrir E-SEC tant que Done V1 non atteint (`10`).

---

## 6. Matrice de traçabilité (extrait MVP)

| US | EF | FEAT | Journey |
| --- | --- | --- | --- |
| US-V0-10/11/12 | EF-CAT-* | V0-02/03 | J1, J3 |
| US-V0-20…23 | EF-CRM-* | V0-05 | all |
| US-V0-30…34 | EF-BO-* | V0-06 | AGT |
| US-V1-02…05 | EF-OUT-* | V1-01…05 | J1 |
| US-V1-10 | EF-PAR / CRM-09 | V1-06…09 | J1 A |

Recette CdCF **R1–R12** ← couverte surtout par US-V0-11/12, V0-20…22, V1-02…05, V1-10, V0-41.

---

## 7. Template copie-colle (nouvelle story)

```markdown
##### US-Vx-yy — Titre court
**En tant que** …, **je veux** …, **afin de** …

| | |
| --- | --- |
| MoSCoW | · Pts · Epic · EF- · FEAT- · Statut |

**AC :**
1. Given …, When …, Then …
2. Given …, When …, Then …
3. Given … (négatif), When …, Then …
```

---

## 8. Sources

| Source | Apport |
| --- | --- |
| CdCF `11` | EF-* normatifs |
| Roadmap `10` | FEAT ↔ vagues MoSCoW |
| Journeys `02` | Personas / JTBD |
| Wireframes `03` | Écrans V0–1 |
| IdeaPlan / StackPractices / GitScrum 2026 | INVEST · GWT · split |
| EM-Tools MoSCoW | Must ≤60 % |

---

## 9. Liens

| Doc | Usage |
| --- | --- |
| [`11-cahier-des-charges-fonctionnel.md`](./11-cahier-des-charges-fonctionnel.md) | Exigences |
| [`10-roadmap-features.md`](./10-roadmap-features.md) | Phasage |
| [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) | IDs écrans |
| [`04-crm-et-leads.md`](./04-crm-et-leads.md) | Stages SLA |
| [`14-matrice-droits-roles.md`](./14-matrice-droits-roles.md) | Droits (à forger) |

---

*User stories & backlog EverGreen Site v1.0 — sept. 2026. INVEST · GWT · MVP V0–1 ordonné · icebox V2–7 · Won’t list explicite.*
