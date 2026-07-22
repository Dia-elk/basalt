export type TaskStatus = "done" | "active" | "pending";

export interface AiTask {
  id: string;
  label: string;
  status: TaskStatus;
}

export interface PreviewPatch {
  features?: string[];
  banner?: string;
  accent?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  thinking?: string;
  tasks?: AiTask[];
  patch?: PreviewPatch;
}

export const initialConversation: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    text: "Add a loyalty program and update the hero banner copy to mention our new candle line.",
  },
  {
    id: "m2",
    role: "ai",
    text: "Loyalty is live in your preview, and I've updated the hero copy. Nothing else changed, checkout and cart are untouched. Take a look on the right, and approve when you're happy.",
    thinking:
      "Checking which features are already turned on for this store... Loyalty isn't active yet. Reusing the existing points badge and account summary pieces rather than building anything new.",
    tasks: [
      { id: "t1", label: "Turned on Loyalty program", status: "done" },
      { id: "t2", label: "Set points to 10 per $1 spent", status: "done" },
      { id: "t3", label: "Updated hero banner copy", status: "done" },
      { id: "t4", label: "Published preview", status: "done" },
    ],
    patch: {
      features: ["loyalty"],
      banner: "New: the candle line has arrived",
    },
  },
];

export interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export const conversationHistory: Conversation[] = [
  {
    id: "c-current",
    title: "Loyalty program & hero banner",
    updatedAt: "2 min ago",
    messages: initialConversation,
  },
  {
    id: "c-promo",
    title: "Black Friday promo setup",
    updatedAt: "Yesterday",
    messages: [
      { id: "c-promo-1", role: "user", text: "Set up a 25% Black Friday sale with a countdown banner." },
      {
        id: "c-promo-2",
        role: "ai",
        text: "Done. Added a site-wide 25% off banner with a countdown to the end of the weekend. Reused the existing promo banner piece.",
        tasks: [
          { id: "cp-t1", label: "Enabled 25% Black Friday promo", status: "done" },
          { id: "cp-t2", label: "Added countdown banner", status: "done" },
        ],
        patch: { banner: "Black Friday: 25% off everything, this weekend only" },
      },
    ],
  },
  {
    id: "c-color",
    title: "Switched to navy accent color",
    updatedAt: "3 days ago",
    messages: [
      { id: "c-color-1", role: "user", text: "Change the accent color to navy blue everywhere." },
      {
        id: "c-color-2",
        role: "ai",
        text: "Updated your accent color to navy across buttons, links, and highlights.",
        tasks: [{ id: "cc-t1", label: "Updated brand accent color", status: "done" }],
        patch: { accent: "#2A3A6B" },
      },
    ],
  },
  {
    id: "c-reviews",
    title: "Added product reviews",
    updatedAt: "1 week ago",
    messages: [
      { id: "c-rev-1", role: "user", text: "Can customers leave reviews on products?" },
      {
        id: "c-rev-2",
        role: "ai",
        text: "Reviews are now turned on for every product page. I reused the existing star-rating piece rather than building a new one.",
        tasks: [{ id: "cr-t1", label: "Turned on Reviews", status: "done" }],
        patch: { features: ["reviews"] },
      },
    ],
  },
];

const keywordResponses: { keywords: string[]; response: string; task: string; patch?: PreviewPatch }[] = [
  {
    keywords: ["color", "colour", "theme", "brand"],
    response: "Updated your colors across the storefront. Buttons, links, and accents now reflect the new palette, nothing else was touched.",
    task: "Updated brand colors",
    patch: { accent: "#5B8DEF" },
  },
  {
    keywords: ["discount", "sale", "coupon", "promo"],
    response: "Turned on a site-wide promotion banner and set up the coupon code you mentioned. It's live on the preview now.",
    task: "Set up promotion & coupon code",
    patch: { banner: "Limited time: 20% off your first order" },
  },
  {
    keywords: ["wishlist"],
    response: "Wishlist is already turned on for this store. I've added a quick-add heart icon to the product grid instead.",
    task: "Added wishlist quick-add icon",
    patch: { features: ["wishlist"] },
  },
  {
    keywords: ["review", "rating"],
    response: "Reviews are turned on. I reused the existing star-rating piece rather than building a new one.",
    task: "Turned on Reviews",
    patch: { features: ["reviews"] },
  },
  {
    keywords: ["shipping", "delivery"],
    response: "Updated your shipping zones and rates based on what you described. Checkout totals now reflect the new rules in preview.",
    task: "Updated shipping zones & rates",
  },
];

const fallbackResponses = [
  "Got it. I've matched that to the closest feature and applied it to your preview. Nothing in checkout or cart was touched.",
  "Done. I reused something that already existed for this rather than building anything new. Take a look at the preview on the right.",
  "That's set up now. I'll wait for your approval before this goes anywhere near your live store.",
];

export function getCannedResponse(userText: string): { response: string; task: string; patch?: PreviewPatch } {
  const lower = userText.toLowerCase();
  for (const entry of keywordResponses) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return { response: entry.response, task: entry.task, patch: entry.patch };
    }
  }
  const response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  return { response, task: "Applied requested change" };
}
