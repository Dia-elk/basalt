import { Suspense } from "react";
import { StorefrontPreview } from "@/components/preview/storefront-preview";

export default function PreviewPage() {
  return (
    <Suspense fallback={null}>
      <StorefrontPreview />
    </Suspense>
  );
}
