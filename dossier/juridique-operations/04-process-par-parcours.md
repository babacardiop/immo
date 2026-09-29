# Process par parcours — Flowcharts ops

**Document :** Dossier · Juridique & opérations · 04  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`../etude-de-marche/02-analyse-demande.md`](../etude-de-marche/02-analyse-demande.md) · [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) · [`../offre-et-tarifs/03-packs-et-bundles.md`](../offre-et-tarifs/03-packs-et-bundles.md) · [`03-manuel-agent.md`](./03-manuel-agent.md) · [`02-convention-partenaire-type.md`](./02-convention-partenaire-type.md) · [`../risques-conformite/02-politique-anti-fraude.md`](../risques-conformite/02-politique-anti-fraude.md) · [`../etude-de-marche/06-parcours-foncier-securite.md`](../etude-de-marche/06-parcours-foncier-securite.md)  
**Aval :** CRM stages · formation · [`05-checklists-ops.md`](./05-checklists-ops.md)

---

## 0. Légende & règles

| Symbole | Sens |
| --- | --- |
| `[ ]` rectangle | Étape action |
| `{ }` losange | Décision / gate |
| `(( ))` cercle | Start / end |
| `[[ ]]` sous-process | Renvoi autre flowchart |

| Code couleur ops | |
| --- | --- |
| **Vert** | Passage autorisé |
| **Orange** | Frein / GO conditionnel |
| **Rouge** | Stop / NO-GO |
| **Bleu** | Handoff partenaire |

**Règles transverses (tous parcours) :**

1. SLA WA &lt; 24 h  
2. CRM à chaque stage  
3. **Jamais** Wave vendeur  
4. 1 rouge ou ≥ 2 orange → frein diligence  
5. Convention partenaire **avant** intro lead  

---

## 1. Router d’entrée (tous leads)

```mermaid
flowchart TD
  A((Lead WA / site / ads / farming)) --> B[Accusé auto &lt; 2 min]
  B --> C[Réponse humaine &lt; 24 h]
  C --> D{Intent?}
  D -->|VENTE| P1[Parcours Vendeur §2]
  D -->|ACHAT terrain/bâti| E{Sur place?}
  E -->|Oui local| P2[Parcours Acquéreur §3]
  E -->|Diaspora| P3[Parcours Diaspora §4]
  D -->|LOCATION| P4[Parcours Locataire §5]
  D -->|GESTION / bailleur| P5[Parcours Gestion §6]
  D -->|AUTRE / flou| F[Qualif 5 questions]
  F --> D
  D -->|Hors zone / no-go| Z((Clos CRM + nurture?))
```

**Tags CRM :** `persona` · `intent` · `source` · `paper_interest`

---

## 2. Parcours **Vendeur** — Marième (supply)

*Outcome : mandat exclusif → closing → commission Axe 1.*  
*Vague : V0+ · bundle Vendre Mieux (V5 outils).*

```mermaid
flowchart TD
  A((Lead vendeur)) --> B[Qualif : bien / timing / papier]
  B --> C[RDV estimation]
  C --> D[Visite estimation + photos]
  D --> E[Fourchette écrite J0]
  E --> F{Exclusif OK?}
  F -->|Oui| G[Mandat exclusif 90 j · registre]
  F -->|Non| H{GER GO simple?}
  H -->|Non| Z1((Pause / clos))
  H -->|Oui motif CRM| G2[Mandat simple]
  G --> I[Publish curated + type papier]
  G2 --> I
  I --> J[Diffusion contrôlée]
  J --> K[Visites filtrées]
  K --> L{Offre sérieuse?}
  L -->|Non| M{Échéance mandat?}
  M -->|Active| J
  M -->|Expiré| N[Avenant / clos / nurture]
  L -->|Oui| O[[Diligence acquéreur §7]]
  O --> P{Verdict?}
  P -->|NO-GO| K
  P -->|GO / GO_cond| Q[Négociation · offre écrite]
  Q --> R[Notaire + séquestre]
  R --> S[Acte authentique]
  S --> T[Commission encaissée]
  T --> U{Upsell?}
  U -->|Gestion / BTP| V[[Apport §8]]
  U -->|Non| W((Clos + archive 5 ans))
```

| Stage CRM | Critère passage |
| --- | --- |
| `est_rdv` | Créneau confirmé |
| `est_done` | Fourchette envoyée |
| `mandat_actif` | Original signé + n° registre |
| `offre` | Offre écrite sous conditions |
| `closing` | Acte daté |
| `won` | Honoraires encaissés |

