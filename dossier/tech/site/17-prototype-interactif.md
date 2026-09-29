# Prototype interactif — Parcours couverts

**Document :** Dossier · Tech · Site · 17  
**Statut :** v1.0 — sept. 2026 · **Proto : à câbler / lien §2**  
**Amont :** [`16-maquettes-ui.md`](./16-maquettes-ui.md) · [`15-wireframes.md`](./15-wireframes.md) · [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) · [`02-parcours-utilisateurs.md`](./02-parcours-utilisateurs.md) · [`12-user-stories-backlog.md`](./12-user-stories-backlog.md)  
**Aval :** Tests usabilité · sign-off GER/OD · build Next.js · Maze/UG optionnel

> **Rôle :** spécifier le **proto cliquable** Figma (flows, hotspots, états, couverture journeys, script de test) — avant code.  
> Visuel frames → `16`. Structure lo-fi → `15`. Journeys métier → `02`.

---

## 0. En une phrase

Proto = **parcours cliquables bout-en-bout** (happy + empty/error) pour valider IA, confiance papier et CTA WA — pas une galerie de screenshots.

```
16 HF Ready  →  17 Proto flows  →  test 5 users  →  fix  →  Dev Mode build
```

---

## 1. Objectifs du proto

| # | Objectif | Succès |
| ---: | --- | --- |
| 1 | Valider critical path acheteur terrain ≤5 taps | Task J1 completed ≥4/5 |
| 2 | Vérifier découverte **pastille papier** + disclaimer délibération | Verbalisé / cliqué sans aide |
| 3 | Confirmer simus **ungated** + CTA in-result | Résultat vu sans compte |
| 4 | Séparer intents (Acheter/Louer/Gérer/Diaspora) | 0 confusion nav majeure |
| 5 | Valider publish agent + gate papier | Agent échoue puis réussit publish |
| 6 | Préparer handoff eng (interactions explicites) | Notes motion/hotspot complètes |

**Non-objectifs :** backend réel · WA réellement ouvert (écran « fin →WA » OK) · calcul simu exact (résultat mock) · portails V3.

---

## 2. Liens proto (à renseigner)

| Champ | Valeur |
| --- | --- |
| **Fichier Figma** | Même `EverGreen-Hub` que `16` §2 — page **Flows / Prototype** |
| **Lien proto Present** | `_À RENSEIGNER_` — `Anyone with the link` · Presentation |
| **Starting frame Mobile** | `Proto / Start · Mobile` → W-HOME 390 |
| **Starting frame Desktop** | `Proto / Start · Desktop` → W-HOME 1440 |
| **Device preset Mobile** | iPhone 14/15 · 390 |
| **Device preset Desktop** | Desktop · 1440 |
| **Version** | `Proto-MVP-v0.1` |
| **Maze / test tool** | Optionnel `_URL_` |

**Statut :** ❌ placeholder jusqu’au câblage. Coller URL ici + notifier OD.

---

## 3. Périmètre — flows inclus / exclus

### 3.1 Inclus (MVP proto)

| Flow ID | Journey | Vague | Priorité test |
| --- | --- | :---: | :---: |
| **F-J1** | Acheteur terrain (happy + branche délibération + simu) | V1 | P0 |
| **F-J3** | Locataire soft | V0 | P0 |
| **F-J4** | Bailleur form → toast | V0 | P0 |
| **F-J5** | Diaspora soft → guide TF → catalogue TF | V0 | P0 |
| **F-J2** | Vendeur contact / estimation soft | V0 | P1 |
| **F-AGT** | Agent login → create → gate → publish | V0 | P0 |
| **F-NAV** | Nav L1 + drawer + FAB WA (shell) | V0 | P0 |
| **F-EDGE** | Empty catalogue · 404 · form error · simu error | V0–1 | P0 |

### 3.2 Exclus (icebox proto)

| Exclu | Motif |
| --- | --- |
| Portails `/espace/proprio|client` | Vague 3 |
| Diligence complète / frais acquisition | Vague 2 |
| Pack diaspora inspection/POA full | Vague 4 |
| Observatoire / carte prix | Vague 7 |
| Multi-langue · dark mode | Y1 out |
| Paiement Wave réel | Soft copy only |
| Inbox WA Business | Hors app |

---

## 4. Cartographie des flows

### 4.1 F-J1 — Acheteur terrain (cœur)

```
[Start HOME]
    │ search « Almadies » / CTA Acheter
    ▼
[W-ACH-HUB] ──filtres Terrain+TF──► [W-ACH-HUB filtered]
    │ open card
    ▼
[W-ACH-FICHE-T] ──embed Calculer──► [W-OUT-RES mock]
    │                              │
    │ sticky WA                    ├─► [Fin →WA overlay]
    │                              └─► [PartnerLead CTA] → toast soft
    │
    ├─ variant: open card Délibération
    │       ▼
    │  [W-ACH-FICHE + W-DISC-PAP] ──► WA
    │
    └─ optional: nav Outils → W-OUT-MEN → RES → WA
```

