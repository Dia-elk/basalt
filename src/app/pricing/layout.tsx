import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Basalt",
  description: "Simple pricing that scales with your stores. Start free, upgrade when you need more.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
