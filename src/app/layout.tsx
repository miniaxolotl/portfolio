import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import profile from "@/data/profile.json";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "./fonts/dm-sans-400.woff", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-500.woff", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans-700.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

const serif = localFont({
  src: [
    {
      path: "./fonts/instrument-serif-400.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/instrument-serif-italic.woff",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
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
    "Edmonton",
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
      var t=m?m[1]:'dark';
      document.documentElement.classList.toggle('dark',t==='dark');
    }catch(e){}
  })();
`;

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    lang="en"
    className={`dark ${sans.variable} ${serif.variable}`}
    suppressHydrationWarning
  >
    <head>
      <script
        id="theme-script"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: inline theme script, no user input
        dangerouslySetInnerHTML={{ __html: themeScript }}
      />
    </head>
    <body className="min-h-full flex flex-col font-sans antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
      {children}
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
