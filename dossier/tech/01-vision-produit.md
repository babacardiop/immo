# Vision produit — Agence-first, outils = levier

**Document :** Dossier · Tech · 01  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`../../docs/positioning.md`](../../docs/positioning.md) · [`../../docs/hub-roadmap.md`](../../docs/hub-roadmap.md) · [`../../docs/proptech-analysis.md`](../../docs/proptech-analysis.md) · [`../00-synthese/01-executive-summary.md`](../00-synthese/01-executive-summary.md) · [`site/11-cahier-des-charges-fonctionnel.md`](./site/11-cahier-des-charges-fonctionnel.md)  
**Aval :** [`02-architecture-cible.md`](./02-architecture-cible.md) · [`03-prios-mvp.md`](./03-prios-mvp.md) · [`site/`](./site/) · [`research-lab/`](./research-lab/)

> **Rôle :** ancrer la **vision produit digitale** — ce qu’on construit, pour qui, et ce qu’on refuse — avant archi / CdCT.  
> Source métier : `positioning` · calendrier hub : `hub-roadmap`.

---

## 0. En une phrase

EverGreen est une **agence immobilière full-service** au Sénégal ; le site PropTech est le **levier** (catalogue, outils, CRM, portails) — **pas** une marketplace pure ni un SaaS sans terrain.

```
MÉTIER = agence (mandats, confiance, commissions, gestion)
OUTIL  = hub digital (curated + simus + WA/CRM + partenaires)
```

---

## 1. Problème qu’on résout

| Pour qui | Douleur SN aujourd’hui |
| --- | --- |
| Acheteur / diaspora | Classifieds bruyants, papiers flous, Wave vendeur, ghosting |
| Bailleur | Loyers à la main, zéro reporting |
| Vendeur | FB/Expat sans process, curieux non filtrés |
| Agence elle-même | Leads perso, pas d’outils décision, contenu mort |

Le digital « marketplace volume » **aggrave** la méfiance. Le digital « agence outillée » **industrialise** la confiance.

---

## 2. Vision (3–5 ans)

Devenir le **hub immobilier de référence** à Dakar / Z1 (puis expansion) :

> *Un seul interlocuteur pour trouver, sécuriser, notariser, construire et gérer — biens vérifiés, outils pour décider, partenaires pour exécuter.*

**Preuve de succès :**

| Signal | Lecture |
| --- | --- |
| Mandats curated live + SLA leads | Agence opère en ligne |
| Gestion locative digitale | Cash récurrent |
| Simus + 3+ P live | Hub différencié (post Vague 1) |
| Observatoire sourcé (L4) | Autorité data — sans devenir portail |

Message hub externe **seulement après** Vague 1 Done (`hub-roadmap`).

---

## 3. Principes produit non négociables

| # | Principe | Implication build |
| ---: | --- | --- |
| 1 | **Agence-first** | Features servent mandats, visites, closing, gestion — pas « vanity PropTech » |
| 2 | **Outils = levier** | Simus / checklists convertissent vers WA & partenaires — jamais un produit isolé |
| 3 | **Pas marketplace pure** | **Curated** : l’agence publie ; pas d’open posting vendeur |
| 4 | **Papiers first-class** | TF / bail / délibération visibles ; délibération ≠ TF |
| 5 | **Orchestration ≠ exécution** | Partenaires font BTP/notaire ; EverGreen apporte & tracke |
| 6 | **Société > perso** | CRM leads société · WA Business |
| 7 | **1 parcours / vague** | Anti-dispersion catalogue add-ons |
| 8 | **Confiance SN** | Visage, terrain, notaire — digital amplifie, ne remplace pas |

---

## 4. Ce qu’on est / n’est pas

### 4.1 On est

| Couche | Description |
| --- | --- |
| Métier | Agence vente · location · **gestion** · étalé / loc-vente |
| Digital | Catalogue curated · carte · simus · CRM/WA · BO agents · portails L/P · SEO guides |
| Hub | Add-ons + partenaires contractualisés + contenu décisionnel |
| Data | Lab / Observatoire en **voie parallèle** (ne bloque pas V0–1) |

### 4.2 On n’est pas

| Anti-modèle | Pourquoi |
| --- | --- |
| Expat-Dakar « plus beau » | Volume sans curation ni responsabilité |
| Marketplace ouverte | Arnaques, marge pubs, guerre inventory |
| Blog conseil isolé (Keur City-like) | Contenu sans closing |
| SaaS gestion locative pur (Noflaye-like) | On **opère** l’agence ; le soft nous sert |
| Pure fiche rural (Senhectare only) | Trop étroit vs urban full catalog |
| Plateforme crédit / banque | Simu = **étalé** ; crédit via courtier P |
| Escrow ledger agence | Séquestre via notaire |

Aligné `positioning` § Not.

---

## 5. Deux couches (architecture mentale)

```
┌─────────────────────────────────────────────────────────┐
│  COUCHE MÉTIER — AGENCE                                  │
│  Mandats · Visites · Closing · Loyers · Commissions      │
│  Confiance locale · Notaire · Terrain                    │
└──────────────────────────▲──────────────────────────────┘
                           │ amplifiée par
┌──────────────────────────┴──────────────────────────────┐
│  COUCHE DIGITALE — HUB PROPTECH                          │
│  Site curated · Outils · CRM · Portails · Partenaires    │
│  SEO / WA · (plus tard) Observatoire                     │
└─────────────────────────────────────────────────────────┘
```

- **Client / proprio** : on parle **agence**.  
- **Produit / eng** : on construit de la **PropTech** au service du métier.

