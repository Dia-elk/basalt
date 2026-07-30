"use client";

import { AlignLeft, AlignCenter, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BLOCK_FIELDS, BLOCK_LIBRARY, type Block, type BlockContent, type BuilderField } from "@/lib/mock/builder";
import { cn } from "@/lib/utils";

type ListItem = { title: string; description?: string };

function ListField({
  items,
  onChange,
}: {
  items: ListItem[];
  onChange: (items: ListItem[]) => void;
}) {
  const update = (index: number, patch: Partial<ListItem>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));
  const add = () => onChange([...items, { title: "" }]);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-1.5 rounded-lg border border-border p-2.5">
          <div className="flex items-center gap-1.5">
            <Input
              value={item.title}
              onChange={(e) => update(i, { title: e.target.value })}
              placeholder="Title"
              className="h-8 text-xs"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove item"
            >
              <X className="size-3.5" strokeWidth={1.5} />
            </button>
          </div>
          <Input
            value={item.description ?? ""}
            onChange={(e) => update(i, { description: e.target.value })}
            placeholder="Description (optional)"
            className="h-8 text-xs"
          />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={add}>
        <Plus className="size-3.5" strokeWidth={1.5} />
        Add item
      </Button>
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: BuilderField;
  value: BlockContent[keyof BlockContent];
  onChange: (value: BlockContent[keyof BlockContent]) => void;
}) {
  if (field.type === "list") {
    return <ListField items={(value as ListItem[] | undefined) ?? []} onChange={onChange} />;
  }

  const text = (value as string | undefined) ?? "";

  if (field.type === "textarea") {
    return (
      <Textarea
        value={text}
        maxLength={field.maxLength}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm"
        rows={3}
      />
    );
  }

  if (field.type === "color") {
    return (
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={/^#/.test(text) ? text : "#0a0a0b"}
          onChange={(e) => onChange(e.target.value)}
          className="size-9 shrink-0 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
          aria-label={field.label}
        />
        <Input
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Uses the default"
          className="h-9 flex-1 text-xs"
          dir="ltr"
        />
        {text && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(undefined)}>
            Reset
          </Button>
        )}
      </div>
    );
  }

  if (field.type === "image" || field.type === "url") {
    return (
      <Input
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder ?? "https://…"}
        className="h-9 text-xs"
        dir="ltr"
      />
    );
  }

  if (field.type === "align") {
    const align = (value as "start" | "center" | undefined) ?? "center";
    return (
      <div className="inline-flex w-fit rounded-lg border border-border p-0.5">
        {(
          [
            { value: "start" as const, icon: AlignLeft, label: "Left" },
            { value: "center" as const, icon: AlignCenter, label: "Center" },
          ]
        ).map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
              align === opt.value ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <opt.icon className="size-3.5" strokeWidth={1.5} />
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  if (field.type === "number") {
    const num = (value as number | undefined) ?? field.min ?? 1;
    return (
      <Input
        type="number"
        value={num}
        min={field.min}
        max={field.max}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (!Number.isNaN(next)) onChange(Math.min(field.max ?? next, Math.max(field.min ?? next, next)));
        }}
        className="h-9 w-24 text-xs"
        dir="ltr"
      />
    );
  }

  return (
    <Input value={text} maxLength={field.maxLength} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} />
  );
}

export function EditBlockPanel({
  block,
  onChange,
  onRemove,
  onClose,
}: {
  block: Block;
  onChange: (content: BlockContent) => void;
  onRemove: () => void;
  onClose: () => void;
}) {
  const meta = BLOCK_LIBRARY.find((b) => b.type === block.type);
  const fields = BLOCK_FIELDS[block.type];
  const Icon = meta?.icon;

  const setField = (key: keyof BlockContent, value: BlockContent[keyof BlockContent]) => {
    onChange({ ...block.content, [key]: value });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex min-w-0 items-center gap-2.5">
          {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium">{meta?.name ?? block.type}</h3>
            <p className="truncate text-xs text-muted-foreground">Editing this section</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Done editing"
        >
          <X className="size-3.5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        {fields.length > 0 ? (
          fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <Label className="text-xs text-muted-foreground">{field.label}</Label>
              <FieldControl field={field} value={block.content[field.key]} onChange={(v) => setField(field.key, v)} />
            </div>
          ))
        ) : (
          <p className="text-xs text-muted-foreground">Nothing to configure for this section yet.</p>
        )}
      </div>

      <div className="border-t border-border p-3">
        <Button type="button" variant="outline" className="w-full gap-2 text-destructive hover:text-destructive" onClick={onRemove}>
          <Trash2 className="size-4" strokeWidth={1.5} />
          Remove section
        </Button>
      </div>
    </div>
  );
}
