import type { Project } from "@/types";

export const featuredSlugs = new Set(["burrow", "grove"]);

export const blogSlugs = new Set([
  "burrow",
  "grove",
  "fitr",
  "fashion-vision",
  "inkbyte",
  "paint-opengl",
  "sorbet",
]);

export const tagColors = [
  "bg-[var(--badge-olive-bg)] text-[var(--badge-olive-text)]",
  "bg-[var(--badge-copper-bg)] text-[var(--badge-copper-text)]",
  "bg-[var(--badge-brown-bg)] text-[var(--badge-brown-text)]",
  "bg-[var(--badge-cream-bg)] text-[var(--badge-cream-text)]",
];

export const getTagColorIndex = (tag: string): number => {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % tagColors.length;
};

export const getTagColorClass = (tag: string): string =>
  tagColors[getTagColorIndex(tag)];

export const getProjectHref = (project: Project) =>
  blogSlugs.has(project.slug)
    ? `/projects/${project.slug}`
    : `/${project.slug}`;
