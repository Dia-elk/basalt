"use client";

import { Cpu, MemoryStick, HardDrive, Gauge, Sparkles, Rocket } from "lucide-react";
import { Container } from "@/components/shared/container";
import { UsageMeter } from "@/components/dashboard/usage-meter";
import { CreditsChart } from "@/components/dashboard/credits-chart";
import { accountResourceUsage, aiCreditsTotal, generateCreditsSeries } from "@/lib/mock/resource-usage";
import { useLocale } from "@/lib/i18n/locale-provider";

export default function ResourceUsagePage() {
  const usage = accountResourceUsage;
  const creditsSeries = generateCreditsSeries(14);
  const { dict } = useLocale();
  const t = dict.dashboardResourceUsage;

  return (
    <Container className="max-w-none px-6 py-6 lg:px-8">
      <h1 className="text-2xl font-medium">{t.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t.subtitle}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <UsageMeter label={t.cpu} icon={Cpu} used={usage.cpuPercent} unit="%" />
        <UsageMeter label={t.memory} icon={MemoryStick} used={usage.memoryPercent} unit="%" />
        <UsageMeter label={t.storage} icon={HardDrive} used={usage.storageUsedGb} total={usage.storageTotalGb} unit=" GB" />
        <UsageMeter label={t.bandwidth} icon={Gauge} used={usage.bandwidthPercent} unit="%" suffix={t.thisMonth} />
        <UsageMeter label={t.aiCredits} icon={Sparkles} used={usage.aiCreditsUsed} total={aiCreditsTotal} suffix={t.perMonth} />
        <UsageMeter label={t.deployments} icon={Rocket} used={usage.deploymentsThisMonth} suffix={t.thisMonth} />
      </div>

      <div className="mt-5 rounded-2xl border border-border bg-card p-4">
        <div className="mb-2">
          <h3 className="text-sm font-medium">{t.creditUsageTitle}</h3>
          <p className="text-xs text-muted-foreground">{t.creditUsageSubtitle}</p>
        </div>
        <CreditsChart data={creditsSeries} />
      </div>
    </Container>
  );
}
