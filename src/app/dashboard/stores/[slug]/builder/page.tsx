"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { SortableBlock } from "@/components/builder/sortable-block";
import { ComponentLibrary } from "@/components/builder/component-library";
import {
  STOREFRONT_PAGES,
  BLOCK_LIBRARY,
  getStoreComposition,
  saveStoreComposition,
  createBlock,
  type StoreComposition,
  type BlockType,
} from "@/lib/mock/builder";
import type { Store } from "@/lib/mock/stores";
import { cn } from "@/lib/utils";

export default function StoreBuilderPage() {
  const { slug } = useParams<{ slug: string }>();

  return <StoreScopedPage slug={slug}>{(store) => <BuilderCanvas store={store} />}</StoreScopedPage>;
}

function BuilderCanvas({ store }: { store: Store }) {
  const [composition, setComposition] = useState<StoreComposition | null>(null);
  const [pageId, setPageId] = useState("home");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  useEffect(() => {
    setComposition(getStoreComposition(store));
  }, [store]);

  if (!composition) {
    return <div className="h-40 animate-pulse rounded-2xl bg-muted" />;
  }

  const blocks = composition[pageId] ?? [];

  const persist = (next: StoreComposition) => {
    setComposition(next);
    saveStoreComposition(store.slug, next);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    persist({ ...composition, [pageId]: arrayMove(blocks, oldIndex, newIndex) });
  };

  const handleAdd = (type: BlockType) => {
    persist({ ...composition, [pageId]: [...blocks, createBlock(type)] });
    const name = BLOCK_LIBRARY.find((b) => b.type === type)?.name ?? type;
    toast.success(`${name} added`, { description: "Drag it to reorder, or add another." });
  };

  const handleRemove = (id: string) => {
    persist({ ...composition, [pageId]: blocks.filter((b) => b.id !== id) });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-medium">Builder</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Drag to reorder, or add a component from the library. Changes save automatically.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {STOREFRONT_PAGES.map((page) => (
          <button
            key={page.id}
            type="button"
            onClick={() => setPageId(page.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              pageId === page.id
                ? "border-foreground/30 bg-secondary text-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {page.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-3">
              {blocks.length > 0 ? (
                blocks.map((block) => <SortableBlock key={block.id} block={block} store={store} onRemove={handleRemove} />)
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-14 text-center text-sm text-muted-foreground">
                  This page is empty. Add a component from the library.
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>

        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-160px)]">
          <ComponentLibrary onAdd={handleAdd} />
        </div>
      </div>
    </div>
  );
}
