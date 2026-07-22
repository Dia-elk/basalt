import { cn } from "@/lib/utils";

export function UsageMeter({
  label,
  icon: Icon,
  used,
  total,
  unit = "",
  suffix,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  used: number;
  total?: number;
  unit?: string;
  suffix?: string;
}) {
  const pct = total ? Math.min(100, Math.round((used / total) * 100)) : used;
  const nearLimit = pct >= 85;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Icon className="size-4 text-muted-foreground" strokeWidth={1.5} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-semibold" dir="ltr">
          {used.toLocaleString()}
          {unit}
        </span>
        {total !== undefined && (
          <span className="text-xs text-muted-foreground" dir="ltr">
            / {total.toLocaleString()}
            {unit} {suffix}
          </span>
        )}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", nearLimit ? "bg-destructive" : "bg-success")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
