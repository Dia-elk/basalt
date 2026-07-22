"use client";

import { useEffect, useState } from "react";
import { resolveStore } from "@/lib/mock/session-store";
import type { Store } from "@/lib/mock/stores";

export function useStore(slug: string) {
  const [store, setStore] = useState<Store | null | undefined>(undefined);

  useEffect(() => {
    setStore(resolveStore(slug) ?? null);
  }, [slug]);

  return { store, loading: store === undefined };
}
