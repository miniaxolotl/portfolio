import { ArrowUpRight, Download } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import profile from "@/data/profile.json";

export const Contact = () => (
  <Section
    id="contact"
    eyebrow="A conversation is a good start"
    title="Have something in mind?"
    className="border-t border-border bg-card/50"
  >
    <p className="max-w-lg text-muted-foreground leading-relaxed">
      A product to build, a tricky engineering problem, or just a shared
      curiosity. I’d love to hear about it.
    </p>
    <div className="mt-7 flex flex-wrap gap-3">
      <a href={`mailto:${profile.email}`} className={buttonVariants()}>
        {profile.email}
        <ArrowUpRight aria-hidden="true" />
      </a>
      <a
        href="/mawa-2026-05-v2c.pdf"
        download
        className={buttonVariants({ variant: "outline" })}
      >
        Download resume
        <Download aria-hidden="true" />
      </a>
    </div>
  </Section>
);
