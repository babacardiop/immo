# Due diligence foncière

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `08-due-diligence-fonciere.md` |
| **Priorité** | **P0–P1** (Vague 2) |
| **Catégorie** | Foncier / Confiance |
| **Synthèse** | Vérification **régime + titre + occupation** avant paiement — rapport horodaté (interne et/ou partenaire type YAWEET). |
| **Référentiel** | [`dossier/etude-de-marche/06-parcours-foncier-securite.md`](../../../../dossier/etude-de-marche/06-parcours-foncier-securite.md) · [`07-glossaire-foncier.md`](../../../../dossier/etude-de-marche/07-glossaire-foncier.md) |

## 1. Problème client

Fraudes diaspora et locales : faux titres, indivision, chevauchements, **« ventes » sur délibération**, double affectation, zones **Arrêt Dscos / contentieux**. L’**état des droits réels (EDR)** à la Conservation est la base — insuffisant seul si on ne qualifie pas le **régime**.

## 2. Réalité marché (recherche)

- EDR : ordre centaines–milliers FCFA ; consultable parfois en ligne (dgid.sn, couverture inégale).
- **NICAD** obligatoire (décret 2012-396) ; eNICAD via PROCASEF.
- YAWEET : rapport diligence horodaté diaspora-first.
- DGSCOS : milliers de plaintes ; saisine brigade (titre + EDR + plan) ; ne délivre **pas** de titre.
- Délibération exécutoire ≠ TF ; seuils tutelle **10 / 50 ha**.
- Délais régularisation bail : souvent **3–6 mois** ; bail→TF **6–18 mois**.

## 3. Utilisateurs & synergies

- **Users:** Acquéreur, diaspora, agence (gate avant publication / boost)
- **Synergie:** Gate « we publish ads » ; avant séquestre ; bundle Diaspora Full ; formalités `04` ; géomètre `06` ; régularisation `43`

## 4. Inputs

- Type de papier revendiqué (TF / bail / délibération / autre)
- Réfs TF/bail/NICAD
- Docs vendeur (scans)
- Localisation GPS / quartier
- Signal contentieux connu (optionnel)

## 5. Outputs

- Rapport PDF (hash/date)
- **Qualification du régime** (domaine public / privé État / DN / TF privé / litige)
- Score confiance + **go / go conditionnel / no-go**
- Liste pièces manquantes + next steps (notaire, bornage, Yastal…)

## 6. UX / surfaces

- CTA fiche : *Vérifier avant de payer*
- Workflow interne listing approval
- Checklist publique (blog) + wizard dashboard
- Disclaimer auto si `paperType = deliberation`

## 7. Spec fonctionnelle

### Checklist minimale (ordre)

1. Qualifier le **régime** juridique  
2. EDR (Conservation / portail)  
3. NICAD + extrait plan Cadastre  
4. Visite / inspection (surtout diaspora)  
5. Cohérence superficie / bornes  
6. Notaire choisi avec l’acheteur  
7. Séparation des rôles (diaspora)  
8. Paiement traçable / séquestre  

### Red flags → no-go ou go conditionnel

Délibération présentée comme titre · pression paiement immédiat · photos vendeur seules · prix aberrant · multi-post · zone Arrêt Dscos · tutelle non prouvée · TeleDAc « OK » sans arrêté maire

### Workflow

- Commande partenaire API ou formulaire interne
- Statuts: `requested → in_progress → delivered`
- Bloquer **boost** listing sans diligence minimale (policy Vague 2)
- Sur délibération : forcer bandeau + CTA régularisation

## 8. Données

- `DiligenceOrder` { regime, paperType, nicad?, edrRef?, score, verdict, pdfUrl, hash? }
- `Listing.verificationStatus` { none, basic, full, blocked }
- `Listing.paperType` { tf, bail_emph, bail_ord, deliberation, other }

## 9. API (cible)

- `POST /api/addons/diligence`
- `GET /api/addons/diligence/:id`

## 10. Monétisation

Markup sur rapport partenaire **ou** forfait agence (pack diligence + inspection). Upsell formalités / géomètre / notaire.

## 11. KPIs

`orders`, `block_rate_bad_titles`, `verdict_distribution`, `%_listings_verified`, conversion closing post-diligence

## 12. Risques & conformité

Délais admin DGID ; dépendance partenaire ; **ne pas promettre** un résultat judiciaire ; disclaimer zones DGSCOS ; ne jamais écrire dans le Livre foncier.

## 13. Phasing

- **v1:** Process manuel + PDF + checklist UI + policy paperType
- **v1.5:** Intégration Yaweet-like + hash PDF
- **Plus tard:** Alerte contentieux / lecture SGF si APIs

## 14. Sources

- https://yaweet.com/
- https://www.senpages.com/dossiers/acheter-un-terrain
- https://immoconnexion.com/acheter-un-terrain-au-senegal/
- Étude TRA-COS/DGSCOS (`Tracos/docs` : `titre.md`, `parcours-complet.md`, `problems.md`)
- `dossier/etude-de-marche/06-parcours-foncier-securite.md`

---

*Spec agence full-service SN — voir `docs/add-ons.md`, `docs/positioning.md`.*
