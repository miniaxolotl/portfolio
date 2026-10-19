import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const Portfolio = () => (
  <PageShell hasSidebar>
    <About />
    <Projects />
    <Skills />
    <Contact />
  </PageShell>
);

export default Portfolio;
