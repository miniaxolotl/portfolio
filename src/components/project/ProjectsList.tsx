import { ProjectCard } from "@/components/project/ProjectCard";
import projects from "@/data/projects.json";

export const ProjectsList = () => {
  const featured = projects.filter((p) => p.featured);
  return (
    <div className="flex flex-col gap-3">
      {featured.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
};
