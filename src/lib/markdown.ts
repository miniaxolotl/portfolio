import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  title: string;
  description: string;
  year?: string;
  tags?: string[];
  gitLink?: string;
}

export interface ProjectMarkdown {
  frontmatter: ProjectFrontmatter;
  content: string;
}

const contentDir = path.join(process.cwd(), "public", "content", "projects");

export const loadProjectMarkdown = (slug: string): ProjectMarkdown => {
  const filePath = path.join(contentDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
  };
};
