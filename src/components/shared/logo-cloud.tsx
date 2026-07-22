"use client";

import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const logos = [
  { name: "Azure", src: "https://svgl.app/library/azure.svg" },
  { name: "PostgreSQL", src: "https://svgl.app/library/postgresql.svg" },
  { name: "GitHub", src: "https://svgl.app/library/github_dark.svg" },
  { name: "OpenAI", src: "https://svgl.app/library/openai.svg" },
  { name: "Turso", src: "https://svgl.app/library/turso-dark.svg" },
  { name: "Docker", src: "https://svgl.app/library/docker.svg" },
  { name: "Anthropic", src: "https://svgl.app/library/anthropic_white.svg" },
  { name: "Kubernetes", src: "https://svgl.app/library/kubernetes.svg" },
];

export function LogoCloud({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {[
        "-top-2 -left-2",
        "-top-2 -right-2",
        "-bottom-2 -left-2",
        "-bottom-2 -right-2",
      ].map((position) => (
        <PlusIcon
          key={position}
          className={cn("absolute size-4 text-border", position)}
          strokeWidth={1.5}
        />
      ))}

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="group flex items-center justify-center bg-background p-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              className="h-6 w-auto opacity-40 transition-opacity duration-300 group-hover:opacity-80 sm:h-7"
              style={{ filter: "grayscale(1) brightness(0) invert(1)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
