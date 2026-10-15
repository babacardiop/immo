# S09 — Backend

**US :** US-V3-20…24 · EF-CAT-PROP-*  
**Outcome :** `Property` durable ≠ `Listing` cycle · republish après séjour/bail · commodités structure (qty) + offre courte durée  
**Avant :** S01 listing CRUD · S08 candidatures (listing-scoped)  
**Après / consommé par :** S10 embeds · S11 dashboards · S12 paiements  
**Vague :** V3 (refactor catalogue — ne bloque pas Done V1 = S10 embeds)  
**Spec :** [`55-property-listing-cycles.md`](../../../../../docs/add-ons/specs/03-location-gestion/55-property-listing-cycles.md)

---

## Modèle canonique

| Entité | Rôle |
| --- | --- |
| `Property` | Bien physique · géo · structure · media library · mandate/landlord |
| `Listing` | Cycle de publication (`rentalMode` long\|short) · prix · offerIncludes · statut |

```
Property 1──* Listing (cycles)
Property 1──* PropertyMedia
Listing  *──* ListingMedia (pin PropertyMedia + shots campagne)
Mandate → propertyId
```

---

## Todo

### 1. Schéma Property + migration Listing

- [ ] Modèle `Property` (reference, type, geo, paper soft, structure counts, `commoditiesQty` JSON)
  - Done when: migration + seed
- [ ] `Listing.propertyId` obligatoire (backfill : 1 Property par Listing legacy)
  - Done when: script backfill idempotent
- [ ] `rentalMode` long\|short sur Listing (map `RENT` / `SHORT_TERM_RENT` / `alsoShortTerm`)
- [ ] Mandate : `propertyId` (deprecate unique `listingId`)
- [ ] Media : `PropertyMedia` + lien optionnel listing

### 2. Commodités

- [ ] Structure Property : `rooms` · `bedrooms` · `bathrooms` · `balconyCount` · `parkingCount` · `terraceCount` (+ bools soft)
  - Done when: validation qty ≥ 0
- [ ] Offre courte Listing : `offerIncludes[]` aligné `RENTAL_AMENITIES` + `furnished`
  - Done when: longue durée n’exige pas le pack courte
- [ ] Catalogues constants partagés (`STRUCTURAL_COMMODITIES` · `RENTAL_AMENITIES`)

### 3. Cycles & republish

- [ ] Machine à états Listing : `draft` → `published` → `reserved`\|`rented` → `archived`
- [ ] `listings.republish(propertyId | listingId)` → nouveau cycle draft prérempli (prix soft, media pins, includes)
  - Done when: Property inchangé · ancien cycle `archived` si encore actif
- [ ] `listings.duplicate` soft (même property, nouveau draft)
- [ ] Fin séjour courte / fin bail → hook soft `property.markAvailable` + notif agent republish
- [ ] **Interdit** cascade-delete Property sur archive listing

### 4. API / actions

- [ ] CRUD Property (agent/OD)
- [ ] `GET property/:id` inclut `listings[]` history (cycleIndex, dates, status)
- [ ] Create listing under property
- [ ] Patch commodities structure vs offer includes (endpoints séparés)
- [ ] ACL : agent own / OD all · landlord read own property soft (S11)

### 5. Compat S08

- [ ] Candidatures restent **listing-scoped** (cycle actif)
- [ ] Assignment landlord → **property** (migrate)
- [ ] Tenant/lease timeline visible au niveau Property

## Refs

`55` · `../05` catalogue · S01 · S08 · amenities.ts
