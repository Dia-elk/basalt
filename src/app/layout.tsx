import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { WelcomeIntro } from "@/components/marketing/welcome-intro";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Basalt | Build your online store in minutes",
  description:
    "Describe your business and Basalt creates your fully working online store. No code, no developers, nothing to manage. Just tell it what you're building.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`dark ${poppins.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LocaleProvider>
          <TooltipProvider delay={150}>
            <WelcomeIntro />
            {children}
            <Toaster theme="dark" position="bottom-right" />
          </TooltipProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
