import type { BusinessType } from "@/lib/mock/stores";

export type StartingPoint = "ai" | "free-template" | "premium-template";

export interface WizardData {
  startingPoint: StartingPoint;
  templateId: string | null;
  name: string;
  description: string;
  logoPreview: string | null;
  region: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  font: string;
  businessType: BusinessType | null;
  languages: string[];
  currencies: string[];
  features: string[];
}

export const initialWizardData: WizardData = {
  startingPoint: "ai",
  templateId: null,
  name: "",
  description: "",
  logoPreview: null,
  region: "Europe",
  primaryColor: "#0A0A0B",
  secondaryColor: "#F4F4F5",
  accentColor: "#29D67A",
  font: "Poppins / Instrument Serif",
  businessType: null,
  languages: ["en"],
  currencies: ["USD"],
  features: ["analytics", "seo"],
};
