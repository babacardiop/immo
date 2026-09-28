# Blog & guides — stratégie éditoriale

**Objectif :** un blog / centre de guides à **très haute valeur ajoutée** qui aide réellement à décider (acheter, louer, construire, gérer) au Sénégal — pas du contenu SEO creux.

Le blog est un **produit d’aide à la décision**, branché sur le catalogue, les simulateurs et les add-ons (`docs/add-ons/`).

---

## 1. Positionnement contenu

| On est | On n’est pas |
| --- | --- |
| Guides d’agence de terrain (vérifié, actionnable, daté) | Blog lifestyle “dream home” générique |
| Checklists + chiffres FCFA + pièges réels | Listicles de 600 mots sans sources |
| Contenu qui **réduit le risque** (arnaques, TF, diaspora) | Contenu qui pousse à acheter dans la précipitation |
| FR clair (Sénégal + diaspora France/Europe/US) | Jargon notarial indigeste sans explication |

**Promesse :** *« Avant de signer ou de payer, lis ça. »*

**Voix :** agence full-service crédible (`docs/positioning.md`) — experte, calme, transparente, jamais clickbait.

---

## 2. Barème qualité (non négociable)

Chaque article **pilier** doit :

1. **Répondre à une décision** (go / no-go / prochaine étape).
2. Contenir une **checklist** ou un **arbre de décision**.
3. Citer des **ordres de grandeur FCFA** datés (ou dire clairement “devis obligatoire”).
4. Distinguer **TF / bail / délibération / domaine national**.
5. Avoir un **CTA utile** : simulateur, diligence, WhatsApp conseiller — pas “Achetez maintenant”.
6. Inclure une **FAQ** (schema.org) 5–8 questions.
7. Être **relus** par quelqu’un du métier (agent / partenaire notaire) avant pub.
8. Afficher **date de mise à jour** + bandeau “chiffres indicatifs — vérifier”.
9. Longueur cible piliers : **2 000–4 000+ mots** (comme les meilleurs guides SN : ImmoConnexion ~29 min de lecture).
10. **Maillage** : liens vers 2–4 autres guides + 1 outil + 1–2 annonces exemples (si pertinent).

Articles **courts** (800–1 200 mots) autorisés seulement pour actus / alertes / mises à jour légales — toujours avec “ce que ça change pour toi”.

---

## 3. Architecture du site

```
/blog                     → hub éditorial (filtres par parcours)
/blog/[slug]              → article
/guides                   → alias ou hub “guides décision” (SEO)
/guides/[slug]            → peut pointer vers mêmes contenus
/outils/*                 → simulateurs (CTA depuis articles)
```

Tech (aligné `docs/tech-stack.md`) :

- Next.js App Router + **MDX** (ou CMS headless plus tard)
- `generateMetadata` + OG cards (`docs/social-share-cards.md`)
- JSON-LD `Article` + `FAQPage` + `HowTo` quand checklist
- Images `next/image`, TOC sticky mobile
- Internes : composant `<SimulatorEmbed id="construction" />`, `<CtaDiligence />`, etc.

---

## 4. Piliers éditoriaux (5 hubs)

| Hub | Intention lecteur | Synergie produit |
| --- | --- | --- |
| **A. Sécuriser l’achat** | Ne pas se faire arnaquer (TF, NICAD, notaire) | Diligence, bornage, notaire, estimation |
| **B. Terrains & construction** | Du terrain nu à la maison | Simus mensualité / construction / budget total |
| **C. Louer & gérer** | Bail, caution, loyers, impayés | Caution, EDL, PNO, portail proprio |
| **D. Diaspora** | Acheter / construire à distance | Inspection, procuration, escrow, multi-devise |
| **E. Argent & décisions** | Combien ça coûte vraiment | Frais notaire, mensualités, épargne chantier |

Chaque hub a : **1 page hub** + **6–12 guides piliers** + articles satellites.

---

## 5. Backlog piliers v1 (haute valeur) — à publier en priorité

### Hub A — Sécuriser l’achat

