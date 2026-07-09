import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Show the "Lumen" wordmark next to the mark. */
  withWordmark?: boolean;
}

/**
 * Lumen brand mark — a lavender aperture glyph. The mark is the one place the
 * primary accent is always allowed to appear.
 */
export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset]">
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm0 4.2a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Z"
            fill="currentColor"
            opacity="0.9"
          />
          <circle cx="12" cy="12" fill="currentColor" r="2.4" />
        </svg>
      </span>
      {withWordmark ? (
        <span className="font-heading font-semibold text-[15px] text-foreground tracking-tight">
          Lumen
        </span>
      ) : null}
    </span>
  );
}
