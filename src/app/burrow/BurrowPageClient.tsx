import { ArrowDownUp, Box, Lock, Network, Shield, Zap } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { SiNpm } from "react-icons/si";
import { BadgeRow } from "@/components/project/BadgeRow";
import { BurrowSetupSection } from "@/components/project/BurrowSetupSection";
import { ProjectPageLayout } from "@/components/project/ProjectPageLayout";
import { TabbedTerminal } from "@/components/project/TabbedTerminal";
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
      "Share an HTTPS URL for your local HTTP app. TLS protects the public connection to the tunnel server.",
  },
  {
    icon: Network,
    title: "Real Webhooks, Local Code",
    description:
      "Send provider test callbacks to your tunnel and inspect the requests while your app runs locally.",
  },
  {
    icon: Zap,
    title: "WebSocket Multiplexing",
    description:
      "Efficient connection reuse keeps latency low and bandwidth minimal across all tunnels.",
  },
  {
    icon: Shield,
    title: "Owner-Scoped Management",
    description:
      "An automatically created owner credential protects your tunnel controls and logs. The shared app URL remains public.",
  },
  {
    icon: Box,
    title: "Your Server, Your Choice",
    description:
      "Use the hosted brmbl.dev server or run your own. Existing tunnel reconnections can retain their URL; new tunnels get a new one.",
  },
];

const burrowBadges = [
  {
    label: "npm",
    url: "https://www.npmjs.com/package/@miniaxolotl/burrowctl",
    icon: <SiNpm size={12} />,
  },
  {
    label: "GitHub",
    url: "https://github.com/miniaxolotl/burrow",
    icon: <LuGithub size={12} />,
  },
];

const burrowInstallTabs = [
  { id: "bun", label: "bun", code: "bun add -g @miniaxolotl/burrowctl" },
  { id: "npm", label: "npm", code: "npm i -g @miniaxolotl/burrowctl" },
  { id: "pnpm", label: "pnpm", code: "pnpm add -g @miniaxolotl/burrowctl" },
];

export const BurrowPageClient = () => (
  <ProjectPageLayout
    projectSlug="burrow"
    name={burrowData.name}
    tagline={burrowData.tagline}
    description={burrowData.description}
    badges={<BadgeRow badges={burrowBadges} />}
    quickInstall={<TabbedTerminal tabs={burrowInstallTabs} defaultTab="npm" />}
    features={features}
    featureSectionTitle="Features"
    setupContent={<BurrowSetupSection />}
    setupSectionTitle="Getting Started"
    hasSidebar={false}
  />
);
