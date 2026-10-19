"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import profile from "@/data/profile.json";
import { capture } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { drawerStore, themeStore } from "@/stores";
import { MobileSidebar } from "./MobileSidebar";

const navItems = [
  { href: "/", label: "portfolio" },
  { href: "/#projects", label: "work" },
  { href: "/#contact", label: "contact" },
];

const navLinkBase =
  "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors outline-none hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50";

const activeNavLink = "bg-muted text-foreground";

export const Header = observer(() => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    themeStore.sync();
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) drawerStore.setOpen(false);
    };
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center gap-3 md:gap-10">
          <Drawer
            open={drawerStore.open}
            onOpenChange={(open) => {
              drawerStore.setOpen(open);
              if (open) capture("mobile_nav_opened");
            }}
          >
            <DrawerTrigger
              disabled={!mounted}
              aria-label="Open navigation menu"
              aria-expanded={drawerStore.open}
              aria-controls="mobile-navigation"
              className="inline-flex md:hidden items-center justify-center h-11 w-11 shrink-0 rounded-lg hover:bg-muted hover:text-foreground active:bg-muted/80"
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
            className="flex items-center gap-2.5"
            aria-label="Elias Mawa — home"
          >
            <Image
              src="/img/masthead/player-still.webp"
              alt=""
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="text-sm font-semibold tracking-tight">
              {profile.name}
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-2"
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
          </nav>
        </div>

        <Button
          variant="ghost"
          size="icon"
          disabled={!mounted}
          type="button"
          onClick={() => {
            capture("theme_toggled", {
              new_theme: themeStore.isDark ? "light" : "dark",
            });
            themeStore.toggle();
          }}
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
        </Button>
      </div>
    </header>
  );
});
