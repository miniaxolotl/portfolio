"use client";

import { FolderOpen, MessageSquare, Wrench } from "lucide-react";
import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { RxDiscordLogo } from "react-icons/rx";
import { ProfileSection } from "@/components/layout/ProfileSection";
import { ResumeButton } from "@/components/layout/ResumeButton";
import { SidebarNavLink } from "@/components/layout/SidebarNavLink";
import socials from "@/data/socials.json";
import { useClipboard } from "@/hooks/useClipboard";
import { useProfile } from "@/hooks/useProfile";

interface MobileSidebarProps {
  onNavigate?: () => void;
}

const navLinks = [
  { href: "/#about", label: "About Me", icon: MessageSquare },
  { href: "/#skills", label: "Skills", icon: Wrench },
  { href: "/#projects", label: "Projects", icon: FolderOpen },
];

export const MobileSidebar = ({ onNavigate }: MobileSidebarProps) => {
  const { profile } = useProfile();
  const { copied, copy } = useClipboard();
  const iconMap: Record<string, React.ReactNode> = {
    LuGithub: <LuGithub size={16} aria-hidden="true" />,
    LuLinkedin: <LuLinkedin size={16} aria-hidden="true" />,
    LuMail: <LuMail size={16} aria-hidden="true" />,
    RxDiscordLogo: <RxDiscordLogo size={16} aria-hidden="true" />,
  };

  const handleNavClick = () => {
    onNavigate?.();
  };

  const handleSocialClick = (social: (typeof socials)[0]) => {
    if (social.copyToClipboard) {
      copy(profile.discord);
    }
  };

  return (
    <nav className="flex flex-col h-full p-6" aria-label="Mobile navigation">
      <ProfileSection imageSize={80} />

      <nav aria-label="Page sections" className="flex flex-col gap-1 mt-6">
        {navLinks.map((link) => (
          <SidebarNavLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            onClick={handleNavClick}
          />
        ))}
      </nav>

      <div className="mt-6 pt-4 border-t border-border/50">
        <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3 px-1">
          Connect
        </p>
        <div className="flex flex-col gap-1">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.copyToClipboard ? "#" : social.href}
              onClick={(e) => {
                if (social.copyToClipboard) {
                  e.preventDefault();
                  handleSocialClick(social);
                }
              }}
              className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/5 transition-all duration-200"
              aria-label={
                social.copyToClipboard ? `Copy ${social.label}` : social.label
              }
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-muted/60 text-muted-foreground group-hover:bg-accent/10 group-hover:text-foreground transition-colors duration-200">
                {iconMap[social.iconName] ?? null}
              </span>
              <span className="text-sm font-medium">
                {social.copyToClipboard && copied ? "Copied!" : social.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <ResumeButton />
      </div>
    </nav>
  );
};
