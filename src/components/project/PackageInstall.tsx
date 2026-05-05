import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PackageInstallProps {
  npmPackage?: string | null;
  dockerImage?: string;
}

const tabs = [
  { id: "bun", label: "bun", cmd: "add" },
  { id: "npm", label: "npm", cmd: "install" },
  { id: "pnpm", label: "pnpm", cmd: "add" },
  { id: "docker", label: "docker", cmd: "run -d" },
];

export const PackageInstall = ({
  npmPackage,
  dockerImage,
}: PackageInstallProps) => {
  const [activeTab, setActiveTab] = useState(() => {
    if (npmPackage) return "bun";
    if (dockerImage) return "docker";
    return "bun";
  });
  const [copied, setCopied] = useState(false);

  const installCommands: Record<string, string> = {
    bun: npmPackage ? `bun add ${npmPackage}` : "",
    npm: npmPackage ? `npm install ${npmPackage}` : "",
    pnpm: npmPackage ? `pnpm add ${npmPackage}` : "",
    docker: dockerImage ? `docker run -d ${dockerImage}` : "",
  };

  const availableTabs = tabs.filter(
    (tab) => tab.id === "docker" || (npmPackage && installCommands[tab.id]),
  );

  const command = installCommands[activeTab];
  const tabMeta = tabs.find((t) => t.id === activeTab);

  const handleCopy = async () => {
    if (!command) return;
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border bg-muted overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border bg-muted/50">
        {availableTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2.5 text-xs font-mono font-medium transition-colors",
              activeTab === tab.id
                ? "bg-background text-foreground border-b-2 border-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="px-5 py-4 flex items-center justify-between gap-4 bg-background">
        <pre className="flex-1 overflow-x-auto">
          <code className="text-sm font-mono leading-relaxed">
            {tabMeta && (
              <>
                <span className="text-accent">{tabMeta.label}</span>
                <span className="text-foreground"> </span>
                <span className="text-primary">{tabMeta.cmd}</span>
                <span className="text-foreground"> </span>
                <span className="text-secondary-foreground">
                  {npmPackage ?? dockerImage}
                </span>
              </>
            )}
          </code>
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "shrink-0 p-2 rounded-md transition-colors",
            copied
              ? "text-accent bg-accent/10"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
          aria-label={copied ? "Copied" : "Copy command"}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};
