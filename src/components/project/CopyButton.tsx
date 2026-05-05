"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClipboard } from "@/hooks/useClipboard";

interface CopyButtonProps {
  text: string;
  "aria-label"?: string;
  className?: string;
}

export const CopyButton = ({
  text,
  "aria-label": ariaLabel = "Copy command",
  className,
}: CopyButtonProps) => {
  const { copied, copy } = useClipboard();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => copy(text)}
      aria-label={ariaLabel}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </Button>
  );
};
