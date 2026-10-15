# S11 — Backend

**US :** dashboards + reporting multi-rôles (`14`)  
**Outcome :** `/espace/*` dashboards livrés · exports / KPI scoped  
**Après :** S05 fidelity · S06 carte/géo · S07 outils · **S08 candidatures** · **S09 Property/Listing** · S10 embeds (peut spike design dashboards en parallèle)

## Todo

- [ ] Dashboard aggregates per rôle (agent own · OD/GER all · admin system)
- [ ] Reporting endpoints / Server Actions : période, filtres, ACL scope
- [ ] Agent : SLA leads · pipeline perso · annonces stats · candidatures médiation soft
- [ ] Moderator (OD) : SLA global · assign queue · publish quality
- [ ] GER : KPI pipeline · commissions soft · conversion
- [ ] Admin : users/sessions · health soft · audit mutations
- [ ] Client (V3) : bail / échéancier / quittances feed — **alimenté par assignments S08**
- [ ] Landlord (V3) : biens gérés · loyers · reporting fiscal soft — **scope = PropertyAssignment S08**
- [ ] Widget candidatures ouvertes (landlord) · deep-link S08 inbox
- [ ] Export CSV/PDF soft (OD+ / GER / landlord own) — rate limited
- [ ] Audit trail who exported what

## Refs

`../09` · `../14` · `../04` · `assets/design/design-system/dashboards/`
