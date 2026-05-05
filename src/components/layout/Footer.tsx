import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 px-6 text-center text-sm text-muted-foreground border-t border-border/50">
      <p className="flex items-center justify-center gap-1">
        Made with <Heart size={14} className="text-red-500" /> by Elias Mawa
      </p>
    </footer>
  );
};
