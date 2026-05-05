import { notFound } from "next/navigation";
import { BlogProjectPage } from "@/components/project/BlogProjectPage";
import projects from "@/data/projects.json";
import { loadProjectMarkdown } from "@/lib/markdown";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  projects
    .filter((p) => !["burrow", "grove"].includes(p.slug))
    .map((p) => ({ slug: p.slug }));

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project || ["burrow", "grove"].includes(slug)) {
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
    />
  );
};

export default ProjectPage;
