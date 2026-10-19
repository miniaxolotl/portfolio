import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import profile from "@/data/profile.json";

export const About = () => (
  <section
    id="about"
    aria-labelledby="intro-heading"
    className="px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 xl:px-14"
  >
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="section-kicker">Elias Mawa / Engineer & maker</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin size={13} aria-hidden="true" />
          {profile.location}
        </span>
      </div>
      <h1 id="intro-heading" className="hero-heading font-serif">
        Thoughtful software.
        <br />
        <em className="text-accent">Built for real life.</em>
      </h1>
      <p className="mt-7 max-w-xl text-base leading-[1.8] text-muted-foreground sm:text-lg">
        {profile.summary}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/#projects" className={buttonVariants()}>
          Explore my work <ArrowDown aria-hidden="true" />
        </Link>
        <a
          href={`mailto:${profile.email}`}
          className={buttonVariants({ variant: "outline" })}
        >
          Let’s talk <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
        <span className="section-kicker">Currently building</span>
        <a
          className="inline-flex min-h-8 items-center gap-1.5 hover:text-foreground"
          href="https://bramblelabs.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bramble Labs <ArrowUpRight size={12} aria-hidden="true" />
        </a>
        <span aria-hidden="true">/</span>
        <a
          className="inline-flex min-h-8 items-center gap-1.5 hover:text-foreground"
          href="https://fitr.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fitr <ArrowUpRight size={12} aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
);
