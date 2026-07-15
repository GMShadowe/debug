import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const inter = Inter({
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const instrumentSerif = Instrument_Serif({
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
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
    default: "Lumen · Bug reporting for developers",
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
        "dark intro-playing h-full",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable,
        inter.variable,
        spaceGrotesk.variable,
        instrumentSerif.variable
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
