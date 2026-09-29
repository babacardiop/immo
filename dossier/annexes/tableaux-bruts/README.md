# Tableaux bruts — Exports CSV / Excel

**Dossier :** Annexes · 04 · `tableaux-bruts/`  
**Statut :** v1.0 — 2026-09-29  
**Unité :** FCFA sauf mention  
**Nature :** exports **hypothèses de travail** extraites du dossier — pas compta réelle

> Ouvrir dans Excel : Données → À partir d’un texte/CSV → **UTF-8** · séparateur `,`.  
> Chaque fichier porte une colonne `source_doc` et `as_of` pour traçabilité (bonne pratique finance annexes).

## Contenu

| Fichier | Contenu | Source dossier |
| --- | --- | --- |
| [`_catalogue.csv`](./_catalogue.csv) | Index des tables | — |
| [`kpi_annees_y1_y3.csv`](./kpi_annees_y1_y3.csv) | CA, closings, lots, cash | `ME/05` |
| [`drivers_volumes_y1_y3.csv`](./drivers_volumes_y1_y3.csv) | Volumes drivers | `ME/05` |
| [`rampe_y1_mensuelle.csv`](./rampe_y1_mensuelle.csv) | Closings/loc/gestion/apports M1–12 | `ME/05` |
| [`charges_opex_mensuelles.csv`](./charges_opex_mensuelles.csv) | Opex Dakar | `ME/05` |
| [`capex_setup_m0.csv`](./capex_setup_m0.csv) | Capex ouverture | `ME/05` |
| [`grille_tarifs.csv`](./grille_tarifs.csv) | Honoraires catalogue | `OT/02` |
| [`unit_economics_hypotheses.csv`](./unit_economics_hypotheses.csv) | LTV, CAC, splits | `ME/04` |
| [`media_budget_phases.csv`](./media_budget_phases.csv) | Enveloppes paid | `MK/04` `14` |
| [`media_split_campagnes.csv`](./media_split_campagnes.csv) | Split C1–C5 | `MK/14` |
| [`cac_plafonds_canaux.csv`](./cac_plafonds_canaux.csv) | CAC closing typiques | `ME/04` `MK/09` |
| [`personas_priorite.csv`](./personas_priorite.csv) | Personas marketing | `MK/02` |
| [`funnel_conversion_hyp.csv`](./funnel_conversion_hyp.csv) | Taux funnel | `ME/04` `PC/04` |
| [`evenements_analytics.csv`](./evenements_analytics.csv) | Taxonomie events | `MK/13` |
| Zones | Voir [`../cartes/quartiers.csv`](../cartes/quartiers.csv) | `PC/02` |

## Règles

1. Ne pas éditer les CSV « à la main » sans maj du doc source.  
2. Avant levée : figer un zip daté `YYYY-MM-DD_tableaux-bruts.zip`.  
3. Scénarios BASE/HAUT/BAS → recalcul dans modèle Excel dédié (hors scope v1).  
4. Sources web → [`../sources-et-citations.md`](../sources-et-citations.md).

---

*Tableaux bruts v1.0 — sept. 2026.*
