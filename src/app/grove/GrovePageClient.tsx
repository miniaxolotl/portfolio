import {
  Boxes,
  Brain,
  Database,
  Link2,
  Package,
  Sparkles,
  Zap,
} from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { SiNpm } from "react-icons/si";
import { BadgeRow } from "@/components/project/BadgeRow";
import { GroveSetupSection } from "@/components/project/GroveSetupSection";
import { ProjectPageLayout } from "@/components/project/ProjectPageLayout";
import { TabbedTerminal } from "@/components/project/TabbedTerminal";
import groveData from "@/data/grove-project.json";

const features = [
  {
    icon: Sparkles,
    title: "MCP-Native",
    description:
      "Four focused tools: remember, recall, memories, and forget. Integrations for OpenCode, Claude Code, and Codex.",
  },
  {
    icon: Database,
    title: "Semantic Search",
    description:
      "Semantic and full-text search work together in PostgreSQL with pgvector and local embeddings.",
  },
  {
    icon: Boxes,
    title: "One Private Library",
    description:
      "Browse, correct, and organize memories in the website. Your agents and dashboard use the same authenticated API.",
  },
  {
    icon: Brain,
    title: "An Explicit Lifecycle",
    description:
      "Keep durable memories until you change them, expire short handoffs, or archive memories reversibly.",
  },
  {
    icon: Link2,
    title: "Scoped Connections",
    description:
      "Approve an agent's access, scope its memories, and revoke the connection. Account ownership is enforced with row-level security.",
  },
  {
    icon: Zap,
    title: "Local Embeddings",
    description:
      "Embedding models run alongside your service. Lexical retrieval stays available while semantic indexing catches up.",
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
    label: "GitHub",
    url: "https://github.com/miniaxolotl/grove",
    icon: <LuGithub size={12} />,
  },
];

const groveInstallTabs = [
  { id: "bun", label: "bun", code: "bun add -g @miniaxolotl/grove" },
  { id: "npm", label: "npm", code: "npm i -g @miniaxolotl/grove" },
  { id: "pnpm", label: "pnpm", code: "pnpm add -g @miniaxolotl/grove" },
];

export const GrovePageClient = () => (
  <ProjectPageLayout
    projectSlug="grove"
    name={groveData.name}
    tagline={groveData.tagline}
    description={groveData.description}
    badges={<BadgeRow badges={groveBadges} />}
    quickInstall={<TabbedTerminal tabs={groveInstallTabs} defaultTab="npm" />}
    features={features}
    featureSectionTitle="Features"
    setupContent={<GroveSetupSection />}
    setupSectionTitle="Getting Started"
    hasSidebar={false}
  />
);
