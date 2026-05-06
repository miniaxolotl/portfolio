"use client";

import { Check, Copy } from "lucide-react";
import { capture } from "@/lib/analytics";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InstallTab {
  id: string;
  label: string;
  command: string;
}

interface HeroInstallProps {
  tabs: InstallTab[];
  defaultTab?: string;
}

export const HeroInstall = ({ tabs, defaultTab }: HeroInstallProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);
  const [copied, setCopied] = useState(false);

  const activeCommand = tabs.find((t) => t.id === activeTab)?.command ?? "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    capture("install_command_copied", {
      package_manager: activeTab,
      command: activeCommand,
    });
  };

  return (
    <div
      className="inline-flex flex-col rounded-lg overflow-hidden"
      style={{ backgroundColor: "var(--terminal-bg)" }}
    >
      {/* Tabs */}
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{ backgroundColor: "var(--terminal-header)" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-2.5 py-0.5 text-xs font-mono font-medium rounded transition-colors",
              activeTab === tab.id
                ? "text-[var(--terminal-text)]"
                : "text-[var(--terminal-muted)] hover:text-[var(--terminal-text)]",
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

      {/* Command */}
      <div className="px-4 py-3 flex items-center gap-3">
        <span style={{ color: "var(--terminal-prompt)" }}>$</span>
        <span
          className="font-mono text-sm"
          style={{ color: "var(--terminal-text)" }}
        >
          {activeCommand}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "ml-auto p-1.5 rounded-md transition-colors",
            copied
              ? "text-[var(--terminal-prompt)]"
              : "text-[var(--terminal-muted)] hover:text-[var(--terminal-text)]",
          )}
          style={
            copied
              ? {
                  backgroundColor:
                    "color-mix(in srgb, var(--terminal-prompt) 10%, transparent)",
                }
              : undefined
          }
          aria-label={copied ? "Copied" : "Copy command"}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
};
