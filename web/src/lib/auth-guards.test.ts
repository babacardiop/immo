import { describe, expect, it } from "vitest";
import { authConfig } from "@/lib/auth.config";

function authorizedFor(pathname: string, authed: boolean) {
  const authorized = authConfig.callbacks?.authorized;
  if (!authorized) throw new Error("missing authorized callback");

  return authorized({
    auth: authed ? ({ user: { id: "1" } } as never) : null,
    request: {
      nextUrl: { pathname },
    } as never,
  });
}

describe("espace route guards", () => {
  it("blocks unauthenticated /espace/agent", () => {
    expect(authorizedFor("/espace/agent", false)).toBe(false);
  });

  it("allows authenticated /espace/agent", () => {
    expect(authorizedFor("/espace/agent", true)).toBe(true);
  });

  it("allows /espace/connexion without session", () => {
    expect(authorizedFor("/espace/connexion", false)).toBe(true);
  });
});
