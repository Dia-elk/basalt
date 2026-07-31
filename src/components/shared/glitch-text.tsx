"use client";

import { cn } from "@/lib/utils";

/**
 * Renders a word with a slow, smooth TV/horror-style glitch.
 *
 * The base text stays fully clean and readable; two pseudo-element ghosts
 * (`.glitch::before` / `.glitch::after`, defined in globals.css) carry the
 * chromatic drift + occasional horizontal "slice" cracks, and the span itself
 * gets a slow vertical scanline roll. Brand greens only.
 *
 * `text` is mirrored into `data-text` so the ghost layers can duplicate the
 * word via `content: attr(data-text)`. Animation respects
 * `prefers-reduced-motion` (disabled → static clean word).
 */
export function GlitchText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={cn("glitch", className)} data-text={text} style={style}>
      {text}
    </span>
  );
}
