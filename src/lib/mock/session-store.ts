import { getStoreBySlug, type Store } from "@/lib/mock/stores";

const PREFIX = "basalt_store_";

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "new-store";
}

export function saveSessionStore(store: Store): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(`${PREFIX}${store.slug}`, JSON.stringify(store));
}

export function getSessionStore(slug: string): Store | undefined {
  if (typeof window === "undefined") return undefined;
  const raw = window.sessionStorage.getItem(`${PREFIX}${slug}`);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as Store;
  } catch {
    return undefined;
  }
}

export function resolveStore(slug: string): Store | undefined {
  return getSessionStore(slug) ?? getStoreBySlug(slug);
}
