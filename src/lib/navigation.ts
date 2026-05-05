import { FolderOpen, MessageSquare, Wrench } from "lucide-react";

export const navLinks = [
  { href: "/#about", label: "About", icon: MessageSquare },
  { href: "/#skills", label: "Skills", icon: Wrench },
  { href: "/#projects", label: "Projects", icon: FolderOpen },
];

export const sectionIds = navLinks.map((link) => link.href.replace("/#", ""));
