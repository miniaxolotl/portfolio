import { Section } from "@/components/layout/Section";

const summary = `Experienced Full-Stack Developer with 5+ years of experience specialized in scalable SaaS and financial infrastructure. Deep experience in system design, API architecture, and DevOps backed by strong skills in Go, React, Next.js, and TypeScript.`;

export const About = () => {
  return (
    <Section id="about" title="About Me" titleClassName="mb-6">
      <p className="text-lg leading-relaxed max-w-2xl">{summary}</p>
    </Section>
  );
};
