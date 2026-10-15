# Page — Ledger paiements (staff `payments_ops`)

**Sprint :** `S12-paiements-plateforme`  
**Route :** `/espace/agent/paiements`  
**Frame :** [`layout.jpg`](./layout.jpg)  
**ACL :** visible **uniquement** si `payments.ledger.read` — sinon nav absente + 403

## Composition

Shell agent dense BO.

1. Bandeau rôle : « Accès paiements — lecture ledger »
2. Filtres : purpose · provider · statut · agent bien · période
3. Table dense : id court · parties · face · fees · net · paid_at · provider
4. Totaux soft : volume · platform_fee EverGreen
5. Empty : « Aucun paiement sur la période »

## Job

Superviser les flux passés par la plateforme (ops finance), pas closer un deal.
