import { expect, test } from "@playwright/test";

test.describe("catalogue public", () => {
  test("acheter catalogue loads", async ({ page }) => {
    test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");
    await page.goto("/acheter");
    await expect(page.getByRole("heading", { name: /^acheter$/i })).toBeVisible();
  });

  test("louer catalogue loads", async ({ page }) => {
    test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");
    await page.goto("/louer");
    await expect(page.getByRole("heading", { name: /^louer$/i })).toBeVisible();
  });

  test("unknown fiche slug returns 404", async ({ page }) => {
    test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");
    const res = await page.goto("/acheter/slug-inexistant-e2e-xyz");
    expect(res?.status()).toBe(404);
  });

  test("draft slug is not public (404)", async ({ page }) => {
    test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");
    // Drafts must never resolve on public routes even if slug is guessed.
    const res = await page.goto("/acheter/annonce-brouillon-privee");
    expect(res?.status()).toBe(404);
  });
});
