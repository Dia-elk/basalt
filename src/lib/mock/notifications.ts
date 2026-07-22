export type NotificationKind = "success" | "warning" | "error" | "info";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  description: string;
  time: string;
  read: boolean;
  group: "Today" | "This week" | "Earlier";
}

export const notifications: AppNotification[] = [
  {
    id: "n1",
    kind: "success",
    title: "Update published",
    description: "lumiere.buildonbasalt.com is now live with your latest changes.",
    time: "2 minutes ago",
    read: false,
    group: "Today",
  },
  {
    id: "n2",
    kind: "warning",
    title: "AI Workspace needs your approval",
    description: "Northfield Furniture Co. has a preview waiting for your review.",
    time: "3 hours ago",
    read: false,
    group: "Today",
  },
  {
    id: "n3",
    kind: "error",
    title: "Update failed",
    description: "The Reading Room's latest update failed. Bundle pricing couldn't be applied.",
    time: "20 minutes ago",
    read: false,
    group: "Today",
  },
  {
    id: "n4",
    kind: "error",
    title: "Domain security issue",
    description: "readingroom.ae couldn't be verified. Check your domain settings.",
    time: "Yesterday",
    read: true,
    group: "This week",
  },
  {
    id: "n5",
    kind: "info",
    title: "New feature: Product Bundles",
    description: "You can now turn on product bundles from any store's Settings tab.",
    time: "2 days ago",
    read: true,
    group: "This week",
  },
  {
    id: "n6",
    kind: "info",
    title: "Your invoice is ready",
    description: "INV-2026-0701 for $99.00 has been generated.",
    time: "3 weeks ago",
    read: true,
    group: "Earlier",
  },
  {
    id: "n7",
    kind: "success",
    title: "Domain connected",
    description: "circuitsons.com was successfully verified and connected.",
    time: "1 month ago",
    read: true,
    group: "Earlier",
  },
];
