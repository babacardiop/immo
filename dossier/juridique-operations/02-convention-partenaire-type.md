# Convention partenaire type — Apporteur d’affaires

**Document :** Dossier · Juridique & opérations · 02  
**Statut :** v0.1 **BROUILLON** — sept. 2026  
**⚠ Relecture avocat SN / OHADA obligatoire avant signature**  
**Amont :** [`../../docs/partenaires.md`](../../docs/partenaires.md) · fiches [`../../docs/partenaires/specs/`](../../docs/partenaires/specs/) · [`../organisation/06-culture-et-sla.md`](../organisation/06-culture-et-sla.md) · [`../risques-conformite/05-assurance-et-responsabilite.md`](../risques-conformite/05-assurance-et-responsabilite.md) · [`../offre-et-tarifs/04-politique-commerciale.md`](../offre-et-tarifs/04-politique-commerciale.md)  
**Aval :** shortlist P0 signée · CRM `PartnerLead` / `CommissionEvent` · scorecard mensuelle

---

## 0. Avertissement

> Trame métier pour accélérer la rédaction avec l’avocat.  
> En droit OHADA, l’apport d’affaires repose surtout sur le **contrat écrit** (liberté contractuelle) — sans écrit, la preuve du droit à commission est fragile.  
> Ne **pas** confondre avec mandat d’agent immobilier (loi 82-07 / décret 83-423) ni avec co-contrat travaux / acte notarié.  
> En cas de conflit trame ↔ avis avocat : **l’avocat prime**.

**Règle hub :** zéro lead partenaire envoyé sans convention signée (ou avenant fiche taux).

---

## 1. Deux sens d’apport (ne pas mélanger)

| Sens | Qui apporte | Qui exécute / encaisse | Doc |
| --- | --- | --- | --- |
| **A — Hub → métier** | L’agence oriente un client | Partenaire (BTP, archi, notaire…) | Convention **§3** (cœur V1) |
| **B — Extérieur → hub** | Courtier / agence amie apporte un mandat ou un acquéreur | L’agence (transaction / loc) | Avenant **§8** split / courtier |

Le client **signe toujours** le contrat d’exécution avec le partenaire (sens A) ou le mandat avec l’agence (sens B). Le hub n’est **ni** constructeur **ni** notaire **ni** garant qualité hors cadre conventionnel.

---

## 2. Principes hub (non négociables)

| # | Principe | Application |
| --- | --- | --- |
| 1 | **Écrit** | Taux · déclencheur · délai paiement · SLA · sortie |
| 2 | **Non-exclusif** (défaut) | Shortlist **2–3** par métier · exclusivité = GER + motif |
| 3 | **Client–partenaire direct** | Hub = intro / suivi lead · disclaimer script `05` assurance |
| 4 | **Transparence** | Client informé qu’on collabore avec des partenaires (éthique) |
| 5 | **SLA rappel** | **&lt; 48 h** · cible respect **&gt; 80 %** |
| 6 | **Commission sur encaissé** | Pas de paiement hub si partenaire n’a pas encaissé (sauf faute partenaire) |
| 7 | **Preuve CRM** | Lead ID · date intro · WA · statut |
| 8 | **Séparation des rôles** | Inspecteur ≠ vendeur ≠ notaire (diaspora) |
| 9 | **Papiers** | Jamais briefer « délibération = TF » |
| 10 | **Clause sortie** | SLA rouge × 2 mois **ou** plainte grave → retrait shortlist |

---

## 3. Grille taux & déclencheurs (catalogue)

*Indicatif — figer en annexe A de chaque convention signée.*

### 3.1 P0 (Vague 1 — à signer en premier)

| Métier | Taux / forfait cible | Base | Déclencheur (exigence) | Paiement hub |
| --- | --- | --- | --- | --- |
| **Constructeur BTP** | **2–5 %** (cible **3 %**) | Montant HT contrat travaux | **Acompte client encaissé** par le partenaire | Sous **15 j** après encaissement acompte (ou palier : % à chaque appel de fonds — avenant) |
| **Architecte** | **10–20 %** honoraires **ou** forfait **150–500 k** | Honoraires mission / forfait | **Signature mission** archi (+ 1ʳᵉ facture encaissée si % ) | Sous **15 j** |
| **Notaire** | Forfait **50–200 k** / dossier clos | Forfait (éviter % agressif émoluments) | **Acte authentique signé** (ou mutation engagée — préciser) | Sous **15 j** · compatible déontologie étude |
| **Formalités / papiers** | Forfait dossier **ou** **10–20 %** honoraires cabinet | Selon fiche | **Dossier livré + honoraires cabinet encaissés** | Sous **15 j** |
| **Financier / structuration** | Success fee **0,5–2 %** ticket | Ticket financé / clos | **Closing financement** documenté | Sous **30 j** (tickets longs) |

