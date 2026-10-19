import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  titleClassName?: string;
  className?: string;
  eyebrow?: string;
  description?: string;
  headingLevel?: "h1" | "h2";
  children: React.ReactNode;
}

export const Section = ({
  id,
  title,
  titleClassName,
  className,
  eyebrow,
  description,
  headingLevel: Heading = "h2",
  children,
}: SectionProps) => (
  <section
    id={id}
    className={cn(
      "scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16 lg:px-10 xl:px-14",
      className,
    )}
  >
    <div className="max-w-5xl mx-auto">
      {eyebrow && <p className="section-kicker mb-4">{eyebrow}</p>}
      <Heading
        className={cn(
          "font-serif text-4xl sm:text-5xl tracking-tight mb-6",
          titleClassName,
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  </section>
);
