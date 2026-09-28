# Permis de construire & certificat d'urbanisme

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `09-permis-construire-cu.md` |
| **Priorité** | **P1** |
| **Catégorie** | Construction / Admin |
| **Synthèse** | Checklist + accompagnement dossier **autorisation de construire (AC)** — dépôt **papier mairie** (voie réelle) ; TeleDAc **non fiable** comme guichet de masse. |
| **Référentiel** | [`dossier/etude-de-marche/06-parcours-foncier-securite.md`](../../../../dossier/etude-de-marche/06-parcours-foncier-securite.md) §4 |

## 1. Problème client

Confusion achat terrain ≠ droit de construire. Dossiers incomplets = retards. Beaucoup démarrent sans AC → risque **Arrêt Dscos** / contentieux / démolition.

## 2. Réalité marché (recherche)

| Affirmation | Verdict |
| --- | --- |
| AC obligatoire sur territoire communal (construire, clôturer, surélever…) | Confirmé (Code urbanisme / décret 2009-1450) |
| Délivrance = **arrêté du maire** | Confirmé |
| Délais légaux 28 j / 40 j si dossier **complet** | Confirmé |
| Délais réels | Souvent **3 mois → > 1 an** |
| Silence → réputé accordé (conditions 2020-1463) | Confirmé |
| **TeleDAc** = canal de dépôt effectif citoyen | **Infirmé** (2026) — papier mairie = défaut |
| DGSCOS délivre l’AC | **Infirmé** — contrôle occupation / arrêt |
| Prérequis | Titre d’occupation légal (TF/bail…) + NICAD / plans |

Sources terrain : étude Tracos `parcours-autorisation-construire.md` ; urbanisme.gouv.sn.

## 3. Utilisateurs & synergies

- **Users:** Propriétaire terrain, diaspora, promoteur léger
- **Synergie:** Pack Terrain→Maison ; plans types ; archi `02` ; formalités `04` ; diligence `08` ; suivi chantier

## 4. Inputs

- Preuve titre d’occupation (TF/bail…)
- NICAD / plan Cadastre visé
- Plans architecte (situation, masse, niveaux, coupes, façades)
- Devis descriptif / estimatif ; assainissement
- Commune / type dossier (ordinaire vs complexe R.200)

## 5. Outputs

- Checklist dynamique par commune / complexité
- Suivi dépôt (dates, pièces manquantes)
- Disclaimer délais **réalistes** (pas 28 j magiques)
- Lead archi / formalités

## 6. UX / surfaces

- Wizard dashboard « Obtenir mon AC »
- Notifications WhatsApp statuts
- Contenu blog B4 **sans promettre TeleDAc**

## 7. Spec fonctionnelle

```
P0 Titre OK → P1 Cadastre → P2 Conception archi
→ P3 Dépôt PAPIER mairie (+ accusé)
→ P4 Instruction multi-services (boucles compléments)
→ P5 Arrêté maire (ou silence réglementé)
→ P6 Chantier (afficher AC) — vigilance DGSCOS
```

- Templates pièces
- Upload coffre-fort
- Flag `complex` (ERP/IGH) → SLA plus long + Protection civile
- **Ne pas** présenter TeleDAc comme étape « normale »

## 8. Données

- `PermitCase` { commune, status, depositedAt, legalDeadline, realisticEta, teledacAttempted: false|true }

## 9. API (cible)

- CRUD permit cases + upload pièces

## 10. Monétisation

Forfait accompagnement + lead archi / formalités.

## 11. KPIs

`cases_opened`, `permits_obtained`, `median_days`, `%_started_without_ac` (si connu)

## 12. Risques & conformité

Règles communales variables ; **ne jamais garantir** délai légal ; risque DGSCOS si chantier hors AC ; conflict d’intérêts si on pousse à construire trop tôt.

## 13. Phasing

- **v1:** Checklist + human assist + disclaimers
- **Plus tard:** Suivi statut si API mairie/État un jour (ne pas bloquer dessus)

## 14. Sources

- Étude Tracos `parcours-autorisation-construire.md`
- https://www.urbanisme.gouv.sn/ (pièces officielles)
- https://keur-immo.com/senegal/construction-maison-senegal/
- `dossier/etude-de-marche/06`

---

*Spec agence full-service SN — voir `docs/add-ons.md`, `docs/positioning.md`.*
