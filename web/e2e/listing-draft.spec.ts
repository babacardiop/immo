import { expect, test } from "@playwright/test";

const email = process.env.E2E_AGENT_EMAIL ?? "agent@evergreen.sn";
const password =
  process.env.E2E_AGENT_PASSWORD ?? "ChangeMeStaging1!";

test.describe("agent listing draft", () => {
  test("login → create draft → land on slug URL", async ({ page }) => {
    test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");

    await page.goto("/espace/connexion");
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/mot de passe/i).fill(password);
    await page.getByRole("button", { name: /se connecter/i }).click();
    await expect(page).toHaveURL(/\/espace\/agent/);

    await page.goto("/espace/agent/annonces/nouveau");
    const ref = `EG-E2E-${Date.now().toString().slice(-6)}`;
    await page.getByLabel(/^titre$/i).fill("Terrain test e2e Niague");
    await page.getByLabel(/référence/i).fill(ref);
    await page.getByLabel(/prix|loyer/i).fill("15000000");
    await page.getByLabel(/^ville$/i).fill("Dakar");
    await page.getByLabel(/quartier/i).fill("Niague");
    await page.getByLabel(/description/i).fill(
      "Parcelle de test automatisé pour le parcours agent S01.",
    );
    await page.getByLabel(/^papier$/i).selectOption("TF");
    await page.getByLabel(/^statut$/i).selectOption("ACTIVE");
    await page.getByRole("button", { name: /créer le brouillon/i }).click();

    await expect(page).toHaveURL(/\/espace\/agent\/annonces\/.+/);
    expect(page.url()).not.toMatch(/cm[a-z0-9]{20,}/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /terrain test e2e/i,
    );
  });
});
