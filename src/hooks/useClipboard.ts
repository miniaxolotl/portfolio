import { useCallback, useState } from "react";

export const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors (non-HTTPS, denied permission, etc.)
    }
  }, []);

  return { copied, copy };
};
