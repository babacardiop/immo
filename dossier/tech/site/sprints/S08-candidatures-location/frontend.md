# S08 — Frontend

**Outcome :** UI du parcours complet visite → prospect → compte → candidat → docs → accept → portail locataire  
**Frames DS :** `assets/design/design-system/` (voir Refs)

---

## Flow UI (écrans par action)

| # | Action | Surface / frame |
| ---: | --- | --- |
| 1 | Demande visite site | Fiche `/louer/[slug]` + form visite (lead) — crée prospect |
| 2 | Lead dans CRM | `/espace/agent/leads/[id]` — stage visite / intéressé |
| 3 | Créer compte (scratch \| depuis prospect) | `forms/creer-compte-client/` · CTA depuis lead |
| 4 | Assigner bien comme **candidat** | `forms/assignation-bien/` rôle = Candidat |
| 5 | Dépôt documents | `forms/candidature-location/` + **bandeau confidentialité staff-only** |
| 6a | Revue docs (staff) | `pages/espace/agent/candidature-detail/` + viewer |
| 6b | Suivi proprio (sans docs) | `pages/espace/proprio/candidatures/` + detail **sans** viewer fichiers |
| 7 | Accept | Modal staff → débloque portail locataire |
| 8 | Portail locataire | `/espace/client` bien visible (S10 widgets) |

---

## Todo

### 1. Demande visite → prospect

- [ ] Form / CTA **Demander une visite** sur fiche location
  - Champs : nom · tel · email · créneau · message · consent
  - Done when: success → « Votre demande est enregistrée » · **Lead créé** (pas de compte)
- [ ] Afficher liste indicative « Pièces souvent demandées » (lecture seule, pas upload public)

### 2. Créer compte client

- [ ] Form **Créer un compte client** (`forms/creer-compte-client/`)
  - Mode A : from scratch (email/tel)
  - Mode B : depuis prospect (select lead / depuis lead-detail prérempli)
  - Envoi invite magic link
  - Done when: user créé · lead `converted` si B
- [ ] Bouton sur lead detail : **Créer le compte client**

### 3. Assignation candidat

- [ ] Form **Assignation** (`forms/assignation-bien/`)
  - Rôles : Propriétaire · **Candidat** · Locataire (rare manuel) · Acquéreur · Co-proprio
  - Helper copy si rôle Candidat : « Ouvre le dépôt de dossier pour ce bien. Les pièces ne sont visibles que par EverGreen. »
  - Done when: candidat voit le bien dans `/espace/client/candidatures` (dépôt) **sans** widgets locataire (loyers/quittances)
- [ ] Liste assignations agent (pending / active / revoke)

### 4. Exigences (staff)

- [ ] Form exigences (`forms/dossier-exigences/`) — **agent/OD**
  - Templates SN · preview candidat
  - Landlord : vue lecture « pièces demandées pour votre bien » (pas d’accès vault)

### 5. Dépôt candidature (candidat assigné)

- [ ] Form (`forms/candidature-location/`)
  - Uniquement si `PropertyAssignment(candidate)` active
  - Uploads dynamiques = exigences
  - **Bandeau + checkbox obligatoires :**
    > « Vos documents (CNI, justificatifs de revenus, etc.) sont transmis **uniquement au personnel EverGreen**. Le propriétaire du bien n’y a pas accès. »
  - Done when: submit bloqué sans acceptation notice · version notice loguée
- [ ] Page **Mes candidatures** (`pages/espace/client/mes-candidatures/`)
  - Statuts · docs manquants · pas d’accès loyers tant que pas `tenant`
- [ ] Après accept : CTA / redirect portail locataire (bien débloqué)

### 6. Revue

- [ ] **Agent** inbox + detail avec **viewer docs** (`pages/espace/agent/candidatures/` + `candidature-detail/`)
  - Actions shortlist / request docs / reject / accept
- [ ] **Proprio** inbox métadonnées (`pages/espace/proprio/candidatures/`)
  - Detail **sans** viewer · message UI : « Les pièces sont examinées par EverGreen. »
  - Soft : voir synthèse agent + % complétude + statut
  - Si `landlord_decides` : bouton confirmer sélection **sans** ouvrir fichiers
- [ ] Modal accept : promote candidate→tenant · autres clôturés · portail locataire débloqué

### 7. States

- [ ] Empty · loading · error MIME · success invite compte · disclaimer visible (a11y)

## Refs

`forms/{creer-compte-client,assignation-bien,dossier-exigences,candidature-location}/`  
`pages/espace/{agent,proprio,client}/candidature*` · `dashboards/{landlord,client}/persona.md`
