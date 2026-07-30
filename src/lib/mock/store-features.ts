import { hashSeed, mulberry32 } from "./analytics";
import { generateProducts } from "./products";
import { generateCustomers } from "./customers";
import type { BusinessType, Store } from "./stores";

export interface WishlistEntry {
  productName: string;
  saves: number;
  accent: string;
}
export function generateWishlist(store: Store): WishlistEntry[] {
  const rand = mulberry32(hashSeed(store.id + "wishlist"));
  return generateProducts(store.id, store.businessType)
    .map((p) => ({ productName: p.name, saves: 8 + Math.floor(rand() * 140), accent: p.accent }))
    .sort((a, b) => b.saves - a.saves);
}

export type ReviewRating = 1 | 2 | 3 | 4 | 5;
export interface Review {
  id: string;
  author: string;
  rating: ReviewRating;
  productName: string;
  quote: string;
  postedAt: string;
}
const reviewQuotes: Record<ReviewRating, string[]> = {
  5: [
    "Exactly as described, and it arrived faster than I expected.",
    "Better quality than I hoped for at this price.",
    "Already ordered a second one as a gift.",
  ],
  4: ["Really happy with it, just wish there were more colors.", "Great product, packaging could be sturdier."],
  3: ["Good, but not quite what I pictured from the photos.", "Does the job, nothing more."],
  2: ["Took a while to arrive and the fit was a little off.", "Not quite what I expected for the price."],
  1: ["Arrived damaged, still waiting on a replacement.", "Wouldn't order again."],
};
export function generateReviews(store: Store): Review[] {
  const rand = mulberry32(hashSeed(store.id + "reviews"));
  const products = generateProducts(store.id, store.businessType);
  const customers = generateCustomers(store.id);
  const ratingPool: ReviewRating[] = [5, 5, 5, 4, 4, 3, 5, 2];
  const days = [1, 2, 4, 6, 9];
  return customers.map((c, i) => {
    const rating = ratingPool[Math.floor(rand() * ratingPool.length)];
    const quotes = reviewQuotes[rating];
    return {
      id: `${store.id}-review-${i}`,
      author: c.name,
      rating,
      productName: products[Math.floor(rand() * products.length)]?.name ?? "Store item",
      quote: quotes[Math.floor(rand() * quotes.length)],
      postedAt: `${days[i % days.length]} day${days[i % days.length] === 1 ? "" : "s"} ago`,
    };
  });
}

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  redemptions: number;
  limit: number;
  status: "active" | "expired";
}
export function generateCoupons(store: Store): Coupon[] {
  const rand = mulberry32(hashSeed(store.id + "coupons"));
  const templates: { code: string; type: "percent" | "fixed"; value: number }[] = [
    { code: "WELCOME10", type: "percent", value: 10 },
    { code: "FREESHIP", type: "fixed", value: 8 },
    { code: "VIP20", type: "percent", value: 20 },
    { code: "SUMMER15", type: "percent", value: 15 },
  ];
  return templates.map((t, i) => {
    const limit = 50 + Math.floor(rand() * 200);
    const redemptions = Math.floor(rand() * limit * 0.8);
    return { ...t, redemptions, limit, status: i === templates.length - 1 ? "expired" : "active" };
  });
}

export interface Referrer {
  name: string;
  email: string;
  invites: number;
  converted: number;
  rewardEarned: number;
}
export function generateReferrers(store: Store): Referrer[] {
  const rand = mulberry32(hashSeed(store.id + "referral"));
  return generateCustomers(store.id)
    .map((c) => {
      const invites = 1 + Math.floor(rand() * 14);
      const converted = Math.round(invites * (0.3 + rand() * 0.5));
      return { name: c.name, email: c.email, invites, converted, rewardEarned: converted * 10 };
    })
    .sort((a, b) => b.converted - a.converted);
}

export type LoyaltyTier = "Bronze" | "Silver" | "Gold";
export interface LoyaltyMember {
  name: string;
  email: string;
  points: number;
  tier: LoyaltyTier;
}
export function generateLoyaltyMembers(store: Store): LoyaltyMember[] {
  const rand = mulberry32(hashSeed(store.id + "loyalty"));
  return generateCustomers(store.id)
    .map((c) => {
      const points = 50 + Math.floor(rand() * 2400);
      const tier: LoyaltyTier = points > 1600 ? "Gold" : points > 600 ? "Silver" : "Bronze";
      return { name: c.name, email: c.email, points, tier };
    })
    .sort((a, b) => b.points - a.points);
}

export interface GiftCard {
  code: string;
  initialValue: number;
  balance: number;
  status: "active" | "redeemed" | "expired";
  purchasedAt: string;
}
export function generateGiftCards(store: Store): GiftCard[] {
  const rand = mulberry32(hashSeed(store.id + "giftcards"));
  const values = [25, 50, 100, 50, 200, 25];
  const days = [3, 8, 15, 22, 34, 50];
  return values.map((v, i) => {
    const spent = rand();
    const balance = spent > 0.85 ? 0 : Math.round(v * (1 - spent));
    return {
      code: `GC-${hashSeed(store.id + i).toString(36).toUpperCase().slice(0, 6)}`,
      initialValue: v,
      balance,
      status: balance === 0 ? "redeemed" : days[i] > 40 ? "expired" : "active",
      purchasedAt: `${days[i]} days ago`,
    };
  });
}

