"use client";

import { Package } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { SiDocker, SiNpm } from "react-icons/si";
import { JsonBlock } from "@/components/project/JsonBlock";
import { TabbedTerminal } from "@/components/project/TabbedTerminal";

const serverTabs = [
  {
    id: "docker-compose",
    label: "docker-compose",
    code: "cp .env.example .env\ndocker compose up -d",
  },
  {
    id: "manual",
    label: "manual",
    code: "docker run -p 6333:6333 qdrant/qdrant\nnpx @miniaxolotl/grove",
  },
];

const opencodePlugin = `{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@miniaxolotl/grove-opencode-plugin"]
}`;

const opencodeMcp = `{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "grove": {
      "type": "remote",
      "url": "http://localhost:26080/mcp"
    }
  }
}`;

export const GroveSetupSection = () => (
  <div className="space-y-6">
    {/* Server Section */}
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Server
        </span>
      </div>
      <TabbedTerminal tabs={serverTabs} defaultTab="docker-compose" />
      <div className="flex flex-wrap gap-3 mt-3">
        <a
          href="https://hub.docker.com/r/miniaxolotl/grove"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
        >
          <SiDocker size={14} />
          Docker Hub
        </a>
        <a
          href="https://github.com/miniaxolotl/grove/pkgs/container/grove"
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
          Client — OpenCode
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">MCP Server</p>
          <JsonBlock code={opencodeMcp} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Plugin (Recommended)
          </p>
          <JsonBlock code={opencodePlugin} />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        <a
          href="https://www.npmjs.com/package/@miniaxolotl/grove"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
        >
          <SiNpm size={14} />
          npm
        </a>
        <a
          href="https://www.npmjs.com/package/@miniaxolotl/grove-opencode-plugin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
        >
          <Package size={14} />
          OpenCode Plugin
        </a>
      </div>
    </div>
  </div>
);
