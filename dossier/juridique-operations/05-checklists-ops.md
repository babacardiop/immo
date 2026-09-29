# Checklists ops — Publication, paiement, chantier, EDL

**Document :** Dossier · Juridique & opérations · 05  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`04-process-par-parcours.md`](./04-process-par-parcours.md) · [`03-manuel-agent.md`](./03-manuel-agent.md) · [`../risques-conformite/04-politique-papiers.md`](../risques-conformite/04-politique-papiers.md) · [`../risques-conformite/02-politique-anti-fraude.md`](../risques-conformite/02-politique-anti-fraude.md) · [`../etude-de-marche/06-parcours-foncier-securite.md`](../etude-de-marche/06-parcours-foncier-securite.md) · [`../../docs/add-ons/specs/02-terrain-construction/09-permis-construire-cu.md`](../../docs/add-ons/specs/02-terrain-construction/09-permis-construire-cu.md) · [`../../docs/add-ons/specs/03-location-gestion/12-etat-des-lieux-digital.md`](../../docs/add-ons/specs/03-location-gestion/12-etat-des-lieux-digital.md)  
**Aval :** CRM checklists · formation AC/OD · Pack Sécuriser / Terrain→Maison

---

## 0. Mode d’emploi

| Règle | |
| --- | --- |
| **Usage** | Cocher **dans l’ordre** · bloquant = case ❌ → stop stage |
| **Qui** | AC exécute · OD contrôle papiers/boost · GER arbitre exceptions |
| **Preuve** | Joindre CRM (photos, PDF, horodatage) |
| **Version** | Imprimer / PDF rapide pour terrain |

**Seuil boost terrain (à figer GER) :** proposition **15–25 M FCFA** — au-delà = diligence mini avant ads (`04` papiers).

---

## 1. Checklist **avant publication** (catalogue / classifieds)

*Parcours : vendeur · mise en loc. Réf. workflow §6 politique papiers.*

### 1.1 Bloquants (tous biens)

- [ ] Mandat signé (MV/ML) + n° **registre**  
- [ ] Identité mandant vérifiée (CNI / RCCM)  
- [ ] `type_de_droit` renseigné ≠ **inconnu**  
- [ ] Prix + mode affichage (FAI / hors frais · loyer HC)  
- [ ] Adresse / quartier / consistance cohérents  
- [ ] Photos datées (≥ 5 · lumière naturelle · défauts visibles OK)  
- [ ] Zone : pas no-go DGSCOS non documenté  
- [ ] Titre d’annonce **non mensonger** (pas « TF » si délibération)  
- [ ] Disclaimer bandeau si ≠ TF  
- [ ] Sync classifieds = **même** libellé type droit + disclaimer court  

### 1.2 Selon type de droit

| Type | Cases additionnelles |
| --- | --- |
| **TF** | [ ] Copie TF / réf. · [ ] NICAD si dispo · [ ] Disclaimer EDR « à confirmer » si pas encore vérifié |
| **Bail emph. / ord.** | [ ] Copie bail · [ ] Inscription / canon évoqués · [ ] Wording « cession de droits / bail » pas « propriété pleine » |
| **Délibération** | [ ] Bandeau orange **obligatoire** · [ ] CTA Sécuriser · [ ] Tutelle / exécutoire notée si connue · [ ] **Pas** de boost promocode |
| **Autre / AOO** | [ ] **GER** GO écrit · [ ] Disclaimer extrême · [ ] CTA diligence only |

### 1.3 Location (publish loc)

- [ ] Loyer HC annoncé  
- [ ] Total d’entrée estimé (loyer + caution plafonds + honoraires) — à confirmer avant visite  
- [ ] Nu / meublé · dispo date  
- [ ] Honoraires loc : rappel décret si ≤ 500 k  

### 1.4 Boost / ads (Vague 2+)

