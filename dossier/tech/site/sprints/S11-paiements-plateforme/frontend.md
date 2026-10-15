# S11 — Frontend

**US :** US-V3-10…14  
**DS :** `forms/paiement-loyer-caution/` · `pages/espace/{client,proprio,agent}/paiement*`

## Todo

### Locataire (`/espace/client`)

- [ ] Widget **Prochain loyer** / **Caution à verser** → CTA Payer
- [ ] Form checkout : montant · purpose · choix **Wave | Orange Money** · **détail frais** (PSP + EverGreen 0,1 % + net proprio)
- [ ] **Canal A — Bouton** : CTA **Payer en sécurité** → redirect page hébergée Wave/OM
- [ ] **Canal B — QR** : afficher QR du `checkoutUrl` (mobile scan / agent montre l’écran)
- [ ] **Canal C/D — Partager** : « Envoyer le lien par SMS » / « WhatsApp » (même checkoutUrl TTL)
- [ ] Return states : succès (quittance) · échec · pending (ne pas afficher paid sans sync)
- [ ] Liste `/espace/client/paiements` · détail `/espace/client/paiements/[id]` (own only)
- [ ] Download quittance PDF

### Landlord (`/espace/proprio`)

- [ ] `/espace/proprio/paiements` (ou enrichir `/loyers`) : encaissements reçus · net + frais
- [ ] Détail paiement own · quittance
- [ ] Empty : « Aucun paiement digital — le locataire paiera via la plateforme »

### Staff `payments_ops` (`/espace/agent`)

- [ ] Nav **Paiements** visible **uniquement** si `payments.ledger.read`
- [ ] Inbox `/espace/agent/paiements` : filtres purpose · provider · statut · bien
- [ ] Détail : split frais · ledger timeline (append-only) · parties · ids externes
- [ ] Soft : renvoyer lien paiement (SMS/WA) depuis détail pending
- [ ] Agent **sans** rôle : route hidden + page 403 soft

### Commun

- [ ] Copy anti-confusion : « Gratuit pour vous chez OM/Wave » vs frais marchand affichés côté plateforme
- [ ] Jamais CTA « paie le vendeur en Wave » sur surfaces vente
- [ ] States empty / loading / error DS
- [ ] Side-by-side vs frames DS S11

## Refs

`assets/design/design-system/forms/paiement-loyer-caution/` · `pages/espace/*/paiement*` · add-on **54**
