# Parcours utilisateurs — Journeys hub

**Document :** Dossier · Tech · Site · 02  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`01-sitemap-et-ia.md`](./01-sitemap-et-ia.md) · [`../../00-synthese/05-fiches-personas.md`](../../00-synthese/05-fiches-personas.md) · [`../../etude-de-marche/02-analyse-demande.md`](../../etude-de-marche/02-analyse-demande.md) · [`../../../docs/positioning.md`](../../../docs/positioning.md) · [`../../../docs/hub-roadmap.md`](../../../docs/hub-roadmap.md)  
**Aval :** [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) · [`04-crm-et-leads.md`](./04-crm-et-leads.md) · [`12-user-stories-backlog.md`](./12-user-stories-backlog.md)

> **Rôle :** cartographier les **5 journeys métier** (acheteur, vendeur, locataire, bailleur, diaspora) — étapes, touchpoints, émotions, frictions, réponses hub.  
> Personas détail → `05-fiches-personas`. Écrans → `03`. Pipeline CRM → `04`.

---

## 0. Cadre commun

### 0.1 Stages (modèle)

Aligné journey maps immo 2025–26 (awareness → post) + réalité SN (WA first) :

| Stage | Code | Question user |
| --- | --- | --- |
| **Découverte** | D | « Où chercher sans me faire arnaquer ? » |
| **Évaluation** | E | « Est-ce le bon bien / la bonne agence ? » |
| **Décision** | C | « Je m’engage — visite / mandat / simu » |
| **Transaction** | T | « On sécurise papiers & paiement » |
| **Après** | A | « On construit / loue / gère / recommande » |

### 0.2 Principes parcours EverGreen

| # | Principe |
| ---: | --- |
| 1 | **Routes séparées tôt** — acheteur ≠ vendeur ≠ louer ≠ gérer ≠ diaspora (pas un formulaire unique) |
| 2 | **Confiance au point d’objection** — pastille papier / refus Wave près du CTA, pas seulement footer |
| 3 | **Friction basse au 1er pas** — 3–4 champs max form / WA one-tap ; qualification progressive |
| 4 | **SLA &lt; 24 h** premier contact humain (idéalement &lt; 4 h ouvrées) |
| 5 | **Chiffres avant engagement** (acheteur / diaspora) — simus ungated |
| 6 | **Preuves avant paiement** — diligence / séquestre / notaire |
| 7 | **Après = revenue** — gestion, BTP, upsell accession |

### 0.3 Matrice journey × persona × vague

| Journey | Persona ancre | Vague cœur | Entrée site |
| --- | --- | :---: | --- |
| **J1 Acheteur** | Mamadou | **V1** | `/acheter` · `/outils` |
| **J2 Vendeur** | Marième | V0–V5 | `/outils/estimation` · `/agence/contact` |
| **J3 Locataire** | Aïssatou | V0 · **V3** | `/louer` |
| **J4 Bailleur** | Ousmane / Ibrahima | **V3** | `/gerer` |
| **J5 Diaspora** | Fatou (+ Ibrahima) | **V2–V4** | `/diaspora` · guides D |

---

## 1. J1 — Acheteur (terrain / primo) — Mamadou

### 1.1 JTBD

> *Savoir si je peux payer, lire le vrai papier, puis construire sans me ruiner.*

### 1.2 Storyboard

```
FB/WA/SEO → /acheter terrain + filtre papier
    → fiche (pastille TF/bail) → simu mensualité + construction (V1)
    → WA « Visite samedi » → visite terrain + lecture papier
    → diligence (V2) → notaire → closing / étalé
    → apport BTP/archi → (plus tard) construire
```

### 1.3 Étapes détaillées

| Stage | Actions user | Touchpoints hub | Emotion | Friction | Réponse hub |
| --- | --- | --- | --- | --- | --- |
| **D** | Scroll FB/CoinAfrique · Google « terrain [zone] » | SEO landing zone · cards WA Status | Impatience | Bruit classifieds | Catalogue curated · map |
| **E** | Compare prix · photos · papier affiché | Fiche · pastille · guide TF vs bail · simus | « Je peux ? » anxiété | Coût construction opaque | PUB-01/02/03 ungated |
| **C** | Demande visite · négocie | WA / form 3 champs · agent | Excitation + méfiance | Ghosting | SLA &lt; 24 h · script |
| **T** | Paie acompte structuré | Checklist diligence · notaire P | Stress closing | Pression « Wave maintenant » | **Refus Wave vendeur** · séquestre si besoin |
| **A** | Cherche devis chantier | Intro BTP/archi · `/outils/pret-a-batir` | Soulagement / peur chantier | Devis fantômes | Pack Terrain→Maison |

