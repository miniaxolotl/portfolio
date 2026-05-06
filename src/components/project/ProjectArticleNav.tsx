"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { capture } from "@/lib/analytics";
import { getProjectHref } from "@/lib/projects";
import type { Project } from "@/types";

interface ProjectArticleNavProps {
  prevProject?: Project | null;
  nextProject?: Project | null;
}

export const ProjectArticleNav = ({
  prevProject,
  nextProject,
}: ProjectArticleNavProps) => {
  if (!prevProject && !nextProject) return null;

  return (
    <nav
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      aria-label="Project navigation"
    >
      {prevProject ? (
        <Link
          href={getProjectHref(prevProject)}
          className="group flex flex-col rounded-xl border border-border/40 bg-muted/30 hover:bg-muted/60 hover:border-accent/25 transition-all duration-200 p-5"
          onClick={() =>
            capture("project_prev_clicked", { slug: prevProject.slug })
          }
        >
          <span className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Previous
          </span>
          <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
            {prevProject.title}
          </span>
          <span className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {prevProject.description}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextProject ? (
        <Link
          href={getProjectHref(nextProject)}
          className="group flex flex-col rounded-xl border border-border/40 bg-muted/30 hover:bg-muted/60 hover:border-accent/25 transition-all duration-200 p-5 text-right sm:text-left sm:items-end"
          onClick={() =>
            capture("project_next_clicked", { slug: nextProject.slug })
          }
        >
          <span className="flex items-center gap-2 text-xs text-muted-foreground mb-2 sm:flex-row-reverse">
            Next
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
          <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
            {nextProject.title}
          </span>
          <span className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {nextProject.description}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
};
