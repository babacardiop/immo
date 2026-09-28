# Social share cards

Requirement: every shareable URL (home, listing, agent, city landing) must render a **preview card optimized for Facebook, WhatsApp, Instagram, and TikTok**.

Implementation: Next.js `generateMetadata` + dynamic OG images (`next/og` / `ImageResponse`).

## Platform reality check

| Network | How link previews work | What we optimize |
| --- | --- | --- |
| **Facebook** | Classic Open Graph (`og:*`) | Landscape card 1.91:1 |
| **WhatsApp** | Reads Open Graph (cached aggressively) | Same OG image + short title/desc; small file size |
| **Instagram** | No rich feed link cards; Stories/DM/bio use OG when a URL is opened; people also screenshot | Square 1:1 brand card + Stories-ready 9:16 |
| **TikTok** | In-app / shared links use OG; native content is vertical | Landscape OG for links + 9:16 asset for creators |

We ship **three generated image variants** per page so every channel looks intentional.

## Image variants (required)

| Variant | Size | Ratio | Primary use |
| --- | --- | --- | --- |
| `og-landscape` | **1200 × 630** | 1.91:1 | Facebook, WhatsApp, LinkedIn, default `og:image` |
| `og-square` | **1080 × 1080** | 1:1 | Instagram profile/bio, DM previews, TikTok profile links |
| `og-story` | **1080 × 1920** | 9:16 | Instagram Stories, TikTok native shares / creator kits |

### Technical constraints

- Format: **JPEG** (WhatsApp/Facebook friendly) or PNG if transparency needed; prefer JPEG for listings
- Landscape file size target: **&lt; 300 KB** (WhatsApp is picky with large OG images)
- Absolute HTTPS URLs only (no relative paths)
- Always set `og:image:width`, `og:image:height`, `og:image:alt`, `og:image:type`
- Cache-bust when listing photos/price change (`?v={updatedAt}`)

## Metadata tags (per page)

```html
<!-- Primary (Facebook / WhatsApp / default) -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="EverGreen" />
<meta property="og:locale" content="fr_SN" />
<meta property="og:url" content="{canonicalUrl}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:image" content="{ogLandscapeUrl}" />
<meta property="og:image:secure_url" content="{ogLandscapeUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="{imageAlt}" />
<meta property="og:image:type" content="image/jpeg" />

<!-- Extra crops for clients that pick additional images -->
<meta property="og:image" content="{ogSquareUrl}" />
<meta property="og:image:width" content="1080" />
<meta property="og:image:height" content="1080" />

<!-- Twitter / X (also used as fallback by some scrapers) -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{description}" />
<meta name="twitter:image" content="{ogLandscapeUrl}" />
```

Listing pages: `og:type` = `article` (or product-like custom) + optional JSON-LD (separate from the card image).

## Copy rules (French, Senegal)

| Field | Max (safe) | Rules |
| --- | --- | --- |
| `og:title` | ~60–70 chars | Type + place + key fact — e.g. `Terrain 250 m² · Bambilor · Titre foncier` |
| `og:description` | ~110–150 chars (WhatsApp truncates hard) | Price in **FCFA**, surface, 1 trust signal — e.g. `25 000 000 FCFA · Viabilisé · Contact WhatsApp` |
| Image text overlay | ≤ 2 short lines | Never wall of text; brand mark always visible |

Avoid clickbait. Prefer: price, m²/ha, quartier, paper type (TF / acte / délibération).

## Dynamic card layout (listing)

Generated with `next/og` so every annonce gets a unique card:

1. Property photo (cover) with subtle dark gradient
2. EverGreen wordmark (corner)
3. Badge: `À vendre` / `À louer`
4. Title (1–2 lines)
5. Price line (large, FCFA)
6. Meta chips: surface · city · paper type
7. Optional map pin glyph (brand cue)

Same data → three crops (landscape / square / story) via shared React OG template + different `size` props.

## Routes (planned)

```
/api/og/listing/[id]?v=landscape
/api/og/listing/[id]?v=square
/api/og/listing/[id]?v=story
/api/og/page/[slug]?v=landscape   # home, city landings, etc.
```

`generateMetadata` points `og:image` at the landscape URL; square/story linked as additional `og:image` and exposed in a “Share” UI for creators.

## In-app Share UX

On listing detail, a **Share** sheet offering:

| Action | Behavior |
| --- | --- |
| WhatsApp | `https://wa.me/?text={encodedTitle+%2B+url}` |
| Facebook | Facebook sharer with canonical URL |
| Copy link | Clipboard + toast |
| Instagram / TikTok | Copy link + download **square** or **story** image (apps don’t accept arbitrary web share-in with rich cards the same way) |

Creators get a one-tap **“Télécharger carte Story (9:16)”** so TikTok/Instagram posts look native even when the platform won’t fetch OG.

## Validation checklist

Before launch / after template changes:

- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — scrape & clear cache
- [ ] WhatsApp: send link to a test chat on Android + iOS (check truncation + image)
- [ ] Instagram: paste URL in DM / Stories link sticker
- [ ] TikTok: paste URL in bio or message; confirm preview
- [ ] iMessage / Telegram as extra OG consumers

## Non-goals

- Native TikTok/Instagram posting API in v1
- Auto-posting listings to social networks (later growth feature)

## Stack note

See `docs/tech-stack.md` — share cards are part of the Next.js SEO moat, not an afterthought.
