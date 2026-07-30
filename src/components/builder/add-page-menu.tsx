"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PAGE_TEMPLATES, createCustomPage, type BuilderPage } from "@/lib/mock/builder";

export function AddPageMenu({ existingIds, onAdd }: { existingIds: string[]; onAdd: (page: BuilderPage) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const availableTemplates = PAGE_TEMPLATES.filter((t) => !existingIds.includes(t.id));

  const createCustom = () => {
    if (!name.trim()) return;
    onAdd(createCustomPage(name));
    setName("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <button
            type="button"
            aria-label="Add page"
            className="flex size-7 shrink-0 items-center justify-center rounded-full border border-dashed border-border text-muted-foreground transition-colors hover:border-success/40 hover:text-foreground"
          />
        }
      >
        <Plus className="size-3.5" strokeWidth={1.5} />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64">
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-muted-foreground">Custom page</p>
          <div className="flex items-center gap-1.5">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Page name"
              className="h-8 text-xs"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  createCustom();
                }
              }}
            />
            <Button type="button" size="sm" disabled={!name.trim()} onClick={createCustom}>
              Add
            </Button>
          </div>
        </div>

        {availableTemplates.length > 0 && (
          <div className="mt-1 flex flex-col gap-1 border-t border-border pt-2">
            <p className="px-0.5 text-xs font-medium text-muted-foreground">Prebuilt pages</p>
            {availableTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => {
                  onAdd(template);
                  setOpen(false);
                }}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-start text-sm transition-colors hover:bg-accent"
              >
                {template.name}
                <span className="text-xs text-muted-foreground" dir="ltr">
                  {template.path}
                </span>
              </button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
