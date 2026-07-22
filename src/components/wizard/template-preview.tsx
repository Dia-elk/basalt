import type { StoreTemplate } from "@/lib/mock/templates";
import { cn } from "@/lib/utils";

export function TemplatePreview({
  template,
  className,
}: {
  template: StoreTemplate;
  className?: string;
}) {
  return (
    <div
      className={cn("relative flex aspect-[4/3] flex-col gap-1.5 p-2.5", className)}
      style={{ background: `linear-gradient(135deg, ${template.gradient[0]}, ${template.gradient[1]})` }}
    >
      <div className="flex items-center justify-between">
        <span className="h-1.5 w-6 rounded-full" style={{ backgroundColor: template.accent }} />
        <div className="flex gap-1">
          <span className="h-1 w-3 rounded-full bg-white/25" />
          <span className="h-1 w-3 rounded-full bg-white/25" />
          <span className="h-1 w-3 rounded-full bg-white/25" />
        </div>
      </div>

      <div
        className="flex-1 rounded-md"
        style={{
          backgroundColor: `${template.accent}1f`,
          border: `1px solid ${template.accent}33`,
        }}
      />

      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-1 rounded bg-white/[0.06] p-1">
            <div className="aspect-square rounded-sm" style={{ backgroundColor: `${template.accent}26` }} />
            <span className="h-1 w-full rounded-full bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}
