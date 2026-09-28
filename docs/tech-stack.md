# Tech stack

Locked decisions for the EverGreen Senegal real estate product.

## Core

| Layer | Choice | Why |
| --- | --- | --- |
| Frontend / app | **Next.js (App Router) + TypeScript** | SEO for listing/detail pages, SSR/SSG, clean URLs, Open Graph |
| UI | **Tailwind CSS + shadcn/ui** | Modern primitives without fighting custom EverGreen design |
| Backend | **Node.js** — start with Next.js Route Handlers / Server Actions; extract **Fastify** or **Express** if API grows | Same language as frontend; simple to evolve |
| Database (planned) | PostgreSQL + Prisma (or Drizzle) | Relational listings, geo queries, agents |
| Maps | **Leaflet** (OpenStreetMap) or **Mapbox GL** | Interactive property discovery — primary differentiator |
| Auth (later) | NextAuth / Auth.js | Sign up, saved searches, agent dashboards |

## SEO priorities (Next.js)

- Server-rendered listing & detail pages (`/terrains/...`, `/appartements/...`)
- French meta titles/descriptions per city & category
- JSON-LD `RealEstateListing` / `Place` structured data
- Sitemap + `robots.txt`
- Image optimization via `next/image`
- **Social share cards optimized for Facebook, WhatsApp, Instagram, TikTok** — see `docs/social-share-cards.md`
  - Dynamic OG via `next/og` (3 crops: 1200×630, 1080×1080, 1080×1920)
  - Short FR titles/descriptions in FCFA
  - Share sheet + Story/TikTok downloadable cards

## Design system source

- Visual reference: EverGreen Dribbble boards in `assets/design/`
- Tokens: `docs/design-tokens.md`
- Competitor context: `docs/competitive-analysis.md`
- PropTech roadmap: `docs/proptech-analysis.md`
- Add-ons: `docs/add-ons.md`
- Positioning: `docs/positioning.md`
- Share cards: `docs/social-share-cards.md`
- Blog / guides: `docs/blog/strategie.md`

## Monorepo layout (planned)

```
apps/web     → Next.js site
apps/api     → optional standalone Node API (later)
packages/ui  → shared shadcn components (optional)
```

v1 can be a single Next.js app under `apps/web` or repo root.
