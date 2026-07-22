export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  cta: string;
  highlighted?: boolean;
  highlights: string[];
  includedCredits: number;
  maxTeamMembers: number;
  specs: {
    stores: string;
    aiCredits: string;
    domains: string;
    orderFee: string;
    capacity: string;
    support: string;
    teamMembers: string;
  };
}

export const CREDIT_RATE = 0.08;
export const CREDIT_STEP = 50;
export const CREDIT_MIN = 50;
export const CREDIT_MAX = 10000;

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    yearlyPrice: 0,
    description: "Zero commitment. Pay only a small fee per order.",
    cta: "Start for free",
    includedCredits: 0,
    maxTeamMembers: 1,
    highlights: [
      "1 store, hosting included",
      "No custom domain",
      "1% per order (0.5% after $5,000/mo)",
      "Add AI credits anytime",
    ],
    specs: {
      stores: "1 store",
      aiCredits: "0 / month",
      domains: "No custom domain",
      orderFee: "1% (0.5% after $5,000/mo)",
      capacity: "Up to 200 orders / month",
      support: "Community support",
      teamMembers: "Just you",
    },
  },
  {
    id: "starter",
    name: "Starter",
    price: 24,
    yearlyPrice: 19,
    description: "For a single store ready for its own domain.",
    cta: "Start building",
    includedCredits: 200,
    maxTeamMembers: 2,
    highlights: ["1 store", "Custom domain included", "200 AI credits / month", "0% transaction fees"],
    specs: {
      stores: "1 store",
      aiCredits: "200 / month",
      domains: "Custom domains",
      orderFee: "0%",
      capacity: "Up to 1,000 orders / month",
      support: "Email support",
      teamMembers: "Up to 2",
    },
  },
  {
    id: "professional",
    name: "Professional",
    price: 99,
    yearlyPrice: 79,
    description: "For growing catalogs and multi-store operators.",
    cta: "Start building",
    highlighted: true,
    includedCredits: 1000,
    maxTeamMembers: 5,
    highlights: ["5 stores", "1,000 AI credits / month", "1 free domain / year", "0% transaction fees"],
    specs: {
      stores: "5 stores",
      aiCredits: "1,000 / month",
      domains: "1 free domain / year",
      orderFee: "0%",
      capacity: "Up to 10,000 orders / month per store",
      support: "Priority email support",
      teamMembers: "Up to 5",
    },
  },
  {
    id: "agency",
    name: "Agency",
    price: 299,
    yearlyPrice: 239,
    description: "For agencies and teams launching stores at scale.",
    cta: "Start building",
    includedCredits: 5000,
    maxTeamMembers: Infinity,
    highlights: ["25 stores", "Unlimited AI credits", "3 free domains / year", "0% transaction fees"],
    specs: {
      stores: "25 stores",
      aiCredits: "Unlimited",
      domains: "3 free domains / year",
      orderFee: "0%",
      capacity: "Built for high-volume stores",
      support: "Dedicated account manager",
      teamMembers: "Unlimited",
    },
  },
];

export const comparisonRows: { label: string; key: keyof PricingPlan["specs"] }[] = [
  { label: "Team members", key: "teamMembers" },
  { label: "Stores", key: "stores" },
  { label: "AI credits", key: "aiCredits" },
  { label: "Domains", key: "domains" },
  { label: "Order fee", key: "orderFee" },
  { label: "Capacity", key: "capacity" },
  { label: "Support", key: "support" },
];
