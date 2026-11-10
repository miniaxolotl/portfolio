import { expect, test } from "@playwright/test";

test.describe("Mobile Drawer", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
  });

  test("should open drawer when menu button is clicked", async ({ page }) => {
    const menuButton = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.locator("[data-vaul-drawer]")).toBeVisible();
  });

  test("should have proper aria attributes on menu button", async ({
    page,
  }) => {
    const menuButton = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(menuButton).toHaveAttribute(
      "aria-controls",
      "mobile-navigation",
    );
  });

  test("should close drawer when pressing Escape", async ({ page }) => {
    await page.getByRole("button", { name: /open navigation menu/i }).click();
    const drawer = page.locator("[data-vaul-drawer]");
    await expect(drawer).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(drawer).not.toBeVisible();
  });

  test("should display profile info in drawer", async ({ page }) => {
    await page.getByRole("button", { name: /open navigation menu/i }).click();
    const drawer = page.locator("[data-vaul-drawer]");
    await expect(drawer).toBeVisible();
    await expect(drawer.getByTestId("profile-name")).toHaveText("Elias Mawa");
    await expect(
      drawer.getByText("Calgary, AB", { exact: true }),
    ).toBeVisible();
  });

  test("should display navigation links in drawer", async ({ page }) => {
    await page.getByRole("button", { name: /open navigation menu/i }).click();
    const drawer = page.locator("[data-vaul-drawer]");
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("link", { name: /about/i })).toBeVisible();
    await expect(drawer.getByRole("link", { name: /projects/i })).toBeVisible();
  });

  test("should display social links in drawer", async ({ page }) => {
    await page.getByRole("button", { name: /open navigation menu/i }).click();
    const drawer = page.locator("[data-vaul-drawer]");
    await expect(drawer).toBeVisible();
    await expect(drawer.getByRole("link", { name: /github/i })).toBeVisible();
    await expect(drawer.getByRole("link", { name: /linkedin/i })).toBeVisible();
  });

  test("should have download resume button in drawer", async ({ page }) => {
    await page.getByRole("button", { name: /open navigation menu/i }).click();
    const drawer = page.locator("[data-vaul-drawer]");
    const resumeButton = drawer.getByRole("link", { name: /download resume/i });
    await expect(resumeButton).toBeVisible();
    await expect(resumeButton).toHaveAttribute("download");
  });

  test("should not show drawer trigger on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(
      page.getByRole("button", { name: /open navigation menu/i }),
    ).not.toBeVisible();
  });

  test("should show nav links on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const mainNav = page.locator('nav[aria-label="Main navigation"]');
    for (const name of ["portfolio", "work", "contact"]) {
      await expect(
        mainNav.getByRole("link", { name, exact: true }),
      ).toBeVisible();
    }
    await expect(mainNav.getByRole("button", { name: /blog/i })).toHaveCount(0);
  });
});