**KPI :** % exclusifs ≥ 60 % · reporting bi-mensuel tenu · délai mandat → closing.

---

## 3. Parcours **Acquéreur terrain / bâti** — Mamadou (P0)

*Outcome : décider (simus) → sécuriser → closer → option construire.*  
*Vague : V1 Décider · V2 Sécuriser.*

```mermaid
flowchart TD
  A((Lead achat)) --> B[Qualif budget / zone / terrain|bâti / délai]
  B --> C{Budget & zone OK?}
  C -->|Non| Z((Nurture / clos))
  C -->|Oui| D[Shortlist curated 2–4 biens]
  D --> E[Simus V1: mensualité + construction + total]
  E --> F{Client GO chiffres?}
  F -->|Non| E
  F -->|Oui| G[Visite terrain / bâti]
  G --> H[Feedback post-visite]
  H --> I{Intérêt fort?}
  I -->|Non| D
  I -->|Oui| J{Type papier?}
  J -->|Délibération / doute| K[CTA Pack Sécuriser / diligence]
  J -->|TF / bail clair| L[[Diligence §7]]
  K --> L
  L --> M{Verdict?}
  M -->|NO-GO| D
  M -->|GO_cond| N[Lever conditions · bornage?]
  N --> M
  M -->|GO| O[Offre sous conditions]
  O --> P[Notaire client · séquestre]
  P --> Q[Acte]
  Q --> R[Commission vente]
  R --> S{Veut construire?}
  S -->|Oui| T[[Apport BTP/Archi §8]]
  S -->|Non| U((Clos / upsell gestion si locatif))
```

| Gate | Bloquant |
| --- | --- |
| Avant acompte | Diligence mini + script anti-Wave |
| Avant boost listing | Policy papiers V2 si &gt; seuil |
| Avant chantier | Preuve AC / titre lisible (disclaimer sinon) |

---

## 4. Parcours **Diaspora** — Fatou / Ibrahima (P0)

*Outcome : preuve à distance → séquestre → acte / gestion.*  
*Vague : V2 + V4 Diaspora Secure. Aligné MyAfric 10 étapes (adapté hub).*

```mermaid
flowchart TD
  A((Lead diaspora)) --> B[Script anti-Wave + protocole 5 points]
  B --> C[Cadrage : usage / budget total / horizon]
  C --> D[Présélection catalogue + type papier]
  D --> E{Visite?}
  E -->|Vidéo WA| F[Visite vidéo agent]
  E -->|Tiers| G[Inspection partenaire Pack Secure]
  F --> H{Confiance visuelle?}
  G --> H
  H -->|Non| D
  H -->|Oui| I[Séparation des rôles rappelée]
  I --> J[[Diligence §7 + EDR]]
  J --> K{Verdict?}
  K -->|NO-GO| D
  K -->|GO| L[Choix notaire PAR client]
  L --> M{POA besoin?}
  M -->|Oui| N[[Politique procurations 06]]
  M -->|Non| O[Avant-contrat / offre]
  N --> O
  O --> P[Fonds → séquestre notaire UNIQUEMENT]
  P --> Q[Acte ± mandataire]
  Q --> R[Mutation / suivi]
  R --> S{Bien locatif?}
  S -->|Oui| T[Parcours Gestion §6]
  S -->|Non| U{Construire?}
  U -->|Oui| V[[Apport §8]]
  U -->|Non| W((Clos + reporting))
```

**5 rôles à séparer :** présentateur ≠ vérificateur ≠ notaire ≠ fonds ≠ mandataire POA.

**Interdits parcours :** photos seules = GO · Wave vendeur · cousin unique · POA générale.

---

## 5. Parcours **Location** — Aïssatou (demande) + mise en loc bailleur

### 5.1 Locataire

```mermaid
flowchart TD
  A((Lead loc)) --> B[Qualif budget / zone / date]
  B --> C[Annoncer TOTAL ENTRÉE avant visite]
  C --> D[Visites filtrées]
  D --> E{GO locataire?}
  E -->|Non| D
  E -->|Oui| F[Dossier locataire]
  F --> G{Honoraires conformes décret?}
  G -->|≤500k hab| H[Max ½ mois côté loc si applicable]
  G -->|Sinon| I[1 mois typique · répartition claire]
  H --> J[Bail + EDL entrée]
  I --> J
  J --> K{Bailleur en gestion?}
  K -->|Non| L[Pitch gestion attach]
  K -->|Oui| M((Suivi gestion §6))
  L --> M
```

