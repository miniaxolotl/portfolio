"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { RxDiscordLogo } from "react-icons/rx";
import { cn } from "@/lib/utils";

interface DiscordCopyButtonProps {
  variant?: "footer" | "drawer";
  className?: string;
}

export const DiscordCopyButton = ({
  variant = "footer",
  className,
}: DiscordCopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("crestfallen.faerie");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  if (variant === "drawer") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className="group w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
      >
        <RxDiscordLogo size={16} className="shrink-0" />
        <code className="flex-1 text-left text-sm font-mono truncate">
          crestfallen.faerie
        </code>
        <span
          className={cn(
            "shrink-0 transition-colors",
            copied
              ? "text-accent"
              : "text-muted-foreground group-hover:text-foreground",
          )}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-mono transition-colors",
        copied
          ? "bg-accent/10 text-accent"
          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
      aria-label="Copy Discord username"
    >
      <RxDiscordLogo size={12} />
      <span>crestfallen.faerie</span>
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
};
