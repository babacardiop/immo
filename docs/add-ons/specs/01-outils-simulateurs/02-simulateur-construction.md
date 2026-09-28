# Simulateur coût de construction

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `02-simulateur-construction.md` |
| **Priorité** | **P0** |
| **Catégorie** | Construction / Terrains |
| **Synthèse** | Estime le budget pour construire une maison (FCFA/m²) selon surface, finition et zone — branché sur fiches terrain. |

## 1. Problème client

Acheter le terrain sans chiffrer la maison mène à l'échec projet; les guides SN insistent sur +10–15% d'imprévus.

## 2. Réalité marché (recherche)

Repères 2025–2026: standard régions ~250–350k FCFA/m²; clé en main ~300–500k; Dakar souvent +15–25%. Maison 100 m² ≈ 30–50 M FCFA hors terrain. Architecte obligatoire si coût > ~30 M FCFA.

## 3. Utilisateurs & synergies

- **Users:** Acheteur terrain, diaspora, agent
- **Synergie produit:** Après simu mensualité; pack Terrain→Maison; share 'terrain+construction'.

## 4. Inputs

- surface_m2 (50–600)
- niveaux: R+0 | R+1
- finition: eco | standard | standing
- zone: dakar | petite_cote | interieur
- options: cloture, fosse, vrd, imprevus_10_15, tva_18
- listing_id (préremplit localisation)

## 5. Outputs

- fourchette min–max FCFA
- prix/m²
- détail postes
- CTA devis constructeur / archi
- PDF

## 6. UX / surfaces

- Bandeau fiche terrain: 'Construire ici ?'
- /outils/construire
- Résultat + 'Budget total projet' deep-link

## 7. Spec fonctionnelle

- Barèmes admin par zone/finition (table ConstructionRate)
- Multiplicateurs options (% ou forfait)
- Disclaimer fourchette ±10–15%, hors terrain
- Si total > 30M: hint 'architecte recommandé/obligatoire'

## 8. Données

- ConstructionRate {zone, finish, pricePerSqmMin, pricePerSqmMax, updatedAt}
- ConstructionOption {code, label, type: pct|fixed, value}

## 9. API (cible)

- POST /api/addons/construction/simulate
- CRUD admin /api/admin/construction-rates

## 10. Monétisation

Lead partenaires BTP/archi; commission 2–5% sur contrat signé; PDF email-gate.

## 11. KPIs

sim_from_listing, partner_leads, pdf_downloads

## 12. Risques & conformité

Responsabilité devis — toujours 'indicatif'; barèmes à recalibrer avec partenaires locaux.

## 13. Phasing

- **v1:** Barèmes + options + CTA
- **Plus tard:** Types de maison (catalogue plans); photos; lien suivi chantier

## 14. Sources

- **Lab / indices officiels (archivés) :** [`docs/research-lab/etudes/pdf/02-ansd-icc-t4-2025.pdf`](../../research-lab/etudes/pdf/02-ansd-icc-t4-2025.pdf) · [`…/10-ansd-imc-fevrier-2026.pdf`](../../research-lab/etudes/pdf/10-ansd-imc-fevrier-2026.pdf) · [`…/12-ansd-ibtp-t4-2025.pdf`](../../research-lab/etudes/pdf/12-ansd-ibtp-t4-2025.pdf) — catalogue [`etudes/README.md`](../../research-lab/etudes/README.md)
- https://keur-immo.com/senegal/construction-maison-senegal/
- https://investissementimmoafrique.com/simulateur-cout-construction-maison-senegal/
- https://investissementimmoafrique.com/calculateur-du-cout-de-construction/
- https://hubcephas.com/estimateur-en-ligne/

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`, `docs/research-lab/`.*
