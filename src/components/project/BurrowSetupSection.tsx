"use client";

import { LuGithub } from "react-icons/lu";
import { SiDocker, SiNpm } from "react-icons/si";
import { CodeBlock } from "@/components/project/CodeBlock";
import { TabbedTerminal } from "@/components/project/TabbedTerminal";

const clientTabs = [
  {
    id: "bun",
    label: "bun",
    code: "bun add -g @miniaxolotl/burrowctl\nburrowctl tunnel create --port 8080",
  },
  {
    id: "npm",
    label: "npm",
    code: "npm i -g @miniaxolotl/burrowctl\nburrowctl tunnel create --port 8080",
  },
  {
    id: "pnpm",
    label: "pnpm",
    code: "pnpm add -g @miniaxolotl/burrowctl\nburrowctl tunnel create --port 8080",
  },
];

const serverCode = `cp .env.example .env\ndocker compose up -d`;

export const BurrowSetupSection = () => (
  <div className="space-y-6">
    {/* Server Section */}
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Server
        </span>
      </div>
      <CodeBlock code={serverCode} />
      <div className="flex flex-wrap gap-3 mt-3">
        <a
          href="https://hub.docker.com/r/miniaxolotl/burrowd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
        >
          <SiDocker size={14} />
          Docker Hub
        </a>
        <a
          href="https://github.com/miniaxolotl/burrow/pkgs/container/burrowd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
        >
          <LuGithub size={14} />
          GHCR
        </a>
      </div>
    </div>

    {/* Client Section */}
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Client
        </span>
      </div>
      <TabbedTerminal tabs={clientTabs} defaultTab="bun" />
      <div className="flex flex-wrap gap-3 mt-3">
        <a
          href="https://www.npmjs.com/package/@miniaxolotl/burrowctl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
        >
          <SiNpm size={14} />
          npm
        </a>
      </div>
    </div>
  </div>
);
