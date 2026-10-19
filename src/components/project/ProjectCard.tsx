"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { LuGithub } from "react-icons/lu";
import { Card } from "@/components/ui/card";
import { capture } from "@/lib/analytics";
import { normalizeGitLinks } from "@/lib/projects";
import { ensureProtocol } from "@/lib/utils";
import type { Project } from "@/types";

export const ProjectCard = ({ project }: { project: Project }) => {
  const gitLinks = normalizeGitLinks(project.gitLink);

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="group min-w-0"
    >
      <Card
        variant="filled"
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border transition-colors hover:border-accent/50"
      >
        {project.banner && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} website`}
            className="block overflow-hidden border-b border-border"
          >
            <Image
              src={project.banner}
              alt={project.bannerAlt ?? ""}
              width={1200}
              height={628}
              sizes="(min-width: 1440px) 500px, (min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
              className="project-art aspect-[1200/628] w-full object-cover"
            />
          </a>
        )}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            {project.logo && (
              <Image
                src={project.logo}
                alt=""
                width={40}
                height={40}
                className="rounded-xl"
              />
            )}
            <div className="min-w-0">
              <p className="mb-0.5 text-[11px] text-muted-foreground">
                {project.category}
              </p>
              <h3
                id={`${project.slug}-title`}
                className="text-xl font-medium tracking-tight"
              >
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
              </h3>
            </div>
            <span className="ml-auto max-w-28 text-right text-[10px] leading-relaxed text-muted-foreground">
              {project.status}
            </span>
          </div>
          <p className="text-sm leading-[1.75] text-muted-foreground">
            {project.description}
          </p>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
            {project.tags.join(" · ")}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title}`}
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium hover:text-accent"
                onClick={() =>
                  capture("project_live_clicked", {
                    project: project.slug,
                    url: project.liveLink,
                  })
                }
              >
                Visit site <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            {gitLinks.map((link) => (
              <a
                key={link}
                href={ensureProtocol(link)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="ml-auto inline-flex size-11 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() =>
                  capture("project_github_clicked", {
                    project: project.slug,
                    url: link,
                  })
                }
              >
                <LuGithub size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Card>
    </article>
  );
};