### 1.4 Moments de vérité

1. Résultat simu mensualité (go/no-go instantané)  
2. Agent explique TF ≠ délibération **sur place**  
3. Devis partenaire &lt; 48–72 h post-closing  

### 1.5 KPI parcours

`sim_complete` · `visite_booked` · `diligence_started` · `closing` · `partner_lead_btp`

### 1.6 Écrans critiques (→ `03`)

`/acheter` · fiche terrain · `/outils/mensualite|construction|budget-total` · thread WA · checklist diligence

---

## 2. J2 — Vendeur — Marième

### 2.1 JTBD

> *Vendre au juste prix, sans curieux, avec un seul interlocuteur qui publie pour moi.*

### 2.2 Storyboard

```
Urgence liquidité → /outils/estimation ou contact agence
    → RDV estimation (fourchette + plan mise en marché)
    → mandat (simple puis exclusif si preuve d’effort)
    → shoot / fiche curated · reporting vues
    → visites filtrées → offre → notaire → closing
    → (option) cross-sell : réemploi fonds / locatif
```

### 2.3 Étapes

| Stage | Actions | Touchpoints | Emotion | Friction | Réponse |
| --- | --- | --- | --- | --- | --- |
| **D** | Multi-poste Expat · appelle 2 agences | SEO « estimer bien Dakar » · WA | Urgence | Chaos multi-prix | Hook : *On publie (pas vous)* |
| **E** | Compare promesses | Page estimation · `/agence/comment-on-travaille` | Scepticisme | Agences qui ne rappellent pas | Fourchette écrite + plan 7 j |
| **C** | Signe mandat | RDV · contrat · checklist docs | Soulagement / peur exclusif | Exclusif qui « dort » | Reporting hebdo vues/leads |
| **T** | Accepte offre | Négociation agent · notaire | Stress | Visiteurs touristes | Filtrage qualification |
| **A** | Fonds reçus | Remerciement · évent. gestion si garde un bien | — | — | Nurture soft |

### 2.4 Moments de vérité

1. Estimation livrée sous **48 h**  
2. 1ʳᵉ fiche en ligne (photos + papier)  
3. 1ʳᵉ visite **qualifiée** (pas tire-au-flanc)  

### 2.5 KPI

`estimation_rdv` · `mandat_signe` · `listing_live` · `visite_qualifiee` · `closing_vendeur`

### 2.6 Note lab

Price-drop / multi-post concurrent → **lead radar** interne (L3) : appeler Marième-like pour mandat exclusif — **pas** un journey public.

---

## 3. J3 — Locataire — Aïssatou

### 3.1 JTBD

> *Trouver un logement correct vite, signer un bail clair, payer sans drama — et un jour accéder.*

### 3.2 Storyboard

```
Recherche loyer → /louer + filtres
    → fiche → WA visite → visite → dossier / caution
    → bail + EDL → emménagement
    → /espace/client (V3) : quittances, prochain loyer, panne
    → (upsell) bon payeur → contenu terrain étalé
```

### 3.3 Étapes

| Stage | Actions | Touchpoints | Emotion | Friction | Réponse |
| --- | --- | --- | --- | --- | --- |
| **D** | FB/CoinAfrique/WA | `/louer` · cards | Pression déménagement | Annonces fake | Catalogue curated |
| **E** | Compare loyer · quartier · état | Fiche · map · guide louer | Méfiance caution | Avances abusives | Transparence charges / caution |
| **C** | Visite + dossier | WA · form léger | Stress concurrence | Ghosting proprio | SLA agent · créneaux |
| **T** | Signe bail · paie caution | EDL digital (V3) · caution partenaire | Soulagement | Litige état lieux | Photos datées EDL |
| **A** | Paie loyer mensuel | Portail client · Wave/OM | Routine / irritation retard | Relances floues | Quittance auto · historique |

### 3.4 Moments de vérité

1. Visite = photos réelles  
2. EDL contradictoire évité (preuves)  
3. 1ʳᵉ quittance dans l’espace client  

### 3.5 KPI

`visite_location` · `bail_signe` · `loyer_on_time` · `upsell_accession_click`

### 3.6 Upsell (A)

Après 6–12 mois bon payeur : soft CTA `/acheter` + simu mensualité (pas pressure vente).

---

## 4. J4 — Bailleur — Ousmane (local) / Ibrahima (diaspora)

### 4.1 JTBD

| | |
| --- | --- |
| **Ousmane** | *Encaisse pour moi et montre-moi les comptes.* |
| **Ibrahima** | *Professionnaliser à distance — cousin hors de la caisse.* |