| # | Titre de travail | Angle décision | CTA |
| --- | --- | --- | --- |
| A1 | **Titre foncier vs bail vs délibération : lequel acheter ?** | Matrice risques + tableau comparatif + seuils tutelle 10/50 ha | Filtre catalogue TF/bail |
| A2 | **Les documents fonciers à exiger (NICAD, EDR, plan, tutelle…)** | Checklist avant tout versement | Diligence add-on |
| A3 | **État des droits réels : comment le demander et le lire** | Étape qui sauve des millions | Pack notaire |
| A4 | **Arnaques immobilières au Sénégal : red flags WhatsApp** | Liste noire + séparation des rôles diaspora | Inspection diaspora |
| A7 | **Glossaire foncier en 10 minutes** (NICAD, CCOD, DGSCOS, Yastal…) | Lexique actionnable | Lien `dossier/…/07` |
| A5 | **Frais de notaire et mutation : budget réel 2026** | Calculateur embarqué | Outil frais acquisition |
| A6 | **Bornage : pourquoi le géomètre n’est pas optionnel** | Superficie réelle vs promise | Lead géomètre |

### Hub B — Terrains & construction

| # | Titre de travail | Angle décision | CTA |
| --- | --- | --- | --- |
| B1 | **Acheter un terrain en 2026 : erreurs à éviter (guide complet)** | Parcours étape par étape | Catalogue terrains |
| B2 | **Combien coûte construire une maison au Sénégal ?** | FCFA/m² + imprévus 10–15% | Simu construction |
| B3 | **Terrain + maison : budget total (achat, frais, chantier)** | Un seul chiffre mental | Simu budget total |
| B4 | **Autorisation de construire : étapes, pièces & délais réels** (TeleDAc ≠ guichet de masse) | Go admin sans illusion | Pack permis |
| B4b | **Arrêt Dscos / contentieux occupation : ce que ça change pour ton chantier** | Go / no-go zone | Diligence + disclaimer |
| B8 | **De la délibération au bail (Yastal) : comment régulariser** | Parcours A→B chiffré en mois | Add-on régularisation `43` |
| B5 | **Viabiliser un terrain : fosse, clôture, eau, électricité** | Coûts oubliés | Simu prêt-à-bâtir |
| B6 | **Payer un terrain en plusieurs fois : comment ça marche vraiment** | Étalé sans bullshit | Simu mensualité |
| B7 | **Diamniadio / Lac Rose / Petite Côte : où acheter selon ton projet** | Zoning décisionnel | Landings SEO villes |

### Hub C — Louer & gérer

| # | Titre de travail | Angle décision | CTA |
| --- | --- | --- | --- |
| C1 | **Louer à Dakar : caution, bail, pièges (guide 2026)** | Ne pas payer 3–4 mois sans cadre | Caution digitale |
| C2 | **État des lieux : modèle + photos qui tiennent en litige** | Protéger caution | EDL digital |
| C3 | **Assurance habitation & PNO : ce qu’il faut vraiment** | Locataire vs bailleur | Assurances |
| C4 | **Confier son bien en gestion : ce que doit faire une agence** | Choisir mandat | Portail proprio |
| C5 | **Location meublée vs vide à Dakar** | Calcul durée / rentabilité | Catalogue location |
| C6 | **Location saisonnière Saly / Petite Côte : règles & rentabilité** | Investisseur | Conciergerie / saisonnier |

### Hub D — Diaspora

| # | Titre de travail | Angle décision | CTA |
| --- | --- | --- | --- |
| D1 | **Acheter au Sénégal depuis la France / l’Europe : protocole confiance** | Ordre: vérifier → mandater → payer | Inspection + diligence |
| D2 | **Procuration immobilière : clauses qui protègent (et celles qui exposent)** | Ne jamais sur-mandater | Assist POA |
| D3 | **Séquestre notarial : pourquoi ne jamais payer le vendeur en Wave** | Règle d’or argent | Pack notaire / escrow |
| D4 | **Construire à distance : suivi de chantier sans te faire plumer** | Jalons + reporting | Suivi chantier |
| D5 | **Famille & immobilier : co-acquisition et conflits à anticiper** | Gouvernance familiale | Co-acquisition |

### Hub E — Argent & décisions

| # | Titre de travail | Angle décision | CTA |
| --- | --- | --- | --- |
| E1 | **Simulateur mental : mensualité terrain — exemples chiffrés** | “Est-ce que je peux ?” | Simu mensualité |
| E2 | **Épargner pendant l’étalé pour construire ensuite** | Jauge chantier | Épargne construction |
| E3 | **Solaire + clim : budgéter le confort après la maison** | Packs énergie | Kits solaire/clim |
| E4 | **Comparer “acheter maintenant” vs “louer encore 2 ans”** | Arbre de décision | Catalogues vente/location |

**Total v1 cible :** ~25 piliers (+ hubs). Qualité > quantité.

---

## 6. Formats d’articles (templates)

