"use client";

import { capture } from "@/lib/analytics";
import type { ReactNode } from "react";

interface Badge {
  label: string;
  url: string;
  icon?: ReactNode;
}

interface BadgeRowProps {
  badges: Badge[];
}

export const BadgeRow = ({ badges }: BadgeRowProps) => (
  <div className="flex flex-wrap gap-2">
    {badges.map((badge) => (
      <a
        key={badge.url}
        href={badge.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-muted/60 hover:bg-muted transition-colors border border-border/40"
        onClick={() =>
          capture("project_external_link_clicked", {
            label: badge.label,
            url: badge.url,
          })
        }
      >
        {badge.icon}
        {badge.label}
      </a>
    ))}
  </div>
);
