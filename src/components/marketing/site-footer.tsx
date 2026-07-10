import { Logo } from "@/components/brand/logo";

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: ["Features", "Widget", "Pricing", "Changelog"],
  },
  {
    heading: "Developers",
    links: ["Documentation", "API reference", "Status", "Integrations"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-20 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-ink-subtle text-sm leading-relaxed">
            Lightweight bug reporting for developers who ship fast.
          </p>
        </div>
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.heading}>
            <h4 className="font-heading font-semibold text-foreground text-sm tracking-[-0.02em]">
              {column.heading}
            </h4>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link}>
                  <button
                    className="rounded-sm text-ink-subtle text-sm transition-colors hover:text-foreground"
                    type="button"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-border border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-ink-subtle text-sm sm:flex-row">
          <span>© {new Date().getFullYear()} Lumen. All rights reserved.</span>
          <span>Crafted for developers.</span>
        </div>
      </div>
    </footer>
  );
}
