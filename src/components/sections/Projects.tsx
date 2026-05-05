import { Section } from "@/components/layout/Section";
import { OtherProjectsList } from "@/components/project/OtherProjectsList";
import { ProjectsList } from "@/components/project/ProjectsList";

export const Projects = () => (
  <Section id="projects" title="Projects">
    <div className="space-y-12">
      <ProjectsList />

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Other Projects
        </h3>
        <OtherProjectsList />
      </div>
    </div>
  </Section>
);
