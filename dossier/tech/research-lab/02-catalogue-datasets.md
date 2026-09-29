# Catalogue datasets — Sources + licences

**Document :** Dossier · Tech · Research lab · 02  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-mission-lab.md`](./01-mission-lab.md) · [`../../../docs/research-lab/data-sources.md`](../../../docs/research-lab/data-sources.md) · [`../../../docs/research-lab/etudes/`](../../../docs/research-lab/etudes/)  
**Aval :** [`03-barometre-prix.md`](./03-barometre-prix.md) · [`05-pipeline-data.md`](./05-pipeline-data.md) · [`06-gouvernance-sources.md`](./06-gouvernance-sources.md)

> **Rôle :** inventaire **opérationnel** des jeux de données (ID, source, licence, usage autorisé).  
> Détail narratif / URLs web → `docs/research-lab/data-sources.md`.  
> PDFs → `etudes/pdf/` + [`MANIFEST.md`](../../../docs/research-lab/etudes/MANIFEST.md) (**19 fichiers**).

**⚠** Pas un avis juridique. Avocat avant crawl scale ou republication commerciale lourde.

---

## 0. Légende licences (codes internes)

| Code | Signification | Usage EverGreen typique |
| --- | --- | --- |
| **PUB-CITE** | Doc public institutionnel · droits réservés · citation obligatoire | Synthèse · Observatoire · calibration · **pas** dump PDF sur site marketing |
| **MICRO-AUTH** | Microdonnées (ANADS) · autorisation ANSD écrite | **Hors scope Y1** sauf demande formelle |
| **ODbL / OSM** | OpenStreetMap · share-alike dérivés | Fonds de carte · POI · attribution |
| **CC / IFI** | Banque mondiale / IFC souvent réutilisables avec attribution | Citer URL · vérifier notice PDF |
| **TOSrisk** | Site classifié · ToS souvent anti-scrape | Agrégats internes · **jamais** miroir annonces |
| **OWN** | Produit EverGreen (observations, thesaurus, indices) | Full · source Observatoire |
| **PART** | Donnée partenaire (devis, grilles) sous convention | Interne / anonymisé |
| **WEB-NOTE** | Page web · notes datées · pas d’archive HTML | Citation + re-vérif avant publish |

Chaque dataset doit porter : `source` · `retrieved_at` · `license_code` · `owner`.

---

## 1. Matrice rapide — familles × licence

| Famille | Priorité | Licence dominante | Republier brut ? |
| --- | :---: | --- | :---: |
| A. Classifieds / prix affichés | P0 | TOSrisk → OWN (agrégats) | **Non** |
| B. Coûts construction ANSD | P0 | PUB-CITE | Non (citer chiffres) |
| C. Macro / RGPH / Habitat | P1 | PUB-CITE / CC-IFI | Non PDF miroir site |
| D. Finance CAHF / BCEAO | P1 | PUB-CITE | Citer |
| E. Loyers + régulation | P1 | TOSrisk + PUB-CITE | Non |
| F. Foncier / admin / geo | P1–P2 | PUB-CITE · ODbL · WEB-NOTE | Selon source |
| G. Risques / OSM | P2 | ODbL | Attribution |
| H. Sentiment / Trends | P2 | TOSrisk / terms Google | Agrégats soft |
| I. Concurrent / secondaire | P2 | WEB-NOTE | Pas vérité prix |

---

## 2. Catalogue par dataset (IDs)

### A — Offre & prix (lab core)

| ID | Dataset | Source | Fréq. | Licence | Usage OK | Local |
| --- | --- | --- | --- | --- | --- | --- |
| DS-A01 | Annonces vente/location brutes | Expat, Immobilier-au-SN, CoinAfrique, Senhectare… | Q/hebdo | **TOSrisk** | Ingest interne · normalize · **pas** republication | Crawl |
| DS-A02 | Fingerprints photos | Mêmes | Idem | **TOSrisk** / droits image | Dédup only · pas galerie publique | Crawl |
| DS-A03 | Tél / WA annonceurs | Listings | Idem | PII + TOSrisk | Cluster lead B2B limité · **pas** revente base | Crawl |
| DS-A04 | PropertyEntity + observations prix | Lab | Continu | **OWN** | Indices · DOM · price drops · Observatoire | DB |
| DS-A05 | Indice prix/m² agrégé | Dérivé A04 | Mensuel+ | **OWN** | Public agrégé · carte · estimation | API |

**Règle A :** ToS classifiés souvent anti-extraction automatisée (pratique mondiale 2024–26). Mitigation EverGreen : rate-limit · robots.txt · pages publiques · **agrégats transformés** · 0 miroir catalogue. L1 = 1 source spike après Vague 0.

---

### B — Coûts construction (simus)

| ID | Dataset | Source | Fréq. | Licence | Usage OK | Local |
| --- | --- | --- | --- | --- | --- | --- |
| DS-B01 | ICC | ANSD | Trim. | **PUB-CITE** | Barème simu · citer « Source: ANSD » | `02`, `17` (+ T1’26 TODO) |
| DS-B02 | IMC | ANSD | Mens. | **PUB-CITE** | Matériaux MoM | `10`, `15` |
| DS-B03 | IBTP | ANSD | Trim. | **PUB-CITE** | Macro BTP | `12` |
| DS-B04 | ICAC | ANSD | Trim. | **PUB-CITE** | CA construction | `13` (T4’23 ; T3’25 TODO) |
| DS-B05 | Grilles négociants | Relevés / partenaires | Mens. | **PART** / OWN | Reality check ICC | — |
| DS-B06 | Devis BTP/archi anonymisés | Conventions P0 | Ad hoc | **PART** | Calibration finition | — |

**Note ANSD :** publications PDF grand public = citation. **Microdonnées** ANADS = **MICRO-AUTH** (demande DG + anonymat loi 2004-21) — **pas** le flux Y1.

---

### C — Macro logement & démographie

| ID | Dataset | Source | Licence | Usage OK | Local |
| --- | --- | --- | --- | --- | --- |
| DS-C01 | SES territoire / population | ANSD | PUB-CITE | Narratif habitat / tenure | `01` |
| DS-C02 | RGPH-5 (atlas, prélim., urbanisation, provisoire) | ANSD | PUB-CITE | Densités · urbanisation | `11`, `18`, `19`, `20` |
| DS-C03 | Rapport Habitat / NUA 2026 | Urban Agenda / État | PUB-CITE | Déficit · politique | `05` |
| DS-C04 | BM PID Affordable Housing P174759 | World Bank | **CC/IFI** (vérif notice) | Déficit 320k · cadre projet | `06` |
| DS-C05 | BM ESRS Concept P174759 | World Bank / EWS | CC/IFI | E&S · SAFRU | `14` |
| DS-C06 | Programme 100k logements | urbanisme.gouv.sn | WEB-NOTE | Pipeline Observatoire · caveat chiffres | notes web |
| DS-C07 | SAFRU | safru.sn | WEB-NOTE | Pôles · watch promoteurs | notes web |
| DS-C08 | Repères statistiques | ANSD | PUB-CITE | Macro mensuel | `16` |

---

### D — Finance & accessibilité

| ID | Dataset | Source | Licence | Usage OK | Local |
| --- | --- | --- | --- | --- | --- |
| DS-D01 | Profil Sénégal housing finance | CAHF 2024 | PUB-CITE | Guides crédit · loyers synth. | `08` |
| DS-D02 | Yearbook Afrique | CAHF 2024 | PUB-CITE | Benchmark | `09` |
| DS-D03 | Her Home II | IFC 2023 | CC/IFI | Contenu genre / diaspora | `07` |
| DS-D04 | Taux / stats monétaires | BCEAO | PUB-CITE / WEB-NOTE | Contexte simu mensualité | web |
| DS-D05 | Barèmes BHS / banques | Sites banques | TOSrisk / WEB-NOTE | Comparateur frais (semi-manuel) | — |

---

### E — Loyers & régulation

| ID | Dataset | Source | Licence | Usage OK | Local |
| --- | --- | --- | --- | --- | --- |
| DS-E01 | Crawl locations | Classifieds | TOSrisk → OWN agrégats | Baromètre loyers quartier | Crawl |
| DS-E02 | ICAS services immo | ANSD | PUB-CITE | Conjoncture agences | `03` |
| DS-E03 | Décret loyers 2023-382 & suites | JO / presse | PUB-CITE / WEB-NOTE | Contenu régulation | — |

---

### F — Foncier, admin, geo

| ID | Dataset | Source | Licence | Usage OK | Local |
| --- | --- | --- | --- | --- | --- |
| DS-F01 | Thesaurus quartiers + aliases | Interne | **OWN** | Normalisation dédup | Lab |
| DS-F02 | Polygones communes / quartiers | OSM / ANAT | **ODbL** / licence ANAT | Cartes · attribution © OSM / ANAT | — |
| DS-F03 | Veille eNICAD / SGF / DGID | Portails État | WEB-NOTE / PUB-CITE | Guides TF/NICAD | — |
| DS-F04 | Signaux DGSCOS / contentieux | Presse + textes | WEB-NOTE | Disclaimer zones · diligence | EM-06 |
| DS-F05 | Fiscalité foncière (FID/DGID) | fundinnovation.dev + presse | WEB-NOTE | Contenu CGF/CFPB | notes |
| DS-F06 | TeleDAc volumes | Si open — **non fiable** | — | Ne pas traiter comme canal | — |

**Géo Sénégal / ANAT :** licence d’utilisation avec attribution ; produits dérivés commerciaux souvent soumis à accord préalable — vérifier avant publish carte « officialisée ».

---

### G — Geo & risques (P2)

| ID | Dataset | Source | Licence | Usage OK |
| --- | --- | --- | --- | --- |
| DS-G01 | Zones inondables / relief | ANACIM / open | PUB-CITE / WEB-NOTE | Score risque fiche |
| DS-G02 | POI écoles / transports | OSM | ODbL | Score livabilité |
| DS-G03 | Land use change | Remote sensing opt. | Selon fournisseur | Avancé L5+ |

---

### H — Sentiment & attention (P2)

| ID | Dataset | Source | Licence | Usage OK |
| --- | --- | --- | --- | --- |
| DS-H01 | Groupes FB immo | Meta | **TOSrisk** élevé | Manuel / semi · **pas** bot v1 |
| DS-H02 | Google Trends keywords SN | Google | Terms Google | Demande thématique soft |
| DS-H03 | Engagement LinkedIn études | EverGreen | OWN | KPI distribution |

---

### I — Concurrent & secondaire

| ID | Dataset | Source | Licence | Usage OK |
| --- | --- | --- | --- | --- |
| DS-I01 | Watch promoteurs / VEFA | Sites + presse | WEB-NOTE | Co-com · diligence |
| DS-I02 | Annuaire agences (licence vs informel) | CAHF | PUB-CITE | Positionnement curated |
| DS-I03 | 221.sn marché Dakar | Article secondaire | WEB-NOTE | **Pas vérité prix** · contrast lab |
| DS-I04 | Keur City archives | Blog gelé | WEB-NOTE | Sujets evergreen à réécrire |
| DS-I05 | Captures concurrence | Annexes hub | OWN (captures) | Interne dossier · pas republier UI tiers |

---

## 3. Archive PDF — mapping MANIFEST

| PDF # | Fichier | Dataset IDs |
| ---: | --- | --- |
| 01 | SES 2022–23 | DS-C01 |
| 02 | ICC T4 2025 | DS-B01 |
| 03 | ICAS T4 2025 | DS-E02 |
| 05 | Habitat 2026 | DS-C03 |
| 06 | BM PID | DS-C04 |
| 07 | IFC Her Home II | DS-D03 |
| 08–09 | CAHF | DS-D01, D02 |
| 10, 15 | IMC | DS-B02 |
| 11, 18–20 | RGPH-5 | DS-C02 |
| 12 | IBTP | DS-B03 |
| 13 | ICAC | DS-D04 / B04 |
| 14 | BM ESRS | DS-C05 |
| 16 | Repères | DS-C08 |
| 17 | ICC T4 2024 | DS-B01 |

**Licence archive :** conservation **interne recherche** (citation, calibration). **Ne pas** republier les PDF en masse sur le site marketing (règle annexes).

**À récupérer :** ICC T1 2026 · ICAC T3 2025+ · IBTP T1 2026 · IMC mars–juin 2026 (ansd.sn timeout → vie-publique.sn).

---

## 4. Ce qu’on peut / ne peut pas publier

| Action | OK ? | Condition |
| --- | :---: | --- |
| Citer chiffre ANSD / CAHF / BM avec source + date | ● | Mention source |
| Publier indice /m² **agrégé** EverGreen | ● | Méthodo `03` · pas listing concurrent |
| Utiliser ICC pour calibrer simu | ● | Disclaimer modèle |
| Mettre PDF ANSD en download public | ○ | Préférer lien officiel |
| Republier annonce Expat/CoinAfrique verbatim | ✕ | Interdit |
| Revendre fichier tél vendeurs | ✕ | Interdit |
| Scrape FB automatisé v1 | ✕ | L5+ seulement · ToS Meta |
| Microdonnées RGPH sans autorisation | ✕ | MICRO-AUTH |

---

## 5. Métadonnées obligatoires (registre)

Champs min. pour tout dataset branché en prod :

```
dataset_id, name, family, source_url, publisher,
license_code, retrieved_at, refresh_cadence,
storage_path, pii_flag, public_ok, owner, notes
```

Template CSV vivant → à créer en `05-pipeline` / Drive lab : `registre-datasets.csv`.

---

## 6. Priorité d’ingestion (rappel phases)

| Phase | Datasets à brancher |
| --- | --- |
| **L0** | C* PDF · B01 CSV manuel · F01 thesaurus |
| **L1** | A01 **1 source** · A02 spike · A04 naissant |
| **L2** | 2ᵉ source A · B02 semi · A05 premiers /m² |
| **L3** | Lead radar sur A03/A04 |
| **L4** | Observatoire public (A05 + B + C + E) |
| **L5** | H01 semi · D05 · G optionnel |

---

## 7. Principes (rappel)

1. Officiel pour le **récit** · lab pour le **prix affiché**.  
2. Toute série = source + date + licence.  
3. Si ça n’alimente ni outil, ni étude, ni lead → **ne pas crawler**.  
4. Préférer vie-publique.sn si ansd.sn timeout.  
5. Sources web = notes datées · re-vérifier avant citation publique.

---

## 8. Sources licence (consult. 2026-09)

| Réf. | Insight |
| --- | --- |
| ANADS politique d’accès | Microdonnées = autorisation DG · citation obligatoire · droits ANSD |
| Loi SN 2004-21 (stats) | Anonymat · agrégats |
| Géo Sénégal / ANAT | Licence avec attribution · dérivés commerciaux souvent accord préalable |
| Pratique scrape classifiés 2024–26 | ToS souvent anti-bot · risque contrat · agrégats transformés + rate-limit |
| World Bank / IFC / CAHF | Docs publics · attribution · vérifier notice PDF |
| Interne | `data-sources.md` · `etudes/MANIFEST` · mission lab § éthique |

---

## 9. Liens

| Doc | Rôle |
| --- | --- |
| [`01-mission-lab.md`](./01-mission-lab.md) | Pourquoi |
| [`../../../docs/research-lab/data-sources.md`](../../../docs/research-lab/data-sources.md) | Inventaire détaillé + notes web §6 |
| [`../../../docs/research-lab/etudes/README.md`](../../../docs/research-lab/etudes/README.md) | Catalogue études |
| [`../../../docs/research-lab/strategy.md`](../../../docs/research-lab/strategy.md) | Crawl · dédup · L0–L5 |
| [`06-gouvernance-sources.md`](./06-gouvernance-sources.md) | Citation · fraîcheur |

---

*Catalogue datasets EverGreen v1.0 — sept. 2026. 19 PDF archivés · licences codées · classifieds = TOSrisk → OWN agrégats seulement.*
