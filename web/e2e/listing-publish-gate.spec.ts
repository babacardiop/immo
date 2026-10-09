import { expect, test } from "@playwright/test";

const email = process.env.E2E_AGENT_EMAIL ?? "agent@evergreen.sn";
const password =
  process.env.E2E_AGENT_PASSWORD ?? "ChangeMeStaging1!";

test.describe("publish gate UI", () => {
  test("publish blocked without enough photos shows message", async ({
    page,
  }) => {
    test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");

    await page.goto("/espace/connexion");
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/mot de passe/i).fill(password);
    await page.getByRole("button", { name: /se connecter/i }).click();
    await expect(page).toHaveURL(/\/espace\/agent/);

    await page.goto("/espace/agent/annonces/nouveau");
    const ref = `EG-E2E-${Date.now().toString().slice(-6)}`;
    await page.getByLabel(/^titre$/i).fill("Maison gate photos");
    await page.getByLabel(/référence/i).fill(ref);
    await page.getByLabel(/prix|loyer/i).fill("40000000");
    await page.getByLabel(/^ville$/i).fill("Dakar");
    await page.getByLabel(/quartier/i).fill("Almadies");
    await page.getByLabel(/description/i).fill(
      "Annonce pour vérifier le message d’erreur photos à la publication.",
    );
    await page.getByLabel(/^papier$/i).selectOption("TF");
    await page.getByLabel(/^statut$/i).selectOption("ACTIVE");
    await page.getByRole("button", { name: /créer le brouillon/i }).click();
    await expect(page).toHaveURL(/\/espace\/agent\/annonces\/.+/);

    await page.getByRole("button", { name: /^publier$/i }).click();
    await expect(page.getByRole("alert")).toContainText(/photos/i);
  });
});
