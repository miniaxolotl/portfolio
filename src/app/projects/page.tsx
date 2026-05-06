import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { OtherProjectsList } from "@/components/project/OtherProjectsList";
import { ProjectsList } from "@/components/project/ProjectsList";

const BlogPage = () => (
  <PageShell hasSidebar>
    <Section id="blog" title="Blog">
      <div className="space-y-14">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Technical explorations and deep dives into systems, AI, and
            full-stack development.
          </p>
          <ProjectsList />
        </div>

        <div className="space-y-6">
          <div className="flex items-baseline gap-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Other Projects
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Earlier experiments and educational projects.
              </p>
            </div>
            <div className="flex-1 h-px bg-border/30" />
          </div>
          <OtherProjectsList />
        </div>
      </div>
    </Section>
  </PageShell>
);

export default BlogPage;
