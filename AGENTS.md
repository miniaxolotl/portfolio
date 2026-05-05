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
- **Mobile drawer:** `@base-ui/react/drawer`, controlled state with `open`/`onOpenChange`, close with `Escape`
- **Drawer test selector:** `[data-vaul-drawer]`
- **Header projects dropdown:** `@headlessui/react` Menu component

## Next.js Warning

This is **NOT** the Next.js you know. APIs and conventions may differ from training data.
Read `node_modules/next/dist/docs/` before writing code.

## Style

- **shadcn/ui** for all UI components (button, card, drawer, etc.) - this is NOT raw Radix UI, use shadcn components
- Biome for lint/format (not ESLint/Prettier)
- `cn()` from `clsx` + `tailwind-merge` in `src/lib/utils.ts`
- Icons: `lucide-react` (standard), `react-icons/lu` (brands), `react-icons/rx` (Discord)
- Use `className` not `class`, named exports for components

## Commit Style

All commits MUST follow this format. Prefix with type and optional scope.

```
feature: add dark mode toggle
feature(blog): rewrite inkbyte post
chore: update dependencies
chore(lint): fix biome warnings
chore(deps): bump next to 16.2.4
bug: fix drawer close on escape
bug(test): stabilize flaky a11y test
style: format with biome
refactor: extract sidebar component
docs: update workspace readme
```

Types: `feature`, `bug`, `chore`, `style`, `refactor`, `docs`, `test`
Scopes (optional): `blog`, `lint`, `deps`, `test`, `ui`, `layout`, `api`

## Planning Protocol

### Requirement: Plan Before Implementing

**All non-trivial changes MUST have a written plan before any code is written.** A "non-trivial" change is anything that touches more than one file, adds a new feature, changes architecture, refactors existing patterns, or introduces new dependencies. Bug fixes to single files may be exempted at discretion, but when in doubt, write the plan.

### Plan Location

- All planning documents, design docs, architecture notes, RFCs, and task breakdowns MUST be stored in `plans/`.
- Create a dedicated `.md` file for each distinct initiative (e.g., `plans/dark-mode-redesign.md`, `plans/add-contact-form.md`).
- The central tracker is `plans/status.md` — it must be updated every time a plan is created, progresses, or completes.

### Plan Structure

Every plan file MUST be verbose and descriptive. Do not write bare bullet lists. Explain the reasoning, trade-offs, risks, and context. Include at minimum:

1. **Goal** — What this plan achieves, in plain language.
2. **Status** — One of: `Planned`, `In Progress`, `Blocked`, `Completed`, `Cancelled`.
3. **Priority** — `high`, `medium`, or `low`.
4. **Context** — Background, motivation, and why this change is needed now.
5. **Scope** — Explicitly what is in-scope and what is out-of-scope.
6. **Approach / Design** — Detailed proposed solution. Include architecture decisions, file changes, new components, API contracts, data flow, and state management. Reference specific files by path.
7. **Task Checklist** — Granular, actionable checklist with checkboxes (`- [ ]`). Track progress here.
8. **Dependencies & Risks** — Blockers, prerequisite PRs, unknowns, and mitigation strategies.
9. **Testing Strategy** — How this will be tested (Playwright tests, manual verification, etc.).
10. **Notes & References** — Links to docs, related issues, prior art, or decisions made during implementation.

### Status Tracking

- `plans/status.md` is the single source of truth for plan health.
- When a plan is **created**, add it to `status.md` with status `Planned`.
- When work **starts**, update the status to `In Progress` and datestamp it.
- When a plan **advances** (milestones reached, blockers resolved), update `status.md` immediately.
- When a plan **finishes**, mark `Completed` and move it to the Completed section.
- When a plan is **abandoned**, mark `Cancelled` and note why.
- Every status change MUST include a timestamp (ISO-8601 date: `YYYY-MM-DD`).

### Workflow

1. Receive task → Determine if it is non-trivial.
2. If non-trivial → Create `plans/<descriptive-name>.md` with full structure above.
3. Update `plans/status.md` with the new entry.
4. Review the plan (self-check: does it cover scope, approach, risks, tests?).
5. Implement the plan, checking off tasks in the plan file as you go.
6. Update `plans/status.md` as status changes.
7. On completion, update both the plan file and `status.md` to `Completed`.