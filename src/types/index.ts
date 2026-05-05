import { ThemeMode } from "@/enums/theme";

export { ThemeMode };

export interface Social {
  label: string;
  href: string;
  iconName: string;
  copyToClipboard?: boolean;
}

export interface Skill {
  name: string;
  category: string;
  variant: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveLink?: string;
  gitLink?: string | string[];
}
