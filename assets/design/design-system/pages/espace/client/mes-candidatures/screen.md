# Page — Mes candidatures (client)

**Sprint :** `S08-candidatures-location`  
**Route :** `/espace/client/candidatures`  
**Frame :** [`layout.jpg`](./layout.jpg)

## Composition

1. Cartes biens où `assignment=candidate` : statut · % · docs manquants
2. CTA **Compléter le dossier** → form avec disclaimer staff-only
3. Après accept : badge « Locataire » + deep-link portail (loyers débloqués)
4. Empty : « Après votre visite, EverGreen vous ouvrira un espace candidat. »

## Gate

Pas de widgets loyers/quittances tant que role ≠ `tenant`.
