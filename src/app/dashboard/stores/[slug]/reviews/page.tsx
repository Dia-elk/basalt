"use client";

import { useParams } from "next/navigation";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { EmptyState } from "@/components/shared/empty-state";
import { generateReviews } from "@/lib/mock/store-features";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("size-3.5", i < rating ? "fill-warning text-warning" : "text-muted-foreground/30")}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function StoreReviewsPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const reviews = generateReviews(store);
        const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
        const fiveStar = reviews.filter((r) => r.rating === 5).length;

        return (
          <FeaturePageShell title="Reviews" description="Customer ratings and feedback across every product.">
            {reviews.length > 0 ? (
              <div className="flex flex-col gap-5">
                <StatGrid>
                  <KpiCard label="Average rating" value={avgRating.toFixed(1)} icon={Star} />
                  <KpiCard label="Total reviews" value={reviews.length.toString()} icon={MessageSquare} />
                  <KpiCard label="5-star reviews" value={`${Math.round((fiveStar / reviews.length) * 100)}%`} icon={ThumbsUp} />
                </StatGrid>
                <ListCard>
                  {reviews.map((review) => (
                    <div key={review.id} className="flex flex-col gap-2 bg-card p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <p className="text-sm font-medium">{review.author}</p>
                          <Stars rating={review.rating} />
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground" dir="ltr">
                          {review.postedAt}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">&ldquo;{review.quote}&rdquo;</p>
                      <p className="text-xs text-muted-foreground">On {review.productName}</p>
                    </div>
                  ))}
                </ListCard>
              </div>
            ) : (
              <EmptyState icon={Star} title="No reviews yet" description="Reviews will appear here once customers start rating their orders." />
            )}
          </FeaturePageShell>
        );
      }}
    </StoreScopedPage>
  );
}
