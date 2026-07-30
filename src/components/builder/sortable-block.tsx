"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { BlockRenderer } from "@/components/builder/block-renderers";
import { BLOCK_LIBRARY, type Block } from "@/lib/mock/builder";
import type { Store } from "@/lib/mock/stores";
import { cn } from "@/lib/utils";

export function SortableBlock({
  block,
  store,
  onRemove,
}: {
  block: Block;
  store: Store;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });
  const meta = BLOCK_LIBRARY.find((b) => b.type === block.type);
  const Icon = meta?.icon;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card",
        isDragging && "z-10 opacity-70 shadow-lg"
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-1.5">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="flex cursor-grab items-center gap-1.5 text-xs text-muted-foreground active:cursor-grabbing"
        >
          <GripVertical className="size-3.5" strokeWidth={1.5} />
          {Icon && <Icon className="size-3.5" strokeWidth={1.5} />}
          {meta?.name ?? block.type}
        </button>
        <button
          type="button"
          onClick={() => onRemove(block.id)}
          className="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          aria-label={`Remove ${meta?.name ?? block.type}`}
        >
          <X className="size-3.5" strokeWidth={1.5} />
        </button>
      </div>
      <BlockRenderer block={block} store={store} />
    </div>
  );
}
