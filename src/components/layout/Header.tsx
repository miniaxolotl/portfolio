"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import { featuredSlugs } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { drawerStore, themeStore } from "@/stores";
import { MobileSidebar } from "./MobileSidebar";

const navItems = [
  { href: "/", label: "portfolio" },
  { href: "/burrow", label: "burrow" },
  { href: "/grove", label: "grove" },
];

const dropdownProjects = projects.filter((p) => !featuredSlugs.has(p.slug));

const navLinkBase =
  "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors outline-none hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50";

const activeNavLink = "bg-muted text-foreground";

export const Header = observer(() => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    themeStore.sync();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <Drawer
            open={drawerStore.open}
            onOpenChange={(open) => drawerStore.setOpen(open)}
          >
            <DrawerTrigger
              aria-label="Open navigation menu"
              aria-expanded={drawerStore.open}
              aria-controls="mobile-navigation"
              className="md:hidden h-11 w-11 shrink-0 rounded-lg hover:bg-muted hover:text-foreground active:bg-muted/80"
            >
              <Menu size={20} aria-hidden="true" />
            </DrawerTrigger>
            <DrawerContent id="mobile-navigation" aria-label="Navigation menu">
              <DrawerTitle id="mobile-navigation-title" className="sr-only">
                Navigation Menu
              </DrawerTitle>
              <MobileSidebar onNavigate={() => drawerStore.setOpen(false)} />
            </DrawerContent>
          </Drawer>

          {/* Mobile branding */}
          <Link
            href="/"
            className="flex items-center gap-2.5 md:hidden"
            aria-label="Go to portfolio"
          >
            <Image
              src="/img/masthead/player-front-idle.gif"
              alt=""
              width={32}
              height={32}
              className="rounded-full object-cover"
              unoptimized
            />
            <span className="text-sm font-semibold tracking-tight">
              {profile.name}
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-0"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  navLinkBase,
                  pathname === item.href && activeNavLink,
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  navLinkBase,
                  dropdownProjects.some(
                    (p) => pathname === `/projects/${p.slug}`,
                  ) && activeNavLink,
                )}
              >
                projects
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 transition-transform data-popup-open:rotate-180"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-64 p-2"
                sideOffset={8}
              >
                <div className="grid gap-1">
                  {dropdownProjects.map((project) => (
                    <DropdownMenuItem
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm cursor-pointer",
                        pathname === `/projects/${project.slug}` &&
                          "bg-muted text-foreground",
                      )}
                    >
                      <span className="font-medium">{project.title}</span>
                      {project.year && (
                        <span className="text-xs text-muted-foreground font-mono">
                          {project.year}
                        </span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  href="/projects"
                  className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  View all projects
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <button
          type="button"
          onClick={() => themeStore.toggle()}
          aria-label={
            mounted
              ? `Toggle theme, currently ${themeStore.isDark ? "dark" : "light"} mode`
              : "Toggle theme"
          }
          suppressHydrationWarning
          className="inline-flex items-center justify-center h-11 w-11 shrink-0 rounded-lg hover:bg-muted hover:text-foreground active:bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {mounted ? (
            themeStore.isDark ? (
              <Sun size={20} aria-hidden="true" />
            ) : (
              <Moon size={20} aria-hidden="true" />
            )
          ) : (
            <span className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
});
