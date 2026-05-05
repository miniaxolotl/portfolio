import { expect, test } from "@playwright/test";

test.describe("Vercel Analytics", () => {
  test("should inject analytics script on homepage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // In development, the debug script is injected client-side
    const script = page.locator('script[src*="va.vercel-scripts.com"]');
    await expect(script).toHaveCount(1);
  });

  test("should inject analytics script on /burrow", async ({ page }) => {
    await page.goto("/burrow");
    await page.waitForLoadState("networkidle");

    const script = page.locator('script[src*="va.vercel-scripts.com"]');
    await expect(script).toHaveCount(1);
  });

  test("should inject analytics script on /grove", async ({ page }) => {
    await page.goto("/grove");
    await page.waitForLoadState("networkidle");

    const script = page.locator('script[src*="va.vercel-scripts.com"]');
    await expect(script).toHaveCount(1);
  });
});
