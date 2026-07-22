"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, UserPlus, X, Lock } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teamForStore, type TeamMember, type TeamRole } from "@/lib/mock/team";
import { getCurrentPlan } from "@/lib/mock/account";
import { cn } from "@/lib/utils";

const roleStyles: Record<TeamRole, string> = {
  Owner: "border-success/30 bg-success-muted text-success",
  Admin: "border-border bg-secondary text-foreground",
  Editor: "border-border bg-muted text-muted-foreground",
};

function initialsFrom(email: string) {
  return email.slice(0, 2).toUpperCase();
}

export default function StoreTeamPage() {
  const { slug } = useParams<{ slug: string }>();
  const plan = getCurrentPlan();
  const [members, setMembers] = useState<TeamMember[]>(() => teamForStore(slug));
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamRole>("Editor");

  const atLimit = members.length >= plan.maxTeamMembers;
  const seatLabel = Number.isFinite(plan.maxTeamMembers) ? `${members.length} of ${plan.maxTeamMembers}` : `${members.length}`;

  const sendInvite = () => {
    const email = inviteEmail.trim();
    if (!email || atLimit) return;
    const newMember: TeamMember = {
      id: `tm-new-${Date.now()}`,
      storeSlug: slug,
      name: email.split("@")[0],
      email,
      role: inviteRole,
      initials: initialsFrom(email),
    };
    setMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    toast.success("Invite sent", { description: `${email} will get an email to join this store.` });
  };

  const removeMember = (member: TeamMember) => {
    setMembers((prev) => prev.filter((m) => m.id !== member.id));
    toast.info("Member removed", { description: `${member.name} no longer has access to this store.` });
  };

  return (
    <StoreScopedPage slug={slug}>
      {() => (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-lg font-medium">Team</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Invite people to help manage this store. Seats are shared across your plan.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" dir="ltr">{seatLabel} seats used</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{plan.name} plan</p>
              </div>
              {atLimit && (
                <Button variant="outline" size="sm" render={<Link href="/pricing" />}>
                  Upgrade plan
                </Button>
              )}
            </div>
            {Number.isFinite(plan.maxTeamMembers) && (
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full transition-all", atLimit ? "bg-destructive" : "bg-success")}
                  style={{ width: `${Math.min(100, (members.length / plan.maxTeamMembers) * 100)}%` }}
                />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            {atLimit ? (
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Lock className="size-4 shrink-0" strokeWidth={1.5} />
                You&apos;ve reached the team limit for the {plan.name} plan.{" "}
                <Link href="/pricing" className="text-foreground underline-offset-2 hover:underline">
                  Upgrade
                </Link>{" "}
                to invite more people.
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3">
                  <Mail className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                  <Input
                    placeholder="teammate@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
                  />
                </div>
                <Select value={inviteRole} onValueChange={(value) => value && setInviteRole(value as TeamRole)}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="gap-1.5" disabled={!inviteEmail.trim()} onClick={sendInvite}>
                  <UserPlus className="size-4" strokeWidth={1.5} />
                  Send invite
                </Button>
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <div className="flex flex-col divide-y divide-border">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between gap-3 bg-card p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{member.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-medium", roleStyles[member.role])}>
                      {member.role}
                    </span>
                    {member.role !== "Owner" && (
                      <button
                        type="button"
                        onClick={() => removeMember(member)}
                        className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Remove ${member.name}`}
                      >
                        <X className="size-4" strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </StoreScopedPage>
  );
}
