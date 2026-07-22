import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: number;
  icon?: typeof ArrowUpRight;
}) {
  const positive = (change ?? 0) >= 0;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        {Icon && <Icon className="size-4 text-muted-foreground" strokeWidth={1.5} />}
      </div>
      <span className="text-2xl font-semibold">{value}</span>
      {change !== undefined && (
        <span
          className={cn(
            "inline-flex w-fit items-center gap-1 text-xs font-medium",
            positive ? "text-success" : "text-destructive"
          )}
        >
          {positive ? (
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          ) : (
            <ArrowDownRight className="size-3.5" strokeWidth={1.5} />
          )}
          {Math.abs(change).toFixed(1)}% vs last month
        </span>
      )}
    </div>
  );
}
