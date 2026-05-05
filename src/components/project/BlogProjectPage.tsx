"use client";

import Link from "next/link";
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
  gitLink?: string;
  content: string;
}

const MarkdownComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl sm:text-3xl font-bold mt-10 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl sm:text-2xl font-bold mt-8 mb-3" {...props}>
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
      className="list-disc pl-6 mb-4 space-y-1.5 text-muted-foreground"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-6 mb-4 space-y-1.5 text-muted-foreground"
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
        className="p-4 rounded-lg overflow-x-auto mb-4"
        style={{ backgroundColor: "var(--terminal-bg)" }}
      >
        <code
          className={cn("text-sm font-mono", className)}
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
      className="border-l-2 border-accent pl-4 italic text-muted-foreground mb-4"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
};

export const BlogProjectPage = ({
  name,
  description,
  tags,
  year,
  gitLink,
  content,
}: BlogProjectPageProps) => (
  <PageShell>
    <article className="px-4 py-10 sm:px-6 sm:py-16 md:py-28 md:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {tags.map((tag) => (
              <ProjectTag key={tag} tag={tag} />
            ))}
            {year && (
              <span className="text-xs text-muted-foreground font-mono">
                {year}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {name}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {description}
          </p>
          {gitLink && (
            <div className="mt-6">
              <a
                href={ensureProtocol(gitLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {gitLink} &rarr;
              </a>
            </div>
          )}
        </header>

        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {content}
          </ReactMarkdown>
        </div>

        <div className="mt-16">
          <Link
            href="/#projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            &larr; Back to projects
          </Link>
        </div>
      </div>
    </article>
  </PageShell>
);
