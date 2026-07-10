import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  description:
    "Drop a lightweight widget on your site and collect rich, actionable bug reports in one clean dashboard.",
  title: {
    default: "Lumen — Bug reporting for developers",
    template: "%s · Lumen",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={cn(
        "dark h-full",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable
      )}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
