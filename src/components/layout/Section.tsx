import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  titleClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const Section = ({
  id,
  title,
  titleClassName,
  className,
  children,
}: SectionProps) => (
  <section
    id={id}
    className={cn("px-8 py-20 md:py-28 md:px-16 lg:px-24", className)}
  >
    <div className="max-w-4xl">
      <h2
        className={cn("text-3xl md:text-4xl font-bold mb-10", titleClassName)}
      >
        {title}
      </h2>
      {children}
    </div>
  </section>
);
