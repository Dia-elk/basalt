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
  /** Ships as a ready-made template in the "add a page" picker (Home, Checkout, etc.) vs. a page the merchant named themselves. */
  builtin?: boolean;
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface BlockContent {
  heading?: string;
  subheading?: string;
  body?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  imageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  textAlign?: "start" | "center";
  itemLimit?: number;
  items?: { title: string; description?: string }[];
}

export type BuilderFieldType = "text" | "textarea" | "color" | "image" | "url" | "list" | "align" | "number";

export interface BuilderField {
  key: keyof BlockContent;
  label: string;
  type: BuilderFieldType;
  placeholder?: string;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface Block {
  id: string;
  type: BlockType;
  content: BlockContent;
}

export type PageComposition = Block[];

/** A store's actual pages (in order) plus the block list for each. Saved as JSON per store. */
export interface StoreComposition {
  pages: BuilderPage[];
  blocks: Record<string, PageComposition>;
}

/** The library of prebuilt page templates a store can start with, or add back later if removed. */
export const PAGE_TEMPLATES: BuilderPage[] = [
  { id: "home", name: "Home", path: "/", builtin: true },
  { id: "products", name: "Products", path: "/products", builtin: true },
  { id: "product-detail", name: "Product", path: "/products/:slug", builtin: true },
  { id: "checkout", name: "Checkout", path: "/checkout", builtin: true },
  { id: "about", name: "About", path: "/about", builtin: true },
  { id: "contact", name: "Contact", path: "/contact", builtin: true },
  { id: "faq-page", name: "FAQ", path: "/faq", builtin: true },
  { id: "blog-page", name: "Blog", path: "/blog", builtin: true },
];

/**
 * Pages every new store starts with. Home and Checkout are the ones a store
 * can't really sell without, so they're provisioned by default — but like any
 * page here, the merchant can still remove them from the Builder if they want.
 */
const DEFAULT_PAGE_IDS = ["home", "products", "product-detail", "about", "contact", "checkout"];

/** Turns any page name into a URL-safe slug, e.g. for suggesting a route as the merchant types. */
export function slugifyPageName(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "page"
  );
}

/** Builds a fresh, non-template page from the "add page" form's values. */
export function createCustomPage(input: { name: string; path?: string; seo?: BuilderPage["seo"] }): BuilderPage {
  const trimmed = input.name.trim();
  const rawPath = input.path?.trim().replace(/^\/+/, "");
  const slug = rawPath || slugifyPageName(trimmed);
  return {
    id: `${slugifyPageName(trimmed)}-${Date.now().toString(36)}`,
    name: trimmed || "Untitled page",
    path: `/${slug}`,
    seo: input.seo,
  };
}

export function addPageToComposition(composition: StoreComposition, page: BuilderPage): StoreComposition {
  if (composition.pages.some((p) => p.id === page.id)) return composition;
  return {
    pages: [...composition.pages, page],
    blocks: { ...composition.blocks, [page.id]: composition.blocks[page.id] ?? [] },
  };
}

export function removePageFromComposition(composition: StoreComposition, pageId: string): StoreComposition {
  const blocks = { ...composition.blocks };
  delete blocks[pageId];
  return { pages: composition.pages.filter((p) => p.id !== pageId), blocks };
}

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

/**
 * What's editable per block type. Blocks whose list content is pulled live
 * from another feature (testimonials from Reviews, faq from FAQ, product-grid
 * from the catalog, blog-feed from Blog, bundle-showcase from Bundles) only
 * expose heading + color — the items themselves aren't hand-authored here.
 */
const COLOR_FIELD: BuilderField = { key: "backgroundColor", label: "Background color", type: "color" };
const TEXT_COLOR_FIELD: BuilderField = { key: "textColor", label: "Text color", type: "color" };
const ALIGN_FIELD: BuilderField = { key: "textAlign", label: "Text alignment", type: "align" };
const HEADING_FIELD: BuilderField = { key: "heading", label: "Heading", type: "text", maxLength: 60 };
const CTA_URL_FIELD: BuilderField = { key: "ctaUrl", label: "Button link", type: "url", placeholder: "https://…" };
const ctaLabelField = (max: number): BuilderField => ({ key: "ctaLabel", label: "Button label", type: "text", maxLength: max });
const itemLimitField = (max: number): BuilderField => ({ key: "itemLimit", label: "Items to show", type: "number", min: 1, max });

