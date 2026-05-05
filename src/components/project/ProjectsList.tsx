import { ProjectCard } from "@/components/project/ProjectCard";
import projects from "@/data/projects.json";

export const ProjectsList = () => (
  <div className="flex flex-col gap-3">
    {projects.map((project) => (
      <ProjectCard key={project.slug} project={project} />
    ))}
  </div>
);
