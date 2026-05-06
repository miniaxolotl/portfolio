"use client";

import { LuGithub } from "react-icons/lu";
import projects from "@/data/projects.json";
import { capture } from "@/lib/analytics";
import { ensureProtocol } from "@/lib/utils";

export const OtherProjectsList = () => {
  const other = projects
    .filter((p) => !p.featured)
    .sort((a, b) => {
      const yearA = a.year ? parseInt(a.year, 10) : 0;
      const yearB = b.year ? parseInt(b.year, 10) : 0;
      return yearB - yearA;
    });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
      {other.map((project) => {
        const gitLinks = Array.isArray(project.gitLink)
          ? project.gitLink
          : project.gitLink
            ? [project.gitLink]
            : [];

        return (
          <div
            key={project.slug}
            className="flex items-center justify-between gap-3 py-2 border-b border-border/30"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-medium truncate">
                {project.title}
              </span>
              {project.year && (
                <span className="text-xs text-muted-foreground font-mono shrink-0">
                  {project.year}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {project.links?.map((link) => (
                <a
                  key={link.url}
                  href={ensureProtocol(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  onClick={() =>
                    capture("other_project_github_clicked", {
                      project: project.slug,
                      url: link.url,
                      label: link.label,
                    })
                  }
                >
                  <LuGithub size={12} />
                  {link.label}
                </a>
              ))}
              {gitLinks.map((link) => (
                <a
                  key={link}
                  href={ensureProtocol(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label={`View ${project.title} on GitHub`}
                  onClick={() =>
                    capture("other_project_github_clicked", {
                      project: project.slug,
                      url: link,
                    })
                  }
                >
                  <LuGithub size={14} />
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