Bench 2026 : wedge agency-workflow > grand platform d’abord ([Noseberry PropTech founders](https://noseberrydigitals.com/guides/proptech-for-founders)) ; build quand le process **est** l’avantage ([Softomate agents](https://www.softomatesolutions.com/blog/proptech-uk-estate-letting-agents-build-vs-buy/)) ; portails ont listings, **pas** la data de transaction ([properti autopilot](https://properti.com/ch/en/insights/properti/portals-crms-and-traditional-agents-which-part-of-real-estate-survives-the-autopilot/)) — d’où agence-first qui **possède** le closing.

---

## 6. Proposition de valeur par persona

| Persona | Promesse produit |
| --- | --- |
| Mamadou (acheteur) | Voir le papier · chiffrer mensualité/construction · parler à un pro |
| Fatou (diaspora) | Parcours Secure · pas Wave vendeur · inspection / POA via P |
| Aïssatou (locataire) | Bien réel · bail clair · (V3) quittances en ligne |
| Ousmane (bailleur) | On encaisse, on reverse, tu vois |
| Marième (vendeuse) | Mise en marché propre · curieux filtrés |
| Agent | BO lean · leads société · publish gated |

---

## 7. Modèle économique (rappel produit)

| Revenu | Lien produit |
| --- | --- |
| Commission vente / location | Catalogue + CRM + closing |
| **% gestion locative** | Portails + encaissement (V3+) |
| Frais / % étalé · loc-vente | Simus + échéanciers |
| Commission d’apport partenaires | CTA outils → PartnerLead |
| (Plus tard) services annexes | Vagues 6–7 |

Sans gestion, on reste un broker de leads. **Avec** gestion + hub P = récurrence + réseau.

---

## 8. Formule hub (produit)

```
Agence full-service  +  Add-ons (outils)  +  Partenaires (exécution)
     = parcours décision → closing → chantier / gestion
     = double revenu (métier + apport)
```

| Élément | Rôle digital |
| --- | --- |
| Features cœur (F) | Site, catalogue, CRM, BO, portails |
| Add-ons (A) | Simus, checklists, packs — lead magnets |
| Partenaires (P) | CTA + SLA + commission — hors métier EverGreen |
| Contenu (C) | Guides → CTA outil/P de la vague |

Catalogue stratégique large · **build** étroit (≤12 ouvertures / vague).

---

## 9. North-star & KPI produit

| Horizon | North-star | Proxy |
| --- | --- | --- |
| V0 | Agence existe en ligne | Mandats live · leads WA SLA · % papier |
| V1 | Différenciation acheteur terrain | `sim_complete` · PartnerLeads · 3 P live |
| V3 | Récurrence | Mandats gestion · loyers digitaux |
| Y2–3 | Hub reconnu | NPS · GMV services · Observatoire cité |

Anti-métrique : volume d’annonces type classifieds · vanity MAU sans closing.

---

## 10. Roadmap vision (vagues) — rappel

| Vague | Outcome produit |
| --- | --- |
| 0 | Socle catalogue curated + CRM + BO |
| 1 | 3 simus + embeds + 3 P |
| 2 | Sécuriser (diligence, frais) |
| 3 | Portails location / gestion |
| 4 | Pack diaspora |
| 5–7 | Gros tickets · chantier · densifier / Observatoire |
| 8+ | Expansion **si** preuves (WL, matériaux…) |

Détail FEAT → `site/10` · CdCF → `site/11` · prios MVP → `03-prios-mvp`.

---

## 11. Implications pour la stack tech

| Choix vision | Conséquence tech |
| --- | --- |
| SEO + fiches confiance | Next.js SSR · Schema RealEstateListing |
| Curated agent-only | Auth BO · publish gates papier |
| WA-first SN | Deep links · pas app native Y1 |
| Outils levier | Embeds natifs · events CRM |
| Pas marketplace | Pas de self-serve vendeur · pas IDX open |
| Lab parallèle | Pas bloquer V0–1 sur crawl |

Archi détail → `02-architecture-cible` · stack → `docs/tech-stack.md`.

---

## 12. Risques vision & garde-fous

| Risque | Garde-fou |
| --- | --- |
| Glisser marketplace | Gate publish · pas open posting |
| Contenu sans produit | Chaque pilier → CTA vague |
| Outils sans closing | CTA WA / PartnerLead in-result |
| PropTech pure sans face | Message agence · mandats terrain |
| Dispersion add-ons | Budget vague · Won’t list |
| Lab mange le hub | Sync L* après V0 live |

---

## 13. Décisions verrouillées (produit)

| Décision | Statut |
| --- | --- |
| Agence-first | **Lock** |
| Curated catalogue | **Lock** |
| Outils = lead magnets brandés | **Lock** |
| Étalé ≠ crédit banque (copy) | **Lock** |
| Observatoire après L4 | **Lock** |
| Multi-langue EN Y1 | **Won’t** |
| App native Y1 | **Won’t** |

---

## 14. Sources

| Source | Apport |
| --- | --- |
| `positioning.md` · `hub-roadmap.md` | Métier + hub SN |
| Site `01`–`19` · lab `07` | Exécution déjà forgée |
| Noseberry / Softomate / properti 2026 | Wedge agency · build vs buy · transaction data > portal |
| Concurrent SN (Expat, Senhectare, blogs) | Anti-modèles |

---

## 15. Liens

| Doc | Rôle |
| --- | --- |
| [`02-architecture-cible.md`](./02-architecture-cible.md) | Schéma technique (suivant) |
| [`03-prios-mvp.md`](./03-prios-mvp.md) | Scope Vague 0–1 |
| [`site/README.md`](./site/README.md) | Inventaire UX/eng site |
| [`../../docs/positioning.md`](../../docs/positioning.md) | Positionnement métier |

---

*Vision produit EverGreen Tech v1.0 — sept. 2026. Agence-first · outils levier · pas marketplace · papiers & confiance SN · hub = F+A+P+C.*
