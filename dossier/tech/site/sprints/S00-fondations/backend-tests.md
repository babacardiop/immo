# S00 — Backend tests

## Todo

- [ ] Health returns 200 when DB up
- [ ] Unauthenticated `GET /espace/agent` → redirect/401
- [ ] Login valid agent → session cookie
- [ ] Login invalid → 401 / error
- [ ] Migration applies clean on empty Neon DB
- [ ] Role claim present on session (agent)

## Stack test

Vitest (ou Jest) + request helper · pas Playwright ici
