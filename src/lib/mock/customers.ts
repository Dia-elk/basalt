import type { Store } from "@/lib/mock/stores";

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  currency: string;
  joined: string;
  location: string;
}

const CUSTOMERS = [
  { name: "Amélie Laurent", location: "Paris, FR" },
  { name: "Daniel Okafor", location: "Lagos, NG" },
  { name: "Sara Haddad", location: "Dubai, AE" },
  { name: "Marco Bianchi", location: "Milan, IT" },
  { name: "Yuki Tanaka", location: "Osaka, JP" },
];

function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export function generateCustomers(storeId: string): Customer[] {
  const seed = hashSeed(storeId);
  return CUSTOMERS.map((c, i) => {
    const s = (seed + i * 6151) % 9973;
    const orders = 1 + (s % 12);
    return {
      id: `cust-${storeId}-${i}`,
      name: c.name,
      email: c.name.toLowerCase().replace(/[^a-z]/g, ".").replace(/\.+/g, ".") + "@example.com",
      orders,
      totalSpent: orders * (40 + ((s >> 2) % 90)),
      currency: "USD",
      joined: `2026-0${1 + (i % 6)}-${10 + i}`,
      location: c.location,
    };
  });
}

export function createCustomer(partial: Omit<Customer, "id" | "currency" | "orders" | "totalSpent" | "joined">): Customer {
  return {
    id: `cust-${Date.now()}`,
    currency: "USD",
    orders: 0,
    totalSpent: 0,
    joined: new Date().toISOString().slice(0, 10),
    ...partial,
  };
}

const CUSTOMERS_PREFIX = "basalt_customers_";

/** Reads a store's saved customer list, seeding (and persisting) one on first access. */
export function getStoreCustomers(store: Store): Customer[] {
  if (typeof window === "undefined") return generateCustomers(store.id);

  const raw = window.sessionStorage.getItem(`${CUSTOMERS_PREFIX}${store.slug}`);
  if (raw) {
    try {
      return JSON.parse(raw) as Customer[];
    } catch {
      // fall through and reseed
    }
  }

  const seeded = generateCustomers(store.id);
  window.sessionStorage.setItem(`${CUSTOMERS_PREFIX}${store.slug}`, JSON.stringify(seeded));
  return seeded;
}

export function saveStoreCustomers(slug: string, customers: Customer[]): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(`${CUSTOMERS_PREFIX}${slug}`, JSON.stringify(customers));
}
