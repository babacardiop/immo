# Add-ons & services annexes

**Specs détaillées (1 fichier / add-on) :** [`docs/add-ons/README.md`](./add-ons/README.md) — **52** specs en **7 catégories**.

**Partenaires & commissions d’apport :** [`docs/partenaires.md`](./partenaires.md) → fiches en **5 catégories** dans [`docs/partenaires/README.md`](./partenaires/README.md).

**Hub & calendrier d’itérations :** [`docs/hub-roadmap.md`](./hub-roadmap.md) — parcours par vague, anti-dispersion, sortie features / add-ons / partenaires.

**Blog / guides haute valeur :** [`docs/blog/`](./blog/README.md) — stratégie, calendrier, briefs.

**Contexte :** agence immobilière full-service (`docs/positioning.md`) + couche PropTech.  
**Objectif :** monétiser au-delà de la commission de vente/location, et accompagner le client **après** l’achat du terrain ou la signature du bail.

Beaucoup d’acheteurs de terrain au Sénégal veulent ensuite **construire**. Des acteurs digitaux proposent déjà des simulateurs ([Investissement Immo Afrique](https://investissementimmoafrique.com/simulateur-cout-construction-maison-senegal/), [HUBCephas](https://hubcephas.com/estimateur-en-ligne/), guides [Keur Immo](https://keur-immo.com/senegal/construction-maison-senegal/)). C’est un add-on naturel pour nous : **terrain → budget maison → mise en relation constructeur**.

---
## 1. Principe

| Type d’add-on | Comment on gagne | Risque ops |
| --- | --- | --- |
| **Outil gratuit (lead magnet)** | Capture lead → mandat / WhatsApp | Faible |
| **Lead / commission partenaire** | % sur devis accepté (architecte, constructeur, assureur) | Moyen |
| **Service opéré par l’agence** | Honoraires forfaitaires (gestion, suivi chantier léger) | Plus élevé |
| **Fintech partenaire** | Co-brand / referral (caution, crédit) | Moyen (légal) |

**Règle :** v1 = simulateurs + marketplace de partenaires (on ne devient pas entreprise de BTP).

---

## 2. Add-on phare — Simulateur coût de construction

### Proposition produit
Sur chaque fiche **terrain** (et page dédiée `/outils/construire`) :

1. Surface habitable (m²) ou “combien de chambres”
2. Niveau de finition : économique / standard / standing
3. Zone (Dakar vs régions — écart ~15–25 %)
4. Options : clôture, fosse, VRD, imprévus 10–15 %, TVA
5. **Résultat :** fourchette FCFA total + FCFA/m² + “terrain + construction” si le bien est un terrain listé

### Ordres de grandeur marché (indicatif 2025)
Sources : [Keur Immo](https://keur-immo.com/senegal/construction-maison-senegal/), contenus construction SN — **à recalibrer avec artisans partenaires**.

| Poste | Repère |
| --- | --- |
| Construction clé en main | ~**300 000 – 500 000 FCFA / m²** |
| Maison ~100 m² | ~**30 – 50 M FCFA** (hors terrain) |
| Buffer imprévus | **+10 à 15 %** |
| Architecte | Obligatoire si projet &gt; ~30 M FCFA (cadre local) |

UI EverGreen : même design que le simulateur de **mensualité terrain** → parcours *“Je peux payer ce terrain… et construire pour X FCFA”*.

### Monétisation
- Gratuit → CTA **“Parler à un conseiller / constructeur partenaire”**
- Pack PDF devis type (email gate)
- Commission apporteur d’affaires 2–5 % sur contrat construction (selon accord)

### Priorité : **P0 / P1** (fort fit catalogue terrains + différenciation vs classifieds)

---

## 3. Catalogue d’add-ons proposés

### A. Parcours “J’ai un terrain / j’achète un terrain”

| Add-on | Description | Monetization | Priorité |
| --- | --- | --- | --- |
| **Simulateur construction** | Budget maison R+0 / R+1, finitions, zone | Lead + commission BTP | **P0** |
| **Pack “Terrain → Maison”** | Simulateur + checklist permis + shortlist archi/constructeurs | Forfait conseil ou lead | **P1** |
| **Bornage / géomètre** | Mise en relation + suivi RDV | Commission / frais dossier | **P1** |
| **Due diligence foncière** | Vérif titre / litige (style [YAWEET](https://yaweet.com/)) — partenaire | Markup sur rapport | **P1** |
| **Plans types / catalogues** | Maisons types 80 / 120 / 150 m² adaptés SN | Lead archi | P2 |
| **Suivi de chantier léger** | Photos GPS, jalons, validation paiements (esprit [Jawudi](https://jawudi.com/en) escrow) | % sur montant travaux ou forfait mois | P2 |
| **Matériaux / marketplace** | Devis agrégés fer, ciment, carrelage | Commission fournisseurs | P3 |
| **Crédit / épargne construction** | Épargne mensuelle vers budget chantier (esprit [Senguka](https://senguka.com/)) | Partenariat banque/MFI | P3 |

### B. Parcours location / gestion

| Add-on | Description | Monetization | Priorité |
| --- | --- | --- | --- |
| **Caution locative digitale** | Avance de caution, remboursement échelonné — partenariat type [Cautiona](https://aps.sn/une-fintech-mise-sur-la-digitalisation-pour-faciliter-lacces-au-logement/) | Referral fee | **P1** |
| **Report / lissage de loyer** | Aide ponctuelle locataire solvable | Partenaire fintech | P2 |
| **État des lieux digital** | Photos + checklist + signature | Inclus gestion / upsell | **P1** |
| **Assurance habitation / MRH** | Devis 1-clic à la signature du bail | Commission courtier | **P1** |
| **Déménagement / ménage** | Packs entrée/sortie (Cautiona liste déjà nettoyage + déménagement) | Commission prestataires | P2 |
| **Pack meublé** | Location meubles / kit premier logement | Commission ou marge | P2 |
| **Maintenance marketplace** | Plombier, clim, électricien via ticket dashboard | Markup sur intervention | P2 |

### C. Parcours vente / accession

| Add-on | Description | Monetization | Priorité |
| --- | --- | --- | --- |
| **Simulateur mensualité** (déjà au cœur produit) | Vente étalée / loc-vente | Conversion catalogue | **P0** |
| **Estimation de bien (vendeur)** | Fourchette prix marché (comps + m²) | Lead mandat exclusif | **P0** |
| **Home staging photo** | Shoot + retouche / virtual staging | Forfait | P2 |
| **Notaire / pack juridique** | Checklist + RDV notaire partenaire | Apporteur d’affaires | **P1** |
| **Certification docs** | Scan + coffre-fort + partage sécurisé | Inclus / premium | P1 |
| **Comparateur frais** | Notaire + mutation + agence — transparence | Confiance (gratuit) | P2 |

### D. Diaspora & premium

| Add-on | Description | Monetization | Priorité |
| --- | --- | --- | --- |
| **Inspection à distance** | Visite filmée + rapport (terrain / chantier / logement) | Forfait USD/EUR | **P1** |
| **Escrow / séquestre paiements** | Fonds libérés par jalons | Frais de structuration | P2 |
| **Conciergerie bien vide** | Gardiennage, visite surprise, factures | Abonnement mensuel | P2 |
| **Multi-devise display** | FCFA + EUR/USD indicatif | Conversion | P1 |
| **Power of attorney assist** | Orientation procuration / représentant local | Forfait + partenaire légal | P2 |

### E. Proprio / B2B agence

| Add-on | Description | Monetization | Priorité |
| --- | --- | --- | --- |
| **Reporting fiscal annuel** | Récap loyers pour le proprio | Inclus mandat gestion premium | P2 |
| **Portail multi-biens** | Portefeuille + ROI simple | Upsell gestion | P1 |
| **Annonces boost SEO / social** | OG cards + campagnes | Pack pub | P2 |
| **White-label branche** | Même stack pour une agence partenaire | SaaS fee | P3 |

---

## 4. Bundles commerciaux suggérés

| Bundle | Contenu | Cible |
| --- | --- | --- |
| **Starter Terrain** | Diligence + bornage + simulateur construction | Acheteur terrain |
| **Clés en main Locataire** | Caution partenaire + assurance + déménagement | Nouveau locataire |
| **Diaspora Secure** | Inspection + diligence + suivi paiements | SN de l’extérieur |
| **Proprio Serein** | Gestion locative + assurance PNO + reporting | Bailleur multi-biens |

---

## 5. UX — où brancher les add-ons

1. **Fiche terrain** → bandeau *“Construire ici ? Estimez le coût”* → simulateur
2. **Après réservation étalée** → checklist *géomètre / plans / constructeur*
3. **Dashboard locataire** → *payer caution / assurance / signalement*
4. **Dashboard proprio** → *assurance PNO / maintenance / reporting*
5. **Page Outils** (SEO) → simulateurs indexables (*coût construction Sénégal*, *mensualité terrain*)

---

## 6. Roadmap recommandée

> **Plan détaillé (vagues, anti-dispersion, calendrier 18 mois) :** [`docs/hub-roadmap.md`](./hub-roadmap.md).

### Vague 1 (rapide, fort ROI contenu)
1. Simulateur **mensualité** (cœur produit)
2. Simulateur **coût construction** (barèmes SN éditables admin)
3. Estimation vendeur (lead mandat)
4. CTA partenaires : géomètre, notaire, architecte

### Vague 2
5. Diligence foncière (partenaire)
6. Caution locative (Cautiona-like partnership)
7. Assurance à la signature
8. Inspection diaspora

### Vague 3
9. Suivi chantier / escrow
10. Marketplace maintenance & déménagement
11. Épargne construction / crédit partenaires

---

## 7. Ce qu’il ne faut pas faire en add-on v1

| Éviter | Pourquoi |
| --- | --- |
| Devenir constructeur soi-même | Risque chantier / litiges énormes |
| Simulateur “précis au franc” sans disclaimer | Responsabilité ; toujours fourchette ±10–15 % |
| Trop d’upsells agressifs sur la fiche | Tue la confiance “agence sérieuse” |
| Blockchain cadeau marketing | Pas un besoin client |

---

## 8. Sources

- [Simulateur coût construction SN — Investissement Immo Afrique](https://investissementimmoafrique.com/simulateur-cout-construction-maison-senegal/)
- [Estimateur HUBCephas](https://hubcephas.com/estimateur-en-ligne/)
- [Guide construction maison SN — Keur Immo](https://keur-immo.com/senegal/construction-maison-senegal/)
- [Cautiona / APS](https://aps.sn/une-fintech-mise-sur-la-digitalisation-pour-faciliter-lacces-au-logement/)
- [YAWEET — vérif terrain](https://yaweet.com/)
- [BuildCalculator / construction estimators](https://buildcalculator.io/) (référence UX mondiale, pas les prix SN)
- Interne : `docs/positioning.md`, `docs/proptech-analysis.md`

---

## 9. Verdict

Oui : **simulateur “combien coûte construire ma maison”** est l’add-on n°1 après le simulateur de mensualités — surtout si le catalogue pousse les terrains.  
Autour : **géomètre, diligence, caution, assurance, inspection diaspora, déménagement** en mode **partenaires + commission**, pour rester une agence qui orchestre, pas un conglomérat BTP.

---

## 10. Synergies — aller plus loin (sans quitter le marché)

Principe : chaque add-on doit **nourrir un axe** (vente / étalé / loc-vente / location-gestion) ou **un portail** (proprio / client / agence). Pas de gadget hors parcours.

### 10.1 Matrice Axes × Add-ons

| Add-on | Axe 1 Vente | Axe 2 Étalé | Axe 3 Loc-vente | Axe 4 Loc+gestion |
| --- | --- | --- | --- | --- |
| Simulateur mensualité | △ | ✅ | ✅ | — |
| Simulateur construction | ✅ terrain | ✅ | △ | — |
| Diligence / géomètre | ✅ | ✅ | △ | — |
| Estimation vendeur | ✅ | — | — | ✅ (passe en vente) |
| Caution + assurance | — | — | △ | ✅ |
| Maintenance / clim / solaire | △ | △ chantier | ✅ | ✅ |
| Inspection diaspora | ✅ | ✅ | ✅ | ✅ |
| Escrow jalons | △ | ✅ | ✅ | — |
| Portail multi-biens | — | — | — | ✅ |

### 10.2 Parcours clients (séquences qui se vendent seules)

#### Parcours T — Acheteur de terrain (local ou diaspora)
```
Recherche (autocomplete + carte)
  → Fiche terrain (TF/bail)
  → Simulateur mensualité (si étalé) OU contact vente
  → Diligence + bornage
  → Simulateur construction (“maison 120 m² ici = X FCFA”)
  → Pack Terrain→Maison (archi / permis / constructeur)
  → Option : solaire + clim + clôture + forage/eau
  → Suivi chantier léger (diaspora) + escrow
```
**Synergie :** le terrain qu’on vend devient le **premier maillon** d’une chaîne de commissions partenaires pendant 12–36 mois.

#### Parcours L — Locataire
```
Recherche appart/maison
  → Visite / réservation
  → Caution digitale (partenaire) + assurance MRH
  → Bail + état des lieux digital (dashboard)
  → Paiement Wave/OM + quittances
  → Maintenance (clim, plomberie) via ticket
  → Après 12 mois à l’heure → offre Axe 2/3 (terrain étalé / loc-vente)
```
**Synergie :** la gestion locative **qualifie** les futurs acheteurs (déjà dans `docs/positioning.md`).

#### Parcours P — Propriétaire bailleur
```
Mandat gestion
  → Portail : loyers, retards, reversements
  → Assurance PNO
  → Maintenance groupée
  → Reporting annuel
  → Un jour : “On revend pour vous” (estimation + Axe 1)
```

#### Parcours V — Vendeur / investisseur
```
Estimation gratuite
  → Mandat + shoot photo
  → Annonce + share cards
  → Notaire partenaire
  → Post-vente : si terrain restant / autre bien → gestion ou étalé
```

### 10.3 Nouveaux add-ons (synergie SN uniquement)

Complètent la §3 — toujours en **partenaire**, pas en production interne.

#### Sur le foncier & la viabilisation (post-achat terrain)

| Add-on | Pourquoi c’est synchrone | Priorité |
| --- | --- | --- |
| **Simulateur “terrain nu → prêt à bâtir”** | Clôture + bornage + fosse + branchements eau/éléc — le vrai coût oublié après l’achat | **P1** |
| **Forage / adduction eau** | Hors Dakar / zones mal viabilisées (Petite Côte, Diamniadio, rural) | P2 |
| **VRD / viabilisation lot** | Partenaires type infra/eau ([In’O](https://ino.sn/) et équivalents) | P2 |
| **Permis de construire + CU** | Checklist + RDV urbanisme / archi — [Kapital Conseil](https://kapitalconseilimmobilier.com/)-style | **P1** |
| **Régularisation / montée en TF** | Bail → titre : service très demandé, lead juridique | P2 |
| **Clôture & portail forfaitaires** | Premier travaux visibles ; devis partenaires | P2 |

#### Énergie & confort (bâti + locatif)

| Add-on | Pourquoi | Priorité |
| --- | --- | --- |
| **Pack clim (split) + entretien annuel** | Standard Dakar ; ticket maintenance dashboard | **P1** |
| **Kit solaire / onduleur** | Coupures SENELEC ; installateurs type [Namory Energy](https://namoryenergy.com/) | **P1** |
| **Groupe électrogène / stab.** | Meublés / standing | P2 |
| **Contrat entretien multi-technique** | Clim + elec + plomberie (esprit [Batigo](https://batigoservices.com/)) facturé au proprio | P2 |

#### Locatif & cashflow agence

| Add-on | Pourquoi | Priorité |
| --- | --- | --- |
| **Assurance PNO (propriétaire non occupant)** | Upsell naturel mandat gestion — agences SN le font déjà ([2SMS](https://linkedin.com/company/2sms-immobilier-sarl)-style) | **P1** |
| **Colocation / coliving matching** | Remplir plus vite les F2/F3 Dakar | P2 |
| **Garant / scoring locataire** | Réduit impayés ; data pour cross-sell accession | **P1** |
| **Préavis & remise des clés pack** | Ménage + état des lieux + annonce “à relouer” auto | P2 |
| **Location saisonnière / meublé diaspora** | Saly, Petite Côte — calendrier + conciergerie | P2 |

#### Accession & finance (sans devenir banque)

| Add-on | Pourquoi | Priorité |
| --- | --- | --- |
| **Simulateur “budget total projet”** | Terrain + étalé + construction + frais notaire en **une** page | **P0** |
| **Calendrier d’épargne construction** | Pendant qu’il paye le terrain, il met de côté pour bâtir (Wave rappel) | **P1** |
| **Co-acquisition familiale** | 2–4 payeurs sur un échéancier (très courant diaspora/famille) | P2 |
| **Transfert de dossier / reprise étalé** | Client défaillant → remettre en vente le solde (process déjà prévu juridiquement) | P2 |

#### Contenu & SEO (coûte peu, vend les add-ons)

| Add-on | Pourquoi | Priorité |
| --- | --- | --- |
| **Guides outils indexables** | “Coût construction 2026”, “TF vs bail”, “caution Dakar” | **P0** |
| **Calculateur frais d’acquisition** | Notaire + mutation + commission — transparence = confiance | **P1** |
| **Carte “prix/m² par quartier”** | Couche map ; lead estimation vendeur | P2 |

### 10.4 Bundle élargis (synergie commerciale)

| Bundle | Contenu | Trigger produit |
| --- | --- | --- |
| **Terrain Serein** | Diligence + bornage + simu construction + simu budget total | Checkout / réservation terrain |
| **Prêt à bâtir** | Clôture + fosse + branchements (devis partenaires) | Post-mutation ou 50 % étalé payé |
| **Maison Confort** | Clim + solaire + assurance | Livraison / entrée loc-vente |
| **Locataire Tranquille** | Caution + MRH + déménagement + état des lieux | Signature bail |
| **Bailleur Pro** | Gestion + PNO + maintenance + reporting | Mandat gestion |
| **Diaspora Full** | Inspection + diligence + escrow + suivi chantier + multi-devise | Compte diaspora |

### 10.5 Où ça vit dans le produit (synergie UX)

| Surface | Add-ons branchés |
| --- | --- |
| Autocomplete | Intent “construire”, “mensualité &lt; 100k”, “TF Bambilor” |
| Fiche terrain | Simu mensualité + simu construction + “budget total” |
| Fiche appart/maison | Caution / assurance / visite ; si vente : frais d’acquisition |
| Dashboard locataire | Quittances, tickets maintenance, offre accession soft |
| Dashboard acquéreur étalé | Solde + **jauge épargne construction** + partenaires |
| Dashboard proprio | Loyers + PNO + “revendre / estimer” |
| Page `/outils` | Tous les simulateurs (SEO) |
| Share cards | “Terrain + construction estimée à X FCFA” = viralité WhatsApp |

### 10.6 Partenaires types à recruter (pas inventer le métier)

| Catégorie | Rôle | Exemples d’écosystème SN |
| --- | --- | --- |
| Constructeurs / archi / MOE | Devis maison | Réseau local + estimateurs existants |
| Géomètres / diligences | Titre & bornage | Yaweet-like, cabinets |
| Énergie / clim | Packs confort | Namory-like, Batigo-like |
| Viabilisation / eau | Forage, VRD | In’O-like |
| Fintech caution | Accès location | Cautiona |
| Assureurs / courtiers | MRH, PNO, auto | Partenariats agences locales |
| Déménagement / cleaning | Entrée-sortie | Prestataires Dakar |
| Notaires | Closing | Apporteur d’affaires |

### 10.7 Ordre de construction produit (synergie max)

```
P0  Simu mensualité + simu construction + simu budget total + estimation vendeur
     + pages guides SEO
P1  Diligence/géomètre CTA + permis checklist (**délais réels**, papier mairie) + caution/assurance
    (+ option régularisation délibération→bail) — réf. `dossier/etude-de-marche/06`
     + PNO + clim/solaire leads + inspection diaspora
     + jauge épargne construction dans dashboard acquéreur
P2  Viabilisation/forage/clôture + suivi chantier + escrow
     + maintenance marketplace + saisonnier + co-acquisition
P3  Matériaux, crédit/MFI, white-label
```

### 10.8 Ce qu’on n’ajoute toujours pas

- Usine de préfab / promotion immobilière capitalistique  
- Banque / crédit conso en propre  
- Marketplace “tout Sénégal” hors immo (meubles généraux, food…)  
- Features hors parcours client réel (métaverse visite, NFT titre…)

---

## 11. Sources (complément §8)

- [Batigo Services](https://batigoservices.com/) — BTP / clim / maintenance SN  
- [Namory Energy](https://namoryenergy.com/) — solaire, clim, élec  
- [In’O](https://ino.sn/) — eau, assainissement, VRD  
- [Kapital Conseil Immobilier](https://kapitalconseilimmobilier.com/) — diligence, permis, diaspora, suivi  
- [Cautiona](https://aps.sn/une-fintech-mise-sur-la-digitalisation-pour-faciliter-lacces-au-logement/) — caution digitale  
- Interne : `docs/positioning.md` (portails), `docs/proptech-analysis.md` (4 axes)
