import { expect, test } from "@playwright/test";

test.describe("lead submit", () => {
  test("contact form shows success after submit", async ({ page }) => {
    test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");
    await page.goto("/contact");
    await page.getByLabel(/^nom$/i).fill("E2E Lead");
    await page.getByLabel(/téléphone/i).fill("+221770001122");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: /envoyer/i }).click();
    await expect(page.getByText(/sous\s+24\s+h/i)).toBeVisible({
      timeout: 15_000,
    });
  });
});
