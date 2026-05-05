import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  children: React.ReactNode;
  variant?: string;
}

const badgeStyles: Record<string, string> = {
  muted_olive: "bg-[var(--badge-olive-bg)] text-[var(--badge-olive-text)]",
  faded_copper: "bg-[var(--badge-copper-bg)] text-[var(--badge-copper-text)]",
  ash_brown: "bg-[var(--badge-brown-bg)] text-[var(--badge-brown-text)]",
  vanilla_cream: "bg-[var(--badge-cream-bg)] text-[var(--badge-cream-text)]",
};

export const SkillBadge = ({
  children,
  variant = "muted_olive",
}: SkillBadgeProps) => (
  <span
    className={cn(
      "px-2.5 py-1 text-xs font-medium rounded-md",
      badgeStyles[variant] || badgeStyles.muted_olive,
    )}
  >
    {children}
  </span>
);
