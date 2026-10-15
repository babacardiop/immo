# S12 — Infra

**Inclut l’onboarding marchand Wave + Orange Money** (KYB → API keys → webhooks → sandbox → prod) **et** les canaux de paiement (bouton redirect · QR · lien SMS/WhatsApp).

---

## 1. Secrets / env (après KYB)

```
# Wave Business
WAVE_API_KEY=
WAVE_WEBHOOK_SECRET=
WAVE_API_BASE_URL=          # sandbox vs prod

# Orange Money Web Payment
OM_CLIENT_ID=
OM_CLIENT_SECRET=
OM_MERCHANT_KEY=
OM_API_BASE_URL=
OM_TOKEN_URL=

# App
PAYMENTS_SUCCESS_URL=       # https://…/espace/client/paiements/retour
PAYMENTS_CANCEL_URL=
PAYMENT_FEE_WAVE_BPS=100
PAYMENT_FEE_OM_BPS=100
PAYMENT_FEE_PLATFORM_BPS=10
PAYMENTS_LINK_TTL_HOURS=72
```

Secrets **uniquement** Render / vault — jamais commit.

---

## 2. Runbook inscription marchand (manuels — bloquant S12 prod)

### 2.1 Prérequis légaux (agence)

- [ ] NINEA + RCCM à jour
- [ ] Compte bancaire settlement (reversements PSP → EverGreen)
- [ ] Pièces dirigeants / KYC agence
- [ ] Décider **merchant of record** = EverGreen (pas le landlord) pour checkout v1

### 2.2 Wave Business

- [ ] Créer compte **Wave Business** (SN) · demande accès **Checkout / API**
- [ ] Soumettre KYB (NINEA/RCCM) — délai indicatif **5–10 j**
- [ ] Récupérer **API key** + **webhook secret**
- [ ] Enregistrer webhook staging : `POST https://{staging}/api/payments/webhook/wave`
- [ ] Enregistrer webhook prod : idem URL prod
- [ ] Tester **sandbox** : session checkout → paid mock → notre webhook HMAC OK
- [ ] Basculer clés prod dans Render (env group `payments`)

### 2.3 Orange Money (Web Payment / Marchand)

- [ ] Demande offre **Paiement Internet / API** Orange Business SN
- [ ] KYB partenaire — délai indicatif **7–15 j**
- [ ] Récupérer `client_id` · `client_secret` · `merchant_key`
- [ ] Configurer `notif_url` = `POST https://{env}/api/payments/webhook/om`
- [ ] Valider OAuth token + `/webpayment` sandbox
- [ ] Activer **polling** status (OM notif parfois flaky) — cron soft
- [ ] Clés prod dans Render

### 2.4 Paralléliser

- [ ] Lancer KYB Wave **et** OM **avant** le code freeze S12 (gate ops)
- [ ] Checklist sign-off OD/GER : « sandbox dual provider vert »

---

## 3. Canaux de paiement (ce que l’infra doit permettre)

Tous les canaux créent le **même** `Payment` pending + `redirectUrl` / `checkoutUrl` issu de l’API Wave ou OM. Source of truth = **webhook** (pas le clic seul).

| Canal | Qui déclenche | UX | S12 |
| --- | --- | --- | :---: |
| **A. Bouton in-app** | Locataire sur `/espace/client` | Choisit Wave/OM → CTA → **redirect** page hébergée PSP | **Must** |
| **B. QR code** | Locataire (écran) ou agent (imprimé / montrait) | QR encode `checkoutUrl` ou deep-link app → scan → paye sur Wave/OM | **Must** |
| **C. Lien SMS** | Système / agent `payments_ops` | SMS avec URL courte one-time → ouvre checkout | **Should** |
| **D. Lien WhatsApp** | Système / agent | Template WA Business avec lien payer (même URL) | **Should** |

**Règles canaux C/D :**

- Lien = token signé TTL (`PAYMENTS_LINK_TTL_HOURS`) · 1 paymentId · pas de montant libre dans l’URL
- Même ACL : seul le `payerUserId` (ou session après magic soft) peut finaliser
- **Interdit** : envoyer un numéro Wave perso du landlord / « paie ce numéro »

---

## 4. Manuels app / ops

- [ ] Seed rôle **`payments_ops`** + 1–2 agents de test
- [ ] Seed `PayeeAccount` landlord staging
- [ ] Feature flag `payments_platform_v1`
- [ ] Provider SMS (existante ou soft) + Meta WA Business template « paiement loyer »
- [ ] Runbook incident (webhook down · double charge · dispute · lien expiré)
- [ ] Monitoring : webhook fail rate · lag paid→quittance · lien open→paid conversion

## Done when

- [ ] Comptes Wave + OM **approuvés** (ou sandbox signée si prod KYB encore en cours)
- [ ] Clés dans Render · webhooks reçus en staging
- [ ] Locataire paie via **bouton** et via **QR** (sandbox)
- [ ] Soft : 1 parcours SMS **ou** WA avec lien → paid
- [ ] Agent sans `payments_ops` ne voit pas le module
