"use client";

import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "start";
  className?: string;
}) {
  const { dir } = useLocale();

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs font-medium text-success",
            dir === "ltr" ? "tracking-[0.14em] uppercase" : "tracking-normal"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "max-w-2xl text-2xl leading-[1.15] font-medium text-balance sm:text-3xl",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-xl text-sm text-muted-foreground text-balance",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
