# S09 — Frontend

**US :** US-V3-20…24  
**DS :** `forms/property-create/` · `listing-republish/` · `commodites-*` · `pages/espace/agent/property-detail/`

## Todo

### Agent BO

- [ ] Flow **créer Property** puis 1er Listing (wizard 2 steps soft)
- [ ] Fiche `/espace/agent/biens/[propertyId]` : structure · media · **Historique des publications**
- [ ] Action **Republier** (courte durée finie / bail fini) → form `listing-republish`
- [ ] Éditeur **commodités structure** (qty : chambres, WC, balcon ×N…)
- [ ] Éditeur **offre courte durée** (includes boolean pack) si `rentalMode=short`
- [ ] Liste annonces : grouper par Property soft · badge cycle / statut
- [ ] Empty Property : « Aucune publication — Republier ou créer un cycle »

### Public (compat)

- [ ] Fiche publique affiche specs Property + includes Listing actif
- [ ] Cards : chambres / sdb / balcons qty si renseignés

### Commun

- [ ] Copy : « Le bien reste ; seule l’annonce se clôture »
- [ ] Side-by-side frames DS S09

## Refs

add-on **55** · `assets/design/design-system/forms/{property-create,listing-republish,commodites-*}/`
