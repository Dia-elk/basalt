"use client";

import { useParams } from "next/navigation";
import { Award, Users, Star } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { generateLoyaltyMembers, type LoyaltyTier } from "@/lib/mock/store-features";
import { cn } from "@/lib/utils";

const tierStyles: Record<LoyaltyTier, string> = {
  Gold: "border-warning/30 bg-warning-muted text-warning",
  Silver: "border-border bg-secondary text-foreground",
  Bronze: "border-border bg-muted text-muted-foreground",
};

export default function StoreLoyaltyPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const members = generateLoyaltyMembers(store);
        const totalPoints = members.reduce((sum, m) => sum + m.points, 0);
        const goldMembers = members.filter((m) => m.tier === "Gold").length;

        return (
          <FeaturePageShell title="Loyalty" description="Points and tiers that keep customers coming back.">
            <div className="flex flex-col gap-5">
              <StatGrid>
                <KpiCard label="Members enrolled" value={members.length.toString()} icon={Users} />
                <KpiCard label="Points issued" value={totalPoints.toLocaleString()} icon={Award} />
                <KpiCard label="Gold members" value={goldMembers.toString()} icon={Star} />
              </StatGrid>
              <ListCard>
                {members.map((member) => (
                  <div key={member.email} className="flex items-center justify-between gap-3 bg-card p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm">{member.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground" dir="ltr">
                        {member.points.toLocaleString()} pts
                      </span>
                      <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-medium", tierStyles[member.tier])}>
                        {member.tier}
                      </span>
                    </div>
                  </div>
                ))}
              </ListCard>
            </div>
          </FeaturePageShell>
        );
      }}
    </StoreScopedPage>
  );
}
