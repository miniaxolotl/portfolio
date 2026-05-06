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
      "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
      isActive
        ? "bg-muted text-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    )}
    aria-current={isActive ? "page" : undefined}
  >
    <span
      className={cn(
        "flex items-center justify-center w-8 h-8 rounded-md transition-colors",
        isActive
          ? "bg-background text-foreground"
          : "bg-background text-muted-foreground group-hover:text-foreground",
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
