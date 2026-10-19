"use client";

import { ArrowUpRight } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import projects from "@/data/projects.json";
import { capture } from "@/lib/analytics";
import { normalizeGitLinks, sortByYearDesc } from "@/lib/projects";
import { ensureProtocol } from "@/lib/utils";
import type { Project } from "@/types";

export const OtherProjectsList = () => {
  const other: Project[] = projects
    .filter((p) => !p.featured && p.slug !== "bramble-labs")
    .sort(sortByYearDesc);
  return (
    <div className="divide-y divide-border border-y border-border">
      {other.map((project) => (
        <article
          key={project.slug}
          className="grid gap-2 py-5 sm:grid-cols-[1fr_1.5fr] sm:gap-6"
          aria-labelledby={`${project.slug}-title`}
        >
          <div>
            <div className="flex items-center gap-3">
              <h4 id={`${project.slug}-title`} className="text-sm font-medium">
                {project.title}
              </h4>
              <span className="font-mono text-[10px] text-muted-foreground">
                {project.year}
              </span>
            </div>
            {project.status && (
              <p className="text-xs text-muted-foreground">{project.status}</p>
            )}
          </div>
          <div>
            <p className="text-xs leading-[1.8] text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-1 flex flex-wrap gap-4">
              {normalizeGitLinks(project.gitLink).map((link) => (
                <a
                  key={link}
                  href={ensureProtocol(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="inline-flex min-h-9 items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() =>
                    capture("other_project_github_clicked", {
                      project: project.slug,
                    })
                  }
                >
                  <LuGithub size={13} aria-hidden="true" />
                  Source
                </a>
              ))}
              {project.links?.map((link) => (
                <a
                  key={link.url}
                  href={ensureProtocol(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
