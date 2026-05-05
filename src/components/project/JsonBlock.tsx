"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface JsonBlockProps {
  code: string;
  className?: string;
}

export const JsonBlock = ({ code, className }: JsonBlockProps) => {
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
