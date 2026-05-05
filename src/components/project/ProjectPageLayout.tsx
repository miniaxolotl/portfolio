"use client";

import { ExternalLink, Package } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { PageShell } from "@/components/layout/PageShell";
import { PackageInstall } from "@/components/project/PackageInstall";
import { ProjectTag } from "@/components/project/ProjectTag";

interface InstallConfig {
  npmPackage?: string | null;
  dockerImage?: string;
  commands?: Record<string, string>;
  label: string;
}

interface ProjectLink {
  label: string;
  url: string;
}

const LinkIcon = ({ label }: { label: string }) => {
  if (label === "GitHub") return <LuGithub size={14} />;
  if (label === "npm" || label === "OpenCode Plugin")
    return <Package size={14} />;
  return <ExternalLink size={12} />;
};

interface ProjectPageLayoutProps {
  name: string;
  tagline: string;
  description: string;
  client?: InstallConfig;
  server?: InstallConfig;
  installContent?: React.ReactNode;
  links?: ProjectLink[];
  tags?: string[];
  sectionTitle: string;
  children?: React.ReactNode;
}

export const ProjectPageLayout = ({
  name,
  tagline,
  description,
  client,
  server,
  installContent,
  links,
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

          {installContent ? (
            <div className="space-y-6">{installContent}</div>
          ) : (
            <div className="space-y-6">
              {client && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {client.label}
                    </span>
                  </div>
                  <PackageInstall
                    npmPackage={client.npmPackage}
                    dockerImage={client.dockerImage}
                    commands={client.commands}
                  />
                </div>
              )}
              {server && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {server.label}
                    </span>
                  </div>
                  <PackageInstall
                    npmPackage={server.npmPackage}
                    dockerImage={server.dockerImage}
                    commands={server.commands}
                  />
                </div>
              )}
            </div>
          )}

          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
                >
                  <LinkIcon label={link.label} />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-8">{sectionTitle}</h2>
          {children}
        </section>
      </div>
    </div>
  </PageShell>
);
