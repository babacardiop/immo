import { expect, test } from "@playwright/test";

test.describe("catalogue list / map", () => {
  test("acheter defaults to list and opens map view", async ({ page }) => {
    test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");
    await page.goto("/acheter");
    await expect(page.getByRole("heading", { name: /^acheter$/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /^liste$/i })).toBeVisible();
    await page.getByRole("link", { name: /^carte$/i }).click();
    await expect(page).toHaveURL(/view=map/);
    await expect(
      page.getByRole("heading", { name: /résultats carte|carte/i }).first(),
    ).toBeVisible();
  });
});
