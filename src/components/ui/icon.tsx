import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

import { cn } from "@/lib/utils";

/**
 * The single place icons are configured.
 *
 * HugeIcons ships raw SVG data rather than components, so every call site would
 * otherwise repeat `size`, `strokeWidth`, and `color`. Funnelling through one
 * wrapper is what makes a set of icons read as one family: uniform 1.5 stroke,
 * sized by Tailwind (`size-*`) rather than a numeric prop, and inheriting
 * `currentColor` so an icon always matches the text beside it.
 */
export function Icon({
  icon,
  className,
  strokeWidth = 1.5,
  ...props
}: {
  icon: IconSvgElement;
  className?: string;
  strokeWidth?: number;
} & Omit<React.SVGProps<SVGSVGElement>, "ref">) {
  return (
    <HugeiconsIcon
      className={cn("size-4 shrink-0", className)}
      color="currentColor"
      icon={icon}
      // Deliberately no `size` prop: the library writes width/height attributes,
      // and a CSS rule from `size-*` outranks a presentation attribute.
      strokeWidth={strokeWidth}
      {...props}
    />
  );
}

export type { IconSvgElement };
