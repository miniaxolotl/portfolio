import { cn } from "@/lib/utils";

interface HeaderIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export const HeaderIconButton = ({ icon, className, ...props }: HeaderIconButtonProps) => (
  <button
    type="button"
    className={cn(
      "inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-accent hover:text-accent-foreground active:bg-accent/80 transition-colors",
      className,
    )}
    style={{ touchAction: "manipulation" }}
    {...props}
  >
    {icon}
  </button>
);
