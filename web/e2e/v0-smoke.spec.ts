import { expect, test } from "@playwright/test";

test.describe("v0 smoke", () => {
  test("home → catalogue → fiche path + confiance pages", async ({ page }) => {
    test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");

    await page.goto("/");
    await expect(page.getByRole("heading", { name: /evergreen/i })).toBeVisible();

    await page.getByRole("link", { name: /^acheter$/i }).first().click();
    await expect(page).toHaveURL(/\/acheter/);
    await expect(page.getByRole("heading", { name: /^acheter$/i })).toBeVisible();

    await page.goto("/agence");
    await expect(page.getByRole("heading", { name: /agence/i })).toBeVisible();

    await page.goto("/guides");
    await expect(page.getByRole("heading", { name: /^guides$/i })).toBeVisible();

    await page.goto("/quartiers/mermoz");
    await expect(page.getByRole("heading", { name: /mermoz/i })).toBeVisible();
    await expect(page.getByTestId("quartier-catalogue-cta")).toHaveAttribute(
      "href",
      /quartier=Mermoz/,
    );

    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { name: /contact/i }).or(
        page.getByText(/écrire|message|whatsapp/i).first(),
      ),
    ).toBeVisible();
  });
});
