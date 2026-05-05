import type { LucideIcon } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PackageInstall } from "@/components/project/PackageInstall";
import { CompactFeatureCard } from "./CompactFeatureCard";

interface ProjectFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProjectPageLayoutProps {
  name: string;
  tagline: string;
  description: string;
  npmPackage?: string | null;
  dockerImage?: string;
  features: ProjectFeature[];
  sectionTitle: string;
}

export const ProjectPageLayout = ({
  name,
  tagline,
  description,
  npmPackage,
  dockerImage,
  features,
  sectionTitle,
}: ProjectPageLayoutProps) => (
  <div className="min-h-screen">
    <Header />
    <main id="main-content" className="pt-14 md:pt-14" tabIndex={-1}>
      <div className="px-8 py-20 md:py-28 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{tagline}</p>
            <p className="text-base leading-relaxed mb-10 max-w-2xl">
              {description}
            </p>
            <PackageInstall npmPackage={npmPackage} dockerImage={dockerImage} />
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-8">{sectionTitle}</h2>
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
        </div>
      </div>
      <Footer />
    </main>
  </div>
);
