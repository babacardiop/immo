import robotsParser from "robots-parser";
import { detectAntiBot } from "@/lib/probe/analyze";

const BOT_TOKEN = "EverGreenResearchBot";

export class CrawlBlockedError extends Error {}

/**
 * One fetcher per source per run. Guarantees: robots.txt checked for every URL,
 * at least `minDelayMs` (or the site's Crawl-delay, whichever is larger) between
 * requests, identified User-Agent, hard stop on 403 / 429 / anti-bot pages.
 */
export class PoliteFetcher {
  private robots: ReturnType<typeof robotsParser> | null = null;
  private last = 0;
  readonly ua: string;

  constructor(
    private readonly baseUrl: string,
    private readonly minDelayMs = 5_000,
    ua = process.env.LAB_BOT_USER_AGENT ?? "EverGreenResearchBot/0.1 (+https://evergreen.sn/bot)",
  ) {
    this.ua = ua;
  }

  private async wait() {
    const delaySec = this.robots?.getCrawlDelay(BOT_TOKEN);
    const delay = Math.max(this.minDelayMs, typeof delaySec === "number" ? delaySec * 1000 : 0);
    const jitter = Math.floor(Math.random() * 1500);
    const remaining = this.last + delay + jitter - Date.now();
    if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
    this.last = Date.now();
  }

  private async raw(url: string) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 20_000);
    try {
      return await fetch(url, {
        signal: ctrl.signal,
        redirect: "follow",
        headers: { "user-agent": this.ua, accept: "text/html,*/*;q=0.5", "accept-language": "fr-FR,fr;q=0.9" },
      });
    } finally {
      clearTimeout(t);
    }
  }

  async init() {
    const robotsUrl = new URL("/robots.txt", this.baseUrl).toString();
    this.last = Date.now();
    const res = await this.raw(robotsUrl);
    this.robots = robotsParser(robotsUrl, res.ok ? await res.text() : "");
  }

  /** Returns page HTML. Throws CrawlBlockedError when we must stop crawling this source. */
  async get(url: string): Promise<string> {
    if (!this.robots) await this.init();
    if (this.robots!.isAllowed(url, BOT_TOKEN) === false) {
      throw new CrawlBlockedError(`robots.txt disallows ${url}`);
    }
    for (let attempt = 1; ; attempt++) {
      await this.wait();
      const res = await this.raw(url);
      const html = await res.text();
      if (res.status === 403 || res.status === 429) throw new CrawlBlockedError(`HTTP ${res.status} on ${url}`);
      const bot = detectAntiBot(res.status, res.headers, html);
      if (bot) throw new CrawlBlockedError(`anti-bot (${bot}) on ${url}`);
      if (res.status >= 500 && attempt < 3) {
        this.last += attempt * 10_000; // back off before retrying
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
      return html;
    }
  }
}
