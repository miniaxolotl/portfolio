"use client";

import { ArrowUp } from "lucide-react";
import { SocialIcon } from "@/components/layout/SocialIcon";
import profile from "@/data/profile.json";
import socials from "@/data/socials.json";
import { useClipboard } from "@/hooks/useClipboard";

export const Footer = () => {
  const { copy } = useClipboard();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 py-5 sm:py-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground/60">
          &copy; {year} {profile.name}
        </span>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.copyToClipboard ? "#" : s.href}
              onClick={(e) => {
                if (s.copyToClipboard) {
                  e.preventDefault();
                  copy(profile.discord);
                }
              }}
              className="text-muted-foreground/50 hover:text-foreground transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              aria-label={s.label}
            >
              <SocialIcon iconName={s.iconName} size={16} />
            </a>
          ))}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-muted-foreground/50 hover:text-foreground transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
