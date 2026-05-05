"use client";

import { ArrowDownUp, Box, Lock, Network, Shield, Zap } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { SiDocker, SiNpm } from "react-icons/si";
import { BadgeRow } from "@/components/project/BadgeRow";
import { BurrowSetupSection } from "@/components/project/BurrowSetupSection";
import { HeroInstall } from "@/components/project/HeroInstall";
import { ProjectPageLayout } from "@/components/project/ProjectPageLayout";
import burrowData from "@/data/burrow-project.json";

const features = [
  {
    icon: ArrowDownUp,
    title: "Public URLs in Seconds",
    description:
      "Turn localhost into a public HTTPS URL with one command. No config, no signup.",
  },
  {
    icon: Lock,
    title: "TLS Out of the Box",
    description:
      "Automatic Let's Encrypt certificates for every subdomain. Your traffic is encrypted end-to-end.",
  },
  {
    icon: Network,
    title: "More Than HTTP",
    description:
      "Expose databases, SSH, game servers, or any TCP service through the same tunnel.",
  },
  {
    icon: Zap,
    title: "WebSocket Multiplexing",
    description:
      "Efficient connection reuse keeps latency low and bandwidth minimal across all tunnels.",
  },
  {
    icon: Shield,
    title: "Token-Based Auth",
    description:
      "Built-in admin tokens and team authentication. Control who can open tunnels on your server.",
  },
  {
    icon: Box,
    title: "Survives Restarts",
    description:
      "Redis-backed state means tunnels persist across server reboots without reconfiguration.",
  },
];

const burrowBadges = [
  {
    label: "npm",
    url: "https://www.npmjs.com/package/@miniaxolotl/burrowctl",
    icon: <SiNpm size={12} />,
  },
  {
    label: "Docker Hub",
    url: "https://hub.docker.com/r/miniaxolotl/burrowd",
    icon: <SiDocker size={12} />,
  },
  {
    label: "GitHub",
    url: "https://github.com/miniaxolotl/burrow",
    icon: <LuGithub size={12} />,
  },
];

const burrowInstallTabs = [
  { id: "bun", label: "bun", command: "bun add -g @miniaxolotl/burrowctl" },
  { id: "npm", label: "npm", command: "npm i -g @miniaxolotl/burrowctl" },
  { id: "pnpm", label: "pnpm", command: "pnpm add -g @miniaxolotl/burrowctl" },
];

export const BurrowPageClient = () => (
  <ProjectPageLayout
    name={burrowData.name}
    tagline={burrowData.tagline}
    description={burrowData.description}
    badges={<BadgeRow badges={burrowBadges} />}
    quickInstall={<HeroInstall tabs={burrowInstallTabs} defaultTab="npm" />}
    features={features}
    featureSectionTitle="Features"
    setupContent={<BurrowSetupSection />}
    setupSectionTitle="Getting Started"
    hasSidebar={false}
  />
);
