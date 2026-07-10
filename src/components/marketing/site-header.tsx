import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#widget", label: "Widget" },
  { href: "#developers", label: "Developers" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-border/60 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link className="transition-opacity hover:opacity-80" href="/">
          <Logo />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              className="rounded-md px-3 py-2 font-medium text-ink-subtle text-sm transition-colors duration-150 hover:bg-accent hover:text-foreground"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            render={<Link href="/auth">Sign in</Link>}
            size="sm"
            variant="ghost"
          />
          <Button
            nativeButton={false}
            render={<Link href="/auth">Get started</Link>}
            size="sm"
          />
        </div>
      </div>
    </header>
  );
}
