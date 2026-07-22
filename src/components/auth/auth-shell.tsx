import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/shared/logo";

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden border-e border-border bg-card p-10 lg:flex">
        <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" />
        <Link href="/" className="relative z-10">
          <Logo />
        </Link>

        <div className="relative z-10 flex flex-col gap-6">
          <p className="max-w-md text-2xl leading-snug italic">
            &ldquo;We described the brand in four sentences. Forty minutes later we had
            a production store that looked like we&rsquo;d hired an agency.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
              alt="Amina Kader"
              width={40}
              height={40}
              className="size-10 rounded-full object-cover grayscale"
            />
            <div>
              <p className="text-sm font-medium">Amina Kader</p>
              <p className="text-xs text-muted-foreground">Founder, Lumière Parfums</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-8 text-sm">
          <div>
            <p className="text-xl font-semibold">4,218</p>
            <p className="text-xs text-muted-foreground">Stores created</p>
          </div>
          <div>
            <p className="text-xl font-semibold">41s</p>
            <p className="text-xs text-muted-foreground">Time to go live</p>
          </div>
          <div>
            <p className="text-xl font-semibold">99.98%</p>
            <p className="text-xs text-muted-foreground">Platform uptime</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-10 inline-flex lg:hidden">
            <Logo />
          </Link>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-medium">{title}</h1>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
