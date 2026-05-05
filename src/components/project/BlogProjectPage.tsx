"use client";

import { ArrowLeft, ArrowUpRight, Calendar, X } from "lucide-react";
import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useCallback, useEffect, useState } from "react";
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
  hasSidebar?: boolean;
}

const createMarkdownComponents = (onImageClick: (src: string, alt: string) => void) => ({
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl sm:text-2xl font-semibold tracking-tight mt-16 mb-6 flex items-center gap-4 group scroll-mt-24"
      {...props}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent transition-all group-hover:from-accent/70" />
      <span className="text-foreground whitespace-nowrap">{children}</span>
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-semibold mt-10 mb-3 text-foreground/90 scroll-mt-24" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[15px] leading-[1.8] text-muted-foreground mb-5 last:mb-0" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 space-y-3" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 space-y-3 list-decimal pl-5 marker:text-accent/60" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed flex items-start gap-3 text-[15px] text-muted-foreground" {...props}>
      <span className="mt-2.5 h-1 w-1 rounded-full bg-accent/50 shrink-0" />
      <span>{children}</span>
    </li>
  ),
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="font-medium text-foreground underline underline-offset-4 decoration-accent/30 hover:decoration-accent transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
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
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--terminal-close)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--terminal-minimize)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--terminal-maximize)" }} />
          </div>
        </div>
        <pre className="p-4 overflow-x-auto" style={{ backgroundColor: "var(--terminal-bg)" }}>
          <code
            className={cn("text-sm font-mono leading-relaxed", className)}
            style={{ color: "var(--terminal-text)" }}
            {...props}
          >
            {children}
          </code>
        </pre>
      </div>
    );
  },
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-accent/40 bg-accent/[0.03] pl-5 pr-4 py-4 rounded-r-lg text-muted-foreground my-8 italic text-[15px] leading-[1.8]"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-14 border-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" {...props} />
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
    <div className="overflow-x-auto my-8 rounded-xl border border-border/40 shadow-sm">
      <table className="w-full text-sm text-left" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-muted/50 text-foreground font-medium" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-border/30" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="text-muted-foreground hover:bg-muted/15 transition-colors" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3" {...props}>
      {children}
    </td>
  ),
  img: ({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const hasWrapper = className && className.includes("flex-1");
    const isInline = className && className.includes("inline-only");
    const handleClick = () => {
      if (src && typeof src === "string") onImageClick(src, alt ?? "");
    };
    if (hasWrapper) {
      return (
        <img
          src={src}
          alt={alt ?? ""}
          className={cn("w-full h-auto block rounded max-h-80 object-contain cursor-zoom-in", className)}
          onClick={handleClick}
          {...props}
        />
      );
    }
    if (isInline) {
      return (
        <img
          src={src}
          alt={alt ?? ""}
          className="inline align-middle rounded h-6 w-auto cursor-zoom-in"
          onClick={handleClick}
          {...props}
        />
      );
    }
    return (
      <img
        src={src}
        alt={alt ?? ""}
        className="my-8 block rounded max-w-2xl mx-auto w-full h-auto max-h-96 object-contain cursor-zoom-in"
        onClick={handleClick}
        {...props}
      />
    );
  },
});

export const BlogProjectPage = ({
  name,
  description,
  tags,
  year,
  gitLink,
  links,
  content,
  hasSidebar,
}: BlogProjectPageProps) => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const handleImageClick = useCallback((src: string, alt: string) => {
    setSelectedImage({ src, alt });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, handleClose]);

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

  const markdownComponents = createMarkdownComponents(handleImageClick);

  return (
    <PageShell hasSidebar={hasSidebar}>
      <article className="px-4 py-10 sm:px-6 sm:py-16 md:py-28 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <header className="mb-16 md:mb-24">
            {year && (
              <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70 font-mono tracking-wide mb-5">
                <Calendar size={11} />
                {year}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {tags.map((tag) => (
                <ProjectTag key={tag} tag={tag} />
              ))}
            </div>

            <div className="h-px w-20 bg-gradient-to-r from-accent to-transparent mb-8" />

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 text-foreground">{name}</h1>

            <p className="text-[17px] sm:text-lg text-muted-foreground leading-[1.75] mb-8 max-w-2xl">{description}</p>

            {allLinks.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {allLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-muted/50 hover:bg-muted border border-border/30 hover:border-accent/25 transition-all duration-200"
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

          <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mb-14" />

          {/* Markdown Content */}
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
              {content}
            </ReactMarkdown>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-24 pt-10 border-t border-border/30">
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium bg-muted/50 hover:bg-muted border border-border/30 hover:border-accent/25 transition-all duration-200"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to projects
            </Link>
          </div>
        </div>
      </article>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 inline-flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close image preview"
          >
            <X size={20} />
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </PageShell>
  );
};
