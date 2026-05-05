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
  slug: string;
  description: string;
  tags: string[];
  year?: string;
  liveLink?: string;
  gitLink?: string | string[];
}
