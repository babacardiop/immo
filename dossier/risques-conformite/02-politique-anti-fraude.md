# Politique anti-fraude — Diligence, red flags, diaspora

**Document :** Dossier · Risques & conformité · 02  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-registre-risques.md`](./01-registre-risques.md) (J01/J02) · [`../etude-de-marche/06-parcours-foncier-securite.md`](../etude-de-marche/06-parcours-foncier-securite.md) · [`../organisation/06-culture-et-sla.md`](../organisation/06-culture-et-sla.md) · [`../../docs/add-ons/specs/02-terrain-construction/08-due-diligence-fonciere.md`](../../docs/add-ons/specs/02-terrain-construction/08-due-diligence-fonciere.md)  
**Aval :** [`04-politique-papiers.md`](./04-politique-papiers.md) · formation AC/OD · Pack Sécuriser / Diaspora Secure

---

## 0. Synthèse — règles non négociables

| # | Règle |
| --- | --- |
| **1** | **Aucun** paiement Wave / OM / Western Union **direct au vendeur** sur conseil hub |
| **2** | Fonds acquéreur → **séquestre / compte notaire** (ou protocole écrit équivalent) |
| **3** | **Séparation des rôles** diaspora : présentateur ≠ vérificateur ≠ détenteur des fonds |
| **4** | Délibération ≠ TF — **jamais** présentée comme titre de vente |
| **5** | **EDR** (état des droits réels) / vérification Conservation **avant** engagement sérieux |
| **6** | **2 red flags** = frein immédiat jusqu’à clarification (MyAfric) |
| **7** | Incident fraude / tentative → déclaration interne **&lt; 24 h** (zéro couverture) |
| **8** | Agent qui contourne = faute grave (split / contrat) |

**Promesse client :** *Avant de payer, on vérifie. Ensuite on gère.*

---

## 1. Périmètre & objectifs

| Couvre | Ne couvre pas |
| --- | --- |
| Fraude transactionnelle (faux titres, double vente, Wave) | Conseil fiscal / LCB-FT bancaire exhaustif |
| Diligence avant mandat / closing | Écriture dans le Livre foncier (Conservation) |
| Protection diaspora & primo | Garantie résultat judiciaire |
| Fraude **interne** (loyers, leads) | DUERP santé-sécurité |

**Risques registre liés :** J01, J02, J03, J05, J06, R01 (`01`).

---

## 2. Typologie des fraudes (terrain SN)

| Type | Mode opératoire | Persona exposée |
| --- | --- | --- |
| **Faux TF / photocopie** | Doc WhatsApp, cachets flous, n° inexistant | Fatou, Mamadou |
| **Double / multi-vente** | Même parcelle à plusieurs ; course à l’inscription | Tous |
| **« Vente » sur délibération** | Présentée comme propriété | Mamadou, diaspora 1er bien |
| **Pression Wave** | « Paye maintenant sinon perdu » | Diaspora |
| **Cousin / intermédiaire unique** | Présente + vérifie + encaisse | Fatou, Ibrahima |
| **Tontine / groupe WA promo** | Épargne collective fantôme | Diaspora |
| **Faux site « officiel »** | URL .sn / pastiche État | Diaspora |
| **Bornage / occupation** | Limites ≠ plan ; tiers occupants « on va régler » | Tous |
| **Procurations en chaîne** | POA floue, prix non plafonné | Fatou |
| **Agence fantôme** | Pas NINEA/RCCM / &lt; 6 mois opaque | Tous |

Sources terrain : MyAfric, Investissement Immo Afrique, SenPages, Loger-Dakar, dossier `06`.

---

## 3. Catalogue de red flags

### 3.1 Niveau 🔴 — Stop transaction (no-go)

| # | Signal | Action hub |
| --- | --- | --- |
| R1 | Demande de paiement **Wave/OM/WU** au vendeur / agent perso | **Refus** + script §7 · escalade GER |
| R2 | Refus EDR / Conservation / notaire indépendant | **Stop** dossier |
| R3 | Délibération présentée comme **TF** / « c’est comme un titre » | Correction + disclaimer · sinon no-go publish |
| R4 | Zone **opération DGSCOS** active sans diligence | No-go catalogue (`02` zones) |
| R5 | Prix **−50 %** vs quartier sans explication documentée | Diligence lourde ou refus |
| R6 | Agent hub propose son Wave perso | **Faute grave** RH |
| R7 | Faux site institutionnel / « validation » online douteuse | Stop · vérifier canaux officiels |

### 3.2 Niveau 🟠 — Frein (2 signaux = stop)

| # | Signal |
| --- | --- |
| O1 | Uniquement photocopies / photos floues · pas d’original ni copie certifiée |
| O2 | Pression « autre acheteur aujourd’hui » |
| O3 | Titre « en cours de régularisation » depuis longtemps sans dossier |
| O4 | Chaîne de procurations opaque |
| O5 | Vendeur refuse contact direct du titulaire inscrit |
| O6 | Parcelle occupée · « on dégage avant signature » |
| O7 | Plan / bornage ≠ terrain visité |
| O8 | Intermédiaires multiples non contractuels |
| O9 | Multi-post classifieds à prix différents |
| O10 | TeleDAc / « TF en 48 h » promis |

**Règle MyAfric adaptée :** **1** orange = diligence renforcée · **≥ 2** orange = **suspendre** jusqu’à éclaircissement · combinaison rouge = **stop**.

### 3.3 Niveau 🟡 — Vigilance

| Signal | Traitement |
| --- | --- |
| Agence / promo &lt; 6 mois | Vérif NINEA/RCCM · prudence |
| Indivision / succession | Notaire · tous ayants droit |
| Littoral / DPM | Check constructibilité |
| Couronne inondable | Score risque + disclaimer |
| VEFA / promoteur | TF / quitus · pas de cash opaque |

---

## 4. Process diligence (parcours hub)

### 4.1 Quand déclencher

| Moment | Diligence mini |
| --- | --- |
| **Avant publish** terrain &gt; seuil Vague 2 | Type papier + disclaimer · EDR ou équiv. si policy |
| **Avant acompte / réservation** | Checklist §4.2 · frein si rouge |
| **Avant closing** | EDR récent · notaire · (géomètre si bornage) |
| **Diaspora remote** | Pack Secure / inspection + séquestre |
| **Reprise gestion** (Ibrahima) | Audit bail / locataire / fonds |

### 4.2 Checklist diligence pré-paiement (ordre)

```
1. Identité vendeur / capacité (tutelle, indivision)
2. Type de droit revendiqué (TF / bail / délibération / autre)
3. Références titre / NICAD si dispo
4. EDR Conservation (récent) — propriétaire, charges, oppositions
5. Concordance plan / visite / GPS
6. Occupation réelle + contentieux zone (DGSCOS / presse)
7. Notaire choisi (idéalement par l’acquéreur)
8. Circuit fonds = séquestre / banque notaire
9. Procuration (si diaspora) : limitée, datée, prix plafond
10. Verdict : GO / GO conditionnel / NO-GO  → CRM
```

Réf. technique add-on : `08-due-diligence-fonciere.md`.

### 4.3 Verdicts

| Verdict | Signification | Suite |
| --- | --- | --- |
| **GO** | Papier cohérent · EDR OK · pas de rouge | Closing possible |
| **GO conditionnel** | Points ouverts listés (bornage, indivision…) | Closing seulement si conditions levées |
| **NO-GO** | Rouge ou ≥ 2 orange non levés | Retrait catalogue / refus accompagnement paiement |

**Le hub n’écrit pas** dans le Livre foncier — on **lit** et on **oriente**.

### 4.4 Qui fait quoi (RACI résumé)

| Étape | AC | OD | GER | Partenaire |
| --- | :---: | :---: | :---: | :---: |
| Spotter red flags | R | C | A éthique | — |
| Collecte pièces | R | C | I | — |
| EDR / formalités | I | R | A | Formalités / notaire |
| Bornage | I | R | I | Géomètre |
| Décision GO/NO-GO sensible | C | R | **A** | — |
| Séquestre | I | C | A | Notaire |

---

## 5. Politique diaspora (Fatou / Ibrahima)

### 5.1 Quatre règles d’or

1. **Séparer les rôles** — même (surtout) si c’est un parent.  
2. **Choisir le notaire** soi-même · contact direct hub/client ↔ notaire.  
3. **Procuration** authentique, limitée parcelle / durée / prix plafond (apostille si besoin).  
4. **Constats pro** — inspection / géomètre · photos vendeur ≠ preuve.

### 5.2 Circuit fonds (obligatoire)

```
Client diaspora
  → Compte / séquestre NOTAIRE (ou protocole bancaire tracé)
  → Déblocage selon conditions (EDR, signature, etc.)
  ≠ Wave vendeur
  ≠ Compte perso agent
  ≠ « Cousin qui avance »
