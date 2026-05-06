import { Boxes, Brain, Database, Link2, Package, Sparkles, Zap } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { SiDocker, SiNpm } from "react-icons/si";
import { BadgeRow } from "@/components/project/BadgeRow";
import { GroveSetupSection } from "@/components/project/GroveSetupSection";
import { HeroInstall } from "@/components/project/HeroInstall";
import { ProjectPageLayout } from "@/components/project/ProjectPageLayout";
import groveData from "@/data/grove-project.json";

const features = [
  {
    icon: Sparkles,
    title: "MCP-Native",
    description: "Drop-in memory server for OpenCode, Cursor, Claude Desktop, and any MCP-compatible client.",
  },
  {
    icon: Database,
    title: "Semantic Search",
    description: "Qdrant vector database powers lightning-fast similarity search across everything the AI has seen.",
  },
  {
    icon: Boxes,
    title: "Knowledge Graphs",
    description: "Entity-relationship graphs turn flat memories into structured, queryable knowledge.",
  },
  {
    icon: Brain,
    title: "Smart Forgetting",
    description: "Importance scoring keeps critical facts at the surface while noise naturally decays.",
  },
  {
    icon: Link2,
    title: "Reranking",
    description: "Optional cross-encoder reranking boosts retrieval accuracy when precision matters.",
  },
  {
    icon: Zap,
    title: "Local Embeddings",
    description: "ONNX-based models run entirely offline. No API keys, no rate limits, no privacy leaks.",
  },
];

const groveBadges = [
  {
    label: "npm",
    url: "https://www.npmjs.com/package/@miniaxolotl/grove",
    icon: <SiNpm size={12} />,
  },
  {
    label: "OpenCode Plugin",
    url: "https://www.npmjs.com/package/@miniaxolotl/grove-opencode-plugin",
    icon: <Package size={12} />,
  },
  {
    label: "Docker Hub",
    url: "https://hub.docker.com/r/miniaxolotl/grove",
    icon: <SiDocker size={12} />,
  },
  {
    label: "GitHub",
    url: "https://github.com/miniaxolotl/grove",
    icon: <LuGithub size={12} />,
  },
];

const groveInstallTabs = [
  { id: "bun", label: "bun", command: "bun add -g @miniaxolotl/grove" },
  { id: "npm", label: "npm", command: "npm i -g @miniaxolotl/grove" },
  { id: "pnpm", label: "pnpm", command: "pnpm add -g @miniaxolotl/grove" },
];

export const GrovePageClient = () => (
  <ProjectPageLayout
    name={groveData.name}
    tagline={groveData.tagline}
    description={groveData.description}
    badges={<BadgeRow badges={groveBadges} />}
    quickInstall={<HeroInstall tabs={groveInstallTabs} defaultTab="npm" />}
    features={features}
    featureSectionTitle="Features"
    setupContent={<GroveSetupSection />}
    setupSectionTitle="Getting Started"
    hasSidebar={false}
  />
);
