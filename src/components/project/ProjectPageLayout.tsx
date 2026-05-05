"use client";

import { PageShell } from "@/components/layout/PageShell";
import { PackageInstall } from "@/components/project/PackageInstall";
import { ProjectTag } from "@/components/project/ProjectTag";

interface ProjectPageLayoutProps {
  name: string;
  tagline: string;
  description: string;
  npmPackage?: string | null;
  dockerImage?: string;
  installCommands?: Record<string, string>;
  tags?: string[];
  sectionTitle: string;
  children?: React.ReactNode;
}

export const ProjectPageLayout = ({
  name,
  tagline,
  description,
  npmPackage,
  dockerImage,
  installCommands,
  tags,
  sectionTitle,
  children,
}: ProjectPageLayoutProps) => (
  <PageShell>
    <div className="px-4 py-10 sm:px-6 sm:py-16 md:py-28 md:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags?.map((tag) => (
              <ProjectTag key={tag} tag={tag} />
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {name}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
            {tagline}
          </p>
          <p className="text-base leading-relaxed mb-10 max-w-2xl">
            {description}
          </p>
          <PackageInstall
            npmPackage={npmPackage}
            dockerImage={dockerImage}
            commands={installCommands}
          />
        </div>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-8">{sectionTitle}</h2>
          {children}
        </section>
      </div>
    </div>
  </PageShell>
);
