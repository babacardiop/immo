# Coffre-fort documents / certification

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `21-certification-docs.md` |
| **Priorité** | **P1** |
| **Catégorie** | Confiance |
| **Synthèse** | Stockage sécurisé TF, bail, délibération+tutelle, EDR, EDL, quittances, rapports diligence — partage contrôlé + audit. |

## 1. Problème client

Docs éparpillés WhatsApp; perte; falsification; diaspora sans preuve datée.

## 2. Réalité marché (recherche)

Attente diaspora + gestion pro (Noflaye: docs 24/7). État (SGF/SIFCOM) digitalise lentement — le coffre agence reste nécessaire.

## 3. Utilisateurs & synergies

- **Users:** Tous rôles
- **Synergie produit:** Tous add-ons produisant PDF.

## 4. Inputs

- fichiers typés (`tf`, `bail`, `deliberation`, `edr`, `nicad`, `diligence_report`, …)
- métadonnées type + hash optionnel
- date / auteur upload

## 5. Outputs

- liens signés
- audit log

## 6. UX / surfaces

- Dashboard Documents

## 7. Spec fonctionnelle

- S3
- ACL par rôle
- watermark option

## 8. Données

- Document
- DocumentAcl

## 9. API (cible)

- upload/download signed URLs

## 10. Monétisation

Inclus; premium retention longue.

## 11. KPIs

docs_per_case

## 12. Risques & conformité

RGPD/data residency; virus scan.

## 13. Phasing

- **v1:** Upload + roles
- **Plus tard:** e-sign

## 14. Sources

- https://www.noflaye.sn/
- docs/proptech-analysis.md

---

*Spec générée pour l'agence full-service SN — voir aussi `docs/add-ons.md`, `docs/positioning.md`.*
