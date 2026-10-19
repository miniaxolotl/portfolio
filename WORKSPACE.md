# Portfolio workspace

## Commands and conventions

Use Bun, tilde dependency ranges, arrow functions, named component exports,
Biome, and the local shadcn-style UI components. Read the installed Next.js
guides in `node_modules/next/dist/docs/` before changing framework behavior.

```sh
bun install --frozen-lockfile
bun run dev                 # port 6681
bun run lint
bun run typecheck
bun run build
bun run start               # production preview, port 6681
bun run test --workers=4     # desktop + mobile Chromium
bunx biome check --write     # safe lint/format fixes
```

Playwright reuses an existing server on port 6681 with `reuseExistingServer: true`.
Tests do not terminate that server. Install the browser with
`bunx playwright install chromium` when setting up a new checkout.

## Routes and content

| Route | Purpose |
| --- | --- |
| `/` | Introduction, selected work, archive, skills/approach, contact |
| `/projects` | Project stories and earlier writing |
| `/projects/[slug]` | Markdown stories with metadata, artwork, TOC, adjacent articles |
| `/burrow` | Current Burrow overview and installation commands |
| `/grove` | Current Grove overview and agent connection commands |
| `/opengraph-image` | Generated portfolio sharing image |

`src/data/projects.json` is the source of truth for display metadata, technology
tags, public destinations and brand artwork. Article prose and descriptions live
in `public/content/posts/`. Add an article slug to `blogSlugs` in
`src/lib/projects.ts` to statically generate its route. `dropdownBlogSlugs`
controls the compact blog menu. Historical years are not release dates.

Fern, Grove, and Burrow are products of Bramble Labs Inc. Fitr is independently
operated by Fitr Technologies Inc. Reflect live availability accurately; do not
publish links to private repositories as public source links.

## Layout and state

- `PageShell` composes the shared header, optional sidebar, main landmark and footer.
- The sidebar appears from 1024px, at 256px wide, increasing to 288px at 1280px.
- Mobile navigation appears below 768px. At tablet widths the top navigation
  remains available without squeezing the page beside a sidebar.
- `Header` uses the local dropdown and drawer wrappers backed by Base UI.
- `DrawerStore` controls opening/closing. Escape, section selection and desktop
  resize close the drawer. Keep `[data-vaul-drawer]` for existing tests.
- `ThemeStore` controls the `dark` class on `<html>` and the persistent theme
  cookie. An inline script applies the choice before paint; default is dark.
- Every page has one main heading and a `#main-content` target for the skip link.

## Visual system

Semantic tokens in `src/app/globals.css` define warm paper/light and charcoal-sage
dark palettes. DM Sans and Instrument Serif are locally hosted through
`next/font/local`. Licenses are bundled with the fonts.

`public/img/brands/README.md` records the source of all five current brand marks
and banners from the marketing library. Artwork is optimized WebP with explicit
dimensions and responsive Next Image sizing. Campaign compositions are not app
screenshots. Legacy article screenshots remain identified as historical where
appropriate. Global reduced-motion rules remove transitions and smooth scrolling;
the personal mascot uses a still frame of the original pixel art.

UI wrappers live in `src/components/ui/`: button variants (`default`, `outline`,
`ghost`), cards, dropdown menu, and drawer. Use `cn()` from `src/lib/utils.ts` for
class composition. Standard icons use Lucide; existing social/brand icons use
React Icons.

## Verification

The browser suite covers themes and persistence, navigation and drawer behavior,
article routing, Vercel script injection, public product destinations, image
loading, resume downloads, current CLI commands, clipboard copying, canonical
metadata and the social image. Responsive checks span 320, 390, 768, 1024 and
1440px. Axe checks WCAG A/AA on both themes and shared page types.

After changing global CSS or local fonts, check computed styles in a fresh
browser. If the dev server retains old CSS, restart it before visual review.
Verify a production build independently of development hot reload.

## Analytics and hosting

Vercel Analytics and Speed Insights are mounted once in the root layout.
Existing PostHog instrumentation and `/ingest` rewrites live in
`instrumentation-client.ts`, `src/lib/analytics.ts`, and `next.config.ts`.

The Vercel project is `portfolio`, under `bramble-labs-inc`, with
`production` configured as its production branch. Before publishing, compare
development and production so previously published changes are preserved.

## Planning and commits

Follow the complete planning protocol in [AGENTS.md](AGENTS.md). All non-trivial
changes need a descriptive plan in `plans/` before implementation. Update
`plans/status.md` as milestones are reached, with ISO dates. This directory is
intentionally ignored locally.

Commit types are `feature`, `bug`, `chore`, `style`, `refactor`, `docs`, and `test`,
with an optional scope: `feature(ui): refresh project presentation`.