- [ ] Publish OK (§1.1–1.2)  
- [ ] Si terrain &gt; seuil → EDR ou diligence mini **faite**  
- [ ] Si délibération → boost **interdit** sauf GER  
- [ ] Budget ads + UTM CRM  
- [ ] SLA WA file OK (≥ 90 %) — sinon **stop ads**  

### 1.5 Validation

| Rôle | Action |
| --- | --- |
| AC | Complète checklist · demande publish |
| OD | Revue si terrain / délibération / zone chaude / &gt; seuil |
| GER | Exception AOO / boost délibération |

**GO publish :** toutes cases bloquantes ✅ · CRM `listing_status=live`

---

## 2. Checklist **avant paiement** (acquéreur / diaspora)

*Bloquant anti-fraude. Aucun Wave/OM/WU vendeur. Ordre = diligence `02`.*

### 2.1 Identité & capacité

- [ ] Pièce ID vendeur (et conjoint / ayants droit si indivision)  
- [ ] Capacité : tutelle, succession, POA — documents OK  
- [ ] Vendeur = titulaire inscrit **ou** chaîne de droits claire  
- [ ] Acquéreur ID + budget / financement clarifié  

### 2.2 Droit & parcelle

- [ ] Régime déclaré : TF / bail / délibération / autre  
- [ ] Références titre / bail / délibération  
- [ ] **EDR** Conservation récent (ou équivalent documenté)  
- [ ] NICAD / extrait plan si dispo  
- [ ] Concordance visite / GPS / plan (écarts notés)  
- [ ] Occupation réelle (qui habite / cultive ?)  
- [ ] Zone : pas opération DGSCOS active non traitée  

### 2.3 Red flags (stop si rouge)

- [ ] ❌ Demande paiement Wave/OM/WU au vendeur ou agent perso  
- [ ] ❌ Refus EDR / notaire indépendant  
- [ ] ❌ Délibération présentée comme TF sans correction  
- [ ] ❌ Prix −50 % vs quartier sans explication  
- [ ] ❌ ≥ 2 orange non levés (photocopies floues, pression, occupation, etc.)  

→ Si une case rouge cochée = **NO-GO paiement** · escalade GER.

### 2.4 Circuit fonds & acte

- [ ] Notaire choisi **par l’acquéreur** (ou shortlist hub + choix libre)  
- [ ] Protocole écrit : fonds → **séquestre / compte notaire**  
- [ ] Offre / avant-contrat avec **conditions suspensives** (EDR, financement…)  
- [ ] Montant acompte + calendrier actés  
- [ ] Si diaspora : Pack Secure / inspection si remote · séparation des rôles  
- [ ] Si POA : voir `06` — limitée · datée · prix plafond  

### 2.5 Verdict CRM

| Verdict | Suite |
| --- | --- |
| **GO** | Autoriser orientation séquestre |
| **GO conditionnel** | Liste conditions levées **avant** déblocage |
| **NO-GO** | Refus accompagner paiement · retrait catalogue si besoin |

**Phrase agent :** *Avant de payer, on vérifie. Ensuite on gère.*

---

## 3. Checklist **avant chantier** (gros œuvre / clôture significative)

*Hub = apporteur. Client signe avec BTP/archi. Policy : pas de gros œuvre sans titre lisible + AC (disclaimer écrit sinon).*

### 3.1 Prérequis fonciers

- [ ] Droit d’occuper constructible documenté (TF / bail adapté…)  
- [ ] NICAD / plan Cadastre  
- [ ] Bornage à jour **ou** écart limites noté + plan géomètre si doute  
- [ ] Diligence / EDR OK si achat récent  
- [ ] Zone constructible / pas DPM / pas Arrêt Dscos actif  

### 3.2 Autorisation de construire (AC)

- [ ] Dossier AC préparé (plans, pièces)  
- [ ] Dépôt **papier mairie** + **accusé** (TeleDAc ≠ canal normal)  
- [ ] Arrêté maire **ou** silence réglementé documenté  
- [ ] Client informé délais **réels** (souvent 3 mois → &gt; 1 an, pas « 28 j magiques »)  
- [ ] Affichage chantier prévu (AC visible)  

