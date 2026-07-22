"use client";

import { useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { notifications as initialNotifications, type AppNotification, type NotificationKind } from "@/lib/mock/notifications";
import { cn } from "@/lib/utils";

const iconMap: Record<NotificationKind, typeof CheckCircle2> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const colorMap: Record<NotificationKind, string> = {
  success: "text-success",
  warning: "text-foreground",
  error: "text-destructive",
  info: "text-muted-foreground",
};

export default function NotificationsPage() {
  const [items, setItems] = useState<AppNotification[]>(initialNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const groups = ["Today", "This week", "Earlier"] as const;

  return (
    <Container className="max-w-none px-6 py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">{unreadCount} unread</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
        >
          <CheckCheck className="size-4" strokeWidth={1.5} />
          Mark all as read
        </Button>
      </div>

      <div className="mt-6 flex max-w-2xl flex-col gap-8">
        {groups.map((group) => {
          const groupItems = items.filter((n) => n.group === group);
          if (groupItems.length === 0) return null;
          return (
            <div key={group}>
              <h2 className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">{group}</h2>
              <div className="flex flex-col divide-y divide-border overflow-hidden rounded-2xl border border-border">
                {groupItems.map((n) => {
                  const Icon = iconMap[n.kind];
                  return (
                    <button
                      key={n.id}
                      onClick={() => setItems((prev) => prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)))}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3.5 text-start transition-colors hover:bg-card",
                        n.read ? "bg-background" : "bg-card"
                      )}
                    >
                      <Icon className={cn("mt-0.5 size-4 shrink-0", colorMap[n.kind])} strokeWidth={1.5} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm">{n.title}</p>
                          {!n.read && <span className="size-1.5 shrink-0 rounded-full bg-success" />}
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{n.description}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground" dir="ltr">{n.time}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
