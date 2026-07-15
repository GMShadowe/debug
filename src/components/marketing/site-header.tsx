"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Magnetic } from "@/components/marketing/magnetic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#why", id: "why", label: "Why" },
  { href: "#how-it-works", id: "how-it-works", label: "How it works" },
  { href: "#widget", id: "widget", label: "Widget" },
  { href: "#features", id: "features", label: "Features" },
  { href: "#developers", id: "developers", label: "Developers" },
  { href: "#integrations", id: "integrations", label: "Integrations" },
];

/**
 * Floating pill navigation. Detached from the top edge, glass over the
 * canvas, with a scrollspy: the link whose section currently dominates the
 * viewport carries a soft pill highlight. Condenses (shadow + stronger
 * backdrop) once the page is scrolled.
 */
export function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const activeRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((el): el is HTMLElement => el !== null);

    const ratios = activeRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let best: string | null = null;
        let bestRatio = 0.08; // below this nothing is highlighted
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      { threshold: [0, 0.12, 0.3, 0.6] }
    );
    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-40 flex justify-center px-4">
      <div
        className={cn(
          "flex items-center gap-1 rounded-full border border-border bg-card/75 py-1.5 pr-1.5 pl-4 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[0_12px_40px_-12px_rgb(0_0_0/0.6)]"
        )}
      >
        <Link
          aria-label="Lumen home"
          className="mr-2 transition-opacity hover:opacity-80"
          href="/"
        >
          <Logo withWordmark={false} />
        </Link>

        <nav className="hidden items-center md:flex">
          {NAV_LINKS.map((link) => (
            <a
              className={cn(
                "rounded-full px-3 py-1.5 text-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring/60",
                active === link.id
                  ? "bg-accent text-foreground"
                  : "text-ink-subtle hover:text-foreground"
              )}
              href={link.href}
              key={link.id}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-2 flex items-center gap-1.5">
          <Button
            className="hidden h-8 rounded-full px-3 text-sm sm:inline-flex"
            nativeButton={false}
            render={<Link href="/auth">Sign in</Link>}
            variant="ghost"
          />
          <Magnetic>
            <Button
              className="h-8 rounded-full px-3.5 text-sm"
              nativeButton={false}
              render={<Link href="/auth">Get started</Link>}
            />
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
