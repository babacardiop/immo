# CRM & leads — Capture WA / formulaire → pipeline · SLA

**Document :** Dossier · Tech · Site · 04  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`02-parcours-utilisateurs.md`](./02-parcours-utilisateurs.md) · [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) · [`../../plan-commercial/03-canaux-acquisition.md`](../../plan-commercial/03-canaux-acquisition.md) · [`../../juridique-operations/04-process-par-parcours.md`](../../juridique-operations/04-process-par-parcours.md) · [`../../../docs/hub-roadmap.md`](../../../docs/hub-roadmap.md)  
**Aval :** [`07-integrations.md`](./07-integrations.md) · [`09-back-office-agents.md`](./09-back-office-agents.md) · [`19-data-flow-rgpd.md`](./19-data-flow-rgpd.md) · analytics marketing

> **Rôle :** définir **comment** un lead entre (WhatsApp, form, simu), **où** il vit (CRM société), **quelles étapes** il traverse, et les **SLA** non négociables.  
> Process métier détaillés (mermaid) → `juridique-operations/04`. Canaux → `plan-commercial/03`.

---

## 0. Verdict Y1

| Question | Réponse |
| --- | --- |
| Canal #1 closing | **WhatsApp Business société** (pas numéros perso isolés) |
| CRM | **Société** — tout lead loggé · pas livre agent |
| Speed-to-lead | Accusé auto **&lt; 2 min** · humain **&lt; 24 h** (≥90 %) · cible **&lt; 5 h** · chaud **&lt; 1 h** ouvrées |
| Stack lean V0 | WA Business + table CRM (Airtable / Notion / Sheet) + webhook forms → notif agent |
| Stack cible | Même + WA Cloud API / inbox partagée quand volume · CRM dédié (HubSpot/… ) si besoin |
| Forms | **3–4 champs** max step 1 · progressive profiling après |

Bench 2025–26 : conversion chute fort si 1ʳᵉ réponse &gt; 5 min ; auto-ack + task agent + source taguée = minimum viable. EverGreen aligne **ambition 5 min** sur leads chauds, **contrat 24 h** sur le volume (capacité PME SN).

---

## 1. Principes

| # | Principe | Implication |
| ---: | --- | --- |
| 1 | **Un lead = un record** | Match téléphone/email · pas de doublons orphelins |
| 2 | **Source toujours** | UTM / `wa_click` / `sim_*` / partenaire / classified |
| 3 | **Owner explicite** | Round-robin ou zone · chat non assigné = fuite |
| 4 | **Intent tôt** | Router achat / vente / loc / gestion / diaspora |
| 5 | **Société &gt; perso** | Handoff si agent part · historique conservé |
| 6 | **Pas de promesse orale seule** | Stages + notes CRM |
| 7 | **PartnerLead tracké** | Intro BTP/notaire = objet CRM séparé |
| 8 | **Nurture ≠ lost** | `nurture` / `follow_later` avant poubelle |

---

## 2. Sources de capture (site + hors site)

| Source ID | Surface | Capture | Vague |
| --- | --- | --- | :---: |
| `wa_fiche` | CTA fiche bien | Deep link WA prérempli (bien + URL) | V0 |
| `wa_fab` | FAB global | WA générique + page ref | V0 |
| `wa_outil` | CTA post-simu | WA + scénario résumé | V1 |
| `form_gerer` | `/gerer/demande` | Webhook → CRM | V0 |
| `form_contact` | `/agence/contact` | Webhook → CRM | V0 |
| `form_estimation` | Estimation soft | Webhook → CRM · SLA serré | V0–1 |
| `form_sim_email` | Soft gate post-résultat | Email + scénario JSON | V1 |
| `sim_complete` | Event analytics | Si contact fourni → lead | V1 |
| `guide_cta` | CTA guide | WA / form / outil | V0 |
| `diaspora_secure` | `/diaspora` | WA + tag Secure | V0 soft |
| `ads_meta` | Lead ads / click-to-WA | Import + UTM | M3+ |
| `classified` | Expat/CoinAfrique | Note manuelle source | Continu |
| `partner_in` | Reverse partenaire | Tag partenaire | V1+ |
| `lab_radar` | Price-drop (L3) | Lead **interne** vendeur | Lab |

