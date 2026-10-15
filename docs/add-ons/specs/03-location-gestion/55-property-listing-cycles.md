# Property vs Listing — cycles de publication + commodités

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `55-property-listing-cycles.md` |
| **Priorité** | **P0** |
| **Catégorie** | Location / Catalogue |
| **Synthèse** | Séparer le **bien durable** (`Property`) de la **publication** (`Listing` cycle). Republier après séjour courte durée ou fin de bail. Commodités structurelles (quantités) vs inclus offre courte durée. |
| **Sprint** | `S09-property-listing-cycles` |

## 1. Problème

Aujourd’hui un `Listing` monolithique = bien + annonce. Conséquences :

- Impossible d’avoir un **historique** propre de remises en location.
- Après 1 semaine courte durée ou fin de bail classique, on recrée tout ou on « recycle » mal.
- Commodités floues : pas de balcon ×2 / WC ×N pour longue durée ; courte durée a une liste soft (`RENTAL_AMENITIES`) mais pas de modèle Property/Listing.

## 2. Modèle

```
Property (durable)
  ├── structure : chambres, salles de bain/WC, pièces, balcons×N, parking×N, surface…
  ├── media library (photos canoniques)
  ├── mandate / landlord assignment
  └── Listing[] (cycles)
        ├── rentalMode: long | short (+ sale later)
        ├── prix · période · caution · minStay
        ├── offerIncludes[] (clim, wifi, frigo…) — surtout courte durée
        ├── media pin / campaign shots
        └── status: draft → published → reserved|rented → archived
```

| Entité | Vit | Exemple |
| --- | --- | --- |
| **Property** | Tant que le proprio reste client | Appart Almadies 3 chambres |
| **Listing** | Un cycle de mise en marché | Cycle mars 2026 · courte durée 1 sem |

## 3. Flows republish

### Courte durée

1. Listing published → séjour confirmé → `rented` / calendrier soft  
2. Séjour terminé → listing `archived` (ou unit `available`)  
3. Si mandat actif → **Republish** : nouveau Listing (ou draft from property) · réutilise media · photos à jour optionnelles → republish catalogue

### Location classique

1. Accept candidat (S08) → Lease → listing `rented`  
2. Bail terminé / préavis → lease `ended`  
3. Landlord demande remise en loc → **Republish from property** · maj photos · nouveau cycle

**Interdit :** supprimer le Property parce qu’un cycle est fini.

## 4. Commodités

### 4.1 Structure (Property) — longue & courte

Champs / commodities **avec quantité** :

| Code | Label | Qty |
| --- | --- | :---: |
| `rooms` | Pièces | ● |
| `bedrooms` | Chambres | ● |
| `bathrooms` | Salles de bain / WC | ● |
| `balcony` | Balcon(s) | ● (×1, ×2, ×3…) |
| `parking` | Place(s) parking | ● |
| `terrace` | Terrasse(s) | ● |
| `area_m2` | Surface | soft |

Boolean structure soft : `elevator`, `garden`, `security`, `generator_building`…

### 4.2 Offre courte durée (Listing)

Inclus dans le séjour (boolean / set) — aligné `RENTAL_AMENITIES` :

`clim` · `ventilateur` · `frigo` · `cuisiniere` · `wifi` · `tv` · `lave-linge` · `parking` · `generateur` · `eau-chaude` · + `meuble` (furnished)

Longue durée : structure Property + option soft « meublé » / climatiseur si pertinent ; pas obligé de recopier tout le pack courte durée.

## 5. UX / surfaces

- BO : créer **Property** puis 1er **Listing**  
- BO : fiche Property → **Historique des publications**  
- Action **Republier** / **Dupliquer listing**  
- Forms commodités structure + offre courte  
- Catalogue public lit le **Listing** actif (+ specs Property)

## 6. Données (cible)

```
Property { id, reference, propertyType, geo…, rooms, bedrooms, bathrooms,
           commoditiesJson /* { balcony: 2, parking: 1 } */, … }
Listing { id, propertyId, rentalMode, status, price…, offerIncludes[],
          furnished?, minStayDays?, publishedAt, archivedAt, cycleIndex }
PropertyMedia { propertyId, … }
ListingMedia { listingId, propertyMediaId?, campaignOnly? }
Mandate { propertyId }  // migration depuis listingId
```

## 7. API (cible)

- `POST /api/properties` · `GET /api/properties/:id` (+ listings history)
- `POST /api/properties/:id/listings` (create cycle)
- `POST /api/listings/:id/republish` → new listing from property snapshot
- `PATCH` commodities structure / offer includes

## 8. Synergies

S01 listing BO (refactor) · S08 candidatures (listing actif) · S11 dashboards portefeuille Property · add-on `49` calendrier (plus tard) · **S12** paiements sur Lease du cycle.

## 9. Hors scope S09

Calendrier Airbnb full · channel manager · migration Prisma live (todos sprint ; code quand build).

## 10. Design system

- `forms/property-create/` · `forms/listing-republish/`
- `forms/commodites-structure/` · `forms/commodites-offre-courte/`
- `pages/espace/agent/property-detail/`

## Refs

Sprint `S09-property-listing-cycles` · `dossier/tech/site/05-catalogue-annonces.md` · amenities code `web/src/lib/listings/amenities.ts`
