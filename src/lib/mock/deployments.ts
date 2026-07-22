export type DeployStatus = "Ready" | "Building" | "Failed" | "Canceled";
export type DeployEnv = "Production" | "Preview";

export interface Deployment {
  id: string;
  storeSlug: string;
  storeName: string;
  message: string;
  env: DeployEnv;
  status: DeployStatus;
  time: string;
  duration: string;
  region: string;
}

export const deployments: Deployment[] = [
  { id: "dpl-1", storeSlug: "cove-cosmetics", storeName: "Cove Cosmetics", message: "Enabled Reviews", env: "Preview", status: "Building", time: "Just now", duration: "-", region: "UK South" },
  { id: "dpl-2", storeSlug: "lumiere-parfums", storeName: "Lumière Parfums", message: "Enabled Loyalty program", env: "Production", status: "Ready", time: "2 min ago", duration: "38s", region: "France Central" },
  { id: "dpl-3", storeSlug: "lumiere-parfums", storeName: "Lumière Parfums", message: "Updated homepage banner copy", env: "Preview", status: "Ready", time: "1 hour ago", duration: "29s", region: "France Central" },
  { id: "dpl-4", storeSlug: "northfield-furniture", storeName: "Northfield Furniture Co.", message: "Updated brand colors", env: "Preview", status: "Ready", time: "3 hours ago", duration: "33s", region: "East US 2" },
  { id: "dpl-5", storeSlug: "whitfield-menswear", storeName: "Whitfield & Co.", message: "Enabled Gift Cards", env: "Production", status: "Ready", time: "5 hours ago", duration: "41s", region: "West Europe" },
  { id: "dpl-6", storeSlug: "circuit-sons", storeName: "Circuit & Sons", message: "Fixed checkout tax calculation", env: "Production", status: "Ready", time: "1 day ago", duration: "36s", region: "Southeast Asia" },
  { id: "dpl-7", storeSlug: "reading-room", storeName: "The Reading Room", message: "Updated bundle pricing", env: "Production", status: "Failed", time: "20 min ago", duration: "12s", region: "UAE North" },
  { id: "dpl-8", storeSlug: "northfield-furniture", storeName: "Northfield Furniture Co.", message: "Enabled Wishlist", env: "Preview", status: "Ready", time: "1 day ago", duration: "31s", region: "East US 2" },
  { id: "dpl-9", storeSlug: "cove-cosmetics", storeName: "Cove Cosmetics", message: "Updated product photos", env: "Preview", status: "Ready", time: "2 days ago", duration: "28s", region: "UK South" },
  { id: "dpl-10", storeSlug: "circuit-sons", storeName: "Circuit & Sons", message: "Added newsletter signup", env: "Preview", status: "Ready", time: "3 days ago", duration: "35s", region: "Southeast Asia" },
  { id: "dpl-11", storeSlug: "whitfield-menswear", storeName: "Whitfield & Co.", message: "Fixed mobile menu overlap", env: "Preview", status: "Canceled", time: "4 days ago", duration: "8s", region: "West Europe" },
  { id: "dpl-12", storeSlug: "lumiere-parfums", storeName: "Lumière Parfums", message: "Store created", env: "Production", status: "Ready", time: "5 months ago", duration: "44s", region: "France Central" },
];

export function deploymentsForStore(slug: string): Deployment[] {
  return deployments.filter((d) => d.storeSlug === slug);
}
