"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { SiDocker, SiNpm } from "react-icons/si";
import { cn } from "@/lib/utils";

const clientTabs = [
  { id: "bun", label: "bun", install: "bun add -g @miniaxolotl/burrowctl" },
  { id: "npm", label: "npm", install: "npm i -g @miniaxolotl/burrowctl" },
  { id: "pnpm", label: "pnpm", install: "pnpm add -g @miniaxolotl/burrowctl" },
];

const clientTunnel = "burrowctl tunnel create --port 8080";

const dockerComposeServer = `cp .env.example .env\ndocker compose up -d`;

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: "var(--terminal-bg)" }}
    >
      <div className="px-4 py-4 flex items-center justify-between gap-4">
        <pre className="text-sm font-mono overflow-x-auto">
          <code>
            {code.split("\n").map((line, i) => (
              <span key={i}>
                <span
                  className="select-none"
                  style={{ color: "var(--terminal-prompt)" }}
                >
                  $
                </span>{" "}
                <span style={{ color: "var(--terminal-command)" }}>{
                  line.split(" ")[0]
                }</span>
                {line.split(" ").slice(1).length > 0 && (
                  <span style={{ color: "var(--terminal-text)" }}>{
                    " " + line.split(" ").slice(1).join(" ")
                  }</span>
                )}
                {i < code.split("\n").length - 1 && <br />}
              </span>
            ))}
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

export const BurrowSetupSection = () => {
  const [activeClientTab, setActiveClientTab] = useState("bun");

  const activeInstall = clientTabs.find((t) => t.id === activeClientTab)?.install ?? "";
  const clientCode = `${activeInstall}\n${clientTunnel}`;

  return (
    <div className="space-y-6">
      {/* Server Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Server
          </span>
        </div>
        <CodeBlock code={dockerComposeServer} />
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
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: "var(--terminal-bg)" }}
        >
          {/* Tab header */}
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
                {clientTabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveClientTab(tab.id)}
                    className={cn(
                      "px-3 py-1 text-xs font-mono font-medium rounded-md transition-colors",
                      activeClientTab === tab.id
                        ? "text-[var(--terminal-text)]"
                        : "text-[var(--terminal-muted)] hover:text-[var(--terminal-text)]",
                    )}
                    style={
                      activeClientTab === tab.id
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
          <CodeBlock code={clientCode} />
        </div>
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
};
