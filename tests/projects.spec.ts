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
    await expect(readMoreLinks).toHaveCount(8);
  });

  test("should navigate to project detail page via read more", async ({
    page,
  }) => {
    const groveLink = page
      .locator('#projects a[href="/projects/grove"]')
      .first();
    await groveLink.click();

    await expect(page).toHaveURL(/\/projects\/grove/);
    const heading = page.getByRole("heading", { name: /grove/i, level: 1 });
    await expect(heading).toBeVisible();
  });
});

test.describe("Project Blog Posts", () => {
  test("should render markdown content on blog project page", async ({
    page,
  }) => {
    await page.goto("/projects/grove");

    const heading = page.getByRole("heading", { name: /grove/i, level: 1 });
    await expect(heading).toBeVisible();

    const markdownHeading = page.getByRole("heading", {
      name: /the problem i wanted to solve/i,
    });
    await expect(markdownHeading).toBeVisible();

    const paragraph = page.locator("text=self-hosted MCP server").first();
    await expect(paragraph).toBeVisible();
  });

  test("should display feature cards on featured project page", async ({
    page,
  }) => {
    await page.goto("/burrow");

    const heading = page.getByRole("heading", { name: /burrow/i, level: 1 });
    await expect(heading).toBeVisible();

    const featureCard = page.locator("text=Public URLs in Seconds").first();
    await expect(featureCard).toBeVisible();
  });

  test("should have back to projects link", async ({ page }) => {
    await page.goto("/projects/inkbyte");

    const backLink = page.getByRole("link", { name: /back to projects/i });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/#projects");
  });
});

test.describe("Project Sidebar", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test("should show sidebar on blog project page", async ({ page }) => {
    await page.goto("/projects/grove");

    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar).toBeVisible();
  });

  test("should not show sidebar on burrow page", async ({ page }) => {
    await page.goto("/burrow");

    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar).not.toBeVisible();
  });

  test("should not show sidebar on grove page", async ({ page }) => {
    await page.goto("/grove");

    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar).not.toBeVisible();
  });
});

test.describe("Header Blog Dropdown", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
  });

  test("should open blog dropdown and show project links", async ({ page }) => {
    const dropdownTrigger = page
      .locator('nav[aria-label="Main navigation"]')
      .getByRole("button", {
        name: /blog/i,
      });
    await expect(dropdownTrigger).toBeVisible();

    await dropdownTrigger.click();

    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();

    const groveLink = menu.getByRole("menuitem", { name: /grove/i });
    const fitrLink = menu.getByRole("menuitem", { name: /fitr/i });
    await expect(groveLink).toBeVisible();
    await expect(fitrLink).toBeVisible();

    const inkbyteLink = menu.getByRole("menuitem", { name: /inkbyte/i });
    await expect(inkbyteLink).not.toBeVisible();
  });

  test("should navigate to project from dropdown", async ({ page }) => {
    const dropdownTrigger = page
      .locator('nav[aria-label="Main navigation"]')
      .getByRole("button", {
        name: /blog/i,
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
