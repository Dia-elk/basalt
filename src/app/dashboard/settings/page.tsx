"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Container } from "@/components/shared/container";

const notificationPrefs = [
  { id: "email-deploy", label: "Deployment alerts", description: "Get notified when a deployment succeeds or fails.", defaultChecked: true },
  { id: "email-ai", label: "AI Workspace approvals", description: "Get notified when a preview is ready for review.", defaultChecked: true },
  { id: "email-billing", label: "Billing & invoices", description: "Receipts and renewal reminders.", defaultChecked: true },
  { id: "email-product", label: "Product updates", description: "New features and platform announcements.", defaultChecked: false },
];

export default function AccountSettingsPage() {
  const [name, setName] = useState("Amina Kader");
  const [email, setEmail] = useState("amina@lumiereparfums.com");

  return (
    <Container className="max-w-none px-6 py-6 lg:px-8">
      <h1 className="text-2xl font-medium">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your account preferences and security.</p>

      <div className="mt-6 flex max-w-2xl flex-col gap-5">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium">Account</h2>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="account-name">Name</Label>
              <Input id="account-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="account-email">Email</Label>
              <Input id="account-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Button onClick={() => toast.success("Account updated")}>Save changes</Button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium">Security</h2>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input id="current-password" type="password" placeholder="••••••••" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
            <div>
              <Button variant="outline" onClick={() => toast.success("Password updated")}>
                Update password
              </Button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium">Notifications</h2>
          <div className="mt-4 flex flex-col gap-4">
            {notificationPrefs.map((pref) => (
              <div key={pref.id} className="flex items-center justify-between gap-4">
                <div>
                  <Label htmlFor={pref.id} className="font-normal">
                    {pref.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">{pref.description}</p>
                </div>
                <Switch id={pref.id} defaultChecked={pref.defaultChecked} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-medium">Appearance</h2>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm">Theme</p>
              <p className="text-xs text-muted-foreground">Basalt is currently dark mode only.</p>
            </div>
            <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
              Dark
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-destructive/30 bg-destructive/[0.03] p-5">
          <h2 className="text-sm font-medium text-destructive">Danger zone</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Deleting your account removes all stores, deployments, and billing history.
          </p>
          <Dialog>
            <DialogTrigger render={<Button variant="destructive" className="mt-4 gap-1.5" />}>
              <Trash2 className="size-4" strokeWidth={1.5} />
              Delete account
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Delete your account?</DialogTitle>
                <DialogDescription>
                  This is a demo environment, deletion is disabled so you can keep exploring.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => toast.info("Deletion disabled", { description: "This action is disabled in the demo." })}
                >
                  I understand, delete anyway
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </Container>
  );
}
