import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elias Mawa | Full-Stack Developer",
  description:
    "Experienced Full-Stack Developer with 5+ years specializing in scalable SaaS and financial infrastructure. Skills in Go, React, Next.js, TypeScript, PostgreSQL, AWS, and system design.",
  keywords: [
    "Full-Stack Developer",
    "Software Engineer",
    "Go",
    "React",
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "AWS",
    "Calgary",
    "Alberta",
    "SaaS",
    "API Design",
  ],
  authors: [{ name: "Elias Mawa", url: "https://mawa.dev" }],
  creator: "Elias Mawa",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://mawa.dev",
    siteName: "Elias Mawa Portfolio",
    title: "Elias Mawa | Full-Stack Developer",
    description:
      "Experienced Full-Stack Developer with 5+ years specializing in scalable SaaS and financial infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@miniaxolotl",
    title: "Elias Mawa | Full-Stack Developer",
    description:
      "Experienced Full-Stack Developer with 5+ years specializing in scalable SaaS and financial infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" className="dark">
    <body className="min-h-full flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
      {children}
    </body>
  </html>
);

export default RootLayout;
