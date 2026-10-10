import { describe, expect, it } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows under the limit then blocks", () => {
    const key = `test-${Math.random()}`;
    expect(rateLimit(key, 2, 60_000).ok).toBe(true);
    expect(rateLimit(key, 2, 60_000).ok).toBe(true);
    const blocked = rateLimit(key, 2, 60_000);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("lead-specific key trips after N posts", () => {
    const key = `lead:test-${Math.random()}`;
    for (let i = 0; i < 8; i += 1) {
      expect(rateLimit(key, 8, 60_000).ok).toBe(true);
    }
    expect(rateLimit(key, 8, 60_000).ok).toBe(false);
  });
});
