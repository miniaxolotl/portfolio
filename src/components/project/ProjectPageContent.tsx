"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectArticleNav } from "@/components/project/ProjectArticleNav";
import { ProjectTag } from "@/components/project/ProjectTag";
import { TableOfContents } from "@/components/project/TableOfContents";
import { capture } from "@/lib/analytics";
import type { MarkdownHeading } from "@/lib/markdown";
import { cn, ensureProtocol } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectPageContentProps {
  name: string;
  description: string;
  tags: string[];
  year?: string;
  readingTime?: number;
  gitLink?: string | string[];
  links?: { label: string; url: string }[];
  content: string;
  headings: MarkdownHeading[];
  prevProject?: Project | null;
  nextProject?: Project | null;
}

export const ProjectPageContent = ({
  name,
  description,
  tags,
  year,
  readingTime,
  gitLink,
  links,
  content,
  headings,
  prevProject,
  nextProject,
}: ProjectPageContentProps) => {
  let isFirstImage = true;

  const gitLinks = Array.isArray(gitLink) ? gitLink : gitLink ? [gitLink] : [];
  const allLinks = [
    ...(links?.map((l) => ({
      label: l.label,
      url: ensureProtocol(l.url),
      icon: <LuGithub size={14} />,
    })) ?? []),
    ...gitLinks.map((l) => ({
      label: l.includes("github.com") ? "GitHub" : l,
      url: ensureProtocol(l),
      icon: <LuGithub size={14} />,
    })),
  ];

  return (
    <PageShell hasSidebar>
      <div className="px-4 py-8 sm:px-6 sm:py-12 md:py-16 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <header className="mb-10 md:mb-14">
            {/* Accent gradient bar */}
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-transparent rounded-full mb-6" />

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground font-mono tracking-wide mb-4">
              {year && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={11} />
                  {year}
                </span>
              )}
              {readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={11} />
                  {readingTime} min read
                </span>
              )}
              {year && readingTime && <span className="text-border">·</span>}
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={11} />
                {tags.length} {tags.length === 1 ? "tag" : "tags"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              {name}
            </h1>

            {/* Description */}
            <p className="text-[17px] sm:text-lg text-muted-foreground leading-[1.75] mb-6 max-w-2xl">
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {tags.map((tag) => (
                <ProjectTag key={tag} tag={tag} />
              ))}
            </div>

            {/* Links */}
            {allLinks.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {allLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-muted/50 hover:bg-muted border border-border/30 hover:border-accent/25 transition-all duration-200"
                    onClick={() =>
                      capture("project_link_clicked", {
                        label: link.label,
                        url: link.url,
                        project: name,
                      })
                    }
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-30 group-hover:opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </a>
                ))}
              </div>
            )}
          </header>

          <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mb-10" />

          {/* Content + TOC */}
          <div className="flex gap-12">
            {/* Markdown Content */}
            <article className="markdown-content flex-1 min-w-0 max-w-3xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h2: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLHeadingElement>) => {
                    const text =
                      typeof children === "string"
                        ? children
                        : Array.isArray(children)
                          ? children.join("")
                          : "";
                    const id = text
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-");
                    return (
                      <h2
                        id={id}
                        className="text-xl sm:text-2xl font-semibold tracking-tight mt-12 mb-6 flex items-center gap-4 group scroll-mt-24"
                        {...props}
                      >
                        <span className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent transition-all group-hover:from-accent/70" />
                        <span className="text-foreground whitespace-nowrap">
                          {children}
                        </span>
                      </h2>
                    );
                  },
                  h3: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLHeadingElement>) => {
                    const text =
                      typeof children === "string"
                        ? children
                        : Array.isArray(children)
                          ? children.join("")
                          : "";
                    const id = text
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-");
                    return (
                      <h3
                        id={id}
                        className="text-lg font-semibold mt-10 mb-3 text-foreground/90 scroll-mt-24"
                        {...props}
                      >
                        {children}
                      </h3>
                    );
                  },
                  p: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLParagraphElement>) => (
                    <p
                      className="text-[15px] leading-[1.8] text-muted-foreground mb-5 last:mb-0"
                      {...props}
                    >
                      {children}
                    </p>
                  ),
                  ul: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLUListElement>) => (
                    <ul className="my-6 space-y-3" {...props}>
                      {children}
                    </ul>
                  ),
                  ol: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLOListElement>) => (
                    <ol
                      className="my-6 space-y-3 list-decimal pl-5 marker:text-accent/60"
                      {...props}
                    >
                      {children}
                    </ol>
                  ),
                  li: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLLIElement>) => (
                    <li
                      className="leading-relaxed flex items-start gap-3 text-[15px] text-muted-foreground"
                      {...props}
                    >
                      <span className="mt-2.5 h-1 w-1 rounded-full bg-accent/50 shrink-0" />
                      <span>{children}</span>
                    </li>
                  ),
                  a: ({
                    children,
                    href,
                    ...props
                  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
                    <a
                      href={href}
                      className="font-medium text-foreground underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-colors"
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                  code: ({
                    children,
                    className,
                    ...props
                  }: React.HTMLAttributes<HTMLElement>) => {
                    const isInline = !className;
                    return isInline ? (
                      <code
                        className="px-1.5 py-0.5 rounded-md bg-muted/70 text-[13px] font-mono text-foreground border border-border/20"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <div className="rounded-xl overflow-hidden border border-border/40 my-8 shadow-sm">
                        <div
                          className="px-4 py-2.5 flex items-center gap-2 border-b border-border/20"
                          style={{ backgroundColor: "var(--terminal-header)" }}
                        >
                          <div className="flex gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor: "var(--terminal-close)",
                              }}
                            />
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor: "var(--terminal-minimize)",
                              }}
                            />
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor: "var(--terminal-maximize)",
                              }}
                            />
                          </div>
                        </div>
                        <pre
                          className="p-4 overflow-x-auto"
                          style={{ backgroundColor: "var(--terminal-bg)" }}
                        >
                          <code
                            className={cn(
                              "text-sm font-mono leading-relaxed",
                              className,
                            )}
                            style={{ color: "var(--terminal-text)" }}
                            {...props}
                          >
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  },
                  blockquote: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLQuoteElement>) => (
                    <blockquote
                      className="border-l-2 border-accent/40 bg-accent/3 pl-5 pr-4 py-4 rounded-r-lg text-muted-foreground my-8 italic text-[15px] leading-[1.8]"
                      {...props}
                    >
                      {children}
                    </blockquote>
                  ),
                  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
                    <hr
                      className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
                      {...props}
                    />
                  ),
                  strong: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLElement>) => (
                    <strong
                      className="font-semibold text-foreground"
                      {...props}
                    >
                      {children}
                    </strong>
                  ),
                  em: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLElement>) => (
                    <em className="text-muted-foreground" {...props}>
                      {children}
                    </em>
                  ),
                  table: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLTableElement>) => (
                    <div className="overflow-x-auto my-8 rounded-xl border border-border/40 shadow-sm">
                      <table className="w-full text-sm text-left" {...props}>
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
                    <thead
                      className="bg-muted/50 text-foreground font-medium"
                      {...props}
                    >
                      {children}
                    </thead>
                  ),
                  tbody: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
                    <tbody className="divide-y divide-border/30" {...props}>
                      {children}
                    </tbody>
                  ),
                  tr: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLTableRowElement>) => (
                    <tr
                      className="text-muted-foreground hover:bg-muted/15 transition-colors"
                      {...props}
                    >
                      {children}
                    </tr>
                  ),
                  th: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLTableCellElement>) => (
                    <th className="px-4 py-3 font-medium" {...props}>
                      {children}
                    </th>
                  ),
                  td: ({
                    children,
                    ...props
                  }: React.HTMLAttributes<HTMLTableCellElement>) => (
                    <td className="px-4 py-3" {...props}>
                      {children}
                    </td>
                  ),
                  img: ({
                    src,
                    alt,
                    className,
                    ...props
                  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
                    const hasWrapper = className?.includes("flex-1");
                    const isInline = className?.includes("inline-only");
                    const isFirst = isFirstImage;
                    isFirstImage = false;

                    if (hasWrapper) {
                      return (
                        // biome-ignore lint/performance/noImgElement: markdown images have unknown dimensions
                        <img
                          src={src}
                          alt={alt ?? ""}
                          className={cn(
                            "w-full h-auto block rounded max-h-80 object-contain cursor-zoom-in",
                            className,
                          )}
                          data-zoomable
                          loading={isFirst ? "eager" : "lazy"}
                          {...(isFirst ? { fetchPriority: "high" } : {})}
                          {...props}
                        />
                      );
                    }
                    if (isInline) {
                      return (
                        // biome-ignore lint/performance/noImgElement: markdown images have unknown dimensions
                        <img
                          src={src}
                          alt={alt ?? ""}
                          className="inline align-middle rounded h-6 w-auto cursor-zoom-in"
                          data-zoomable
                          loading={isFirst ? "eager" : "lazy"}
                          {...(isFirst ? { fetchPriority: "high" } : {})}
                          {...props}
                        />
                      );
                    }
                    return (
                      // biome-ignore lint/performance/noImgElement: markdown images have unknown dimensions
                      <img
                        src={src}
                        alt={alt ?? ""}
                        className="my-8 block rounded max-w-2xl mx-auto w-full h-auto max-h-96 object-contain cursor-zoom-in"
                        data-zoomable
                        loading={isFirst ? "eager" : "lazy"}
                        {...(isFirst ? { fetchPriority: "high" } : {})}
                        {...props}
                      />
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </article>

            {/* Table of Contents */}
            <TableOfContents headings={headings} />
          </div>

          {/* Bottom Navigation */}
          <div className="mt-14 pt-8 border-t border-border/30 max-w-3xl">
            <ProjectArticleNav
              prevProject={prevProject}
              nextProject={nextProject}
            />

            <div className="mt-8">
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium bg-muted/50 hover:bg-muted border border-border/30 hover:border-accent/25 transition-all duration-200"
                onClick={() =>
                  capture("project_back_to_list_clicked", { project: name })
                }
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Back to projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};
