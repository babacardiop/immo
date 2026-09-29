# Data flow & protection des données (RGPD / Loi SN)

**Document :** Dossier · Tech · Site · 19  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`04-crm-et-leads.md`](./04-crm-et-leads.md) · [`07-integrations.md`](./07-integrations.md) · [`09-back-office-agents.md`](./09-back-office-agents.md) · [`14-matrice-droits-roles.md`](./14-matrice-droits-roles.md) · [`11`](./11-cahier-des-charges-fonctionnel.md) · [`../../juridique-operations/02-convention-partenaire-type.md`](../../juridique-operations/02-convention-partenaire-type.md)  
**Aval :** Politique confidentialité site · registre traitements · déclaration CDP · DPA sous-traitants · runbooks incident

> **Rôle :** cartographier **collecte → stockage → usage → partage → conservation → effacement** des données personnelles du hub, avec obligations **Loi SN 2008-12 / CDP** et **RGPD** (diaspora UE).  
> **Pas un avis juridique** — cadrage produit/eng pour counsel ; finaliser avec avocat SN avant go-live.

---

## 0. En une phrase

Privacy by design : minimiser à la collecte, CRM **société**, vault restreint, partenaires = finalité apport seulement, droits d’accès/opposition opérés.

```
Collecte (site/WA) → Stockage (DB/CRM/vault) → Usage (agence) → Partage (P / sous-traitants)
                         ↓
              Conservation limitée → Archivage / purge → Droits personne
```

---

## 1. Cadre légal (synthèse opérationnelle)

