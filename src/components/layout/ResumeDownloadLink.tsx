"use client";

import { Download } from "lucide-react";
import posthog from "posthog-js";
import { cn } from "@/lib/utils";

interface ResumeDownloadLinkProps {
  onClick?: () => void;
  className?: string;
}

export const ResumeDownloadLink = ({
  onClick,
  className,
}: ResumeDownloadLinkProps) => {
  const handleClick = () => {
    posthog.capture("resume_downloaded");
    onClick?.();
  };

  return (
    <a
      href="/mawa-2026-05-v2c.pdf"
      download
      onClick={handleClick}
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
        "text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      <span className="flex items-center justify-center w-8 h-8 rounded-md transition-colors bg-background text-muted-foreground group-hover:text-foreground">
        <Download size={16} />
      </span>
      <span>Download Resume</span>
    </a>
  );
};