**Paliers BTP recommandés (option annexe) :**

| Ticket travaux | Commission |
| --- | --- |
| &lt; 30 M FCFA | Forfait **300–800 k** (négocié) |
| 30–100 M | **3–4 %** |
| &gt; 100 M | **2–3 %** |

### 3.2 P1 / P2 (extraits)

| Métier | Taux / forfait | Déclencheur |
| --- | --- | --- |
| Géomètre / bornage | 10–15 % ou forfait | Prestation livrée + payée |
| Avocat immobilier | % honoraires / forfait | Mission signée + 1ʳᵉ facture |
| Courtier crédit | Partage commission banque | Déblocage / 1ʳᵉ échéance selon accord |
| Assureur / courtier | 10–20 % prime 1ʳᵉ année | Police émise + prime encaissée |
| Inspecteur diaspora | Markup 20–40 % **ou** fee fixe | Visite réalisée + payée |
| Promoteur lots | % vente lot | Acte / réservation payante |
| Solaire / clim / VRD… | % devis | Acompte / pose selon métier |
| Agence réseau | Split **50/50** (60/40 GER) | Closing + honoraires agence encaissés |

### 3.3 Règle de conflit de leads

| Situation | Attribution |
| --- | --- |
| Même client déjà en CRM hub &lt; 90 j | Lead hub — **pas** de double commission externe |
| Client présenté par 2 partenaires | 1ʳᵉ intro **tracée** CRM gagne · demi-part si co-intro écrite |
| Client « marché ouvert » sans intro | Aucune commission apporteur |

---

## 4. SLA partenaires (annexe B type)

| Engagement | Cible | Mesure |
| --- | --- | --- |
| Accusé réception lead (WA/CRM) | **&lt; 4 h** ouvrées | Timestamp |
| **Rappel client** | **&lt; 48 h** | Hard SLA hub |
| Devis BTP | 7–14 j | Fiche `01` |
| Prise en charge notaire | &lt; 72 h + liste pièces J0 | Fiche `03` |
| Retour archi | 48–72 h | Fiche `02` |
| Taux respect rappel mensuel | **&gt; 80 %** | OD scorecard |
| Escalade | Hub prévenu sous 24 h si indispo | WA OD |

### 4.1 Sanctions / sortie (soft → hard)

| Niveau | Condition | Effet |
| --- | --- | --- |
| 🟡 Watch | SLA &lt; 80 % un mois | Feedback écrit · leads gelés partiels |
| 🟠 Probation | 2ᵉ mois &lt; 80 % **ou** 1 plainte qualité | Shortlist secondaire · 0 lead prioritaire |
| 🔴 Sortie | Plaintes graves / fraude papiers / ghosting × 3 | Retrait immédiat · clause résiliation |

Durée préavis sortie « sans faute » : **30 j** (sauf faute grave = immédiat).

---

## 5. Trame — Convention d’apport d’affaires (sens A)

