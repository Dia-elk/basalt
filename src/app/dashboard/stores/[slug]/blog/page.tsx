"use client";

import { useParams } from "next/navigation";
import { Newspaper, Eye, FileEdit } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell, StatGrid, ListCard } from "@/components/dashboard/feature-page-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { generateBlogPosts } from "@/lib/mock/store-features";
import { cn } from "@/lib/utils";

export default function StoreBlogPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => {
        const posts = generateBlogPosts(store);
        const published = posts.filter((p) => p.status === "published");
        const totalViews = posts.reduce((sum, p) => sum + p.views, 0);

        return (
          <FeaturePageShell title="Blog" description="Articles that build an audience and help search ranking over time.">
            <div className="flex flex-col gap-5">
              <StatGrid>
                <KpiCard label="Published posts" value={published.length.toString()} icon={Newspaper} />
                <KpiCard label="Total views" value={totalViews.toLocaleString()} icon={Eye} />
                <KpiCard label="Drafts" value={(posts.length - published.length).toString()} icon={FileEdit} />
              </StatGrid>
              <ListCard>
                {posts.map((post) => (
                  <div key={post.title} className="flex items-center justify-between gap-3 bg-card p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm">{post.title}</p>
                      <p className="text-xs text-muted-foreground" dir="ltr">
                        {post.status === "published" ? `Published ${post.publishedAt}` : "Draft"}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {post.status === "published" && (
                        <span className="text-xs text-muted-foreground" dir="ltr">
                          {post.views.toLocaleString()} views
                        </span>
                      )}
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                          post.status === "published"
                            ? "border-success/30 bg-success-muted text-success"
                            : "border-border bg-muted text-muted-foreground"
                        )}
                      >
                        {post.status === "published" ? "Published" : "Draft"}
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
