# Data sources — quoi agréger (au-delà des annonces)

Le crawl classifiés est le cœur du lab. Voici **toutes les autres données** à ingérer pour être en avance — et comment s’en servir.

Voir aussi : [`strategy.md`](./strategy.md) · [`etudes/README.md`](./etudes/README.md) · **PDFs :** [`etudes/pdf/`](./etudes/pdf/) (**19 fichiers**, ~80 MB)

### Séries officielles déjà archivées (calibrage immédiat)

| Série | Fichier local | Usage produit |
| --- | --- | --- |
| ICC T4 2025 | [`02-ansd-icc-t4-2025.pdf`](./etudes/pdf/02-ansd-icc-t4-2025.pdf) | Simu construction (réf. courante) |
| ICC T4 2024 | [`17-ansd-icc-t4-2024.pdf`](./etudes/pdf/17-ansd-icc-t4-2024.pdf) | Série historique / glissement |
| IMC fév. 2026 | [`10-ansd-imc-fevrier-2026.pdf`](./etudes/pdf/10-ansd-imc-fevrier-2026.pdf) | Matériaux (dernier mois archivé) |
| IMC jan. 2026 | [`15-ansd-imc-janvier-2026.pdf`](./etudes/pdf/15-ansd-imc-janvier-2026.pdf) | Comparaison MoM |
| IBTP T4 2025 | [`12-ansd-ibtp-t4-2025.pdf`](./etudes/pdf/12-ansd-ibtp-t4-2025.pdf) | Macro BTP |
| ICAC T4 2023 | [`13-ansd-icac-t4-2023.pdf`](./etudes/pdf/13-ansd-icac-t4-2023.pdf) | CA construction (dernière note PDF miroir) |
| ICAS T4 2025 | [`03-ansd-icas-t4-2025.pdf`](./etudes/pdf/03-ansd-icas-t4-2025.pdf) | Conjoncture agences |
| CAHF SN 2024 | [`08-cahf-senegal-profile-2024.pdf`](./etudes/pdf/08-cahf-senegal-profile-2024.pdf) | Loyers / terrains / finance |
| Repères jan. 2026 | [`16-ansd-reperes-statistiques-janvier-2026.pdf`](./etudes/pdf/16-ansd-reperes-statistiques-janvier-2026.pdf) | Contexte macro mensuel |

**Encore à récupérer (ansd.sn timeout / pas de miroir vie-publique) :** ICC T1 2026 · ICAC T3 2025+ · IBTP T1 2026 · IMC mars–juin 2026.

---

## 1. Carte des familles de data

```
                    ┌──────────────────┐
                    │  OBSERVATOIRE    │
                    │  (outputs)       │
                    └────────┬─────────┘
           ┌─────────────────┼─────────────────┐
           v                 v                 v
     Prix / m²          Études gold        Lead radar
           ^                 ^                 ^
           │                 │                 │
    ┌──────┴──────┐   ┌──────┴──────┐   ┌──────┴──────┐
    │ Classifieds │   │ Études PDF  │   │ Signaux     │
    │ + dédup     │   │ ANSD/BM/…   │   │ vendeurs    │
    └─────────────┘   └─────────────┘   └─────────────┘
           ^                 ^                 ^
    + matériaux, finance, geo, démographie, admin…
```

---

## 2. Inventaire priorisé

### A. Offre & prix (P0 — lab core)

| Data | Source | Fréquence | Usage | Local |
| --- | --- | --- | --- | --- |
| Annonces vente/location | Expat, Immobilier-au-SN, CoinAfrique, Senhectare… | Quotidien / hebdo | Indice prix, dédup, DOM | — (crawl) |
| Photos listings | Mêmes | Idem | Fingerprint dédup | — |
| Tél / WhatsApp annonceurs | Listings | Idem | Cluster vendeur / lead | — |
| Prix affichés historiques | Notre DB observations | Continu | Courbes, price drops | — |

### B. Coûts construction (P0 — simus)

| Data | Source | Fréquence | Usage | Local |
| --- | --- | --- | --- | --- |
| **ICC** | ANSD | Trimestriel | Barème simu construction | `02`, `17` (+ T1’26 TODO) |
| **IMC** | ANSD | Mensuel | Matériaux | `10`, `15` |
| **IBTP** | ANSD | Trimestriel | Conjoncture BTP | `12` |
| **ICAC** | ANSD | Trimestriel | CA construction / promo | `13` (T4’23 ; T3’25 TODO) |
| Grilles négociants (ciment, fer, sable) | Partenaires matériaux / relevés manuels | Mensuel | Reality check ICC | — |
| Devis anonymisés partenaires BTP/archi | Conventions partenaires | Ad hoc | Calibration finition | — |

