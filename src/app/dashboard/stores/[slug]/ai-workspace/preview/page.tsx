"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Monitor, Smartphone } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

type Device = "desktop" | "mobile";

export default function AiWorkspacePreviewPage() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { store, loading } = useStore(slug);
  const [device, setDevice] = useState<Device>("desktop");

  const previewUrl = `/preview/${slug}?${searchParams.toString()}`;

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="grid grid-cols-3 items-center border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={() => router.push(`/dashboard/stores/${slug}/ai-workspace`)}
          className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" strokeWidth={1.5} />
          {loading ? <Skeleton className="h-4 w-20" /> : store?.name}
        </button>

        <Logo className="mx-auto" />

        <div className="flex items-center justify-end gap-1 justify-self-end rounded-lg border border-border p-1">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            aria-label="Desktop preview"
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-md transition-colors",
              device === "desktop" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Monitor className="size-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            aria-label="Mobile preview"
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-md transition-colors",
              device === "mobile" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Smartphone className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-y-auto bg-muted/30 p-6">
        <div
          className={cn(
            "h-full overflow-hidden border border-border bg-background shadow-2xl shadow-black/40 transition-all duration-300",
            device === "desktop" ? "w-full rounded-xl" : "w-[390px] rounded-[2.5rem] border-[6px] border-foreground/20 p-1.5"
          )}
        >
          <iframe
            key={`${previewUrl}-${device}`}
            src={previewUrl}
            title="Store preview"
            className={cn("h-full w-full border-0 bg-background", device === "mobile" && "rounded-[2rem]")}
          />
        </div>
      </div>
    </div>
  );
}
