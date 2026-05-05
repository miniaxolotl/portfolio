import Image from "next/image";
import { Section } from "@/components/layout/Section";
import profile from "@/data/profile.json";

export const About = () => (
  <Section id="about" title="About Me">
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
      <div className="shrink-0 mx-auto md:mx-0">
        <div className="relative w-36 sm:w-48 md:w-60 aspect-[3/4]">
          <Image
            src="/img/me/english-bay-solo.jpg"
            alt="Elias Mawa"
            fill
            className="rounded-xl object-cover shadow-sm"
            priority
            sizes="(max-width: 640px) 9rem, (max-width: 768px) 12rem, 15rem"
          />
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed text-center md:text-left">
        {profile.summary}
      </p>
    </div>
  </Section>
);
