import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ResumeButton = () => (
  <Button size="sm" className="w-full" asChild>
    <a
      href="/resume.pdf"
      download
      className="flex items-center justify-center gap-2"
      aria-label="Download resume PDF"
    >
      <Download size={16} aria-hidden="true" />
      <span>Download Resume</span>
    </a>
  </Button>
);