**Deep link WA (canon) :**

```
https://wa.me/221XXXXXXXXX?text=
Bonjour%20EverGreen%20—%20[INTENT]%20—%20[Titre%20bien%20ou%20outil]%20—%20[URL]
```

Payload minimal loggé côté CRM quand possible : `intent`, `listing_id`, `outil`, `source`, `ts`.

---

## 3. Champs lead (schéma min)

### 3.1 Contact

| Champ | Obligatoire step 1 | Notes |
| --- | :---: | --- |
| `phone` (WA) | ● si WA | E.164 |
| `name` | ○→● | Qualif |
| `email` | ○ | Soft gate simu |
| `locale` | ○ | FR / timezone diaspora |

### 3.2 Qualification

| Champ | Exemple |
| --- | --- |
| `intent` | `buy` · `sell` · `rent` · `manage` · `diaspora` · `partner` · `other` |
| `persona` | mamadou · fatou · marieme · … |
| `zone` | Almadies · Bambilor · … |
| `budget_band` | &lt;15M · 15–40M · 40–100M · 100M+ · ND |
| `timeline` | &lt;1 mois · 1–3 · 3–12 · &gt;12 · ND |
| `paper_interest` | TF · bail · délibération · ND |
| `property_type` | terrain · maison · appart · ND |
| `listing_id` | Si depuis fiche |
| `sim_scenario` | JSON inputs/outputs outil |
| `notes` | Texte agent |

### 3.3 Ops

| Champ | |
| --- | --- |
| `source` | cf. §2 |
| `utm_*` | campaign / medium / content |
| `owner_agent_id` | Assigné |
| `stage` | cf. §4 |
| `score` | 0–100 soft |
| `sla_first_human_at` | Timestamp |
| `next_action_at` | Relance |
| `lost_reason` | Enum |
| `consent_contact` | bool · base RGPD-like |

---

## 4. Pipeline stages (Y1 unifié)

Aligné `juridique-operations/04` §11 — **une** board multi-intent + filtres.

| Stage | Libellé | Entrée typique | Sortie |
| --- | --- | --- | --- |
| **`new`** | Lead entrant | Form / WA / ads | Accusé + assign |
| **`contacted`** | 1ʳᵉ réponse humaine | Agent WA | Qualif |
| **`qualified`** | Intent + budget/zone | Script 5 Q | Routage parcours |
| **`appointment`** | RDV / visite calée | Agenda | Visite |
| **`proposal`** | Estimation / shortlist / simu poussée | Docs envoyés | Décision |
| **`mandate`** | Mandat signé (vente/gestion) | Supply / bailleur | Ops mandat |
| **`diligence`** | Vérif papiers | Pack Secure / V2 | GO / NO-GO |
| **`negotiation`** | Offre / contre | Écrit | Notaire |
| **`notary`** | Séquestre / acte | Notaire | Won |
| **`won`** | Encaissé / bail signé | $ ou LTV | Upsell |
| **`nurture`** | Pause active | Soft no | Re-entry |
| **`lost`** | Clos négatif | Reason | Option `follow_later` 90 j |

**Sous-pipelines (vues filtrées) :**

| Vue | Stages focus |
| --- | --- |
| Demand (achat/loc) | new → … → notary/won |
| Supply (vendeur) | new → proposal(estimation) → mandate → … |
| Gestion | new → qualified → mandate → won (récurrent) |
| Diaspora Secure | + diligence obligatoire avant notary |
| PartnerLead | `sent` → `recalled` → `quoted` → `signed` → `commission_due` → `paid` |

Ne pas sur-ingénierer 13 colonnes Day 1 : **12 stages** ci-dessus suffisent ; raffiner après volume.

---

## 5. Flux technique capture → CRM

```
[Form Next.js / Server Action]
        │
        ├─► Validate (3–4 fields)
        ├─► Upsert Lead (phone/email match)
        ├─► Tag source + UTM + listing_id
        ├─► Assign owner (rules)
        ├─► Event analytics (lead_created)
        │
        ├─► Notif agent (WA / email / Slack-like)
        ├─► Accusé user (WA template or thank-you page)
        └─► Task: first_human_response (SLA clock start)
```