```

Script WA (`06` culture) :

```
Pour votre sécurité : aucun paiement Wave/OM direct au vendeur sur notre conseil.
Le parcours passe par vérification → mandat → séquestre/notaire selon le dossier.
On vous envoie le protocole écrit.
```

### 5.3 Packs & preuves

| Offre | Rôle anti-fraude |
| --- | --- |
| **Sécuriser** (V2) | Orchestration diligence 150–400 k |
| **Diaspora Secure** (V4) | Inspection + protocole 300–800 k |
| Reporting gestion | Anti « loyers disparus » cousin |

### 5.4 Interdits diaspora

| Interdit | |
| --- | --- |
| Valider un bien sur **seules** photos WA | |
| Laisser le vendeur « apporter son notaire » sans alternative client | |
| Procuration générale illimitée | |
| Participer à tontine / groupe investissement non vérifié | |
| Promettre TF / NICAD « magique » sous délai irréaliste | |

---

## 6. Catalogue & publication (prévention)

| Règle | |
| --- | --- |
| Champ **type de droit** obligatoire | TF / bail / délibération / autre |
| Disclaimer si ≠ TF | Texte type `06` |
| Pas de boost Vague 2 sans diligence mini &gt; seuil | Policy roadmap |
| Un seul prix | Anti multi-annonce |
| Zones no-go / conditionnel | Voir `02` plan-commercial zones |
| Retrait immédiat | Si fraude suspectée post-publish |

---

## 7. Scripts agents (terrain)

### 7.1 Client qui veut payer Wave

```
Je comprends l’urgence. Justement : les arnaques les plus fréquentes
passent par Wave/OM au vendeur.
Chez nous, on ne conseille jamais ce circuit.
On passe par vérification des papiers puis séquestre/notaire.
Si le vendeur refuse, on n’accompagne pas le paiement — c’est non négociable.
```

### 7.2 « La délibération suffit »

```
Une délibération donne un droit d’usage, pas une propriété pleine comme un TF.
Beaucoup de « ventes » sur délibération se terminent en litige.
On peut vous accompagner pour comprendre le dossier et les options
(régularisation / bail) — pas pour faire croire que c’est un titre.
```

### 7.3 Diaspora « mon frère gère tout »

```
On peut travailler avec votre famille sur place pour les visites.
En revanche : celui qui présente le bien ne doit pas être seul
à vérifier les papiers ni à manier l’argent.
Nous + notaire = vérification et fonds. C’est votre protection.
```

### 7.4 Vendeur offensé par la diligence

```
Ce n’est pas vous que l’on met en doute — c’est le standard du marché
et la protection des deux parties. Un EDR propre accélère souvent la vente.
Sans vérification, nous ne publions / ne faisons pas payer.
```

---

## 8. Fraude interne (agence)

| Risque | Contrôle |
| --- | --- |
| Agent détourne loyer | Comptes société · double validation · OD |
| Livre leads perso | CRM obligatoire · sanction |
| Kickback vendeur opaque | Conventions · transparence apport |
| Fausse diligence « OK » | OD / GER valide verdicts sensibles |
| Photos / docs clients revendus | Interdit · archivage contrôlé |

**Signalement :** tout collaborateur peut alerter GER ; pas de représailles de bonne foi.

---

## 9. Escalade & incidents

| Niveau | Exemple | Délai | Qui |
| --- | --- | --- | --- |
| **L1** | 1 orange | Note CRM · diligence + | AC → OD |
| **L2** | Rouge ou ≥ 2 orange | Frein immédiat | OD + GER &lt; 4 h |
| **L3** | Argent déjà parti / plainte | Crisis | GER &lt; 1 h · avocat |
| **L4** | Médias / police | Com + juridique | GER + associés |

**Incident log :** date · biens · personnes · montants · actions · statut (lien registre J01).

**Com externe :** faits · process · pas d’accusation publique prématurée · pas de fake « on garantit ».

---

## 10. Formation & preuves

| Qui | Obligation |
| --- | --- |
| Tout AC / OD | Quiz oral TF vs délibération · lecture `06` §1–2 · ce doc |
| Onboarding J1 | Engagement éthique papiers signé (`06`) |
| Trimestriel | Revue 3 cas red flags (anonymisés) |
| CT | Pas de contenu qui nie les risques |

---

## 11. KPI anti-fraude

| KPI | Cible |
| --- | ---: |
| Incidents Wave hub-conseillés | **0** |
| % terrains nouveaux avec go/no-go doc (V2+) | **≥ 70 %** |
| % closings diaspora avec séquestre | **≥ 50 %** (→ 100 % cible) |
| Fiches sans type papier | **0** |
| Phrases interdites constatées | **0** (sinon sanction) |
| Diligence → verdict tracé CRM | **100 %** dossiers sensibles |

---

## 12. Matrice décision rapide

```
Paiement demandé
  ├─ Wave/OM vendeur ou agent ? ──► STOP (R1)
  ├─ Rouge autre ? ──► STOP
  ├─ ≥ 2 orange ? ──► SUSPENDRE + diligence
  ├─ Diaspora remote ? ──► Secure + séquestre + rôles séparés
  ├─ Délibération ? ──► Disclaimer + pas « vente TF » ; régularisation ?
  └─ EDR OK + notaire + GO ──► Closing autorisé
