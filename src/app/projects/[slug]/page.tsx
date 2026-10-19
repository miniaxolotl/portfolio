import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageLightbox } from "@/components/project/ImageLightbox";
import { ProjectPageContent } from "@/components/project/ProjectPageContent";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import {
  calculateReadingTime,
  extractHeadings,
  loadProjectMarkdown,
} from "@/lib/markdown";
import { blogSlugs, sortByYearDesc } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  Array.from(blogSlugs).map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project || !blogSlugs.has(slug)) {
    return {};
  }

  const { frontmatter } = loadProjectMarkdown(slug);

  return {
    title: `${frontmatter.title} | ${profile.name}`,
    description: frontmatter.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${frontmatter.title} | ${profile.name}`,
      description: frontmatter.description,
      url: `/projects/${slug}`,
      ...("banner" in project && project.banner
        ? {
            images: [
              {
                url: project.banner,
                width: 1200,
                height: 628,
                alt: project.bannerAlt,
              },
            ],
          }
        : {}),
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
  const headings = extractHeadings(content);
  const readingTime = calculateReadingTime(content);

  const blogProjects = projects
    .filter((p) => blogSlugs.has(p.slug))
    .sort(sortByYearDesc);
  const currentIndex = blogProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? blogProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < blogProjects.length - 1
      ? blogProjects[currentIndex + 1]
      : null;

  return (
    <ImageLightbox>
      <ProjectPageContent
        name={frontmatter.title}
        description={frontmatter.description}
        tags={project.tags}
        year={frontmatter.year}
        readingTime={readingTime}
        gitLink={"gitLink" in project ? project.gitLink : undefined}
        links={"links" in project ? project.links : undefined}
        liveLink={"liveLink" in project ? project.liveLink : undefined}
        banner={"banner" in project ? project.banner : undefined}
        bannerAlt={"bannerAlt" in project ? project.bannerAlt : undefined}
        logo={"logo" in project ? project.logo : undefined}
        status={"status" in project ? project.status : undefined}
        content={content}
        headings={headings}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </ImageLightbox>
  );
};

export default ProjectPage;
