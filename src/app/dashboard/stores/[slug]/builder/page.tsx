"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { LayoutDashboard, Monitor, Smartphone, X } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SortableBlock } from "@/components/builder/sortable-block";
import { ComponentLibrary } from "@/components/builder/component-library";
import { EditBlockPanel } from "@/components/builder/edit-block-panel";
import { AddPageMenu } from "@/components/builder/add-page-menu";
import {
  BLOCK_LIBRARY,
  getStoreComposition,
  saveStoreComposition,
  createBlock,
  addPageToComposition,
  removePageFromComposition,
  type StoreComposition,
  type BlockType,
  type BlockContent,
  type BuilderPage,
} from "@/lib/mock/builder";
import { useStore } from "@/hooks/use-store";
import type { Store } from "@/lib/mock/stores";
import { cn } from "@/lib/utils";

export default function StoreBuilderPage() {
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

  return <BuilderWorkspace store={store} />;
}

function BuilderWorkspace({ store }: { store: Store }) {
  const [composition, setComposition] = useState<StoreComposition | null>(null);
  const [pageId, setPageId] = useState("home");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  useEffect(() => {
    const loaded = getStoreComposition(store);
    setComposition(loaded);
    setPageId(loaded.pages[0]?.id ?? "home");
  }, [store]);

  if (!composition) {
    return (
      <div className="flex h-full items-center justify-center">
        <Skeleton className="h-8 w-64" />
      </div>
    );
  }

  const blocks = composition.blocks[pageId] ?? [];
  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) ?? null;

  const persist = (next: StoreComposition) => {
    setComposition(next);
    saveStoreComposition(store.slug, next);
  };

  const switchPage = (id: string) => {
    setPageId(id);
    setSelectedBlockId(null);
  };

  const handleAddPage = (page: BuilderPage) => {
    persist(addPageToComposition(composition, page));
    switchPage(page.id);
    toast.success(`${page.name} added`, { description: "Add components to build it out." });
  };

  const handleRemovePage = (page: BuilderPage) => {
    if (composition.pages.length <= 1) {
      toast.error("Can't remove the last page", { description: "A store needs at least one page." });
      return;
    }
    const next = removePageFromComposition(composition, page.id);
    persist(next);
    if (pageId === page.id) switchPage(next.pages[0].id);
    toast.info(`${page.name} removed`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    persist({ ...composition, blocks: { ...composition.blocks, [pageId]: arrayMove(blocks, oldIndex, newIndex) } });
  };

  const handleAdd = (type: BlockType) => {
    const block = createBlock(type);
    persist({ ...composition, blocks: { ...composition.blocks, [pageId]: [...blocks, block] } });
    setSelectedBlockId(block.id);
    const name = BLOCK_LIBRARY.find((b) => b.type === type)?.name ?? type;
    toast.success(`${name} added`, { description: "Edit it on the right, or drag to reorder." });
  };

  const handleRemove = (id: string) => {
    persist({ ...composition, blocks: { ...composition.blocks, [pageId]: blocks.filter((b) => b.id !== id) } });
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const handleContentChange = (id: string, content: BlockContent) => {
    persist({
      ...composition,
      blocks: { ...composition.blocks, [pageId]: blocks.map((b) => (b.id === id ? { ...b, content } : b)) },
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
            render={<Link href={`/dashboard/stores/${store.slug}`} />}
          >
            <LayoutDashboard className="size-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Overview</span>
          </Button>
          <div className="hidden h-4 w-px bg-border sm:block" />
          <div className="flex flex-wrap items-center gap-1.5">
            {composition.pages.map((page) => (
              <div
                key={page.id}
                className={cn(
                  "flex items-center gap-1 rounded-full border py-1.5 ps-3 text-xs font-medium transition-colors",
                  pageId === page.id ? "pe-1.5" : "pe-3",
                  pageId === page.id
                    ? "border-foreground/30 bg-secondary text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                <button type="button" onClick={() => switchPage(page.id)}>
                  {page.name}
                </button>
                {pageId === page.id && (
                  <button
                    type="button"
                    onClick={() => handleRemovePage(page)}
                    className="flex size-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    aria-label={`Remove ${page.name} page`}
                  >
                    <X className="size-3" strokeWidth={1.5} />
                  </button>
                )}
              </div>
            ))}
            <AddPageMenu existingIds={composition.pages.map((p) => p.id)} onAdd={handleAddPage} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 rounded-lg border border-border p-0.5">
            <button
              type="button"
              onClick={() => setViewport("desktop")}
              aria-label="Desktop preview"
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-colors",
                viewport === "desktop" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Monitor className="size-3.5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              aria-label="Mobile preview"
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-colors",
                viewport === "mobile" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Smartphone className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
          <p className="hidden text-xs text-muted-foreground sm:block">Changes save automatically</p>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_320px]">
        <div className={cn("overflow-y-auto", viewport === "mobile" && "bg-muted/20 py-8")}>
          <div
            className={cn(
              "@container",
              viewport === "mobile" &&
                "mx-auto max-w-[390px] overflow-hidden rounded-2xl border border-border bg-background shadow-xl"
            )}
          >
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col">
                  {blocks.length > 0 ? (
                    blocks.map((block) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        store={store}
                        selected={block.id === selectedBlockId}
                        onSelect={setSelectedBlockId}
                        onRemove={handleRemove}
                      />
                    ))
                  ) : (
                    <div className="flex min-h-[400px] items-center justify-center p-14 text-center text-sm text-muted-foreground">
                      This page is empty. Add a component from the library.
                    </div>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        <div className="hidden border-s border-border p-3 lg:block">
          {selectedBlock ? (
            <EditBlockPanel
              block={selectedBlock}
              onChange={(content) => handleContentChange(selectedBlock.id, content)}
              onRemove={() => handleRemove(selectedBlock.id)}
              onClose={() => setSelectedBlockId(null)}
            />
          ) : (
            <ComponentLibrary store={store} onAdd={handleAdd} />
          )}
        </div>
      </div>
    </div>
  );
}
