"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/project/CodeBlock";
import { capture } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface TerminalTab {
  id: string;
  label: string;
  code: string;
}

interface TabbedTerminalProps {
  tabs: TerminalTab[];
  defaultTab?: string;
  className?: string;
}

export const TabbedTerminal = ({
  tabs,
  defaultTab,
  className,
}: TabbedTerminalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);

  const activeCode = tabs.find((t) => t.id === activeTab)?.code ?? "";

  return (
    <div
      className={cn("rounded-xl overflow-hidden", className)}
      style={{ backgroundColor: "var(--terminal-bg)" }}
    >
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ backgroundColor: "var(--terminal-header)" }}
      >
        <div className="flex gap-1.5 shrink-0">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--terminal-close)" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--terminal-minimize)" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "var(--terminal-maximize)" }}
          />
        </div>

        <div className="flex-1 flex justify-center">
          <div
            className="flex gap-0.5 rounded-lg p-0.5"
            style={{ backgroundColor: "var(--terminal-bg)" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  capture("terminal_tab_switched", {
                    tab: tab.id,
                    label: tab.label,
                  });
                }}
                className={cn(
                  "px-3 py-1 text-xs font-mono font-medium rounded-md transition-colors",
                  activeTab === tab.id
                    ? "text-(--terminal-text)"
                    : "text-(--terminal-muted) hover:text-(--terminal-text)",
                )}
                style={
                  activeTab === tab.id
                    ? { backgroundColor: "var(--terminal-tab-active-bg)" }
                    : undefined
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-14 shrink-0" />
      </div>

      <CodeBlock code={activeCode} />
    </div>
  );
};
