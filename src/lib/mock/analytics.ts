export function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  visitors: number;
}

export function generateRevenueSeries(seed: string, days: number, baseRevenue: number): RevenuePoint[] {
  const rand = mulberry32(hashSeed(seed));
  const points: RevenuePoint[] = [];
  const dailyBase = baseRevenue / 30;
  let trendValue = dailyBase * 0.7;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    trendValue += (rand() - 0.42) * dailyBase * 0.18;
    trendValue = Math.max(dailyBase * 0.3, trendValue);
    const weekendBoost = [0, 6].includes(date.getDay()) ? 1.15 : 1;
    const revenue = Math.round(trendValue * weekendBoost);
    const visitors = Math.round(revenue * (2.6 + rand() * 0.8));
    points.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue,
      visitors,
    });
  }
  return points;
}

export interface TrafficChannel {
  channel: string;
  value: number;
}

export function generateTrafficBreakdown(seed: string): TrafficChannel[] {
  const rand = mulberry32(hashSeed(seed + "traffic"));
  const weights = [
    { channel: "Direct", base: 32 },
    { channel: "Search", base: 28 },
    { channel: "Social", base: 20 },
    { channel: "Referral", base: 12 },
    { channel: "Email", base: 8 },
  ];
  return weights.map((w) => ({ channel: w.channel, value: Math.round(w.base + (rand() - 0.5) * 8) }));
}

export interface TopProduct {
  name: string;
  revenue: number;
  units: number;
}

const productNamesByType: Record<string, string[]> = {
  Perfume: ["Amber Nocturne 50ml", "Neroli & Oud EDP", "Vetiver Homme", "Rose Absolute Travel Set"],
  Furniture: ["Oak Frame Sofa", "Walnut Dining Table", "Linen Armchair", "Modular Shelf Unit"],
  Cosmetics: ["Matte Foundation", "Rose Quartz Palette", "Hydrating Serum", "Silk Setting Powder"],
  Electronics: ["Wireless ANC Headphones", "USB-C Fast Charger", "Mechanical Keyboard", "4K Webcam"],
  Fashion: ["Merino Wool Coat", "Tailored Oxford Shirt", "Selvedge Denim", "Leather Chelsea Boots"],
  Books: ["The Founder's Notebook", "Quiet Systems", "Field Guide to Typography", "On Craft"],
  Restaurant: ["Tasting Menu Voucher", "House Blend Coffee Bag", "Chef's Knife Set", "Gift Card"],
  Other: ["Signature Bundle", "Starter Kit", "Best Seller Set", "Limited Edition Box"],
};

export function generateTopProducts(seed: string, businessType: string): TopProduct[] {
  const rand = mulberry32(hashSeed(seed + "products"));
  const names = productNamesByType[businessType] ?? productNamesByType.Other;
  return names
    .map((name) => ({
      name,
      revenue: Math.round(2000 + rand() * 9000),
      units: Math.round(20 + rand() * 180),
    }))
    .sort((a, b) => b.revenue - a.revenue);
}