### 3.3 Conception & seuils

- [ ] Budget travaux estimé (simu)  
- [ ] Si &gt; ~**30 M FCFA** → architecte Ordre (intro partenaire)  
- [ ] Plans / descriptif / devis BTP structurés  
- [ ] Assainissement / VRD évoqués si hors réseau  

### 3.4 Contrats & rôles

- [ ] Convention apporteur hub↔BTP (et archi) **signée** avant intro  
- [ ] Contrat travaux **client ↔ constructeur** (hub non co-contractant)  
- [ ] Jalons paiement / acomptes écrits  
- [ ] Assurances chantier / RC entreprise demandées (copie)  
- [ ] Disclaimer hub limites métier remis  

### 3.5 Kickoff chantier

- [ ] Date ouverture · contacts site  
- [ ] Photos « avant » GPS (suivi léger si activé)  
- [ ] Règle : acomptes chantier **≠** Wave perso agent  
- [ ] Commission hub = déclencheur Annexe A (souvent acompte encaissé BTP)  

**NO-GO démarrage hub-accompagné :** pas d’AC + client veut couler dalle « en secret » · zone contentieux ouvert · partenaire hors shortlist.

---

## 4. Checklist **EDL** (état des lieux)

*Entrée & sortie location. Réf. add-on `12-etat-des-lieux-digital` · Noflaye-like. Ne jamais encaisser caution sans EDL précis.*

### 4.1 Avant EDL entrée

- [ ] Bail paraphé (ou prêt à signer **le même jour**)  
- [ ] Total d’entrée annoncé (loyer + caution + honoraires)  
- [ ] Compteurs : électricité · eau · (gaz si) — relever index  
- [ ] Clés / badges / télécommandes comptés  
- [ ] Inventaire meublé si meublé (pièce par pièce)  
- [ ] Appareil photo / WA Business chargé  
- [ ] Présence : bailleur ou mandataire hub + locataire  

### 4.2 Pendant EDL entrée (pièce par pièce)

Pour **chaque** pièce / extérieur :

- [ ] Sol / murs / plafond (état : neuf / bon / usé / dégradé)  
- [ ] Huisseries · volets · grilles  
- [ ] Prises · interrupteurs · luminaires  
- [ ] Plomberie · robinetterie · WC · fuite ?  
- [ ] Clim / frigo / chauffe-eau si équipé — n° série si possible  
- [ ] Photos **datées** (défauts en gros plan + vue d’ensemble)  
- [ ] Commentaires libres signés  

**Communs / extérieur :** façade, portail, jardin, parking, citerne, groupe.

### 4.3 Clôture EDL entrée

- [ ] Index compteurs notés + photos cadrans  
- [ ] Nb clés remises (liste)  
- [ ] Caution : montant · mode paiement **traçable** · reçu  
- [ ] Honoraires mise en loc documentés  
- [ ] Signature **locataire + bailleur/mandataire** · date  
- [ ] Exemplaires : locataire · bailleur · CRM/PDF hub  
- [ ] Si gestion : mandat MG actif · 1ʳᵉ quittance process  

### 4.4 EDL sortie

- [ ] Préavis / date sortie confirmés  
- [ ] Comparer **entrée vs sortie** (même grille)  
- [ ] Photos sortie datées  
- [ ] Usure normale vs dégradations → chiffrage  
- [ ] Compteurs finaux  
- [ ] Restitution clés  
- [ ] Solde loyers / charges  
- [ ] Restitution caution (délai / retenues justifiées)  
- [ ] Signatures · archive CRM  
- [ ] Relance mise en loc si bailleur le souhaite  

### 4.5 Interdits EDL

| Interdit | |
| --- | --- |
| Caution sans EDL | |
| EDL « tout OK » sans photos | |
| Un seul exemplaire chez l’agent | |
| Retenue caution sans preuve dégradation | |
| Wave perso agent pour caution | |

---

## 5. Mini-checklists satellites (1 page)

### 5.1 Avant **visite acquéreur / locataire**

