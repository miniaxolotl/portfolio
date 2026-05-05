"use client";

import { Boxes, Brain, Database, Link2, Sparkles } from "lucide-react";
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

const GrovePage = () => (
  <ProjectPageLayout
    name={groveData.name}
    tagline={groveData.tagline}
    description={groveData.description}
    npmPackage={groveData.npm}
    dockerImage={groveData.docker}
    features={features}
    sectionTitle="Why Grove?"
  />
);

export default GrovePage;
