"use client";

import { ProfileSection } from "@/components/layout/ProfileSection";
import { ResumeDownloadLink } from "@/components/layout/ResumeDownloadLink";
import { SidebarNavLink } from "@/components/layout/SidebarNavLink";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navLinks, sectionIds } from "@/lib/navigation";

export const Sidebar = () => {
  const activeSection = useActiveSection(sectionIds);

  return (
    <aside
      data-testid="sidebar"
      className="hidden lg:block fixed left-0 top-16 z-40 w-64 xl:w-72 h-[calc(100dvh-4rem)] border-r border-border"
    >
      <div className="flex flex-col h-full px-6 py-10 gap-7 overflow-y-auto">
        <ProfileSection imageSize={88} />
        <p className="text-center text-sm leading-relaxed text-muted-foreground">
          Curious by nature.
          <br />
          An engineer by practice.
        </p>

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
          <ResumeDownloadLink />
        </nav>

        <SocialLinks variant="icon-only" />
      </div>
    </aside>
  );
};
