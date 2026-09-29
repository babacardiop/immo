# Gouvernance sources — Citation & fraîcheur

**Document :** Dossier · Tech · Research lab · 06  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`02-catalogue-datasets.md`](./02-catalogue-datasets.md) · [`03-barometre-prix.md`](./03-barometre-prix.md) · [`05-pipeline-data.md`](./05-pipeline-data.md) · [`../../../docs/research-lab/data-sources.md`](../../../docs/research-lab/data-sources.md)  
**Aval :** Observatoire · blog · outils · deck / one-pager · `07-roadmap-lab.md`

> **Rôle :** règles **opérationnelles** pour citer correctement une source et décider si un chiffre est encore **publiable** (fraîcheur).  
> Inventaire licences → `02`. Pipeline WAP → `05`. Méthodo indices → `03`.

**⚠** Pas un avis juridique. Avocat avant republication commerciale lourde, microdonnées ANADS, ou carte « officialisée » ANAT.

---

## 0. En une phrase

Toute assertion chiffrée EverGreen porte **qui · quoi · quand · licence · horloge** — et un chiffre **périmé** s’affiche stale / se retire, il ne se maquille pas.

```
Source + période données + retrieved_at + license_code + canal
        →  citation canonique  →  SLA fraîcheur  →  go / stale / retract
```

---

## 1. Principes (non négociables)

| # | Principe | Implication |
| ---: | --- | --- |
| 1 | **Deux horloges** | `source_published_at` (ou période couverte) ≠ `retrieved_at` / `ingested_at` |
| 2 | **Citer le slice, pas « la data »** | Séries dynamiques = période + date d’accès (EU / DataCite / RDA) |
| 3 | **OWN ≠ officiel** | Indices EverGreen = asking dédup · jamais « prix officiel ANSD » |
| 4 | **Lien > miroir** | Préférer URL officielle ; PDF archivés = usage **interne** |
| 5 | **Agrégats only** (classifiés) | Pas de citation verbatim d’annonce concurrente |
| 6 | **Stale visible** | Timestamp + état · pas de zéro silencieux (`05`) |
| 7 | **Re-vérif avant public** | WEB-NOTE et pages État : re-check le jour J du publish |
| 8 | **Une voix marketing** | LinkedIn / presse / deck = chiffres issus d’un **PublishBundle** seulement |

---

## 2. Métadonnées obligatoires (record)

Tout dataset, série, snapshot ou chiffre publié doit pouvoir répondre :

| Champ | Obligatoire | Exemple |
| --- | :---: | --- |
| `dataset_id` | ● | DS-B01 · DS-A05 |
| `publisher` | ● | ANSD · EverGreen Lab |
| `title` / `series` | ● | ICC T1 2026 |
| `source_url` | ● | URL note / page |
| `license_code` | ● | PUB-CITE · OWN · ODbL… (`02`) |
| `period_start` / `period_end` | ● | 2026-01-01 → 2026-03-31 |
| `source_published_at` | ○→● | 2026-05-15 (parution ANSD) |
| `retrieved_at` | ● | 2026-09-20T14:00Z |
| `computed_at` | ● si dérivé | Calcul IX |
| `meth_version` | ● si OWN/indice | barometre-v1.0 |
| `n` / couverture | ● si indice | n=42 · Almadies appart |
| `public_ok` | ● | true/false |
| `pii_flag` | ● | false (agrégat) |
| `owner` | ● | lab@… |
| `checksum` | ● raw | SHA-256 PDF/payload |

Registre vivant : `registre-datasets.csv` (cf. `02` §5 · `05` §12).

---

## 3. Matrice citation par `license_code`

