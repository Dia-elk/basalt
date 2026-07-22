export type DomainStatus = "Active" | "Pending" | "Error";

export interface Domain {
  id: string;
  storeSlug: string;
  storeName: string;
  domain: string;
  status: DomainStatus;
  ssl: "Active" | "Provisioning";
  primary: boolean;
  expiresAt: string;
}

export const domains: Domain[] = [
  { id: "dom-1", storeSlug: "lumiere-parfums", storeName: "Lumière Parfums", domain: "lumiereparfums.com", status: "Active", ssl: "Active", primary: true, expiresAt: "2027-02-11" },
  { id: "dom-2", storeSlug: "lumiere-parfums", storeName: "Lumière Parfums", domain: "lumiere.buildonbasalt.com", status: "Active", ssl: "Active", primary: false, expiresAt: "-" },
  { id: "dom-3", storeSlug: "northfield-furniture", storeName: "Northfield Furniture Co.", domain: "northfieldfurniture.com", status: "Active", ssl: "Active", primary: true, expiresAt: "2026-11-03" },
  { id: "dom-4", storeSlug: "cove-cosmetics", storeName: "Cove Cosmetics", domain: "covecosmetics.co", status: "Pending", ssl: "Provisioning", primary: true, expiresAt: "2027-04-22" },
  { id: "dom-5", storeSlug: "circuit-sons", storeName: "Circuit & Sons", domain: "circuitsons.com", status: "Active", ssl: "Active", primary: true, expiresAt: "2026-08-19" },
  { id: "dom-6", storeSlug: "whitfield-menswear", storeName: "Whitfield & Co.", domain: "whitfieldmenswear.com", status: "Active", ssl: "Active", primary: true, expiresAt: "2026-12-30" },
  { id: "dom-7", storeSlug: "reading-room", storeName: "The Reading Room", domain: "readingroom.ae", status: "Error", ssl: "Provisioning", primary: true, expiresAt: "2027-06-02" },
];

export function domainsForStore(slug: string): Domain[] {
  return domains.filter((d) => d.storeSlug === slug);
}
