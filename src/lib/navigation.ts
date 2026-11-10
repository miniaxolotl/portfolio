import { FolderOpen, Mail, MessageSquare, Wrench } from "lucide-react";

export const navLinks = [
  { href: "/#about", label: "About", icon: MessageSquare },
  { href: "/#projects", label: "Projects", icon: FolderOpen },
  { href: "/#skills", label: "Skills & approach", icon: Wrench },
  { href: "/#contact", label: "Say hello", icon: Mail },
];

export const sectionIds = navLinks.map((link) => link.href.replace("/#", ""));
