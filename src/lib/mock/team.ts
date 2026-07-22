export type TeamRole = "Owner" | "Admin" | "Editor";

export interface TeamMember {
  id: string;
  storeSlug: string;
  name: string;
  email: string;
  role: TeamRole;
  initials: string;
}

export const teamMembers: TeamMember[] = [
  { id: "tm-1", storeSlug: "lumiere-parfums", name: "Amina Kader", email: "amina@lumiereparfums.com", role: "Owner", initials: "AK" },
  { id: "tm-2", storeSlug: "lumiere-parfums", name: "Yasmin Haddad", email: "yasmin@lumiereparfums.com", role: "Admin", initials: "YH" },
  { id: "tm-3", storeSlug: "lumiere-parfums", name: "Karim Belhadj", email: "karim@lumiereparfums.com", role: "Editor", initials: "KB" },
  { id: "tm-4", storeSlug: "lumiere-parfums", name: "Sofia Marchetti", email: "sofia@lumiereparfums.com", role: "Editor", initials: "SM" },
  { id: "tm-5", storeSlug: "lumiere-parfums", name: "Noah Fischer", email: "noah@lumiereparfums.com", role: "Editor", initials: "NF" },

  { id: "tm-6", storeSlug: "northfield-furniture", name: "Amina Kader", email: "amina@lumiereparfums.com", role: "Owner", initials: "AK" },
  { id: "tm-7", storeSlug: "northfield-furniture", name: "Dylan Okafor", email: "dylan@northfieldfurniture.com", role: "Admin", initials: "DO" },
];

export function teamForStore(slug: string): TeamMember[] {
  return teamMembers.filter((m) => m.storeSlug === slug);
}
