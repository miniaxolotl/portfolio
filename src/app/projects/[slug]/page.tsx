import { notFound } from "next/navigation";
import { BlogProjectPage } from "@/components/project/BlogProjectPage";
import projects from "@/data/projects.json";
import { loadProjectMarkdown } from "@/lib/markdown";
import { blogSlugs } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  [{ slug: "burrow" }, { slug: "grove" }, { slug: "fitr" }, { slug: "fashion-vision" }, { slug: "inkbyte" }];

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project || !blogSlugs.has(slug)) {
    notFound();
  }

  const { frontmatter, content } = loadProjectMarkdown(slug);

  return (
    <BlogProjectPage
      name={frontmatter.title}
      description={frontmatter.description}
      tags={frontmatter.tags ?? []}
      year={frontmatter.year}
      gitLink={frontmatter.gitLink}
      links={frontmatter.links}
      content={content}
      hasSidebar
    />
  );
};

export default ProjectPage;
