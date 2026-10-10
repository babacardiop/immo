# S06 — Frontend

**Outcome :** Sur `/acheter` et `/louer`, bascule **Liste | Carte**, puis exploration géo **Région → Ville → Quartier** (données SN déjà en base / seed).

**DS refs :** `catalogue/acheter-list` · `acheter-map` · `louer-list` · `louer-map` · `filters-drawer` · `type-terrains`

## Outcome UX

1. Toggle **Liste / Carte** (URL `?view=list|map`, défaut `list`).
2. Carte = vue principale quand `view=map` (pas une carte collée sous la grille).
3. Navigation géo hiérarchique (chips / drawer / breadcrumb) :
   - **14 régions** → villes actives → quartiers
4. Filtres existants (type, prix, papier / durée) cohabitent avec le drill-down géo.
5. Empty soft inchangé ; pins cliquables → fiche.

## Todo

- [x] Toggle Liste | Carte sur catalogue (sticky sous header / barre filtres)
  - Done when: switch change `view` sans perdre city/quartier/price…
- [x] Vue **Liste** = grille cards seule (retirer la carte always-on actuelle)
- [x] Vue **Carte** = Map plein panneau + panneau latéral / bottom sheet résultats (mobile)
  - Done when: frames `acheter-map` / `louer-map` respectés en composition
- [x] Drill-down géo UI : Région → Ville → Quartier
  - Chips ou select en cascade + breadcrumb `Sénégal › Dakar › Almadies`
  - Done when: chaque niveau filtre le catalogue + sync URL (`region`, `city`, `quartier`)
- [x] Compteurs soft par niveau (ex. « 12 biens · Dakar ») si data dispo
- [x] Deep-link landings `/quartiers/[slug]` → catalogue préfiltré (déjà partiel) + `view=`
- [x] Mobile : drawer filtres + carte full-height ; FAB Liste/Carte
- [x] Copy FR métier SN (pas EN mockup)

## Refs

`../15` · `../08` · `../13` · `S02-catalogue-public` · `lib/locations/*` · DS `pages/public/catalogue/`