### 5.2 Bailleur — mise en loc seule

```mermaid
flowchart TD
  A((Lead bailleur loc)) --> B[Visite bien + photos]
  B --> C[Mandat ML · honoraires]
  C --> D[Publish curated]
  D --> E[Visites · sélection]
  E --> F[Bail + EDL]
  F --> G[Commission mise en loc]
  G --> H{Attach gestion?}
  H -->|Oui| I[Mandat MG 8%]
  H -->|Non J+7| J[Relance gestion]
  J --> H
  I --> K((Parcours Gestion))
```

---

## 6. Parcours **Gestion locative** — Ousmane / Ibrahima

```mermaid
flowchart TD
  A((Lead gestion / post-loc)) --> B[Audit : bail / locataire / fonds]
  B --> C{Reprise OK?}
  C -->|Rouge fraude| Z((NO-GO / signalement))
  C -->|Oui| D[Mandat MG 12 mois · pouvoirs]
  D --> E[Encaissement traçable Wave/OM société]
  E --> F[Quittances + reporting mensuel]
  F --> G{Impayé / incident?}
  G -->|Oui| H[Relances amiables]
  H --> I{Régularisé?}
  I -->|Non| J[Escalade GER · huissier partenaire]
  I -->|Oui| F
  G -->|Non| K[Reversement bailleur sous X j]
  K --> F
  F --> L{Échéance / résiliation?}
  L -->|Renouvellement| D
  L -->|Fin| M[Solde · cautions · archive]
  M --> N((Clos mandat))
```

**Diaspora Ibrahima :** reporting renforcé (9–10 % ou forfait) · pas de cousin cash.

---

## 7. Sous-process **Diligence** (transverse)

*Réf. anti-fraude `02` · foncier `06` · Pack Sécuriser V2.*

```mermaid
flowchart TD
  A[[Entrée diligence]] --> B[Collecte pièces + ID vendeur]
  B --> C[Régime : TF / bail / délibération]
  C --> D[EDR Conservation via OD/partenaire]
  D --> E[NICAD / plan / visite concordance]
  E --> F[Occupation + zone DGSCOS?]
  F --> G{Red flags?}
  G -->|≥1 rouge| R[NO-GO]
  G -->|≥2 orange| O[Suspendre]
  O --> B
  G -->|OK / 1 orange traité| H[Notaire choisi]
  H --> I[Circuit fonds = séquestre]
  I --> J{POA?}
  J -->|Oui| K[POA limitée · doc 06]
  J -->|Non| L[Verdict]
  K --> L
  L --> M{GO / GO_cond / NO-GO}
  M -->|GO| N[[Retour parcours parent]]
  M -->|GO_cond| P[Liste conditions · bornage?]
  P --> M
  M -->|NO-GO| R
  R --> Q((Retrait / refus paiement))
```

| Qui | Rôle |
| --- | --- |
| AC | Spotter · collecter · freiner client |
| OD | EDR · partenaires · tracker |
| GER | A sur verdict sensible |
| Formalités / notaire / géomètre | Exécution |

---

## 8. Sous-process **Apport partenaire**

```mermaid
flowchart TD
  A[[Besoin add-on]] --> B{Convention CP live?}
  B -->|Non| X((STOP — GER signe d’abord))
  B -->|Oui| C[PartnerLead CRM + brief]
  C --> D[Intro WA · SLA 48 h]
  D --> E{Rappel &lt; 48 h?}
  E -->|Non| F[Ping OD · watch SLA]
  F --> E
  E -->|Oui| G[Devis / mission partenaire]
  G --> H{Client signe partenaire?}
  H -->|Non| I[Statut lost]
  H -->|Oui| J[Déclencheur Annexe A]
  J --> K[CommissionEvent · facture hub]
  K --> L((Paid))
```

---

## 9. Parcours **Terrain → Maison** (post-closing Mamadou)

```mermaid
flowchart TD
  A((Post-acte terrain)) --> B[Simu construction à jour]
  B --> C{Budget &gt; ~30 M?}
  C -->|Oui| D[Intro Archi]
  C -->|Non| E[Intro Constructeur / plans types]
  D --> E
  E --> F{AC / titre OK pour chantier?}
  F -->|Non| G[Formalités / disclaimer]
  G --> F
  F -->|Oui| H[Contrat travaux client↔BTP]
  H --> I[Acompte → commission hub]
  I --> J[Suivi léger / inspection option]
  J --> K((Livraison · upsell confort V6))
```

