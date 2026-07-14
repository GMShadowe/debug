import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#why", label: "Why" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#widget", label: "Widget" },
  { href: "#features", label: "Features" },
  { href: "#developers", label: "Developers" },
  { href: "#integrations", label: "Integrations" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-border/70 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link className="transition-opacity hover:opacity-80" href="/">
          <Logo />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              className="group relative rounded-sm text-ink-subtle text-sm outline-none transition-colors duration-150 hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href={link.href}
              key={link.label}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground/60 transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            className="h-8 rounded-md px-3 text-sm"
            nativeButton={false}
            render={<Link href="/auth">Sign in</Link>}
            variant="ghost"
          />
          <Button
            className="h-8 rounded-md px-3 text-sm"
            nativeButton={false}
            render={<Link href="/auth">Get started</Link>}
          />
        </div>
      </div>
    </header>
  );
}
