"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, Download, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { invoices, creditPacks } from "@/lib/mock/billing";
import { accountResourceUsage, aiCreditsTotal } from "@/lib/mock/resource-usage";
import { stores } from "@/lib/mock/stores";
import { useLocale } from "@/lib/i18n/locale-provider";

export default function BillingPage() {
  const [selectedPack, setSelectedPack] = useState(creditPacks[1]);
  const creditsUsed = accountResourceUsage.aiCreditsUsed;
  const { dict } = useLocale();
  const t = dict.dashboardBilling;

  return (
    <Container className="max-w-none px-6 py-6 lg:px-8">
      <h1 className="text-2xl font-medium">{t.title}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t.subtitle}</p>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{t.currentPlan}</p>
                <p className="mt-1 text-2xl font-semibold">Professional</p>
              </div>
              <Button render={<a href="/pricing" />} variant="outline">
                {t.changePlan}
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground" dir="ltr">
              $99 / month · Renews on August 1, 2026 · 5 stores included
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium">{t.paymentMethod}</h2>
              <Dialog>
                <DialogTrigger render={<Button variant="outline" size="sm" />}>{t.update}</DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Update payment method</DialogTitle>
                    <DialogDescription>This is a demo, no real payment details are stored.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={() => toast.success("Payment method updated", { description: "Card ending in 4242 is now default." })}
                    >
                      Save card
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background">
                <CreditCard className="size-4.5 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm">Visa ending in 4242</p>
                <p className="text-xs text-muted-foreground">Expires 08/2028</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-medium">{t.invoices}</h2>
            <div className="flex flex-col divide-y divide-border">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p>{inv.description}</p>
                    <p className="text-xs text-muted-foreground" dir="ltr">{inv.date} · {inv.id}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-success/30 bg-success-muted px-2 py-0.5 text-xs text-success">
                      {inv.status}
                    </span>
                    <span className="font-mono text-xs">${inv.amount}</span>
                    <button
                      onClick={() => toast.info("Downloading invoice", { description: `${inv.id}.pdf` })}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Download invoice"
                    >
                      <Download className="size-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-medium">{t.aiCreditsCard}</h2>
              <Sparkles className="size-4 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-2xl font-semibold">
              {creditsUsed} <span className="text-sm text-muted-foreground">/ {aiCreditsTotal}</span>
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-success"
                style={{ width: `${Math.min(100, Math.round((creditsUsed / aiCreditsTotal) * 100))}%` }}
              />
            </div>

            <Dialog>
              <DialogTrigger render={<Button className="mt-4 w-full" />}>{t.buyExtraCredits}</DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>{t.buyExtraCredits}</DialogTitle>
                  <DialogDescription>Credits never expire and roll over each month.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 py-2">
                  {creditPacks.map((pack) => (
                    <button
                      key={pack.credits}
                      onClick={() => setSelectedPack(pack)}
                      className={`flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                        selectedPack.credits === pack.credits ? "border-foreground/30 bg-background" : "border-border hover:bg-background"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {selectedPack.credits === pack.credits && <Check className="size-4 text-success" strokeWidth={1.5} />}
                        {pack.credits.toLocaleString()} credits
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">${pack.price}</span>
                    </button>
                  ))}
                </div>
                <DialogFooter>
                  <Button
                    onClick={() =>
                      toast.success("Credits added", {
                        description: `${selectedPack.credits.toLocaleString()} AI credits have been added to your account.`,
                      })
                    }
                  >
                    Purchase for ${selectedPack.price}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-3 text-sm font-medium">{t.planUsage}</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t.stores}</span>
                <span dir="ltr">{stores.length} / 5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t.customDomains}</span>
                <span dir="ltr">6 / 5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t.support}</span>
                <span>Priority email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
