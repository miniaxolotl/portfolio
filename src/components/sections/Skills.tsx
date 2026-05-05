import { Section } from "@/components/layout/Section";
import { SkillBadge } from "@/components/SkillBadge";
import skills from "@/data/skills.json";

const skillCategories = [
  {
    name: "Languages",
    description: "Type-safe and systems-level development across the stack",
    skills: skills.filter((s) => s.category === "Languages"),
  },
  {
    name: "Frontend",
    description: "Modern frameworks, SSR, and responsive user interfaces",
    skills: skills.filter((s) => s.category === "Frontend"),
  },
  {
    name: "Backend",
    description:
      "API design, service architecture, and server-side development",
    skills: skills.filter((s) => s.category === "Backend"),
  },
  {
    name: "Databases",
    description: "Relational, NoSQL, and vector databases with schema design",
    skills: skills.filter((s) => s.category === "Databases"),
  },
  {
    name: "Cloud & DevOps",
    description: "Infrastructure, containers, and automated deployments",
    skills: skills.filter((s) => s.category === "Cloud & DevOps"),
  },
  {
    name: "Architecture",
    description: "Distributed systems, event-driven design, and SaaS platforms",
    skills: skills.filter((s) => s.category === "Architecture"),
  },
  {
    name: "AI/ML",
    description: "Hardware-accelerated inference, RAG, and computer vision",
    skills: skills.filter((s) => s.category === "AI/ML"),
  },
];

export const Skills = () => {
  return (
    <Section id="skills" title="Skills">
      <div className="space-y-8 sm:space-y-10">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-1">{category.name}</h3>
              <p className="text-xs text-muted-foreground">
                {category.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <SkillBadge key={skill.name} variant={skill.variant}>
                  {skill.name}
                </SkillBadge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
