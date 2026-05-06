import { PageShell } from "@/components/layout/PageShell";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

const Portfolio = () => (
  <PageShell hasSidebar>
    <About />
    <Skills />
    <Projects />
  </PageShell>
);

export default Portfolio;
