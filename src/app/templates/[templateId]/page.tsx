import { notFound } from "next/navigation";
import { templates } from "@/lib/mock/templates";
import { TemplateStorefrontPreview } from "@/components/preview/template-storefront-preview";

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const template = templates.find((t) => t.id === templateId);

  if (!template) notFound();

  return <TemplateStorefrontPreview template={template} />;
}