export interface Bundle {
  name: string;
  items: string[];
  bundlePrice: number;
  regularPrice: number;
  unitsSold: number;
}
export function generateBundles(store: Store): Bundle[] {
  const rand = mulberry32(hashSeed(store.id + "bundles"));
  const products = generateProducts(store.id, store.businessType);
  if (products.length < 2) return [];
  const bundleNames = ["Starter Bundle", "Best of the Season", "The Complete Set"];
  return bundleNames.map((name, i) => {
    const items = [products[i % products.length], products[(i + 1) % products.length]];
    const regularPrice = items.reduce((sum, p) => sum + p.price, 0);
    const bundlePrice = Math.round(regularPrice * 0.85);
    return {
      name,
      items: items.map((p) => p.name),
      bundlePrice,
      regularPrice,
      unitsSold: 4 + Math.floor(rand() * 60),
    };
  });
}

export function generateEngagementStats(store: Store) {
  const rand = mulberry32(hashSeed(store.id + "engagement"));
  return {
    conversionRate: (1.4 + rand() * 2.4).toFixed(1),
    bounceRate: Math.round(30 + rand() * 25),
    avgSession: `${1 + Math.floor(rand() * 3)}m ${10 + Math.floor(rand() * 49)}s`,
    returningVisitors: Math.round(18 + rand() * 30),
  };
}

export interface SeoQuery {
  query: string;
  clicks: number;
  position: number;
}
export function generateSeoQueries(store: Store): SeoQuery[] {
  const rand = mulberry32(hashSeed(store.id + "seo"));
  const base = store.name.toLowerCase();
  const type = store.businessType.toLowerCase();
  const queries = [base, `${type} near me`, `best ${type} online`, `${base} reviews`, `buy ${type}`];
  return queries
    .map((query) => ({
      query,
      clicks: 8 + Math.floor(rand() * 240),
      position: 1 + Math.round(rand() * 18),
    }))
    .sort((a, b) => b.clicks - a.clicks);
}

export interface Campaign {
  subject: string;
  sentAt: string;
  openRate: number;
  clickRate: number;
}
export function generateCampaigns(store: Store): Campaign[] {
  const rand = mulberry32(hashSeed(store.id + "newsletter"));
  const subjects = [
    `New arrivals at ${store.name}`,
    "This week's picks, just for you",
    `${store.businessType} favorites are back in stock`,
    "A small thank-you from us",
  ];
  const days = [4, 11, 19, 30];
  return subjects.map((subject, i) => ({
    subject,
    sentAt: `${days[i]} days ago`,
    openRate: Math.round(28 + rand() * 40),
    clickRate: Math.round(3 + rand() * 12),
  }));
}

export interface BlogPost {
  title: string;
  status: "published" | "draft";
  views: number;
  publishedAt: string;
}
const blogTopicsByType: Partial<Record<BusinessType, string[]>> = {
  Perfume: ["How to Make a Fragrance Last All Day", "Layering Scents: A Beginner's Guide", "Inside Our Ambre Nuit Bottle Design"],
  Furniture: ["Small-Space Furniture That Doesn't Feel Small", "Oak vs. Walnut: Choosing Your Wood", "Caring for Linen Upholstery"],
  Cosmetics: ["Building a 5-Minute Morning Routine", "Matte vs. Dewy: Finding Your Finish", "What's Actually in Our Setting Powder"],
  Electronics: ["Getting the Most Battery Life From Your Headphones", "A Buyer's Guide to Fast Chargers", "Behind the Design of Our Keyboard"],
  Fashion: ["How to Style One Sweater Three Ways", "A Short Guide to Fabric Weights", "Why We Chose Selvedge Denim"],
  Books: ["Five Quiet Novels for Slow Afternoons", "Behind the Scenes of Our Staff Picks", "What We're Reading This Month"],
};
export function generateBlogPosts(store: Store): BlogPost[] {
  const rand = mulberry32(hashSeed(store.id + "blog"));
  const titles = blogTopicsByType[store.businessType] ?? ["Behind the Brand", "What We Learned This Quarter", "A Note From the Founder"];
  const days = [5, 12, 27];
  return titles.map((title, i) => ({
    title,
    status: i === titles.length - 1 && rand() > 0.5 ? "draft" : "published",
    views: 60 + Math.floor(rand() * 1400),
    publishedAt: `${days[i % days.length]} days ago`,
  }));
}

export interface FaqEntry {
  question: string;
  answer: string;
}
export function generateFaqEntries(store: Store): FaqEntry[] {
  return [
    {
      question: `Do you ship internationally from ${store.region}?`,
      answer: "Yes, we ship worldwide. Delivery times and costs are calculated at checkout based on your address.",
    },
    {
      question: "What's your return policy?",
      answer: "Items can be returned within 30 days of delivery, provided they're unused and in their original packaging.",
    },
    {
      question: "How can I track my order?",
      answer: "You'll get a tracking link by email as soon as your order ships. You can also find it under your account's order history.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, you can add gift wrapping at checkout for a small additional fee.",
    },
  ];
}
