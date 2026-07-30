"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { BLOCK_LIBRARY, BLOCK_CATEGORIES, type BlockType, type BlockCategory } from "@/lib/mock/builder";
import { cn } from "@/lib/utils";

export function ComponentLibrary({ onAdd }: { onAdd: (type: BlockType) => void }) {
  const [activeCategory, setActiveCategory] = useState<BlockCategory>("Layout");
  const items = BLOCK_LIBRARY.filter((b) => b.category === activeCategory);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="text-sm font-medium">Components</h3>
        <p className="mt-1 text-xs text-muted-foreground">Pick a category, then add one to the page.</p>
      </div>

      <div className="flex flex-wrap gap-1.5 border-b border-border p-3">
        {BLOCK_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              activeCategory === category
                ? "border-success/30 bg-success-muted text-success"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
        {items.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => onAdd(item.type)}
            className="group flex items-start gap-3 rounded-xl border border-border bg-background p-3 text-start transition-colors hover:border-success/30 hover:bg-success-muted/30"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground group-hover:text-success">
              <item.icon className="size-4" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
            </div>
            <Plus
              className="mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
