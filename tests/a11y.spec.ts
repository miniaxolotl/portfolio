import { expect, test } from "@playwright/test";

test.describe("Accessibility", () => {
  test.describe("Desktop", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto("/");
    });

    test("should have skip to main content link", async ({ page }) => {
      const skipLink = page.getByRole("link", {
        name: /skip to main content/i,
      });
      await expect(skipLink).toBeAttached();
      await expect(skipLink).toHaveAttribute("href", "#main-content");
    });

    test("should focus main content when skip link receives focus", async ({ page }) => {
      await page.keyboard.press("Tab");

      const skipLink = page.getByRole("link", {
        name: /skip to main content/i,
      });
      await expect(skipLink).toBeFocused();

      await page.keyboard.press("Enter");

      const mainContent = page.locator("#main-content");
      await expect(mainContent).toBeFocused();
    });

    test("should have accessible header navigation", async ({ page }) => {
      const nav = page.locator('nav[aria-label="Main navigation"]');
      await expect(nav).toBeVisible();

      const links = nav.getByRole("link");
      await expect(links).toHaveCount(3);

      const buttons = nav.getByRole("button");
      await expect(buttons).toHaveCount(1);
    });

    test("should have aria-current on active nav link", async ({ page }) => {
      const portfolioLink = page.getByRole("link", { name: /portfolio/i });
      await expect(portfolioLink).toHaveAttribute("aria-current", "page");
    });
  });

  test.describe("Mobile", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/");
    });

    test("should have skip to main content link", async ({ page }) => {
      const skipLink = page.getByRole("link", {
        name: /skip to main content/i,
      });
      await expect(skipLink).toBeAttached();
    });

    test("should have accessible mobile navigation drawer", async ({ page }) => {
      const menuButton = page.getByRole("button", {
        name: /open navigation menu/i,
      });
      await expect(menuButton).toBeVisible();
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(menuButton).toHaveAttribute("aria-controls", "mobile-navigation");

      await menuButton.click();

      const drawer = page.locator("[data-vaul-drawer]");
      await expect(drawer).toBeVisible();
    });

    test("should have accessible navigation in drawer", async ({ page }) => {
      const menuButton = page.getByRole("button", {
        name: /open navigation menu/i,
      });
      await menuButton.click();

      const drawer = page.locator("[data-vaul-drawer]");
      await expect(drawer).toBeVisible();

      const drawerDialog = drawer.getByRole("dialog", { name: /mobile/i });
      await expect(drawerDialog).toBeVisible();
    });
  });

  test("should not have console errors on page load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const consoleErrors = errors.filter((e) => !e.includes("Download the React DevTools"));
    expect(consoleErrors).toHaveLength(0);
  });
});
