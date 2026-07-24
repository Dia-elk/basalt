import type { BusinessType } from "@/lib/mock/stores";

export type ProductStatus = "active" | "draft" | "out-of-stock";

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  stock: number;
  status: ProductStatus;
  accent: string;
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

const ACCENTS = ["#D4AF6A", "#8B6A4F", "#5B8DEF", "#C4622D", "#6B7CE8", "#29D67A"];

export function generateProducts(storeId: string, businessType: BusinessType): Product[] {
  const names = SAMPLES[businessType] ?? FALLBACK;
  const seed = hashSeed(storeId);
  return names.map((name, i) => {
    const s = (seed + i * 7919) % 9973;
    const stock = (s >> 1) % 80;
    const status: ProductStatus = stock === 0 ? "out-of-stock" : i === names.length - 1 ? "draft" : "active";
    return {
      id: `prod-${storeId}-${i}`,
      name,
      price: 45 + ((s % 18) * 10),
      currency: "USD",
      stock,
      status,
      accent: ACCENTS[i % ACCENTS.length],
    };
  });
}
