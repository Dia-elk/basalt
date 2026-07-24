/**
 * Mock data model + seed for the visual "Builder" workspace.
 *
 * A store composes multiple storefront pages, each made of an ordered list of
 * prebuilt blocks. State is held in React (mirroring how ai-workspace holds its
 * conversation state), seeded deterministically per store so the demo is stable.
 */

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
  | "marquee-logos";

export interface BuilderPage {
  id: string;
  name: string;
  path: string;
}

export interface Block {
  id: string;
  type: BlockType;
}

export type PageComposition = Block[];

/** The storefront pages every store can compose. */
export const STOREFRONT_PAGES: BuilderPage[] = [
  { id: "home", name: "Home", path: "/" },
  { id: "products", name: "Products", path: "/products" },
  { id: "product-detail", name: "Product", path: "/products/:slug" },
  { id: "about", name: "About", path: "/about" },
  { id: "contact", name: "Contact", path: "/contact" },
];

/** The library of prebuilt blocks merchants can add. */
export const BLOCK_LIBRARY: { type: BlockType; nameKey: string; descKey: string }[] = [
  { type: "hero", nameKey: "blockHero", descKey: "blockHeroDesc" },
  { type: "product-grid", nameKey: "blockProductGrid", descKey: "blockProductGridDesc" },
  { type: "featured-collection", nameKey: "blockFeaturedCollection", descKey: "blockFeaturedCollectionDesc" },
  { type: "feature-cards", nameKey: "blockFeatureCards", descKey: "blockFeatureCardsDesc" },
  { type: "testimonials", nameKey: "blockTestimonials", descKey: "blockTestimonialsDesc" },
  { type: "cta-banner", nameKey: "blockCtaBanner", descKey: "blockCtaBannerDesc" },
  { type: "faq", nameKey: "blockFaq", descKey: "blockFaqDesc" },
  { type: "newsletter", nameKey: "blockNewsletter", descKey: "blockNewsletterDesc" },
  { type: "image-split", nameKey: "blockImageSplit", descKey: "blockImageSplitDesc" },
  { type: "marquee-logos", nameKey: "blockMarqueeLogos", descKey: "blockMarqueeLogosDesc" },
];

let blockCounter = 0;
function makeBlock(type: BlockType): Block {
  blockCounter += 1;
  return { id: `blk-${blockCounter}-${type}`, type };
}

/**
 * Seed composition per page. Home gets a few blocks so the canvas isn't empty;
 * every other page starts empty (merchants compose it themselves).
 */
export function seedCompositions(): Record<string, PageComposition> {
  blockCounter = 0;
  return {
    home: [makeBlock("hero"), makeBlock("product-grid"), makeBlock("cta-banner")],
    products: [],
    "product-detail": [],
    about: [],
    contact: [],
  };
}

export function createBlock(type: BlockType): Block {
  blockCounter += 1;
  // Time-based suffix avoids collisions with seeded ids across re-mounts.
  return { id: `blk-${Date.now()}-${blockCounter}-${type}`, type };
}
