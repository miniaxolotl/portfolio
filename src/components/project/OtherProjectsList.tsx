"use client";

import Link from "next/link";
import { LuArrowUpRight, LuGithub } from "react-icons/lu";
import projects from "@/data/projects.json";
import { capture } from "@/lib/analytics";
import {
  blogSlugs,
  getProjectHref,
  normalizeGitLinks,
  sortByYearDesc,
} from "@/lib/projects";
import { ensureProtocol } from "@/lib/utils";

export const OtherProjectsList = () => {
  const other = projects.filter((p) => !p.featured).sort(sortByYearDesc);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {other.map((project) => {
        const gitLinks = normalizeGitLinks(project.gitLink);

        const href = getProjectHref(project);

        return (
          <article
            key={project.slug}
            className="group relative flex flex-col gap-3 p-4 rounded-xl bg-card border border-border/30 transition-colors duration-200 hover:border-accent/25"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/3 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

            <div className="relative flex flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {project.title}
                  </h4>
                  {project.year && (
                    <span className="text-xs text-muted-foreground font-mono shrink-0 px-1.5 py-0.5 rounded bg-muted/40">
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
                      <LuGithub size={11} />
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
                      <LuGithub size={13} />
                    </a>
                  ))}
                </div>
              </div>

              {project.description && (
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {project.description.replace(
                    /^[\u{1F300}-\u{1FAD6}\u{2600}-\u{27BF}]\s*/u,
                    "",
                  )}
                </p>
              )}

              {blogSlugs.has(project.slug) && (
                <div className="pt-2 border-t border-border/30">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-accent transition-colors group/link"
                    onClick={() =>
                      capture("other_project_read_more_clicked", {
                        project: project.slug,
                        href,
                      })
                    }
                  >
                    Read more
                    <LuArrowUpRight
                      size={12}
                      className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    />
                  </Link>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};