**Hotspots min. :** search submit · chip Papier · card · sticky WA · Calculer embed · CTA résultat · lien guide TF.

### 4.2 F-J3 — Locataire

```
HOME → Louer → W-LOU-HUB → W-LOU-FICHE → CTA visite →WA
```

### 4.3 F-J4 — Bailleur

```
HOME / nav Gérer → W-GER → W-GER-FORM
    ├─ submit OK → W-TOAST → (fin)
    └─ submit vide → W-GER-FORM error inline
```

### 4.4 F-J5 — Diaspora soft

```
HOME / Diaspora → W-DIA (lire « pas Wave »)
    → Guide TF → W-ACH-HUB (filtre TF pré-posé)
    → Fiche TF → →WA
```

### 4.5 F-J2 — Vendeur soft (P1)

```
Agence Contact / Estimation soft → form → toast
```

### 4.6 F-AGT — Supply

```
[W-AGT-LOGIN] → [W-AGT-LIST] → [W-AGT-NEW]
    ├─ Publier sans papier → error gate (reste sur form)
    ├─ Choisir TF + photos → Publier OK → [W-ACH-FICHE live mock]
    └─ Empty list path: W-AGT-EMPTY → NEW
```

### 4.7 F-EDGE — Branches obligatoires

| Trigger | Destination |
| --- | --- |
| Filtres 0 résultat | W-EMPTY-CAT → Élargir / →WA |
| URL inconnue (lien footer test) | W-404 → Accueil |
| Simu input invalide | W-OUT-ERR |
| FAB WA (toute page public) | Fin →WA overlay |
| Back / fil d’Ariane fiche | Catalogue |

