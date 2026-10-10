import { expect, test } from "@playwright/test";

test.describe("mockup home", () => {
  test("home shows hero search and FAQ", async ({ page }) => {
    test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /construisez votre avenir/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /trouver un bien/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /questions fréquentes/i }),
    ).toBeVisible();
  });
});
