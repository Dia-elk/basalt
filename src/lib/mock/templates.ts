export interface StoreTemplate {
  id: string;
  name: string;
  category: string;
  price: number;
  accent: string;
  gradient: [string, string];
}

export const templates: StoreTemplate[] = [
  { id: "minimal-mono", name: "Minimal Mono", category: "Fashion & lifestyle", price: 0, accent: "#29D67A", gradient: ["#1a1a1c", "#0a0a0b"] },
  { id: "market-fresh", name: "Market Fresh", category: "Grocery & food", price: 0, accent: "#6B8F5A", gradient: ["#1c2018", "#0e120c"] },
  { id: "studio-craft", name: "Studio Craft", category: "Handmade & art", price: 0, accent: "#D4AF6A", gradient: ["#201a12", "#0f0c08"] },
  { id: "noir-atelier", name: "Noir Atelier", category: "Fragrance & beauty", price: 39, accent: "#E8A0BF", gradient: ["#1f1418", "#0d0a0b"] },
  { id: "gridworks", name: "Gridworks", category: "Electronics & gadgets", price: 49, accent: "#5B8DEF", gradient: ["#12161f", "#08090c"] },
  { id: "maison-luxe", name: "Maison Luxe", category: "Furniture & home", price: 59, accent: "#C4622D", gradient: ["#1c140f", "#0c0906"] },
];
