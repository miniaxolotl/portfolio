import { expect, test } from "@playwright/test";

test.describe("Mobile Drawer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test("should open drawer when menu button is clicked", async ({ page }) => {
    const menuButton = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await expect(menuButton).toBeVisible();

    await menuButton.click();

    const drawer = page.locator("[data-vaul-drawer]");
    await expect(drawer).toBeVisible();
  });

  test("should have proper aria attributes on menu button", async ({ page }) => {
    const menuButton = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(menuButton).toHaveAttribute("aria-controls", "mobile-navigation");
  });

  test("should close drawer when pressing Escape", async ({ page }) => {
    const menuButton = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await menuButton.click();

    const drawer = page.locator("[data-vaul-drawer]");
    await expect(drawer).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(drawer).not.toBeVisible();
  });

  test("should display profile info in drawer", async ({ page }) => {
    const menuButton = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await menuButton.click();

    const drawer = page.locator("[data-vaul-drawer]");
    await expect(drawer).toBeVisible();

    const profileName = drawer.locator("h1").first();
    await expect(profileName).toBeVisible();
    await expect(profileName).toHaveText("Elias Mawa");
  });

  test("should display navigation links in drawer", async ({ page }) => {
    const menuButton = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await menuButton.click();

    const drawer = page.locator("[data-vaul-drawer]");
    await expect(drawer).toBeVisible();

    const aboutLink = drawer.getByRole("link", { name: /about/i });
    const projectsLink = drawer.getByRole("link", { name: /projects/i });
    await expect(aboutLink).toBeVisible();
    await expect(projectsLink).toBeVisible();
  });

  test("should display social links in drawer", async ({ page }) => {
    const menuButton = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await menuButton.click();

    const drawer = page.locator("[data-vaul-drawer]");
    await expect(drawer).toBeVisible();

    const githubLink = drawer.getByRole("link", { name: /github/i });
    const linkedinLink = drawer.getByRole("link", { name: /linkedin/i });
    await expect(githubLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();
  });

  test("should have download resume button in drawer", async ({ page }) => {
    const menuButton = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await menuButton.click();

    const drawer = page.locator("[data-vaul-drawer]");
    await expect(drawer).toBeVisible();

    const resumeButton = drawer.getByRole("link", { name: /download resume/i });
    await expect(resumeButton).toBeVisible();
    await expect(resumeButton).toHaveAttribute("download");
  });

  test("should not show drawer trigger on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    const menuButton = page.getByRole("button", {
      name: /open navigation menu/i,
    });
    await expect(menuButton).not.toBeVisible();
  });

  test("should show nav links on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    const mainNav = page.locator('nav[aria-label="Main navigation"]');
    const portfolioLink = mainNav.getByRole("link", { name: /portfolio/i });
    const burrowLink = mainNav.getByRole("link", { name: /burrow/i });
    const groveLink = mainNav.getByRole("link", { name: /grove/i });
    const projectsTrigger = mainNav.getByRole("button", {
      name: /projects/i,
    });

    await expect(portfolioLink).toBeVisible();
    await expect(burrowLink).toBeVisible();
    await expect(groveLink).toBeVisible();
    await expect(projectsTrigger).toBeVisible();
  });
});
