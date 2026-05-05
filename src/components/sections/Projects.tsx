import { ExternalLink } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { Section } from "@/components/layout/Section";
import { ProjectLink } from "@/components/project/ProjectLink";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import projects from "@/data/projects.json";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const gitLinks = Array.isArray(project.gitLink)
    ? project.gitLink
    : project.gitLink
      ? [project.gitLink]
      : [];

  return (
    <Card variant="filled">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm leading-relaxed mb-3">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-4">
        {project.liveLink && (
          <ProjectLink
            href={project.liveLink}
            icon={ExternalLink}
            label="Live Demo"
          />
        )}
        {gitLinks.map((link) => (
          <ProjectLink key={link} href={link} icon={LuGithub} label="GitHub" />
        ))}
      </CardFooter>
    </Card>
  );
};

export const Projects = () => {
  return (
    <Section id="projects" title="Projects">
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
};