**WA inbound (V0 lean) :** agent crée/associe lead manuellement **&lt; 15 min** après 1ʳᵉ réponse · ou inbox partagée loggue auto (V1+).

**Règle anti-fuite :** lead simu / estimation **ne reste pas** sur téléphone perso sans record CRM le jour même.

---

## 6. SLA (contrats ops)

### 6.1 Première réponse

| Classe lead | Accusé auto | Humain | Aspiration |
| --- | --- | --- | --- |
| Standard (catalogue, guide) | &lt; 2 min | **&lt; 24 h** (≥ 90 %) | &lt; 5 h |
| Chaud (visite demandée, offre, estimation) | &lt; 2 min | **&lt; 1 h** ouvrées | &lt; 15 min |
| Estimation vendeur | &lt; 2 min | **&lt; 2–24 h** | &lt; 2 h |
| Post-visite feedback | — | **&lt; 24 h** | &lt; 4 h |
| PartnerLead rappel | — | **&lt; 48 h** | — |
| Hors horaires | Message auto « reprise [heure] » | Reprise J+1 matin | — |

Horaires affichés sur WA Business + site.

### 6.2 Transitions (cibles)

| Transition | Cible |
| --- | --- |
| Qualified → appointment | &lt; 72 h |
| Estimation done → mandat (chaud) | &lt; 7 j |
| Offre → diligence lancée | &lt; 48 h |
| Inactivité 7 j | Alerte owner + escalate GER |
| Lost → follow_later | Requeue **90 j** |

### 6.3 Escalade

| Condition | Action |
| --- | --- |
| `new` sans humain &gt; 24 h | Alerte GER + reassign |
| Lead diaspora Secure sans diligence tag | Bloquer stage `notary` |
| Double assign | Merge + note |
| Score ≥ 80 (budget+timeline) | Notif prioritaire senior |

---

## 7. Scoring soft (Y1)

Score 0–100 indicatif — **aide au tri**, pas automagic AI obligatoire V0.

| Signal | Points (ex.) |
| --- | ---: |
| Intent clair + zone | +15 |
| Budget renseigné | +15 |
| Timeline &lt; 3 mois | +20 |
| Depuis fiche / sim_complete | +15 |
| Diaspora + demande Secure | +10 |
| Estimation vendeur | +15 |
| Réponse &lt; 1 h aux questions agent | +10 |
| Ghost 7 j | −20 |

**Hot ≥ 70** → prioriser file · **Warm 40–69** → séquence standard · **Cold &lt; 40** → nurture contenu.

---

## 8. Scripts & messages (ops)

### 8.1 Accusé auto (hors horaires / immédiat)

> Merci pour votre message EverGreen. Un conseiller vous répond sous **[X h / avant 10 h]**.  
> En attendant : précisez *acheter / louer / vendre / gérer* + zone.  
> *Nous ne demandons jamais de paiement Wave au vendeur.*

### 8.2 Qualif 5 questions (flou → intent)

1. Vous souhaitez **acheter, louer, vendre ou faire gérer** ?  
2. Zone / quartier ?  
3. Budget approximatif (FCFA) ?  
4. Délai (ce mois / 3 mois / plus) ?  
5. Sur place ou **depuis l’étranger** ?

### 8.3 Templates agent (réponses rapides WA)

| Code | Usage |
| --- | --- |
| `T-VISITE` | Proposer créneaux visite |
| `T-PAPIER` | Expliquer TF/bail/délibération + lien guide |
| `T-SIMU` | Lien outils + « on lit les chiffres ensemble » |
| `T-SECURE` | Protocole diaspora · anti-Wave |
| `T-ESTIM` | Confirmation RDV estimation ≤ 48 h CR |

Catalogue culturel élargi → manuel agent / com.

---

## 9. Routing & ownership

| Règle | Assignation |
| --- | --- |
| Listing `agent_id` sur fiche | Owner = agent du mandat |
| Zone Z1 définie | Agent zone si dispo |
| Estimation / supply | File « vendeurs » |
| Gestion `/gerer` | File gestion / GER |
| Diaspora Secure | Agent formé diaspora (+ backup) |
| Défaut | Round-robin actifs |
| Congé | Backup obligatoire |

