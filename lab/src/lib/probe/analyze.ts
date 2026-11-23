import type { CrawlVerdict, RenderMode } from "@prisma/client";

/** Signals extracted from one fetched HTML page. Pure — unit tested. */
export type PageSignals = {
  antiBot: string | null;
  renderMode: RenderMode;
  priceHits: number;
  linkCount: number;
  hasJsonLd: boolean;
};

const PRICE_RE = /\d[\d\s.  ]{2,}\s*(?:F\s?CFA|FCFA|CFA|XOF|€|EUR)\b|(?:F\s?CFA|FCFA|XOF)\s*\d/gi;

export function detectAntiBot(status: number | null, headers: Headers, html: string): string | null {
  const server = headers.get("server")?.toLowerCase() ?? "";
  if (headers.get("cf-mitigated") === "challenge") return "cloudflare-challenge";
  if (/cf-chl|challenge-platform|Just a moment\.\.\./i.test(html) && server.includes("cloudflare"))
    return "cloudflare-challenge";
  if (headers.get("x-datadome") || /datadome/i.test(html.slice(0, 5000))) return "datadome";
  if (/_incapsula_|incap_ses/i.test(html)) return "incapsula";
  if (/perimeterx|px-captcha/i.test(html)) return "perimeterx";
  if (/g-recaptcha|hcaptcha|cf-turnstile/i.test(html) && (status === 403 || status === 429))
    return "captcha";
  return null;
}

export function analyzeHtml(status: number | null, headers: Headers, html: string): PageSignals {
  const antiBot = detectAntiBot(status, headers, html);
  const priceHits = (html.match(PRICE_RE) ?? []).length;
  const linkCount = (html.match(/<a\s[^>]*href=/gi) ?? []).length;
  const jsonLdBlocks = html.match(/<script[^>]+application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) ?? [];
  const hasJsonLd = jsonLdBlocks.length > 0;
  // Generic SEO JSON-LD (Organization, WebSite…) is everywhere; only listing-shaped data counts.
  const listingJsonLd = jsonLdBlocks.some((b) =>
    /"(price|priceCurrency|offers)"|"@type"\s*:\s*"(Offer|RealEstateListing|Residence|House|Apartment|SingleFamilyResidence|Product|ItemList)"/i.test(b),
  );
  const hasAppState = /__NEXT_DATA__|__NUXT__|window\.__INITIAL_STATE__|window\.__APOLLO_STATE__/.test(html);

  let renderMode: RenderMode = "UNKNOWN";
  if (priceHits >= 5) renderMode = "SERVER";
  else if (hasAppState || listingJsonLd) renderMode = "EMBEDDED_JSON";
  else if (linkCount < 15 && /<div id="(root|app|__next)"><\/div>|<noscript>[^<]*JavaScript/i.test(html))
    renderMode = "CLIENT";

  return { antiBot, renderMode, priceHits, linkCount, hasJsonLd };
}

/** Registrable-ish domain: strips "www." and keeps the last two labels. */
export function siteKey(url: string) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return host.split(".").slice(-2).join(".");
}

export type VerdictInput = {
  dnsOk: boolean;
  /** Final URL after redirects, to catch repurposed / parked domains. */
  requestedUrl?: string;
  finalUrl?: string | null;
  pageStatus: number | null;
  robotsAllowed: boolean | null;
  crawlDelaySec: number | null;
  sitemapCount: number;
  signals: PageSignals | null;
};

export function decideVerdict(i: VerdictInput): { verdict: CrawlVerdict; reasons: string[] } {
  const reasons: string[] = [];
  if (!i.dnsOk) return { verdict: "NO", reasons: ["site injoignable (DNS / connexion)"] };
  if (i.robotsAllowed === false) return { verdict: "NO", reasons: ["robots.txt interdit la page annonces"] };
  if (i.signals?.antiBot) return { verdict: "NO", reasons: [`anti-bot : ${i.signals.antiBot}`] };
  if (i.pageStatus === 403 || i.pageStatus === 401) return { verdict: "NO", reasons: [`HTTP ${i.pageStatus}`] };
  if (i.pageStatus === 429) return { verdict: "NO", reasons: ["HTTP 429 dès la 1re requête"] };
  if (i.pageStatus == null || i.pageStatus >= 400) {
    return { verdict: "NO", reasons: [`page annonces HTTP ${i.pageStatus ?? "?"}`] };
  }
  if (i.requestedUrl && i.finalUrl && siteKey(i.requestedUrl) !== siteKey(i.finalUrl)) {
    return { verdict: "NO", reasons: [`domaine redirigé vers ${new URL(i.finalUrl).hostname}`] };
  }

  let caution = false;
  if (i.robotsAllowed == null) reasons.push("pas de robots.txt");
  if (i.crawlDelaySec && i.crawlDelaySec > 10) {
    caution = true;
    reasons.push(`crawl-delay ${i.crawlDelaySec}s`);
  }
  const mode = i.signals?.renderMode ?? "UNKNOWN";
  if (mode === "SERVER") reasons.push(`${i.signals!.priceHits} prix dans le HTML`);
  else if (mode === "EMBEDDED_JSON") reasons.push("données JSON embarquées");
  else {
    caution = true;
    reasons.push(mode === "CLIENT" ? "rendu JS uniquement" : "peu de prix visibles");
  }
  if (i.sitemapCount > 0) reasons.push(`${i.sitemapCount} sitemap(s)`);
  return { verdict: caution ? "CAUTION" : "OK", reasons };
}
