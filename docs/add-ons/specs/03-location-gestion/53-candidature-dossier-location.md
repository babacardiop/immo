# Candidature & dossier location (review process)

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `53-candidature-dossier-location.md` |
| **Priorité** | **P0** |
| **Catégorie** | Location / Gestion |
| **Synthèse** | Visite site → **prospect** → compte client (scratch ou depuis prospect) → assignation **candidat** → dépôt pièces (visibles **uniquement par le personnel EverGreen**) → accept → promotion **locataire** + portail débloqué. |
| **Sprint** | `S08-candidatures-location` |

## 1. Problème client

Sans process digital :

- Demandes de visite perdues dans WhatsApp, sans fiche prospect.
- Dossiers PDF non traçables ; fuite de pièces sensibles vers le bailleur.
- Pas de compte candidat pour uploader au bon moment.
- Portail locataire vide faute d’assignation / acceptation.

## 2. Réalité marché

Agence curated SN : la visite précède le dossier. Les pièces (CNI, bulletins) restent chez l’agence — le bailleur décide sur **avis / synthèse**, pas sur les originaux numériques.

## 3. Utilisateurs & synergies

| Acteur | Rôle dans le flow |
| --- | --- |
| **Prospect** (visitor) | Demande visite → devient Lead |
| **Candidat** (`client` + assignment `candidate`) | Dépose docs sur le bien assigné |
| **Locataire** (`client` + assignment `tenant`) | Portail loyers / quittances **après accept** |
| **Staff EverGreen** (agent / OD / GER) | Convertit prospect, assigne, **lit les docs**, review, accept |
| **Landlord** | Voit statut / % / synthèse — **jamais les fichiers** |

**Synergies :** CRM leads `04` · portail `22` · scoring `23` (plus tard) · caution `11` · paiements plateforme `54` / **S11** · EDL `12` · S10 dashboards.

## 4. Flow — actions consignées

```
1. Prospect clique « Demander une visite » sur /louer/[slug]
       → Lead/Prospect créé (pas de compte)
2. Visite · intérêt confirmé (CRM stage)
3. Staff crée le compte client
       3a. From scratch  OU  3b. Depuis le prospect (prérempli)
4. Staff assigne le bien en rôle « candidat »
       → le candidat peut déposer les pièces requises
5. Candidat upload + accepte notice confidentialité
       → docs lisibles UNIQUEMENT par personnel EverGreen
6. Staff revue (viewer) · shortlist / docs manquants / reject
7. Accept
       → candidate → tenant · Lease soft · portail locataire DÉBLOQUÉ pour ce bien
8. (Soft) Landlord suit le statut sans ouvrir les fichiers
```

### Matrice « qui fait quoi »

| Action | Prospect | Candidat | Landlord | Staff EG |
| --- | :---: | :---: | :---: | :---: |
| Demande visite (crée prospect) | ● | ○ | ○ | ○ |
| Créer compte scratch / from lead | ○ | ○ | ○ | ● |
| Assigner rôle candidate | ○ | ○ | ○ | ● |
| Configurer exigences pièces | ○ | ○ | ◐ lecture | ● |
| Uploader docs | ○ | ● | ○ | ○ |
| **Lire fichiers vault** | ○ | ◐ own | **○** | ● |
| Shortlist / request docs / reject | ○ | ○ | ○* | ● |
| Accept / sélection | ○ | ○ | ◐† | ● |
| Voir portail locataire (loyers) | ○ | ○→● après accept | ○ | ●‖ |

\* Landlord peut commenter / confirmer sur synthèse.  
† Si mandat landlord_decides : confirme sans accès fichiers.  
‖ Impersonation OD auditée.

## 5. Inputs / Outputs

**Inputs :** visite form · Lead · User client · listing · requirement set · uploads  
**Outputs :** Lead · User · `PropertyAssignment(candidate|tenant)` · `RentalApplication` · docs vault · `Lease` soft · notifs · listing status

## 6. UX / surfaces

| Étape | Route / frame |
| --- | --- |
| Visite | fiche louer + form visite |
| Créer compte | `forms/creer-compte-client/` · lead detail CTA |
| Assigner candidat | `forms/assignation-bien/` |
| Exigences | `forms/dossier-exigences/` (staff) |
| Dépôt + disclaimer | `forms/candidature-location/` |
| Mes candidatures | `pages/espace/client/mes-candidatures/` |
| Revue staff (+ docs) | `pages/espace/agent/candidatures/` + detail |
| Suivi proprio (sans docs) | `pages/espace/proprio/candidatures/` + detail |

