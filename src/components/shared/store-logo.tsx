import Image from "next/image";
import { LogoMark } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "size-8 rounded-lg",
  md: "size-10 rounded-xl",
  lg: "size-14 rounded-2xl",
};
const markSizes = { sm: "size-4", md: "size-5", lg: "size-6" };
const imageSizes = { sm: "32px", md: "40px", lg: "56px" };

/**
 * A store's icon: its own uploaded logo once it has one, otherwise the
 * platform mark — the same fallback pattern Vercel uses for a project
 * without a custom domain favicon, instead of guessing from business type.
 */
export function StoreLogo({
  logoUrl,
  name,
  size = "md",
  className,
}: {
  logoUrl?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  if (logoUrl) {
    return (
      <div
        className={cn("relative shrink-0 overflow-hidden border border-white/10 bg-muted", sizeClasses[size], className)}
      >
        <Image src={logoUrl} alt={`${name} logo`} fill sizes={imageSizes[size]} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center border border-border bg-secondary",
        sizeClasses[size],
        className
      )}
    >
      <LogoMark className={markSizes[size]} />
    </div>
  );
}