Bench ([Tessary](https://tessary.ai/blog/figma-flow-testing-end-to-end), [Maze](https://maze.co/blog/test-figma-prototypes/), [Lenka](https://lenkastudio.com/blog/how-to-build-figma-prototype-for-usability-testing)) : **pas de cul-de-sac** sur branches testées ; Variables/conditionnels si dispo sinon frames doublons états.

---

## 5. Matrice couverture journey × proto

| Journey `02` | Couvert proto MVP ? | Profondeur | Notes |
| --- | :---: | --- | --- |
| J1 Acheteur | ● | D→E→C (+ simu) | T/A hors proto (WA fin) |
| J2 Vendeur | ◐ | Contact soft | Estimation produit V5 icebox |
| J3 Locataire | ● | D→C | Portail V3 non |
| J4 Bailleur | ◐ | Landing+form | Espace proprio V3 non |
| J5 Diaspora | ◐ | Soft confiance | Pack V4 non |
| Agent supply | ● | Publish gated | Commissions non |

● full soft MVP · ◐ partial

---

## 6. Interactions & motion

### 6.1 Types de hotspots

| Interaction | Usage |
| --- | --- |
| On click → Navigate to | Primary |
| On click → Open overlay | →WA fin · share sheet · filters sheet |
| Smart animate (opt.) | Drawer · sheet filtres |
| Scroll | Fiche longue (overflow frame) |
| Hover (desktop) | Card lift 2px — annoté |

### 6.2 Motions (aligné `16`)

1. Home hero soft appear  
2. Card hover desktop  
3. Sticky CTA fiche fade-in  

Pas d’autres animations bloquantes test.

### 6.3 Fin de parcours →WA

Écran / overlay unique :

```
┌─────────────────────────────┐
│ Ouverture WhatsApp…         │
│ (hors prototype)            │
│ Message prérempli mocké     │
│ [Retour fiche]              │
└─────────────────────────────┘
```

Évite lien `wa.me` cassé en test usabilité.

---

## 7. Script de test usabilité

Bench : 5 users / segment clé ([Great Question](https://www.greatquestion.com/blog/figma-prototype-testing)) · think-aloud · tâches scénarisées.

### 7.1 Segments prioritaires Y1

| Segment | n min | Flows |
| --- | ---: | --- |
| Acheteur terrain (Mamadou-like) | 5 | F-J1 + EDGE empty |
| Diaspora soft (Fatou-like) | 3 | F-J5 |
| Agent interne | 2–3 | F-AGT |

### 7.2 Tâches (scénario)

| ID | Consigne | Flow | Succès |
| --- | --- | --- | --- |
| T1 | « Trouve un terrain à Almadies avec titre foncier et demande une visite. » | F-J1 | Atteint →WA depuis fiche TF |
| T2 | « Estime ce que tu pourrais payer par mois pour ce terrain (sans créer de compte). » | F-J1 simu | Voit résultat FCFA + disc |
| T3 | « Tu vois une annonce en délibération — qu’est-ce que ça veut dire ? Contacte l’agence. » | F-J1 disc | Mentionne risque / lit ⚠ |
| T4 | « Tu cherches un appart à louer pour le mois prochain. » | F-J3 | →WA depuis fiche loc |
| T5 | « Tu veux faire gérer ton appartement — laisse tes coordonnées. » | F-J4 | Toast succès |
| T6 | « Tu es à Paris, tu veux éviter les arnaques Wave — par où tu passes ? » | F-J5 | Passe par Diaspora / guide |
| T7 | *(agent)* « Publie un terrain sans renseigner le papier, puis corrige et publie. » | F-AGT | Gate puis live |

### 7.3 Métriques

| Métrique | Cible v0.1 |
| --- | --- |
| Task completion T1 | ≥80 % |
| Time on T1 | &lt; 3 min |
| Misclick nav bloquant | 0 critique |
| « Crédit banque » mal compris sur simu | ≤1/5 (sinon copy fix) |
| Pastille papier non vue T1/T3 | ≤1/5 |

### 7.4 Triage findings

| Sévérité | Action |
| --- | --- |
| Block (empêche tâche) | Fix proto/HF avant build |
| Friction | Backlog design sprint |
| Note | Watch en prod analytics |

---

## 8. Checklist câblage Figma (builder)

- [ ] Starting frames Mobile + Desktop explicites  
- [ ] Flow names : `F-J1 Acheteur v0.1`, etc.  
- [ ] Tous hotspots T1–T7 sans dead-end  
- [ ] Empty / error / toast / 404 reliés  
- [ ] Overlay →WA unique  
- [ ] Filter sheet open/close  
- [ ] Agent gate paper branch  
- [ ] Prototype share link Anyone  
- [ ] Cover frame : version + date + lien ce doc  
- [ ] Walkthrough interne 1× (design dogfood) avant users  

Variables Figma (si plan Pro) : `paperType`, `formValid`, `simDone` pour branches — sinon frames `… / TF` et `… / Délibération` séparés.

---

## 9. Matrice écrans × flow (traçabilité)

| Écran | F-J1 | F-J3 | F-J4 | F-J5 | F-AGT | F-EDGE |
| --- | :---: | :---: | :---: | :---: | :---: | :---: |
| W-HOME | ● | ● | ○ | ● | ○ | ○ |
| W-ACH-HUB / FILTERS / CARD | ● | ○ | ○ | ● | ○ | ● empty |
| W-ACH-FICHE / T / DISC | ● | ○ | ○ | ● | ● live | ○ |
| W-OUT-* / EMB / RES / ERR | ● | ○ | ○ | ○ | ○ | ● |
| W-LOU-* | ○ | ● | ○ | ○ | ○ | ○ |
| W-GER / FORM / TOAST | ○ | ○ | ● | ○ | ○ | ● err |
| W-DIA / GUI-TF | ○ | ○ | ○ | ● | ○ | ○ |
| W-AGT-* | ○ | ○ | ○ | ○ | ● | ○ |
| W-404 / WA overlay | ○ | ○ | ○ | ○ | ○ | ● |

---

## 10. DoD proto → go build

| Critère | Owner |
| --- | --- |
| Lien §2 live + Present OK mobile | Design |
| T1–T3 testés en dogfood | Design + OD |
| ≥1 session users acheteur (idéalement 5) | OD / design |
| 0 block ouvert | GER arbitre |
| Findings classés · HF updaté | Design |
| Eng briefé Dev Mode + ce doc | Eng |

**Go code V0** possible si F-J1 + F-AGT + F-EDGE dogfood OK même si tests users externes partiels — noter risque.

---

## 11. RACI

| Activité | Design | OD | GER | Eng |
| --- | :---: | :---: | :---: | :---: |
| Câbler hotspots | ● | ○ | ○ | ○ |
| Script tâches | ◐ | ● | ○ | ○ |
| Recruter testeurs | ○ | ● | ○ | ○ |
| Arbitrer blocks | ◐ | ◐ | ● | ○ |
| Conso findings → code | ○ | ○ | ○ | ● |

---

## 12. Journal versions proto

| Version | Date | Flows | Lien |
| --- | --- | --- | --- |
| v0.0 | — | Spec only | — |
| v0.1 | _TBD_ | F-J1, J3, J4, J5, AGT, EDGE | _URL_ |
| v0.2 | _TBD_ | + F-J2 polish · desktop J1 | _URL_ |

---

## 13. Sources

| Source | Apport |
| --- | --- |
| `02` `03` `15` `16` | Journeys · IDs · HF |
| Maze / Great Question / Lenka / Tessary / Gruv 2025–26 | Tasks · beyond happy path · starting frame · variables |

---

## 14. Liens

| Doc | Rôle |
| --- | --- |
| [`16-maquettes-ui.md`](./16-maquettes-ui.md) | Frames source |
| [`15-wireframes.md`](./15-wireframes.md) | Structure |
| [`02-parcours-utilisateurs.md`](./02-parcours-utilisateurs.md) | JTBD |
| [`12-user-stories-backlog.md`](./12-user-stories-backlog.md) | US validation |
| [`18-design-system.md`](./18-design-system.md) | Composants interactifs |

---

*Prototype interactif EverGreen Site v1.0 — sept. 2026. Flows J1/J3/J4/J5/AGT + edges · overlay →WA · tests T1–T7 · lien Present à coller §2.*
