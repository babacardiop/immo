# Politique papiers — TF / bail / délibération en catalogue

**Document :** Dossier · Risques & conformité · 04  
**Statut :** v1.0 — sept. 2026  
**Amont :** [`../etude-de-marche/06-parcours-foncier-securite.md`](../etude-de-marche/06-parcours-foncier-securite.md) · [`../etude-de-marche/07-glossaire-foncier.md`](../etude-de-marche/07-glossaire-foncier.md) · [`02-politique-anti-fraude.md`](./02-politique-anti-fraude.md) · [`../organisation/06-culture-et-sla.md`](../organisation/06-culture-et-sla.md)  
**Aval :** UX fiches Next.js · formation AC · Pack Sécuriser

---

## 0. Synthèse — règles catalogue

| # | Règle |
| --- | --- |
| **1** | **Aucun** bien terrain/bâti sensible sans champ **`type_de_droit`** renseigné |
| **2** | Hiérarchie affichée : **TF > bail emph. > bail ord. > délibération > autre / inconnu** |
| **3** | Délibération **≠** titre — bandeau disclaimer **obligatoire** |
| **4** | On ne publie **pas** « vente TF » pour une délibération ou un papier WhatsApp |
| **5** | Vague 2 : **pas de boost** sans diligence mini au-delà du seuil |
| **6** | Cible KPI : **100 %** fiches avec type papier (`04` KPI / Gate V0) |
| **7** | Mentir sur le papier = **faute grave** (phrases interdites `06`) |

**Règle d’or métier :** *la délibération n’est pas un titre de propriété et n’autorise pas une vente comme un TF.*

---

## 1. Pourquoi cette politique

| Problème marché | Réponse hub |
| --- | --- |
| Classifieds flous (« terrain titre ») | Facet explicite + disclaimer |
| Confusion délibération = TF | Pédagogie + filtre catalogue |
| Discount −30/40 % = piège | Dire que le prix bas **achète le risque** |
| Diaspora trompée à distance | Pack Secure + type papier visible |
| Risque J03 registre | Publish contrôlé |

**Principe juridique (Investissements SN / doctrine) :** propriété privée pleine = **immatriculation Livre foncier**. Bail / délibération = usage / occupation — **pas** la même chose.

---

## 2. Taxonomie `type_de_droit` (valeurs catalogue)

| Valeur technique | Libellé UI | Nature | Cessibilité / vente | Sécurité |
| --- | --- | --- | --- | ---: |
| `tf` | **Titre foncier (TF)** | Propriété pleine Livre foncier | Oui (acte notarié) | ★★★★★ |
| `bail_emph` | **Bail emphytéotique** | Droit réel 18–50 ans (souvent) | Cession **encadrée** · hypothécable typ. | ★★★★ |
| `bail_ord` | **Bail ordinaire** | Occupation ≤ 18 ans (ordre) | Limitée | ★★★ |
| `deliberation` | **Délibération** | Droit d’**usage** domaine national | **Pas** une vente de propriété · impenses éventuelles | ★ |
| `deliberation_exec` | Délibération **exécutoire** | + approbation tutelle | Idem usage · un peu moins fragile | ★★ |
| `aoo` | Autorisation d’occuper | Précaire | Très limitée | ★ |
| `autre` | Autre / à préciser | — | Case par case | ? |
| `inconnu` | **Non renseigné** | — | **Bloque publish** | — |

**Bâti en location / vente appartement :** type droit du **sol / copro** à renseigner si connu (TF copro, etc.) ; a minima ne pas inventer.

---

## 3. Matrice publish / boost / CTA

| Type | Publish catalogue | Boost / ads / classifieds | CTA par défaut | Diligence |
| --- | :---: | :---: | --- | --- |
| **TF** | ✅ | ✅ si EDR ok (V2+ seuil) | Visite / offre | EDR recommandé closing |
| **Bail emph.** | ✅ | ✅ si inscription + canon ok | Visite + diligence | Vérif bail / Domaines |
| **Bail ord.** | ✅ | ⚠️ limité | Diligence | Attention cession |
| **Délibération** | ✅ **avec bandeau** | ❌ sauf GO GER + disclaimer fort | **Sécuriser / régularisation** | Tutelle · orientation bail |
| **Délib. exécutoire** | ✅ bandeau | ⚠️ rare | Sécuriser | Preuve tutelle |
| **AOO / autre** | ⚠️ GER | ❌ | Diligence | Souvent no-go vente |
| **Inconnu** | ❌ | ❌ | — | Compléter d’abord |
| Zone DGSCOS chaude | Conditionnel | ❌ | Diligence | Voir zones `02` |

### Seuil boost Vague 2 (policy roadmap)

