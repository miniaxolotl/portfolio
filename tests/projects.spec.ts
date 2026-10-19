import { expect, test } from "@playwright/test";

const formerPosts = [
  "fern",
  "bramble-labs",
  "grove",
  "fitr",
  "burrow",
  "fashion-vision",
  "inkbyte",
  "gobox",
  "paint-opengl",
  "sorbet",
  "snake-game",
];

test("featured project artwork and titles lead directly to the live products", async ({
  page,
}) => {
  await page.goto("/");
  for (const [name, url] of [
    ["Fern", "https://usefern.app"],
    ["Grove", "https://usegrove.cloud"],
    ["Fitr", "https://fitr.ca"],
    ["Burrow", "https://useburrow.app"],
  ]) {
    const card = page
      .locator("#projects")
      .getByRole("article", { name, exact: true });
    await expect(card.getByRole("link", { name, exact: true })).toHaveAttribute(
      "href",
      url,
    );
    await expect(
      card.getByRole("link", { name: `Open ${name} website` }),
    ).toHaveAttribute("href", url);
    await expect(
      card.getByRole("link", { name: `Visit ${name}`, exact: true }),
    ).toHaveAttribute("href", url);
  }
});

test("the blog index, every former post, and raw markdown are unavailable", async ({
  request,
}) => {
  for (const path of [
    "/projects",
    ...formerPosts.map((slug) => `/projects/${slug}`),
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
    expect(await response.text(), path).toMatch(
      /name="robots" content="noindex/,
    );
  }
  for (const path of [
    ...formerPosts.map((slug) => `/content/posts/${slug}.md`),
    "/content/posts/.ignore/shrymp.md",
    "/content/posts/.ignore/paint-opengl.md",
  ]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test("desktop and mobile navigation offer the portfolio without blog links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await expect(page.locator('a[href^="/projects"]')).toHaveCount(0);
  await expect(page.getByRole("button", { name: /blog/i })).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /read.*story|behind the website|posts/i }),
  ).toHaveCount(0);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const drawer = page.locator("[data-vaul-drawer]");
  await expect(
    drawer.getByRole("link", { name: "Blog", exact: true }),
  ).toHaveCount(0);
  await expect(
    drawer.getByRole("link", { name: "Projects", exact: true }),
  ).toHaveAttribute("href", "/#projects");
});

for (const name of ["Grove", "Burrow"]) {
  test(`${name} installation page stays available and returns to the portfolio`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const response = await page.goto(`/${name.toLowerCase()}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Features", exact: true }),
    ).toBeVisible();
    await expect(page.getByTestId("sidebar")).not.toBeVisible();
    await expect(page.locator('a[href^="/projects"]')).toHaveCount(0);
    await page.getByRole("link", { name: "All projects", exact: true }).click();
    await expect(page).toHaveURL(/\/#projects$/);
    await expect(page.locator("#projects > div > h2")).toBeInViewport();
  });
}
