import { describe, expect, it, vi } from "vitest";

vi.mock("next/og", () => ({
  ImageResponse: class MockImageResponse {
    status = 200;
    headers: Headers;
    constructor(
      _element: unknown,
      init?: { headers?: Record<string, string> },
    ) {
      this.headers = new Headers({
        "content-type": "image/png",
        ...(init?.headers ?? {}),
      });
    }
  },
}));

describe("GET /api/og", () => {
  it("returns image content-type", async () => {
    const { GET } = await import("./route");
    const res = await GET(
      new Request("http://localhost/api/og?title=Test%20Villa"),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/image\//);
  });
});
