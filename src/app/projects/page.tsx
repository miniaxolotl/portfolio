import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/layout/Section";
import { OtherProjectsList } from "@/components/project/OtherProjectsList";
import { ProjectsList } from "@/components/project/ProjectsList";
import { Studio } from "@/components/project/Studio";
import { blogEnabled } from "@/lib/projects";

export const generateMetadata = (): Metadata => {
  if (!blogEnabled) notFound();
  return {
    title: "Projects & writing | Elias Mawa",
    description:
      "Engineering notes and stories behind Fern, Grove, Fitr, Burrow, and earlier experiments.",
    alternates: { canonical: "/projects" },
  };
};

const BlogPage = () => {
  if (!blogEnabled) notFound();
  return (
    <PageShell hasSidebar>
      <Section
        id="blog"
        title="Projects & writing"
        headingLevel="h1"
        eyebrow="The work, and the thinking behind it"
      >
        <div className="space-y-14">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Technical explorations and deep dives into systems, AI, and
              full-stack development.
            </p>
            <ProjectsList />
            <Studio />
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
};

export default BlogPage;
