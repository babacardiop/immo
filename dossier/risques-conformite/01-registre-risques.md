# Registre des risques — Matrice impact × probabilité

**Document :** Dossier · Risques & conformité · 01  
**Statut :** v1.0 — sept. 2026  
**Périmètre :** risques **entreprise hub** (stratégie, ops, juridique, finance, réputation, RH, tech) — pas DUERP santé/sécurité exhaustif (à faire RH séparément)  
**Amont :** [`../etude-de-marche/04-pestel.md`](../etude-de-marche/04-pestel.md) · [`../etude-de-marche/06-parcours-foncier-securite.md`](../etude-de-marche/06-parcours-foncier-securite.md) · [`../modele-economique/10-scenarios.md`](../modele-economique/10-scenarios.md) · [`../modele-economique/03-business-plan.md`](../modele-economique/03-business-plan.md) §13  
**Aval :** [`02-politique-anti-fraude.md`](./02-politique-anti-fraude.md) · [`03-conformite-agence.md`](./03-conformite-agence.md) · revue trimestrielle GER

---

## 0. Synthèse — top risques résiduels Y1

| Rang | ID | Risque | Score P×I | Owner |
| ---: | --- | --- | ---: | --- |
| 1 | **F01** | Creux trésorerie / rupture cash Y1 | **20** | GER |
| 2 | **J01** | Fraude / faux titre / Wave vendeur (client ou interne) | **20** | GER / OD |
| 3 | **R01** | Scandale réputation (arnaque associée / DGSCOS) | **16** | GER |
| 4 | **C01** | Retard / absence carte pro · garantie · RC | **16** | GER |
| 5 | **O01** | Pipeline exclusifs insuffisant (sous-rampe) | **16** | GER / AC |
| 6 | **O02** | Fuite mandats / livre agents | **12** | GER |
| 7 | **J02** | Litige post-vente (papier / zone) | **12** | GER / OD |
| 8 | **P01** | Partenaire P0 défaillant (SLA / qualité) | **12** | GER / OD |

**Règle :** tout risque score **≥ 15** = plan d’action daté + indicateur de suivi mensuel.

---

## 1. Méthode de cotation

### 1.1 Échelles (1–5)

| Note | **Probabilité (P)** | **Impact (I)** |
| ---: | --- | --- |
| **1** | Rare (&lt; 5 % / an) | Négligeable (&lt; 1 M FCFA · 0 jour arrêt) |
| **2** | Peu probable | Faible (1–5 M · friction locale) |
| **3** | Possible | Moyen (5–15 M **ou** 2–4 sem. retard GTM) |
| **4** | Probable | Élevé (15–40 M **ou** perte licence / gros litige) |
| **5** | Quasi certain / structurel | Critique (faillite · retrait agrément · scrape marque) |

### 1.2 Score & priorité

```
Score = P × I   (max 25)
```

| Score | Niveau | Couleur | Traitement |
| ---: | --- | --- | --- |
| **1–4** | Faible | 🟢 | Accepter / surveiller |
| **5–9** | Modéré | 🟡 | Mitiger si faible coût |
| **10–14** | Élevé | 🟠 | Plan d’action obligatoire |
| **15–25** | Critique | 🔴 | Priorité COMEX · owner nommé · KPI |

### 1.3 Matrice visuelle

```
I\P     1    2    3    4    5
 5     5   10   15   20   25
 4     4    8   12   16   20
 3     3    6    9   12   15
 2     2    4    6    8   10
 1     1    2    3    4    5
```

**Risque résiduel** = après contrôles en place (colonne « Résiduel » du registre).  
Revue : **trimestrielle** + à chaque incident grave / changement vague / cash &lt; 10 M.

*Méthode alignée pratique matrice P×G (Klaxoon / FloQast) + cartographie par catégories (Glyphe LCB-FT adaptée métier immo).*

---

## 2. Catégories