```
CONVENTION D’APPORTEUR D’AFFAIRES N° CP-[AAAA]-[####]
Entre :
[AGENCE] — RCCM / NINEA / siège  (« l’Apporteur » / « le Hub »)
Et :
[PARTENAIRE] — RCCM / Ordre / assurance  (« le Partenaire »)

Article 1 — Objet
Le Hub présente au Partenaire des prospects qualifiés relevant de
[métier : construction / architecture / notariat / …].
Le Partenaire exécute et facture en son nom. Aucun lien de subordination.
Le Hub n’est pas co-contractant des prestations métier.

Article 2 — Périmètre
Zones : _______________
Types de dossiers exclus : _______________
(Ex. : pas de chantier sans preuve AC / titre lisible — disclaimer client.)

Article 3 — Non-exclusivité
Sauf avenant, le Hub tient une shortlist de plusieurs professionnels.
Le Partenaire peut travailler avec d’autres apporteurs.

Article 4 — Process lead
1. Hub crée PartnerLead (ID CRM) + brief écrit (WA/PDF).
2. Partenaire accuse + rappelle le client sous 48 h.
3. Partenaire informe le Hub du statut (devis / signe / perdu) sous 7 j.
4. Preuve d’apport = ID lead + date intro antérieure à la signature client.

Article 5 — Commission
Taux / forfait : _______________ (Annexe A)
Base de calcul : _______________
Déclencheur : _______________ (cf. grille §3)
Exigible uniquement si :
  (a) le client a été présenté par le Hub (preuve CRM), ET
  (b) le fait générateur est réalisé, ET
  (c) le Partenaire a encaissé les sommes correspondantes
      (sauf manquement imputable au Partenaire ayant fait échouer l’encaissement).
Protection post-contrat : commission due si closing dans les ___ mois
après fin de convention avec un client présenté pendant la durée
(proposition hub : 6 à 12 mois — calibrer avocat).

Article 6 — Paiement
Facture hub sous 7 j après déclencheur documenté.
Règlement : virement / Wave professionnel sous ___ j (cible 15).
Pas d’espèces. Relevé mensuel des leads ouverts sur demande.

Article 7 — SLA
Annexe B. Non-respect répété = motif de résiliation (art. 11).

Article 8 — Obligations Partenaire
Qualité professionnelle · assurance RC adaptée · conformité métier ·
pas de promesse « TF magique » · informer le Hub des litiges client liés au lead ·
ne pas détourner le client pour contourner la commission.

Article 9 — Obligations Hub
Qualification minimale · brief sincère · pas de double présentation
concurrente sans info · transparence client sur le partenariat.

Article 10 — Responsabilité & image
Litiges chantier / malfaçon / acte = Partenaire ↔ client.
Hub peut retirer le Partenaire de toute communication si atteinte
à l’image ou non-respect éthique papiers.

Article 11 — Durée & résiliation
Durée : 12 mois · reconduction écrite.
Résiliation : préavis 30 j · immédiat si faute grave (fraude, ghosting,
violation déontologie / sécurité client).

Article 12 — Confidentialité & données
CRM, tarifs, listes clients = confidentiels.
RGPD / Loi SN données : finalité apport uniquement.

Article 13 — Litiges
Amiable 15 j → médiation → tribunaux de [Dakar] / droit sénégalais.
[Option arbitrage CCJA — avocat]

Fait à _______, le __/__/____
En deux originaux.

Le Hub                         Le Partenaire
```

### Annexes obligatoires

| Annexe | Contenu |
| --- | --- |
| **A** | Taux / forfait · paliers · déclencheur · délai paiement |
| **B** | SLA rappel / devis / reporting |
| **C** | Contacts opérationnels (OD hub · commercial partenaire) |
| **D** | Disclaimer client type (script handoff) |
| **E** | Attestations (RC, Ordre, carte métier si applicable) |

---

## 6. Checklist avant 1ʳᵉ intro lead

- [ ] Convention + Annexe A signées  
- [ ] Contact WA partenaire testé  
- [ ] RC / Ordre vérifiés (archi, notaire…)  
- [ ] Partenaire créé dans CRM (`Partner`)  
- [ ] Script handoff agent briefé (48 h, pas de promesse délai devis inventé)  
- [ ] Client informé : contrat d’exécution = partenaire  
- [ ] Type de droit / diligence rappelé si terrain  

---

## 7. Process opérationnel (CRM)

```
Lead client hub
    ↓
OD / AC : besoin add-on ? → Oui
    ↓
Convention live ? → Non = STOP (GER)
    ↓
PartnerLead créé (partnerId, clientId, listingId?, brief)
    ↓
Intro WA groupée ou transfert + message type
    ↓
Timer 48 h → OD ping si silence
    ↓
Statuts : recalled / devis / signed / lost / dispute
    ↓
Déclencheur atteint → CommissionEvent (amount, trigger, dueDate)
    ↓
Facture hub → paidAt
```

**KPI mensuels :** leads envoyés · % rappel &lt; 48 h · conversion · commission FCFA · plaintes.

---

## 8. Variantes — sens B (apport vers le hub)

