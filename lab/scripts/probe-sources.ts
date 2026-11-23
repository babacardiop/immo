// Polite crawlability probe: per site, robots.txt + 1 listing page (+ homepage
// only if no listing URL). Sequential, one site at a time, identified UA.
// Usage: npm run sources:probe [-- --slug=expat-dakar] [-- --all]
// Default skips EXCLUDED sources and sources probed in the last 7 days.
import robotsParser from "robots-parser";
import { prismaLab } from "../src/lib/db";
import { analyzeHtml, decideVerdict } from "../src/lib/probe/analyze";

const UA = process.env.LAB_BOT_USER_AGENT ?? "EverGreenResearchBot/0.1 (+https://evergreen.sn/bot)";
const BOT_TOKEN = "EverGreenResearchBot";
const TIMEOUT_MS = 15_000;
const PAUSE_MS = 2_000;
const MAX_BYTES = 2_000_000;

const args = process.argv.slice(2);
const only = args.find((a) => a.startsWith("--slug="))?.split("=")[1];
const all = args.includes("--all");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function get(url: string) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "user-agent": UA, accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.5", "accept-language": "fr-FR,fr;q=0.9" },
    });
    const buf = await res.arrayBuffer();
    const text = new TextDecoder().decode(buf.byteLength > MAX_BYTES ? buf.slice(0, MAX_BYTES) : buf);
    return { status: res.status, headers: res.headers, text, finalUrl: res.url, bytes: buf.byteLength };
  } finally {
    clearTimeout(t);
  }
}

async function probe(source: { id: string; slug: string; baseUrl: string; listingUrl: string | null }) {
  const started = Date.now();
  const pageUrl = source.listingUrl ?? source.baseUrl;
  const robotsUrl = new URL("/robots.txt", source.baseUrl).toString();

  let dnsOk = true;
  let robotsStatus: number | null = null;
  let robotsAllowed: boolean | null = null;
  let crawlDelaySec: number | null = null;
  let sitemapUrls: string[] = [];
  let error: string | null = null;

  try {
    const r = await get(robotsUrl);
    robotsStatus = r.status;
    if (r.status === 200 && !/<html/i.test(r.text.slice(0, 500))) {
      const robots = robotsParser(robotsUrl, r.text);
      robotsAllowed = robots.isAllowed(pageUrl, BOT_TOKEN) ?? null;
      const delay = robots.getCrawlDelay(BOT_TOKEN);
      crawlDelaySec = typeof delay === "number" ? Math.round(delay) : null;
      sitemapUrls = robots.getSitemaps().slice(0, 10);
    }
  } catch (e) {
    dnsOk = false;
    error = `robots: ${(e as Error).cause ? String((e as Error).cause) : (e as Error).message}`.slice(0, 300);
  }

  let page: Awaited<ReturnType<typeof get>> | null = null;
  if (dnsOk && robotsAllowed !== false) {
    await sleep(PAUSE_MS);
    try {
      page = await get(pageUrl);
    } catch (e) {
      dnsOk = false;
      error = `page: ${(e as Error).cause ? String((e as Error).cause) : (e as Error).message}`.slice(0, 300);
    }
  }

  const signals = page ? analyzeHtml(page.status, page.headers, page.text) : null;
  const { verdict, reasons } = decideVerdict({
    dnsOk,
    requestedUrl: pageUrl,
    finalUrl: page?.finalUrl ?? null,
    pageStatus: page?.status ?? (robotsAllowed === false ? 200 : null),
    robotsAllowed,
    crawlDelaySec,
    sitemapCount: sitemapUrls.length,
    signals,
  });

  await prismaLab.sourceProbe.create({
    data: {
      sourceId: source.id,
      userAgent: UA,
      dnsOk,
      robotsStatus,
      robotsAllowed,
      crawlDelaySec,
      sitemapUrls,
      pageStatus: page?.status ?? null,
      pageUrl,
      finalUrl: page?.finalUrl ?? null,
      pageBytes: page?.bytes ?? null,
      durationMs: Date.now() - started,
      antiBot: signals?.antiBot ?? null,
      renderMode: signals?.renderMode ?? null,
      priceHits: signals?.priceHits ?? null,
      linkCount: signals?.linkCount ?? null,
      hasJsonLd: signals?.hasJsonLd ?? null,
      verdict,
      reasons,
      error,
    },
  });
  await prismaLab.source.update({
    where: { id: source.id },
    data: {
      verdict,
      verdictReasons: reasons,
      renderMode: signals?.renderMode ?? null,
      robotsAllowed,
      crawlDelaySec,
      sitemapUrls,
      antiBot: signals?.antiBot ?? null,
      lastProbedAt: new Date(),
      status: dnsOk ? "PROBED" : "DEAD",
    },
  });
  return { verdict, reasons, status: page?.status ?? null };
}

async function main() {
  const weekAgo = new Date(Date.now() - 7 * 864e5);
  const sources = await prismaLab.source.findMany({
    where: {
      ...(only ? { slug: only } : { status: { not: "EXCLUDED" } }),
      ...(all || only ? {} : { OR: [{ lastProbedAt: null }, { lastProbedAt: { lt: weekAgo } }] }),
    },
    orderBy: { priority: "asc" },
  });
  console.log(`Probing ${sources.length} source(s) as "${UA}"`);
  for (const s of sources) {
    const r = await probe(s);
    console.log(`${r.verdict.padEnd(7)} ${s.slug.padEnd(24)} HTTP ${r.status ?? "-"}  ${r.reasons.join(" · ")}`);
    await sleep(PAUSE_MS);
  }
}

main().finally(() => prismaLab.$disconnect());
