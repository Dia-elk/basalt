"use client";

import { usePathname } from "next/navigation";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { StoreSidebar } from "@/components/dashboard/store-sidebar";
import { Topbar } from "@/components/dashboard/topbar";

function useStoreSlug() {
  const pathname = usePathname();
  const match = pathname.match(/^\/dashboard\/stores\/([^/]+)/);
  if (!match) return null;
  return match[1] === "new" ? null : match[1];
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const storeSlug = useStoreSlug();
  const isAiWorkspace = /^\/dashboard\/stores\/[^/]+\/ai-workspace/.test(pathname);
  const isAiWorkspacePreview = /^\/dashboard\/stores\/[^/]+\/ai-workspace\/preview/.test(pathname);
  const isFullPageFlow = isAiWorkspace || /^\/dashboard\/stores\/[^/]+\/domains\/buy/.test(pathname);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {!isFullPageFlow && (storeSlug ? <StoreSidebar slug={storeSlug} /> : <SidebarNav />)}
      <div className="flex flex-1 flex-col overflow-hidden">
        {!isAiWorkspacePreview && <Topbar storeSlug={storeSlug} />}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
