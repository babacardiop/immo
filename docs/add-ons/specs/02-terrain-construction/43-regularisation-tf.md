# Régularisation / montée en titre (délibération → bail → TF)

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `43-regularisation-tf.md` |
| **Priorité** | **P1–P2** (Vague 2 option / Vague 4+) |
| **Catégorie** | Foncier |
| **Synthèse** | Accompagnement **affectation / délibération → bail Domaines (Yastal) → éventuel TF** — pédagogie + leads formalités/notaire. |
| **Référentiel** | [`dossier/etude-de-marche/06-parcours-foncier-securite.md`](../../../../dossier/etude-de-marche/06-parcours-foncier-securite.md) §3 |

## 1. Problème client

Beaucoup de « propriétaires » n’ont qu’une **délibération** (droit d’usage). Ils veulent vendre, hypothéquer ou construire en sécurité. Sans régularisation, closing bancable / diaspora = fragile.

## 2. Réalité marché (recherche)

| Phase | Contenu | Délai indicatif |
| --- | --- | --- |
| **A** | Demande → commission → délibération → tutelle (seuils 10/50 ha) → installation | Variable (mois) |
| **B** | Dossier bail (Yastal/CSF) → avis Domaines+Cadastre+Urbanisme → **CCOD** (dont DGSCOS) → notification → inscription Livre foncier | **3–6 mois** (souvent +) |
| Bail → TF | Conversion / immatriculation | **6–18 mois** |

- Délibération **non cessible / non vendeable** en droit — les ventes de fait = risque.
- **Yastal** (DGID) = accélération guichet bail, pas un titre.
- SIFCOM digitalise délibérations (couverture partielle PROCASEF).

## 3. Utilisateurs & synergies

- **Users:** Occupants / héritiers / acheteurs « papier faible » ; diaspora héritage
- **Synergie:** Diligence `08` (verdict go conditionnel) ; formalités `04` ; notaire `03` ; fiscal `12` ; catalogue disclaimer délibération

## 4. Inputs

- Extrait délibération + **preuve tutelle**
- PV installation / bornage si existant
- Identité ; superficie ; localisation ; NICAD si déjà attribué
- Objectif : bail seul / bail+construire / viser TF

## 5. Outputs

- Diagnostic parcours (où en est le dossier)
- Timeline réaliste + budget honoraires estimatif
- Lead partenaire formalités / Domaines / notaire
- Statut dossier dans CRM

## 6. UX / surfaces

- Depuis fiche délibération : CTA *Sécuriser / régulariser*
- Depuis verdict diligence `go_conditional`
- Guide blog A1 (TF vs bail vs délibération)

## 7. Spec fonctionnelle

- Mode **partenaire (lead)** par défaut — on n’est pas le Receveur Domaines
- Statuts: `intake → diagnosis → filed → ccod → bail_signed → inscribed → (tf_path)`
- Documents au coffre-fort
- Alertes délais (pas de fausse précision jour près)
- Lien optionnel CCOD / contentieux si litige ouvert (info client)

## 8. Données

- `RegularisationCase` { fromPaper, targetPaper, phase, partnerId, status, etaMonths }

## 9. API (cible)

- `POST /api/addons/regularisation-tf/request`

## 10. Monétisation

Commission partenaire ou forfait agence diagnostic + suivi. Bundle avec diligence.

## 11. KPIs

`requests`, `bail_obtained`, `conversion`, `revenue_attach`, `median_months`

## 12. Risques & conformité

- Ne **jamais** garantir obtention bail/TF
- Ne pas encourager vente délibération comme TF
- Backlog Domaines / CCOD / DGSCOS = goulot externe
- Qualité partenaire ; disclaimers écrits

## 13. Phasing

- **v1:** Diagnostic + lead formalités + tracking CRM
- **Plus tard:** Checklist Phase A/B interactive ; statut client ; pack diaspora

## 14. Sources

- Étude Tracos `parcours-complet.md`, `titre.md`
- https://immoconnexion.com/acheter-un-terrain-au-senegal/
- `dossier/etude-de-marche/06` · `07`

---

*Spec agence full-service SN — voir `docs/add-ons.md`, `docs/positioning.md`.*
