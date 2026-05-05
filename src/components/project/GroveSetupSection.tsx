"use client";

import { Check, Copy, Package } from "lucide-react";
import { useState } from "react";
import { LuGithub } from "react-icons/lu";
import { SiDocker, SiNpm } from "react-icons/si";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "docker-compose", label: "docker-compose" },
  { id: "manual", label: "manual" },
];

const dockerComposeServer = `cp .env.example .env\ndocker compose up -d`;

const manualServer = `docker run -p 6333:6333 qdrant/qdrant\nnpx @miniaxolotl/grove`;

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
                <span style={{ color: "var(--terminal-command)" }}>
                  {line.split(" ")[0]}
                </span>
                {line.split(" ").slice(1).length > 0 && (
                  <span style={{ color: "var(--terminal-text)" }}>
                    {` ${line.split(" ").slice(1).join(" ")}`}
                  </span>
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

const JsonBlock = ({ code }: { code: string }) => {
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
      <div className="px-4 py-4 flex items-start justify-between gap-4">
        <pre className="text-sm font-mono overflow-x-auto">
          <code style={{ color: "var(--terminal-text)" }}>{code}</code>
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

export const GroveSetupSection = () => {
  const [activeTab, setActiveTab] = useState("docker-compose");

  const serverCode =
    activeTab === "docker-compose" ? dockerComposeServer : manualServer;

  return (
    <div className="space-y-6">
      {/* Server Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Server
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
                {tabs.map((tab) => (
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
          <CodeBlock code={serverCode} />
        </div>
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
};
