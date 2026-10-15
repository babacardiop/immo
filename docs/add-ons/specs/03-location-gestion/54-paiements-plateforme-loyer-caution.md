# Paiements plateforme — loyer & caution

| Champ | Valeur |
| --- | --- |
| **ID fichier** | `54-paiements-plateforme-loyer-caution.md` |
| **Priorité** | **P0** (Vague 3+) |
| **Catégorie** | Location / Fintech |
| **Synthèse** | Locataire paie **loyer** ou **caution** via Wave / Orange Money **sur la plateforme** ; split frais (PSP + EverGreen 0,1 %) ; net vers le **bénéficiaire configuré** (landlord / compte payout) ; **ledger immuable** ; ACL stricte (rôle payments + payeur + bénéficiaire). |
| **Sprint** | `S12-paiements-plateforme` |

## 1. Problème client

- Loyers / cautions en cash ou Wave « perso » = pas de preuve, litiges, fuite d’argent.
- Proprio / locataire veulent une **quittance** et une trace unique.
- EverGreen veut monétiser le rail (0,1 %) sans être banque ni « Wave vendeur » (vente).

## 2. Réalité marché (SN 2026)

| Rail | Frais marchand (indicatif) | Note |
| --- | --- | --- |
| **Wave Business** | ~**1 %** (souvent plafonné) | Checkout + webhook HMAC · KYB 5–10 j |
| **Orange Money** Web / Marchand | ~**1 %** commission partenaire | **Gratuit pour le client payeur** ; OM prélève côté marchand — **pas 0 % marchand**. Confirmer au contrat KYB. |
| **EverGreen** | **0,1 %** du montant du transfert | Commission plateforme, hors frais PSP |

> Confusion fréquente : « OM = 0 % » = **0 % pour le locataire** qui paie. Le **marchand** (EverGreen) paie typiquement ~1 % à OM.

## 3. Utilisateurs & ACL

| Acteur | Voir **liste** paiements | Voir **un** paiement précis | Modifier ledger payé |
| --- | :---: | :---: | :---: |
| Locataire (payeur) | ● own | ● own | ○ |
| Landlord / bénéficiaire (`payee`) | ● own (reçus) | ● own | ○ |
| Agent **sans** rôle `payments_ops` | ○ | ○ | ○ |
| Agent / staff avec **`payments_ops`** | ● scoped agence | ● | ○ |
| OD / GER / Admin (si `payments_ops` ou override) | ● | ● | ○ (admin technique : pas d’edit métier) |

**Règle d’or détail :** pour un `Payment` donné, seuls **payeur + bénéficiaire + détenteurs `payments.ledger.read`** peuvent lire. Les autres agents → 403.

**Synergies :** bail / tenant S08 · portails S10 · caution partenaire `11` (alternative) · `07-integrations` · matrice `14`.

## 4. Flow — paiement via plateforme

```
0. Ops : KYB Wave Business + Orange Money → API keys + webhooks (infra S12)
1. Bail / échéance active (Lease + assignment tenant)
       OU demande caution post-accept
2. Locataire (ou lien partagé) ouvre checkout plateforme
       → purpose = rent | deposit (caution)
       → provider = wave | orange_money
3. POST /api/payments/checkout
       → calcule fee_lines (psp + evergreen 0.1% + net_payee)
       → crée Payment (pending) + PaymentLedgerEntry append-only
       → checkoutUrl (hosted Wave / OM)
4. Canal d’accès au même checkoutUrl :
       A. Bouton in-app → redirect
       B. QR code → scan → hosted PSP
       C. Lien SMS (TTL)
       D. Lien WhatsApp (TTL)
5. Webhook signé (source of truth)
       → status = paid (idempotent)
       → append ledger events (immutable)
       → quittance PDF / notif payeur + payee
6. Settlement / payout vers compte bénéficiaire (Wave Payout / OM / bank)
       → net_to_payee crédité ; fees enregistrées
```

**Interdit :** paiement Wave **vendeur** (parcours vente / diaspora) — hors scope S12 ; reste séquestre notaire.  
**Interdit :** SMS/WA avec numéro perso du landlord — uniquement lien plateforme.

## 5. Split d’un transfert (exemple)