| Code | Citer comment | Republier brut ? | Notes |
| --- | --- | :---: | --- |
| **PUB-CITE** | Formule institutionnelle + URL + période | ✕ PDF miroir site | ANSD, CAHF, JO… |
| **CC / IFI** | Attribution + lien + date accès | ○ selon notice PDF | BM / IFC — vérifier licence doc |
| **ODbL / OSM** | `© OpenStreetMap contributors` + licence | ○ dérivés share-alike | Fonds carte · POI |
| **ANAT / géo** | Attribution + accord si dérivé commercial | ○ | Vérifier avant « carte officielle » |
| **WEB-NOTE** | URL + **date de lecture** + caveat | ✕ HTML archive | 100k, SAFRU, pages presse |
| **TOSrisk** | **Ne pas citer le listing** · « panel d’annonces en ligne » | ✕ | Agrégat OWN en sortie |
| **OWN** | « EverGreen Observatoire / Lab · méthodo vX · période » | ● agrégats | Indices IX-* |
| **PART** | « Partenaire · anonymisé · convention » | ✕ hors accord | Devis BTP |
| **MICRO-AUTH** | Formule ANSD microdonnées **si** autorisation | ✕ Y1 | Hors scope |

---

## 4. Formules de citation (copy canonique)

### 4.1 ANSD — publications / notes (PDF grand public)

Usage EverGreen Y1 = **chiffres publiés** (ICC, IMC, ICAS…), pas microdonnées ANADS.

**Court (outil / fiche) :**