### 4.2 Storyboard

```
Crise (impayé / cousin opaque) ou anticipation
    → /gerer ou contenu anti-arnaque (Ibrahima)
    → demande audit → RDV / appel
    → mandat gestion (~7–10 %)
    → reprise : EDL, bail, locataire
    → /espace/proprio : loyers, retards, reversements
    → renouvellement si mois 1–2 impeccables
```

### 4.3 Étapes

| Stage | Actions | Touchpoints | Emotion | Friction | Réponse |
| --- | --- | --- | --- | --- | --- |
| **D** | BO / WA / Google « gestion locative Dakar » | `/gerer` · témoignages · guides C/D | Fatigue | « Agences chères » | Valeur = cash + transparence |
| **E** | Compare % · demande reporting | Landing · exemples quittances / portal mock | Scepticisme | Opacité concurrente | Démo reporting |
| **C** | Audit bien | Form `/gerer/demande` · appel | Espoir | Peur perdre contrôle | Audit écrit + rôles famille clarifiés (Ibrahima) |
| **T** | Signe mandat | Contrat · handover clés/docs | Anxiété transition | Locataire « ami » | Script reprise ferme |
| **A** | Suit reversements | Portail · WA digest mensuel | Confiance ↑ si OK | Vacance / impayé | Relances process · report |

### 4.4 Moments de vérité

1. Audit honnête (y compris « bien difficile »)  
2. **1ʳᵉ quittance + 1ʳᵉ reversement à date**  
3. Reporting mois 2 sans chase  

### 4.5 Variante Ibrahima

- Entrée souvent **contenu** (`/diaspora`, guide « cousin ») avant `/gerer`  
- Timezone FR · e-mail + WA · visite annuelle option  
- Séparer : famille = relation · agence = argent  

### 4.6 KPI

`audit_demande` · `mandat_gestion` · `reversement_on_time` · `nps_bailleur` · `renewal_12m`

---

## 5. J5 — Diaspora acheteur / investisseur — Fatou

### 5.1 JTBD

> *Acheter / construire / faire gérer sans être sur place, avec des preuves — pas une histoire WhatsApp.*

### 5.2 Storyboard (bench diaspora Afrique + SN)

```
Google/YouTube/FB groupes → guide « TF vs bail » / /diaspora
    → catalogue filtré TF · checklist Secure
    → WA conseiller (timezone) → protocole : diligence avant paiement
    → inspection vidéo / sur place (V4) · notaire CHOISI par elle
    → séquestre / virement traçable — JAMAIS Wave vendeur
    → POA limitée si besoin → closing
    → reporting photos · mandat gestion si locatif
```

**Règle d’or (externe diaspora 2025–26) :** séparer découverte / inspection / juridique / paiement · fonds par jalons · POA **limitée**.

### 5.3 Étapes

| Stage | Actions | Touchpoints | Emotion | Friction | Réponse |
| --- | --- | --- | --- | --- | --- |
| **D** | Search « terrain Sénégal TF » · peurs arnaque | SEO · `/diaspora` · guides D | Anxiété / espoir | Contenu marketing creux | Preuves process · refus Wave affiché |
| **E** | Envoie fiche au parent · demande preuves | Fiche papier · checklist · simus | Pression familiale | Parent presse à payer | Script : vérif **avant** fonds |
| **C** | Accepte protocole Secure | Pack · devis diligence/inspection | Méfiance productive | « Paie pour bloquer » | Gate paiement = jalon vérif |
| **T** | Vire séquestre / notaire | Tracking dossier · docs scannés | Stress distance | Faux titre / double vente | EDR/NICAD · notaire indépendant |
| **A** | Suit chantier ou locatif | Photos datées · `/espace/proprio` | Soulagement / hypervigilance | Cousin reprend la main | Mandat gestion · reporting |

### 5.4 Moments de vérité

1. Premier WA — **réponse humaine rapide**  
2. Refus clair Wave vendeur (= test confiance passé)  
3. Elle choisit **son** notaire  
4. 1ʳᵉ preuve livrée (rapport inspection / EDR)  

### 5.5 KPI

`diaspora_secure_start` · `diligence_done` · `inspection_done` · `closing_diaspora` · `gestion_upsell`

### 5.6 Écrans critiques

`/diaspora` · `/diaspora/securiser` · guides D · fiche TF · checklist · (V4) inspection / POA · contact timezone

---

## 6. Vue transversale — touchpoints & SLA

