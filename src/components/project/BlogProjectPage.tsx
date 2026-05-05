"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectTag } from "@/components/project/ProjectTag";
import { cn, ensureProtocol } from "@/lib/utils";

interface BlogProjectPageProps {
  name: string;
  description: string;
  tags: string[];
  year?: string;
  gitLink?: string | string[];
  links?: { label: string; url: string }[];
  content: string;
}

const MarkdownComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl sm:text-3xl font-bold tracking-tight mt-12 mb-4"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl sm:text-2xl font-semibold tracking-tight mt-10 mb-3 pl-4 border-l-2 border-accent"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-base leading-relaxed text-muted-foreground mb-4"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pl-6 mb-6 space-y-1.5 text-muted-foreground marker:text-accent"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-6 mb-6 space-y-1.5 text-muted-foreground marker:text-accent"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="font-medium text-foreground underline underline-offset-4 hover:text-accent-foreground transition-colors"
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
        className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-foreground"
        {...props}
      >
        {children}
      </code>
    ) : (
      <pre
        className="p-4 rounded-lg overflow-x-auto mb-6 border border-border/50"
        style={{ backgroundColor: "var(--terminal-bg)" }}
      >
        <code
          className={cn("text-sm font-mono leading-relaxed", className)}
          style={{ color: "var(--terminal-text)" }}
          {...props}
        >
          {children}
        </code>
      </pre>
    );
  },
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-accent bg-accent/5 pl-4 pr-4 py-3 rounded-r-lg italic text-muted-foreground mb-6"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-10 border-border/50" {...props} />
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-muted-foreground" {...props}>
      {children}
    </em>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6 rounded-lg border border-border/50">
      <table className="w-full text-sm text-left" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted/50 text-foreground font-medium" {...props}>
      {children}
    </thead>
  ),
  tbody: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border/50" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="text-muted-foreground hover:bg-muted/30 transition-colors"
      {...props}
    >
      {children}
    </tr>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-2.5 font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2.5" {...props}>
      {children}
    </td>
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="my-8 rounded-xl overflow-hidden border border-border/50">
      <img src={src} alt={alt ?? ""} className="w-full h-auto" {...props} />
    </div>
  ),
};

export const BlogProjectPage = ({
  name,
  description,
  tags,
  year,
  gitLink,
  links,
  content,
}: BlogProjectPageProps) => {
  const gitLinks = Array.isArray(gitLink) ? gitLink : gitLink ? [gitLink] : [];

  return (
    <PageShell>
      <article className="px-4 py-10 sm:px-6 sm:py-16 md:py-28 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12 md:mb-16">
            <div className="flex flex-wrap items-center gap-1.5 mb-5">
              {tags.map((tag) => (
                <ProjectTag key={tag} tag={tag} />
              ))}
              {year && (
                <span className="text-xs text-muted-foreground font-mono">
                  {year}
                </span>
              )}
            </div>

            <div className="h-1 w-12 rounded-full bg-accent mb-6" />

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {name}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
              {description}
            </p>

            {(links && links.length > 0) || gitLinks.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-6">
                {links?.map((link) => (
                  <a
                    key={link.url}
                    href={ensureProtocol(link.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <LuGithub size={14} />
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-60" />
                  </a>
                ))}
                {gitLinks.map((link) => (
                  <a
                    key={link}
                    href={ensureProtocol(link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <LuGithub size={14} />
                    {link}
                    <ArrowUpRight size={12} className="opacity-60" />
                  </a>
                ))}
              </div>
            ) : null}
          </header>

          <div className="border-t border-border/50 mb-10" />

          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {content}
            </ReactMarkdown>
          </div>

          <div className="mt-16 pt-8 border-t border-border/50">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to projects
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
};
