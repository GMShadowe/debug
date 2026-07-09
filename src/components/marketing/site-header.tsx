import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#", label: "Docs" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-border/80 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              className="text-ink-subtle text-sm transition-colors hover:text-foreground"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            className="h-8 rounded-md px-3 text-sm"
            render={<Link href="/auth">Sign in</Link>}
            variant="ghost"
          />
          <Button
            className="h-8 rounded-md px-3 text-sm"
            render={<Link href="/auth">Get started</Link>}
          />
        </div>
      </div>
    </header>
  );
}