---

## 10. Carte parcours × persona × vague

| ID | Parcours | Persona | Vague min | Bundle |
| --- | --- | --- | ---: | --- |
| P0 | Router | Tous | V0 | Agence Live |
| P1 | Vendeur | Marième | V0 | Vendre Mieux (V5) |
| P2 | Acquéreur | Mamadou · JP | V1 | Décider + Sécuriser |
| P3 | Diaspora | Fatou · Ibrahima | V2/V4 | Diaspora Secure |
| P4 | Location | Aïssatou · bailleur | V0/V3 | Louer & Gérer |
| P5 | Gestion | Ousmane · Ibrahima | V3 | Louer & Gérer |
| P6 | Diligence | Transverse | V2 | Sécuriser |
| P7 | Apport | Transverse | V1 | Partner-led |
| P8 | Terrain→Maison | Mamadou | V1+ | Soft pack |

```mermaid
flowchart LR
  subgraph Supply
    P1[Vendeur]
  end
  subgraph Demand
    P2[Acquéreur]
    P3[Diaspora]
    P4[Locataire]
  end
  subgraph Recurring
    P5[Gestion]
  end
  P1 -->|stock curated| P2
  P1 --> P3
  P4 -->|attach| P5
  P2 -->|post-acte| P8[Terrain→Maison]
  P3 -->|locatif| P5
  P2 -.-> P6[Diligence]
  P3 -.-> P6
  P8 -.-> P7[Apport]
  P2 -.-> P7
```

---

## 11. Stages CRM unifiés (proposition Y1)

| Stage | Libellé | Parcours typiques |
| --- | --- | --- |
| `new` | Lead entrant | Tous |
| `qualified` | Intent + budget | Tous |
| `appointment` | RDV / visite calée | P1–P4 |
| `proposal` | Estimation / offre / simu | P1–P3 |
| `mandate` | Mandat signé | P1, P4b, P5 |
| `diligence` | Vérif en cours | P2, P3, P6 |
| `negotiation` | Offre / contre | P1–P3 |
| `notary` | Séquestre / acte | P1–P3 |
| `won` | Encaissé | Tous $ |
| `nurture` | Pause active | Tous |
| `lost` | Clos négatif | Tous |

**PartnerLead stages :** `sent` → `recalled` → `quoted` → `signed` → `commission_due` → `paid`.

---

## 12. Temps cibles (ordres de grandeur)

| Transition | Cible hub |
| --- | --- |
| Lead → 1ʳᵉ réponse humaine | &lt; 24 h (5 h chaud) |
| Qualif → RDV visite | &lt; 72 h |
| Estimation → mandat (chaud) | &lt; 7 j |
| Offre → diligence lancée | &lt; 48 h |
| Rappel partenaire | &lt; 48 h |
| Diligence EDR (si pièces OK) | jours–semaines (external) |
| Compromis/offre → acte SN | semaines–mois (notaire) |

*Ne pas promettre des délais État (mutation, AC) irréalistes.*

---

## 13. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`02-analyse-demande.md`](../etude-de-marche/02-analyse-demande.md) | 7 personas |
| [`hub-roadmap.md`](../../docs/hub-roadmap.md) | 1 parcours / vague |
| [`03-packs-et-bundles.md`](../offre-et-tarifs/03-packs-et-bundles.md) | Bundles outcome |
| [`03-manuel-agent.md`](./03-manuel-agent.md) | Actions terrain |
| [`02-politique-anti-fraude.md`](../risques-conformite/02-politique-anti-fraude.md) | Gates diligence |
| [`06-parcours-foncier-securite.md`](../etude-de-marche/06-parcours-foncier-securite.md) | Checklist EDR |

### Externes

| Source | Insight |
| --- | --- |
| Maline — pipeline mandats | 7 étapes détection → compromis · critères de passage |
| MyAfric — achat SN / diaspora | 8–10 étapes · séparation des rôles · séquestre |
| SenPages / DGID circuit terrain | EDR → notaire → mutation = propriété |
| ImmoLudivine — 7 étapes diaspora 2026 | Notaire choisi · POA · pas de Wave |
| Paperasse workflow vente (FR analogie) | Phases avant-contrat → acte (adapter SN) |

---

*Process par parcours v1.0 — sept. 2026. Mermaid viewable GitHub / Notion. Prochain : `05-checklists-ops.md`.*
