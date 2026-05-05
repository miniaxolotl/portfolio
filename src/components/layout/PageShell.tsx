import { cn } from "@/lib/utils";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface PageShellProps {
  children: React.ReactNode;
  hasSidebar?: boolean;
}

export const PageShell = ({ children, hasSidebar = false }: PageShellProps) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    {hasSidebar && <Sidebar />}
    <main
      id="main-content"
      className={cn("flex-1 pt-16", hasSidebar && "md:pl-72")}
      tabIndex={-1}
    >
      {children}
    </main>
    <div className={cn(hasSidebar && "md:pl-72")}>
      <Footer />
    </div>
  </div>
);
