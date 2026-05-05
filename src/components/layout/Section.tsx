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
    className={cn(
      "px-4 py-12 sm:px-6 sm:py-16 md:py-28 md:px-8 lg:px-12",
      className,
    )}
  >
    <div className="max-w-4xl mx-auto">
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  </section>
);
