import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CompactFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const CompactFeatureCard = ({
  icon: Icon,
  title,
  description,
}: CompactFeatureCardProps) => (
  <Card variant="filled" className="h-full">
    <CardContent className="p-5">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-accent shrink-0">
          <Icon className="size-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-1.5">{title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);
