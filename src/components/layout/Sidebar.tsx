"use client";

import { FolderOpen, MessageSquare, Wrench } from "lucide-react";
import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { RxDiscordLogo } from "react-icons/rx";
import { ProfileSection } from "@/components/layout/ProfileSection";
import { ResumeButton } from "@/components/layout/ResumeButton";
import { SidebarNavLink } from "@/components/layout/SidebarNavLink";
import socials from "@/data/socials.json";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useClipboard } from "@/hooks/useClipboard";
import { useProfile } from "@/hooks/useProfile";

const navLinks = [
  { href: "/#about", label: "About", icon: MessageSquare },
  { href: "/#skills", label: "Skills", icon: Wrench },
  { href: "/#projects", label: "Projects", icon: FolderOpen },
];

const sectionIds = navLinks.map((link) => link.href.replace("/#", ""));

const iconMap: Record<string, React.ReactNode> = {
  LuGithub: <LuGithub size={16} aria-hidden="true" />,
  LuLinkedin: <LuLinkedin size={16} aria-hidden="true" />,
  LuMail: <LuMail size={16} aria-hidden="true" />,
  RxDiscordLogo: <RxDiscordLogo size={16} aria-hidden="true" />,
};

export const Sidebar = () => {
  const { profile } = useProfile();
  const { copy } = useClipboard();
  const activeSection = useActiveSection(sectionIds);

  const handleClick = (social: (typeof socials)[0]) => {
    if (social.copyToClipboard) {
      copy(profile.discord);
    }
  };

  return (
    <aside className="hidden md:block fixed left-0 top-14 w-[280px] h-[calc(100vh-3.5rem)] border-r border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="flex flex-col h-full p-6 gap-6 overflow-y-auto">
        <ProfileSection imageSize={88} />

        <nav className="flex flex-col gap-1" aria-label="Page sections">
          {navLinks.map((link) => (
            <SidebarNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              isActive={activeSection === link.href.replace("/#", "")}
            />
          ))}
        </nav>

        <div className="pt-4 border-t border-border/50">
          <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3 px-1">
            Connect
          </p>
          <div className="flex flex-wrap gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.copyToClipboard ? "#" : social.href}
                onClick={(e) => {
                  if (social.copyToClipboard) {
                    e.preventDefault();
                  }
                  handleClick(social);
                }}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/50 hover:bg-accent/10 hover:text-accent-foreground hover:scale-105 transition-all duration-200"
                aria-label={social.label}
                title={social.label}
              >
                {iconMap[social.iconName] ?? null}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4">
          <ResumeButton />
        </div>
      </div>
    </aside>
  );
};
