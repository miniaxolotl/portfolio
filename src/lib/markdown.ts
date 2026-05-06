import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  title: string;
  description: string;
  year?: string;
  tags?: string[];
  gitLink?: string | string[];
  links?: { label: string; url: string }[];
}

export interface ProjectMarkdown {
  frontmatter: ProjectFrontmatter;
  content: string;
}

export interface MarkdownHeading {
  text: string;
  id: string;
  level: number;
}

const contentDir = path.join(process.cwd(), "public", "content", "posts");

export const loadProjectMarkdown = (slug: string): ProjectMarkdown => {
  const filePath = path.join(contentDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
  };
};

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

export const extractHeadings = (content: string): MarkdownHeading[] => {
  const lines = content.split("\n");
  const headings: MarkdownHeading[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      headings.push({ text, id: slugify(text), level });
    }
  }

  return headings;
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};
