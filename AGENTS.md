# Portfolio Agent Guide

> **Full documentation:** See `WORKSPACE.md` for detailed project info.

## Key Commands

```bash
bun run dev      # Dev server on port 6681
bun run build    # Production build
bun run lint     # Biome linting
bun run format   # Biome format
bunx biome check --write  # Auto-fix lint/format issues
npx playwright test   # Tests use same port 6681, webServer reuses existing dev server
```

## Testing

- **Dev server:** Port 6681 (run separately with `bun run dev`)
- **Tests:** Use port 6681 via `reuseExistingServer: true` in playwright.config.ts
- **Command:** `npx playwright test`
- **Important:** Tests do NOT kill the dev server - they reuse it via `reuseExistingServer: true`

## Critical Constraints

- **Package manager:** `bun` only (not npm/yarn/pnpm)
- **Dependency prefix:** All deps use `~` (NOT `^`)
- **Functions:** Arrow functions `const f = () => {}`
- **Testing:** All new functionality must have Playwright tests

## Architecture

- **3 pages:** `/`, `/burrow`, `/grove`
- **Dark mode default:** html uses `dark` class
- **Mobile drawer:** shadcn UI (vaul-based), controlled state with `open`/`onOpenChange`, close with `Escape`
- **Drawer test selector:** `[data-vaul-drawer]`
- **Header projects dropdown:** shadcn DropdownMenu (`@radix-ui/react-dropdown-menu`)

## Next.js Warning

This is **NOT** the Next.js you know. APIs and conventions may differ from training data.
Read `node_modules/next/dist/docs/` before writing code.

## Style

- **shadcn/ui** for all UI components (button, card, drawer, etc.) - this is NOT raw Radix UI, use shadcn components
- Biome for lint/format (not ESLint/Prettier)
- `cn()` from `clsx` + `tailwind-merge` in `src/lib/utils.ts`
- Icons: `lucide-react` (standard), `react-icons/lu` (brands), `react-icons/rx` (Discord)
- Use `className` not `class`, named exports for components