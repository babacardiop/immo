# Priorités MVP — Vague 0–1

**Document :** Dossier · Tech · 03  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-vision-produit.md`](./01-vision-produit.md) · [`02-architecture-cible.md`](./02-architecture-cible.md) · [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) · [`site/10-roadmap-features.md`](./site/10-roadmap-features.md) · [`site/03-wireframes-mvp.md`](./site/03-wireframes-mvp.md) · [`site/12-user-stories-backlog.md`](./site/12-user-stories-backlog.md)  
**Aval :** Sprints eng · kickoff Vague 0/1 · [`05-cahier-des-charges-technique.md`](./05-cahier-des-charges-technique.md)

> **Rôle :** figer le **scope build MVP** = Vague **0 + 1** uniquement — pages, CRM léger, listing curated, simus — avec MoSCoW, Done gates et Won’t explicite.  
> Inventaire exhaustif FEAT → `site/10`. Stories → `site/12`.

---

## 0. En une phrase

MVP = **agence en ligne crédible (V0)** puis **différenciation acheteur terrain (V1)** — catalogue + CRM + BO + 3 simus + 3 partenaires ; tout le reste est icebox.

```
V0 (S0–6)  Socle curated + WA/CRM + agent
V1 (M1–2)  Simus + embeds + PartnerLead + piliers
     Done V1  ⇒  message hub autorisé
