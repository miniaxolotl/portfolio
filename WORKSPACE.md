# Portfolio Workspace

## Overview

Portfolio website with three pages (`/`, `/burrow`, `/grove`). Dark mode default, mobile drawer via shadcn UI (vaul).

**Runtime:** `bun` for all package management
**Dev Server Port:** 6681
**Test Port:** 6681 (tests reuse dev server via `reuseExistingServer: true`)

---

## Key Commands

```bash
bun run dev          # Dev server on port 6681
bun run build        # Production build
bun run lint         # Biome linting
bun run format       # Biome format
bunx biome check --write  # Auto-fix lint/format issues
npx playwright test  # Run tests - reuses dev server on 6681
```

---

## Constraints

- **Package manager:** `bun` only (not npm/yarn/pnpm)
- **Dependency prefix:** All deps use `~` (NOT `^`) - enforced in package.json
- **Functions:** Arrow functions `const f = () => {}`
- **Testing:** All new functionality must have Playwright tests

---

## Architecture

### Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/app/page.tsx` | Portfolio home - About (bio, skills, experience) + Projects (5 cards) |
| `/burrow` | `src/app/burrow/page.tsx` | Burrow project page |
| `/grove` | `src/app/grove/page.tsx` | Grove project page |

### Layout

- **Desktop:** Fixed 72-width sidebar
- **Mobile:** Hamburger button + drawer overlay (slides from left)
- **Dark mode default:** html uses `dark` class, toggle via `dark` class on `<html>`
- **Skip to main:** `#main-content` id on main element

### Mobile Drawer

- **shadcn/ui drawer** (vaul-based), **not** raw Radix Dialog
- Controlled state: `open={drawerOpen} onOpenChange={setDrawerOpen}`
- Close with `Escape` key
- Test selector: `[data-vaul-drawer]`

### shadcn/ui Components

**Always use shadcn/ui components, NOT raw Radix primitives:**
- Button: `components/ui/button.tsx` (uses @radix-ui/react-slot internally)
- Card: `components/ui/card.tsx`
- Drawer: `components/ui/drawer.tsx` (uses vaul internally)

---

## Component Inventory

### Layout (`src/components/layout/`)

- `Header.tsx` - Nav links (portfolio/burrow/grove), theme toggle, mobile drawer trigger
- `Sidebar.tsx` - Desktop sidebar with profile, About/Projects nav, socials, resume
- `MobileSidebar.tsx` - Mobile drawer content

### UI (`src/components/ui/`)

- `button.tsx` - shadcn button (variants: default, ghost, outline, secondary, destructive, link)
- `card.tsx` - shadcn card (variants: default, filled)
- `drawer.tsx` - shadcn drawer (vaul-based)
- `ThemeToggle.tsx` - Dark/light mode toggle
- `Footer.tsx` - "Made with by Elias Mawa"
- `SkillBadge.tsx` - Skill pill (5 color variants)
- `Badge.tsx` - Registry badge (npm, docker, github)

### Project (`src/components/project/`)

- `FeatureCard.tsx` / `FeatureCards.tsx` - Feature highlight cards
- `TechStack.tsx` - Tech stack badges row
- `CommandsSection.tsx` - CLI command blocks with copy
- `GuideLinks.tsx` - External documentation links
- `RegistryBadges.tsx` - Version badges (npm, docker, github)
- `McpToolsTable.tsx` - MCP tools table (Grove page only)

### Sections (`src/components/sections/`)

- `About.tsx` - Bio, 24 skills, 3 job experiences
- `Projects.tsx` - 5 project cards

---

## Hooks

| Hook | Purpose |
|------|---------|
| `useTheme.ts` | Dark/light toggle via `dark` class |
| `useClipboard.ts` | Copy to clipboard |
| `useMobileDrawer.ts` | Drawer state |
| `useGitHubReadme.ts` | Fetch README from GitHub |
| `useNpmVersion.ts` | Fetch npm package version |
| `useDockerVersion.ts` | Fetch docker image version |

---

## Data Files

| File | Purpose |
|------|---------|
| `profile.json` | Name, role, location, contact |
| `socials.json` | 4 social links |
| `skills.json` | 24 skills, 5 categories |
| `experience.json` | 3 jobs |
| `projects.json` | 5 projects |
| `burrow-project.json` | Burrow project data |
| `grove-project.json` | Grove project data |

---

## Color Palette

CSS custom properties in `globals.css`:

| Name | DEFAULT |
|------|---------|
| vanilla_cream | #f0ead2 |
| tea_green | #dde5b6 |
| muted_olive | #adc178 |
| faded_copper | #a98467 |
| ash_brown | #6c584c |

---

## Testing

- **44 tests:** theme (5), drawer (9), a11y (16)
- **Port:** 6681
- **Browser:** chromium + Mobile Chrome
- **webServer config:** auto-starts dev server

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ~16.2.4 | Framework |
| `react` | ~19.2.5 | UI |
| `vaul` | ~1.1.2 | Drawer |
| `@radix-ui/react-slot` | ~1.2.4 | Button primitive |
| `@radix-ui/react-dialog` | ~1.1.15 | Dialog primitives |
| `tailwindcss` | ~4.2.4 | Styling |
| `@biomejs/biome` | ~2.4.13 | Lint/format |
| `@playwright/test` | ~1.59.1 | Testing |

---

## Icon Strategy

- `lucide-react` - standard icons
- `react-icons/lu` - brands (GitHub, LinkedIn)
- `react-icons/rx` - Discord

---

## Next.js Agent Warning

> This is **NOT** the Next.js you know. APIs and conventions may differ from training data. Read `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.