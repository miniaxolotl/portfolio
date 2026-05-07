import { Section } from "@/components/layout/Section";
import profile from "@/data/profile.json";

export const About = () => (
  <Section id="about" title="About Me">
    <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
      {profile.summary}
    </p>
  </Section>
);
