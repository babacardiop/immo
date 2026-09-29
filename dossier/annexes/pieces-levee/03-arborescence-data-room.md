# Arborescence data room

**Document :** Annexes · Pièces-levée · 03  
**Bench :** ME-11 §10 · SENAGORA VDR · LaunchPad DD Afrique

---

## 1. Arbo Drive (recommandée)

```
EverGreen_DataRoom_YYYY-MM/
├── 00_INDEX.md                    ← ce README + registre export
├── 00_Admin/
│   ├── ID-01_CNI_fondateurs/
│   ├── ID-02_residence/
│   ├── ID-03_CV_dirigeants/
│   └── ID-04_justificatifs_domicile/
├── 01_Societe/
│   ├── CO-01_statuts.pdf
│   ├── CO-02_RCCM.pdf
│   ├── CO-03_NINEA.pdf
│   ├── CO-04_PV/
│   ├── CO-07_bail_siege.pdf
│   ├── CO-08_liberation_capital_CCA/
│   └── CO-09_cap_table.xlsx
├── 02_Conformite_Immo/
│   ├── IM-01_carte_pro.pdf
│   ├── IM-02_garantie_financiere.pdf
│   └── IM-03_RC_pro.pdf
├── 03_Business/
│   ├── EC-02_business_plan.pdf
│   ├── EC-03_BMC.pdf
│   ├── EC-04_etude_marche/          (export PDF ou zip dossier)
│   └── EC-12_one_pager.pdf
├── 04_Finance/
│   ├── EC-05_unit_economics.pdf
│   ├── EC-06_previsionnel_36m.pdf
│   ├── EC-07_PL.pdf
│   ├── EC-08_tresorerie.pdf
│   ├── EC-09_besoins_fonds.pdf
│   ├── EC-10_plan_financement.pdf
│   ├── EC-11_scenarios.pdf
│   └── EC-14_amortissement.pdf      (si dette)
├── 05_Devis/
│   ├── DV-site_web_v0.pdf
│   ├── DV-identite_photo.pdf
│   ├── DV-materiel_IT.pdf
│   ├── DV-fitout_ou_NA.pdf
│   └── DV_INDEX.csv
├── 06_Traction/
│   ├── TR-03_conventions_partenaires/
│   ├── TR-04_pipeline_mandats.pdf
│   ├── TR-05_KPI_snapshot.pdf
│   └── captures_catalogue/          (datées)
├── 07_Legal_Contracts/
│   ├── modeles_mandats/
│   ├── conventions_apport/
│   └── lettres_intention/           (ou lien annexes)
├── 08_Pitch/
│   ├── EC-13_pitch_deck.pdf
│   ├── lettres_demande/
│   └── media_kit_leger/             (logo + photo GER)
└── 99_Archive_versions/
```

---

## 2. Mapping hub → data room

| Doc git / dossier | Export Drive |
| --- | --- |
| `modele-economique/01`–`11` | `/03_Business` · `/04_Finance` · `/08_Pitch` |
| `etude-de-marche/` | `/03_Business/EC-04_…` |
| `juridique-operations/01`–`02` | `/07_Legal_Contracts` |
| `annexes/lettres-intention/` | `/07_Legal_Contracts` (PDF signés) |
| `annexes/tableaux-bruts/` | Annexe `/04_Finance` (zip daté) |
| `annexes/captures-concurrence/` | Contexte marché — **pas** traction |
| `annexes/photos-marque/` | `/08_Pitch/media_kit_leger` |
| `organisation/03` | Gouvernance — résumé dans BP |

---

## 3. Naming fichiers

```
YYYY-MM-DD_eg_{ID}_{slug}_vN.pdf

Ex. 2026-10-15_eg_CO-02_RCCM_v1.pdf
    2026-10-15_eg_EC-10_plan_financement_v2.pdf
    2026-10-15_eg_DV-site_web_proforma_v1.pdf
```

- Une **version gelée** par dépôt (ne pas écraser)  
- Index : exporter `registre-pieces.csv` filtré `status=ready` le jour J  

---

## 4. Droits d’accès (exemple)

| Dossier | Banque | Angel | Public |
| --- | :---: | :---: | :---: |
| 00–05 | ● | ● | — |
| 06 Traction | ● | ● | — |
| 07 Legal | ○ (modèles) | ● | — |
| 08 Pitch | ● | ● | one-pager only |
| CNI haute rés | ● | ○ | — |

---

## 5. Checklist montage Drive (GER)

- [ ] Dossiers 00–08 créés  
- [ ] `00_INDEX` avec lien registre  
- [ ] Lien lecture seule testé en navigation privée  
- [ ] Aucun `.env` / mot de passe / Wave perso  
- [ ] Date de gel notée dans registre `notes`  
