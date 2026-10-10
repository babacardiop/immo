# S06 — Backend

**Outcome :** Requêtes catalogue filtrables par **région / ville / quartier** + pins carte alignés ; agrégats légers pour la nav géo.

**Déjà en place (réutiliser) :**

- `SENEGAL_REGIONS` (14) · `City.region` · `Quartier` + aliases
- `listPublicListings` / `listMapPins` / `buildPublicWhere`
- Seed quartiers SN · API `/api/locations`

## Todo

- [x] Étendre `CatalogueFilters` + `buildPublicWhere` avec `region` (string exacte, 14 valeurs)
  - Done when: filtre région sans city → toutes villes de la région
- [x] `listMapPins` respecte `region` + mêmes filtres que la liste
- [x] Endpoint ou query d’**agrégats géo** (counts publiés) :
  - par région · par ville (optionnel quartier)
  - Done when: UI peut afficher « n biens » sans N+1
- [x] Index / perf soft si besoin (`publishedAt`, `city`, `quartierLabel`, coords)
- [x] Valider coords listing pour carte (lat/lng non null) — documenter gap data agent BO
- [x] Pas de nouvelle table géo si City/Quartier suffisent ; sinon ADR court

## Refs

`web/src/lib/listings/public-query.ts` · `map-pins.ts` · `lib/locations/` · `S02` · `S04`
