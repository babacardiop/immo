# Matrice RACI métier

**Document :** Dossier · Organisation · 07  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01`](./01-organigramme.md) · [`02`](./02-fiches-de-poste.md) · [`03`](./03-gouvernance-societe.md) · [`06`](./06-culture-et-sla.md)  
**Usage :** onboarding, arbitrages « qui décide ? », rituels hebdo

---

## 0. Légende

| Code | Anglais | Français | Signifie |
| --- | --- | --- | --- |
| **R** | Responsible | **Réalisateur** | Fait le travail |
| **A** | Accountable | **Approbateur** | Décide / rend des comptes — **un seul A par ligne** |
| **C** | Consulted | **Consulté** | Donne un avis avant (bidirectionnel) |
| **I** | Informed | **Informé** | Est tenu au courant après (unidirectionnel) |

### Acteurs (colonnes)

| Abrév. | Rôle |
| --- | --- |
| **GER** | Gérant / DG |
| **AC** | Agent commercial |
| **OD** | Ops / diligence (Y1 ; gestion early) |
| **GL** | Gestionnaire locatif (**Y2+** ; avant = OD) |
| **CT** | Contenu / SEO |
| **TECH** | Presta tech / studio |
| **ASS** | Associés (AGO / AGE) |
| **PART** | Partenaire (constructeur, notaire, formalités…) |
| **EC** | Expert-comptable |

### Règles d’or (PME)

1. **Exactement un A** par ligne.  
2. **Au moins un R** par ligne.  
3. Peu de **C** (éviter le comité permanent).  
4. Fonctions, pas prénoms — l’org bouge.  
5. Y1 lean : si OD pas encore embauché, **GER** ou **AC** absorbe le R (voir notes).

*Méthode : Competentia / Manager-Go / Business Scalability — RACI courte sur décisions critiques.*

---

## 1. Vue d’ensemble — qui est souvent A ?

| Domaine | **A** typique |
| --- | --- |
| Stratégie, licence, cash, partenaires stratégiques | **GER** |
| Mandat / closing volume | **GER** (A) · **AC** (R) |
| Diligence foncière / éthique papiers | **GER** (A) · **OD** (R) |
| Gestion locative | **GER** (A) · **GL/OD** (R) |
| Contenu sensible (juridique) | **GER** (A) · **CT** (R) |
| Spec vague produit | **GER** (A=PO) · **TECH** (R build) |
| Embauche hors plan, dette, capital | **ASS** |

---

## 2. Commercial & transaction

| Activité | GER | AC | OD | GL | CT | TECH | ASS | PART |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Prospection mandats | C | **R** | I | | I | | | |
| Estimation prix | C | **R** | | | | | | |
| Signature **mandat exclusif** | **A** | **R** | I | | | I | | |
| Mandat simple (dérogation) | **A** | R | I | | | | | |
| Saisie CRM / annonce curated | I | **R** | **A***/C | | C | C | | |
| Réponse lead WA &lt; 24 h | **A** | **R** | C | | | | | |
| Organisation visites | I | **R/A*** | | | | | | |
| Négociation offre | C | **R** | | | | | | |
| Closing ticket standard | **A** | **R** | C | | | | | I |
| Closing **gros ticket / diaspora** | **A/R** | C | C | | | | I | C |
| % commission &lt; 5 % exclusif | **A** | R | | | | | I | |
| Attribution split co-deal | **A** | R | I | | | | | |

\*Annonce curated : **A** = GER jusqu’à OD en poste, puis OD garantit qualité fiche.  
\*\*Visites : AC est A opérationnel du créneau ; GER A si litige / sécurité.

---

## 3. Diligence & éthique papiers

| Activité | GER | AC | OD | GL | CT | TECH | ASS | PART |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Renseigner type de papier sur fiche | I | **R** | **A** | | | C | | |
| Brief client délibération ≠ TF | C | **R** | **A** | | C | | | |
| Lancer checklist diligence | C | C | **R** | | | | | C |
| Go/No-go commercialisation terrain &gt; seuil | **A** | C | **R** | | | | | C |
| Choisir partenaire formalités / géomètre | **A** | I | **R** | | | | | C |
| Livrable diligence (rapport) | I | I | **A** | | | | | **R** |
| Incident / doute papiers | **A** | R | **R** | | I | | I | C |
| Disclaimer catalogue | **A** | I | C | | **R** | R | | |

Avant M7 : **R** diligence = GER (+ AC) ; OD colonne inactive.

---

## 4. Partenaires & apports

| Activité | GER | AC | OD | GL | CT | TECH | ASS | PART |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Signature convention partenaire | **A/R** | I | C | | | | I | C |
| Envoi lead qualifié partenaire | I | C | **R** | | I | | | **A***/I |
| Tracker SLA rappel &lt; 48 h | I | I | **R/A** | | | | | R |
| Facturation commission apport | **A** | I | **R** | | | | | C |
| Retrait partenaire (clause sortie) | **A** | I | R | | | | I | I |
| Contenu CTA partenaire | C | I | C | | **R** | | | I |

\*Le partenaire est **A** de *son* rappel client ; le hub est **A** du tracking (OD).

---

## 5. Gestion locative

| Activité | GER | AC | OD | GL | CT | TECH | ASS | PART |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Prise mandat de gestion | **A** | **R** | C | **R*** | | | | |
| Sélection locataire / bail | C | C | R† | **R/A*** | | | | |
| États des lieux | I | C | R† | **R** | | | | |
| Quittancement / Wave-OM | **A** | I | R† | **R** | | C | | |
| Relances impayés | **A** | I | C | **R** | | | | C |
| Reporting bailleur | I | I | C | **R/A** | | | | |
| Upsell gestion post-location | I | **R** | C | C | | | | |
| Honoraires &lt; 7 % | **A** | R | | C | | | I | |

\*Y2+ GL porte le R/A ops ; †Y1 = OD.  
GER reste **A** cash / conformité fonds clients.

---

## 6. Contenu, SEO & marque

| Activité | GER | AC | OD | GL | CT | TECH | ASS | PART |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Calendrier éditorial | **A** | I | C | | **R** | | | |
| Rédaction article / guide | C | I | **C** | | **R** | | | |
| Publish sujet **foncier sensible** | **A** | I | **C** | | **R** | | | |
| Publish sujet soft (quartier, tips) | I | I | | | **R/A** | | | |
| CTA outil / partenaire sur contenu | C | I | C | | **R** | C | | I |
| Templates WA / share agents | **A** | C | C | | **R** | | | |
| Paid ads budget | **A/R** | I | | | C | | I | |

CT n’est **A** que sur contenus non juridiques ; sinon GER valide.

---

## 7. Produit digital & tech

| Activité | GER | AC | OD | GL | CT | TECH | ASS | PART |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Priorisation backlog vague | **A/R** (PO) | C | C | C | C | C | I | |
| Build feature (code) | A | I | I | | I | **R** | | |
| Recette / Go-live vague | **A** | C | C | | C | **R** | I | |
| Portail agent (droits) | **A** | C | C | | | **R** | | |
| Incident site / downtime | **A** | I | I | | I | **R** | | |
| Capex tech non budgété &gt; 2 M | C | | | | | R | **A** | |

---

## 8. RH & recrutement

| Activité | GER | AC | OD | GL | CT | TECH | ASS | PART |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Ouvrir poste (plan `04`) | **A/R** | I | I | | I | | I | |
| Embauche hors plan | R | | | | | | **A** | |
| Entretien / essai terrain | **A** | C | C | | C | | | |
| Offre salariale (grille `05`) | **A/R** | | | | | | I | |
| Onboarding culture `06` | **A** | R* | R* | R* | R* | | | |
| Plan 90 j sous-perf agent | **A** | R | I | | | | I | |
| Gel hires cash &lt; 8 M | **A/R** | I | I | | I | | I | |

\*Le nouvel arrivant réalise sa checklist ; GER Approuve la complétion.

---

## 9. Finance, conformité, gouvernance

| Activité | GER | AC | OD | GL | CT | TECH | **ASS** | EC |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Trésorerie quotidienne | **A/R** | | C | | | | I | C |
| Dépense &lt; 2 M | **A/R** | | | | | | I | |
| Dépense / contrat ≥ 2 M | R | | | | | | **A** | C |
| Facturation commissions | **A** | C | **R** | | | | | C |
| Paie / déclarations | **A** | | | | | | I | **R** |
| Carte pro / garantie / RC | **A/R** | I | C | | | | I | C |
| Comptes annuels / AGO | R | | | | | | **A** | **R** |
| Dividendes | | | | | | | **A** | C |
| Crédit / FONGIP | R | | | | | | **A** | C |
| Achat foncier stock | | | | | | | **A** | |
| Augmentation capital | | | | | | | **A** | C |

Aligné matrice décisions [`03`](./03-gouvernance-societe.md) §4.

---

## 10. SLA & incidents (culture)

| Activité | GER | AC | OD | GL | CT |
| --- | :---: | :---: | :---: | :---: | :---: |
| Tenue FRT &lt; 24 h | **A** | **R** | C | C | |
| Escalade lead &gt; 12 h | **A/R** | R | I | | |
| Revue hebdo SLA | **A/R** | C | C | | I |
| MAJ templates WA | **A** | C | C | | **R** |
| Sanction éthique papiers | **A** | I | C | | I |

---

## 11. RACI condensé Y1 (une page ops)

Périmètre lean : **GER · AC · OD · CT** (GL = OD ; TECH/ASS hors tableau daily).

| Process critique | R | A | C | I |
| --- | --- | --- | --- | --- |
| Mandat exclusif | AC | **GER** | — | OD, CT |
| Lead → 1ʳᵉ réponse WA | AC | **GER** | — | — |
| Closing standard | AC | **GER** | OD | — |
| Diligence terrain | OD* | **GER** | AC, PART | CT |
| Lead → partenaire | OD* | **GER** | AC | CT, PART |
| Bail / quittance early | OD* | **GER** | AC | — |
| Article foncier | CT | **GER** | OD | AC |
| Vague produit Done | TECH | **GER** | AC, OD, CT | ASS |
| Embauche planifiée | GER | **GER** | — | ASS |
| Cash &lt; 8 M → gel | GER | **GER** | — | tous |

\*Avant M7 : R = **GER** (ou AC pour admin léger).

```
                    A = presque toujours GER en Y1
                    R = AC (terrain) | OD (dossiers) | CT (contenu) | TECH (build)
                    C = sparingly
                    I = CRM / standup
