# Elias Mawa — portfolio

[mawa.dev](https://mawa.dev) · Next.js 16 · React 19 · TypeScript · Tailwind CSS 4

A personal portfolio of apps, developer tools, and engineering write-ups.
Features Fern, Grove, Fitr, Burrow, Bramble Labs, and earlier experiments.

## Development

Use **Bun** for package management. Dependency versions use `~` ranges.

```sh
bun install --frozen-lockfile
bun run dev
```

Open **http://localhost:6681**. Dark mode is the default; the theme switch stores
your preference in a cookie. Fonts and portfolio artwork are served locally.

## Checks

```sh
bun run lint
bun run typecheck
bun run build
bunx playwright install chromium
bun run test --workers=4
```

Playwright runs desktop and mobile Chromium tests, including axe accessibility
checks. It reuses an existing server on port 6681 and starts one if needed.
For a local production preview, run `bun run start` after building.

## Editing content

- `src/data/profile.json` — personal bio and contact details
- `src/data/projects.json` — project descriptions, current status, public links,
  logos, banners, and featured placement
- `public/content/posts/*.md` — engineering stories and historical explorations
- `src/lib/projects.ts` — available article slugs, menu selection, shared ordering
- `src/components/sections/Skills.tsx` — concise capability descriptions
- `src/app/globals.css` — light/dark palette, typography, and motion preferences

Project years describe historical work, not the latest release date. Check the
live product before changing availability. Fern is coming soon, Fitr has an
early-access waitlist, and Grove/Burrow are available open-source tools.
Bramble Labs Inc. operates Fern, Grove, and Burrow; Fitr Technologies Inc. is a
separate company.

## Artwork

Current marks and banners come from the supplied `Development/marketing` brand
library. Optimized derivatives and provenance are in
[`public/img/brands/`](public/img/brands/README.md). DM Sans and Instrument Serif
are self-hosted with their licenses in `src/app/fonts/`. The pixel mascot's still
frame keeps the existing personal identity without continuous animation.

Routes include `/`, `/projects`, `/projects/[slug]`, `/burrow`, and `/grove`.
The older product URLs retain current installation guides and link to the
dedicated product websites. Vercel hosts the `portfolio` project in the
`bramble-labs-inc` team; its configured production branch is `production`.

See [WORKSPACE.md](WORKSPACE.md) for architecture and [AGENTS.md](AGENTS.md) for
contribution and planning requirements.
