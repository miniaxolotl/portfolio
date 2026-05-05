import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";
import { RxDiscordLogo } from "react-icons/rx";

const iconComponents: Record<string, React.ComponentType<{ size?: number }>> = {
  LuGithub,
  LuLinkedin,
  LuMail,
  RxDiscordLogo,
};

interface SocialIconProps {
  iconName: string;
  size?: number;
}

export const SocialIcon = ({ iconName, size = 16 }: SocialIconProps) => {
  const Icon = iconComponents[iconName];
  if (!Icon) return null;
  return <Icon size={size} aria-hidden="true" />;
};

export { iconComponents };
