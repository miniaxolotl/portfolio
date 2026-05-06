"use client";

import Link from "next/link";
import { LuArrowUpRight, LuGithub } from "react-icons/lu";
import { ProjectTag } from "@/components/project/ProjectTag";
import { capture } from "@/lib/analytics";
import { blogSlugs, getProjectHref } from "@/lib/projects";
import { ensureProtocol } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const gitLinks = Array.isArray(project.gitLink)
    ? project.gitLink
    : project.gitLink
      ? [project.gitLink]
      : [];

  const href = getProjectHref(project);

  return (
    <article className="group relative flex flex-col gap-4 p-5 sm:p-6 rounded-2xl bg-card border border-border/40 transition-colors duration-200 hover:border-accent/30">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="relative flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {project.title}
              </h3>
              {project.year && (
                <span className="text-xs text-muted-foreground font-mono shrink-0 px-2 py-0.5 rounded-md bg-muted/50">
                  {project.year}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {project.links?.map((link) => (
              <a
                key={link.url}
                href={ensureProtocol(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                onClick={() =>
                  capture("project_github_clicked", {
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                aria-label={`View ${project.title} on GitHub`}
                onClick={() =>
                  capture("project_github_clicked", {
                    project: project.slug,
                    url: link,
                  })
                }
              >
                <LuGithub size={15} />
              </a>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <ProjectTag key={tag} tag={tag} />
          ))}
        </div>
      </div>

      {blogSlugs.has(project.slug) && (
        <div className="relative pt-2 border-t border-border/30">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-accent transition-colors group/link"
            onClick={() =>
              capture("project_read_more_clicked", {
                project: project.slug,
                href,
              })
            }
          >
            Read more
            <LuArrowUpRight
              size={14}
              className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </Link>
        </div>
      )}
    </article>
  );
};
