import type { BusinessType, Store } from "@/lib/mock/stores";

export type ProductStatus = "active" | "draft" | "out-of-stock";

export interface ProductVariantOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  optionValues: Record<string, string>;
  /** Overrides the base product price for this combination; falls back to it when unset. */
  price?: number;
  stock: number;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  stock: number;
  status: ProductStatus;
  accent: string;
  images?: string[];
  /** Other product ids from the same store, shown as cross-sells on this product's page. */
  relatedProductIds?: string[];
  options?: ProductVariantOption[];
  variants?: ProductVariant[];
}

function variantKey(optionValues: Record<string, string>): string {
  return Object.entries(optionValues)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
}

/** Rebuilds the full cartesian product of variant combinations from a product's options, keeping stock/price/sku for any combo that still exists. */
export function generateVariants(options: ProductVariantOption[], existing: ProductVariant[] = []): ProductVariant[] {
  if (options.length === 0) return [];
  const existingByKey = new Map(existing.map((v) => [variantKey(v.optionValues), v]));

  let combos: Record<string, string>[] = [{}];
  options.forEach((opt) => {
    const next: Record<string, string>[] = [];
    combos.forEach((combo) => {
      opt.values.forEach((val) => next.push({ ...combo, [opt.name]: val }));
    });
    combos = next;
  });

  return combos.map((optionValues) => {
    const found = existingByKey.get(variantKey(optionValues));
    return found ?? { id: `var-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, optionValues, stock: 0 };
  });
}

// A few generic sample products per business type, so the grid looks populated.
// Covers only the curated types; all others fall back to `FALLBACK` at runtime.
const SAMPLES: Partial<Record<BusinessType, string[]>> = {
  Perfume: ["Amber Nocturne", "Neroli & Oud", "Vetiver Homme", "Rose Absolute", "Santal Blanc", "Oud Intense"],
  Cosmetics: ["Matte Lipstick", "Glow Serum", "Hydra Cream", "Velvet Foundation", "Bronzing Drops", "Eye Palette"],
  Furniture: ["Oak Dining Chair", "Linen Sofa", "Walnut Desk", "Ceramic Lamp", "Wool Rug", "Brass Shelf"],
  Fashion: ["Linen Shirt", "Wool Coat", "Selvedge Denim", "Leather Belt", "Cotton Tee", "Twill Trousers"],
  Jewelry: ["Gold Hoops", "Silver Ring", "Pearl Necklace", "Stack Bracelet", "Stud Earrings", "Charm Pendant"],
};

const FALLBACK = ["Signature Piece", "Classic Edition", "Limited Run", "Core Item", "Studio Exclusive", "House Favorite"];

function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export const ACCENTS = ["#D4AF6A", "#8B6A4F", "#5B8DEF", "#C4622D", "#6B7CE8", "#29D67A"];

export function generateProducts(store: Store): Product[] {
  const names = SAMPLES[store.businessType] ?? FALLBACK;
  const seed = hashSeed(store.id);
  return names.map((name, i) => {
    const s = (seed + i * 7919) % 9973;
    const stock = (s >> 1) % 80;
    const status: ProductStatus = stock === 0 ? "out-of-stock" : i === names.length - 1 ? "draft" : "active";
    return {
      id: `prod-${store.id}-${i}`,
      name,
      price: 45 + ((s % 18) * 10),
      currency: store.currencies[0] ?? "USD",
      stock,
      status,
      accent: ACCENTS[i % ACCENTS.length],
    };
  });
}

export function createProduct(partial: Omit<Product, "id">): Product {
  return { id: `prod-${Date.now()}`, ...partial };
}

const PRODUCTS_PREFIX = "basalt_products_";

/** Reads a store's saved product catalog, seeding (and persisting) one on first access. */
export function getStoreProducts(store: Store): Product[] {
  if (typeof window === "undefined") return generateProducts(store);

  const raw = window.sessionStorage.getItem(`${PRODUCTS_PREFIX}${store.slug}`);
  if (raw) {
    try {
      return JSON.parse(raw) as Product[];
    } catch {
      // fall through and reseed
    }
  }

  const seeded = generateProducts(store);
  window.sessionStorage.setItem(`${PRODUCTS_PREFIX}${store.slug}`, JSON.stringify(seeded));
  return seeded;
}

export function saveStoreProducts(slug: string, products: Product[]): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(`${PRODUCTS_PREFIX}${slug}`, JSON.stringify(products));
}