```

---

## 1. Pourquoi ce découpage

| Contrainte | Choix |
| --- | --- |
| Confiance SN avant volume | V0 = curation + papier + SLA — pas marketplace |
| Différenciation vs Expat | V1 = outils décision + P (pas plus d’annonces) |
| Capacité PME | ≤12 ouvertures / vague · Must ≤60 % |
| Lab | L0 only pendant V0–1 — **interdit** de retarder simus pour crawl |

Bench MVP immo 2026 : search + listing detail + contact path + admin/leads d’abord ; calculateurs = phase différenciante dès qu’il y a confiance ([Wowlabz](https://wowlabz.com/define-real-estate-mvp-apps-guide/), [MercuryMinds](https://www.mercuryminds.com/blog/real-estate-portal-features-the-complete-checklist-2026/), [Oril](https://oril.co/blog/real-estate-product-roadmaps-how-to-go-from-mvp-to-data%E2%80%91driven-platform/)) — EverGreen place les **3 simus en V1 Must** (cœur hub), pas en V7.

---

## 2. Outcomes & KPI Done

### 2.1 Vague 0 — « L’agence existe en ligne »

| KPI | Cible indicative |
| --- | --- |
| Mandats / listings `published` | ≥ seuil GER (ex. 15–30) avec **papier** renseigné |
| Lead → 1ʳᵉ réponse humaine | ≥90 % &lt; **24 h** |
| Accusé auto / confirmation | &lt; 2 min |
| Pastille papier above-the-fold | 100 % fiches vente |
| HTTPS + legal + NAP | Live |

### 2.2 Vague 1 — « Je vois → je chiffre → je parle à un pro »

| KPI | Cible indicative |
| --- | --- |
| 3 simus live ungated | PUB-01/02/03 |
| Embeds sur fiches terrain | ● |
| `sim_complete` tracké | Events OK |
| Partenaires BTP / archi / notaire | **3 conventions + CTA** live |
| PartnerLead créé depuis CTA | ● |
| Piliers blog | ≥2 avec CTA outil/P |
| Message hub externe | **Autorisé** seulement ici |

---

## 3. MoSCoW consolidé MVP

### 3.1 Pages & surfaces

| Surface | Vague | MoSCoW | Note |
| --- | :---: | :---: | --- |
| `/` home brand + search | V0 | **Must** | Pas de stats hero |
| `/acheter` + `/louer` + fiches | V0 | **Must** | Filtres + papier vente |
| `/acheter?view=map` | V0 | Should | Leaflet |
| Landings zone (3–5) | V0–1 | Should | Anti-doorway |
| `/gerer` + `/gerer/demande` | V0 | **Must** | Landing + form |
| `/diaspora` soft | V0 | **Must** | « Pas Wave vendeur » |
| `/agence/*` how + contact + legal | V0 | **Must** | |
| `/guides` teaser TF | V0 | **Must** | |
| `/outils` + 3 pages simu | V1 | **Must** | Nav L1 dès V1 |
| Embed simu fiche terrain | V1 | **Must** | |
| `/espace/agent` CRUD | V0 | **Must** | Auth |
| Portails L/P | V3 | **Won’t** MVP | |
| `/observatoire` | V7 | **Won’t** MVP | |

### 3.2 Listing (catalogue)

| Item | Vague | MoSCoW |
| --- | :---: | :---: |
| CRUD agent + publish gate papier | V0 | **Must** |
| Badges TF / bail / délibération + disc | V0 | **Must** |
| Photos + prix FCFA + geo soft | V0 | **Must** |
| Statuts draft/published/sold/… | V0 | **Must** |
| Schema.org RealEstateListing | V0 | **Must** |
| Open posting vendeur | — | **Won’t** |
| Boost sans diligence | V2+ | **Won’t** MVP |

### 3.3 CRM léger

| Item | Vague | MoSCoW |
| --- | :---: | :---: |
| Lead société (phone/email, source, intent, owner) | V0 | **Must** |
| Sources `wa_*` / `form_*` | V0 | **Must** |
| Deep link WA prérempli | V0 | **Must** |
| Forms 3–4 champs + ack | V0 | **Must** |
| Stages + notes + nurture≠lost | V0 | **Must** |
| File agent + overdue soft | V0 | **Must** / Should dashboard |
| PartnerLead + attribution | V1 | **Must** |
| HubSpot full | later | Could / Won’t V0 |
| WABA Cloud API | scale | **Won’t** J0 (wa.me OK) |

Stack lean V0 OK : DB app **ou** table Airtable/Sheet **miroir temporaire** avec cutover PG avant volume (`02`).

### 3.4 Simus (Vague 1)

| Outil | MoSCoW | Règle |
| --- | :---: | --- |
| Mensualité **étalé / loc-vente** | **Must** | Disc ≠ banque |
| Coût construction | **Must** | Estimation ≠ devis |
| Budget total | **Must** | Agrège |
| Résultat ungated + CTA in-result | **Must** | |
| `sim_scenario` → CRM si contact | **Must** | |
| Frais acquisition | V2 | **Won’t** MVP |
| Estimation vendeur produit | V5 | Soft form V0 OK only |
| Simu « prêt bancaire » | — | **Won’t** forever |

### 3.5 Contenu & partenaires

| Item | Vague | MoSCoW |
| --- | :---: | :---: |
| Comment on travaille | V0 | **Must** |
| Guide TF vs bail vs délibération | V0 | **Must** |
| Pilier construction + TF | V1 | **Must** |
| P constructeur / archi / notaire | V1 | **Must** |
| Nouveaux add-ons (caution, solaire…) | — | **Won’t** MVP |

---

## 4. Backlog ordonné (build)

Aligné sprints `site/12` :

| Ordre | Bloc | Livrables |
| ---: | --- | --- |
| 1 | Fondations | Next · PG · auth agent · storage · tokens |
| 2 | Listing | Schema Listing · BO CRUD · publish gate · media |
| 3 | Public catalogue | Home · acheter/louer · fiche · WA · PaperBadge |
| 4 | CRM léger | `/api/leads` · forms · stages · file agent · SLA |
| 5 | Confiance | Agence how · guide TF · legal · SEO schema |
| 6 | Polish V0 | Map should · landings · OG · empty states |
| **Gate** | **Done V0** | KPI §2.1 |
| 7 | Outils | `/outils` · 3 simus · disc · events |
| 8 | Embeds + P | Fiche terrain embeds · PartnerLead · CTA P |
| 9 | Contenu V1 | 2 piliers + CTAs |
| **Gate** | **Done V1** | KPI §2.2 · message hub OK |

Ne pas démarrer bloc 7 avant Gate V0 (sauf spike design parallèle).

---

## 5. Critical path utilisateur (preuve MVP)

```
Home → Acheter + filtre Terrain/TF → Fiche
  → (V1) Simu embed → résultat → WA / Intro constructeur
```

≤ ~5 taps jusqu’à contact ([site/03](./site/03-wireframes-mvp.md)).  
Recette CdCF R1–R12 (`site/11`) = checklist QA MVP.

---

## 6. Hors scope explicite (MVP)

| Domaine | Vague min |
| --- | :---: |
| Portails proprio / locataire · EDL | V3 |
| Diligence funnel · frais acquisition outil | V2 |
| Pack diaspora inspection / POA / multi-devise | V4 |
| Observatoire / carte prix | V7 / L4 |
| Paiements Wave/OM prod | V3+ |
| App native · i18n EN | — |
| Crawl lab scale | post-V0 spike only |
| Marketplace / WL / MFI | V8+ |
| Saved search / favoris compte public | later |

**Règle mid-vague :** couper Could — **ne pas** ajouter depuis cette liste.

---

## 7. Dépendances non-eng

| Dépendance | Vague | Owner |
| --- | :---: | --- |
| Mandats + photos réels | V0 | OD |
| Numéro WA Business société | V0 | OD |
| Conventions 3 P signées | V1 | Commercial |
| Copy disclaimers validés | V0–1 | OD + counsel soft |
| Politique confidentialité | V0 | Contenu (`19`) |
| Barèmes simu PUB | V1 | Produit + lab L0 |

---

## 8. Capacité & risques scope

| Risque | Mitigation |
| --- | --- |
| « Juste une landing zone de plus » | Should only · cut mid-V0 |
| CRM parfait avant catalogue | Catalogue+WA d’abord · CRM min viable |
| Simu exactitude parfaite | Fourchettes + disc · itérer barèmes |
| Attendre Figma HF | Lo-fi `15` suffit pour V0 code parallèle tokens |
| Ouvrir V2 items | Kickoff figé ce doc |

---

## 9. Definition of Done MVP global

- [ ] Gate Vague 0 (§2.1)  
- [ ] Gate Vague 1 (§2.2)  
- [ ] Pas d’item Won’t §6 en prod  
- [ ] Events analytics cœur branchés  
- [ ] ACL agent (own leads) OK  
- [ ] Recette R1–R12 passée  
- [ ] GER signe « hub message » post-V1  

---

## 10. Liens

| Doc | Usage |
| --- | --- |
| [`site/10-roadmap-features.md`](./site/10-roadmap-features.md) | FEAT-IDs |
| [`site/12-user-stories-backlog.md`](./site/12-user-stories-backlog.md) | US-V0/V1 |
| [`site/03-wireframes-mvp.md`](./site/03-wireframes-mvp.md) | Écrans |
| [`02-architecture-cible.md`](./02-architecture-cible.md) | Stack |
| [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) | Calendrier vagues |

---

## 11. Sources

| Source | Apport |
| --- | --- |
| hub-roadmap · site 10/03/12/11 | Scope EverGreen |
| Wowlabz / MercuryMinds / Oril / CompletApp 2026 | MVP = search+detail+contact+admin ; calculators = différenciateur scoped |

---

*Priorités MVP EverGreen Tech v1.0 — sept. 2026. V0 socle curated/CRM/BO · V1 simus+3P · Won’t list dure · lab ne bloque pas.*
