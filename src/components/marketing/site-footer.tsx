import { Logo } from "@/components/brand/logo";

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: ["Features", "Widget", "Pricing", "Changelog"],
  },
  {
    heading: "Developers",
    links: ["Documentation", "API reference", "Webhooks", "Status"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-[minmax(0,1fr)_repeat(3,minmax(0,160px))]">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-ink-subtle text-sm leading-relaxed">
              Bug reporting for developers who would rather fix things than
              reproduce them.
            </p>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="font-medium text-foreground text-sm">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <button
                      className="link-underline text-ink-subtle text-sm transition-colors duration-200 hover:text-foreground"
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

        <div className="flex flex-col items-start justify-between gap-2 border-border border-t py-7 font-mono text-[11px] text-ink-tertiary sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Lumen</span>
          <span>Built for people who ship on Fridays</span>
        </div>
      </div>
    </footer>
  );
}
