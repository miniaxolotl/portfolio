import { expect, test } from "@playwright/test";

test.describe("Theme Mode Switch", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should toggle theme from dark to light", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();

    const html = page.locator("html");
    const initiallyDark = await html.evaluate((el) =>
      el.classList.contains("dark"),
    );

    await themeToggle.click();

    const afterClickDark = await html.evaluate((el) =>
      el.classList.contains("dark"),
    );
    expect(afterClickDark).not.toBe(initiallyDark);
  });

  test("should persist theme after page reload", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });

    await themeToggle.click();
    await page.reload();

    const html = page.locator("html");
    const hasDarkClass = await html.evaluate((el) =>
      el.classList.contains("dark"),
    );
    expect(hasDarkClass).toBe(false);
  });

  test("should show sun icon in dark mode", async ({ page }) => {
    await page.evaluate(() => localStorage.setItem("theme", "dark"));
    await page.reload();
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await expect(themeToggle).toHaveAttribute(
      "aria-label",
      /currently dark mode/,
    );
  });

  test("should show moon icon in light mode", async ({ page }) => {
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await themeToggle.click();

    await expect(themeToggle).toHaveAttribute(
      "aria-label",
      /currently light mode/,
    );
  });

  test("should have accessible aria-label describing current mode", async ({
    page,
  }) => {
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await expect(themeToggle).toHaveAttribute(
      "aria-label",
      /currently (dark|light) mode/,
    );
  });
});
