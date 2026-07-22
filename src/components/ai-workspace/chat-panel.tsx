"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowUp, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getCannedResponse, type ChatMessage } from "@/lib/mock/ai-workspace";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/locale-provider";

const suggestions = [
  "Enable reviews and ratings",
  "Change the accent color to navy",
  "Add a 20% launch discount",
];

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

function AiAvatar() {
  return (
    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success-muted text-success">
      <Sparkles className="size-3.5" strokeWidth={1.5} />
    </div>
  );
}

export function ChatPanel({
  storeName,
  conversationId,
  messages,
  setMessages,
}: {
  storeName: string;
  conversationId: string;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}) {
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { dict } = useLocale();
  const t = dict.aiWorkspace;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: trimmed }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const { response, task, patch } = getCannedResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "ai",
          text: response,
          tasks: [{ id: nextId(), label: task, status: "done" }],
          patch,
        },
      ]);
      setThinking(false);
    }, 1100 + Math.random() * 500);
  };

  const isEmpty = messages.length === 0 && !thinking;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <Sparkles className="size-4 text-muted-foreground" strokeWidth={1.5} />
        <span className="text-sm font-medium">{t.workingOn.replace("{store}", storeName)}</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-success-muted text-success">
              <Sparkles className="size-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-base font-medium">{t.emptyTitle.replace("{store}", storeName)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.emptySubtitle}</p>
            </div>
            <div className="flex max-w-md flex-wrap justify-center gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={conversationId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mx-auto flex w-full max-w-2xl flex-col gap-6"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(i * 0.04, 0.3) }}
                  className={cn("flex gap-3", m.role === "user" && "justify-end")}
                >
                  {m.role === "ai" && <AiAvatar />}
                  <div className={cn("flex min-w-0 max-w-[85%] flex-col gap-2.5", m.role === "user" && "items-end")}>
                    {m.role === "ai" && m.thinking && (
                      <p className="text-xs leading-relaxed text-muted-foreground/60 italic">{m.thinking}</p>
                    )}
                    <div
                      className={cn(
                        "text-sm leading-relaxed",
                        m.role === "user" ? "rounded-2xl bg-muted px-3.5 py-2 text-foreground" : "text-foreground"
                      )}
                    >
                      {m.text}
                    </div>
                    {m.tasks && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                        className="flex flex-col gap-1"
                      >
                        {m.tasks.map((t) => (
                          <div key={t.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle2 className="size-3 shrink-0 text-success" strokeWidth={1.5} />
                            {t.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}

              {thinking && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <AiAvatar />
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Loader2 className="size-3.5 animate-spin" strokeWidth={1.5} />
                    Thinking…
                  </span>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="border-t border-border p-4">
        <div className="mx-auto flex w-full max-w-2xl items-end gap-2 rounded-2xl bg-muted/60 p-2 transition-colors focus-within:bg-muted">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder={t.inputPlaceholder}
            rows={1}
            className="max-h-32 min-h-9 resize-none border-none bg-transparent px-2.5 py-2 shadow-none focus-visible:ring-0"
          />
          <Button
            size="icon"
            className="shrink-0 rounded-full"
            onClick={() => send(input)}
            disabled={thinking || !input.trim()}
          >
            <ArrowUp className="size-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
