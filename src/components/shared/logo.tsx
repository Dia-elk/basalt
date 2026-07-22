import { cn } from "@/lib/utils";
import { BRAND_NAME } from "@/lib/constants";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("size-6", className)}
      aria-hidden
    >
      <path d="M16 2L29 9V23L16 30L3 23V9L16 2Z" fill="var(--foreground)" />
      <path d="M16 2L29 9L16 16L3 9L16 2Z" fill="var(--success)" />
      <path d="M16 16V30L3 23V9L16 16Z" fill="var(--foreground)" fillOpacity="0.7" />
    </svg>
  );
}

export function Logo({ className, iconClassName }: { className?: string; iconClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-medium tracking-tight", className)}>
      <LogoMark className={iconClassName} />
      <span>{BRAND_NAME}</span>
    </span>
  );
}
