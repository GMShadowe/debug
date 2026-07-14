const COMPANIES = [
  "Vercel",
  "Linear",
  "Supabase",
  "Raycast",
  "Resend",
  "Cal.com",
  "Framer",
  "Clerk",
];

/**
 * An infinite, auto-scrolling strip of customer wordmarks. The track is
 * duplicated so the CSS marquee can loop seamlessly, and the row is masked at
 * both edges so logos fade rather than clip.
 */
export function LogoMarquee() {
  return (
    <div
      className="group relative flex overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div className="marquee-track flex shrink-0 items-center gap-14 pr-14">
        {COMPANIES.map((name) => (
          <span
            className="whitespace-nowrap font-heading font-medium text-ink-subtle text-lg tracking-tight transition-colors hover:text-foreground"
            key={name}
          >
            {name}
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="marquee-track flex shrink-0 items-center gap-14 pr-14"
      >
        {COMPANIES.map((name) => (
          <span
            className="whitespace-nowrap font-heading font-medium text-ink-subtle text-lg tracking-tight"
            key={name}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
