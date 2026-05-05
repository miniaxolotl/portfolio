"use client";

import {
  ArrowDownUp,
  Download,
  FolderOpen,
  Home,
  Moon,
  Sun,
  TreePine,
  X,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DiscordCopyButton } from "@/components/layout/DiscordCopyButton";
import { ProfileSection } from "@/components/layout/ProfileSection";
import { SidebarNavLink } from "@/components/layout/SidebarNavLink";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { DrawerClose } from "@/components/ui/drawer";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navLinks, sectionIds } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { themeStore } from "@/stores";

interface MobileSidebarProps {
  onNavigate?: () => void;
}

const pageNavItems = [
  { href: "/", label: "Portfolio", icon: Home },
  { href: "/burrow", label: "Burrow", icon: ArrowDownUp },
  { href: "/grove", label: "Grove", icon: TreePine },
  { href: "/projects", label: "Blog", icon: FolderOpen },
];

export const MobileSidebar = observer(({ onNavigate }: MobileSidebarProps) => {
  const pathname = usePathname();
  const activeSection = useActiveSection(sectionIds);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="flex flex-col h-full"
      role="dialog"
      aria-label="Mobile navigation"
    >
      <div
        className="flex-1 overflow-y-auto overscroll-y-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Profile Header */}
        <div className="relative px-6 pt-6 pb-4">
          <DrawerClose className="absolute top-4 right-4 inline-flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <X size={16} aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </DrawerClose>

          <div className="flex flex-col items-center pt-2">
            <Link
              href="/"
              onClick={onNavigate}
              className="flex flex-col items-center gap-1"
            >
              <ProfileSection imageSize={80} />
            </Link>
          </div>
        </div>

        {/* Pages */}
        <div className="px-4 py-2">
          <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-2 px-2">
            Pages
          </p>
          <nav className="flex flex-col gap-0.5" aria-label="Pages">
            {pageNavItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
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
                    <item.icon size={16} />
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sections (home page only) */}
        {pathname === "/" && (
          <div className="px-4 py-2">
            <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-2 px-2">
              On this page
            </p>
            <nav className="flex flex-col gap-0.5" aria-label="Page sections">
              {navLinks.map((link) => (
                <SidebarNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  isActive={activeSection === link.href.replace("/#", "")}
                  onClick={onNavigate}
                />
              ))}
            </nav>
          </div>
        )}

        {/* Actions */}
        <div className="px-4 py-2">
          <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-2 px-2">
            Actions
          </p>
          <div className="flex flex-col gap-0.5">
            <a
              href="/mawa-2026-05-C.pdf"
              download
              onClick={onNavigate}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-background text-muted-foreground group-hover:text-foreground transition-colors">
                <Download size={16} />
              </span>
              <span>Download Resume</span>
            </a>

            <button
              type="button"
              onClick={() => themeStore.toggle()}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground w-full text-left"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-background text-muted-foreground group-hover:text-foreground transition-colors">
                {mounted ? (
                  themeStore.isDark ? (
                    <Sun size={16} />
                  ) : (
                    <Moon size={16} />
                  )
                ) : (
                  <span className="h-4 w-4" />
                )}
              </span>
              <span>
                {mounted
                  ? themeStore.isDark
                    ? "Switch to light"
                    : "Switch to dark"
                  : "Theme"}
              </span>
            </button>
          </div>
        </div>

        {/* Socials */}
        <div className="px-4 py-4 mt-2 border-t border-border/50">
          <SocialLinks variant="icon-only" className="pt-0" />
          <div className="mt-3">
            <DiscordCopyButton variant="drawer" />
          </div>
        </div>
      </div>
    </div>
  );
});
