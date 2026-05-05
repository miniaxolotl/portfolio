import { getTagColorClass } from "@/lib/projects";
import { cn } from "@/lib/utils";

interface ProjectTagProps {
  tag: string;
  className?: string;
}

export const ProjectTag = ({ tag, className }: ProjectTagProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border border-current/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
      getTagColorClass(tag),
      className,
    )}
  >
    <span className="h-1 w-1 rounded-full bg-current opacity-40" />
    {tag}
  </span>
);
