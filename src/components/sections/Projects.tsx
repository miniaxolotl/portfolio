import { Section } from "@/components/layout/Section";
import { OtherProjectsList } from "@/components/project/OtherProjectsList";
import { ProjectsList } from "@/components/project/ProjectsList";
import { Studio } from "@/components/project/Studio";

export const Projects = () => (
  <Section
    id="projects"
    eyebrow="01 / Selected work"
    title="Things I’m putting into the world."
    description="Personal products, shared ventures, and useful little tools. The engineering and the experience, considered together."
    className="border-t border-border"
  >
    <div className="space-y-10">
      <ProjectsList />
      <Studio />

      <div className="space-y-6">
        <div className="flex items-baseline gap-3">
          <h3 className="section-kicker">The archive / Earlier explorations</h3>
          <div className="flex-1 h-px bg-border/30" />
        </div>
        <OtherProjectsList />
      </div>
    </div>
  </Section>
);