```

---

## 12. Anti-patterns à éviter

| Erreur | Effet | Fix |
| --- | --- | --- |
| Deux **A** sur une ligne | Personne ne tranche | Un seul A |
| Tout le monde en **C** | Réunions infinies | Max 1–2 C |
| Ligne sans **R** | Tâche orpheline | Nommer un faiseur |
| Agent **A** sur éthique papiers | Risque juridique | A = GER |
| Partenaire **A** sur convention | Hub perd le contrôle | A = GER |
| RACI de 80 lignes | Mort-née | Garder critiques (§2–10) |

---

## 13. Comment utiliser au quotidien

1. **Conflit « qui décide ? »** → chercher la ligne → colonne **A**.  
2. **Nouveau process** → ajouter une ligne (pas une réunion).  
3. **Onboarding** → faire lire §11 + domaine du poste.  
4. **Revue trimestrielle** → ajuster si GL / AC3 embauchés.  
5. **Ne pas** remplacer le Code du travail / statuts — RACI = ops, `03` = juridique.

---

## 14. Sources

### Internes

- [`01-organigramme.md`](./01-organigramme.md) — pôles  
- [`02-fiches-de-poste.md`](./02-fiches-de-poste.md) §5 — extrait F/D/C/I  
- [`03-gouvernance-societe.md`](./03-gouvernance-societe.md) — AGO/AGE  
- [`06-culture-et-sla.md`](./06-culture-et-sla.md) — SLA & papiers  
- [`04`](./04-plan-recrutement.md) · [`05`](./05-plan-recrutement-salaires.md) — RH  

### Externes

| Source | Usage |
| --- | --- |
| Competentia — fiche RACI | R/A/C/I · un seul A · ≥1 R |
| Manager-Go — guide RACI | Définitions FR |
| Business Scalability / Manufacture des équipes — RACI PME | Court, décisions critiques, erreurs C excessifs |

---

*Matrice RACI v1.0 — sept. 2026. Pack organisation `01`→`07` complet.*