> Source : ANSD — Indice du coût de la construction (ICC), T1 2026 · consulté le [JJ/MM/AAAA] · [ansd.sn](https://www.ansd.sn/)

**Long (Observatoire / étude) :**

> Source : *Note ICC T1 2026*, Agence Nationale de la Statistique et de la Démographie (ANSD) de la République du Sénégal, www.ansd.sn · période : 1er trimestre 2026 · mise en ligne : 15 mai 2026 · récupéré le [date] · fichier : `[hash court]`.

**IMC :**

> Source : ANSD — Indice mensuel des prix des matériaux de construction (IMC), [mois année] · consulté le …

### 4.2 ANSD — microdonnées (ANADS) — rappel seulement

Si un jour autorisation DG (hors Y1) — formule imposée type ANADS :

> Source : [Enquête-X], [Année], Agence Nationale de la Statistique et de la Démographie (ANSD) de la République du Sénégal, www.ansd.sn

+ anonymat loi **2004-21** · pas de retransmission sans accord · 3 copies rapport à l’ANSD (politique d’accès ANADS).

### 4.3 CAHF / Banque mondiale / IFC

> Source : [Titre exact], [éditeur], [année] · [URL] · consulté le [date] · (licence / notice PDF : [CC-IFI / all rights reserved — vérifier]).

Exemple :

> Source : *Housing Finance in Africa — Senegal profile*, CAHF, 2024 · consulté le …

### 4.4 OpenStreetMap

> © Contributeurs OpenStreetMap · [openstreetmap.org/copyright](https://www.openstreetmap.org/copyright) · données disponibles sous ODbL.

### 4.5 Indices EverGreen (OWN)

**Court (carte) :**

> Indice EverGreen — prix **demandés** observés en ligne, dédupliqués · n = … · période = … · méthodo v1.0 · pas des prix notariés.

**Long :** reprendre disclaimer `03` §7 + liste familles de sources classifiés (**sans** URLs d’annonces individuelles) + `PublishBundle` id.

### 4.6 WEB-NOTE (État / presse)

> Note web : [titre page], [organisme], [URL] · lu le [date] · **re-vérifié le [date publish]** · chiffre à croiser avec [DS-C0x / BM].

Exemple 100k logements : déficit page urbanisme.gouv ≠ forcément déficit BM (~320k) — **toujours caveat**.

### 4.7 Interdits rédactionnels

| Interdit | Remplacer par |
| --- | --- |
| « Prix officiel du m² à Dakar » | « Médiane des prix demandés (panel EverGreen) » |
| « Selon Expat, cette villa… » | Rien / lead interne — pas de pub |
| « ANSD confirme que l’immobilier… » | Citer **la série exacte** (ICC ≠ prix revente) |
| « Données à jour » sans date | « Au [date] · fenêtre [période] » |
| Dump PDF ANSD en téléchargement hub | Lien officiel + citation |

---

## 5. Fraîcheur — SLA par famille

Bench proptech 2025–26 : **fraîcheur par volatilité de champ**, pas un seul TTL global. EverGreen adapte au rythme SN (pas MLS US temps réel).

### 5.1 Table SLA (publish / consommer)

| Famille / artefact | Cadence source | SLA lab « fresh » | Au-delà → |
| --- | --- | --- | --- |
| Listings raw (A01) | Crawl hebdo→quot. | Lag ingest &lt; **2×** cadence crawl | Alerte connecteur · UI stale |
| Obs. prix / statut | Idem | Lead DROP : douleur si &gt; **24–48 h** post-signal | Prioriser review |
| IX-SALE-M2 / LAND | Calcul hebdo | Bundle public ≤ **trimestre** + `computed_at` | Soft interne OK · public = trim. |
| IX-RENT | Calcul hebdo | Soft mensuel · public trim. | Idem |
| IX-DOM / DROP | Quotidien L3 | Interne ; pas SLA marketing | — |
| ICC (B01) | Trim. ANSD | &lt; **45 j** après parution attendue | Flag « ICC précédent » sur simu |
| IMC (B02) | Mens. ANSD | &lt; **30 j** après mois de ref. | Flag matériaux |
| Macro C/D PDF | Ad hoc | Re-cite &lt; **90 j** avant Observatoire | Re-fetch / nuance |
| WEB-NOTE État | Variable | Re-vérif **J0** publish | Caveat ou retrait |
| Barèmes simu (bridge) | Post-ICC / trim. | Version barème ≤ **1 trim.** derrière ICC | Changelog + badge |
| OSM fond de carte | Semi-annuel soft | Attribution toujours | Refresh tuiles P2 |
| Deck / one-pager | Ad hoc | Chiffres = bundle ≤ **90 j** ou note « est. » | Interdit inventer |

### 5.2 États UX (serving)

| État | Condition | Affichage |
| --- | --- | --- |
| **fresh** | Dans SLA | Timestamp discret |
| **aging** | 1×–1,5× SLA | « Données au [date] — mise à jour en cours » |
| **stale** | &gt; 1,5× SLA | Badge stale · CTA soft · **pas** de nouveau claim marketing |
| **blocked** | Audit fail / retract | Masquer métrique · message indisponible |
| **insufficient_n** | n &lt; seuil `03` | « n insuffisant » · remonter maille |

### 5.3 Dual clock — exemple à documenter

| Horloge | Valeur |
| --- | --- |
| Période couverte ICC | T1 2026 (jan–mar) |
| `source_published_at` | 2026-05-15 |
| `retrieved_at` EverGreen | 2026-09-20 |
| Consommateur lit le | 2026-09-29 |

→ On dit **« ICC T1 2026 (paru mai 2026, intégré lab sept. 2026) »**, pas « chiffre du jour ».

Même logique indices OWN : fenêtre obs. 90 j ≠ date de publication Observatoire.

---

## 6. Processus avant citation publique (gate éditorial)

Aligné WAP `05` — couche **contenu** :

```
1. Chiffre dans PublishBundle ou SeriesPoint validé ?
2. license_code autorise ce canal ?
3. Formule citation §4 collée (canal) ?
4. retrieved_at / period dans SLA §5 ?
5. Disclaimer méthodo si OWN / asking ?
6. Pas de PII / pas d’URL listing concurrent ?
7. WEB-NOTE re-vérifiée aujourd’hui ?
8. Owner lab + GER (Observatoire) ou Product (outil) OK ?
```

| Canal | Approbateur | Trace |
| --- | --- | --- |
| Outil / carte | Product + Lab | Changelog barème / bundle id |
| Blog Observatoire | GER + Lab | Checklist §6 + méthodo lien |
| LinkedIn / presse | GER | Uniquement bundle publié |
| Deck investisseur | Founder + GER | Footnotes sources |
| CRM lead radar | Lab / Ops | Interne — pas « citation » publique |

---

## 7. Révisions, corrections, retraits

| Cas | Action | Communication |
| --- | --- | --- |
| Nouvelle parution ANSD | Nouveau `SeriesPoint` · bump barème | Changelog outils · pas rewrite silencieux histoire |
| Bug calcul IX | Nouveau `IndexSnapshot` · `corrected` event | Si déjà public : note erratum Observatoire |
| Source Classifieds down | Stale / blocked | Timestamp · pas inventer |
| Chiffre WEB-NOTE contredit | Retrait ou caveat fort | Ex. déficit 100k vs BM |
| Retract bundle | `retracted` + bundle précédent live | Transparence courte |

**Règle FHFA-like (indices) :** les séries peuvent être **révisées** ; on versionne (`meth_version` · `bundle_id`) et on explique le lag — on ne prétend pas l’immuabilité.

---

## 8. RACI gouvernance

| Activité | Lab | GER / contenu | Product | Legal (ext.) |
| --- | :---: | :---: | :---: | :---: |
| Tenir registre datasets | **R** | C | C | I |
| Formules citation | **R** | **A** (voix externe) | C | C |
| SLA fraîcheur / alertes | **R/A** | I | C | I |
| Publish Observatoire | R | **A** | C | C si doute |
| Barèmes outils | R | I | **A** | I |
| ToS crawl / microdonnées | C | I | I | **A** |
| OSM / ANAT dérivés | R | C | C | **A** si commercial |

R = réalise · A = accountable · C = consulté · I = informé.

---

## 9. Checklists rapides

### 9.1 Avant un post LinkedIn chiffré

- [ ] Chiffre = PublishBundle ou SeriesPoint daté  
- [ ] Source nommée (ANSD série **ou** EverGreen asking)  
- [ ] Pas de « officiel » sur indices lab  
- [ ] Date / période visibles  
- [ ] Lien méthodo ou disclaimer 1 ligne  

### 9.2 Avant maj simu construction

- [ ] ICC/IMC = dernière note intégrée · `retrieved_at`  
- [ ] Citation ANSD dans footer outil  
- [ ] Version barème bumpée  
- [ ] Disclaimer « estimation · pas devis »  

### 9.3 Avant Observatoire trimestriel

- [ ] WAP indices passé  
- [ ] Table sources (PUB-CITE + OWN) en annexe  
- [ ] Disclaimers `03` §7  
- [ ] WEB-NOTE re-vérifiées  
- [ ] n et strates documentés  
- [ ] Bundle id + `meth_version`  

---

## 10. Exemples bons / mauvais

| Mauvais | Bon |
| --- | --- |
| « Le m² à Almadies est à 2 M » | « Médiane asking appart. Almadies : ~X FCFA/m² (n=…, fen. 90 j, Observatoire EverGreen T3 2026) — pas transaction » |
| « L’ANSD dit que les prix immobiliers baissent » | « L’ICC ANSD (coût **construction** logements neufs) : +0,2 % QoQ au T1 2026 (note du 15/05/2026) » |
| « D’après Expat-Dakar… » + capture annonce | Signal **interne** lead · public = agrégat anonyme |
| Carte sans date | Carte + « Données au JJ/MM · n·… » |
| PDF ANSD hébergé `/downloads` | Lien ansd.sn + citation |

---

## 11. Liens

| Doc | Rôle |
| --- | --- |
| [`02-catalogue-datasets.md`](./02-catalogue-datasets.md) | Codes licence · matrice usage |
| [`03-barometre-prix.md`](./03-barometre-prix.md) | Disclaimers indices · n min |
| [`05-pipeline-data.md`](./05-pipeline-data.md) | WAP · dual clock · monitoring |
| [`04-outils-publics.md`](./04-outils-publics.md) | Surfaces qui affichent les citations |
| ANADS politique d’accès | [anads.ansd.sn](http://anads.ansd.sn/index.php/politique-acces) |
| ANSD publications | [ansd.sn](https://www.ansd.sn/) |

---

## 12. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| Data citation EU / DataCite | Séries continues = **date d’accès** (+ période) ; préférer snapshot / slice identifiable |
| RDA dynamic data citation | Versioning · timestamp query · fixity — adapté EverGreen via `PublishBundle` + checksum |
| ANADS / loi 2004-21 | Microdonnées = auth DG · citation imposée · agrégats only · **hors Y1** |
| Freshness proptech 2026 | TTL **par volatilité** · dual timestamps source vs scrape · stale explicite |
| FHFA HPI (analogie) | Calendrier publié · lag connu · révisions · citation « Source: … » précise le type d’indice |

---

*Gouvernance sources EverGreen Research Lab v1.0 — sept. 2026. Citation canonique · SLA fraîcheur · stale visible · pas de maquillage.*
