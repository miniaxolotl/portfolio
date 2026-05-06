"use client";

import { useCallback, useEffect, useState } from "react";
import type { MarkdownHeading } from "@/lib/markdown";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: MarkdownHeading[];
}

export const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  const handleScroll = useCallback(() => {
    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const scrollPosition = window.scrollY + 120;

    let current = headingElements[0]?.id ?? "";
    for (const el of headingElements) {
      if (el.offsetTop <= scrollPosition) {
        current = el.id;
      }
    }

    setActiveId(current);
  }, [headings]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          On this page
        </h2>
        <nav aria-label="Table of contents">
          <ul className="space-y-1 border-l border-border/40">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{
                  paddingLeft: heading.level > 2 ? "1rem" : "0",
                }}
              >
                <button
                  type="button"
                  onClick={() => handleClick(heading.id)}
                  className={cn(
                    "block w-full text-left text-sm leading-snug py-1 pl-3 border-l-2 transition-colors duration-200",
                    activeId === heading.id
                      ? "border-accent text-foreground font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border/60",
                  )}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};
