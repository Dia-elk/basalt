"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { BlockRenderer } from "@/components/builder/block-renderers";
import type { Block } from "@/lib/mock/builder";
import type { Store } from "@/lib/mock/stores";
import { cn } from "@/lib/utils";

export function SortableBlock({
  block,
  store,
  selected,
  onSelect,
  onRemove,
}: {
  block: Block;
  store: Store;
  selected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, backgroundColor: block.content.backgroundColor }}
      onClick={() => onSelect(block.id)}
      className={cn(
        "group/block relative cursor-pointer outline outline-2 -outline-offset-2 outline-transparent transition-[outline-color]",
        selected ? "outline-success" : "hover:outline-success/40",
        isDragging && "z-20 opacity-70"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-end p-2 transition-opacity",
          selected ? "opacity-100" : "opacity-0 group-hover/block:opacity-100"
        )}
      >
        <div className="pointer-events-auto flex items-center gap-0.5 rounded-lg border border-border bg-background/95 p-0.5 shadow-sm backdrop-blur">
          <button
            type="button"
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="flex size-6 cursor-grab items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:cursor-grabbing"
            aria-label="Drag to reorder"
          >
            <GripVertical className="size-3.5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(block.id);
            }}
            className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            aria-label="Remove section"
          >
            <X className="size-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <BlockRenderer block={block} store={store} />
    </div>
  );
}