### Format GUIDE PILIER
1. Hook décision (scénario réel)
2. TL;DR / “À retenir” (5 puces)
3. Corps structuré H2/H3
4. Tableau comparatif ou chiffres
5. Checklist téléchargeable / copiable
6. Erreurs fréquentes
7. FAQ
8. Prochaine étape + CTA outil
9. Sources / mise à jour

### Format CHECKLIST EXPRESS (satellite)
- 1 décision, 1 liste numérotée, 1 CTA

### Format CHIFFRES & OUTIL
- Intro courte → **simulateur embarqué** → interprétation résultats → CTA humain

### Format ALERTE / MAJ LÉGALE
- Qu’est-ce qui change → pour qui → action sous 30 jours

---

## 7. Distribution & croissance

| Canal | Usage |
| --- | --- |
| SEO | Intentions longue traîne FR (“terrain titre foncier Bambilor”, “caution locative Dakar”) |
| WhatsApp | Share cards article + “envoie à la famille” (diaspora) |
| Facebook / TikTok / IG | Extraits checklist + lien guide (OG 3 formats) |
| Email / newsletter | 1 digest / mois : meilleur guide + 3 annonces |
| Conseillers | PDF one-pager des checklists en RDV |

---

## 8. Gouvernance éditoriale

| Rôle | Responsabilité |
| --- | --- |
| Rédacteur / content lead | Draft MDX, structure, SEO on-page |
| Expert métier (agent senior) | Validation faits & process |
| Partenaire notaire (ponctuel) | Relecture guides A/D sensibles |
| Prod | Embeds outils, perf, schema |

**Cadence v1 :** 2 piliers / mois + 2 satellites.  
**Revue :** chaque pilier chiffré revalidé **1× / an** (ou après changement fiscal/urbanisme).

---

## 9. KPIs contenu

| KPI | Cible indicative an 1 |
| --- | --- |
| Sessions organiques /blog+/guides | Croissance MoM |
| Temps moyen sur pilier | > 3 min |
| CTR guide → outil | > 8 % |
| Guide → lead WhatsApp / estimation | Tracké UTM |
| Backlinks / mentions | Qualitatifs (médias, diaspora) |

---

## 10. Lien avec le reste du système

- Add-on contenu : `docs/add-ons/specs/07-contenu-marketing-b2b/05-guides-seo.md` (à traiter comme **Blog** élargi)
- Outils cités dans les CTA : specs `01`–`24` P0/P1
- Share : `docs/social-share-cards.md`
- Positionnement : aide à la décision = confiance d’**agence**, pas marketplace

---

## 11. Prochaines livrables dans ce dossier

| Fichier | Rôle |
| --- | --- |
| [`briefs/`](./briefs/) | Briefs article par article (angle, outline, CTA, mots-clés) |
| [`calendrier-editorial.md`](./calendrier-editorial.md) | Ordre de publication 6 mois |

---

## 12. Benchmark concurrentiel (résumé)

**Doc complet :** [`benchmark-editorial.md`](./benchmark-editorial.md) — matrice scores, fiches acteurs, white space, implications backlog.

| Rang | Acteur | Rôle vs nous |
| --- | --- | --- |
| Or historique | [Keur City](https://keurcity.com/actualites/) | Barre de fond (procédures) — blog mort depuis fin 2023 |
| #1 actifs | [ImmoConnexion](https://immoconnexion.com/acheter-un-terrain-au-senegal/) + [MyAfric](https://www.myafric.com/fr/acheter-senegal-depuis-france-diaspora/) | Foncier long-form / diaspora — à égaler puis battre avec outils |
| #2 | [SenPages](https://www.senpages.com/dossiers/acheter-un-terrain) + [SamaGalle](https://samagalle.com/blog/documents-fonciers-essentiels-immobilier-senegal-guide-2026) | Chiffres DGID, CGF/CFPB, TF — sources barèmes |
| #3 | [Inv. Immo Afrique](https://investissementimmoafrique.com/blog/autorisation-de-construire-au-senegal/) | Permis / AC — **croiser** avec délais réels & TeleDAc non fiable |
| Bruit SEO | Nadia Immo, Keur Immo (partiel) | Ne pas imiter le volume creux |

**Notre moat éditorial :** profondeur Keur City × fraîcheur ImmoConnexion/MyAfric × **simulateurs + catalogue agence curated** × **Observatoire** (études officielles + lab crawl).

**Sources macro / études (PDFs) :** [`docs/research-lab/etudes/`](../research-lab/etudes/README.md) — ANSD ICC/IMC/ICAS, CAHF, BM, IFC, Habitat III.