| Code | Catégorie | Exemples hub |
| --- | --- | --- |
| **F** | Finance / trésorerie | Cash, CAC, apport non libéré |
| **C** | Conformité / légal agence | Carte, garantie, RC, mentions |
| **J** | Juridique / foncier / fraude | Titres, DGSCOS, Wave, litiges |
| **O** | Opérations / commercial | Pipeline, exclusifs, SLA, gestion |
| **P** | Partenaires / supply chain | BTP, notaire, inspecteur |
| **R** | Réputation / marché | Médias, avis, contagion arnaques |
| **H** | Humain / RH | Fuite talent, sécurité visites |
| **T** | Tech / data / cyber | Site, CRM, paiements |
| **M** | Macro / PESTEL | Choc demande, loyers, inondation |
| **S** | Stratégie / produit | Dispersion 52 specs, pivot |

---

## 3. Registre détaillé (Y1)

Légende colonnes : **P/I** = inhérent · **Ctrl** = contrôles existants / prévus · **Pr/Ir** = résiduel · **Score** = Pr×Ir

### 3.1 Finance (F)

| ID | Risque | P | I | Ctrl principaux | Pr | Ir | Score | Owner | Statut |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: | --- | --- |
| **F01** | Creux trésorerie / rupture (&lt; 6 M) | 4 | 5 | Apport 30–40 M · plan `07` · stop paid · PESS `10` | 3 | 5 | **15→20*** | GER | 🔴 Actif |
| **F02** | Apport / love money non libéré à temps | 3 | 5 | Libération **avant** capex Vague 0 | 2 | 5 | **10** | GER | 🟠 |
| **F03** | Sous-rampe closings (−30 %) | 3 | 4 | Exclusifs · farming Z1 · scorecard `08` | 3 | 4 | **12** | GER/AC | 🟠 |
| **F04** | CAC paid &gt; LTV (burn ads) | 3 | 3 | Kill &lt; 3:1 · plafonds 200→400 k | 2 | 3 | **6** | GER | 🟡 |
| **F05** | Impayés locataires / mauvaise gestion fonds | 3 | 4 | Mandats écrits · comptes séparés · relances | 2 | 4 | **8** | OD/GER | 🟡 |
| **F06** | Commission non encaissée / litige honoraires | 2 | 3 | Mandat clair FAI · facture | 2 | 3 | **6** | GER | 🟡 |

\*F01 : résiduel reste **élevé** tant que Y1 = cash-flow irrégulier — buffer = mitigation principale.

### 3.2 Conformité agence (C)

| ID | Risque | P | I | Ctrl | Pr | Ir | Score | Owner | Statut |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: | --- | --- |
| **C01** | Retard / absence carte · garantie · RC | 3 | 5 | Path J-60 · budget 2,5 M · avocat | 2 | 5 | **10→16*** | GER | 🔴 |
| **C02** | Mentions légales / honoraires non conformes | 3 | 3 | Grille `02` · modèles mandat avocat | 2 | 3 | **6** | GER | 🟡 |
| **C03** | Non-respect décret loyers / plafonds (si applicable) | 2 | 3 | Veille · transparence mandat | 2 | 3 | **6** | GER | 🟡 |
| **C04** | Exercice hors objet / promotion foncière accidentelle | 2 | 4 | Covenant objet social · pas de stock propre Y1 | 1 | 4 | **4** | GER | 🟢 |

\*C01 inhérent élevé si path pas lancé ; baisser Pr dès dossier déposé.

### 3.3 Juridique / fraude / foncier (J)

| ID | Risque | P | I | Ctrl | Pr | Ir | Score | Owner | Statut |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: | --- | --- |
| **J01** | Client paie Wave vendeur / faux titre (hub associé) | 4 | 5 | Culture `06` · séquestre · diligence V2 · `02` anti-fraude | 3 | 5 | **15** | GER/OD | 🔴 |
| **J02** | Litige post-closing (papier / zone DGSCOS) | 3 | 4 | Facets papier · go/no-go · disclaimers · no-go zones `02` | 2 | 4 | **8→12** | OD | 🟠 |
| **J03** | Publication délibération comme TF | 2 | 5 | Champ type droit · phrases interdites · sanction AC | 1 | 5 | **5** | GER | 🟡 |
| **J04** | Contentieux occupation / Arrêt Dscos sur bien catalogue | 3 | 4 | Veille zones · diligence · refus boost | 2 | 4 | **8** | OD | 🟡 |
| **J05** | Fraude interne (détournement loyers / leads) | 2 | 5 | CRM société · double regard · comptes séparés | 1 | 5 | **5** | GER | 🟡 |
| **J06** | KYC / fonds suspects (diaspora / cash) | 2 | 4 | Notaire · traçabilité · refus opaque | 2 | 4 | **8** | GER | 🟡 |

