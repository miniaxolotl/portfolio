"use client";

import { ChevronDown, Moon, PanelLeftClose, PanelLeftOpen, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HeaderIconButton } from "@/components/layout/HeaderIconButton";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";
import { MobileSidebar } from "./MobileSidebar";

const navItems = [
  { href: "/", label: "portfolio" },
  { href: "/burrow", label: "burrow" },
  { href: "/grove", label: "grove" },
];

const projects = [
  { href: "/burrow", label: "Burrow" },
  { href: "/grove", label: "Grove" },
  { href: "/#projects", label: "More Projects" },
];

export const Header = () => {
  const pathname = usePathname();
  const { toggle, isDark } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} shouldScaleBackground={false}>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-navigation"
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-accent hover:text-accent-foreground active:bg-accent/80 transition-colors"
            >
              {drawerOpen ? (
                <PanelLeftClose size={20} aria-hidden="true" />
              ) : (
                <PanelLeftOpen size={20} aria-hidden="true" />
              )}
            </button>
            <DrawerContent id="mobile-navigation" aria-label="Navigation menu" className="w-72">
              <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
              <MobileSidebar onNavigate={() => setDrawerOpen(false)} />
            </DrawerContent>
          </Drawer>
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <span key={item.href} className="contents [&:not(:last-child)]:flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-sm"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
                {index < navItems.length - 1 && (
                  <span className="text-muted-foreground/40 px-2" aria-hidden="true">
                    |
                  </span>
                )}
              </span>
            ))}
            <span className="text-muted-foreground/40 px-2">|</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="text-sm flex items-center gap-1">
                  projects
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {projects.map((project) => (
                  <DropdownMenuItem key={project.href} asChild>
                    <Link href={project.href}>{project.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <HeaderIconButton
          icon={isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          onClick={toggle}
          aria-label={`Toggle theme, currently ${isDark ? "dark" : "light"} mode`}
        />
      </div>
    </header>
  );
};
