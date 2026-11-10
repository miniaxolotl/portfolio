import { TabbedTerminal } from "@/components/project/TabbedTerminal";

const clientTabs = [
  {
    id: "bun",
    label: "bun",
    code: "bun add -g @miniaxolotl/burrowctl\nburrowctl tunnel 3000",
  },
  {
    id: "npm",
    label: "npm",
    code: "npm i -g @miniaxolotl/burrowctl\nburrowctl tunnel 3000",
  },
  {
    id: "pnpm",
    label: "pnpm",
    code: "pnpm add -g @miniaxolotl/burrowctl\nburrowctl tunnel 3000",
  },
];

export const BurrowSetupSection = () => (
  <div className="space-y-5">
    <p className="text-sm leading-relaxed text-muted-foreground">
      Start your local app, then open a tunnel to its port. Keep the client
      running while you share the link. Burrow connects to brmbl.dev by default
      and manages your owner credential automatically.
    </p>
    <TabbedTerminal tabs={clientTabs} defaultTab="bun" />
    <div className="flex flex-wrap gap-4 text-sm">
      <a
        className="min-h-11 inline-flex items-center underline underline-offset-4"
        href="https://useburrow.app/#install"
        target="_blank"
        rel="noopener noreferrer"
      >
        Current installation guide ↗
      </a>
      <a
        className="min-h-11 inline-flex items-center underline underline-offset-4"
        href="https://github.com/miniaxolotl/burrow/blob/HEAD/documentation/server.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        Self-hosting reference ↗
      </a>
    </div>
  </div>
);
