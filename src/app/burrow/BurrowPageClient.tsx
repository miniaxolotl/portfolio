"use client";

import { Box, Container, Network, Shield, Zap } from "lucide-react";
import { CompactFeatureCard } from "@/components/project/CompactFeatureCard";
import { ProjectPageLayout } from "@/components/project/ProjectPageLayout";
import burrowData from "@/data/burrow-project.json";

const features = [
  {
    icon: Shield,
    title: "Self-hosted",
    description:
      "Full control. No third-party dependencies or subscription fees.",
  },
  {
    icon: Network,
    title: "HTTPS Subdomains",
    description: "Automatic TLS certificates via Let's Encrypt.",
  },
  {
    icon: Container,
    title: "TCP Tunnels",
    description: "Expose databases, SSH, and any TCP service.",
  },
  {
    icon: Zap,
    title: "WebSocket Multiplexing",
    description: "Low latency, efficient bandwidth across all tunnels.",
  },
  {
    icon: Box,
    title: "Redis Persistence",
    description: "Tunnels survive server restarts seamlessly.",
  },
];

export const BurrowPageClient = () => (
  <ProjectPageLayout
    name={burrowData.name}
    tagline={burrowData.tagline}
    description={burrowData.description}
    client={
      burrowData.client ? { ...burrowData.client, label: "Client" } : undefined
    }
    server={
      burrowData.server ? { ...burrowData.server, label: "Server" } : undefined
    }
    links={burrowData.links}
    tags={burrowData.techStack}
    sectionTitle="Why Burrow?"
  >
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
  </ProjectPageLayout>
);
