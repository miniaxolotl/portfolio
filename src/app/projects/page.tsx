import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { OtherProjectsList } from "@/components/project/OtherProjectsList";
import { ProjectsList } from "@/components/project/ProjectsList";

const BlogPage = () => (
  <PageShell hasSidebar>
    <Section id="blog" title="Blog">
      <div className="space-y-8">
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
            Technical explorations and deep dives into systems, AI, and full-stack development.
          </p>
          <ProjectsList />
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Other Projects</h3>
          <p className="text-xs text-muted-foreground mb-3">Earlier experiments and educational projects.</p>
          <OtherProjectsList />
        </div>
      </div>
    </Section>
  </PageShell>
);

export default BlogPage;
