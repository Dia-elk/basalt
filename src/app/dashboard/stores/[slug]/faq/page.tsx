"use client";

import { useParams } from "next/navigation";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, ListCard } from "@/components/dashboard/feature-page-shell";
import { generateFaqEntries } from "@/lib/mock/store-features";

export default function StoreFaqPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const entries = generateFaqEntries(store);

        return (
          <FeaturePageShell title="FAQ" description="Answers shown to customers before they need to contact support.">
            <ListCard>
              {entries.map((entry) => (
                <div key={entry.question} className="flex flex-col gap-1.5 bg-card p-4">
                  <p className="text-sm font-medium">{entry.question}</p>
                  <p className="text-sm text-muted-foreground">{entry.answer}</p>
                </div>
              ))}
            </ListCard>
          </FeaturePageShell>
        );
      }}
    </StoreScopedPage>
  );
}
