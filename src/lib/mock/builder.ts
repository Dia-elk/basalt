/**
 * Mock data model + seed for the visual "Builder" workspace.
 *
 * A store composes multiple storefront pages, each made of an ordered list of
 * prebuilt blocks. Each block carries its own content (heading, copy, items…),
 * and the whole per-store composition is saved as JSON (sessionStorage here,
 * standing in for a real per-store backend) — see product_vision_two_workspaces
 * memory. Some block types double as an optional commerce feature: if a block
 * like "faq" or "loyalty-widget" is present anywhere in a store's composition,
 * the matching feature should show up in that store's dashboard sidebar even
 * if it was never picked in the wizard — see `featuresFromComposition`.
 */

import {
  LayoutTemplate,
  Grid3x3,
  Layers,
  CheckCircle2,
  Quote,
  MousePointerClick,
  HelpCircle,
  Mail,
  Image as ImageIcon,
  Building2,
  Tag,
  Award,
  Gift,
  Boxes,
  Newspaper,
  Share2,
} from "lucide-react";
import { hashSeed, mulberry32 } from "./analytics";
import type { Store } from "./stores";

export type BlockType =
  | "hero"
  | "product-grid"
  | "featured-collection"
  | "feature-cards"
  | "testimonials"
  | "cta-banner"
  | "faq"
  | "newsletter"
  | "image-split"
  | "marquee-logos"
  | "coupon-banner"
  | "loyalty-widget"
  | "gift-card-promo"
  | "bundle-showcase"
  | "blog-feed"
  | "referral-banner";

export interface BuilderPage {
  id: string;
  name: string;
  path: string;
}

export interface BlockContent {
  heading?: string;
  subheading?: string;
  body?: string;
  ctaLabel?: string;
  imageUrl?: string;
  items?: { title: string; description?: string }[];
}

export interface Block {
  id: string;
  type: BlockType;
  content: BlockContent;
}

export type PageComposition = Block[];

/** A store's full set of pages, each with its own ordered block list. Saved as JSON per store. */
export type StoreComposition = Record<string, PageComposition>;

/** The storefront pages every store can compose. */
export const STOREFRONT_PAGES: BuilderPage[] = [
  { id: "home", name: "Home", path: "/" },
  { id: "products", name: "Products", path: "/products" },
  { id: "product-detail", name: "Product", path: "/products/:slug" },
  { id: "about", name: "About", path: "/about" },
  { id: "contact", name: "Contact", path: "/contact" },
];

export type BlockCategory = "Layout" | "Products" | "Trust" | "Marketing";

/** The library of prebuilt blocks merchants (or the AI) can add, grouped by category. */
export const BLOCK_LIBRARY: { type: BlockType; name: string; description: string; category: BlockCategory; icon: typeof LayoutTemplate }[] = [
  { type: "hero", name: "Hero", description: "A large opening banner with a heading, subtext, and call to action.", category: "Layout", icon: LayoutTemplate },
  { type: "image-split", name: "Image + text", description: "An image beside a block of text, for storytelling.", category: "Layout", icon: ImageIcon },
  { type: "product-grid", name: "Product grid", description: "A grid of products, pulled straight from the catalog.", category: "Products", icon: Grid3x3 },
  { type: "featured-collection", name: "Featured collection", description: "One collection, highlighted with its own heading.", category: "Products", icon: Layers },
  { type: "bundle-showcase", name: "Bundle showcase", description: "Highlights a product bundle, pulled from Bundles.", category: "Products", icon: Boxes },
  { type: "testimonials", name: "Testimonials", description: "Customer quotes, pulled from Reviews.", category: "Trust", icon: Quote },
  { type: "faq", name: "FAQ", description: "Common questions and answers, pulled from FAQ.", category: "Trust", icon: HelpCircle },
  { type: "feature-cards", name: "Feature cards", description: "Short value props in a row, like shipping or returns.", category: "Trust", icon: CheckCircle2 },
  { type: "marquee-logos", name: "Logo marquee", description: "A scrolling row of press or partner logos.", category: "Trust", icon: Building2 },
  { type: "cta-banner", name: "CTA banner", description: "A full-width call to action with one button.", category: "Marketing", icon: MousePointerClick },
  { type: "newsletter", name: "Newsletter signup", description: "An email capture block, pulled from Newsletter.", category: "Marketing", icon: Mail },
  { type: "coupon-banner", name: "Coupon banner", description: "Announces an active promo code, pulled from Coupons.", category: "Marketing", icon: Tag },
  { type: "loyalty-widget", name: "Loyalty widget", description: "Promotes the points program, pulled from Loyalty.", category: "Marketing", icon: Award },
  { type: "gift-card-promo", name: "Gift card promo", description: "Promotes gift cards, pulled from Gift Cards.", category: "Marketing", icon: Gift },
  { type: "blog-feed", name: "Blog feed", description: "Latest articles, pulled from Blog.", category: "Marketing", icon: Newspaper },
  { type: "referral-banner", name: "Referral banner", description: "Invites shoppers to refer a friend, pulled from Referral.", category: "Marketing", icon: Share2 },
];

