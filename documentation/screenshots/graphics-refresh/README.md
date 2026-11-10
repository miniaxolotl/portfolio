# Graphics refresh screenshots

Captured 2026-11-10 against local dev servers running the two compared
revisions of `feature/portfolio-graphics`:

- `before-*` — base `feature/portfolio-refresh` (`8529e4b`), served on
  `localhost:6683`.
- `after-*` — this branch, served on `localhost:6681`.

| File | View | Shows |
| --- | --- | --- |
| `before/after-featured-desktop.png` | 1280×900 desktop, featured cards grid | Banner + mark swap: old 1200×628 campaign banners → new 1920×720 website-graphics banners (shown uncropped at their native aspect) |
| `before/after-projects-desktop.png` | 1280×900 desktop, full projects section | Removal of the "Growing at Bramble Labs" studio card between featured work and the archive |
| `before/after-projects-mobile.png` | 390×844 mobile (2×), full projects section | Same two changes at mobile width |

Element screenshots of `#projects` (and its featured-cards grid), Playwright
Chromium. Images wait for decode before capture.
