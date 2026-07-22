import { Store as StoreIcon } from "lucide-react";
import type { BusinessType } from "@/lib/mock/stores";
import { businessTypes } from "@/lib/mock/wizard-options";
import { cn } from "@/lib/utils";

const iconMap = Object.fromEntries(businessTypes.map(({ value, icon }) => [value, icon])) as Record<
  BusinessType,
  typeof StoreIcon
>;

export function StoreLogo({
  businessType,
  accent,
  size = "md",
  className,
}: {
  businessType: BusinessType;
  accent: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const Icon = iconMap[businessType] ?? StoreIcon;
  const sizeClasses = {
    sm: "size-8 rounded-lg",
    md: "size-10 rounded-xl",
    lg: "size-14 rounded-2xl",
  };
  const iconSizes = { sm: "size-4", md: "size-5", lg: "size-6" };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center border border-white/10",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: `${accent}1A` }}
    >
      <Icon className={iconSizes[size]} style={{ color: accent }} strokeWidth={1.5} />
    </div>
  );
}
