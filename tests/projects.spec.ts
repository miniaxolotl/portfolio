import { expect, test } from "@playwright/test";

test.describe("Projects", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display read more links for each project", async ({ page }) => {
    const projectsSection = page.locator("#projects");
    await expect(projectsSection).toBeVisible();

    const readMoreLinks = projectsSection.getByRole("link", {
      name: /read more/i,
    });
    await expect(readMoreLinks).toHaveCount(7);
  });

  test("should navigate to project detail page via read more", async ({ page }) => {
    const goboxLink = page.locator('#projects a[href="/projects/gobox"]').first();
    await goboxLink.click();

    await expect(page).toHaveURL(/\/projects\/gobox/);
    const heading = page.getByRole("heading", { name: /gobox/i, level: 1 });
    await expect(heading).toBeVisible();
  });
});

test.describe("Project Blog Posts", () => {
  test("should render markdown content on blog project page", async ({ page }) => {
    await page.goto("/projects/gobox");

    const heading = page.getByRole("heading", { name: /gobox/i, level: 1 });
    await expect(heading).toBeVisible();

    const markdownHeading = page.getByRole("heading", {
      name: /what it does/i,
    });
    await expect(markdownHeading).toBeVisible();

    const paragraph = page.locator("text=lightweight file sharing daemon").first();
    await expect(paragraph).toBeVisible();
  });

  test("should display feature cards on featured project page", async ({ page }) => {
    await page.goto("/burrow");

    const heading = page.getByRole("heading", { name: /burrow/i, level: 1 });
    await expect(heading).toBeVisible();

    const featureCard = page.locator("text=Self-hosted").first();
    await expect(featureCard).toBeVisible();
  });

  test("should have back to projects link", async ({ page }) => {
    await page.goto("/projects/inkbyte");

    const backLink = page.getByRole("link", { name: /back to projects/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/#projects");
  });
});

test.describe("Header Projects Dropdown", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
  });

  test("should open projects dropdown and show project links", async ({ page }) => {
    const dropdownTrigger = page.locator('nav[aria-label="Main navigation"]').getByRole("button", {
      name: /projects/i,
    });
    await expect(dropdownTrigger).toBeVisible();

    await dropdownTrigger.click();

    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();

    const goboxLink = menu.getByRole("menuitem", { name: /gobox/i });
    const inkbyteLink = menu.getByRole("menuitem", { name: /inkbyte/i });
    await expect(goboxLink).toBeVisible();
    await expect(inkbyteLink).toBeVisible();
  });

  test("should navigate to project from dropdown", async ({ page }) => {
    const dropdownTrigger = page.locator('nav[aria-label="Main navigation"]').getByRole("button", {
      name: /projects/i,
    });
    await dropdownTrigger.click();

    const menu = page.getByRole("menu");
    const fitrLink = menu.getByRole("menuitem", { name: /fitr/i });
    await fitrLink.click();

    await expect(page).toHaveURL("/projects/fitr");
    const heading = page.getByRole("heading", { name: /fitr/i, level: 1 });
    await expect(heading).toBeVisible();
  });
});