| Condition | Exigence |
| --- | --- |
| Terrain prix / enjeu **&gt; seuil** (à figer ops, ex. &gt; 15–25 M) | Diligence mini (EDR ou équiv.) **avant** boost Meta/classifieds |
| Tout terrain délibération | Pas de boost « promocode » · CTA diligence |

---

## 4. Affichage fiche (UX obligatoire)

### 4.1 Bloc « Papiers » (above the fold mobile)

```
Type de droit : [Pastille colorée]
  TF          → vert
  Bail emph.  → bleu
  Bail ord.   → bleu clair
  Délibération→ orange / ambre
  Autre       → gris
```

| Élément | Obligatoire |
| --- | :---: |
| Pastille + libellé type | ● |
| NICAD si connu | ○ → ● dès dispo |
| Mentions « EDR vérifié le [date] » | ○ (après diligence) |
| Disclaimer si ≠ TF | ● |
| Lien glossaire / guide TF vs bail | ● |
| CTA diligence / WA | ● |

### 4.2 Textes disclaimer (canoniques)

**Délibération**

> *Statut déclaré : **délibération**. Ce n’est **pas** un titre foncier. Il s’agit d’un droit d’**usage** sur le domaine national, non assimilable à une propriété pleine. Une vérification (et souvent une régularisation vers bail / TF) est recommandée avant tout engagement financier. Le hub n’accompagne pas de paiement Wave au vendeur.*

**Bail**

> *Statut déclaré : **bail** ([ordinaire / emphytéotique]). L’État (ou le bailleur domanial) reste propriétaire du sol ; vous disposez d’un droit d’occupation / droit réel selon le bail. Vérifier inscription, durée, canon et conditions de cession avant engagement.*

**TF**

> *Statut déclaré : **titre foncier**. Propriété immatriculée au Livre foncier — sous réserve de l’état des droits réels (EDR) à jour. Une vérification Conservation reste recommandée avant paiement.*

**Inconnu (interne only — ne pas publish)**

> Completer `type_de_droit` avant mise en ligne.

### 4.3 Titres d’annonce — interdits / autorisés

| Interdit | Autorisé |
| --- | --- |
| « Terrain titre » si délibération | « Terrain — délibération (usage) » |
| « TF OK » sans pièce | « TF déclaré — EDR à confirmer » |
| « Propriétaire » pour délibération seule | « Affectataire / détenteur d’usage » |
| « Régularisable 48 h » | « Orientation régularisation (délais réels mois) » |

---

## 5. Politique par type — détail opérationnel

### 5.1 Titre foncier (`tf`)

| | |
| --- | --- |
| **Mandat vente** | Classique exclusif OK |
| **Pièces min. publish** | Déclaration vendeur + copie titre / réf. · photos |
| **Avant closing** | EDR récent · notaire · (bornage si doute) |
| **Message** | Sécurité max · toujours vérifier EDR |

### 5.2 Bail emphytéotique (`bail_emph`)

| | |
| --- | --- |
| **Mandat** | OK avec mention bail · pas promettre « c’est un TF » |
| **Points check** | Durée restante · canon · mise en valeur · inscription LF · cession État |
| **CTA** | Diligence Domaines / notaire |
| **Banque** | Souvent hypothécable — ne pas garantir acceptation crédit |

### 5.3 Bail ordinaire (`bail_ord`)

| | |
| --- | --- |
| **Publish** | OK · ton prudent |
| **Risque** | Cession limitée · moins « investissable » |
| **CTA** | Diligence avant acompte |

### 5.4 Délibération (`deliberation` / `_exec`)

| | |
| --- | --- |
| **Ce qu’on dit** | Usage · possible cession d’**impenses** (peines & soins) — **pas** le sol en propriété |
| **Ce qu’on ne dit jamais** | « C’est comme un TF » / « on vend le terrain titre » |
| **Mandat** | Pas de mandat « vente propriété » classique sans qualification · GER si doute |
| **Pièces** | Extrait délib. · **preuve tutelle** si exécutoire · PV installation si dispo |
| **CTA** | Pack **Sécuriser** · orientation **bail / Yastal** · géomètre |
| **Prix** | Attendu −30/40 % vs TF voisin — expliquer le risque |
| **Diaspora** | Secure **fortement recommandé** · souvent dissuader 1er achat (MyAfric) |

**Tutelle (seuils 10 / 50 ha — décret 2020-1773) :** sans approbation = délibération **fragile** → pastille + note « exécutoire non prouvée ».

### 5.5 Autre / AOO / WhatsApp paper

| | |
| --- | --- |
| **Publish vente** | En principe **NO-GO** |
| **Exception** | GER + disclaimer extrême + CTA diligence only (pas d’offre « prêt à payer ») |

---

## 6. Workflow agent — avant publish

