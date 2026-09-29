# Captures concurrence — Screenshots datés

**Dossier :** Annexes · 03 · `captures-concurrence/`  
**Statut :** v1.0 — 2026-09-29  
**Amont :** [`../../etude-de-marche/03-offre-concurrence.md`](../../etude-de-marche/03-offre-concurrence.md) · [`../../../docs/competitive-analysis.md`](../../../docs/competitive-analysis.md)

> Preuves **visuelles datées** pour étude de marché, pitch investisseur, veille UX.  
> Pas de republication massive de contenus tiers — captures pour usage interne dossier.

---

## 1. Naming (obligatoire)

```
YYYY-MM-DD_{acteur}_{page}_{viewport}.{png|jpg}

Exemples :
2026-09-29_expat-dakar_home_desktop.png
2026-09-29_yaweet_home_desktop.png
2026-09-29_noflaye_home_desktop.png
```

| Champ | Règle |
| --- | --- |
| Date | Jour de capture (ISO) |
| Acteur | slug minuscule |
| Page | `home` · `listing` · `search` · `pricing` · `about` |
| Viewport | `desktop` (1280+) · `mobile` (390) |

---

## 2. Contenu du dossier

| Fichier | Rôle |
| --- | --- |
| [`registre-captures.md`](./registre-captures.md) | Index URL · statut · observations |
| [`observations/`](./observations/) | Fiches par acteur (ce qu’on voit) |
| `*.png` | Captures (quand produites) |
| [`TODO-captures.md`](./TODO-captures.md) | File d’attente manuelle / CI |

---

## 3. Cadence

| Rythme | Action |
| --- | --- |
| **Soft launch** | Vague 1 captures P0 (ci-dessous) |
| **Trimestriel** | Re-capture home + search des P0 |
| **Avant levée** | Pack daté J−7 dans data room |

---

## 4. Priorité capture (P0)

| # | Acteur | Cercle | URL cible |
| --- | --- | --- | --- |
| 1 | Expat-Dakar | Classifieds | https://www.expat-dakar.com/ |
| 2 | CoinAfrique SN | Classifieds | https://sn.coinafrique.com/categorie/immobilier |
| 3 | Keur-Immo | Portail immo | https://keur-immo.com/ (vérifier domaine live) |
| 4 | Yaweet | PropTech diligence | https://yaweet.com/ |
| 5 | Noflaye | SaaS gestion | https://www.noflaye.sn/ |
| 6 | Senhectare | Map foncier | https://senhectare.com/ |
| 7 | Immobilier-au-Sénégal | Portail/agence | https://immobilier-au-senegal.com/ |

P1 : Diavix · MyAfric · agence premium Gaïa/Gueye (si URL publique).

---

## 5. Checklist par capture

- [ ] Date dans nom fichier  
- [ ] URL exacte notée dans registre  
- [ ] Viewport noté  
- [ ] 3 observations UX (force / faille / opportunité hub)  
- [ ] Pas de données perso clients visibles (flouter si besoin)  

---

*Captures concurrence — cadre v1.0 — 2026-09-29.*