### 8.1 Courtier / apporteur externe (hors carte)

| | |
| --- | --- |
| **Usage marché SN** | Part de commission agence souvent **20–30 %** (négocié ; pas de barème légal) |
| **Base** | Honoraires **agence effectivement encaissés** (pas le prix de vente) |
| **Déclencheur** | Acte / bail signé **+** encaissement honoraires hub |
| **Mission** | Mise en relation **seule** — pas de négociation au nom du hub |
| **Risque** | Si l’apporteur « fait l’agent » habituellement → cadrer avocat (frontière mandat / carte) |

### 8.2 Agence partenaire / co-mandat

| | |
| --- | --- |
| **Split défaut** | **50/50** honoraires nettes |
| **Variante** | 60/40 si une partie porte exclusif + marketing |
| **Déclencheur** | Closing + encaissement |
| **SLA** | Accusé lead **24 h** |
| **GO** | Gérant (politique commerciale) |

### 8.3 Mini-clause rémunération (sens B)

```
Commission apporteur = ___ % des honoraires TTC* encaissés par le Hub
au titre de l’opération apportée, exigible après acte/bail et encaissement.
Paiement sous 15 j sur facture / note. Preuve : fiche visite + ID CRM.
*Visa EC.
```

---

## 9. Phrases handoff (agent)

**Autorisé :**
> Je vous mets en relation avec [Nom], notre partenaire [métier].  
> Il/elle vous rappelle sous **48 h**. Le devis / l’acte est **à son nom** ;  
> nous restons votre interlocuteur pour suivre le dossier.

**Interdit :**
> « On construit pour vous » · « Notre notaire garantit le TF » ·  
> « Rappel dans 2 h » (sauf engagement partenaire écrit) ·  
> « Payez-moi l’acompte chantier sur Wave perso ».

---

## 10. Gouvernance

| Acte | Rôle |
| --- | --- |
| Signature convention | **GER** (A/R) · OD C · avocat C |
| Taux hors grille catalogue | **GER** |
| Envoi lead | OD R · AC C |
| Tracker SLA 48 h | OD R/A |
| Facturation commission | OD + EC |
| Retrait shortlist | GER A · OD R |

Revue **mensuelle** : scorecard partenaires (`08-growth-scorecard`) · commissions dues vs payées.

---

## 11. Backlog avocat

| Point | Priorité |
| --- | ---: |
| Protection post-mandat 6 vs 12 mois | P1 |
| Compatibilité forfait notaire / déontologie | P0 |
| Statut courtier ponctuel vs activité habituelle | P1 |
| Clause pénalité SLA (soft vs damages) | P2 |
| Version bilingue FR | P2 |
| Annexe multi-lots / portfolio BTP | P2 |

---

## 12. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`docs/partenaires.md`](../../docs/partenaires.md) | Principes · P0 · KPI 48 h |
| Fiches `specs/01`–`24` | Taux & SLA métier |
| [`06-culture-et-sla.md`](../organisation/06-culture-et-sla.md) | SLA WA · handoff |
| [`07-matrice-raci.md`](../organisation/07-matrice-raci.md) | Qui signe / tracke |
| [`05-assurance-et-responsabilite.md`](../risques-conformite/05-assurance-et-responsabilite.md) | Limites métier |
| [`04-politique-commerciale.md`](../offre-et-tarifs/04-politique-commerciale.md) | Split inter-agences |
| [`01-modeles-mandats.md`](./01-modeles-mandats.md) | Distinction mandat client |

### Externes

| Source | Insight |
| --- | --- |
| Magazine Immo Sénégal / pratiques agences | Courtier ↔ agence souvent **20–30 %** ; inter-agences ~**50 %** (usage, pas loi) |
| Modèles apport OHADA (TedMaster, Africa-Laws, Mohada) | Écrit · commission sur affaire **réalisée** · exclusivité limitée |
| Guides apporteur immo (FR — analogie) | Déclencheur = closing + encaissement honoraires ; preuve d’intro |
| Immoplus Sablux / marché SN | Honoraires agence après acte ; libre négociation des % |

---

*Convention partenaire v0.1 brouillon — sept. 2026. Ne pas envoyer de lead P0 sans Annexe A signée. Prochain : `03-manuel-agent.md`.*
