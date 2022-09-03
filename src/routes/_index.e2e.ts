import { test, expect } from "@playwright/test";

test("homepage has github username in it's title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveTitle(process.env.VITE_GH_USERNAME);
});
