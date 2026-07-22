"use client";

import { CheckCircle2, Loader2, XCircle, Clock, Ban, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DeploymentStatus, AiStatus } from "@/lib/mock/stores";
import type { DeployStatus } from "@/lib/mock/deployments";
import type { DomainStatus } from "@/lib/mock/domains";
import { useLocale } from "@/lib/i18n/locale-provider";

export function StatusBadge({ status, className }: { status: DeploymentStatus; className?: string }) {
  const { dict } = useLocale();
  const t = dict.status;
  const config: Record<DeploymentStatus, { label: string; icon: typeof CheckCircle2; className: string; spin?: boolean }> = {
    active: { label: t.active, icon: CheckCircle2, className: "text-success bg-success-muted border-success/30" },
    building: { label: t.building, icon: Loader2, className: "text-muted-foreground bg-muted border-border", spin: true },
    failed: { label: t.failed, icon: XCircle, className: "text-destructive bg-destructive/10 border-destructive/30" },
    queued: { label: t.queued, icon: Clock, className: "text-muted-foreground bg-muted border-border" },
  };
  const { label, icon: Icon, className: badgeClassName, spin } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        badgeClassName,
        className
      )}
    >
      <Icon className={cn("size-3.5", spin && "animate-spin")} strokeWidth={1.5} />
      {label}
    </span>
  );
}

export function DeployStatusBadge({ status, className }: { status: DeployStatus; className?: string }) {
  const { dict } = useLocale();
  const t = dict.status;
  const config: Record<DeployStatus, { label: string; icon: typeof CheckCircle2; className: string; spin?: boolean }> = {
    Ready: { label: t.ready, icon: CheckCircle2, className: "text-success bg-success-muted border-success/30" },
    Building: { label: t.building, icon: Loader2, className: "text-muted-foreground bg-muted border-border", spin: true },
    Failed: { label: t.failed, icon: XCircle, className: "text-destructive bg-destructive/10 border-destructive/30" },
    Canceled: { label: t.canceled, icon: Ban, className: "text-muted-foreground bg-muted border-border" },
  };
  const { label, icon: Icon, className: badgeClassName, spin } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        badgeClassName,
        className
      )}
    >
      <Icon className={cn("size-3.5", spin && "animate-spin")} strokeWidth={1.5} />
      {label}
    </span>
  );
}

export function DomainStatusBadge({ status, className }: { status: DomainStatus; className?: string }) {
  const { dict } = useLocale();
  const t = dict.status;
  const config: Record<DomainStatus, { label: string; icon: typeof CheckCircle2; className: string; spin?: boolean }> = {
    Active: { label: t.active, icon: CheckCircle2, className: "text-success bg-success-muted border-success/30" },
    Pending: { label: t.pending, icon: Loader2, className: "text-muted-foreground bg-muted border-border", spin: true },
    Error: { label: t.error, icon: AlertTriangle, className: "text-destructive bg-destructive/10 border-destructive/30" },
  };
  const { label, icon: Icon, className: badgeClassName, spin } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        badgeClassName,
        className
      )}
    >
      <Icon className={cn("size-3.5", spin && "animate-spin")} strokeWidth={1.5} />
      {label}
    </span>
  );
}

export function AiStatusBadge({ status, className }: { status: AiStatus; className?: string }) {
  const { dict } = useLocale();
  const t = dict.status;
  const config: Record<AiStatus, { label: string; className: string }> = {
    idle: { label: t.idle, className: "text-muted-foreground bg-muted border-border" },
    working: { label: t.aiWorking, className: "text-success bg-success-muted border-success/30" },
    "needs-approval": { label: t.needsApproval, className: "text-foreground bg-accent border-border" },
  };
  const { label, className: badgeClassName } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        badgeClassName,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", status === "working" ? "bg-success" : "bg-muted-foreground")} />
      {label}
    </span>
  );
}
