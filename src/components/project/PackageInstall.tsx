"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PackageInstallProps {
  npmPackage?: string | null;
  dockerImage?: string;
  commands?: Record<string, string>;
}

const tabs = [
  { id: "bun", label: "bun" },
  { id: "npm", label: "npm" },
  { id: "pnpm", label: "pnpm" },
  { id: "docker", label: "docker" },
];

export const PackageInstall = ({
  npmPackage,
  dockerImage,
  commands,
}: PackageInstallProps) => {
  const [activeTab, setActiveTab] = useState(() => {
    if (commands?.docker && !commands?.bun && !commands?.npm && !commands?.pnpm)
      return "docker";
    if (npmPackage || commands?.bun || commands?.npm || commands?.pnpm)
      return "bun";
    if (dockerImage) return "docker";
    return "bun";
  });
  const [copied, setCopied] = useState(false);

  const defaultCommands: Record<string, string> = {
    bun: npmPackage ? `bun add ${npmPackage}` : "",
    npm: npmPackage ? `npm install ${npmPackage}` : "",
    pnpm: npmPackage ? `pnpm add ${npmPackage}` : "",
    docker: dockerImage ? `docker run -d ${dockerImage}` : "",
  };

  const allCommands = { ...defaultCommands, ...commands };

  const availableTabs = tabs.filter((tab) => {
    if (tab.id === "docker") {
      return !!dockerImage || !!commands?.docker;
    }
    return !!npmPackage || !!commands?.[tab.id];
  });

  const command = allCommands[activeTab];

  const handleCopy = async () => {
    if (!command) return;
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const parts = command?.split(" ") ?? [];
  const cmd = parts[0] ?? "";
  const rest = parts.slice(1);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "var(--terminal-bg)" }}
    >
      {/* Header */}
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
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 py-1 text-xs font-mono font-medium rounded-md transition-colors",
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
        </div>

        <div className="w-14 shrink-0" />
      </div>

      {/* Code block */}
      <div className="px-4 py-4 flex items-center justify-between gap-4">
        <pre className="text-sm font-mono overflow-x-auto">
          <code>
            <span
              className="select-none"
              style={{ color: "var(--terminal-prompt)" }}
            >
              $
            </span>{" "}
            <span style={{ color: "var(--terminal-command)" }}>{cmd}</span>
            {rest.length > 0 && (
              <span style={{ color: "var(--terminal-text)" }}>
                {" "}
                {rest.join(" ")}
              </span>
            )}
          </code>
        </pre>

        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "shrink-0 p-2 rounded-lg transition-colors",
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
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor =
                "var(--terminal-tab-active-bg)";
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = "";
            }
          }}
          aria-label={copied ? "Copied" : "Copy command"}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
};
