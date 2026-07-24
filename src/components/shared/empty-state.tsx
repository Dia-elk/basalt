import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable empty-state panel: icon + title + description, optionally an action.
 * Used across the commerce pages (orders, products, customers) and the builder
 * canvas for their "no data yet" states.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: typeof PackageOpen;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  const IconComponent = Icon ?? PackageOpen;
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-card p-14 text-center",
        className
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <IconComponent className="size-5" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
