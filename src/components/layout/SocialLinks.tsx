"use client";

import { SocialIcon } from "@/components/layout/SocialIcon";
import profile from "@/data/profile.json";
import socials from "@/data/socials.json";
import { useClipboard } from "@/hooks/useClipboard";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  variant: "icon-only" | "list";
  className?: string;
}

export const SocialLinks = ({ variant, className }: SocialLinksProps) => {
  const { copied, copy } = useClipboard();

  const handleClick = (e: React.MouseEvent, copyToClipboard?: boolean) => {
    if (copyToClipboard) {
      e.preventDefault();
      copy(profile.discord);
    }
  };

  return (
    <div className={cn("pt-4", className)}>
      <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3 px-1">
        Connect
      </p>
      {variant === "icon-only" ? (
        <div className="flex flex-wrap gap-2">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.copyToClipboard ? "#" : social.href}
              onClick={(e) => handleClick(e, social.copyToClipboard)}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label={social.label}
              title={social.label}
            >
              <SocialIcon iconName={social.iconName} size={16} />
            </a>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.copyToClipboard ? "#" : social.href}
              onClick={(e) => handleClick(e, social.copyToClipboard)}
              className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={
                social.copyToClipboard ? `Copy ${social.label}` : social.label
              }
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-muted text-muted-foreground group-hover:bg-background group-hover:text-foreground transition-colors">
                <SocialIcon iconName={social.iconName} size={16} />
              </span>
              <span className="text-sm font-medium">
                {social.copyToClipboard && copied ? "Copied!" : social.label}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
