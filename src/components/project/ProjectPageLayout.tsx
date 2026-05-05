"use client";

import type { LucideIcon } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { CompactFeatureCard } from "@/components/project/CompactFeatureCard";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProjectPageLayoutProps {
  name: string;
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
}: ProjectPageLayoutProps) => (
  <PageShell hasSidebar={hasSidebar}>
    <div className="px-4 py-10 sm:px-6 sm:py-16 md:py-28 md:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <div className="mb-16 md:mb-20 text-center">
          {badges && <div className="mb-5 flex justify-center">{badges}</div>}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5">
            {name}
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-6 max-w-2xl mx-auto">
            {tagline}
          </p>

          <p className="text-base leading-relaxed mb-8 max-w-2xl mx-auto text-muted-foreground/80">
            {description}
          </p>

          {quickInstall && (
            <div className="mb-6 flex justify-center">{quickInstall}</div>
          )}
        </div>

        {/* Features */}
        {features && features.length > 0 && (
          <section className="mb-16 md:mb-20">
            <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center">
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
            <h2 className="text-xl sm:text-2xl font-bold mb-8 text-center">
              {setupSectionTitle}
            </h2>
            <div className="space-y-6">{setupContent}</div>
          </section>
        )}
      </div>
    </div>
  </PageShell>
);