## 7. Spec fonctionnelle

### 7.1 Prospect (visite)

Toute soumission visite/contact location → `Lead` :

```
leadType: prospect
intent: rent_visit
listingId, name, phone, email?, slot?, message, consentAt
```

**Pas** de `User` automatique.

### 7.2 Compte

| Mode | Action |
| --- | --- |
| Scratch | `createClientFromScratch` → invite |
| Depuis prospect | `createClientFromLead` → prérempli · `Lead.convertedUserId` |

### 7.3 Assignation

```
PropertyAssignment.role =
  landlord | co_landlord | candidate | tenant | buyer | guarantor
```

- `candidate` : dépôt docs **uniquement** (pas loyers / panne locataire)
- `tenant` : débloque portail locataire (S10)
- Accept = promotion `candidate` → `tenant` (audit)

### 7.4 Confidentialité documents (non négociable)

> Les pièces uploadées par le candidat sont accessibles **uniquement au personnel EverGreen** (agent assigné, OD, GER, admin).  
> Le **propriétaire n’y a pas accès** (ni URL signée, ni preview, ni download).

À l’UI de dépôt : bandeau + checkbox + `privacyNoticeVersion` persistée.

### 7.5 Exigences (seed SN)

| Code | Label | Required |
| --- | --- | :---: |
| `cni` | CNI / passeport | ● |
| `pay_stubs_3` | 3 dernières fiches de paie | ● |
| `contract_work` | Contrat / attestation emploi | ● |
| `bank_ribo` | RIB | ○ |
| `guarantor_id` | Pièce garant | ○ |
| `guarantor_pay_stubs` | Justifs revenus garant | ○ |
| `residence_cert` | Certificat de résidence | ○ |
| `application_letter` | Lettre de motivation | ○ |
| `custom` | Pièce libre | ○ |

### 7.6 États candidature

```
draft → submitted → under_review → shortlisted → accepted
                 ↘ rejected | withdrawn | expired
```

### 7.7 Hors scope S08

Signature e-bail · Wave caution · scoring ML · self-serve « postuler » public sans visite/compte/assignation.

## 8. Données

`Lead` · `User` · `PropertyAssignment` · `ApplicationRequirementSet` · `RentalApplication` · `ApplicationDocument` · `Lease` · `SaleInterest` (soft)

## 9. API (cible)

| Action | Server Action |
| --- | --- |
| Visite | `leads.createVisitRequest` |
| Compte | `users.createClientFromScratch` · `createClientFromLead` |
| Assignation | `assignments.invite` / `activate` (role candidate\|…) |
| Exigences | `requirements.*` (staff) |
| Candidature | `applications.submit` (+ notice) |
| Docs | `applications.documents.upload` · `read` (**staff / own**) |
| Revue | `applications.shortlist|reject|requestDocs|accept` |

## 10. Monétisation

Inclus mandat location/gestion. Réduit time-to-let + conformité docs.

## 11. KPIs

`visit_requested` · `lead_converted` · `candidate_assigned` · `application_submitted` · `application_complete_rate` · `time_to_select_days` · `tenant_activated` · `docs_landlord_denied` (audit soft)

## 12. Risques & conformité

- Vault : landlord **deny-by-default** · tests ACL bloquants CI
- Motifs refus catalogue (anti-discrimination)
- Consentement + finalités notice versionnée
- Pas de partage WA des pièces (`19`)

## 13. Phasing

| Phase | Contenu |
| --- | --- |
| **S08** | Flow #1–#8 complet · staff-only docs · disclaimer |
| **S10** | Widgets portail locataire / proprio sur data S08 |
| **Plus tard** | Scoring `23` · caution auto |

## 14. Sources

- `dossier/tech/site/sprints/S08-candidatures-location/`
- `dossier/tech/site/14-matrice-droits-roles.md`
- `dossier/tech/site/02-parcours-utilisateurs.md` (J3)
- `22-portail-multi-biens.md`

---

*Spec hub EverGreen SN — sprint `S08-candidatures-location`.*
