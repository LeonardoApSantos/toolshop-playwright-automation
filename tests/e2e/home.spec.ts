import { test, expect } from "../../fixtures/baseTest";

test("Acessar aplicação", async ({ homePage, page }) => {
    await homePage.goto()
    await expect(page).toHaveTitle(/Toolshop/)
});
