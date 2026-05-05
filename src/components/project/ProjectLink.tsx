type IconComponent = (props: {
  size?: number;
  className?: string;
}) => React.ReactNode;

interface ProjectLinkProps {
  href: string;
  icon: IconComponent;
  label: string;
}

const ensureProtocol = (url: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

export const ProjectLink = ({ href, icon: Icon, label }: ProjectLinkProps) => (
  <a
    href={ensureProtocol(href)}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md hover:bg-muted transition-colors"
  >
    <Icon size={12} />
    <span>{label}</span>
  </a>
);
