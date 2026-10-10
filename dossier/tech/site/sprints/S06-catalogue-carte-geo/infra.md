# S06 — Infra

## Todo

- [ ] Pas de nouveau service cloud — Leaflet déjà côté client
- [ ] Vérifier tiles OSM OK en prod (CSP / connect-src si durci)
- [ ] Seed / staging : ≥ quelques listings **géolocalisés** (lat/lng) par région clé (Dakar, Thiès…)
  - Done when: `view=map` non vide sur staging
- [ ] Monitor soft : perf query agrégats ( Neon explain si lent )
- [ ] Doc agent BO : renseigner coords à la publication (lien S01 publish gate optionnel)

## Env

Aucun secret nouveau. Optionnel plus tard : Mapbox/Google — **hors scope S06** (rester OSM/Leaflet).

## Refs

`S04` map soft · `next.config` CSP · Render staging
