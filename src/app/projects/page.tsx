import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { ProjectsList } from "@/components/project/ProjectsList";

const ProjectsPage = () => (
  <PageShell>
    <Section id="projects" title="Projects">
      <ProjectsList />
    </Section>
  </PageShell>
);

export default ProjectsPage;
