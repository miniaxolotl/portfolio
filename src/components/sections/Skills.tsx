import { Section } from "@/components/layout/Section";
import { SkillBadge } from "@/components/SkillBadge";
import skills from "@/data/skills.json";

const skillCategories = [
  {
    name: "Languages",
    skills: skills.filter((s) => s.category === "Languages"),
  },
  { name: "Frontend", skills: skills.filter((s) => s.category === "Frontend") },
  { name: "Backend", skills: skills.filter((s) => s.category === "Backend") },
  {
    name: "Databases",
    skills: skills.filter((s) => s.category === "Databases"),
  },
  {
    name: "Cloud & DevOps",
    skills: skills.filter((s) => s.category === "Cloud & DevOps"),
  },
];

export const Skills = () => {
  return (
    <Section id="skills" title="Skills">
      <div className="space-y-8">
        {skillCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-4">
              {category.name}
            </h3>
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