```

---

## 13. Sanctions

| Manquement | Conséquence |
| --- | --- |
| Phrase interdite / Wave perso | Avertissement → gel split → rupture |
| Publish sans type papier | Retrait + coaching |
| Dissimulation incident | Faute grave |
| Contournement séquestre diaspora | Faute grave + revue GER |

---

## 14. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`06-parcours-foncier-securite.md`](../etude-de-marche/06-parcours-foncier-securite.md) | Hiérarchie papiers · DGSCOS · 3 coffres |
| [`06-culture-et-sla.md`](../organisation/06-culture-et-sla.md) | Scripts · phrases interdites |
| [`08-due-diligence-fonciere.md`](../../docs/add-ons/specs/02-terrain-construction/08-due-diligence-fonciere.md) | Spec produit diligence |
| [`05-argumentaire-vente.md`](../plan-commercial/05-argumentaire-vente.md) | Talk tracks Fatou / Mamadou |
| [`01-registre-risques.md`](./01-registre-risques.md) | J01–J06 |

### Externes

| Source | Insight |
| --- | --- |
| MyAfric — guide anti-arnaque / vérif TF | Séparation rôles · EDR · 2 red flags |
| Investissement Immo Afrique — diaspora 2025 | Wave/OM = signal · faux sites · tontines WA |
| SenPages / Loger-Dakar | EDR Conservation · pression vendeur · plan |

**Avertissement :** politique **interne hub**. Elle ne constitue pas un avis juridique opposable ; mandats et séquestres à valider avocat / notaire SN.

---

*Politique anti-fraude v1.0 — sept. 2026. Prochain : `03-conformite-agence.md`.*
