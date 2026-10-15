# Form — Paiement loyer / caution (plateforme)

**Sprint :** `S12-paiements-plateforme`  
**Prérequis :** assignment `tenant` + échéance ouverte (loyer ou caution)  
**Frame :** [`layout.jpg`](./layout.jpg)

## Composition

1. Rappel bien · bail · **montant contractuel** (FCFA)
2. Sélecteur **Loyer** | **Caution** (si les deux dus ; sinon purpose figé)
3. Choix provider : **Wave** | **Orange Money** (cartes radio, pas pills génériques)
4. **Récap frais (obligatoire, avant CTA) :**
   - Frais opérateur (~1 % Wave / ~1 % OM marchand)
   - Commission EverGreen **0,1 %**
   - **Net reçu par le bénéficiaire**
5. Ligne bénéficiaire (nom landlord / « compte gestion EverGreen » si mandat)
6. **Canaux (même session PSP) :**
   - CTA primary **Payer en sécurité** → redirect Wave / OM
   - Bloc secondaire **QR code** (scanner avec le téléphone)
   - Actions tertiaires **Envoyer par SMS** · **WhatsApp** (lien TTL)
7. Microcopy : paiement via plateforme · quittance auto · pas de Wave vendeur (hors scope)

## Anti

Pas de champ IBAN libre.  
Pas de montant éditable par le locataire (sauf flag ops).  
Pas de dismiss du récap frais.  
Pas de numéro Wave perso du proprio dans le message.
