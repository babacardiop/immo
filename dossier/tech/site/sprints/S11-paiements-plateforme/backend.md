# S11 — Backend

**US :** US-V3-10…14 · EF-POR-05 / EF-PAY-*  
**Outcome :** paiements **loyer** + **caution** via Wave / OM sur la plateforme · split frais · ledger **immuable** · ACL `payments_ops` + payeur + bénéficiaire  
**Avant :** S08 (tenant + Lease) · S10 (portails) · KYB Wave/OM ops  
**Après :** quittances live · % loyers digitaux · monétisation 0,1 %  
**Vague :** V3+  
**Spec :** [`54-paiements-plateforme-loyer-caution.md`](../../../../../docs/add-ons/specs/03-location-gestion/54-paiements-plateforme-loyer-caution.md)

---

## Split frais (canonique)

| Acteur | Taux | Porté par |
| --- | ---: | --- |
| Wave | ~**1 %** | Frais PSP (contrat merchant) |
| Orange Money | ~**1 %** marchand (**0 % pour le payeur client**) | Idem — **pas** 0 % côté marchand ; confirmer KYB |
| EverGreen | **0,1 %** | Commission plateforme |
| Bénéficiaire (`payee`) | reste | Landlord / compte payout configuré sur le bail |

```
amount_xof (contractuel)
  − provider_fee_xof
  − platform_fee_xof (0.1 %)
  = net_payee_xof
```

Défaut v1 : frais **déduits** du montant (quittance affiche face + net + lignes de frais).  
Alternative mandat : locataire paie face + fees — flag `feeBearer=payer|payee`.

---

## Flow

| # | Action | Qui | Système |
| ---: | --- | --- | --- |
| 1 | Échéance loyer / demande caution ouverte | Système / staff | `RentDue` / `DepositDue` lié `Lease` |
| 2 | Checkout (provider Wave\|OM) | Locataire | `Payment` pending + preview fees |
| 3 | Hosted page PSP | Locataire | Redirect |
| 4 | Webhook HMAC | Provider | `paid` idempotent · append ledger |
| 5 | Quittance + notifs | Système | PDF hash · email/WA soft |
| 6 | Settlement payee | Ops / payout job | Net vers `PayeeAccount` |

---

## Todo

### 1. Schéma & immutabilité

- [ ] Modèles `Payment` · `PaymentLedgerEntry` · `PayeeAccount` · `RentDue` / `DepositDue` soft
  - Done when: migration + seed staging
- [ ] Ledger **append-only** : pas d’UPDATE/DELETE sur entries ; payment `paid` non mutable (sauf status machine vers refunded_soft via **nouvelle** entry)
  - Done when: Prisma middleware / policy + tests deny mutate
- [ ] `contentHash` (+ `prevHash` soft) sur chaque entry
  - Done when: verify chain helper

### 2. Fee engine

- [ ] `computePaymentSplit({ amountXof, provider, feeBearer })`
  - Wave fee config · OM fee config · platform **0.1 %**
  - Arrondis entiers XOF documentés
  - Done when: table de cas unitaires (100k, 1, 999…)
- [ ] Config ops `PAYMENT_FEE_WAVE_BPS` · `PAYMENT_FEE_OM_BPS` · `PAYMENT_FEE_PLATFORM_BPS=10` (0,1 %)
  - Done when: env + defaults

### 3. Checkout & webhooks

- [ ] `POST /api/payments/checkout` — ACL : payer = tenant du lease
  - Body : `purpose` rent\|deposit · `provider` · `dueId` · `channel?` button\|qr\|sms\|whatsapp
  - Done when: crée Payment pending + ledger `checkout_created`
- [ ] Sessions Wave + OM (dual) — retourne `checkoutUrl` (hosted PSP)
  - Done when: redirectUrl returned · stocké sur Payment
- [ ] `GET /api/payments/:id/qr` — PNG/SVG QR du `checkoutUrl` (ACL détail)
  - Done when: scan → ouvre Wave/OM · même paymentId
- [ ] `POST /api/payments/:id/share-link` — token TTL · canaux `sms` \| `whatsapp`
  - ACL : payer own **ou** `payments_ops`
  - Done when: URL courte `/p/{token}` résout vers checkout (auth soft si besoin)
- [ ] Envoi SMS / WA (template) avec lien — provider existant Resend/SMS/WA Business
  - Done when: event `payment_link_sent` append ledger
- [ ] `POST /api/payments/webhook/{wave|om}` — verify signature · idempotent `provider_event_id`
  - OM : polling fallback si notif flaky
  - Done when: paid → ledger `provider_paid` + `fees_recorded` + `payee_allocated`
- [ ] Jamais trust `return_url` / ouverture lien seul pour marquer paid

### 4. ACL payments

- [ ] Rôle / capability **`payments_ops`** (assignable — **pas** default agent)
  - Permissions : `payments.ledger.read` · `payments.refund_request` (soft)
  - Done when: seed rôle + `roles.assign` admin
- [ ] `GET /api/payments/:id` allow si :
  1. `userId === payerUserId` **OU**
  2. `userId === payeeUserId` **OU**
  3. user a `payments.ledger.read`
  - sinon **403**
  - Done when: tests matrice
- [ ] Liste : tenant own paid/pending · landlord own reçus · `payments_ops` agence
  - Agent sans rôle → liste vide / 403 route BO

### 5. Quittances & événements

- [ ] Génération quittance (snapshot JSON + PDF) · `quittanceHash`
  - Done when: GET quittance même ACL que détail
- [ ] Events : `payment_pending` · `payment_paid` · `payment_failed` · `quittance_issued`
- [ ] Contre-écriture seulement : `PaymentAdjustment` liée (n’efface pas l’original)

### 6. Payee

- [ ] `PayeeAccount` sur landlord (Wave/OM/bank) ou escrow agence si mandat gestion
  - Evergreen « entered to receive » = `payeeUserId` / account figé au checkout (snapshot)
  - Done when: net toujours routé vers snapshot payee (pas de switch post-paid)

## Refs

`../07` · `../14` · `../19` · add-on **54** · DS forms/pages S11
