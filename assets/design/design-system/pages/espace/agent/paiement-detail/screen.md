# Page — Détail paiement + ledger (staff `payments_ops`)

**Sprint :** `S12-paiements-plateforme`  
**Route :** `/espace/agent/paiements/[id]`  
**Frame :** [`layout.jpg`](./layout.jpg)

## Composition

1. En-tête : id · statut · purpose · provider · external ids
2. Parties : payeur · bénéficiaire (snapshot payee)
3. Split complet (bps + XOF)
4. **Timeline ledger append-only** (seq · type · timestamp · hash soft) — pas d’edit
5. Quittance + liens portail client/proprio (si ACL)
6. Soft : demander ajustement (crée ticket / adjustment — n’altère pas l’historique)

## Anti

Pas de champs éditables sur montants paid.  
Pas d’accès pour agent sans `payments_ops`.

## Job

Auditer un paiement sans pouvoir le falsifier.
