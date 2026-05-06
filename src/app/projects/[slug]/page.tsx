import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageLightbox } from "@/components/project/ImageLightbox";
import { ProjectPageContent } from "@/components/project/ProjectPageContent";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import { loadProjectMarkdown } from "@/lib/markdown";
import { blogSlugs } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => [
  { slug: "burrow" },
  { slug: "grove" },
  { slug: "fitr" },
  { slug: "fashion-vision" },
  { slug: "inkbyte" },
];

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project || !blogSlugs.has(slug)) {
    return {};
  }

  const { frontmatter } = loadProjectMarkdown(slug);

  return {
    title: `${frontmatter.title} | ${profile.name}`,
    description: frontmatter.description,
    openGraph: {
      title: `${frontmatter.title} | ${profile.name}`,
      description: frontmatter.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${frontmatter.title} | ${profile.name}`,
      description: frontmatter.description,
    },
  };
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project || !blogSlugs.has(slug)) {
    notFound();
  }

  const { frontmatter, content } = loadProjectMarkdown(slug);

  return (
    <ImageLightbox>
      <ProjectPageContent
        name={frontmatter.title}
        description={frontmatter.description}
        tags={frontmatter.tags ?? []}
        year={frontmatter.year}
        gitLink={frontmatter.gitLink}
        links={frontmatter.links}
        content={content}
        hasSidebar
      />
    </ImageLightbox>
  );
};

export default ProjectPage;