Montant contractuel `amount_xof` = **100 000** FCFA (loyer ou caution).

| Ligne | Taux | Montant | Qui |
| --- | ---: | ---: | --- |
| Frais PSP (Wave **ou** OM) | ~1 % | 1 000 | Wave / Orange |
| Commission EverGreen | **0,1 %** | 100 | EverGreen |
| Net bénéficiaire | — | **98 900** | Landlord / payee configuré |

- Afficher le **détail des frais** avant confirm (transparence).
- Qui « porte » les frais (déduits du loyer vs surtaxe locataire) = **paramètre contrat / mandat** — défaut v1 : **déduits du montant**, net reçu &lt; face value (documenté quittance).
- Arrondis : **entiers XOF** ; règles d’arrondi figées en code + tests.

## 6. Ledger immuable

| Règle | Impl |
| --- | --- |
| Append-only | `PaymentLedgerEntry` : INSERT only — **pas d’UPDATE / DELETE** métier |
| Source of truth paid | Webhook vérifié (HMAC) + idempotency `provider_event_id` |
| Quittance | Snapshot JSON + PDF hash stocké ; régénération = **copie** pas rewrite |
| Audit | Toute lecture BO sensible optionnelle soft ; toute tentative mutate → deny + log |
| Integrity soft | `content_hash` / chaîne d’événements (v1 soft, v1.1 hash chain) |

Impossible d’« corriger » un paiement paid : uniquement **contre-écriture** (`PaymentAdjustment` linked) avec motif + auteur — l’historique original reste.

## 7. Données (cible)

```
Payment {
  id, purpose: rent|deposit|fee,
  provider: wave|orange_money,
  amount_xof, currency: XOF,
  status: pending|paid|failed|expired|refunded_soft,
  leaseId?, listingId?,
  payerUserId, payeeUserId,   // payee = landlord ou compte evergreen payout
  providerFeeXof, platformFeeXof, netPayeeXof,
  externalId, paidAt?,
  quittanceHash?
}

PaymentLedgerEntry {
  id, paymentId, seq, type, payloadJson, actor?, createdAt,
  contentHash, prevHash?   // append-only
}

PayeeAccount {
  userId | agencyEscrow,
  channel: wave|om|bank,
  handle / IBAN masked,
  verifiedAt
}

Role / capability: payments_ops  → permissions payments.ledger.read | payments.refund_request (soft)
```

## 8. API (cible)

| Method | Path | Qui |
| --- | --- | --- |
| POST | `/api/payments/checkout` | Locataire (own lease) |
| GET | `/api/payments/:id` | payeur \| payee \| `payments_ops` |
| GET | `/api/payments` | scoped liste |
| POST | `/api/payments/webhook/{wave\|om}` | provider (HMAC) |
| GET | `/api/payments/:id/quittance` | même ACL détail |

## 9. Monétisation

- **0,1 %** EverGreen / transfert réussi (loyer + caution plateforme).
- PSP fees = coût d’acquisition rail (non marge).
- Alternatif caution partenaire (`11`) = referral — **pas** le même flux.

## 10. KPIs

`payments_paid_count` · `gmv_xof` · `platform_fee_xof` · `% digital rent` · `time_to_quittance` · webhook fail rate.

## 11. Risques & conformité

- KYB Wave + OM **avant** prod.
- Webhooks : signature, replay, polling OM.
- Ne jamais exposer secrets client.
- RGPD / retention quittances (`19`).
- Communication claire des frais (pas de surprise net).

## 12. Phasing

| Phase | Contenu |
| --- | --- |
| **S12 v1** | Checkout loyer + caution · dual Wave/OM · ledger immuable · ACL · quittance · UI portails + BO payments_ops |
| **Plus tard** | Auto-debit soft · multi-payeurs · payouts instant · hash chain forte · refunds structurés |

## 13. Design system

- Form : `forms/paiement-loyer-caution/`
- Pages : `pages/espace/{client,proprio,agent}/paiement{s,-detail}/`

## Refs

`dossier/tech/site/07-integrations.md` · `14-matrice-droits-roles.md` · sprint `S12-paiements-plateforme` · S08 bail/tenant · S11 widgets.

---

*Spec EverGreen — paiements loyers/caution via plateforme, jamais Wave vendeur.*
