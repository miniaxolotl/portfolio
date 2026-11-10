"use client";

import { ArrowUp } from "lucide-react";
import { DiscordCopyButton } from "@/components/layout/DiscordCopyButton";
import { SocialIcon } from "@/components/layout/SocialIcon";
import profile from "@/data/profile.json";
import socials from "@/data/socials.json";

export const Footer = () => {
  const year = new Date().getFullYear();
  const nonDiscordSocials = socials.filter((s) => !s.copyToClipboard);

  return (
    <footer className="border-t border-border/40 py-5 sm:py-6 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">
          &copy; {year} {profile.name}{" "}
          <span className="mx-2" aria-hidden="true">
            /
          </span>{" "}
          Made with care, in {profile.location}.
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {nonDiscordSocials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex size-10 items-center justify-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              aria-label={s.label}
            >
              <SocialIcon iconName={s.iconName} size={16} />
            </a>
          ))}
          <DiscordCopyButton variant="footer" />
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
            className="text-muted-foreground hover:text-foreground transition-colors inline-flex size-10 items-center justify-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
