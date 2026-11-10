import { Braces, Layers3, Workflow } from "lucide-react";
import { Section } from "@/components/layout/Section";

const capabilities = [
  {
    icon: Layers3,
    title: "The whole product",
    description:
      "Interfaces that feel considered, backed by a clear understanding of the people using them. Web and mobile, from interaction to implementation.",
    tools: "React · Next.js · Flutter · TypeScript",
  },
  {
    icon: Braces,
    title: "The systems underneath",
    description:
      "APIs, background jobs, and data models that hold up beyond the happy path. A practical approach to AI, search, and real-time workflows.",
    tools: "Go · Node.js · PostgreSQL · Redis · pgvector",
  },
  {
    icon: Workflow,
    title: "The path to production",
    description:
      "Taking ownership of delivery: reliable releases, observable services, and migrations that keep things moving. Helping the team build with confidence.",
    tools: "Docker · AWS · Vercel · CI/CD · OpenTelemetry",
  },
];

export const Skills = () => (
  <Section
    id="skills"
    eyebrow="02 / Skills & approach"
    title="From the interface to the infrastructure."
    className="border-t border-border"
  >
    <div className="divide-y divide-border">
      {capabilities.map(({ icon: Icon, title, description, tools }) => (
        <div
          key={title}
          className="grid gap-3 py-7 first:pt-2 sm:grid-cols-[1fr_1.5fr] sm:gap-8"
        >
          <h3 className="flex items-start gap-3 text-base font-medium">
            <Icon size={20} className="mt-0.5 text-accent" aria-hidden="true" />
            {title}
          </h3>
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-foreground">
              {tools}
            </p>
          </div>
        </div>
      ))}
    </div>
  </Section>
);
