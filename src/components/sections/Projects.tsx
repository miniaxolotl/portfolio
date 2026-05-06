import { Section } from "@/components/layout/Section";
import { OtherProjectsList } from "@/components/project/OtherProjectsList";
import { ProjectsList } from "@/components/project/ProjectsList";

export const Projects = () => (
  <Section id="projects" title="Projects">
    <div className="space-y-14">
      <ProjectsList />

      <div className="space-y-6">
        <div className="flex items-baseline gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Other Projects
          </h3>
          <div className="flex-1 h-px bg-border/30" />
        </div>
        <OtherProjectsList />
      </div>
    </div>
  </Section>
);
