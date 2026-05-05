import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  children: React.ReactNode;
  variant?: string;
}

export const SkillBadge = ({
  children,
  variant = "muted_olive",
}: SkillBadgeProps) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-sm font-medium rounded-full",
        variant === "muted_olive" &&
          "bg-muted-olive/15 text-foreground border border-muted-olive/30",
        variant === "faded_copper" &&
          "bg-faded-copper/15 text-foreground border border-faded-copper/30",
        variant === "ash_brown" &&
          "bg-ash-brown/15 text-foreground border border-ash-brown/30",
        variant === "vanilla_cream" &&
          "bg-vanilla-cream/15 text-foreground border border-vanilla-cream/30",
      )}
    >
      {children}
    </span>
  );
};