export const BLOCK_CATEGORIES: BlockCategory[] = ["Layout", "Products", "Trust", "Marketing"];

/** Block types that double as an optional commerce feature when present in a composition. */
export const BLOCK_FEATURE_MAP: Partial<Record<BlockType, string>> = {
  testimonials: "reviews",
  faq: "faq",
  newsletter: "newsletter",
  "coupon-banner": "coupons",
  "loyalty-widget": "loyalty",
  "gift-card-promo": "gift-cards",
  "bundle-showcase": "bundles",
  "blog-feed": "blog",
  "referral-banner": "referral",
};

const DEFAULT_CONTENT: Record<BlockType, BlockContent> = {
  hero: { heading: "Welcome to the store", subheading: "Quality pieces, thoughtfully chosen.", ctaLabel: "Shop now" },
  "product-grid": { heading: "Best sellers" },
  "featured-collection": { heading: "Featured collection" },
  "feature-cards": {
    items: [{ title: "Free shipping" }, { title: "Easy returns" }, { title: "Secure checkout" }],
  },
  testimonials: { heading: "What customers say", items: [] },
  "cta-banner": { heading: "Ready to shop?", ctaLabel: "Browse the collection" },
  faq: { heading: "Frequently asked questions", items: [] },
  newsletter: { heading: "Stay in the loop", body: "Get new arrivals and offers in your inbox." },
  "image-split": { heading: "Our story" },
  "marquee-logos": {},
  "coupon-banner": { heading: "10% off your first order", body: "Use code WELCOME10 at checkout." },
  "loyalty-widget": { heading: "Earn points on every order" },
  "gift-card-promo": { heading: "Give a gift card", ctaLabel: "Buy a gift card" },
  "bundle-showcase": { heading: "Bundle & save" },
  "blog-feed": { heading: "From the journal" },
  "referral-banner": { heading: "Give $10, get $10", body: "Invite a friend and you both save." },
};

let blockCounter = 0;
function makeBlock(type: BlockType): Block {
  blockCounter += 1;
  return { id: `blk-${blockCounter}-${type}`, type, content: { ...DEFAULT_CONTENT[type] } };
}

export function createBlock(type: BlockType): Block {
  blockCounter += 1;
  // Time-based suffix avoids collisions with seeded ids across re-mounts.
  return { id: `blk-${Date.now()}-${blockCounter}-${type}`, type, content: { ...DEFAULT_CONTENT[type] } };
}

const MAPPABLE_BLOCK_TYPES = Object.keys(BLOCK_FEATURE_MAP) as BlockType[];

/**
 * Seeds a composition for a specific store: the home page always opens with a
 * hero + product grid, gains one block for every wizard-selected feature that
 * has a matching block type, then one bonus block for a feature the store
 * never picked — so the sidebar has at least one item that only exists
 * because of what's actually on the page, not the wizard.
 */
function seedCompositionForStore(store: Store): StoreComposition {
  blockCounter = 0;
  const homeBlocks: Block[] = [makeBlock("hero"), makeBlock("product-grid")];

  MAPPABLE_BLOCK_TYPES.forEach((type) => {
    const feature = BLOCK_FEATURE_MAP[type]!;
    if (store.features.includes(feature)) homeBlocks.push(makeBlock(type));
  });

  const rand = mulberry32(hashSeed(store.id + "composition"));
  const notYetIncluded = MAPPABLE_BLOCK_TYPES.filter((type) => !store.features.includes(BLOCK_FEATURE_MAP[type]!));
  if (notYetIncluded.length > 0) {
    homeBlocks.push(makeBlock(notYetIncluded[Math.floor(rand() * notYetIncluded.length)]));
  }

  homeBlocks.push(makeBlock("cta-banner"));

  return {
    home: homeBlocks,
    products: [],
    "product-detail": [],
    about: [],
    contact: [],
  };
}

/** Every feature value whose block type appears anywhere in the composition. */
export function featuresFromComposition(composition: StoreComposition): string[] {
  const found = new Set<string>();
  Object.values(composition).forEach((blocks) => {
    blocks.forEach((block) => {
      const feature = BLOCK_FEATURE_MAP[block.type];
      if (feature) found.add(feature);
    });
  });
  return Array.from(found);
}

const COMPOSITION_PREFIX = "basalt_composition_";

/** Reads a store's saved composition, seeding (and persisting) one on first access. */
export function getStoreComposition(store: Store): StoreComposition {
  if (typeof window === "undefined") return seedCompositionForStore(store);

  const raw = window.sessionStorage.getItem(`${COMPOSITION_PREFIX}${store.slug}`);
  if (raw) {
    try {
      return JSON.parse(raw) as StoreComposition;
    } catch {
      // fall through and reseed
    }
  }

  const seeded = seedCompositionForStore(store);
  window.sessionStorage.setItem(`${COMPOSITION_PREFIX}${store.slug}`, JSON.stringify(seeded));
  return seeded;
}

export function saveStoreComposition(slug: string, composition: StoreComposition): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(`${COMPOSITION_PREFIX}${slug}`, JSON.stringify(composition));
}
