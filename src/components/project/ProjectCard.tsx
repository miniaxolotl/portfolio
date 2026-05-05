import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import { ProjectTag } from "@/components/project/ProjectTag";
import { getProjectHref } from "@/lib/projects";
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
    <div className="group flex flex-col gap-3 p-4 sm:p-5 rounded-xl bg-card transition-colors hover:bg-accent/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <h3 className="text-base font-semibold tracking-tight">
            {project.title}
          </h3>
          {project.year && (
            <span className="text-xs text-muted-foreground font-mono shrink-0">
              {project.year}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {gitLinks.map((link) => (
            <a
              key={link}
              href={ensureProtocol(link)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              aria-label={`View ${project.title} on GitHub`}
            >
              <LuGithub size={16} />
            </a>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <ProjectTag key={tag} tag={tag} />
        ))}
      </div>

      <div className="pt-1">
        <Link
          href={href}
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Read more
          <span className="ml-1 transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};
