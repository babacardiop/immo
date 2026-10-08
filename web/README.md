# EverGreen web (S00 fondations)

Next.js App Router · Prisma · Auth.js · Tailwind

## Local setup

```bash
cp .env.example .env
# paste Neon DATABASE_URL + generate AUTH_SECRET

npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

- Public: http://localhost:3000  
- Login: http://localhost:3000/espace/connexion  
- Health: http://localhost:3000/api/health  

Default seed agent: `agent@evergreen.sn` / `ChangeMeStaging1!` (override via `SEED_AGENT_*`).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `start` | Production |
| `npm run lint` / `typecheck` / `test` | CI gates |
| `npm run db:migrate` | Dev migrations |
| `npm run db:seed` | Seed staging agent |

## Render

Root Directory: `web` · Build: `npm ci && npm run build` · Start: `npm start`
