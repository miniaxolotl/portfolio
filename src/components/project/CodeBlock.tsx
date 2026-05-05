"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  className?: string;
}

export const CodeBlock = ({ code, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn("rounded-xl overflow-hidden", className)}
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
