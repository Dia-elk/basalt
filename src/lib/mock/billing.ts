export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending";
  description: string;
}

export const invoices: Invoice[] = [
  { id: "INV-2026-0701", date: "2026-07-01", amount: 99, status: "Paid", description: "Professional plan · July 2026" },
  { id: "INV-2026-0601", date: "2026-06-01", amount: 99, status: "Paid", description: "Professional plan · June 2026" },
  { id: "INV-2026-0512", date: "2026-05-12", amount: 40, status: "Paid", description: "Extra AI credits (1,000)" },
  { id: "INV-2026-0501", date: "2026-05-01", amount: 99, status: "Paid", description: "Professional plan · May 2026" },
  { id: "INV-2026-0401", date: "2026-04-01", amount: 99, status: "Paid", description: "Professional plan · April 2026" },
  { id: "INV-2026-0301", date: "2026-03-01", amount: 29, status: "Paid", description: "Starter plan · March 2026" },
];

export const creditPacks = [
  { credits: 500, price: 20 },
  { credits: 1000, price: 35 },
  { credits: 2500, price: 75 },
];
