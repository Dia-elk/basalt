"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { FeaturePageShell } from "@/components/dashboard/feature-page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  PAGE_TEMPLATES,
  createCustomPage,
  addPageToComposition,
  getStoreComposition,
  saveStoreComposition,
  slugifyPageName,
  type BuilderPage,
} from "@/lib/mock/builder";
import type { Store } from "@/lib/mock/stores";
import { cn } from "@/lib/utils";

export default function NewBuilderPagePage() {
  const { slug } = useParams<{ slug: string }>();
  return <StoreScopedPage slug={slug}>{(store) => <NewPageWorkspace store={store} />}</StoreScopedPage>;
}

function NewPageWorkspace({ store }: { store: Store }) {
  const router = useRouter();
  const composition = useMemo(() => getStoreComposition(store), [store]);
  const existingIds = composition.pages.map((p) => p.id);
  const availableTemplates = PAGE_TEMPLATES.filter((t) => !existingIds.includes(t.id));

  const [templateId, setTemplateId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [pathTouched, setPathTouched] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const applyTemplate = (template: BuilderPage) => {
    setTemplateId(template.id);
    setName(template.name);
    setPath(template.path);
    setPathTouched(true);
    setSeoTitle(`${template.name} — ${store.name}`);
    setSeoDescription("");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setTemplateId(null);
    if (!pathTouched) setPath(value ? `/${slugifyPageName(value)}` : "");
  };

  const canSave = name.trim().length > 0;

  const handleSave = () => {
    const base = templateId ? availableTemplates.find((t) => t.id === templateId) : undefined;
    const seo = { title: seoTitle.trim() || undefined, description: seoDescription.trim() || undefined };
    const page: BuilderPage = base
      ? { ...base, name: name.trim() || base.name, path: path.trim() ? `/${path.trim().replace(/^\/+/, "")}` : base.path, seo }
      : createCustomPage({ name, path, seo });

    saveStoreComposition(store.slug, addPageToComposition(composition, page));
    toast.success(`${page.name} added`, { description: "Add components to build it out." });
    router.push(`/dashboard/stores/${store.slug}/builder?page=${page.id}`);
  };

  return (
    <FeaturePageShell
      title="Add page"
      description="Create a new page for this store, with its own route and search details."
      action={
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5"
          render={<Link href={`/dashboard/stores/${store.slug}/builder`} />}
        >
          <ArrowLeft className="size-3.5 rtl:rotate-180" strokeWidth={1.5} />
          Back to Builder
        </Button>
      }
    >
      <div className="flex max-w-2xl flex-col gap-5">
        {availableTemplates.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5">
            <Label className="text-xs text-muted-foreground">Start from a template</Label>
            <p className="mt-1 text-xs text-muted-foreground">Optional — or just fill in a blank page below.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {availableTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => applyTemplate(template)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    templateId === template.id
                      ? "border-success/30 bg-success-muted text-success"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Page name</Label>
            <Input value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g. Size Guide" maxLength={60} />
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Route</Label>
            <div className="flex items-center gap-1.5">
              <span className="shrink-0 text-xs text-muted-foreground" dir="ltr">
                {store.domain}
              </span>
              <Input
                value={path}
                onChange={(e) => {
                  setPath(e.target.value);
                  setPathTouched(true);
                }}
                placeholder="/size-guide"
                dir="ltr"
                className="flex-1 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <Label className="text-xs text-muted-foreground">SEO</Label>
          <p className="mt-1 text-xs text-muted-foreground">How this page shows up in search results.</p>
          <div className="mt-3 flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Meta title</Label>
            <Input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder={`${name || "Page name"} — ${store.name}`}
              maxLength={70}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <Label className="text-xs text-muted-foreground">Meta description</Label>
            <Textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="A short summary shown under the title in search results."
              rows={3}
              maxLength={160}
            />
          </div>
        </div>

        <Button disabled={!canSave} onClick={handleSave}>
          Add page
        </Button>
      </div>
    </FeaturePageShell>
  );
}
