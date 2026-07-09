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
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-ink-subtle text-xs leading-relaxed">
            Lightweight bug reporting for developers who ship fast.
          </p>
        </div>
        {FOOTER_COLUMNS.map((column) => (
          <div key={column.heading}>
            <h4 className="font-medium text-foreground text-xs">
              {column.heading}
            </h4>
            <ul className="mt-3 space-y-2.5">
              {column.links.map((link) => (
                <li key={link}>
                  <button
                    className="text-ink-subtle text-xs transition-colors hover:text-foreground"
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-ink-subtle text-xs sm:flex-row">
          <span>© {new Date().getFullYear()} Lumen. All rights reserved.</span>
          <span>Crafted for developers.</span>
        </div>
      </div>
    </footer>
  );
}
