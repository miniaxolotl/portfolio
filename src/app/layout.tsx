import type { Metadata } from "next";
import profile from "@/data/profile.json";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description: profile.description,
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
  authors: [{ name: profile.name, url: profile.website }],
  creator: profile.name,
  icons: {
    icon: "/img/masthead/slime-front-idle.gif",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: profile.website,
    siteName: `${profile.name} Portfolio`,
    title: `${profile.name} | ${profile.role}`,
    description: profile.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@miniaxolotl",
    title: `${profile.name} | ${profile.role}`,
    description: profile.description,
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

const themeScript = `
  (function(){
    try{
      var m=document.cookie.match(/(?:^|; )theme=(dark|light)/);
      var t=m?m[1]:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
      document.documentElement.classList.toggle('dark',t==='dark');
    }catch(e){}
  })();
`;

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <script
        id="theme-script"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: inline theme script, no user input
        dangerouslySetInnerHTML={{ __html: themeScript }}
      />
    </head>
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
