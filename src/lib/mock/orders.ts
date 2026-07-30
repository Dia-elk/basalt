import type { BusinessType, Store } from "@/lib/mock/stores";

export type OrderStatus = "fulfilled" | "pending" | "refunded";

export interface Order {
  id: string;
  number: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  currency: string;
  items: number;
  status: OrderStatus;
}

const CUSTOMER_NAMES = [
  "Amélie Laurent",
  "Daniel Okafor",
  "Sara Haddad",
  "Marco Bianchi",
  "Yuki Tanaka",
  "Priya Nair",
];

function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

const STATUSES: OrderStatus[] = ["fulfilled", "fulfilled", "pending", "fulfilled", "refunded"];

/**
 * A small, stable set of sample orders per store. Enough to make the demo feel
 * alive; the page also shows an empty state for very-new stores.
 */
export function generateOrders(storeId: string, _businessType: BusinessType): Order[] {
  const seed = hashSeed(storeId);
  return CUSTOMER_NAMES.map((customer, i) => {
    const s = (seed + i * 1013) % 9973;
    const total = 60 + (s % 240);
    const items = 1 + (s % 4);
    const day = 3 + ((s >> 2) % 20);
    return {
      id: `order-${storeId}-${i}`,
      number: `#${(10000 + (seed % 5000) + i).toString()}`,
      customer,
      email: customer.toLowerCase().replace(/[^a-z]/g, ".").replace(/\.+/g, ".") + "@example.com",
      date: `Jul ${day}, 2026`,
      total,
      currency: "USD",
      items,
      status: STATUSES[i % STATUSES.length],
    };
  });
}

const ORDERS_PREFIX = "basalt_orders_";

/** Reads a store's saved orders, seeding (and persisting) them on first access. */
export function getStoreOrders(store: Store): Order[] {
  if (typeof window === "undefined") return store.monthlyRevenue > 0 ? generateOrders(store.id, store.businessType) : [];

  const raw = window.sessionStorage.getItem(`${ORDERS_PREFIX}${store.slug}`);
  if (raw) {
    try {
      return JSON.parse(raw) as Order[];
    } catch {
      // fall through and reseed
    }
  }

  const seeded = store.monthlyRevenue > 0 ? generateOrders(store.id, store.businessType) : [];
  window.sessionStorage.setItem(`${ORDERS_PREFIX}${store.slug}`, JSON.stringify(seeded));
  return seeded;
}

export function saveStoreOrders(slug: string, orders: Order[]): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(`${ORDERS_PREFIX}${slug}`, JSON.stringify(orders));
}