→ Détail process : [`02-politique-anti-fraude.md`](./02-politique-anti-fraude.md) · [`04-politique-papiers.md`](./04-politique-papiers.md).

### 3.4 Opérations / commercial (O)

| ID | Risque | P | I | Ctrl | Pr | Ir | Score | Owner | Statut |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: | --- | --- |
| **O01** | Stock exclusifs insuffisant | 4 | 4 | GTM · farming Z1 · politique `04` · KPI | 3 | 4 | **12** | AC/GER | 🟠 |
| **O02** | Fuite mandats (agent part avec livre) | 3 | 4 | CRM central · exclusifs écrits · culture | 2 | 4 | **8** | GER | 🟡 |
| **O03** | SLA WA &gt; 24 h → perte leads | 3 | 3 | Templates · scorecard · stop ads si rouge | 2 | 3 | **6** | AC | 🟡 |
| **O04** | Gestion : vacance / churn bailleurs | 3 | 3 | Attach ≥ 50 % · reporting · OD M7 | 2 | 3 | **6** | OD | 🟡 |
| **O05** | Multi-prix / open posting | 2 | 3 | Curated only · sync classifieds | 1 | 3 | **3** | AC | 🟢 |
| **O06** | Remises dump sous plancher | 3 | 3 | RACI gérant · politique commerciale | 2 | 3 | **6** | GER | 🟡 |

### 3.5 Partenaires (P)

| ID | Risque | P | I | Ctrl | Pr | Ir | Score | Owner | Statut |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: | --- | --- |
| **P01** | Partenaire P0 défaillant (rappel / qualité) | 3 | 4 | Convention · SLA 48 h · clause sortie · shortlist 2 | 2 | 4 | **8** | OD | 🟡 |
| **P02** | Litige client↔partenaire (chantier) | 3 | 4 | Contrat direct client–partenaire · hub = apport | 2 | 4 | **8** | GER | 🟡 |
| **P03** | Commission apport non payée / litige | 2 | 2 | Taux écrit · tracking OD | 2 | 2 | **4** | OD | 🟢 |

### 3.6 Réputation (R)

| ID | Risque | P | I | Ctrl | Pr | Ir | Score | Owner | Statut |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: | --- | --- |
| **R01** | Association médiatique à une arnaque / démolition | 3 | 5 | Diligence · disclaimers · com de crise | 2 | 5 | **10** | GER | 🟠 |
| **R02** | Avis négatifs / ghosting clients | 3 | 3 | SLA · process réclamation | 2 | 3 | **6** | AC/GER | 🟡 |
| **R03** | Contagion méfiance secteur (PESTEL) | 3 | 4 | Contenu anti-arnaque · preuves | 3 | 3 | **9** | CT/GER | 🟡 |

### 3.7 Humain / RH / sécurité (H)

| ID | Risque | P | I | Ctrl | Pr | Ir | Score | Owner | Statut |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: | --- | --- |
| **H01** | Visite terrain — agression / accident | 2 | 4 | Binôme zones sensibles · horaires · check-in | 2 | 3 | **6** | AC/GER | 🟡 |
| **H02** | Départ AC clé + fuite pipeline | 3 | 3 | CRM · clauses · split culture | 2 | 3 | **6** | GER | 🟡 |
| **H03** | Sous-performance AC (&lt; 6 closings/an) | 3 | 3 | Plan 90 j · fiches poste | 2 | 3 | **6** | GER | 🟡 |
| **H04** | Hire trop tôt vs cash | 3 | 3 | Gates `04` org · cash &lt; 8 M = stop | 2 | 3 | **6** | GER | 🟡 |