export const BLOCK_FIELDS: Record<BlockType, BuilderField[]> = {
  hero: [
    HEADING_FIELD,
    { key: "subheading", label: "Subheading", type: "textarea", maxLength: 140 },
    ALIGN_FIELD,
    ctaLabelField(24),
    CTA_URL_FIELD,
    { key: "imageUrl", label: "Background image URL", type: "image" },
    TEXT_COLOR_FIELD,
    COLOR_FIELD,
  ],
  "product-grid": [HEADING_FIELD, itemLimitField(8), COLOR_FIELD],
  "featured-collection": [HEADING_FIELD, COLOR_FIELD],
  "feature-cards": [HEADING_FIELD, { key: "items", label: "Value props", type: "list" }, COLOR_FIELD],
  testimonials: [HEADING_FIELD, itemLimitField(5), COLOR_FIELD],
  "cta-banner": [HEADING_FIELD, ALIGN_FIELD, ctaLabelField(24), CTA_URL_FIELD, TEXT_COLOR_FIELD, COLOR_FIELD],
  faq: [HEADING_FIELD, itemLimitField(4), COLOR_FIELD],
  newsletter: [
    HEADING_FIELD,
    { key: "body", label: "Description", type: "textarea", maxLength: 140 },
    ALIGN_FIELD,
    TEXT_COLOR_FIELD,
    COLOR_FIELD,
  ],
  "image-split": [
    HEADING_FIELD,
    { key: "body", label: "Body text", type: "textarea", maxLength: 280 },
    { key: "imageUrl", label: "Image URL", type: "image" },
    COLOR_FIELD,
  ],
  "marquee-logos": [COLOR_FIELD],
  "coupon-banner": [HEADING_FIELD, { key: "body", label: "Details", type: "textarea", maxLength: 140 }, COLOR_FIELD],
  "loyalty-widget": [HEADING_FIELD, COLOR_FIELD],
  "gift-card-promo": [HEADING_FIELD, ctaLabelField(24), CTA_URL_FIELD, COLOR_FIELD],
  "bundle-showcase": [HEADING_FIELD, COLOR_FIELD],
  "blog-feed": [HEADING_FIELD, itemLimitField(3), COLOR_FIELD],
  "referral-banner": [HEADING_FIELD, { key: "body", label: "Details", type: "textarea", maxLength: 140 }, COLOR_FIELD],
};

const DEFAULT_CONTENT: Record<BlockType, BlockContent> = {
  hero: {
    heading: "Welcome to the store",
    subheading: "Quality pieces, thoughtfully chosen.",
    ctaLabel: "Shop now",
    textAlign: "center",
  },
  "product-grid": { heading: "Best sellers", itemLimit: 4 },
  "featured-collection": { heading: "Featured collection" },
  "feature-cards": {
    items: [{ title: "Free shipping" }, { title: "Easy returns" }, { title: "Secure checkout" }],
  },
  testimonials: { heading: "What customers say", itemLimit: 2, items: [] },
  "cta-banner": { heading: "Ready to shop?", ctaLabel: "Browse the collection", textAlign: "center" },
  faq: { heading: "Frequently asked questions", itemLimit: 3, items: [] },
  newsletter: {
    heading: "Stay in the loop",
    body: "Get new arrivals and offers in your inbox.",
    textAlign: "center",
  },
  "image-split": { heading: "Our story" },
  "marquee-logos": {},
  "coupon-banner": { heading: "10% off your first order", body: "Use code WELCOME10 at checkout." },
  "loyalty-widget": { heading: "Earn points on every order" },
  "gift-card-promo": { heading: "Give a gift card", ctaLabel: "Buy a gift card" },
  "bundle-showcase": { heading: "Bundle & save" },
  "blog-feed": { heading: "From the journal", itemLimit: 3 },
  "referral-banner": { heading: "Give $10, get $10", body: "Invite a friend and you both save." },
};

let blockCounter = 0;
function makeBlock(type: BlockType): Block {
  blockCounter += 1;
  return { id: `blk-${blockCounter}-${type}`, type, content: { ...DEFAULT_CONTENT[type] } };
}

/** A stable, unpersisted block used only to render a live thumbnail in the component library. */
export function previewBlock(type: BlockType): Block {
  return { id: `preview-${type}`, type, content: DEFAULT_CONTENT[type] };
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

  const pages = PAGE_TEMPLATES.filter((p) => DEFAULT_PAGE_IDS.includes(p.id));
  const blocks: Record<string, PageComposition> = { home: homeBlocks };
  pages.forEach((p) => {
    if (p.id !== "home") blocks[p.id] = [];
  });

  return { pages, blocks };
}

/** Every feature value whose block type appears anywhere in the composition. */
export function featuresFromComposition(composition: StoreComposition): string[] {
  const found = new Set<string>();
  Object.values(composition.blocks).forEach((blocks) => {
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
      const parsed = JSON.parse(raw) as StoreComposition;
      if (Array.isArray(parsed.pages) && parsed.blocks && typeof parsed.blocks === "object") {
        return parsed;
      }
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
