import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const destinations = [
  ["Fern", "https://usefern.app"],
  ["Grove", "https://usegrove.cloud"],
  ["Fitr", "https://fitr.ca"],
  ["Burrow", "https://useburrow.app"],
] as const;

test("current products have working local artwork and canonical public links", async ({
  page,
}) => {
  await page.goto("/");
  for (const [name, href] of destinations) {
    const card = page
      .locator("#projects")
      .getByRole("article", { name, exact: true });
    await expect(
      card.getByRole("link", { name: `Visit ${name}`, exact: true }),
    ).toHaveAttribute("href", href);
    const banner = card.getByRole("img").first();
    await banner.scrollIntoViewIfNeeded();
    await expect(banner).toBeVisible();
    await expect
      .poll(() =>
        banner.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  await expect(
    page.getByRole("link", { name: "Meet Bramble Labs" }),
  ).toHaveAttribute("href", "https://bramblelabs.co");
  await expect(
    page.locator(
      'a[href*="celestialstag"], a[href*="theluckyegg"], a[href*="github.com/miniaxolotl/fashion-vision"], a[href*="github.com/bramble-labs/fern"]',
    ),
  ).toHaveCount(0);
});

test("hero work action reaches the projects, with contact and resume available", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#projects > div > h2")).toBeInViewport();
  await expect(
    page.locator("#contact").getByRole("link", { name: "elias@mawa.dev" }),
  ).toHaveAttribute("href", "mailto:elias@mawa.dev");
  const downloadPromise = page.waitForEvent("download");
  await page
    .locator("#contact")
    .getByRole("link", { name: "Download resume" })
    .click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("mawa-2026-05-v2c.pdf");
  expect(await download.failure()).toBeNull();
});

test("Calgary, AB is consistent in the profile, bio, footer and sharing metadata", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await expect(
    page.locator("#about").getByText("Calgary, AB", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByTestId("sidebar").getByText("Calgary, AB", { exact: true }),
  ).toBeVisible();
  await expect(page.locator("#about")).toContainText("engineer in Calgary, AB");
  await expect(page.locator("footer")).toContainText("in Calgary, AB.");
  for (const selector of [
    'meta[name="description"]',
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
    'meta[name="keywords"]',
    'meta[property="og:image:alt"]',
  ]) {
    await expect(page.locator(selector)).toHaveAttribute(
      "content",
      /Calgary, AB/,
    );
  }
  expect(await page.content()).not.toContain("Edmonton");
});

test("legacy Grove setup switches agent commands and copies the current connection flow", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/grove");
  await page.getByRole("button", { name: "codex", exact: true }).click();
  const setup = page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: "Getting Started" }) });
  await expect(setup.locator("pre")).toContainText(
    "grove init --client codex --url https://api.usegrove.cloud",
  );
  await setup.getByRole("button", { name: "Copy command" }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain("grove status --client codex --json");
  await expect(
    page.getByText(/Qdrant|memory_save|no privacy leaks/i),
  ).toHaveCount(0);
});

test("legacy Burrow setup uses the published tunnel command", async ({
  page,
}) => {
  await page.goto("/burrow");
  const setup = page
    .locator("section")
    .filter({ has: page.getByRole("heading", { name: "Getting Started" }) });
  await setup.getByRole("button", { name: "npm", exact: true }).click();
  await expect(setup.locator("pre")).toContainText("burrowctl tunnel 3000");
  await expect(setup.locator("pre")).not.toContainText("tunnel create");
  await expect(
    page.getByRole("link", { name: "Visit Burrow", exact: true }),
  ).toHaveAttribute("href", "https://useburrow.app");
});

test("mobile navigation closes after a section selection and a desktop resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  await page
    .locator("[data-vaul-drawer]")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page.locator("[data-vaul-drawer]")).not.toBeVisible();
  await expect(page).toHaveURL(/#projects$/);
  await trigger.click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator("[data-vaul-drawer]")).not.toBeVisible();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

for (const theme of ["dark", "light"] as const) {
  test(`${theme} theme restores the original styling and passes responsive accessibility checks`, async ({
    page,
    context,
  }) => {
    test.setTimeout(90_000);
    await context.addCookies([
      { name: "theme", value: theme, url: "http://localhost:6681" },
    ]);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(
        page.getByRole("button", {
          name: new RegExp(`currently ${theme} mode`),
        }),
      ).toBeVisible();
      await expect(page.locator("body")).toHaveCSS(
        "background-color",
        theme === "dark" ? "rgb(26, 21, 18)" : "rgb(250, 248, 245)",
      );
      await expect(page.locator("body")).toHaveCSS(
        "font-family",
        /^ui-sans-serif, system-ui, sans-serif/,
      );
      await expect(page.getByRole("heading", { level: 1 })).toHaveCSS(
        "font-weight",
        "700",
      );
      await expect(page.getByRole("heading", { level: 1 })).toHaveCSS(
        "font-style",
        "normal",
      );
      await expect(page.locator("h1 em")).toHaveCount(0);
      await expect(page.locator('link[rel="preload"][as="font"]')).toHaveCount(
        0,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `homepage overflow at ${width}px`,
      ).toBe(true);
    }
    for (const route of ["/", "/grove", "/burrow"]) {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route);
      await expect(
        page.getByRole("button", { name: /currently/i }),
      ).toBeEnabled();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} overflow`,
      ).toBe(true);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations, `${theme} ${route}`).toEqual([]);
    }
  });
}

test("reduced motion disables smooth scrolling and image motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expect(page.locator(".project-art").first()).toHaveCSS(
    "transition-duration",
    "1e-05s",
  );
});

test("sharing artwork is a real image and missing project routes return 404", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const imageUrl = await page
    .locator('meta[property="og:image"]')
    .getAttribute("content");
  expect(imageUrl).toBeTruthy();
  const image = await request.get(
    new URL(imageUrl ?? "", "http://localhost:6681").pathname,
  );
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  expect((await image.body()).byteLength).toBeGreaterThan(1000);
  const response = await page.goto("/projects/does-not-exist");
  expect(response?.status()).toBe(404);
});
