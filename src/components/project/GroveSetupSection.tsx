import { TabbedTerminal } from "@/components/project/TabbedTerminal";

const clients = ["opencode", "claude", "codex"].map((client) => ({
  id: client,
  label: client,
  code: `grove init --client ${client} --url https://api.usegrove.cloud\ngrove status --client ${client} --json`,
}));

export const GroveSetupSection = () => (
  <div className="space-y-5">
    <p className="text-sm leading-relaxed text-muted-foreground">
      After installing the client, choose your agent. Complete browser sign-in
      and approve its connection. Self-hosted users can substitute their own API
      origin.
    </p>
    <TabbedTerminal tabs={clients} defaultTab="opencode" />
    <p className="text-sm leading-relaxed text-muted-foreground">
      Self-hosting uses the API, worker, and PostgreSQL together, with a
      dedicated authentication configuration. Follow the current guides for
      configuration and migrations.
    </p>
    <div className="flex flex-wrap gap-4 text-sm">
      <a
        className="min-h-11 inline-flex items-center underline underline-offset-4"
        href="https://usegrove.cloud/install"
        target="_blank"
        rel="noopener noreferrer"
      >
        Installation guide ↗
      </a>
      <a
        className="min-h-11 inline-flex items-center underline underline-offset-4"
        href="https://github.com/miniaxolotl/grove/blob/HEAD/documentation/deploy.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        Self-hosting reference ↗
      </a>
    </div>
  </div>
);
