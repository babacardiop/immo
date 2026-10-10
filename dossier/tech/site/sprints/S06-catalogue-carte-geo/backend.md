# S06 — Backend

**Outcome :** Requêtes catalogue filtrables par **région / ville / quartier** + pins carte alignés ; agrégats légers pour la nav géo.

**Déjà en place (réutiliser) :**

- `SENEGAL_REGIONS` (14) · `City.region` · `Quartier` + aliases
- `listPublicListings` / `listMapPins` / `buildPublicWhere`
- Seed quartiers SN · API `/api/locations`

## Todo

- [ ] Étendre `CatalogueFilters` + `buildPublicWhere` avec `region` (string exacte, 14 valeurs)
  - Done when: filtre région sans city → toutes villes de la région
- [ ] `listMapPins` respecte `region` + mêmes filtres que la liste
- [ ] Endpoint ou query d’**agrégats géo** (counts publiés) :
  - par région · par ville (optionnel quartier)
  - Done when: UI peut afficher « n biens » sans N+1
- [ ] Index / perf soft si besoin (`publishedAt`, `city`, `quartierLabel`, coords)
- [ ] Valider coords listing pour carte (lat/lng non null) — documenter gap data agent BO
- [ ] Pas de nouvelle table géo si City/Quartier suffisent ; sinon ADR court

## Refs

`web/src/lib/listings/public-query.ts` · `map-pins.ts` · `lib/locations/` · `S02` · `S04`
