"use client";

import { Box, Container, Network, Shield, Zap } from "lucide-react";
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

const BurrowPage = () => (
  <ProjectPageLayout
    name={burrowData.name}
    tagline={burrowData.tagline}
    description={burrowData.description}
    npmPackage={burrowData.npm}
    dockerImage={burrowData.docker}
    features={features}
    sectionTitle="Why Burrow?"
  />
);

export default BurrowPage;
