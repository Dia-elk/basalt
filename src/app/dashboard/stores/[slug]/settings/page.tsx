"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StoreScopedPage } from "@/components/dashboard/store-scoped-page";
import { StepLanguages } from "@/components/wizard/steps/step-languages";
import { StepFeatures } from "@/components/wizard/steps/step-features";
import { saveSessionStore } from "@/lib/mock/session-store";
import type { Store } from "@/lib/mock/stores";
import type { WizardData } from "@/lib/wizard-types";

export default function StoreSettingsPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <StoreScopedPage slug={slug}>
      {(store) => <SettingsForm store={store} />}
    </StoreScopedPage>
  );
}

function SettingsForm({ store }: { store: Store }) {
  const [name, setName] = useState(store.name);
  const [description, setDescription] = useState("");
  const [accentColor, setAccentColor] = useState(store.accent);
  const [wizardLike, setWizardLike] = useState<Pick<WizardData, "languages" | "features">>({
    languages: store.languages,
    features: ["analytics", "seo"],
  });

  useEffect(() => {
    setName(store.name);
    setAccentColor(store.accent);
    setWizardLike({ languages: store.languages, features: ["analytics", "seo"] });
  }, [store]);

  const save = () => {
    saveSessionStore({ ...store, name, accent: accentColor, languages: wizardLike.languages });
    toast.success("Settings saved", { description: `${name} has been updated.` });
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-medium">Business info</h2>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="settings-name">Business name</Label>
            <Input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="settings-description">Description</Label>
            <Textarea
              id="settings-description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of this business."
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-sm font-medium">Brand</h2>
        <div className="mt-4 flex items-center gap-3">
          <label className="relative size-8 shrink-0 overflow-hidden rounded-full border border-white/10">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="absolute -top-1 -start-1 size-10 cursor-pointer"
            />
          </label>
          <div>
            <p className="text-sm">Accent color</p>
            <p className="font-mono text-xs text-muted-foreground uppercase">{accentColor}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-medium">Languages</h2>
        <StepLanguages data={wizardLike as WizardData} update={(patch) => setWizardLike((prev) => ({ ...prev, ...patch }))} />
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-medium">Features</h2>
        <StepFeatures data={wizardLike as WizardData} update={(patch) => setWizardLike((prev) => ({ ...prev, ...patch }))} />
      </section>

      <div className="flex justify-end">
        <Button onClick={save}>Save changes</Button>
      </div>

      <section className="rounded-2xl border border-destructive/30 bg-destructive/[0.03] p-5">
        <h2 className="text-sm font-medium text-destructive">Danger zone</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Deleting a store permanently removes its deployments, domains, and data. This cannot be undone.
        </p>
        <Dialog>
          <DialogTrigger render={<Button variant="destructive" className="mt-4 gap-1.5" />}>
            <Trash2 className="size-4" strokeWidth={1.5} />
            Delete store
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete {store.name}?</DialogTitle>
              <DialogDescription>
                This is a demo environment, deletion is disabled so you can keep exploring.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => toast.info("Deletion disabled", { description: "This action is disabled in the demo." })}
              >
                I understand, delete anyway
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}
