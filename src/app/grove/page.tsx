import type { Metadata } from "next";
import { GrovePageClient } from "./GrovePageClient";

export const metadata: Metadata = {
  title: "Grove — Private agent memory | Elias Mawa",
  description:
    "Private AI-agent memory with PostgreSQL, pgvector, and four focused MCP tools. Hosted or self-hosted.",
  alternates: { canonical: "/grove" },
};

const GrovePage = () => <GrovePageClient />;

export default GrovePage;