*Compléter avec évaluation risques pro (visites, route) type DUERP — hors scope détail ici.*

### 3.8 Tech / cyber (T)

| ID | Risque | P | I | Ctrl | Pr | Ir | Score | Owner | Statut |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: | --- | --- |
| **T01** | Site down Jour J / panne prolongée | 2 | 3 | Hébergeur · backup · MVP pages | 2 | 2 | **4** | Presta/GER | 🟢 |
| **T02** | Fuite données clients (WA / Drive) | 2 | 4 | Accès restreints · pas de Wave perso | 2 | 3 | **6** | GER | 🟡 |
| **T03** | Fraude paiement / phishing | 2 | 4 | 2FA · process fonds · formation | 1 | 4 | **4** | GER | 🟢 |
| **T04** | Perte CRM / pas de backup | 2 | 3 | Export hebdo · cloud | 1 | 3 | **3** | OD | 🟢 |

### 3.9 Macro / PESTEL (M)

| ID | Risque | P | I | Ctrl | Pr | Ir | Score | Owner | Statut |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: | --- | --- |
| **M01** | Choc macro / baisse transactions standing | 3 | 4 | Mix gestion · Z2 accession · buffer | 3 | 3 | **9** | GER | 🟡 |
| **M02** | Frein administratif foncier prolongé | 4 | 3 | Diligence realism · délais communiqués | 3 | 3 | **9** | OD | 🟡 |
| **M03** | Gel / pression loyers | 2 | 3 | Transparence · mix vente | 2 | 3 | **6** | GER | 🟡 |
| **M04** | Inondation / sinistre sur stock catalogue | 2 | 4 | Score risque zones · disclaimer · assurance client | 2 | 3 | **6** | OD | 🟡 |
| **M05** | Érosion / DPM littoral (Almadies–PC) | 2 | 3 | Diligence constructibilité | 2 | 3 | **6** | OD | 🟡 |

### 3.10 Stratégie / produit (S)

| ID | Risque | P | I | Ctrl | Pr | Ir | Score | Owner | Statut |
| --- | --- | ---: | ---: | --- | ---: | ---: | ---: | --- | --- |
| **S01** | Dispersion produit (52 add-ons) | 4 | 3 | Discipline vagues · max 8–12 ouvertures | 2 | 3 | **6** | GER | 🟡 |
| **S02** | Lancer V8 avant preuves V1–V4 | 2 | 3 | Gates KPI `04` | 1 | 3 | **3** | GER | 🟢 |
| **S03** | Positionnement marketplace par erreur | 2 | 4 | Curated only · com marque | 1 | 4 | **4** | GER/CT | 🟢 |

---

## 4. Heatmap — placement des risques majeurs

|  | P2 | P3 | P4 |
| --- | --- | --- | --- |
| **I5** | J05, C04… | **J01**, **C01**, **R01** | **F01** |
| **I4** | J03… | **F03**, **O01**, **J02**, **P01** | — |
| **I3** | … | F04, O03, M01… | S01 |

---

## 5. Plans d’action prioritaires (score ≥ 12 ou 🔴)

| ID | Action concrète | Échéance | KPI suivi | Budget / effort |
| --- | --- | --- | --- | --- |
| **F01** | Apport ≥ 30 M (idéal 35–40) avant capex · règles cash `07` · revue hebdo cash | Avant Jour J | Cash ≥ 6 M | Structurant |
| **J01** | Politique anti-fraude live · script « pas de Wave vendeur » · séquestre V4 | V0–V2 | 0 incident Wave | Contenu + process |
| **C01** | Dossier carte/garantie/RC déposé | J-60 | Statut dossier | ~2,5 M setup |
| **R01** | Process com crise 1 page · diligence avant publish | V0 | 0 bien no-go publié | Temps GER |
| **O01** | Farming Z1 · exclusif d’abord · scorecard lundi | Continu | ≥ 6 exclusifs @ M6 | Temps AC |
| **F03** | Triggers PESS · stop paid · focus exclusifs | Si 2 mois &lt; 1 closing | Closings / mois | Opex discipline |
| **J02** | Pack Sécuriser · % go/no-go ≥ 70 % terrains | V2 | Diligence n | Packs |
| **O02** | CRM obligatoire · clause départ · exclusifs écrits | V0 | 100 % leads CRM | Process |