- [ ] Créneau confirmé WA  
- [ ] Fiche : prix · type papier · disclaimer  
- [ ] Accès / clés  
- [ ] Loc : total entrée annoncé  
- [ ] Terrain : GPS / plan si dispo  

### 5.2 Avant **signature mandat**

- [ ] Checklist `01` mandats (§6)  
- [ ] Exclusif prioritaire · motif si simple  
- [ ] % grille · FAI  
- [ ] 2 originaux · registre  

### 5.3 Avant **intro partenaire**

- [ ] Convention `02` live  
- [ ] PartnerLead créé  
- [ ] Brief + SLA 48 h  
- [ ] Script handoff (pas promesse délai inventé)  

### 5.4 Avant **acte / jour J notaire**

- [ ] Diligence GO / conditions levées  
- [ ] Séquestre confirmé  
- [ ] Pièces ID + dossier notaire  
- [ ] POA si besoin (`06`)  
- [ ] WA rappel J−2  

---

## 6. Matrice checklist × rôle

| Checklist | AC | OD | GER | Partenaire |
| --- | :---: | :---: | :---: | :---: |
| Publish | R | A (sensible) | Exception | — |
| Boost | C | R/A | Stop ads | — |
| Paiement | R spot | R EDR | A verdict | Notaire / formalités |
| Chantier | C | R suivi | A éthique | BTP / archi **A** exécution |
| EDL | R | C gestion | I | — |

---

## 7. Stockage & durée

| Document | Où | Durée min. |
| --- | --- | --- |
| Checklist publish cochée | CRM listing | Vie du mandat + 5 ans |
| Diligence / EDR | CRM deal | 5 ans post-acte |
| EDL PDF + photos | CRM bail / Drive | Durée bail + litige caution |
| AC / devis chantier | CRM PartnerLead | Durée chantier + 5 ans |
| Mandats | Registre + scan | **5 ans** (décret 83-423) |

---

## 8. KPI ops checklists

| KPI | Cible |
| --- | ---: |
| % publishes avec checklist ✅ | **100 %** |
| Boost non conformes | **0** |
| Paiements accompagnés sans séquestre | **0** |
| EDL avec photos + signatures | **100 %** mandats loc/gestion |
| Chantiers intro sans AC documentée | **0** (sauf disclaimer GER écrit) |

---

## 9. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`04-politique-papiers.md`](../risques-conformite/04-politique-papiers.md) | Publish / boost / disclaimers |
| [`02-politique-anti-fraude.md`](../risques-conformite/02-politique-anti-fraude.md) | Pré-paiement · red flags |
| [`06-parcours-foncier-securite.md`](../etude-de-marche/06-parcours-foncier-securite.md) | EDR · pièces par type |
| [`09-permis-construire-cu.md`](../../docs/add-ons/specs/02-terrain-construction/09-permis-construire-cu.md) | AC papier mairie |
| [`12-etat-des-lieux-digital.md`](../../docs/add-ons/specs/03-location-gestion/12-etat-des-lieux-digital.md) | EDL digital |
| [`01-constructeur-btp.md`](../../docs/partenaires/specs/01-construction-chantier/01-constructeur-btp.md) | Policy AC avant gros œuvre |
| [`04-process-par-parcours.md`](./04-process-par-parcours.md) | Gates parcours |

### Externes

| Source | Insight |
| --- | --- |
| SenPages / SamaGalle / DGID | EDR avant tout paiement · coûts & délais |
| MyAfric / Cyril Jarnias checklists SN | 25 points · AC · séquestre · bornage |
| Notaires FR (analogie pièces) | ID · titre · baux · urbanisme · EDL si loué |
| Un Monde Sénégal | NICAD + bornage ≠ titre · AC distincte de l’achat |
| Noflaye (pratique gestion SN) | Bail + EDL + quittances traçables |

---

*Checklists ops v1.0 — sept. 2026. À plastifier / PDF terrain. Prochain : `06-politique-procurations.md`.*