```
1. Collecter déclaration vendeur + copies
2. Choisir type_de_droit (pas « inconnu »)
3. Si délibération : cocher bandeau + CTA Sécuriser
4. Renseigner NICAD / réf. si dispo
5. Zone : check no-go / DGSCOS (`02` zones)
6. Photos datées + géoloc si possible
7. Revue OD si terrain > seuil ou délibération / zone chaude
8. Publish curated (pas open posting)
9. Sync classifieds : MÊME libellé type droit + disclaimer court
```

**Checklist publish (à coller CRM)**

- [ ] `type_de_droit` ≠ inconnu  
- [ ] Disclaimer si ≠ TF  
- [ ] Prix cohérent (pas −50 % silencieux)  
- [ ] Pas de titre d’annonce mensonger  
- [ ] Zone OK / conditionnel documenté  
- [ ] Mandat signé (exclusif prioritaire)  

---

## 7. Filtres & SEO catalogue

| Facet | Valeurs |
| --- | --- |
| Type de droit | TF · Bail · Délibération · Autre |
| Vérification | Non vérifié · Basic · Full · Bloqué |
| Zone risque | Standard · Vigilance · No-go |

**Landings SEO :** « terrain TF Dakar », « bail emphytéotique », « délibération ≠ titre » — jamais cannibaliser avec titres trompeurs.

**Événements :** `listing_paper_type_set` · `disclaimer_view` · `diligence_cta_click`.

---

## 8. Données produit (schéma cible)

```
Listing {
  paperType: tf | bail_emph | bail_ord | deliberation | deliberation_exec | aoo | autre
  paperVerified: none | basic | full | blocked
  nicad?: string
  edrDate?: date
  edrRef?: string
  deliberationTutelle?: boolean
  disclaimerVersion: string
  boostAllowed: boolean  // calculé policy Vague 2
}
```

Aligné add-on diligence `08` + hub-roadmap facets V0.

---

## 9. Mandats & wording juridique (trame)

| Type fiche | Formulation mandat / annonce |
| --- | --- |
| TF | « Mise en vente d’un bien objet d’un titre foncier déclaré… » |
| Bail | « Mise en relation / cession de droits issus d’un bail… sous conditions Domaines » |
| Délibération | « Accompagnement sur droits d’usage / impenses liés à une délibération — **pas** transfert de propriété TF » |

→ **Validation avocat** avant modèles définitifs.

---

## 10. Sanctions & KPI

| Manquement | Sanction |
| --- | --- |
| Publish sans type papier | Retrait immédiat + coaching |
| Délibération présentée comme TF | Faute grave (`06`) |
| Boost sans diligence &gt; seuil | Gel boost + revue GER |
| Disclaimer retiré « pour vendre » | Faute grave |

| KPI | Cible |
| --- | ---: |
| % fiches type papier renseigné | **100 %** |
| % délibérations avec bandeau | **100 %** |
| Boost non conformes | **0** |
| Incidents J03 (mensonge papier) | **0** |

---

## 11. Aide-mémoire agent (30 secondes)

```
TF        = propriété Livre foncier → vert
Bail      = occupation / droit réel État → bleu · pas « mon sol à vie » sans lire
Délib.    = usage communal → orange · PAS une vente TF
Prix bas  = souvent risque haut
Payer     = jamais Wave vendeur · séquestre / notaire
Doute     = OD / GER · pas d’improvisation
```

---

## 12. Sources

### Internes

| Doc | Usage |
| --- | --- |
| [`06-parcours-foncier-securite.md`](../etude-de-marche/06-parcours-foncier-securite.md) | Hiérarchie · tutelle · red flags |
| [`07-glossaire-foncier.md`](../etude-de-marche/07-glossaire-foncier.md) | Définitions |
| [`06-culture-et-sla.md`](../organisation/06-culture-et-sla.md) | Disclaimers · phrases interdites |
| [`02-politique-anti-fraude.md`](./02-politique-anti-fraude.md) | Diligence · Wave |
| [`08-due-diligence-fonciere.md`](../../docs/add-ons/specs/02-terrain-construction/08-due-diligence-fonciere.md) | Spec produit |
| [`hub-roadmap.md`](../../docs/hub-roadmap.md) | Facets V0 · policy V2 |

### Externes

| Source | Insight |
| --- | --- |
| SenPages / JIWALL / Batiboom | TF vs bail vs délibération · impenses |
| Investissement Immo Afrique | Matrice sécurité · alerte délibération |
| APIX / fiche investisseur accès foncier | Propriété = immatriculation Livre foncier |

**Avertissement :** politique **éditoriale & commerciale** hub. Elle ne remplace pas l’avis notaire / Conservation sur un dossier précis.

---

*Politique papiers v1.0 — sept. 2026. RC métier → `05-assurance-et-responsabilite.md`.*