| Touchpoint | Journeys | SLA / règle |
| --- | --- | --- |
| WhatsApp inbound | Tous | 1ʳᵉ réponse &lt; **24 h** (cible 4 h ouv.) |
| Form lead (3–4 champs) | J2 J4 J5 | → CRM immédiat · source taguée |
| Simu complete | J1 J5 | CTA in-result · scénario capturé si contact |
| Visite physique | J1 J3 J5 | Confirmée J-1 · no-show tracké |
| Diligence / EDR | J1 J5 | Devis + délai annoncé |
| Quittance / reversement | J3 J4 | Date contractuelle · visible portail |
| Estimation vendeur | J2 | Compte-rendu ≤ 48 h |

**Progressive profiling :** step 1 = intent + zone + canal · step 2 = budget / timeline après 1ʳᵉ réponse agent.

---

## 7. Boucles cross-sell (post-journey)

```
Locataire bon payeur (J3-A) ──► contenu terrain / simu (J1)
Acheteur terrain (J1-A)     ──► BTP / archi / prêt-à-bâtir
Closing diaspora (J5-A)     ──► mandat gestion (J4)
Vendeur (J2-A)              ──► garde un bien → gestion
Bailleur (J4)               ──► nouveau bien à acheter (J1/J5)
```

Le hub gagne quand **A** n’est pas une impasse.

---

## 8. Frictions à design-out (priorité UX)

| Friction | Journey | Fix produit |
| --- | --- | --- |
| Ghosting WA | Tous | File CRM + SLA + templates |
| « Paie Wave pour bloquer » | J1 J5 | Copy + script agent + page diaspora |
| Confusion délibération = TF | J1 J5 | Pastilles + guide + disclaimer fiche |
| Formulaire 8 champs | J2 J4 | Max 4 · nurture ensuite |
| Estimation sans suivi | J2 | Automation J+1 / J+7 |
| Gestion sans preuve mois 1 | J4 | Portail + digest |
| Parent presse Fatou | J5 | Checklist partagée PDF « à envoyer à la famille » |

---

## 9. Couverture vagues (build)

| Élément journey | V0 | V1 | V2 | V3 | V4 |
| --- | :---: | :---: | :---: | :---: | :---: |
| Catalogue + fiche + WA | ● | ● | ● | ● | ● |
| Simus acheteur | — | ● | ● | ● | ● |
| Diligence / frais | — | — | ● | ● | ● |
| Portails L/P + EDL | — | — | — | ● | ● |
| Pack diaspora inspection/POA | soft | soft | soft | soft | ● |
| Estimation vendeur push | soft | soft | soft | soft | ● |

● = journey supporté · soft = landing/contenu sans tout le stack

---

## 10. Mesure succès journeys (an 1)

| Journey | North-star |
| --- | --- |
| J1 | Closings terrain (+ rate simu→visite) |
| J2 | Mandats exclusifs / listings live |
| J3 | Baux signés · loyers on-time |
| J4 | Mandats gestion actifs · renewals |
| J5 | Closings Secure · 0 incident « Wave vendeur » documenté |

Vanité à ignorer : pages vues sans CTA / sans réponse humaine.

---

## 11. Liens

| Doc | Rôle |
| --- | --- |
| [`01-sitemap-et-ia.md`](./01-sitemap-et-ia.md) | URLs d’entrée |
| [`03-wireframes-mvp.md`](./03-wireframes-mvp.md) | Écrans par étape |
| [`04-crm-et-leads.md`](./04-crm-et-leads.md) | Pipeline · tags · SLA |
| [`06-outils-embarques.md`](./06-outils-embarques.md) | Simus dans J1/J5 |
| [`../../00-synthese/05-fiches-personas.md`](../../00-synthese/05-fiches-personas.md) | Quotes · peurs |
| [`../../etude-de-marche/06-parcours-foncier-securite.md`](../../etude-de-marche/06-parcours-foncier-securite.md) | Diligence métier |

---

## 12. Sources externes (consult. sept. 2026)

| Thème | Insight retenu |
| --- | --- |
| Journey maps immo | Stages awareness→post · touchpoints · émotions · personas distinctes |
| Sites RE 2026 | Routes intent séparées · trust near CTA · forms staged · mobile-first · pipeline > vanity |
| CRO landing 2026 | 3–4 champs · CRM instantané · score + SLA agent |
| Diaspora remote buy (AF) | Vérif titre · inspection vidéo · escrow/jalons · POA limitée · jamais paiement vendeur direct |

---

*Parcours utilisateurs EverGreen Site v1.0 — sept. 2026. 5 journeys · preuves avant paiement · SLA WA · après = revenue.*
