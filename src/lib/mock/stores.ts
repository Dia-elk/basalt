export type DeploymentStatus = "active" | "building" | "failed" | "queued";
export type AiStatus = "idle" | "working" | "needs-approval";
export type BusinessType =
  | "Fashion"
  | "Perfume"
  | "Cosmetics"
  | "Jewelry"
  | "Bags"
  | "Eyewear"
  | "Electronics"
  | "Restaurant"
  | "Groceries"
  | "Furniture"
  | "Home & Garden"
  | "Books"
  | "Toys & Games"
  | "Sports"
  | "Health & Wellness"
  | "Pet Supplies"
  | "Baby & Kids"
  | "Art & Crafts"
  | "Automotive"
  | "Music"
  | "Office Supplies"
  | "Flowers & Gifts"
  | "Digital Products"
  | "Handmade"
  | "Other";

export interface Store {
  id: string;
  name: string;
  slug: string;
  domain: string;
  businessType: BusinessType;
  region: string;
  status: DeploymentStatus;
  aiStatus: AiStatus;
  lastDeployedAt: string;
  languages: string[];
  accent: string;
  monthlyRevenue: number;
  revenueChange: number;
  visitors: number;
  createdAt: string;
  /** Optional feature values from wizard-options' featureOptions, e.g. "wishlist", "reviews". Drives the dynamic sidebar. */
  features: string[];
}

export const stores: Store[] = [
  {
    id: "lumiere-parfums",
    name: "Lumière Parfums",
    slug: "lumiere-parfums",
    domain: "lumiere.buildonbasalt.com",
    businessType: "Perfume",
    region: "France Central",
    status: "active",
    aiStatus: "idle",
    lastDeployedAt: "2 hours ago",
    languages: ["en", "fr"],
    accent: "#D4AF6A",
    monthlyRevenue: 48210,
    revenueChange: 12.4,
    visitors: 18420,
    createdAt: "2026-02-11",
    features: ["wishlist", "reviews", "coupons", "loyalty", "gift-cards", "seo", "newsletter"],
  },
  {
    id: "northfield-furniture",
    name: "Northfield Furniture Co.",
    slug: "northfield-furniture",
    domain: "northfield.buildonbasalt.com",
    businessType: "Furniture",
    region: "East US 2",
    status: "active",
    aiStatus: "needs-approval",
    lastDeployedAt: "1 day ago",
    languages: ["en"],
    accent: "#8B6A4F",
    monthlyRevenue: 76540,
    revenueChange: 6.1,
    visitors: 24310,
    createdAt: "2025-11-03",
    features: ["wishlist", "reviews", "inventory", "seo", "faq", "newsletter"],
  },
  {
    id: "cove-cosmetics",
    name: "Cove Cosmetics",
    slug: "cove-cosmetics",
    domain: "cove.buildonbasalt.com",
    businessType: "Cosmetics",
    region: "UK South",
    status: "building",
    aiStatus: "working",
    lastDeployedAt: "Deploying now",
    languages: ["en", "ar"],
    accent: "#E8A0BF",
    monthlyRevenue: 31890,
    revenueChange: 21.8,
    visitors: 15980,
    createdAt: "2026-04-22",
    features: ["wishlist", "reviews", "coupons", "referral", "bundles", "newsletter", "blog"],
  },
  {
    id: "circuit-sons",
    name: "Circuit & Sons",
    slug: "circuit-sons",
    domain: "circuitsons.buildonbasalt.com",
    businessType: "Electronics",
    region: "Southeast Asia",
    status: "active",
    aiStatus: "idle",
    lastDeployedAt: "3 days ago",
    languages: ["en"],
    accent: "#5B8DEF",
    monthlyRevenue: 112400,
    revenueChange: -3.2,
    visitors: 41200,
    createdAt: "2025-08-19",
    features: ["wishlist", "reviews", "coupons", "inventory", "analytics", "seo", "faq", "gift-cards"],
  },
  {
    id: "whitfield-menswear",
    name: "Whitfield & Co.",
    slug: "whitfield-menswear",
    domain: "whitfield.buildonbasalt.com",
    businessType: "Fashion",
    region: "West Europe",
    status: "active",
    aiStatus: "idle",
    lastDeployedAt: "5 hours ago",
    languages: ["en", "fr"],
    accent: "#C4622D",
    monthlyRevenue: 58900,
    revenueChange: 9.7,
    visitors: 20110,
    createdAt: "2025-12-30",
    features: ["wishlist", "reviews", "coupons", "loyalty", "seo"],
  },
  {
    id: "reading-room",
    name: "The Reading Room",
    slug: "reading-room",
    domain: "readingroom.buildonbasalt.com",
    businessType: "Books",
    region: "UAE North",
    status: "failed",
    aiStatus: "needs-approval",
    lastDeployedAt: "Failed 20 min ago",
    languages: ["en", "ar"],
    accent: "#6B7CE8",
    monthlyRevenue: 9420,
    revenueChange: 2.1,
    visitors: 6340,
    createdAt: "2026-06-02",
    features: ["wishlist", "reviews", "blog", "faq"],
  },
  {
    id: "sable-and-stone",
    name: "Sable & Stone",
    slug: "sable-and-stone",
    domain: "sableandstone.buildonbasalt.com",
    businessType: "Furniture",
    region: "West Europe",
    status: "queued",
    aiStatus: "working",
    lastDeployedAt: "Not yet deployed",
    languages: ["en"],
    accent: "#4A5859",
    monthlyRevenue: 0,
    revenueChange: 0,
    visitors: 0,
    createdAt: "2026-07-18",
    features: ["seo", "faq"],
  },
];

export function getStoreBySlug(slug: string): Store | undefined {
  return stores.find((s) => s.slug === slug);
}