| Cadre | Applicabilité EverGreen | Implications clés |
| --- | --- | --- |
| **Loi n° 2008-12** + Décret 2008-721 | Siège / traitements SN | Déclaration / autorisation **CDP** · consentement / finalité · sécurité · confidentialité · droits accès/rectif/opposition · sous-traitants encadrés |
| **CDP** ([cdp.sn](https://www.cdp.sn/obligations-entreprises)) | Autorité SN | Info personnes · conservation limitée · transferts étrangers déclarés |
| **RGPD (UE)** | Prospects/clients **diaspora UE** · évent. outils EU | Base légale · information · droits étendus · transferts · privacy by design · (breach notif si applicable) |
| **Loi transactions électroniques 2008-08** | Forms / consent digital | Preuve consentement |

Bench PropTech / agences ([Dipeeo](https://dipeeo.com/en/rgpd-immobilier-ce-quil-faut-retenir/), CRM GDPR) : durées de conservation, pièces d’identité, privacy by design dès le site.

**Gap SN↔RGPD** ([analyse Norcross/IFRC](https://cbs.ifrc.org/sites/default/files/media/document/2023-09/norcross_gap_analysis_sengal_gdpr_final.pdf)) : aligner sur le **standard le plus protecteur** pour flux diaspora (info, sécurité, transferts).

### 1.1 Rôles

| Rôle | Qui |
| --- | --- |
| **Responsable de traitement** | Entité agence EverGreen (raison sociale à figer) |
| **Sous-traitants** | Hébergeur · email (Resend) · Meta (WA) · analytics · stockage objet · évent. CRM SaaS |
| **Destinataires métier** | Agents (ACL) · partenaires (intro limitée) · notaire (closing) |
| **Personne concernée** | Lead, client, locataire, bailleur, mandant, agent (RH léger) |

---

## 2. Inventaire des données

### 2.1 Catégories

| Catégorie | Exemples | Sensibilité |
| --- | --- | :---: |
| **Identité / contact** | Nom, téléphone, email, locale | ● |
| **Qualification lead** | Intent, budget band, zone, timeline | ● |
| **Scénario simu** | Inputs/outputs JSON PUB-* | ○→● si lié contact |
| **Navigation / tech** | IP, cookies, user-agent, UTM | ○ |
| **Mandat / identité mandant** | CNI, RCCM, coordonnées | **●●** |
| **Foncier dossier** | NICAD, EDR PDF, notes titre | **●●** |
| **Transaction / loyer** | Échéances, quittances, IBAN/Wave | **●●** |
| **Commissions** | % , montants | ● (interne) |
| **Médias** | Photos biens (peu perso) · EDL photos | ○ / ● si visage |
| **Compte auth** | Email, hash mdp, sessions | ● |

### 2.2 Ce qui n’est **pas** « open data »

Listings curated publics (prix, pastille papier **déclarée**) ≠ vault CNI/EDR.  
Indices lab Observatoire = agrégats — **pas** leads CRM (gouvernance lab séparée).

---

## 3. Data flow maître

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Sources      │──►│ Ingestion    │──►│ Stockage     │
│ Site forms   │   │ API/webhook  │   │ Postgres CRM │
│ wa.me / WABA │   │ Manual log   │   │ Object store │
│ Simu + email │   │ Analytics    │   │ WA inbox     │
│ Ads Meta     │   │              │   │ Email logs   │
└──────────────┘   └──────────────┘   └──────┬───────┘
                                             │
         ┌───────────────────────────────────┼────────────────────────┐
         ▼                                   ▼                        ▼
┌────────────────┐                 ┌─────────────────┐      ┌─────────────────┐
│ Usage agence   │                 │ Partage         │      │ Droits / purge  │
│ Qualif · visite│                 │ PartnerLead (P) │      │ Accès/rectif/   │
│ Closing · gest.│                 │ Notaire · héberg│      │ opposition ·    │
│ Portails V3    │                 │ Analytics EU?   │      │ export · delete │
└────────────────┘                 └─────────────────┘      └─────────────────┘
```

### 3.1 Collecte (entrée)

| Flux ID | Source | Données | Base légale (indicatif) | Info UI |
| --- | --- | --- | --- | --- |
| C1 | `form_contact` / `form_gerer` / `form_estimation` | Nom, tel, email, intent | Mesures précontractuelles / intérêt légitime contact + **consent** case | Lien politique + finalité |
| C2 | `form_sim_email` | Email + `sim_scenario` | Consent soft gate | Disc + opt-in |
| C3 | `wa_*` deep link | Tel (WA) · message · listing_id | Précontractuel / consent conversation | Away message + politique |
| C4 | Ads Meta lead | Tel/nom + UTM | Consent Meta + notice | Landing + politique |
| C5 | Analytics (`sim_complete`, pages) | Events pseudonymes | Intérêt légitime mesure / consent cookies si requis | Bannière cookies |
| C6 | Agent upload vault | CNI, mandat PDF, EDR | Exécution mandat / obligation légale immobilier | Info mandant oral+écrit |
| C7 | Portail V3 | Loyers, tickets panne | Contrat gestion / bail | CGU espace |
| C8 | PartnerLead out | Coordonnées nécessaires intro | Consent / intérêt légitime + convention P | Case « intro partenaire » |

**Minimisation :** forms **3–4 champs** step 1 (`04`) · pas de CNI sur form public.

### 3.2 Stockage

| Store | Contenu | Accès ACL `14` | Chiffrement / contrôles |
| --- | --- | --- | --- |
| DB app (Postgres) | Leads, listings, mandates meta, users | Rôles | At-rest hébergeur · TLS transit |
| CRM lean V0 (Sheet/Airtable/…) | Miroir leads | OD/agents | Compte société · pas export libre agent |
| Object storage | Photos · PDF vault | vault.read scoped | Bucket privé · signed URLs |
| WA Business / Cloud | Conversations | Agents inbox | Politique Meta · pas forward perso |
| Email provider | Transactionnel | Admin | DPA Resend |
| Logs / analytics | Events | Admin/OD | Rétention courte IP |
| Backups | Copie DB | Admin | Chiffrés · accès limité |

**Interdit :** CRM sur téléphone perso agent · CNI dans chat WA groupe · dump CSV leads hors `leads.export` OD.

### 3.3 Usage (finalités)

| Finalité | Traitements | OK | Interdit |
| --- | --- | :---: | --- |
| **F1** Réponse lead / visite | CRM stages, WA | ● | Spam blast hors finalité |
| **F2** Exécution mandat / closing | Dossier, vault, notaire | ● | Revente fichier |
| **F3** Gestion locative | Loyers, quittances | ● V3 | Pub tierce |
| **F4** Intro partenaire | PartnerLead champs min | ● si case | Envoyer dossier CNI au BTP |
| **F5** Amélioration produit | Analytics agrégé | ● | Profiling discriminatoire |
| **F6** Contenu / SEO | Pas de PII | ● | — |
| **F7** Commissions internes | % , deals | ● | Share hors OD/GER |
| **F8** Marketing nurture | Email/WA templates | ● si consent/opt-out | Achat fichiers classifieds mass |

### 3.4 Partage / destinataires

| Destinataire | Données | Condition |
| --- | --- | --- |
| Agent AC | Leads **own** | ACL |
| OD / GER | All ops | ACL |
| Partenaire BTP/archi/notaire | Nom, tel, besoin, listing résumé | Convention art. confidentialité · **pas** vault complet |
| Notaire closing | Identité + pièces nécessaires | Closing |
| Sous-traitant tech | Selon DPA | Contrat |
| Autorité / justice | Sur réquisition | Process legal |
| Lab Observatoire | **Aucun** lead CRM | Séparation stricte |

### 3.5 Transferts hors SN

| Flux | Risque | Mitigation |
| --- | --- | --- |
| Hébergeur EU/US | Transfert | Choisir région · clauses · déclarer CDP si requis |
| Meta / WA | US/global | Minimiser · Business API · politique |
| Resend / email | Selon région | DPA · region EU préférée |
| Diaspora client UE → SN | Import | Info claire · base légale · sécurité |

Counsel : formaliser transferts dans dossier CDP.

---

## 4. Registre des traitements (extrait MVP)

| ID | Traitement | Finalité | Catégories | Destinataires | Durée (cible) | Base |
| --- | --- | --- | --- | --- | --- | --- |
| T-LEAD | Gestion prospects | F1 | Contact, qualif, sim | Agents, OD | 3 ans inactivité **ou** opposition | Précontrat / IL / consent |
| T-WA | Messagerie commerciale | F1 | Tel, messages | Agents | Aligné archivage deals | Précontrat |
| T-MAND | Mandats & vault | F2 | Identité, CNI, titres | Agents, OD, notaire | Durée mandat + **5–10 ans** archives légales* | Contrat / obligation |
| T-GEST | Gestion locative | F3 | Loyer, IBAN | Agents, proprio, loc | Durée bail + archives* | Contrat |
| T-PART | Apport partenaires | F4 | Contact min | P signés | 24 mois post-intro ou fin deal | Consent / IL |
| T-ANALYTICS | Mesure site | F5 | Events, IP soft | Admin | 13 mois cookies / 25 mois stats* | IL / consent |
| T-AUTH | Comptes portails | Accès | Email, session | User, admin | Compte actif + 1 an | Contrat |
| T-HR-AGT | Comptes agents | Ops | Email pro | Admin | Fin contrat + délai légal | Contrat travail |

\* Durées **à valider counsel** (usages immo FR/CNIL souvent cités comme repères ; adapter SN).

---

## 5. Droits des personnes

| Droit | Canal | SLA interne | Notes |
| --- | --- | --- | --- |
| Information | `/legal/confidentialite` · forms · away WA | Avant/au moment collecte | Finalités, destinataires, durée, droits, CDP |
| Accès | Email `privacy@…` / formulaire | ≤ **1 mois** | Vérif identité |
| Rectification | Idem | ≤ 1 mois | MAJ CRM + notify P si partagé |
| Opposition | Idem · unsubscribe | ≤ 72 h marketing | Motif légitime SN |
| Effacement | Idem | Selon base légale | Pas si obligation conservation mandat |
| Portabilité (RGPD) | Sur demande diaspora UE | Best effort export JSON/CSV | Leads + scénarios |
| Retrait consent | Lien mail / WA « STOP » | Immédiat nurture | |

Page confidentialité = miroir de ce doc (langage grand public).

---

## 6. Cookies & traceurs

| Type | Exemples | Consent |
| --- | --- | :---: |
| Strictement nécessaires | Session, CSRF, load bal | ○ notice |
| Mesure | Analytics anonymisé | Bannière si non exempt |
| Marketing | Meta Pixel | ● opt-in |
| Préférences | Langue | Soft |

Y1 : pixel Meta seulement si ads — sinon éviter. Pas de fingerprinting agressif.

---

## 7. Privacy by design (checklist eng)

| # | Contrôle | Doc |
| ---: | --- | --- |
| 1 | Forms min fields | `04` |
| 2 | ACL own/all + field-level vault | `14` |
| 3 | Audit `force_publish`, export, vault.read CNI | `14` |
| 4 | HTTPS everywhere · secrets hors repo | `07` |
| 5 | Signed URLs vault · pas public bucket | — |
| 6 | PartnerLead ≠ envoi CNI auto | `09` |
| 7 | Séparation lab crawl / CRM | lab `06` |
| 8 | Soft-delete + purge job par `retention_class` | — |
| 9 | Consent flags `marketing_opt_in`, `partner_intro_ok` | CRM schema |
| 10 | Logs accès vault | Audit |

---

## 8. Sous-traitants (matrice DPA)

| Sous-traitant | Service | Données | DPA / TOC | Status |
| --- | --- | --- | :---: | :---: |
| Hébergeur cloud | App + DB | All app | ● | À signer |
| Object storage | Médias/vault | Docs | ● | |
| Resend (ou équiv.) | Email | Email, meta | ● | |
| Meta | WA / Ads | Tel, messages, leads ads | Meta terms + config | |
| Analytics | Events | IP soft | ● | |
| CRM SaaS (si) | Leads | Contact | ● | Si scale |
| Wave / OM | Paiements V3 | Tel, montants | ● KYB | V3 |

Liste à publier (synthèse) dans politique confidentialité.

---

## 9. Cycle de vie & purge

```
Actif (deal/lead chaud)
  → Nurture / dormant (règles stage)
    → Archivage légal (mandats/compta)  [accès OD only]
      → Purge / anonymisation
```

| Trigger | Action |
| --- | --- |
| Opposition marketing | Flag + stop WA templates promo |
| Demande delete lead sans mandat | Anonymiser / delete si pas obligation |
| Fin mandat + délai | Archive puis purge vault selon classe |
| Agent quitte | Réassign leads · révoquer accès · engagement confiden. déjà signé |

Job cron mensuel : reporter `retention_due_at` · OD valide purges sensibles.

---

## 10. Incident / violation

| Étape | Action |
| --- | --- |
| 1 Détecter | Alert sécu / plainte / anomalie export |
| 2 Contenir | Révoquer clés · freeze comptes · rotate |
| 3 Évaluer | Nature, volume, risque personnes |
| 4 Notifier | Counsel → **CDP** si requis SN · personnes si risque élevé · RGPD 72h si applicable UE |
| 5 Remédier | Patch · log post-mortem |
| 6 Documenter | Registre incidents |

Owner : Admin tech + GER · pas agent seul.

---

## 11. Obligations pré-go-live (ops)

| # | Action | Owner |
| ---: | --- | --- |
| 1 | Déclaration / dossier **CDP** traitements | GER + counsel |
| 2 | Politique confidentialité + cookies FR live | Contenu + eng |
| 3 | Mentions forms + liens | Eng |
| 4 | Away WA + signature confidentialité agents | OD |
| 5 | DPA hébergeur / email | Admin |
| 6 | Convention P clause données (`02` juridique) | Commercial |
| 7 | Process droits `privacy@` | OD |
| 8 | Backup + test restore | Admin |
| 9 | Revue ACL export/vault | Eng + OD |

---

## 12. Diagramme flux lead type (détail)

```
Visiteur ─form/WA─► API ingest ─► Lead record (CRM société)
                                      │
                                      ├─► Notif agent (owner)
                                      ├─► Ack auto (&lt;2 min)
                                      └─► Notes / stages
                                            │
                         ┌──────────────────┼──────────────────┐
                         ▼                  ▼                  ▼
                    Closing agence    PartnerLead (si case)   Nurture email
                         │                  │
                         ▼                  ▼
                    Vault + notaire    P reçoit tel+besoin
                         │                  ✕ pas CNI
                         ▼
                    Archive durée légale → purge
```

---

## 13. Analytics & lab — frontières

| Système | PII leads ? | Règle |
| --- | :---: | --- |
| Events `sim_complete` | Seulement si email fourni | Sinon agrégat |
| CRM | Oui | ACL |
| Research lab crawl | Non (annonces publiques) | Interdit merger identity CRM sans base |
| Observatoire public | Non | Indices agrégés GER A |

---

## 14. Contenu page `/legal/confidentialite` (outline)

1. Qui est responsable  
2. Données collectées (tableaux simples)  
3. Finalités  
4. Bases légales  
5. Destinataires / sous-traitants  
6. Transferts  
7. Durées  
8. Droits + contact `privacy@` + CDP  
9. Cookies  
10. MAJ politique  

---

## 15. Phasage

| Vague | Ajouts data |
| --- | --- |
| **V0** | Leads · WA · forms · vault light · analytics soft · politique live · CDP dossier lancé |
| **V1** | sim_scenario · PartnerLead flags consent |
| **V3** | Portails · loyers · IBAN/Wave · tickets |
| **V4** | Tags diaspora · timezone · droits RGPD explicit flow |
| Scale | WABA webhooks · CRM SaaS DPA |

---

## 16. Sources

| Source | Apport |
| --- | --- |
| Loi 2008-12 · Décret 2008-721 · [CDP obligations](https://www.cdp.sn/obligations-entreprises) | Cadre SN |
| African Legal Factory / DLA Piper SN | Déclaration · principes |
| Gap analysis SN–RGPD (IFRC) | Alignement diaspora |
| Dipeeo / PropTech RGPD · CRM GDPR mapping | Conservation · privacy by design |
| Docs site `04` `07` `09` `14` | Flux EverGreen |

---

## 17. Liens

| Doc | Usage |
| --- | --- |
| [`04-crm-et-leads.md`](./04-crm-et-leads.md) | Sources & champs |
| [`07-integrations.md`](./07-integrations.md) | Sous-traitants tech |
| [`14-matrice-droits-roles.md`](./14-matrice-droits-roles.md) | Accès |
| [`09-back-office-agents.md`](./09-back-office-agents.md) | Vault |
| Convention partenaires | Clause données |

---

*Data flow & privacy EverGreen Site v1.0 — sept. 2026. Collecte min · CRM société · vault ACL · PartnerLead borné · CDP + RGPD diaspora · counsel avant go-live.*