---

## 6. Indicateurs d’alerte précoce (liens scorecard)

| Risque | Leading indicator | Seuil |
| --- | --- | --- |
| F01 | Cash fin semaine | &lt; 8 M jaune · &lt; 6 M rouge |
| O01 | Exclusifs actifs | &lt; 4 |
| O03 / F04 | SLA WA · LTV:CAC paid | &lt; 75 % · &lt; 3:1 |
| J01 | Tentatives paiement direct signalées | ≥ 1 = revue dossier |
| P01 | % partenaires &lt; 48 h | &lt; 80 % |
| C01 | Jours sans carte après ouverture | &gt; 90 j = escalade associés |

Source ops : [`../plan-commercial/08-growth-scorecard.md`](../plan-commercial/08-growth-scorecard.md).

---

## 7. Gouvernance du registre

| Qui | Quoi |
| --- | --- |
| **GER** | Owner registre · A sur risques 🔴 |
| **OD** | J / P fonciers · suivi diligence |
| **AC** | Signale incidents terrain / Wave / multi-prix |
| **CT** | Pas de com qui augmente R01 |
| **Associés** | Informés score ≥ 15 · décisions apport / crise |
| **Avocat / EC** | C01 · mandats · fonds clients |

| Cadence | Contenu |
| --- | --- |
| **Mensuel** (point cash) | F01 + incidents nouveaux |
| **Trimestriel** | Recotation P/I · clôture / ouverture risques |
| **Ad hoc** | Incident grave sous **24 h** interne |

**Statuts :** Actif · Surveillé · Mitigé · Clos · Accepté (avec justification).

---

## 8. Appétit au risque (déclaration Y1)

| On accepte | On n’accepte pas |
| --- | --- |
| EBITDA Y1 ~0 si buffer OK | Exercer sans path conformité |
| Mandat simple exceptionnel (CAC≈0) | Dump sous plancher systémique |
| Petite Côte volume faible | Open posting / fake listings |
| Partner risk résiduel avec clause | Wave vendeur « pour aller vite » |
| Paid test limité | Scale ads si LTV:CAC &lt; 3:1 |

---

## 9. Lien documents aval

| Risque famille | Doc |
| --- | --- |
| Fraude / diaspora / red flags | [`02-politique-anti-fraude.md`](./02-politique-anti-fraude.md) |
| Carte · mentions · loyers | [`03-conformite-agence.md`](./03-conformite-agence.md) |
| TF / bail / délibération catalogue | [`04-politique-papiers.md`](./04-politique-papiers.md) |
| RC pro · limites | [`05-assurance-et-responsabilite.md`](./05-assurance-et-responsabilite.md) |

---

## 10. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`04-pestel.md`](../etude-de-marche/04-pestel.md) | Top 5 risques macro |
| [`06-parcours-foncier-securite.md`](../etude-de-marche/06-parcours-foncier-securite.md) | DGSCOS · faux titres |
| [`03-business-plan.md`](../modele-economique/03-business-plan.md) §13 | Table risques BP |
| [`10-scenarios.md`](../modele-economique/10-scenarios.md) | PESS cash · triggers |
| [`06-culture-et-sla.md`](../organisation/06-culture-et-sla.md) | Éthique papiers |
| Plan commercial `02`/`08` | Zones no-go · alertes |

### Externes

| Source | Insight |
| --- | --- |
| Klaxoon / FloQast — matrice risques | P×I · priorisation · RCM vivant |
| Glyphe — cartographie risques | Catégories · risque résiduel · mise à jour |
| DUERP agence immo (FR) | Visites · route · RPS — inspirer volet H (adapter droit SN) |

**Avertissement :** registre = **outil de pilotage business**. Il ne remplace pas l’avis avocat / assureur / obligations locales santé-sécurité.

---

*Registre risques v1.0 — sept. 2026. Prochain : `02-politique-anti-fraude.md`.*
