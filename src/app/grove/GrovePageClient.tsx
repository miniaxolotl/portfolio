"use client";

import { Boxes, Brain, Database, Link2, Sparkles } from "lucide-react";
import { CompactFeatureCard } from "@/components/project/CompactFeatureCard";
import { ProjectPageLayout } from "@/components/project/ProjectPageLayout";
import groveData from "@/data/grove-project.json";

const features = [
  {
    icon: Sparkles,
    title: "MCP-compatible",
    description: "Works with OpenCode, Cursor, and any MCP client.",
  },
  {
    icon: Database,
    title: "Semantic Search",
    description: "Qdrant-powered vector search across all your memories.",
  },
  {
    icon: Boxes,
    title: "Knowledge Graphs",
    description: "Structured entity relations for deeper understanding.",
  },
  {
    icon: Brain,
    title: "Importance-based",
    description: "Key facts stay accessible, noise fades away.",
  },
  {
    icon: Link2,
    title: "Reranking",
    description: "Better relevance with optional reranking.",
  },
];

export const GrovePageClient = () => (
  <ProjectPageLayout
    name={groveData.name}
    tagline={groveData.tagline}
    description={groveData.description}
    client={
      groveData.client ? { ...groveData.client, label: "Client" } : undefined
    }
    server={
      groveData.server ? { ...groveData.server, label: "Server" } : undefined
    }
    links={groveData.links}
    tags={groveData.techStack}
    sectionTitle="Why Grove?"
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
