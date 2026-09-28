# Calculateur frais d'acquisition

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `18-calculateur-frais-acquisition.md` |
| **Priorité** | **P1** |
| **Catégorie** | Transparence / SEO |
| **Synthèse** | Estime droits d'enregistrement, formalité foncière, émoluments notaire + TVA. |

## 1. Problème client

Surprise à la signature si frais non anticipés.

## 2. Réalité marché (recherche)

Enregistrement ~5%; formalité ~1%; émoluments dégressifs 4,5%/3%/1,5%/0,75% + TVA 18%.

## 3. Utilisateurs & synergies

- **Users:** Acheteur
- **Synergie produit:** Budget total; pack notaire; guides SEO.

## 4. Inputs

- prix
- type: tf_ancien | autre

## 5. Outputs

- détail frais
- total
- disclaimer

## 6. UX / surfaces

- /outils/frais-notaire
- fiche vente

## 7. Spec fonctionnelle

- Barème admin tranches

## 8. Données

- NotaryFeeBracket

## 9. API (cible)

- POST /api/addons/notary-fees/simulate

## 10. Monétisation

Confiance + lead notaire.

## 11. KPIs

tool_usage

## 12. Risques & conformité

Régimes particuliers (TVA immo neuf) — cases à cocher.

## 13. Phasing

- **v1:** Régime classique TF
- **Plus tard:** Plus de régimes fiscaux

## 14. Sources

- https://nadiaimmoservices.blog/frais-notaire-senegal/
- https://www.senpages.com/dossiers/acheter-un-terrain

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
