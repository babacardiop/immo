import { describe, expect, it } from "vitest";
import { analyzeHtml, decideVerdict, type PageSignals } from "@/lib/probe/analyze";

const h = (init: Record<string, string> = {}) => new Headers(init);

describe("analyzeHtml", () => {
  it("detects server-rendered listings by price hits", () => {
    const html = Array.from({ length: 6 }, (_, i) => `<a href="/a/${i}">Villa</a> ${i + 1}5 000 000 FCFA`).join("");
    const s = analyzeHtml(200, h(), html);
    expect(s.renderMode).toBe("SERVER");
    expect(s.priceHits).toBe(6);
  });

  it("flags Cloudflare challenges", () => {
    const s = analyzeHtml(403, h({ server: "cloudflare" }), "<title>Just a moment...</title>");
    expect(s.antiBot).toBe("cloudflare-challenge");
  });

  it("recognises embedded JSON apps", () => {
    const s = analyzeHtml(200, h(), '<script id="__NEXT_DATA__" type="application/json">{}</script>');
    expect(s.renderMode).toBe("EMBEDDED_JSON");
  });
});

const server: PageSignals = { antiBot: null, renderMode: "SERVER", priceHits: 20, linkCount: 200, hasJsonLd: false };

describe("decideVerdict", () => {
  const base = { dnsOk: true, pageStatus: 200, robotsAllowed: true, crawlDelaySec: null, sitemapCount: 1, signals: server };

  it("OK when allowed, SSR, no anti-bot", () => {
    expect(decideVerdict(base).verdict).toBe("OK");
  });
  it("NO when robots disallows", () => {
    expect(decideVerdict({ ...base, robotsAllowed: false }).verdict).toBe("NO");
  });
  it("NO on anti-bot", () => {
    expect(decideVerdict({ ...base, signals: { ...server, antiBot: "datadome" } }).verdict).toBe("NO");
  });
  it("CAUTION on client-only rendering or long crawl-delay", () => {
    expect(decideVerdict({ ...base, signals: { ...server, renderMode: "CLIENT", priceHits: 0 } }).verdict).toBe("CAUTION");
    expect(decideVerdict({ ...base, crawlDelaySec: 30 }).verdict).toBe("CAUTION");
  });
  it("NO when the domain now redirects elsewhere (repurposed)", () => {
    const r = decideVerdict({ ...base, requestedUrl: "https://www.afribaba.sn", finalUrl: "https://shop.example.com/" });
    expect(r.verdict).toBe("NO");
    expect(decideVerdict({ ...base, requestedUrl: "https://www.immobilier.sn", finalUrl: "https://immobilier.sn/" }).verdict).toBe("OK");
  });
  it("ignores generic SEO JSON-LD", () => {
    const s = analyzeHtml(200, h(), '<script type="application/ld+json">{"@type":"Organization","name":"X"}</script>');
    expect(s.renderMode).toBe("UNKNOWN");
  });
  it("NO when unreachable", () => {
    expect(decideVerdict({ ...base, dnsOk: false }).verdict).toBe("NO");
  });
});
