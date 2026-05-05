import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarNavLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
}

export const SidebarNavLink = ({
  href,
  label,
  icon: Icon,
  isActive,
  onClick,
}: SidebarNavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={cn(
      "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium",
      isActive
        ? "bg-accent/10 text-accent-foreground"
        : "text-foreground hover:bg-accent/5 hover:text-foreground",
    )}
    aria-current={isActive ? "true" : undefined}
  >
    <span
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200",
        isActive
          ? "bg-accent/15 text-accent-foreground"
          : "bg-muted/60 text-muted-foreground group-hover:bg-accent/10 group-hover:text-foreground",
      )}
    >
      <Icon size={16} />
    </span>
    <span>{label}</span>
    {isActive && (
      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
    )}
  </Link>
);
