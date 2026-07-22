"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Rocket, RotateCcw, History, Eye, Plus, PanelLeft, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ChatPanel } from "@/components/ai-workspace/chat-panel";
import { conversationHistory, type ChatMessage, type Conversation, type PreviewPatch } from "@/lib/mock/ai-workspace";
import type { Store } from "@/lib/mock/stores";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";

const BASE_VERSION = 482;

function derivePreviewState(messages: ChatMessage[]): Required<Pick<PreviewPatch, "features">> & Omit<PreviewPatch, "features"> {
  return messages.reduce<Required<Pick<PreviewPatch, "features">> & Omit<PreviewPatch, "features">>(
    (acc, m) => {
      if (!m.patch) return acc;
      return {
        features: m.patch.features ? Array.from(new Set([...acc.features, ...m.patch.features])) : acc.features,
        banner: m.patch.banner ?? acc.banner,
        accent: m.patch.accent ?? acc.accent,
      };
    },
    { features: [] }
  );
}

let newChatCounter = 0;

export function AiWorkspace({ store }: { store: Store }) {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>(conversationHistory);
  const [activeId, setActiveId] = useState(conversationHistory[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(conversationHistory[0].messages);
  const [approved, setApproved] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const { dict } = useLocale();
  const t = dict.aiWorkspace;

  useEffect(() => {
    setConversations((prev) => prev.map((c) => (c.id === activeId ? { ...c, messages } : c)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const previewState = useMemo(() => derivePreviewState(messages), [messages]);
  const version = useMemo(
    () => BASE_VERSION + messages.filter((m) => m.role === "ai" && m.tasks && m.tasks.length > 0).length,
    [messages]
  );

  const handleApprove = () => {
    setApproved(true);
    toast.success("Changes are now live", {
      description: `${store.domain} has been updated for your customers.`,
    });
  };

  const handleRollback = () => {
    setApproved(false);
    toast.info("Rolled back to the previous version", {
      description: `Version #${version - 1} is now showing in preview.`,
    });
  };

  const switchConversation = (id: string) => {
    setHistoryOpen(false);
    if (id === activeId) return;
    setActiveId(id);
    setMessages(conversations.find((c) => c.id === id)?.messages ?? []);
  };

  const startNewChat = () => {
    setHistoryOpen(false);
    newChatCounter += 1;
    const id = `new-${newChatCounter}`;
    const conversation: Conversation = { id, title: t.newChat, updatedAt: "Just now", messages: [] };
    setConversations((prev) => [conversation, ...prev]);
    setActiveId(id);
    setMessages([]);
  };

  const openPreview = () => {
    const params = new URLSearchParams();
    params.set("v", String(version));
    if (previewState.features.length) params.set("features", previewState.features.join(","));
    if (previewState.banner) params.set("banner", previewState.banner);
    if (previewState.accent) params.set("accent", previewState.accent);
    router.push(`/dashboard/stores/${store.slug}/ai-workspace/preview?${params.toString()}`);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-3">
        <div className="flex min-w-0 shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
            render={<Link href={`/dashboard/stores/${store.slug}`} />}
          >
            <LayoutDashboard className="size-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">{t.overview}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
            onClick={() => setHistoryOpen(true)}
          >
            <PanelLeft className="size-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">{t.history}</span>
          </Button>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            render={<Link href={`/dashboard/stores/${store.slug}/deployments`} />}
          >
            <History className="size-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">{t.deployments}</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={handleRollback}>
            <RotateCcw className="size-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">{t.rollback}</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={openPreview}>
            <Eye className="size-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">{t.preview}</span>
          </Button>
          <Button size="sm" className="gap-1.5" disabled={approved} onClick={handleApprove}>
            <Rocket className="size-3.5" strokeWidth={1.5} />
            {approved ? t.published : t.deploy}
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ChatPanel storeName={store.name} conversationId={activeId} messages={messages} setMessages={setMessages} />
      </div>

      <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0">
          <SheetTitle className="sr-only">{t.history}</SheetTitle>
          <SheetDescription className="sr-only">{t.recent}</SheetDescription>
          <div className="p-3">
            <Button variant="outline" className="w-full justify-start gap-2" onClick={startNewChat}>
              <Plus className="size-4" strokeWidth={1.5} />
              {t.newChat}
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-3">
            <p className="px-2.5 pt-1 pb-1.5 text-[11px] font-medium text-muted-foreground">{t.recent}</p>
            <div className="flex flex-col gap-0.5">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => switchConversation(c.id)}
                  className={cn(
                    "flex flex-col items-start gap-0.5 rounded-lg px-2.5 py-2 text-start transition-colors duration-150",
                    c.id === activeId ? "bg-accent" : "hover:bg-accent/60"
                  )}
                >
                  <span className="w-full truncate text-xs font-medium text-foreground">{c.title}</span>
                  <span className="text-[11px] text-muted-foreground">{c.updatedAt}</span>
                </button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
