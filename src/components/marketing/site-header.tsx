"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Magnetic } from "@/components/marketing/magnetic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#capture", label: "How it works" },
  { href: "#install", label: "Install" },
  { href: "#features", label: "Features" },
  { href: "#faq", label: "FAQ" },
];

/** Past this many pixels the bar earns its hairline and paper backing. */
const CONDENSE_AT = 32;
/** Ignore jitter below this delta so the bar doesn't flicker. */
const DIRECTION_THRESHOLD = 6;
/** Don't start hiding until the hero is behind you. */
const HIDE_AFTER = 220;

/**
 * Full-bleed editorial masthead. It starts transparent over the paper, gains a
 * hairline and a blurred backing once you leave the hero, and gets out of the
 * way while you scroll down — returning the instant you scroll back up, so the
 * long journey down never has a floating bar sitting over the set pieces.
 */
export function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY.current;
      setCondensed(y > CONDENSE_AT);
      if (Math.abs(delta) > DIRECTION_THRESHOLD) {
        setHidden(delta > 0 && y > HIDE_AFTER);
        lastY.current = y;
      }
    };
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(read);
      }
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        hidden && "-translate-y-full"
      )}
    >
      <div
        className={cn(
          "border-transparent border-b transition-colors duration-300",
          condensed && "border-border bg-background/80 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1180px] items-center justify-between gap-6 px-6">
          <Link
            aria-label="Lumen home"
            className="transition-opacity duration-200 hover:opacity-70"
            href="/"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                className="link-underline text-ink-subtle text-sm transition-colors duration-200 hover:text-foreground"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              className="hidden h-8 px-3 text-sm sm:inline-flex"
              nativeButton={false}
              render={<Link href="/auth">Sign in</Link>}
              variant="ghost"
            />
            <Magnetic>
              <Button
                className="h-8 px-3.5 text-sm"
                nativeButton={false}
                render={<Link href="/auth">Start free</Link>}
              />
            </Magnetic>
          </div>
        </div>
      </div>
    </header>
  );
}
