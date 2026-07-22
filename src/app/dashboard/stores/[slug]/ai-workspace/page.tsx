"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AiWorkspace } from "@/components/ai-workspace/ai-workspace";
import { useStore } from "@/hooks/use-store";

export default function StoreAiWorkspacePage() {
  const { slug } = useParams<{ slug: string }>();
  const { store, loading } = useStore(slug);

  if (loading) {
    return (
      <div className="p-5">
        <Skeleton className="h-8 w-64" />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex flex-col items-center gap-4 p-16 text-center">
        <p className="text-lg font-medium">Store not found</p>
        <Button render={<Link href="/dashboard" />}>Back to Stores</Button>
      </div>
    );
  }

  return (
    <div className="h-full">
      <AiWorkspace store={store} />
    </div>
  );
}
