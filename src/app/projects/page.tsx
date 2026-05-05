import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { OtherProjectsList } from "@/components/project/OtherProjectsList";
import { ProjectsList } from "@/components/project/ProjectsList";

const ProjectsPage = () => (
  <PageShell hasSidebar>
    <Section id="projects" title="Projects">
      <div className="space-y-12">
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            Selected work across systems programming, distributed services, and full-stack development.
          </p>
          <ProjectsList />
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Other Projects</h3>
          <p className="text-xs text-muted-foreground mb-4">Earlier experiments and learning projects.</p>
          <OtherProjectsList />
        </div>
      </div>
    </Section>
  </PageShell>
);

export default ProjectsPage;
