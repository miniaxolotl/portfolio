import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { CompactFeatureCard } from "@/components/project/CompactFeatureCard";
import { buttonVariants } from "@/components/ui/button";
import projects from "@/data/projects.json";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProjectPageLayoutProps {
  name: string;
  projectSlug: string;
  tagline: string;
  description: string;
  badges?: React.ReactNode;
  quickInstall?: React.ReactNode;
  features?: Feature[];
  featureSectionTitle?: string;
  setupContent?: React.ReactNode;
  setupSectionTitle?: string;
  hasSidebar?: boolean;
  children?: React.ReactNode;
}

export const ProjectPageLayout = ({
  name,
  projectSlug,
  tagline,
  description,
  badges,
  quickInstall,
  features,
  featureSectionTitle = "Features",
  setupContent,
  setupSectionTitle = "Getting Started",
  hasSidebar = true,
  children,
}: ProjectPageLayoutProps) => {
  const project = projects.find((item) => item.slug === projectSlug);
  return (
    <PageShell hasSidebar={hasSidebar}>
      <div className="px-4 py-8 sm:px-6 sm:py-12 md:py-16 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="mb-10 md:mb-14 text-center">
            {project?.logo && (
              <Image
                src={project.logo}
                alt=""
                width={80}
                height={80}
                className="mx-auto mb-6 rounded-2xl"
              />
            )}
            {badges && <div className="mb-5 flex justify-center">{badges}</div>}

            <h1 className="text-5xl sm:text-6xl font-serif tracking-tight mb-5">
              {name}
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
              {tagline}
            </p>

            <p className="text-base leading-relaxed mb-8 max-w-2xl mx-auto text-muted-foreground">
              {description}
            </p>

            {quickInstall && (
              <div className="mb-6 [&>div]:w-full">{quickInstall}</div>
            )}
            <div className="flex flex-wrap justify-center gap-3">
              {project?.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants()}
                >
                  Visit {name} <span aria-hidden="true">↗</span>
                </a>
              )}
              <Link
                href={`/projects/${projectSlug}`}
                className={buttonVariants({ variant: "outline" })}
              >
                Read the project story
              </Link>
            </div>
            {project?.banner && (
              <Image
                src={project.banner}
                alt={project.bannerAlt ?? ""}
                width={1200}
                height={628}
                sizes="(min-width: 768px) 768px, 100vw"
                className="mt-8 w-full rounded-2xl"
              />
            )}
          </div>

          {/* Features */}
          {features && features.length > 0 && (
            <section className="mb-10 md:mb-14">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                {featureSectionTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <CompactFeatureCard
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Custom sections */}
          {children}

          {/* Setup */}
          {setupContent && (
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                {setupSectionTitle}
              </h2>
              <div className="space-y-6">{setupContent}</div>
            </section>
          )}
        </div>
      </div>
    </PageShell>
  );
};