### C. Macro logement & démographie (P1 — études)

| Data | Source | Usage | Local |
| --- | --- | --- | --- |
| Tenure, typologie habitat | SES ANSD | Narratif études | [`01`](./etudes/pdf/01-ansd-ses-territoire-population-2022-2023.pdf) |
| Population / densités / urbanisation | RGPH-5 | Demande par zone | [`11`](./etudes/pdf/11-ansd-atlas-rgph5-2023.pdf), [`18`](./etudes/pdf/18-ansd-rgph5-rapport-preliminaire-2023.pdf), [`19`](./etudes/pdf/19-ansd-rgph5-urbanisation-structure-2023.pdf), [`20`](./etudes/pdf/20-ansd-rgph5-rapport-provisoire-2023.pdf) |
| Déficit logements | BM PID / Habitat III | Contexte offre | [`05`](./etudes/pdf/05-habitat-senegal-national-report-2026.pdf), [`06`](./etudes/pdf/06-worldbank-pid-affordable-housing-p174759.pdf) |
| Cadre E&S projet BM | ESRS P174759 | Due diligence / content | [`14`](./etudes/pdf/14-worldbank-esrs-affordable-housing-p174759.pdf) |
| Production SICAP / SN HLM / ZAC | Rapport Habitat III | Offre formelle | `05` |
| Programme 100k + SAFRU sites | [urbanisme.gouv](https://www.urbanisme.gouv.sn/realisations/100-000-logements) · [safru.sn](https://safru.sn/) | Pipeline offre sociale | **web** — notes §6 |
| Repères conjoncture | ANSD | Macro mensuel | [`16`](./etudes/pdf/16-ansd-reperes-statistiques-janvier-2026.pdf) |

### D. Finance & accessibilité (P1)

| Data | Source | Usage | Local |
| --- | --- | --- | --- |
| Profils finance habitat | CAHF Yearbook / profil SN | Guides crédit | [`08`](./etudes/pdf/08-cahf-senegal-profile-2024.pdf), [`09`](./etudes/pdf/09-cahf-yearbook-2024-full.pdf) |
| Produits BHS / banques | Sites banques + scrap léger | Comparateur frais | — |
| Taux / encours crédit habitat | [BCEAO](https://www.bceao.int/) | Macro credit (taux directeurs, liquidité) | **web** — notes §6 |
| Remittances → logement | CAHF / BM | Angle diaspora | `08`, `09` |
| Her Home II (genre) | IFC | Contenu niche + partenaires | [`07`](./etudes/pdf/07-ifc-her-home-ii-2023.pdf) |

### E. Loyers & régulation (P1)

| Data | Source | Usage | Local |
| --- | --- | --- | --- |
| Crawl locations | Classifieds | Baromètre loyers quartier | — |
| Décret 2023-382 & suites | JO / CAHF / [Keur City analyse](https://keurcity.com/actualites/) | Impact politique | `08` + web §6 |
| ICAS location immobilière | ANSD | Cycle pro | [`03`](./etudes/pdf/03-ansd-icas-t4-2025.pdf) |

### F. Foncier & admin (P1–P2)

| Data | Source | Usage | Local |
| --- | --- | --- | --- |
| Thesaurus quartiers + aliases | Interne (lab) | Normalisation dédup | — |
| Polygones quartiers / communes | OSM / ANAT | Cartes | — |
| Réformes cadastre / SGF / DGID-digitale / eNICAD | DGID, PROCASEF | Guides TF/NICAD | — |
| Délibérations / SIFCOM | PROCASEF / communes | Qualité papier « délibération » | — |
| Contentieux occupation / DGSCOS | Presse + décret 2026-366 ; PNGCF/TRA-COS | Diligence zones ; disclaimer chantier | voir `dossier/etude-de-marche/06` |
| Parcours bail / AC (délais réels) | Étude Tracos + urbanisme.gouv | Contenu + pédagogie délais | — |
| Stats fiscalité foncière | [FID — impôts fonciers SN](https://fundinnovation.dev/en/news/impact-evaluation-results-and-lessons-learned-from-two-projects-to-increase-property-tax-revenue) | CGF/CFPB content | **web** — notes §6 |
| Permis TeleDAC volumes | Si open data — **aujourd’hui non fiable comme canal** | Activité construction | — |

### G. Geo & risques (P2)

| Data | Source | Usage |
| --- | --- | --- |
| Zones inondables / relief | ANACIM / open data | Score risque fiche terrain |
| POI (écoles, transports) | OSM | Score livabilité |
| Satellites / land use change | Optional remote sensing | Exturbanisation (avancé) |

### H. Sentiment & attention (P2)

| Data | Source | Usage |
| --- | --- | --- |
| Posts groupes FB (manuel / semi) | Groupes immo | Signaux précoces prix / arnaques |
| Volume recherches Google (keywords immo SN) | Trends | Demande thématique |
| Engagement LinkedIn études | Notre content | KPI distribution |

### I. Concurrent & acteurs (P2)

| Data | Source | Usage | Local |
| --- | --- | --- | --- |
| Inventaire promoteurs / programmes neufs | Sites + presse | Co-marketing / VEFA watch | — |
| Annuaire agences (licence vs informel) | CAHF ~466 vs 100 | Positionnement curated | [`08`](./etudes/pdf/08-cahf-senegal-profile-2024.pdf) |
| AML Estate Intelligence & pairs | Marché data | Concurrent ou partenaire data | — |
| Veille prix / narratif marché (secondaire) | [221.sn Dakar 2024–25](https://221.sn/le-marche-immobilier-a-dakar-analyse-approfondie-et-perspectives-dinvestissement-2024-2025/) | Contrasté avec lab ; **pas source de vérité** | **web** — notes §6 |
| Or éditorial procédures | [Keur City](https://keurcity.com/actualites/) | Barre fond blog (gelé déc. 2023) | **web** — notes §6 |

---

## 3. Idées d’outputs “en avance”

| Produit data | Ingrédients | Différenciation |
| --- | --- | --- |
| **Indice Immo Hub /m²** | Crawl dédup + thesaurus | Personne n’a ça publiquement fiable au SN |
| **Observatoire trimestriel** | ICC + ICAS + indice lab + 100k suivi | Études gold > blog générique |
| **Heatmap délais de vente** | Days-on-market observations | Négociation vendeurs → mandats |
| **Radar arnaques** | Multi-post + prix aberrants + tél recyclés | Confiance diaspora |
| **Calibrateur simulateurs** | ICC `02`/`17` + IMC `10`/`15` + devis partenaires | Outils moins “fantaisie” |
| **Score accessibilité crédit** | CAHF `08`/`09` + barèmes banques | Add-on mensuel réel |
| **Watch promoteurs** | Livraison vs promesse, retards | Contenu + due diligence |
| **Baromètre loyers post-décret** | Crawl location + décret | Angle politique / médias |

---

## 4. Priorité d’ingestion (alignée phases lab)

| Phase | Data à brancher |
| --- | --- |
| **L0** | Catalogue études PDF (fait) ; thesaurus quartiers ; table ICC manuelle (CSV depuis `02`) |
| **L1** | 1 source classifieds ; photo-hash spike |
| **L2** | 2ᵉ source ; IMC mensuel auto ou semi (`10`/`15` → pipeline) ; premiers /m² |
| **L3** | Lead radar (price drop, multi-source) ; tél clusters |
| **L4** | Observatoire public (études + lab) ; OSM overlays |
| **L5** | FB semi-assisté ; banques comparateur ; remote sensing optionnel |

---

## 5. Principes

1. **Officiel d’abord pour le récit**, **lab pour le prix affiché** — les deux se confrontent.  
2. Ne jamais republier une annonce concurrente ; agréger.  
3. Toute série a une `source`, `retrieved_at`, `license_note`.  
4. PDF études = citation ; pas de dump copyrighted in extenso dans le repo public.  
5. Si une data n’alimente ni outil, ni étude, ni lead → ne pas la crawler.  
6. Préférer **vie-publique.sn** quand `ansd.sn` timeout.  
7. Sources web = notes + URL + date de lecture ; re-vérifier avant citation publique.

---

## 6. Sources web consultées (pas de PDF archive)

Lu sept. 2026. Pas téléchargeables comme PDF propres — on archive **notes + URL**, pas le HTML.

### 6.1 Programme 100 000 logements — [urbanisme.gouv.sn](https://www.urbanisme.gouv.sn/realisations/100-000-logements)

- Composante « Zéro bidonville » ; cible **100k logements sociaux / 5 ans**, éradication bidonvilles horizon **2035**.
- Déficit cité sur la page : **~150k Dakar / ~350k national** (à croiser avec Habitat III / BM `05`–`06` qui parlent plutôt ~320k).
- Leviers : foncier titré, aménagement via valorisation foncière (hors budget État), financements innovants (garantie, mortgage secondaire), écosystème construction locale (second œuvre ~40 % du coût).
- **27 pôles urbains** ; foncier sécurisé annoncé : **13 000 ha** (10 800 axe Dakar–Thiès–Mbour + 2 200 reste du pays).
- Modèle communes : convention État / collectivité / promoteur + cahier des charges ; régime dérogatoire fiscal 2016.
- Impacts revendiqués (ordre de grandeur marketing) : millions de m² carreaux/tuiles, ~1 M emplois — **à traiter comme discours politique**, pas KPI lab.

**Usage hub :** pipeline Observatoire (suivi sites / livraisons) ; contenu « comment marche le 100k » ; ne pas reprendre les chiffres d’emplois sans caveat.

### 6.2 SAFRU — [safru.sn](https://safru.sn/)

- **SAFRU SA** (loi 2020-24) : aménagement / équipement des sites pour programmes État, collectivités, promoteurs ; rénovation urbaine.
- Outil d’opérationnalisation des **pôles urbains** (rééquilibrage armature urbaine).
- Phase pilote citée : **Pôle urbain Daga Kholpa (PUDK)** — triangle Dakar–Thiès–Mbour (~37 km Dakar, 30 Mbour, 27 Thiès, 11 Diamniadio).
- Contact affiché : `+221 33 821 42 24` · `contact@safru.sn` · DG Ibrahima Thioye / PCA Assane Diop.
- Site peu dense en volumes / ha / calendrier livraison → **à scraper / veille presse** pour watch promoteurs.

**Usage hub :** partenaire institutionnel potentiel ; fiche « pôles » dans Observatoire ; diligence VEFA sur sites SAFRU.

### 6.3 FID — fiscalité foncière SN — [fundinnovation.dev](https://fundinnovation.dev/en/news/impact-evaluation-results-and-lessons-learned-from-two-projects-to-increase-property-tax-revenue)

- Article **24 oct. 2025** : évaluation d’impact projet DGID / PSE (Paris School of Economics).
- Contexte : seulement **~7 %** du potentiel d’impôt foncier collecté.
- Plateforme digitale : cadastre + avis d’imposition ; **+38k** biens au rôle (taux d’enregistrement **92 %** zones ciblées) ; **26 412** nouveaux avis en 2025 ; **>1 Md FCFA** de recettes additionnelles ; compliance ×3.
- Scale-up DGID vers **toute la région de Dakar** : +3 à 8 Md FCFA estimés.

**Usage hub :** guides CGF/CFPB ; angle « État digitalise le foncier » ; croiser eNICAD / DGID-digitale.

### 6.4 221.sn — marché Dakar 2024–25 — [article](https://221.sn/le-marche-immobilier-a-dakar-analyse-approfondie-et-perspectives-dinvestissement-2024-2025/)

- Synthèse secondaire (màj **août 2025**) : narratif investisseur, bifurcation luxe / accessibilité, risques fraude.
- Prix cités (sources hétérogènes Properstar / Numbeo — **incohérents entre eux**, l’article le reconnaît) : apparts centre ~1,1–1,4 M FCFA/m² ; rendements bruts ~6–12 % ; loyers Almadies vs Mamelles très écartés.
- Utile comme **carte des claims marché** à confronter au crawl lab — **jamais comme série officielle**.

**Usage hub :** brief concurrent / content ideas ; validation que le lab doit remplacer ces scrapers tiers.

### 6.5 Keur City — [keurcity.com/actualites](https://keurcity.com/actualites/)

- Blog **gelé** : dernier post visible **01/12/2023** (« Stratégies… 2024 ») ; avant : analyse loyers post-décret (20/11/2023), compromis, CFPB, VEFA, crédit CDD, diaspora USA…
- Or éditorial procédures / fiscalité / VEFA — barre de fond pour notre blog (voir `docs/blog/`).

**Usage hub :** inventaire sujets evergreen à réécrire à jour (2026) avec nos PDFs + lab.

### 6.6 BCEAO — [bceao.int](https://www.bceao.int/)

- Hub macro UEMOA ; consulté sept. 2026 : **taux min. soumission 3,00 %** ; prêt marginal **5,00 %** ; inflation UEMOA ~0 % (2025) ; PIB union ~148 380 Mds FCFA.
- **Pas de série crédit habitat SN en page d’accueil** — à chercher dans publications / statistiques monétaires (PDF ad hoc, pas encore archivé).

**Usage hub :** contexte taux pour simulateur mensualité ; watch avis prudentiels bancaires.

---

*Enrichir ce fichier quand une nouvelle source est branchée en prod. Dernière sync : sept. 2026 — **19 PDF** + notes web §6.*