**Capacité :** plafonner nouveaux `new` / agent / jour pour éviter noyer AC1 (`plan-commercial`).

---

## 10. Events analytics (site)

| Event | Quand | Props clés |
| --- | --- | --- |
| `lead_form_submit` | Form OK | source, intent |
| `lead_wa_click` | Clic WA | listing_id, page |
| `sim_start` / `sim_complete` | Outils | outil_id |
| `sim_cta_wa` / `sim_email` | Post-résultat | scénario_id |
| `lead_created` | CRM upsert | lead_id, score |
| `sla_breach` | Clock dépassé | stage, owner |

Dashboard : **speed-to-lead médian** · % &lt; 24 h · WA→RDV · sim→WA · source mix.

---

## 11. Phasage produit

| Phase | Livrable CRM |
| --- | --- |
| **V0** | Table CRM + forms webhook + notif + tags + stages manuels · WA Business société · SLA mesuré à la main / Sheet |
| **V1** | `sim_scenario` sur lead · events `sim_*` · PartnerLead objet · templates WA |
| **V2** | Stage `diligence` gates · checklists liées |
| **V3** | Tickets portail → CRM (loyers / pannes) |
| **V4** | Pack Secure fields (inspection, POA, séquestre) |
| **Scale** | WA Cloud API shared inbox · CRM SaaS · auto-score |

**Interdit V0 :** attendre HubSpot parfait avant de logger les leads.

---

## 12. KPI CRM (cibles esprit)

| KPI | Cible |
| --- | ---: |
| % leads avec owner &lt; 15 min | ≥ 95 % |
| 1ʳᵉ réponse humaine &lt; 24 h | ≥ 90 % |
| Lead WA → RDV | 25–40 % |
| Estimation → mandat (chaud) | Track · ↑ |
| `sim_complete` → contact | Mesurer |
| PartnerLead rappel &lt; 48 h | ≥ 80 % |
| Doublons merge / mois | ↓ |
| Incidents « lead sur perso perdu » | **0** |

---

## 13. Conformité & data (rappel)

- Consentement contact · finalité agence  
- Pas de revente liste tél  
- Rétention : archive deal **5 ans** esprit ops ; détail → `19-data-flow-rgpd`  
- Scans pièces : accès restreint agents  
- Meta WA : pas de spam hors fenêtre / templates API si blast  

---

## 14. Anti-patterns

| Anti | Fix |
| --- | --- |
| Lead dans WA perso non loggé | Inbox société + CRM day-0 |
| Form 8 champs | 3–4 + qualif WA |
| Email notif seule sans task | Task + SLA clock |
| Même stage « Open » pour tout | Pipeline §4 |
| Intro partenaire sans PartnerLead | Objet + SLA 48 h |
| Clos lost sans reason | Enum obligatoire |
| Auto-bot qui promet TF / délais État | Humain sur claims sensibles |

---

## 15. Liens

| Doc | Rôle |
| --- | --- |
| [`../../juridique-operations/04-process-par-parcours.md`](../../juridique-operations/04-process-par-parcours.md) | Router + stages métier |
| [`../../plan-commercial/03-canaux-acquisition.md`](../../plan-commercial/03-canaux-acquisition.md) | WA setup · KPI canaux |
| [`02-parcours-utilisateurs.md`](./02-parcours-utilisateurs.md) | Journeys |
| [`07-integrations.md`](./07-integrations.md) | WA API · webhooks |
| [`09-back-office-agents.md`](./09-back-office-agents.md) | UI agent CRM |

---

## 16. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| WA CRM immo 2026 | Shared inbox · stages · auto-ack · response time = métrique #1 |
| Speed-to-lead | &lt; 5 min idéal industrie · drop fort au-delà |
| Pipeline templates | New → Qualified → Visit → Negotiation → Closed (+ Lost / Later) |
| Form → CRM | Webhook immédiat · assign · first touch parallèle · nurture long |

---

*CRM & leads EverGreen Site v1.0 — sept. 2026. WA société · CRM jour 0 · SLA 24 h / 5 h · pipeline unifié · PartnerLead tracké.*
